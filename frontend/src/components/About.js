import React from 'react';
import AboutCard from './AboutCard';
import { useState, useEffect } from 'react';
import axios from 'axios'


function About() {

  const [githubStats, setGithubStats] = useState({
    "austin": [1, 1],
    "hudson": [1, 1],
    "christopher": [1, 1],
    "joseph arteaga": [1, 1],
    "joseph lee": [1, 1]
  });
  const [totalStats, setTotalStats] = useState([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/about');
        //const response = await axios.get('https://backend-dot-cs373-idb-428121.uc.r.appspot.com/about');
        setGithubStats(response.data);
        console.log(response.data + " GIT lab data")
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    calculateSums();
  }, [githubStats]);

  const calculateSums = () => {
    const totals = Object.values(githubStats).reduce((acc, curr) => {
      acc[0] += curr[0];
      acc[1] += curr[1];
      return acc;
    }, [0, 0]);

    setTotalStats(totals);
  };

  return (
    <>
      <h1 class="text-align mt-5 page-title">About Us</h1>
      <div class="row g-5 m-2">
        {
          Object.entries(githubStats).map(([name, stats], index) => {
            if (name.substring(0, 2) === "Au") {
              return (<AboutCard name="Austin Nguyen" role="Frontend" image="aboutPageAustin.jpg" bio="Junior Computer Science student at Univeristy of Texas at Austin. In my free time, I like to workout and swim." commits={stats[0]} issues={stats[1]} tests="3" />)

            } else if (name.substring(0, 2) === "hu") {
              return (<AboutCard name="Hudson Whipple" role="Frontend and Database" image="aboutPageHudson.jpg" bio="I’m a junior in CS at UT Austin that is fascinated by the innovation of Machine Learning, Data Science, and Software Engineering." commits={stats[0]} issues={stats[1]} tests="3" />)

            } else if (name.substring(0, 2) === "Ch") {
              return (<AboutCard name="Christopher Huelitl" role="Fullstack" image="aboutPageChris.jpg" bio="I am a sophomore CS major at UT Austin. I like to workout, play chess, and volunteer in my free time." commits={stats[0]} issues={stats[1]} tests="3" />)

            } else if (name.substring(0, 8) === "JosephAr") {
              return (<AboutCard name="Joseph Arteaga" role="APIs and Flask" image="aboutPageJosephArteaga.jpg" bio="Third year CS major at UT Austin with interest in cybersecurity and artificial intelligence." commits={stats[0]} issues={stats[1]} tests="3" />)

            } else if (name.substring(0, 8) === "JosephLe") {
              return (<AboutCard name="Joseph Lee" image="aboutPageJosephLee.jpg" role="Backend" bio=" I am a junior CS major at UT Austin. In my free time I enjoy swimming laps and watching movies." commits={stats[0]} issues={stats[1]} tests="3" />)
            }
            return(<></>)

          })
        }
      </div >

      <div class="row g-5 m-2 d-flex justify-content-center">
        <div class="about-custom-col" >
          <div class="card about-fixed-height-group border-0 about-colors">
            <div class="card-header"> <b>Group Stats & Tools</b> </div>
            <div class="card-body  d-flex flex-column align-items-start about-fixed-body text-start">
              <p><b>Stats: </b></p>
              <span>Total commits: {totalStats[0]}</span>
              <span>Total issues closed: {totalStats[1]}</span>
              <span>Total unit tests: 15</span>
              <span>Postman API: <a href="https://swe2024.postman.co/workspace/SWE2024~3231d72a-7b9f-433a-8568-37710e0405b5/collection/36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b?action=share&creator=36526083" target="_blank" rel="noreferrer">https://swe2024.postman.co/workspace/SWE2024~3231d72a-7b9f-433a-8568-37710e0405b5/collection/36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b?action=share&creator=36526083</a></span>
              <span>Issue Tracker: <a href="https://gitlab.com/chrisproj1/cs373-idb/-/issues" target="_blank" rel="noreferrer">https://gitlab.com/chrisproj1/cs373-idb/-/issues</a> </span>
              <span>Git Repo: <a href="https://gitlab.com/chrisproj1/cs373-idb" target="_blank" rel="noreferrer">https://gitlab.com/chrisproj1/cs373-idb</a></span>
              <span>Git wiki: <a href="https://gitlab.com/chrisproj1/cs373-idb/-/wikis/CheapCheapTicket?redirected_from=home" target="_blank"rel="noreferrer">https://gitlab.com/chrisproj1/cs373-idb/-/wikis/CheapCheapTicket?redirected_from=home</a></span>
              <span>Powerpoint: <a href="https://docs.google.com/presentation/d/1H1Ysu2IuRxMYXSaRuhCrvwu8WsUndB84O37wlJ4c9S4/edit?usp=sharing">Link to our Presentation</a></span>
              <br></br>
              <p><b>Tools:  </b></p>
              <div class="d-flex flex-wrap flex-row">
                <a href="https://react.dev/" target="_blank" rel="noreferrer"> <img class="about-tool-photo" src="/StaticImages/aboutPageReact.png" alt="react" ></img></a>
                <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer"> <img class="about-tool-photo" src="/StaticImages/aboutPageBootstrap.jpeg" alt="bootstrap" ></img></a>
                <a href="https://www.postman.com/" target="_blank" rel="noreferrer"> <img class="about-tool-photo" src="/StaticImages/aboutPagePostman.png" alt="postman" ></img></a>
                <a href="https://cloud.google.com/" target="_blank" rel="noreferrer"> <img class="about-tool-photo" src="/StaticImages/aboutPageGCP.png" alt="google cloud platform" ></img></a>
                <a href="https://flask.palletsprojects.com/en/3.0.x/" target="_blank" rel="noreferrer"> <img class="about-tool-photo" src="/StaticImages/aboutPageFlask.png" alt="flask" ></img></a>
              </div>
              <br></br>
              <p><b>Data:  </b></p>
              <span>Spotify API : <a href="https://developer.spotify.com/documentation/web-api" target="blank" rel="noreferrer">https://developer.spotify.com/documentation/web-api</a></span>
              <span>TicketMaster API : <a href="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/" target="blank" rel="noreferrer">https://developer.ticketmaster.com/products-and-docs/apis/getting-started/</a></span>
              <span>Collection : <a href="https://identity.getpostman.com/login?continue=https%3A%2F%2Fgo.postman.co%2Fworkspace%2FSWE2024~3231d72a-7b9f-433a-8568-37710e0405b5%2Fcollection%2F36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b%3Faction%3Dshare%26creator%3D36549615&intent=switch-account&target_team=swe2024" target="_blank" rel="noreferrer">https://identity.getpostman.com/login?continue=https%3A%2F%2Fgo.postman.co%2Fworkspace%2FSWE2024~3231d72a-7b9f-433a-8568-37710e0405b5%2Fcollection%2F36526083-b00b3adc-0cb6-44cb-ad61-01962ea8ec6b%3Faction%3Dshare%26creator%3D36549615&intent=switch-account&target_team=swe2024</a></span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default About;