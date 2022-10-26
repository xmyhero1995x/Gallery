import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import { Collection } from "./Collection";

const cats = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountain" },
  { name: "Architecture" },
  { name: "City" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearhValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://6358fb79ff3d7bddb995a3a6.mockapi.io/Collection?${
        categoryId ? `category=${categoryId}` : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  return (
    <div className={styles.app}>
      <h1>My gallery</h1>
      <div className={styles.top}>
        <ul className={styles.tags}>
          {cats.map((obj, index) => (
            <li
              className={categoryId === index ? styles.active : ""}
              key={index}
              onClick={() => setCategoryId(index)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => setSearhValue(e.target.value)}
          className={styles["search-input"]}
          placeholder="Search by name"
        />
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <h2>Downloading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection name={obj.name} images={obj.photos} key={index} />
            ))
        )}
      </div>
      <ul className={styles.pagination}>
        <li>1</li>
        <li className={styles.active}>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
