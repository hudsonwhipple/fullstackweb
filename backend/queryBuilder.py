# from flask_restful import reqparse 
from sqlalchemy import or_, case
from sqlalchemy.dialects.postgresql import ARRAY
from models import Artists, Genres, Events

class QueryBuilder:
    def __init__(
        self, model, args, sortables, exact_filterables, searchables, range_filterables
    ): 
        self.query = model.query
        self.model = model
        self.args = args

        self.sortable_fields = sortables
        self.exact_filterable_fields = exact_filterables # will be a dictionary
        self.range_filterable_fields = range_filterables
        self.searchable_fields = searchables
        
        self.apply_sorting()
        self.apply_exact_filters()
        self.apply_range_filters()
        self.apply_search()
        
        self.result = None
    def paginate(self):
        if ('per_page' not in self.args or 'page' not in self.args) or (self.args['per_page'] == '' or self.args['page'] == ''):
            if self.model is Artists:
                per_page = 15
            elif self.model is Genres:
                per_page = 5
            else:
                per_page == 30
            page = 1
        else:
            per_page = int(self.args['per_page'])
            page = int(self.args['page'])

        return self.query.paginate(
            page=page,
            per_page=per_page
        )

    def apply_sorting(self):
        if ('sort_by' not in self.args or 'sort_order' not in self.args) or (self.args['sort_by'] == '' or self.args['sort_order'] == ''):
            sort_by = "name"
            sort_order = "asc"
        else:
            sort_by = self.args["sort_by"]
            sort_order = self.args["sort_order"]
        
        sort_attr = getattr(self.model, sort_by)

        genre_model = self.model is Genres and (sort_by == "events_price_min" or sort_by == "events_price_max")
        event_model = self.model is Events and (sort_by == "price_range_min" or sort_by == "price_range_max")

        if (genre_model or event_model):
            # Make sure the price is listed
            case_stmt = case((sort_attr == -1, 1), else_=0)
            if sort_order == "asc":
                self.query = self.query.order_by(case_stmt, sort_attr.asc())
            else:
                self.query = self.query.order_by(case_stmt, sort_attr.desc())
        elif self.model is Events and sort_by == "sales_start":
            # Make sure the date is valid and sort by it
            case_stmt = case((sort_attr < 20230601, 1), else_=0)
            if sort_order == "asc":
                self.query = self.query.order_by(case_stmt, sort_attr.asc())
            else:
                self.query = self.query.order_by(case_stmt, sort_attr.desc())
        else:
            if sort_order == "asc":
                self.query = self.query.order_by(sort_attr.asc())
            else:
                self.query = self.query.order_by(sort_attr.desc())
        
        
    def apply_exact_filters(self): 
        filters = []
        filterable_field_names = [field.name for field in self.exact_filterable_fields]     
        for arg in self.args:
            value = self.args[arg]
            if value and arg in filterable_field_names:
                field_attr = getattr(self.model, arg)
                filters.append(field_attr == value)
        self.query = self.query.filter(*filters)

    
    def apply_range_filters(self):
        filters = []

        filterable_field_names = []
        for field in self.range_filterable_fields:
            filterable_field_names.append(f"{field.name}.min")
            filterable_field_names.append(f"{field.name}.max")
        
        for field in self.args:
            if field in filterable_field_names:
                name, min_or_max = field.split(".")
                value = self.args[field]
                
                if value:
                    field_attr = getattr(self.model, name)
                    
                    if min_or_max == "min":
                        filters.append(field_attr >= value)
                    else:
                        filters.append(field_attr <= value)
        
        self.query = self.query.filter(*filters)
    
    def apply_search(self):
        # Default case if no search term provided
        if ('q' not in self.args or self.args['q'] == ''):
            return
        search_query = self.args["q"]
        search_query = search_query.title()
        if not search_query:
            return

        filters = []
        for field in self.searchable_fields:
            # Done for artist_names
            if isinstance(field.type, ARRAY):
                filters.append(field.any(search_query))
            else:
                filters.append(field.ilike(f"%{search_query}%"))
        
        self.query = self.query.filter(or_(*filters))
                        

        