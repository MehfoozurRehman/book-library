import React, { useState } from "react";
import "./App.scss";
import image from "./Assets/book__picture.jpg";

function Card({ name, author, description, img, link }) {
  return (
    <div className="card">
      <img src={img} alt="" className="card__img" />
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
  const [filterValue, setFilterValue] = useState("");
  const [isScience, setIsScience] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const books = [
    {
      name: "name 1",
      img: image,
      author: "author 1",
      catagory: "science",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae aut facilis, dolore maxime tenetur, nisi adipisci eius perferendis quaerat enim praesentium necessitatibus vero rerum modi vitae quos inventore esse corrupti? 1",
      link: "www.google.com",
    },
    {
      name: "name 2",
      img: image,
      author: "author 2",
      catagory: "english",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae aut facilis, dolore maxime tenetur, nisi adipisci eius perferendis quaerat enim praesentium necessitatibus vero rerum modi vitae quos inventore esse corrupti? 2",
      link: "www.google.com",
    },
  ];

  return (
    <div className="App">
      <div className="heading">book library</div>
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
            book.name.includes(filterValue) && isScience
              ? book.catagory === "science"
              : book.catagory && isEnglish
              ? book.catagory === "english"
              : book.catagory
          )
          .map((book) => {
            return (
              <Card
                name={book.name}
                author={book.author}
                description={book.description}
                link={book.link}
                img={book.img}
              />
            );
          })}
      </div>
    </div>
  );
}
