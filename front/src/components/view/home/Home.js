import { useSelector } from "react-redux";
import Header from "../Header";
import Intro from "../Intro/Intro";
import UserHome from "./UserHome";
import PostList from "./PostList";
// import WeekList from "./WeekList";
import RecentList from "./RecentList";

const Home = () => {
  const userState = useSelector((state) => (state ? state.userReducer.user : null));

  return (
    <>
      {userState?.authorized ? (
        <>
          <Header />
          {/* <WeekList /> */}
          <UserHome />
          <PostList />
          <RecentList />
        </>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Home;
