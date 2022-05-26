import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  List,
  ListSubheader,
  Box,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Spinner from "../../Spinner";
import Header from "../Header";
import * as Api from "../../../api";

function Board() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState(undefined);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchboardsInfo = async () => {
    try {
      const { data } = await Api.get("boardlist");
      setBoardList(data.payload);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchboardsInfo();
  }, []);

  if (!isFetchCompleted) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              marginTop: "60px",
            }}
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
              aria-labelledby="nested-list-subheader"
            >
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: "700" }}>자유게시판</span>
                <IconButton onClick={() => navigate("/board/create")}>
                  <BorderColorIcon />
                </IconButton>
              </ListSubheader>
            </List>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>번호</TableCell>
                    <TableCell align="center">제목</TableCell>
                    <TableCell align="center">작성자</TableCell>
                    <TableCell align="right">날짜</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {boardList?.map((board) => (
                    <TableRow
                      key={board.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      onClick={() => navigate(`/board/${board.boardId}`)}
                      style={{ cursor: "pointer" }}
                      hover={true}
                    >
                      <TableCell component="th" scope="row">
                        {board.id}
                      </TableCell>
                      <TableCell align="center">{board.title}</TableCell>
                      <TableCell align="center">{board.userName}</TableCell>
                      <TableCell align="right">{board.createdAt.slice(0, 10)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}

export default Board;
