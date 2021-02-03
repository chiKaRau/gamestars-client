import React, { useState, useEffect } from "react";

import axios from "axios";

//React Router
import { useParams, useHistory } from "react-router-dom";

export default function GamePage() {
  let params = useParams();
  let history = useHistory();
  const [game, setGame] = useState("");
  const [gameCover, setGameCover] = useState("");

  useEffect(() => {
    const getGameByID = async () => {
      try {
        let { data } = await fetchGameByID(params.gameId);
        if (data[0].screenshots !== undefined) {
          data[0].screenshots.map((e, index) => {
            return (e.url =
              "https:" + e.url.replace("t_thumb", "t_screenshot_med"));
          });
        }
        setGame(data[0]);
      } catch (e) {
        console.log(e);
      }
    };

    const getGameCoverByID = async () => {
      try {
        let { data } = await fetchGameCoverByID(params.gameId);
        setGameCover(data);
      } catch (e) {
        console.log(e);
      }
    };

    getGameCoverByID();
    getGameByID();
  }, []);

  let displayScreenshots =
    game.screenshots !== undefined
      ? game.screenshots.map((e, index) => {
          return <img alt="" src={e.url} />;
        })
      : "";

  return (
    <div>
      <h3>
        <button
          onClick={() => {
            history.replace("/");
            history.goBack();
          }}
        >
          Go back{" "}
        </button>
      </h3>
      {game.name}

      {displayScreenshots}
    </div>
  );
}

async function fetchGameByID(gameId) {
  let url = "https://Game-Stars.chikarau.repl.co/api/igdb/gameSearchByID/";
  return await axios.post(url, { gameId: gameId }).then((res) => res.data);
}

async function fetchGameCoverByID(gameId) {
  let url = "https://Game-Stars.chikarau.repl.co/api/igdb/gameCoverSearchByID/";
  return await axios.post(url, { gameId: gameId }).then((res) => res.data);
}
