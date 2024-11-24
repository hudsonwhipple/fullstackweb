from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, initialize_database
from models import Genres, Artists, Events
from gitlab_stats import get_gitlab_stats
from queryBuilder import QueryBuilder
import os

CORS(app)

with app.app_context():
    initialize_database()

# Home Page
@app.route('/')
def index():
   return "Welcome to the Home Page"

# About Page
@app.route('/about', methods=['GET']) 
def about_page():
    return get_gitlab_stats()

genre_searchable_fields = [Genres.name]
genre_exact_filterable_fields = []
genre_range_filterable_fields = [Genres.events_price_min, Genres.events_price_max]
genre_sortable_fields = [Genres.name, Genres.events_price_min, Genres.events_price_max]

@app.route('/GetGenres', methods=['GET'])
def specific_genres():
    query_response = QueryBuilder(Genres, request.args, genre_sortable_fields, genre_exact_filterable_fields, genre_searchable_fields, genre_range_filterable_fields) 

    result = query_response.paginate()
    return [instance.to_dict() for instance in result]

event_searchable_fields = [Events.name, Events.artist_names]
event_exact_filterable_fields = [Events.genre_name]
event_range_filterable_fields = [Events.price_range_min, Events.price_range_max]
event_sortable_fields =[Events.name, Events.event_date, Events.sales_start, Events.price_range_min, Events.price_range_max]

@app.route('/GetEvents')
def specific_events():
    query_response = QueryBuilder(
        Events, 
        request.args, 
        event_sortable_fields, 
        event_exact_filterable_fields, 
        event_searchable_fields, 
        event_range_filterable_fields)
    
    result = query_response.paginate()
    return [instance.to_dict() for instance in result]

artist_searchable_fields = [Artists.name]
artist_exact_filterable_fields = [Artists.genre_name]
artist_range_filterable_fields = [Artists.popularity]
artist_sortable_fields = [Artists.name, Artists.popularity]

@app.route('/GetArtists', methods=['GET'])
def specific_artists():
    query_response = QueryBuilder(Artists, request.args, artist_sortable_fields, artist_exact_filterable_fields, artist_searchable_fields, artist_range_filterable_fields)
    
    result = query_response.paginate()
    return [instance.to_dict() for instance in result]

@app.route('/GetAllGenres', methods=['GET'])
def get_all_genres():
    genres = Genres.query.all()
    return jsonify([genre.to_dict() for genre in genres])

@app.route('/GetGenre/<string:genre_id>', methods=['GET'])
def genres_page(genre_id):
    genre = Genres.query.get(genre_id)
    if genre: return jsonify(genre.to_dict())
    return "Genre not found", 404

@app.route('/GetAllArtists', methods=['GET'])
def get_all_artists():
    if request.method == 'GET':
        artists = Artists.query.all()
        return jsonify([artist.to_dict() for artist in artists])

@app.route('/GetArtist/<string:artist_id>', methods=['GET'])
def artists_page(artist_id):
    artist = Artists.query.get(artist_id)
    if artist:
        return jsonify(artist.to_dict())
    return "Artist not found", 404

@app.route('/GetAllEvents', methods=['GET'])
def get_all_events():
    events = Events.query.all()
    if events:
        return jsonify([event.to_dict() for event in events])
    return "No events found", 404

@app.route('/GetEvent/<string:event_id>', methods=['GET'])
def events_page(event_id):
    event = Events.query.get(event_id) 
    if event:
        return jsonify(event.to_dict())
    return "Event not found", 404

if __name__ == '__main__':
    app.run(debug=True)
    