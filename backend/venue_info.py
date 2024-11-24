import requests
import json

google_access_token = 'AIzaSyBwv3sHVNL7xrJlSWvZyOF5NAV81y_XHrA'

# Return a given place's id given the address
def get_venue_id(venue_name): 
    # Text search request based on venue address
    BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    
    # Fields to retrieve
    fields = 'place_id,name'
    
    # Construct the request URL with parameters
    url = f"{BASE_URL}?query={venue_name}&fields={fields}&key={google_access_token}"
    response = requests.get(url)
    check_request_status(response)
    response = response.json()
    return response['results'][0]['place_id'] if response['results'] else ''

# Populate the venue with its website, phone number, and rating
def get_venue_information(venue_id):
    venue_details_url = f'https://places.googleapis.com/v1/places/{venue_id}?fields=nationalPhoneNumber,rating,websiteUri&key={google_access_token}'

    response = requests.get(venue_details_url)
    check_request_status(response)
    response = response.json()

    venue_information = {
        'name': '',
        'address': '',
        'phoneNumber': "Unavailable" if 'nationalPhoneNumber' not in response else response['nationalPhoneNumber'],
        'rating': "Unavailable" if 'rating' not in response else f"{response['rating']} / 5",
        'website': "Unavailable" if 'websiteUri' not in response else response['websiteUri']
    }

    return venue_information

# Create a address string using street, city, and state
def construct_address(data):
    address = ''
    if 'address' in data['_embedded']['venues'][0]:
        address += data['_embedded']['venues'][0]['address']['line1'] if 'line1' in data['_embedded']['venues'][0]['address'] else ''

    address += f", {data['_embedded']['venues'][0]['city']['name']}" if 'city' in data['_embedded']['venues'][0] and 'name' in data['_embedded']['venues'][0]['city'] else ''

    address += f", {data['_embedded']['venues'][0]['state']['name']}" if 'state' in data['_embedded']['venues'][0] and 'name' in data['_embedded']['venues'][0]['state'] else ''

    return address

# Check if API call resulted in error
def check_request_status(response):
    if response.status_code != 200:
        print(f"Received status code {response.status_code}")
        print(f"Response content: {response.content}")
        print(f"Response headers: {response.headers}")
        response.raise_for_status()

# Populate venue information, if it can be found
def get_venue(data, event_instance):
    if 'name' in data['_embedded']['venues'][0]:
        venue_id = get_venue_id(data['_embedded']['venues'][0]['name'])
        if (venue_id == ''):
            event_instance['venue'] = 'Unavailable'
        else:
            event_instance['venue'] = get_venue_information(venue_id)
            event_instance['venue']['name'] = data['_embedded']['venues'][0]['name']
            event_instance['venue']['address'] = construct_address(data)
    else:
        event_instance['venue'] = 'Unavailable'