import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../../../api";
import { Rate } from "antd";

export default function ProfileTracks({username}) {
  const [data, setData] = useState([]);
  const dataFetch = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataFetch.current) {
      const getUserTracks = async () => {
        try {
          const req = await api.get(
            `api/track-ratings/?user=${username}`
          );
          const copyArr = [];
          for (let i = 0; i < req.data.length; i++) {
            console.log(i);
            const musicReq = await api.get(
              `api/music/?id=${req.data[i].track}`
            );
            musicReq.data[0].rating = req.data[i].rating;
            console.log("copyArr", copyArr);
            copyArr.push(musicReq.data);
            console.log("copyArr 2", copyArr);
          }
          return copyArr;
        } catch (error) {
          console.log(error);
        }
      };
      getUserTracks().then((res) => {setData(res); console.log(data);});
      dataFetch.current = false;
    }
    setLoading(true);
  }, []);

  return (
    <>
      {loading && (
        <ul className="profile-track-list">
          {data.map((e) => (
            <Link to={`/music/${e[0].spotify_id}`} replace={true}>
              <li key={e[0].spotify_id} className="profile-card">
                <img src={e[0].image} />
                {e[0].artist_name} - "{e[0].song_title}"
                <Rate disabled defaultValue={e[0].rating} />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
