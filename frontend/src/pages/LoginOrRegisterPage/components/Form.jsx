import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(True);
    e.preventDefault();

    try {
      const res = api.post(route, { username, password });
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
      setLoading(False);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-containter">
        <h1>{name}</h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {/* {loading && <Loading />} */}
        <button className="form-button" type="submit">
          {name}
        </button>
      </form>
    </>
  );
}
