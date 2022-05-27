import React from "react";
import * as Api from "../../api";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button, Pagination, Stack, Checkbox } from "@mui/material";

const ManageUsers = () => {
    const [data, setData] = React.useState();
    const [checkedList, setCheckedList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();
    const perPage = 15;
    const user = useSelector((state) => (state ? state.userReducer.user : undefined));

    const getData = React.useCallback(async () => {
        const { data } = await Api.getQuery("users", `page=${page}&perPage=${perPage}`);
        setData(data.payload.rows);
        setTotalPage(Math.ceil(data.payload?.count / perPage));
    });

    React.useEffect(() => {
        getData();
    }, [page]);
    const checkAll = (e) => {
        if (e.target.checked) {
            const idList = data.map((datum) => datum.__id);
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
            const newCheckedList = checkedList.filter((__id) => __id !== e.target.value);
            setCheckedList(newCheckedList);
        }
    };
    const pageHandler = (event, value) => {
        setPage(value);
    };
    const controller = async (e) => {
        const checkedIdString = checkedList.join(",");
        if (e.target.name === "deleteUser") {
            const { data } = await Api.delete("users", checkedIdString);
            alert(`${data.payload.success}명의 유저가 탈퇴되었습니다.`);
            getData();
        } else if (e.target.name === "giveAdmin") {
            const { data } = await Api.put(`users/${checkedIdString}`, { admin: 1 });
            alert(`${data.payload.length}명의 유저에게 어드민 권한을 부여했습니다.`);
            getData();
        } else if (e.target.name === "takeAdmin") {
            const { data } = await Api.put(`users/${checkedIdString}`, { admin: 2 });
            alert(`${data.payload.length}명의 유저의 어드민 권한을 박탈했습니다.`);
            getData();
        } else if (e.target.name === "auth") {
            const { data } = await Api.put(`users/${checkedIdString}`, { authorized: true });
            alert(`${data.payload.length}명의 유저가 인증되었습니다.`);
            getData();
        } else if (e.target.name === "cancleAuth") {
            const { data } = await Api.put(`users/${checkedIdString}`, { authorized: false });
            alert(`${data.payload.length}명의 유저의 인증을 취소하였습니다.`);
            getData();
        }
        setCheckedList([]);
        document.getElementById("checkAll").checked = false;
    };
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "100%", height: "100%" }}>
                <ControllerContainer>
                    <Button variant="outlined" onClick={controller} name="deleteUser" color="error">
                        유저삭제
                    </Button>
                    <Button variant="outlined" onClick={controller} name="auth">
                        인증
                    </Button>
                    <Button variant="outlined" onClick={controller} name="cancleAuth">
                        인증해제
                    </Button>
                    <Button variant="outlined" onClick={controller} name="giveAdmin" disabled={user?.admin === 0 ? false : true}>
                        어드민 권한부여
                    </Button>
                    <Button variant="outlined" onClick={controller} name="takeAdmin" disabled={user?.admin === 0 ? false : true}>
                        어드민 권한박탈
                    </Button>
                </ControllerContainer>
                <Table>
                    <Thead>
                        <Tr color="#C2C2C2">
                            <Th>
                                <Checkbox id="checkAll" onChange={checkAll} />
                            </Th>
                            <Th>UserId</Th>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Track</Th>
                            <Th>Authorized</Th>
                            <Th>Admin</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map((datum, index) => {
                                return (
                                    <Tr key={`users/${index}`} color={checkedList.includes(datum.__id) ? "#e0e0e0" : "white"}>
                                        <Td>
                                            <Checkbox value={datum.__id} onChange={checkHandler} checked={checkedList.includes(datum.__id) ? true : false} />
                                        </Td>
                                        <Td>{datum.__id}</Td>
                                        <Td>
                                            <img
                                                src={datum.profile_img}
                                                style={{ height: "100%" }}
                                                onDoubleClick={() => {
                                                    window.open(datum.profile_img);
                                                }}
                                            />
                                        </Td>
                                        <Td>{datum.name}</Td>
                                        <Td style={{ color: "#7353EA" }}>{datum.email}</Td>
                                        <Td>{datum.track}</Td>
                                        <Td>{String(datum.authorized)}</Td>
                                        <Td>{datum.admin}</Td>
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
export default ManageUsers;
