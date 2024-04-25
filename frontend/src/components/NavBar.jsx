import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { spotifyTokenStoreContext } from "../App";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [musics, setMusics] = useState([]);
  const token = useContext(spotifyTokenStoreContext);
  const navigate = useNavigate();

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

  const onChangeMusicBar = async (e) => {
    if (!e.target.value) {
      setInputValue("");
      setMusics([]);
      return;
    }

    setInputValue(e.target.value);
    const searchData = await searchTrack();

    for (var item = 0; item < 20; item++) {
      let copyMusic = musics.map((elem) => elem);
      let check = false;
      for (var i = 0; i < copyMusic.length; i++) {
        if (copyMusic[i].id === searchData.items[item].id) check = true;
      }
      if (!check) {
        copyMusic.push({
          id: searchData.items[item].id,
          artist: searchData.items[item].artists.map((elem) => elem.name),
          name: searchData.items[item].name,
        });
      }
      setMusics(copyMusic);
    }
  };

  const navigateToMusicPage = (e) => {
    e.preventDefault();
    navigate(`/music/${e.target.id}`);
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
                onChange={onChangeMusicBar}
              />
              <button type={"submit"}>Search</button>
              {musics.length > 0 && (
                <div className="found-bar">
                  <ul>
                    {musics
                      // .filter((elem) =>
                      //   elem.name.toLowerCase().includes(inputValue.toLowerCase())
                      // )
                      .map((elem) => (
                        <li key={elem.id}>
                          <button id={elem.id} type="button" onClick={navigateToMusicPage}>
                            {elem.artist.map((e) => e)} - {elem.name}
                          </button>
                        </li>
                      ))}
                  </ul>
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
