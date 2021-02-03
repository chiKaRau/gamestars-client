import React, { useState, useEffect } from "react";

//React Router
import { useParams, useHistory } from "react-router-dom";

//Components
import SearchBar from "./SearchBar";
import GameTable from "./GameTable";
import GameBoxes from "./GameBoxes";

//Axios
import axios from "axios";

export default function GamesList() {
  let params = useParams();
  if (params.page === undefined || params.page < 0) {
    params.page = 1;
  }

  //Search Bar
  const [keyword, setKeyword] = useState("");
  const [searchResultList, setsearchResultList] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isError, setIsError] = useState(false);

  //Display mode
  const [displayMode, setDisplayMode] = useState("table");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let { data } = await fetchGameSearch(keyword);
      console.log(data);
      setIsSearchMode(true);
      setsearchResultList(data);
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
  };

  const toggleDisplayMode = () => {
    if (displayMode === "table") {
      return setDisplayMode("boxes");
    }
    return setDisplayMode("table");
  };

  return (
    <>
      {/**Search Bar */}
      <SearchBar
        setKeyword={setKeyword}
        handleSubmit={handleSubmit}
        displayMode={displayMode}
        toggleDisplayMode={toggleDisplayMode}
      />

      {displayMode === "table" ? (
        //GameTable
        <GameTable
          params={params}
          isSearchMode={isSearchMode}
          searchResultList={searchResultList}
        />
      ) : (
        //GameBoxes
        <GameBoxes
          params={params}
          isSearchMode={isSearchMode}
          searchResultList={searchResultList}
        />
      )}
    </>
  );
}

async function fetchGameSearch(keyword) {
  let url = "https://Game-Stars.chikarau.repl.co/api/igdb/gameSearchByKeyword/";
  return await axios.post(url, { keyword: keyword }).then((res) => res.data);
}
