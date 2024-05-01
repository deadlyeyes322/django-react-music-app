import { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { spotifyTokenStoreContext } from "../../App";
import Loading from "../../components/Loading";

const MusicPage = () => {
  const [dataState, setDataState] = useState({});
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
      setDataState(trackData);
      console.log(dataState);
    });

    setIsLoading(true);
  }, []);

  const handleClick = () => {
    setShowImage(!showImage);
  };

  return (
    <>
      <div className="MusicPage">
        {/* {isLoading && <Loading />} */}
        {showImage ? (
          <>
            <div className="image-open" onClick={handleClick}>
              <img
                class="rounded mx-auto d-block"
                src={dataState?.album?.images[0]?.url}
                width="600"
                height="600"
              />
            </div>
          </>
        ) : (
          <>
            <div className="music">
              <h6 className="display-6 text-center">
                {dataState?.artists?.map((e) => e.name)} - "
                {dataState?.name}"
              </h6>
            </div>
            <div className="main-track-poster">
              <img
                className="rounded mx-auto d-block"
                src={dataState?.album?.images[0]?.url}
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
