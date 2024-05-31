import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useEffect } from "react";
import ProfileTracks from "./components/ProfileTracks";

export default function ProfilePage() {
  const { profile_id, nickname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserParams = async () => {
      try {
        const res = await api.get("api/user/register/");
        console.log(res, profile_id, nickname);
        const check = res.data.some((element) => {
          return (element.id == profile_id) & (element.username == nickname);
        });
        if (!check) {
          navigate("/not_found");
        }
      } catch (error) {
        alert(error);
        navigate("/not_found");
      }
    };
    checkUserParams();
  }, []);

  return (
    <>
      <h1>Страница профиля {nickname}</h1>
      <ProfileTracks username={nickname}/>
    </>
  );
}
