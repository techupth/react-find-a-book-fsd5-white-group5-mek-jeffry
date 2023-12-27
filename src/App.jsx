import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [bookList, setBookList] = useState([]);

  const getBookList = async () => {
    try {
      if (inputMessage.length === 0) {
        console.log("Empty!!");
        return;
      }
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputMessage}`
      );
      setBookList(result.data.items);
      console.log(result);
    } catch (error) {
      console.log("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
    }
  };

  useEffect(() => {
    getBookList();
  }, [inputMessage]);

  return (
    <div className="App">
      {
        <>
          <h1>Find a book</h1>
          <input
            type="text"
            onChange={(event) => {
              setInputMessage(event.target.value);
            }}
            value={inputMessage}
          />
          {(() => {
            if (inputMessage.length === 0) {
              return <p>Please type in the box</p>;
            } else if (bookList && bookList.length > 0) {
              return (
                <ul>
                  {bookList.map((item, index) => {
                    return <li key={index}>{item.volumeInfo.title}</li>;
                  })}
                </ul>
              );
            } else {
              return <p>Books not found</p>;
            }
          })()}
        </>
      }
    </div>
  );
}

export default App;
