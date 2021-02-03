import React, { useState, useEffect } from "react";

//JQuery
import $ from "jquery";

//React Router
import { Link } from "react-router-dom";

//Axios
import axios from "axios";

export default function GameBoxes(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [gamesList, setGamesList] = useState([]);

  //skip - skip from which boxes
  //limit - limit the quanlity of fetching
  const updateGames = async (skip, limit) => {
    try {
      setIsError(false);
      setIsLoading(true);
      let newAry = await fetchGamesAll(skip, limit);
      setGamesList(() => [...gamesList, ...newAry.data]);
      fadeInBoxes();
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      console.log(e);
    }
  };

  //ComponentDidmount
  useEffect(() => {
    updateGames(0, getInitialGameBoxexLength(window.innerWidth) + 1);
  }, []);

  //ComponentDidUpdate for Scroll
  useEffect(() => {
    const handleScroll = () => {
      //const currentScrollY = window.scrollY;
      //console.log(currentScrollY);
      try {
        const wrappedElement = document.getElementById("gameBoxes");
        if (
          wrappedElement.getBoundingClientRect().bottom <= window.innerHeight
        ) {
          updateGames(gamesList.length, 6);
        }
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        console.log(e);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [gamesList]);
  /*
  let displayGamesList = gamesList.map((e, index) => {
    return (
      <div key={index++} class="m-3 p-3">
        <div class="gameBox m-3">
          <h5 class="text-center">{e.name}</h5>
        </div>
      </div>
    );
  });
  */
  let displayGamesList = gamesList.map((e, index) => (
    <div key={index++} className="flex-item m-3">
      <Link to={`/game/${e.id}`}>{e.name}</Link>
    </div>
  ));

  let displaySearchResultList = props.searchResultList.map((e, index = 0) => (
    <div key={index++} className="flex-item m-3">
      <Link to={`/game/${e.id}`}>{e.name}</Link>
    </div>
  ));

  return (
    <div id="gameBoxes">
      {/**Error Messages and DisplayList*/}
      {!isError ? (
        <div className="flex-cont flex-wrap-anim">
          {!props.isSearchMode ? displayGamesList : displaySearchResultList}
        </div>
      ) : (
        ""
      )}

      {/**Loading Spinner */}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

function fadeInBoxes() {
  let offset = 0;
  $(".gameBox").each(function (i, obj) {
    setTimeout(function () {
      $(obj).css({ opacity: 1 });
    }, 50 + offset);
    offset += 50;
  });
}

async function fetchGamesAll(skip = 0, limit) {
  let url = "https://Game-Stars.chikarau.repl.co/api/igdb/gamesAll/";
  return await axios
    .post(url, { skip: skip, limit: limit })
    .then((res) => res.data);
}

function getInitialGameBoxexLength(width) {
  //Large Devices
  if (width < 450) {
    return 3;
  } else if (width > 450 && width < 891) {
    return 6;
  } else if (width > 450 && width < 891) {
    return 9;
  } else if (width > 891 && width < 1158) {
    return 12;
  } else if (width > 1158 && width < 1441) {
    return 15;
  } else {
    return 18;
  }
}
