import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Venue from './components/Venue';
import Genre from './components/Genre';
import VenueInfo from './components/VenueInfo';
import Artists from './components/Artists';
import ArtistsPage from './components/ArtistsPage';
import GenreInstance from './components/GenreInstance';
import Provider from './components/Provider';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              {/* <img src="chick.png" alt="Logo" width="40" height="40" class="d-inline-block align-text-top"></img> */}
              CheapCheapTickets</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                {/* <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">Home</a>
                </li> */}
                <li class="nav-item">
                  <a class="nav-link" href="/about">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Venue">Events</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Artists">Artists</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Genre">Genre</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Provider">Visualization</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/venue/:eventId" element={<VenueInfo />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/artistspage/:artistId" element={<ArtistsPage />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/genre/:genreId" element={<GenreInstance />} />

          <Route path="/provider" element={<Provider />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;