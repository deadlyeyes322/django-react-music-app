import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { spotifyStoreContext } from "../App";

export default function NavBar() {
  const [BarShowing, setBarShowing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [musics, setMusics] = useState([]);
  const token = useContext(spotifyStoreContext);

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
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: `${inputValue}`,
          type: "track",
        },
      });

      return data.tracks;
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeMusicBar2 = async (e) => {
    if (!e.target.value) {
      setBarShowing(false);
      setInputValue("");
      setMusics([]);
      return;
    }

    setInputValue(e.target.value);

    const searchData = await searchTrack();
    for (var item=0; item < 11; item++) {
      let copyMusic = musics.map(elem => elem).push({ id: searchData.items[item].id, name: searchData.items[item].name });
      setMusics(copyMusic);
    }
    console.log(musics);
  };

  return (
    <>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <form>
              <input
                className="music-found"
                type="text"
                onChange={onChangeMusicBar2}
              />
              <button type={"submit"}>Search</button>
              {/* {BarShowing && (
                <div className="found-bar">
                  {musics
                    .filter((elem) =>
                      elem.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((elem) => (
                      <div>{elem.name}</div>
                    ))}
                </div>
              )} */}
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
