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
    const { data } = await Api.get("post/userid");
    const getData = data.payload.postListInfo;
    if (getData.length > 3) {
      setPostFirstList(getData.slice(0, 3));
      setPostList(getData.slice(3));
    } else {
      setPostFirstList(getData);
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
              <Typography sx={{ marginLeft: "0.7rem", position: "relative", top: "22px" }}>
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
              <Typography sx={{ marginLeft: "0.7rem", position: "relative", top: "22px" }}>
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
                                navigate(`/board/${comment.boardId}`);
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
              <Typography sx={{ marginLeft: "0.7rem", position: "relative", top: "22px" }}>
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
