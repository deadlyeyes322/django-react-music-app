import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [BarShowing, setBarShowing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const musics = [
    {
      name: "Катафалка",
    },
    {
      name: "каток",
    },
    {
      name: "hello",
    },
  ];

  const onChangeMusicBar = (e) => {
    if (e.target.value) {
      setBarShowing(true);
      setInputValue(e.target.value);
    } else {
      setBarShowing(false);
      setInputValue("");
    }
  };

  return (
    <>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <input
              className="music-found"
              type="text"
              onChange={onChangeMusicBar}
            />
            {BarShowing && (
              <div className="found-bar">
                {musics
                  .filter((elem) =>
                    elem.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((elem) => (
                    <div>{elem.name}</div>
                  ))}
              </div>
            )}
          </li>
          <li>
            <Link to="123">My page</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
