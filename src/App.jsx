import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const getBookList = async (value) => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${value}`
    );
    setSearchResult(result.data.items);
  };

  useEffect(() => {
    getBookList(searchInput);
  }, [searchInput]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" onChange={(e) => setSearchInput(e.target.value)} />

      {searchResult.map((value) => {
        return (
          <div key={value.id}>
            <li>{value.volumeInfo.title}</li>
          </div>
        );
      })}
    </div>
  );
}

export default App;
