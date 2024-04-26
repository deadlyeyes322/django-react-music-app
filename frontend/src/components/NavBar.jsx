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
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand">
            Home
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="123" class="nav-link active">
                  My peofile
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="music-found"
                onChange={onChangeMusicBar}
              />
              <button type={"submit"} class="btn btn-outline-success">
                Search
              </button>
              {musics.length > 0 && (
                <ul>
                  {musics
                    // .filter((elem) =>
                    //   elem.name.toLowerCase().includes(inputValue.toLowerCase())
                    // )
                    .map((elem) => (
                      <li key={elem.id}>
                        <button
                          class="dropdown-item btn btn-secondary dropdown-toggle"
                          id={elem.id}
                          type="button"
                          onClick={navigateToMusicPage}
                        >
                          {elem.artist.map((e) => e)} - {elem.name}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
