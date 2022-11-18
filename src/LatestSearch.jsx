import React from "react";

const LatestSearch = ({ latestSearch }) => {
  return (
    <>
      <h2>Latest Searches:</h2>
      <ul>
        {latestSearch.map((search, i) => (
          <li key={i}>{search}</li>
        ))}
      </ul>
    </>
  );
};

export default LatestSearch;
