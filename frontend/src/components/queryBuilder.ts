type ExactFilterableFields< T extends string> = {
    [K in T]?: string;
};

type RangeFilterableFields<T extends string> = {
    min?: {[K in T]?: number | string};
    max?: {[K in T]?: number | string};
};

export type QueryParams<
    SortType,
    ExactFields extends string,
    RangeFields extends string
> = {
    page?: number;
    perPage?: number;
    sort?: SortType;
    sortDirection?: 'asc' | 'desc'
    exactFilters?: ExactFilterableFields<ExactFields>;
    rangeFilters?: RangeFilterableFields<RangeFields>;
    search?: string;
    allItems?: boolean;
};

export const buildQueryString = <ST, EF extends string, RF extends string>(
    params: QueryParams<ST, EF, RF>
) => {
    const {
        page, 
        perPage,
        sort,
        sortDirection,
        exactFilters,
        rangeFilters,
        search,
        allItems,
    } = params;
    const queryString = [];

    if (page) {
        queryString.push(`page=${page}`);
    }

    if (perPage) {
        queryString.push('per_page=${perPage}');
    }

    if (sort && sortDirection) {
        queryString.push(`sort_by=${sort}.${sortDirection}`);
    }
    
    if (allItems) {
        queryString.push(`all_items=true`):
    }

    if (exactFilters) {
        Object.entries(exactFilters).forEach(([key, value]) => {
                queryString.push(`${key}=${value}`);
        });
    }

    if (rangeFilters) {
        Object.entries(rangeFilters).forEach(([min_or_max, value]) => {
            Object.entries(value).forEach(([field, v]) => {
                queryString.push(`${field}.${min_or_max}=${v}`);
            });
        });
    }

    if (search) {
        queryString.push(`q=${search}`);
    }

    return queryString.join('&');
};
