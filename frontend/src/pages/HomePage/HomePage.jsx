import { useContext } from "react";
import NavBar from "../../components/NavBar";
import MainLabel from "./components/MainLabel";
import { useQuery } from "react-query";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <MainLabel />
    </>
  );
}
