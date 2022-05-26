import { useSelector } from "react-redux";
import Intro from "../Intro/Intro";
import UserHome from "./UserHome";

const Home = () => {
  const userState = useSelector((state) => (state ? state.userReducer.user : null));

  return <>{userState?.authorized ? <UserHome /> : <Intro />}</>;
};

export default Home;
