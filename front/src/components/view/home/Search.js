import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTags, getPosts } from "./HomeData";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import WeekNav from "./WeekNav";
import Header from "../Header";
import RecentList from "./RecentList";
import Post from "./Post";
import styled from "styled-components";

function Search() {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState(null);
    const [goal, setGoal] = useState(null);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchSetState = (data) => {
        setPosts((prev) => [...prev, ...data.payload.postListInfo]);
    };

    useEffect(() => {
        getTags(setTags);
        setIsFetchCompleted(true);
        getPosts(1, fetchSetState);
        setQuery(new URLSearchParams(location.search).get("search"));
    }, []);

    if (!isFetchCompleted) {
        return <div>Loading...</div>;
    }

    return (
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
                        .map((post, idx) => <Post key={idx} post={post} idx={idx} />)
                        .slice(0, 5)}
                </Contents>
                <ContentsSide>
                    {goal && <Goal goal={goal} />} <RecentList />
                </ContentsSide>
            </Container>
        </div>
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
    width: 17.5%;
    background-color: white;
    display: flex;
    padding: 2% 1%;
    flex-direction: column;
    align-items: center;
`;

const Contents = styled.div`
    width: 65%;
`;
