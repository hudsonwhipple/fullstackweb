# Authored By: Christopher Huelitl
from unittest import main, TestCase
from data import get_artist_information, get_artist_id, get_spotify_access_token, get_events_for_artist, get_venue_id, get_venue_information

get_spotify_access_token()

class MyUnitTests (TestCase):
    #Testing if name and ID match 
    def test_get_artist_info_name(self):
        beyonce, adele, dualipa = "6vWDO969PvNqNYHIOW5v0m", "4dpARuHxo51G3z768sgnrY", "6M2wZ9GZgrQXHCFfjv46we"
        venue_results, bey_info = get_artist_information(beyonce) 
        venue_results, adele_info = get_artist_information(adele)
        venue_results, dua_info = get_artist_information(dualipa)
        
        self.assertEqual(bey_info['name'], "Beyoncé")
        self.assertEqual(adele_info['name'], "Adele")
        self.assertEqual(dua_info['name'], "Dua Lipa")
    
    #Testing if genre and ID match
    def test_get_artist_info_popularity(self):
        grupoFrontera, radioHead, vanbur = "6XkjpgcEsYab502Vr1bBeW", "4Z8W4fKeB5YxbusRsdQVPb", "0R2bPrDcf0qEFHbQazwiXj"
        
        venue_results, front_info = get_artist_information(grupoFrontera)
        venue_results, radio_info = get_artist_information(radioHead)
        venue_results, vanbur_info = get_artist_information(vanbur)
        
        self.assertEqual(front_info['popularity'], 83)
        self.assertEqual(radio_info['popularity'], 80)
        self.assertEqual(vanbur_info['popularity'], 46)
        
    #Testing if ID is properly returned
    def test_get_artist_id(self):
        beyonce, adele, dualipa = get_artist_id("Beyoncé"), get_artist_id("Adele"), get_artist_id("Dua Lipa")
        
        self.assertEqual(beyonce, "6vWDO969PvNqNYHIOW5v0m")  
        self.assertEqual(adele, "4dpARuHxo51G3z768sgnrY")
        self.assertEqual(dualipa, "6M2wZ9GZgrQXHCFfjv46we")      
    
    #Testing if all proper albums are returned for a given artist ID
    def test_get_artist_info_albums(self):
        theStrokes, maluma, ariana_grande = "0epOFNiUfyON9EYx7Tpr6V", "1r4hJ1h58CWwUQe3MxPuau", "66CXWjxzNUsdJxJ2JdwvnR"
        
        venue_results, strokes_lst = get_artist_information("0epOFNiUfyON9EYx7Tpr6V")
        venue_results, maluma_lst = get_artist_information("1r4hJ1h58CWwUQe3MxPuau")
        venue_results, ari_lst = get_artist_information("66CXWjxzNUsdJxJ2JdwvnR")
        
        strokes_ans = ["The Singles - Volume 01", "The New Abnormal", "Comedown Machine", "Angles", "First Impressions Of Earth", "Room On Fire", "Is This It"]
        maluma_ans = ["Don Juan", "The Love & Sex Tape (Deluxe Edition)", "The Love & Sex Tape", "Marry Me (Original Motion Picture Soundtrack)", "#7DJ (7 Días En Jamaica)", "PAPI JUANCHO", "11:11", "F.A.M.E.", "Pretty Boy, Dirty Boy", "PB.DB. The Mixtape", "Magia"]
        ari_ans = ["eternal sunshine (slightly deluxe)", "eternal sunshine", "Yours Truly (Tenth Anniversary Edition)", "Positions (Deluxe)", "Positions", "k bye for now (swt live)", "thank u, next", "Sweetener", "Dangerous Woman", "My Everything (Deluxe)", "Yours Truly"]
        
        self.assertEqual(strokes_ans, strokes_lst['albums'])
        self.assertEqual(maluma_ans, maluma_lst['albums'])
        self.assertEqual(ari_ans, ari_lst['albums'])
        
    #Testing all parameters match the given artist
    def test_get_events_for_artist(self):
        gunna_lst = get_events_for_artist("Gunna")
        key_param = {'1AvfZbkGkyXU-8o': {'eventId': '1AvfZbkGkyXU-8o', 'eventName': 'Broccoli City Festival 2-day Ticket (7/27-7/28)', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-27', 'salesStart-End': '2024-03-22T14:00:00Z to 2024-07-29T00:30:00Z', 'priceRange': '$169.5 to $1069.5', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.com/broccoli-city-festival-2day-ticket-727728-washington-district-of-columbia-07-27-2024/event/1500606E7EDA1411'}, '17A8vOG61rsGNd9': {'eventId': '17A8vOG61rsGNd9', 'eventName': 'Broccoli City Festival - SUNDAY SINGLE DAY', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-28', 'salesStart-End': '2024-05-31T14:00:00Z to 2024-07-29T01:00:00Z', 'priceRange': '$99.5 to $544.5', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.com/broccoli-city-festival-sunday-single-day-washington-district-of-columbia-07-28-2024/event/150060A7B13230D7'}, 'G5djZ9mQDu9YJ': {'eventId': 'G5djZ9mQDu9YJ', 'eventName': 'Rockstar Energy presents Wireless - Saturday Payment Plan', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-13', 'salesStart-End': '2024-01-31T10:00:00Z to 2024-07-13T10:00:00Z', 'priceRange': '$49.0 to $49.0', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.co.uk/rockstar-energy-presents-wireless-saturday-payment-london-13-07-2024/event/37005EE6BB357C26'}, 'G5djZ9mhRYI-P': {'eventId': 'G5djZ9mhRYI-P', 'eventName': 'Rockstar Energy Presents Wireless - Saturday Day Ticket', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-13', 'salesStart-End': '2024-01-31T10:00:00Z to 2024-07-13T10:00:00Z', 'priceRange': '$94.6 to $148.0', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.co.uk/rockstar-energy-presents-wireless-saturday-day-london-13-07-2024/event/37005EE6EFC28865'}, 'G5djZ9m9z5MMG': {'eventId': 'G5djZ9m9z5MMG', 'eventName': 'Rockstar Energy Presents Wireless - 2 Day Payment Plan Sat & Sun', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-13', 'salesStart-End': '2024-01-31T10:00:00Z to 2024-07-14T10:00:00Z', 'priceRange': '$45.0 to $49.0', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.co.uk/rockstar-energy-presents-wireless-2-day-london-13-07-2024/event/37005EE5F82F7DCC'}
        }
        i = 0
        for event in key_param:
            self.assertEqual(event, gunna_lst[i]['eventId'])
            self.assertEqual(key_param[event]['eventName'], gunna_lst[i]['eventName'])
            self.assertEqual(key_param[event]['artistNames'], gunna_lst[i]['artistNames'])
            self.assertEqual(key_param[event]['dateAndTime'], gunna_lst[i]['dateAndTime'])
            self.assertEqual(key_param[event]['salesStart-End'], gunna_lst[i]['salesStart-End'])
            self.assertEqual(key_param[event]['priceRange'], gunna_lst[i]['priceRange'])
            i += 1
    
    #Testing the return of venue ID 
    def test_getVenueId(self):
        moodyCenter, alamoDome = "Myers Stadium", "Alamodome"
        moodyId, alamoId = get_venue_id(moodyCenter), get_venue_id(alamoDome)
        
        self.assertEqual(moodyId, "")
        self.assertEqual(alamoId, "")
    
    #Testing venue information given is not empty
    def test_getVenueInfo(self):
        moodyCenter, alamoDome = "Myers Stadium", "Alamodome"
        moodyId, alamoId = get_venue_id(moodyCenter), get_venue_id(alamoDome)
        
        moody_info = get_venue_information(moodyId)
        alamo_info = get_venue_information(alamoId)
        
        self.assertNotEqual(moody_info, {})
        self.assertNotEqual(alamo_info, {})
    
if __name__ == "__main__":
    main()