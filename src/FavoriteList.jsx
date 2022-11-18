import React from "react";

const FavoriteList = ({ favorite }) => {
  return (
    <>
      <h2>Favorite Symbols</h2>
      {favorite.map((favorite, i) => (
        <li key={i}>{favorite}</li>
      ))}
    </>
  );
};

export default FavoriteList;
