import Post from "./Post";

function PostList() {
    const testData = {
        posts: [
            {
                post_id: "ce83120b-30a0-44c4-b91a-38acbb4f9eee",
                title: "왜 yarn을 써야하는가",
                user_id: "John Smith",
                tag: "#package-manager#etc",
                week: "etc",
            },
            {
                post_id: "f5d37d77-c100-4785-8939-dae239e64ee2",
                title: "node.js 기초",
                user_id: "Steve Stevenson",
                tag: "#nodeJs#javascript",
                week: "2",
            },
            {
                post_id: "4268a0ef-2c2f-4be2-b874-c1b3deff8e32",
                title: "react와 react-router-dom",
                user_id: "Michael Schof",
                tag: "#frontend#react#javascript",
                week: "4",
            },
            {
                post_id: "8d9f99fa-10c8-49d8-a47c-6e130e64e75d",
                title: "Express.js를 이용한 백엔드 구축(2)",
                user_id: "Egoing",
                tag: "#expressJs#backend#javascript",
                week: "7",
            },
        ],
    };

    return (
        <>
            {testData.posts.map((data) => (
                <Post data={data} />
            ))}
        </>
    );
}

export default PostList;
