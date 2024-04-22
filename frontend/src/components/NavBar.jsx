import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NavBar({ token }) {
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
    {
      name: "world"
    }
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

  const searchTrack = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: `${inputValue}`,
        type: "track",
    }
    });
    console.log(data.tracks.items[0].artists[0].name);
  };

  return (
    <>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <form onSubmit={searchTrack}>
              <input
                className="music-found"
                type="text"
                onChange={onChangeMusicBar}
              />
              <button type={"submit"}>Search</button>
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
            </form>
          </li>
          <li>
            <Link to="123">My page</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
