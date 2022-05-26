import { useEffect, useState } from "react";
import { getWeekPosts } from "./HomeData";
import { useParams } from "react-router-dom";
import Post from "./Post";

function WeekPost() {
    const [posts, setPosts] = useState([]);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const params = useParams();
    const week = params.week;

    useEffect(() => {
        getWeekPosts(setPosts, week);
        setIsFetchCompleted(true);
    }, [week]);

    if (!isFetchCompleted) {
        return <div>로딩중</div>;
    }

    return (
        <>
            {posts.map((post, idx) => (
                <Post key={`post_${idx}`} post={post} idx={idx} />
            ))}
        </>
    );
}

export default WeekPost;
