import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div class = "home-container d-flex justify-content-center align-items-center flex-column">
      <h2 class="home-page-text">Cheap Cheap Tickets</h2>
      <p class="home-page-text">Cheap tickets, Unforgettable Memories!</p>
      {/* <img src="chick.png" style="width: auto; height: auto;"></img> */}
      <hr></hr>
      <p class="home-page-text"> Start with one of the buttons below and begin exploring for the perfect events for you based on what is most important!</p>
      <div class="d-grid gap-4 col-6 mx-auto">
        <Link to="/artists" class=" btn btn-secondary drop-down-button" >Artists</Link>
        <Link to="/genre" class=" btn btn-secondary drop-down-button" >Genres</Link>
        <Link to="/venue" class=" btn btn-secondary drop-down-button" >Events</Link>
      </div>
    </div >
  );
}

export default Home;