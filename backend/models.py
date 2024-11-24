from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.dialects.postgresql import ARRAY, JSON
# initializing Flask app 
app = Flask(__name__) 

app.app_context().push()

USER ="postgres"
PASSWORD ="asd123"
PUBLIC_IP_ADDRESS = "localhost:5432"
# Update the PUBLIC_IP_ADDRESS to your Cloud SQL instance's connection name
# PUBLIC_IP_ADDRESS = "cs373-idb-428121:us-central1:ticketsdb"
DBNAME ="ticketsdb"

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True 
db = SQLAlchemy(app)

class Genres(db.Model):
    __tablename__ = 'genres'
    
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String(80), nullable = False)

    popular_artists = db.Column(ARRAY(db.String))
    upcoming_events = db.Column(ARRAY(db.String)) 
    top_songs = db.Column(ARRAY(db.String)) 
    events_price_min = db.Column(db.Integer)
    events_price_max = db.Column(db.Integer)

    # Relationship
    artists = db.relationship('Artists', back_populates='genre')
    events = db.relationship('Events', back_populates='genre')

    def to_dict(self):
        instance = {
            'id': self.id,
            'name': self.name,
            'popular_artists': self.popular_artists,
            'upcoming_events': self.upcoming_events,
            'top_songs': self.top_songs,
            'events_price_min': self.events_price_min,
            'events_price_max': self.events_price_max
        }
        return instance
  
class Artists(db.Model):
    __tablename__ = 'artists'
	
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String(80), nullable = False)

    popularity = db.Column(db.Integer)  
    genre_name = db.Column(db.String)
    albums = db.Column(ARRAY(db.String)) 
    album_covers = db.Column(ARRAY(db.String))
    future_events = db.Column(ARRAY(db.String))
    image_url = db.Column(db.String(80)) 
    # Relationship
    genre_id = db.Column(db.String, db.ForeignKey('genres.id'), nullable=False)
    genre = db.relationship('Genres', back_populates='artists')
    events = db.relationship('Events', secondary ='artist_events', back_populates='artists')

    def to_dict(self):
        instance = {
            'id': self.id,
            'name': self.name,
            'popularity': self.popularity,
            'albums': self.albums,
            'album_covers': self.album_covers,
            'future_events': self.future_events,
            'image_url': self.image_url,
            'genre_id': self.genre_id,
            'genre_name': self.genre_name
        }
        return instance
    
class Events(db.Model):
    __tablename__ = 'events'
	
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String, nullable = False)
    # description = db.Column(db.String(250))

    artist_names = db.Column(ARRAY(db.String)) 
    artist_ids = db.Column(ARRAY(db.String))
    genre_name = db.Column(db.String)

    event_date = db.Column(db.Integer)
    sales_start = db.Column(db.Integer) 
    price_range_min = db.Column(db.Integer)
    price_range_max = db.Column(db.Integer)
    venue = db.Column(JSON) 
    ticketmaster_URL = db.Column(db.String) 
    eventImage_URL = db.Column(db.String) # ADDED 7/14

    # Relationship
    genre_id = db.Column(db.String, db.ForeignKey('genres.id'), nullable=False)
    genre = db.relationship('Genres', back_populates='events')
    artists = db.relationship('Artists', secondary='artist_events', back_populates='events')

    def to_dict(self):
        instance = {
            'id': self.id, 
            'event_name': self.name,
            'artist_names': self.artist_names,
            'artistIds': self.artist_ids,
            'event_date': self.event_date,
            'sales_start': self.sales_start,
            'price_range_min': self.price_range_min,
            'price_range_max': self.price_range_max,
            'venue': self.venue,
            'ticketmaster_URL': self.ticketmaster_URL,
            'eventImageURL': self.eventImage_URL, # ADDED 7/14
            'genre_id': self.genre_id,
            'genre_name': self.genre_name
        }
        return instance

artists_events = db.Table('artist_events',
   db.Column('artist_id', db.String, db.ForeignKey('artists.id')), 
   db.Column('event_id', db.String, db.ForeignKey('events.id'))
   )
