import { useContext, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import api from "../../../api";

export default function Form({ route, method }) {
  const { username, setUsername, password, setPassword } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    // setLoading(True);
    e.preventDefault();
    localStorage.setItem('nickname', username);

    try {
      console.log(route);
      const res = await api.post(route + "/", { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-containter">
        <h1 class="display-6 text-center">{name}</h1>
        <input
          className="form-input form-control"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input form-control"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {/* {loading && <Loading />} */}
        <button className="form-button btn btn-primary" type="submit">
          {name}
        </button>
      </form>
    </>
  );
}
