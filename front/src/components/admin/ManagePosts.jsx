import React from "react";
import * as Api from "../../api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Pagination, Stack, Popover, Typography, Checkbox } from "@mui/material";

const ManageUsers = () => {
    const [data, setData] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checkedList, setCheckedList] = React.useState([]);
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(null);
    const perPage = 15;

    const handleClick = (event) => {
        const userId = event.currentTarget.innerText;
        setAnchorEl(event.currentTarget);
        getUser(userId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const getUser = React.useCallback(async (userId) => {
        try {
            const { data } = await Api.get("users", userId);
            setUser(data.payload);
        } catch (e) {
            console.log(e);
        }
    });

    const getData = React.useCallback(async () => {
        try {
            const { data } = await Api.getQuery("posts", `page=${page}&perPage=${perPage}`);
            setData(data.payload?.postListInfo);
            setTotalPage(data.payload?.totalPage);
        } catch (e) {
            console.log(e);
        }
    });

    React.useEffect(() => {
        getData();
    }, [page]);

    const checkAll = (e) => {
        if (e.target.checked) {
            const idList = data.map((datum) => datum.post_id);
            setCheckedList(idList);
        } else {
            setCheckedList([]);
        }
    };
    const checkHandler = (e) => {
        if (e.target.checked) {
            const newCheckedList = [...checkedList, e.target.value];
            setCheckedList(newCheckedList);
        } else {
            const newCheckedList = checkedList.filter((id) => id !== e.target.value);
            setCheckedList(newCheckedList);
        }
    };
    const pageHandler = (event, value) => {
        setPage(value);
    };
    const controller = async (e) => {
        const checkedIdString = checkedList.join(",");
        if (e.target.name === "deletePost") {
            const { data } = await Api.delete("posts", checkedIdString);
            alert(`${data.payload.success}개의 게시글이 삭제되었습니다.`);
            getData();
        }
        setCheckedList([]);
        document.getElementById("checkAll").checked = false;
    };
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "100%", height: "100%" }}>
                <ControllerContainer>
                    <Button variant="outlined" onClick={controller} name="deletePost" color="error">
                        삭제하기
                    </Button>
                </ControllerContainer>
                <Table>
                    <Thead>
                        <Tr color="#C2C2C2">
                            <Th>
                                <Checkbox id="checkAll" onChange={checkAll} />
                            </Th>
                            <Th>No.</Th>
                            <Th>PostId</Th>
                            <Th>Title</Th>
                            <Th>작성자</Th>
                            <Th>최종수정</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map((datum, index) => {
                                return (
                                    <Tr key={`users/${index}`} color={checkedList.includes(datum.post_id) ? "#e0e0e0" : "white"}>
                                        <Td>
                                            <Checkbox
                                                value={datum.post_id}
                                                onClick={checkHandler}
                                                checked={checkedList.includes(datum.post_id) ? true : false}
                                            />
                                        </Td>
                                        <Td>{datum.post_index}</Td>
                                        <Td>{datum.post_id}</Td>
                                        <Td>
                                            <Title
                                                onClick={() => {
                                                    navigate(`/admin/posts`);
                                                }}
                                            >
                                                {datum.title}
                                            </Title>
                                        </Td>
                                        <Td>
                                            <UserId aria-describedby={id} onClick={handleClick}>
                                                {datum.user_id}
                                            </UserId>
                                        </Td>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                        >
                                            <Typography sx={{ p: 2 }}>{(user && JSON.stringify(user)) || "해당하는 유저가 없습니다."}</Typography>
                                        </Popover>
                                        <Td>{datum.lastmod_user}</Td>
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
            </div>
            {totalPage && (
                <Stack spacing={2}>
                    <Pagination count={totalPage} page={page} onChange={pageHandler} color="primary" />
                </Stack>
            )}
        </div>
    );
};
const Table = styled.table`
    width: 100%;
`;
const Th = styled.th`
    height: 2.5rem;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    font-size: 1.4rem;
    vertical-align: middle;
`;
const Td = styled.td`
    height: 2.5rem;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.2rem;
    vertical-align: middle;
    text-align: center;
`;
const Tr = styled.tr`
    background-color: ${(props) => props.color};
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const ControllerContainer = styled.div`
    position: absolute;
    right: 10vw;
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 15px;
    margin-top: -45px;
    padding-right: 10px;
`;
const Title = styled.a`
    text-decoration: underline;
    color: #7353ea;
    cursor: pointer;
    &:hover {
        color: gray;
    }
`;
const UserId = styled.a`
    &:hover {
        opacity: 0.5;
    }
`;
export default ManageUsers;
