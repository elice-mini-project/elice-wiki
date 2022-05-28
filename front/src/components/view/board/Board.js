import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  List,
  ListSubheader,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Spinner from "../../Spinner";
import Header from "../Header";
import styled from "styled-components";
import * as Api from "../../../api";

function Board() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState(undefined);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(undefined);

  const fetchboardsInfo = async () => {
    try {
      const { data } = await Api.getQuery("boardlist/pageinfo", `page=${page}&perPage=8`);
      setBoardList(data.payload?.boardList);
      setTotalPage(data.payload?.totalPage);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchboardsInfo();
  }, [page]);

  if (!isFetchCompleted) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            minWidth: "70%",
            height: "auto",
            margin: "1% 0 2% 0",
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
          <TableContainer component={Paper} variant="outlined">
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

                    <TableCell align="center">
                      [{board.header}]{board.title}
                    </TableCell>
                    <TableCell align="center">{board.userName}</TableCell>
                    <TableCell align="right">{board.createdAt.slice(0, 10)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {totalPage && (
          <Stack spacing={2} style={{ position: "fixed", top: "85%" }}>
            <Pagination count={totalPage} page={page} onChange={handlePage} color="primary" />
          </Stack>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: cal(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Board;
