import { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { spotifyTokenStoreContext } from "../App";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [musics, setMusics] = useState([]);
  const token = useContext(spotifyTokenStoreContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';

  function handleSubmit(event) {
    event.preventDefault();
    const query = inputValue;

    setSearchParams({post: query});
  }

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
        await copyMusic.push({
          id: searchData?.items[item]?.id,
          artist: searchData.items[item].artists.map((elem) => elem.name),
          name: searchData.items[item].name,
        });
      }
      setMusics(copyMusic);
    }
  };

  const navigateToMusicPage = (e) => {
    e.preventDefault();
    navigate(`/music/${e.target.id}`, {replace: true});
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" class="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="123" className="nav-link active">
                  My profile
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 music-found"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onChangeMusicBar}
              />
              <button type={"submit"} music-found="btn btn-outline-success">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
