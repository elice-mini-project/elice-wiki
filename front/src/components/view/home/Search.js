import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPosts, getTags } from "./HomeData";
import Header from "../Header";
import PostList from "./PostList";
import RecentList from "./RecentList";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import styled from "styled-components";
import WeekNav from "./WeekNav";
import Post from "./Post";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useSelector((state) => (state ? state.userReducer.user : null));
  const userAuthorized = userState?.authorized;

  const fetchSetState = (data) => {
    return setPosts((prev) => [...prev, ...data.payload.postListInfo]);
  };

  useEffect(() => {
    return setQuery(new URLSearchParams(location.search).get("search"));
  }, [location]);

  useEffect(() => {
    if (!userAuthorized) {
      return navigate("/auth");
    }
    getTags(setTags);
    getPosts(1, fetchSetState);
    setIsFetchCompleted(true);
  }, [userAuthorized, navigate]);

  if (!isFetchCompleted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ minHeight: "100vh", height: "auto" }}>
        <Header />
        <WeekNav setGoal={setGoal} />
        <Container>
          <ContentsSide>
            <div style={{ padding: "0 3%" }}>
              <TagBtn tags={tags} />
            </div>
          </ContentsSide>
          <Contents>
            {posts
              .filter((post) => post.title.match(new RegExp(query, "i")))
              .map((post) => <Post key={Math.random()} post={post} />)
              .slice(0, 5)}
          </Contents>
          <ContentsSide>
            {goal && <Goal goal={goal} />} <RecentList />
          </ContentsSide>
        </Container>
      </div>
    </>
  );
}

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 100px);
`;

const ContentsSide = styled.div`
  width: 25%;
  background-color: white;
  display: flex;
  padding: 2% 1%;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  width: 50%;
`;
