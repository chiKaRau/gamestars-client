import React, { useState, useEffect } from "react";

//React Router
import { Link } from "react-router-dom";

//Components
import Pagination from "./Pagination";

//Axios
import axios from "axios";

export default function GameTable(props) {
  const [gamesList, setGamesList] = useState([]);
  const [totalGamesCount, setTotalGamesCount] = useState("");
  const [isError, setIsError] = useState(false);
  const displayItem = 50;

  useEffect(() => {
    const getGamesAll = async () => {
      try {
        let { data } = await fetchGamesAll(
          (props.params.page - 1) * displayItem,
          displayItem
        );
        setGamesList(data);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    };

    const getTotalGamesCount = async () => {
      try {
        let { data } = await fetchTotalGamesCount();
        setTotalGamesCount(data.count);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    };

    getGamesAll();
    getTotalGamesCount();
  }, [props.params.page]);

  let displayGamesList = gamesList.map((e, index = 0) => (
    <tr key={index++}>
      <td>{(props.params.page - 1) * displayItem + index}</td>
      <td>
        <Link to={`/game/${e.id}`}>{e.id}</Link>
      </td>
      <td>{e.name}</td>
      <td>{e.popularity}</td>
    </tr>
  ));

  let displaySearchResultList = props.searchResultList.map((e, index = 0) => (
    <tr key={index++}>
      <td>{index}</td>
      <td>
        <Link to={`/game/${e.id}`}>{e.id}</Link>
      </td>
      <td>{e.name}</td>
      <td>{e.popularity}</td>
    </tr>
  ));

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {!props.isSearchMode ? displayGamesList : displaySearchResultList}
        </tbody>
      </table>
      {!props.isSearchMode ? (
        <Pagination
          page={props.params.page}
          totalGamesCount={totalGamesCount}
          displayItem={displayItem}
        />
      ) : (
        ""
      )}
    </>
  );
}

async function fetchGamesAll(skip, limit) {
  let url = "https://Game-Stars.chikarau.repl.co/api/igdb/gamesAll/";
  return await axios
    .post(url, { skip: skip, limit: limit })
    .then((res) => res.data);
}

async function fetchTotalGamesCount() {
  let url = "https://Game-Stars.chikarau.repl.co/api/igdb/totalGamesCount/";
  return await axios.post(url).then((res) => res.data);
}
