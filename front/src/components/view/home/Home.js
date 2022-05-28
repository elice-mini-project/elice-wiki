import { useSelector } from "react-redux";
import UserHome from "./UserHome";
import Intro from "../Intro/Intro";

const Home = () => {
  const userState = useSelector((state) => (state ? state.userReducer.user : null));
  return <>{userState?.authorized ? <UserHome /> : <Intro />}</>;
};

export default Home;
