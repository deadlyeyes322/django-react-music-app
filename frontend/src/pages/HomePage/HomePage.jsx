import NavBar from "../../components/NavBar";
import MainLabel from "./components/MainLabel"
import { useQuery } from "react-query";

const loadSpotifyData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
}

export default function HomePage() {
  const {status, data, isFetching, error} = useQuery('posts', loadSpotifyData);
  
  return (
    <>
      <NavBar />
      <MainLabel status={status}/>
    </>
  );
}
