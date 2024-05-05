import { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { spotifyTokenStoreContext } from "../../App";
import './index.css';
import Loading from "../../components/Loading";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { Rate } from "antd";

const MusicPage = () => {
  const [dataState, setDataState] = useState({});
  const { id } = useParams();
  const token = useContext(spotifyTokenStoreContext);
  const [showImage, setShowImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

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

    setIsLoading(false);
  }, []);

  const handleClick = () => {
    setShowImage(!showImage);
  };

  return (
    <>
      <div className="MusicPage">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="music">
              <h6 className="display-6 text-center">
                {dataState?.artists?.map((e) => e.name)} - "{dataState?.name}"
              </h6>
            </div>
            <div className="main-track-poster">
              <img
                className="rounded mx-auto d-block"
                src={dataState?.album?.images[1]?.url}
                onClick={handleClick}
              />
            </div>
            <div className="music-rate">
              <Rate allowHalf defaultValue={0} style={{ fontSize: 50 }}/>
            </div>
            <Modal
              show={showImage}
              onHide={handleClick}
              centered
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {dataState?.artists?.map((e) => e.name)} - "{dataState?.name}"
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Image src={dataState?.album?.images[0]?.url} fluid />
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default MusicPage;
