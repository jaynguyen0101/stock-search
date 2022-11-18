import React from "react";

const StockDetails = ({
  metaData,
  timeSeries,
  handleSetFavorite,
  favorite,
}) => {
  return (
    <>
      <h3>Stock Symbol: {metaData["2. Symbol"]}</h3>
      <button
        onClick={() => {
          if (!favorite.includes(metaData["2. Symbol"])) {
            handleSetFavorite(metaData["2. Symbol"]);
          } else {
            alert("This symbol is already in your favorites list.");
          }
        }}
      >
        Add to Favorites
      </button>

      <p>
        At {metaData["3. Last Refreshed"]} {metaData["6. Time Zone"]}
      </p>

      <table>
        <tbody>
          <tr>
            <td>Previous Close</td>
            <td>{timeSeries["4. close"]}</td>
          </tr>
          <tr>
            <td>Day's Range</td>
            <td>{timeSeries["3. low"] + " - " + timeSeries["2. high"]}</td>
          </tr>
          <tr>
            <td>Open</td>
            <td>{timeSeries["1. open"]}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{timeSeries["5. volume"]}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StockDetails;
