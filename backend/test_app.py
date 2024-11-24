import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from models import app, db, Genres, Artists, Events  # Adjust the import as needed

# Configure the application for testing
# app.config['TESTING'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

class BasicTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        app.app_context().push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()

    def setUp(self):
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_genre_creation(self):
        genre = Genres(genre_name="Rock", genre_id="KnvZfZ7vAeA")
        db.session.add(genre)
        db.session.commit()
        
        self.assertEqual(Genres.query.count(), 1)
        self.assertEqual(Genres.query.first().genre_name, "Rock")

        # Clean up
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Genres.query.count(), 0)

    def test_genre_creation_1(self):
        genre = Genres(genre_name="Country", genre_id="KnvZfZ7vAv6")
        db.session.add(genre)
        db.session.commit()
        
        self.assertEqual(Genres.query.count(), 1)
        self.assertEqual(Genres.query.first().genre_name, "Country")

        # Clean up
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Genres.query.count(), 0)

    def test_genre_creation(self):
        genre = Genres(genre_name="Hip-Hop/Rap", genre_id="KnvZfZ7vAv1")
        db.session.add(genre)
        db.session.commit()
        
        self.assertEqual(Genres.query.count(), 1)
        self.assertEqual(Genres.query.first().genre_name, "Hip-Hop/Rap")

        # Clean up
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Genres.query.count(), 0)

    def test_artist_creation(self):
        genre = Genres(genre_name="Pop", genre_id="KnvZfZ7vAev")
        db.session.add(genre)
        db.session.commit()
        
        artist = Artists(artist_name="Taylor Swift", genre_id=genre.genre_id, artist_id="S2b4of", popularity="99", albums="Red", album_covers="ssd", future_events="tomorrow", image_url="2ljn3jfssdav")
        db.session.add(artist)
        db.session.commit()
        
        self.assertEqual(Artists.query.count(), 1)
        self.assertEqual(Artists.query.first().artist_name, "Taylor Swift")
        self.assertEqual(Artists.query.first().genre.genre_name, "Pop")
        
        # Clean up
        db.session.delete(artist)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Artists.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_artist_creation_2(self):
        genre = Genres(genre_name="Hip-Hop/Rap", genre_id="KnvZfZ7vAv1")
        db.session.add(genre)
        db.session.commit()
        
        artist = Artists(artist_name="Gunna", genre_id=genre.genre_id, artist_id="S2b4of", popularity="99", albums="Red", album_covers="ssd", future_events="tomorrow", image_url="2ljn3jfssdav")
        db.session.add(artist)
        db.session.commit()
        
        self.assertEqual(Artists.query.count(), 1)
        self.assertEqual(Artists.query.first().artist_name, "Gunna")
        self.assertEqual(Artists.query.first().genre.genre_name, "Hip-Hop/Rap")
        
        # Clean up
        db.session.delete(artist)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Artists.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_artist_creation_3(self):
        genre = Genres(genre_name="Country", genre_id="KnvZfZ7vAv6")
        db.session.add(genre)
        db.session.commit()
        
        artist = Artists(artist_name="Kelsea Ballerini", genre_id=genre.genre_id, artist_id="3RqBeV12Tt7A8xH3zBDDUF", popularity="67", albums="Rolling Up", album_covers="ssd", future_events="tomorrow", image_url="2ljn3jfssdav")
        db.session.add(artist)
        db.session.commit()
        
        self.assertEqual(Artists.query.count(), 1)
        self.assertEqual(Artists.query.first().artist_name, "Kelsea Ballerini")
        self.assertEqual(Artists.query.first().genre.genre_name, "Country")
        
        # Clean up
        db.session.delete(artist)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Artists.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_event_creation(self):
        genre = Genres(genre_name="Jazz", genre_id="KnvZfZ7vAvE", popular_artists=[], upcoming_events=[], top_songs=[], events_price_range=[])
        db.session.add(genre)
        db.session.commit()
        
        event = Events(event_name="NN North Sea Jazz Festival - Friday dayticket", genre_id="KnvZfZ7vAvE", event_id="Z698xZbpZ17Gvua", artist_names=[], date_and_time=[], sales_start_end="1-12012", price_range=[], venue={}, ticketmaster_URL="ds")
        db.session.add(event)
        db.session.commit()
        
        self.assertEqual(Events.query.count(), 1)
        self.assertEqual(Events.query.first().event_name, "NN North Sea Jazz Festival - Friday dayticket")
        self.assertEqual(Events.query.first().genre.genre_name, "Jazz")

        # Clean up
        db.session.delete(event)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Events.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_event_creation_2(self):
        genre = Genres(genre_name="Pop", genre_id="KnvZfZ7vAvE", popular_artists=[], upcoming_events=[], top_songs=[], events_price_range=[])
        db.session.add(genre)
        db.session.commit()
        
        event = Events(event_name="Taylor Swift Concert", genre_id="KnvZfZ7vAvE", event_id="Z698xZbpZ17Gvua", artist_names=[], date_and_time=[], sales_start_end="1-12012", price_range=[], venue={}, ticketmaster_URL="ds")
        db.session.add(event)
        db.session.commit()
        
        self.assertEqual(Events.query.count(), 1)
        self.assertEqual(Events.query.first().event_name, "Taylor Swift Concert")
        self.assertEqual(Events.query.first().genre.genre_name, "Pop")

        # Clean up
        db.session.delete(event)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Events.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_event_creation_3(self):
        genre = Genres(genre_name="Country", genre_id="KnvZfZ7vAv6", popular_artists=[], upcoming_events=[], top_songs=[], events_price_range=[])
        db.session.add(genre)
        db.session.commit()
        
        event = Events(event_name="Rodeo and Zack Bryan", genre_id="KnvZfZ7vAvE", event_id="Z698xZbpZ17Gvua", artist_names=[], date_and_time=[], sales_start_end="1-12012", price_range=[], venue={}, ticketmaster_URL="ds")
        db.session.add(event)
        db.session.commit()
        
        self.assertEqual(Events.query.count(), 1)
        self.assertEqual(Events.query.first().event_name, "Rodeo and Zack Bryan")
        self.assertEqual(Events.query.first().genre.genre_name, "Country")

        # Clean up
        db.session.delete(event)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Events.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_many_to_many_relationship(self):
        genre = Genres(genre_name="Classical", genre_id="KnvZfZ7vAeJ", popular_artists=[], upcoming_events=[], top_songs=[], events_price_range=[])
        
        db.session.add(genre)
        db.session.commit()
        
        artist = Artists(artist_name="Ludwig van Beethoven", genre_id=genre.genre_id, artist_id="S2b4of", popularity="99", albums="Red", album_covers="ssd", future_events="tomorrow", image_url="2ljn3jfssdav")
        event = Events(event_name="Classical Evening", genre_id=genre.genre_id, event_id="KnvZfZ7vAvd", artist_names=[], date_and_time=[], sales_start_end="1-12012", price_range=[], venue={}, ticketmaster_URL="ds")
        db.session.add(artist)
        db.session.add(event)
        db.session.commit()
        
        event.artists.append(artist)
        db.session.commit()
        
        self.assertEqual(event.artists[0].artist_name, "Ludwig van Beethoven")
        self.assertEqual(artist.events[0].event_name, "Classical Evening")

        # Clean up
        event.artists.remove(artist)
        db.session.commit()
        db.session.delete(artist)
        db.session.delete(event)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Artists.query.count(), 0)
        self.assertEqual(Events.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

if __name__ == "__main__":
    unittest.main()
