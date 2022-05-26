import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Header";
import PostList from "./PostList";
import RecentList from "./RecentList";
import Loader from "../../Loader";
import WeekList from "./WeekList";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import { getPosts, getTags } from "./HomeData";
import { Button } from "@mui/material";
import styled from "styled-components";

function Search() {
  const [query, setQuery] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState(undefined);
  const [goal, setGoal] = useState(undefined);
  const [observing, setObserving] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  let num = 1;

  const target = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useSelector((state) => (state ? state.userReducer.user : null));
  const userAuthorized = userState?.authorized;

  const fetchSetState = (data) => {
    setPosts((prev) => [...prev, ...data.payload.postListInfo]);
    setObserving(true);
    setTotalPage(data.payload.totalPage);
    setIsLoaded(false);
  };

  const loadMore = () => setPage((curr) => curr + 1);

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("search"));
  }, [location]);

  useEffect(() => {
    if (!userAuthorized) {
      return navigate("/auth");
    }
    getTags(setTags);
    getPosts(page, fetchSetState);
    setIsFetchCompleted(true);
  }, [userAuthorized, navigate, page]);

  useEffect(() => {
    if (observing) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsLoaded(true);
            loadMore();
            num++;
            if (num >= totalPage) {
              observer.unobserve(target.current);
            }
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(target.current);
    }
  }, [observing, num, totalPage]);

  if (!isFetchCompleted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ minHeight: "100vh", height: "auto" }}>
        <Header />
        <WeekList setPosts={setPosts} posts={posts} setGoal={setGoal} />
        <Container>
          <ContentsSide>
            <div style={{ padding: "0 3%" }}>
              <TagBtn tags={tags} />
            </div>
          </ContentsSide>
          <Contents>
            <PostList posts={posts.filter((post) => post.title.match(new RegExp(query, "i")))} />
            <TargetElement ref={target}>{isLoaded && <Loader />}</TargetElement>
          </Contents>
          <ContentsSide>{goal && <Goal goal={goal} />}</ContentsSide>
        </Container>
        <RecentList />
      </div>
    </>
  );
}

export default Search;

const TargetElement = styled(Button)`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

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
  overflow-y: scroll;
  overflow-x: hidden;
  // &::-webkit-scrollbar {
  //     width: 10px;
  // }
  // &::-webkit-scrollbar-track {
  //     background: #f1f1f1;
  //     margin-left: -10px;
  // }
  &::-webkit-scrollbar-thumb {
    background: #7353ea;
  }
  // &::-webkit-scrollbar-thumb:hover {
  //     background: #555;
  // }
`;
