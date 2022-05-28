import { useEffect, useState } from "react";
import { getTagPosts } from "./HomeData";
import { useParams } from "react-router-dom";
import Post from "./Post";

function TagPost() {
    const [posts, setPosts] = useState([]);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const params = useParams();
    const tag = params.tag;

    useEffect(() => {
        getTagPosts(setPosts, tag);
        setIsFetchCompleted(true);
    }, [tag]);

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

export default TagPost;
