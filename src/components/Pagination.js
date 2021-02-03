import React from "react";

//React Router
import { Link } from "react-router-dom";

export default function Pagination(props) {
  let maxPage = Math.round(props.totalGamesCount / props.displayItem);
  let page = parseInt(props.page, 10);
  let displayPageButtons = () => {
    let ary = [];

    for (let i = 1; i < 10; i++) {
      if (props.page <= 4) {
        ary.push(
          <li key={i} className="page-item">
            <Link to={`/gamesList/${i}`}>
              <p className="border p-2"> {i} </p>
            </Link>
          </li>
        );
      } else {
        if (page + i - 5 <= maxPage) {
          ary.push(
            <li key={i - 5} className="page-item">
              <Link to={`/gamesList/${page + i - 5}`}>
                <p className="border p-2"> {page + i - 5} </p>
              </Link>
            </li>
          );
        }
      }
    }
    return ary;
  };

  return (
    <ul className="pagination">
      {/**Previous Button */}
      {page !== 1 && (
        <li className="page-item">
          <Link to={`/gamesList/${page - 1}`}>
            <p className="border p-2"> Previous </p>
          </Link>
        </li>
      )}

      {/**Page1 Button */}
      {page > 6 && (
        <li className="page-item">
          <Link to={`/gamesList/1`}>
            <p className="border p-2">1 </p>
          </Link>
        </li>
      )}

      {/**Page Buttons */}
      {displayPageButtons()}

      {/**Page1 Button */}
      {page < maxPage - 4 && (
        <li className="page-item">
          <Link to={`/gamesList/${maxPage}`}>
            <p className="border p-2">{maxPage}</p>
          </Link>
        </li>
      )}

      {/**Next Button */}
      {page !== maxPage && (
        <li className="page-item">
          <Link to={`/gamesList/${page + 1}`}>
            <p className="border p-2"> Next </p>
          </Link>
        </li>
      )}
    </ul>
  );
}
