import React, { useState, useEffect } from "react";
import "./App.scss";
// import image from "./Assets/book__picture.jpg";
import axios from "./axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import imageToBase64 from "image-to-base64/browser";
import imageCompression from "browser-image-compression";

function Card({ name, author, description, img, link }) {
  return (
    <div className="card">
      <img src={"data:image/png;base64," + img} alt="" className="card__img" />
      <div className="card__name">{name}</div>
      <div className="card__author">{author}</div>
      <div className="card__description">{description}</div>
      <a href={link} className="card__purchase__link">
        book link
      </a>
    </div>
  );
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [isScience, setIsScience] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  async function handleImageUpload(e) {
    let image = e.target.files[0];
    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      imageToBase64(URL.createObjectURL(compressedFile)) // Path to the image
        .then((response) => {
          console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
          setImage(response);
        })
        .catch((error) => {
          console.log(error); // Logs an error if there was one
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/v1/createBook", {
        bookName: name,
        bookAuthor: author,
        bookDescription: description,
        bookCatagory: catagory,
        bookLink: link,
        bookImage: image,
      })
      .then(alert("book created successfully"))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/v1/findAllBooks")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="heading">book library</div>
        <Switch>
          <Route path="/" exact>
            <input
              type="text"
              placeholder="search"
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
            />
            <label>
              <input
                type="checkbox"
                onChange={() => {
                  if (!isEnglish) {
                    setIsEnglish(true);
                  } else if (isEnglish) {
                    setIsEnglish(false);
                  }
                }}
              />
              catagory is English
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => {
                  if (!isScience) {
                    setIsScience(true);
                  } else if (isScience) {
                    setIsScience(false);
                  }
                }}
              />
              catagory is Science
            </label>
            <div className="content">
              {books
                .filter((book) =>
                  isScience
                    ? book.bookCatagory === "science"
                    : book.bookCatagory && isEnglish
                    ? book.bookCatagory === "english"
                    : book.bookCatagory && book.bookName.includes(filterValue)
                )
                .map((book) => {
                  return (
                    <Card
                      name={book.bookName}
                      author={book.bookAuthor}
                      description={book.bookDescription}
                      link={book.bookLink}
                      img={book.bookImage}
                    />
                  );
                })}
            </div>
          </Route>
          <Route path="/create">
            <>
              <div className="heading">create book</div>
              <form style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="text"
                  placeholder="book name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="book author"
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="book description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="book catagory"
                  onChange={(e) => {
                    setCatagory(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="book purchase link"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button onClick={handleSubmit}>create book</button>
              </form>
            </>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
