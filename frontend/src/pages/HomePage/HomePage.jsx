import { Link, useSearchParams } from "react-router-dom";
import MainLabel from "./components/MainLabel";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { spotifyTokenStoreContext } from "../../App";
import "./index.css"

export default function HomePage() {
  const [tracksSearch, setTracksSearch] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useContext(spotifyTokenStoreContext);
  const [layoutMode, setLayoutMode] = useState('row');

  useEffect(() => {
    if (searchParams.get("post")) {
      const fetch = async () => {
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                q: `${searchParams.get("post")}`,
                type: "track",
              },
            }
          );
          console.log(data.tracks.items);
          await setTracksSearch(
            data.tracks.items.map((elem) => {
              return {
                id: elem.id,
                song_name: elem.name,
                img: elem.album.images.map((elem) => elem.url),
              };
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    } else {
      setTracksSearch([]);
    }
  }, [searchParams]);

  return (
    <>
      <MainLabel />
      <div className={`music-grid`}>
        {tracksSearch.map((elem) => (
          <li className="card">
            <Link to={`music/${elem.id}`}>
              <img src={elem.img[1]} className="card-img-top" style={{width: "18rem" }}/>
              <div className="song-name"><h4>{elem.song_name}</h4></div>
              </Link>
          </li>
        ))}
      </div>
    </>
  );
}
