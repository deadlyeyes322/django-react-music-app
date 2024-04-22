import NavBar from "../../components/NavBar";
import MainLabel from "./components/MainLabel";
import { useQuery } from "react-query";

export default function HomePage({ token }) {
  return (
    <>
      <NavBar token={token}/>
      <MainLabel status={status} />
    </>
  );
}
