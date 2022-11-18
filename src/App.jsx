import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import FavoriteList from "./FavoriteList";
import LatestSearch from "./LatestSearch";
import StockDetails from "./StockDetails";

function App() {
  const [values, setValues] = useState({
    stock: "",
    metaData: [],
    timeSeries: {},
    showResults: false,
    loading: false,
    error: "",
  });
  const [latestSearch, setLatestSearch] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const handleSetFavorite = (symbol) => {
    setFavorite([...favorite, symbol]);
  };

  const { stock, metaData, timeSeries, showResults, loading, error } = values;

  const SEARCH_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=60min&apikey=A4BR6EC7HSW45S2O`;

  const handleSearch = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    axios.get(SEARCH_URL).then((res) => {
      if (res.data["Error Message"]) {
        setValues({
          ...values,
          loading: false,
          error: res.data["Error Message"],
        });
      } else {
        const lastRefreshed = res.data["Meta Data"]["3. Last Refreshed"];
        setValues({
          ...values,
          metaData: res.data["Meta Data"],
          timeSeries: res.data["Time Series (60min)"][lastRefreshed],
          showResults: true,
          loading: false,
          error: "",
          stock: "",
        });
        setLatestSearch([res.data["Meta Data"]["2. Symbol"], ...latestSearch]);
      }
    });
  };

  const showError = () => (error ? <p className="error">{error}</p> : "");
  const showLoading = () =>
    loading ? <p className="loading">Loading...</p> : "";
  const searchForm = () => (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={stock}
        placeholder="Enter a stock symbol"
        onChange={(e) =>
          setValues({ ...values, stock: e.target.value.toUpperCase() })
        }
      />
      <button type="submit">Search</button>
    </form>
  );

  return (
    <div className="App">
      <h1>Search for a stock:</h1>
      {searchForm()}
      {showLoading()}
      {showError()}
      {showResults && (
        <StockDetails
          metaData={metaData}
          timeSeries={timeSeries}
          handleSetFavorite={handleSetFavorite}
          favorite={favorite}
        />
      )}
      {latestSearch.length > 0 && <LatestSearch latestSearch={latestSearch} />}
      {favorite.length > 0 && <FavoriteList favorite={favorite} />}
    </div>
  );
}

export default App;
