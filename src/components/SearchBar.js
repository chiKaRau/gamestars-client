import React, { useEffect } from "react";
import $ from "jquery";

export default function SearchBar(props) {
  //ComponentDidUpdate for Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      //Large Devices
      if (currentScrollY > 80) {
        $(".navbar").css({ position: "fixed", top: 0 });
      } else {
        $(".navbar").css({ position: "relative" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let toggleIcon = props.displayMode === "table" ? "list" : "th-large";

  return (
    <nav
      id="SearchBar"
      className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center"
    >
      <div className="m-2">
        <button className="btn btn-success" onClick={props.toggleDisplayMode}>
          <i
            className={`fa fa-${toggleIcon}`}
            style={{ fontSize: 24 }}
            aria-hidden="true"
          />
        </button>
      </div>

      <form className="form-inline" onSubmit={(evt) => props.handleSubmit(evt)}>
        <input
          className="form-control mr-sm-2"
          type="text"
          onChange={(evt) => props.setKeyword(evt.target.value)}
          placeholder="Search"
        />
        <button className="btn btn-success" type="submit">
          <i
            className="fa fa-search"
            style={{ fontSize: 24 }}
            aria-hidden="true"
          />
        </button>
      </form>
    </nav>
  );
}
