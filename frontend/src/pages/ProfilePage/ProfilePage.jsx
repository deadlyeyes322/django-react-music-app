import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useEffect } from "react";

export default function ProfilePage() {
  const { profile_id, nickname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserParams = async () => {
      try {
        const res = await api.get("api/user/register/");
        console.log(res);
        if (res.data[profile_id - 1] == undefined) {
          navigate("/not_found");
          return;
        } else if (res.data[profile_id - 1].username != nickname) {
            
          navigate("/not_found");
          return;
        }
      } catch (error) {
        alert(error);
        navigate("/not_found");
      }
    };
    checkUserParams();
  }, []);

  return <h1>Страница профиля {nickname}</h1>;
}
