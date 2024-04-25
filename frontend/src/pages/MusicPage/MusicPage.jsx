import { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { spotifyTokenStoreContext } from "../../App";
import Loading from "../../components/Loading";

const MusicPage = () => {
  const dataRef = useRef({});
  const { id } = useParams();
  const token = useContext(spotifyTokenStoreContext);
  const [showImage, setShowImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    const Fetching = async () => {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/tracks/" + `${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    Fetching().then((trackData) => {
      dataRef.current = trackData;
      console.log(dataRef.current);
    });

    setIsLoading(true);
  }, []);

  const handleClick = () => {
    setShowImage(!showImage);
  };

  return (
    <>
      <div className="MusicPage">
        <NavBar />
        {isLoading && <Loading />}
        {showImage ? (
          <>
            <div className="image-open" onClick={handleClick}>
              <img
                src={dataRef.current.album?.images[0]?.url}
                width="600"
                height="600"
              />
            </div>
          </>
        ) : (
          <>
            <div className="music">
              <h1>
                {dataRef.current?.artists?.map((e) => e.name)} - "
                {dataRef.current.name}"
              </h1>
            </div>
            <div className="main-track-poster">
              <img
                src={dataRef.current.album?.images[0]?.url}
                width="300"
                height="300"
                onClick={handleClick}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MusicPage;
