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
  const [page, setPage] = useState(1);
  const category = categoryId ? `category=${categoryId}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://6358fb79ff3d7bddb995a3a6.mockapi.io/Collection?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

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
        {[...Array(5)].map((_, index) => (
          <li
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
