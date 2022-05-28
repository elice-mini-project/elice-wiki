import React, { useState, useEffect, useRef } from "react";
import Loader from "../../Loader";
import { getPosts } from "./HomeData";
import { Button } from "@mui/material";
import styled from "styled-components";
import Post from "./Post";

function HomePost() {
    const [posts, setPosts] = useState([]);
    // const [goal, setGoal] = useState(undefined);
    const [observing, setObserving] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);
    const target = useRef();
    let num = 1;

    const fetchSetState = (data) => {
        setPosts((prev) => [...prev, ...data.payload.postListInfo]);
        setObserving(true);
        setTotalPage(data.payload.totalPage);
        setIsLoaded(false);
    };

    const loadMore = () => {
        setPage((curr) => curr + 1);
    };

    useEffect(() => {
        getPosts(page, fetchSetState);
        setIsFetchCompleted(true);
    }, [page]);

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
    }, [observing, num]);

    if (!isFetchCompleted) {
        return <div>로딩중</div>;
    }

    return (
        <>
            {posts.map((post, idx) => (
                <Post key={`post_${idx}`} post={post} idx={idx} />
            ))}
            <TargetElement ref={target}>{isLoaded && <Loader />}</TargetElement>
        </>
    );
}

const TargetElement = styled(Button)`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

export default HomePost;
