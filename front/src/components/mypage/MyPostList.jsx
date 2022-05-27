import React from "react";
import { CreateRounded, LibraryBooksRounded, CommentRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import styled from "styled-components";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled as Styled } from "@mui/material/styles";

const Accordion = Styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = Styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    cursor: "default !important",
    alignItems: "flex-start !important",
    flexDirection: "row",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(0deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(0),
    },
}));

const AccordionDetails = Styled(MuiAccordionDetails)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    marginTop: "-1rem",
}));

const MyPostList = ({ user }) => {
    const navigate = useNavigate();
    const [boardFirstList, setBoardFirstList] = React.useState(null);
    const [postFirstList, setPostFirstList] = React.useState(null);
    const [commentFirstList, setCommentFirstList] = React.useState(null);
    const [boardList, setBoardList] = React.useState(null);
    const [postList, setPostList] = React.useState(null);
    const [commentList, setCommentList] = React.useState(null);
    const [expanded, setExpanded] = React.useState([]);

    const handleClick = (panel) => {
        if (expanded.includes(panel)) {
            const newExpanded = expanded.filter((items) => items !== panel);
            setExpanded(newExpanded);
        } else {
            const newExpanded = [...expanded, panel];
            setExpanded(newExpanded);
        }
    };

    const getUserPostList = React.useCallback(async () => {
        // const { data } = await Api.get("postlist/user", user.__id);
        const data = {
            payload: [
                {
                    post_index: 55,
                    post_id: "eb5f0e10-2bce-4955-a111-d6dd0d4f0cfa",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 8,
                    tag: ["python"],
                    title: "mkdir test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T10:14:59.000Z",
                    updatedAt: "2022-05-25T10:14:59.000Z",
                },
                {
                    post_index: 54,
                    post_id: "ccf1ae92-78f5-4254-8fca-526c3a9199dc",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:27:12.000Z",
                    updatedAt: "2022-05-25T09:27:12.000Z",
                },
                {
                    post_index: 53,
                    post_id: "6939bed2-aee3-4e0a-971d-3795d24c8858",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:18:08.000Z",
                    updatedAt: "2022-05-25T09:18:08.000Z",
                },
                {
                    post_index: 52,
                    post_id: "d8243adf-d805-4dda-95a3-20fd9b65491f",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:15:29.000Z",
                    updatedAt: "2022-05-25T09:15:29.000Z",
                },
                {
                    post_index: 51,
                    post_id: "41c59e4f-e986-4241-a998-2ac20fc0590a",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:14:12.000Z",
                    updatedAt: "2022-05-25T09:14:12.000Z",
                },
                {
                    post_index: 50,
                    post_id: "abe2668b-d4f4-49ed-9ee5-e14c45dbfcbe",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:11:29.000Z",
                    updatedAt: "2022-05-25T09:11:29.000Z",
                },
                {
                    post_index: 49,
                    post_id: "f0bc6c3f-f2f6-4e44-bad7-8173c64f79c7",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:09:38.000Z",
                    updatedAt: "2022-05-25T09:09:38.000Z",
                },
                {
                    post_index: 48,
                    post_id: "1fc77af9-d430-4dfd-86e6-b4d0181c6d1a",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:08:45.000Z",
                    updatedAt: "2022-05-25T09:08:45.000Z",
                },
                {
                    post_index: 47,
                    post_id: "c7e3d20d-9673-4974-a8f1-760d2b1fa55f",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 5,
                    tag: ["directory"],
                    title: "directory test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T09:08:14.000Z",
                    updatedAt: "2022-05-25T09:08:14.000Z",
                },
                {
                    post_index: 46,
                    post_id: "41460487-0b6e-47b5-9572-4e1fda7af9a5",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 18,
                    tag: ["python"],
                    title: "update docs",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T08:59:08.000Z",
                    updatedAt: "2022-05-25T09:00:05.000Z",
                },
                {
                    post_index: 45,
                    post_id: "9d234f44-4b60-45f1-bb3f-95e99bf57a04",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 2,
                    tag: ["tensorflow"],
                    title: "update test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T08:58:02.000Z",
                    updatedAt: "2022-05-25T08:58:02.000Z",
                },
                {
                    post_index: 44,
                    post_id: "8260c0d9-845f-44f8-93a1-2a93fa379e69",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 2,
                    tag: ["tensorflow"],
                    title: "update test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T08:57:33.000Z",
                    updatedAt: "2022-05-25T08:57:33.000Z",
                },
                {
                    post_index: 43,
                    post_id: "bdc9414c-240c-43ae-bddc-89b79515486c",
                    user_id: "57523f1b-aa5a-4865-8ce7-493a8e83c354",
                    date: "2022-04-24T15:00:00.000Z",
                    week: 2,
                    tag: ["tensorflow"],
                    title: "update test",
                    lastmod_user: "sangwon lee",
                    createdAt: "2022-05-25T08:56:21.000Z",
                    updatedAt: "2022-05-25T08:56:21.000Z",
                },
            ],
        };
        if (data.payload.length > 3) {
            setPostFirstList(data.payload.slice(0, 3));
            setPostList(data.payload.slice(3));
        } else {
            setPostFirstList(data.payload);
        }
    });
    const getUserBoardList = React.useCallback(async () => {
        const { data } = await Api.get("boardlist/user", user.__id);
        if (data.payload.length > 3) {
            setBoardFirstList(data.payload.slice(0, 3));
            setBoardList(data.payload.slice(3));
        } else {
            setBoardFirstList(data.payload);
        }
    });
    const getUserCommentList = React.useCallback(async () => {
        const { data } = await Api.get("commentlist/user", user.__id);
        if (data.payload.length > 3) {
            setCommentFirstList(data.payload.slice(0, 3));
            setCommentList(data.payload.slice(3));
        } else {
            setCommentFirstList(data.payload);
        }
    });

    React.useEffect(() => {
        getUserBoardList();
        getUserCommentList();
        getUserPostList();
    }, []);

    return (
        <div style={{ width: "60vw" }}>
            <Wrapper>
                <Accordion expanded={expanded.includes("POSTS")}>
                    <AccordionSummary
                        aria-controls="POSTS"
                        id="POSTS"
                        expandIcon={
                            expanded.includes("POSTS") ? (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("POSTS")}
                                >
                                    - 줄이기
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("POSTS")}
                                >
                                    + 더보기
                                </div>
                            )
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "fit-content",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <CreateRounded sx={{ fontSize: "3rem" }} />
                                    <Typography
                                        sx={{
                                            fontSize: "2.2rem",
                                            fontWeight: "bold",
                                            marginLeft: "1rem",
                                            height: "48px",
                                        }}
                                    >
                                        포스팅
                                    </Typography>
                                </div>
                                <div style={{ marginTop: "2rem", marginLeft: "1rem" }}>
                                    <ul>
                                        {postFirstList &&
                                            postFirstList.map((post, index) => {
                                                return (
                                                    <List key={`Fpost-${index}`}>
                                                        <Link
                                                            onClick={() => {
                                                                /*navigate(`/board/${post.post_id}`)*/
                                                            }}
                                                        >
                                                            {post.title}
                                                        </Link>
                                                    </List>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                            <Typography
                                sx={{ marginLeft: "0.7rem", position: "relative", top: "22px" }}
                            >
                                내가 작성한 포스트
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {postList &&
                                postList.map((post, index) => {
                                    return (
                                        <List key={`post-${index}`}>
                                            <Link
                                                onClick={() => {
                                                    /*navigate(`/board/${post.post_id}`)*/
                                                }}
                                            >
                                                {post.title}
                                            </Link>
                                        </List>
                                    );
                                })}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </Wrapper>
            <Wrapper style={{ borderTop: "2px solid #7353ea" }}>
                <Accordion expanded={expanded.includes("BOARD")}>
                    <AccordionSummary
                        aria-controls="BOARD"
                        id="BOARD"
                        expandIcon={
                            expanded.includes("BOARD") ? (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("BOARD")}
                                >
                                    - 줄이기
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("BOARD")}
                                >
                                    + 더보기
                                </div>
                            )
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "fit-content",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <LibraryBooksRounded sx={{ fontSize: "3rem" }} />
                                    <Typography
                                        sx={{
                                            fontSize: "2.2rem",
                                            fontWeight: "bold",
                                            marginLeft: "1rem",
                                            height: "48px",
                                        }}
                                    >
                                        게시판
                                    </Typography>
                                </div>
                                <div style={{ marginTop: "2rem", marginLeft: "1rem" }}>
                                    <ul>
                                        {boardFirstList &&
                                            boardFirstList.map((board, index) => {
                                                return (
                                                    <List key={`Fboard-${index}`}>
                                                        <Link
                                                            onClick={() => {
                                                                navigate(`/board/${board.boardId}`);
                                                            }}
                                                        >
                                                            {board.title}
                                                        </Link>
                                                    </List>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                            <Typography
                                sx={{ marginLeft: "0.7rem", position: "relative", top: "22px" }}
                            >
                                내가 작성한 게시글
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {boardList &&
                                boardList.map((board, index) => {
                                    return (
                                        <List key={`board-${index}`}>
                                            <Link
                                                onClick={() => {
                                                    navigate(`/board/${board.boardId}`);
                                                }}
                                            >
                                                {board.title}
                                            </Link>
                                        </List>
                                    );
                                })}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </Wrapper>
            <Wrapper style={{ borderTop: "2px solid #7353ea" }}>
                <Accordion expanded={expanded.includes("COMMENTS")}>
                    <AccordionSummary
                        aria-controls="COMMENTS"
                        id="COMMENTS"
                        expandIcon={
                            expanded.includes("COMMENTS") ? (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("COMMENTS")}
                                >
                                    - 줄이기
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("COMMENTS")}
                                >
                                    + 더보기
                                </div>
                            )
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "fit-content",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <CommentRounded sx={{ fontSize: "3rem" }} />
                                    <Typography
                                        sx={{
                                            fontSize: "2.2rem",
                                            fontWeight: "bold",
                                            marginLeft: "1rem",
                                            height: "48px",
                                        }}
                                    >
                                        댓글
                                    </Typography>
                                </div>
                                <div style={{ marginTop: "2rem", marginLeft: "1rem" }}>
                                    <ul>
                                        {commentFirstList &&
                                            commentFirstList.map((comment, index) => {
                                                return (
                                                    <List key={`Fcomment-${index}`}>
                                                        <Link
                                                            onClick={() => {
                                                                navigate(
                                                                    `/board/${comment.boardId}`,
                                                                );
                                                            }}
                                                        >
                                                            {comment.content}
                                                        </Link>
                                                    </List>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </div>
                            <Typography
                                sx={{ marginLeft: "0.7rem", position: "relative", top: "22px" }}
                            >
                                내가 작성한 댓글
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {commentList &&
                                commentList.map((comment, index) => {
                                    return (
                                        <List key={`comment-${index}`}>
                                            <Link
                                                onClick={() => {
                                                    navigate(`/board/${comment.boardId}`);
                                                }}
                                            >
                                                {comment.content}
                                            </Link>
                                        </List>
                                    );
                                })}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </Wrapper>
        </div>
    );
};

const Link = styled.a`
    text-decoration: underline;
    cursor: pointer;
    font-size: 1.2rem;
`;
const Wrapper = styled.div`
    padding: 30px 0 30px 0;
`;
const List = styled.li`
    padding: 8px;
    margin-left: 35px;
`;

export default MyPostList;
