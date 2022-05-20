import React from "react";
import * as Api from "../../api";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ManageUsers = () => {
    const [data, setData] = React.useState();
    const [checkedList, setCheckedList] = React.useState([]);
    const userState = useSelector((state) => (state ? state.userReducer.user : undefined));
    const user = userState?.payload;

    const getData = React.useCallback(async () => {
        const { data } = await Api.get("users");
        setData(data.payload);
    });

    React.useEffect(() => {
        getData();
    }, []);
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
        <div style={{ width: "100%", height: "100%" }}>
            <ControllerContainer>
                <Controller onClick={controller} name="deleteUser">
                    유저삭제
                </Controller>
                <Controller onClick={controller} name="auth">
                    인증
                </Controller>
                <Controller onClick={controller} name="cancleAuth">
                    인증해제
                </Controller>
                {user?.admin === 0 && (
                    <Controller onClick={controller} name="giveAdmin">
                        어드민 권한부여
                    </Controller>
                )}
                {user?.admin === 0 && (
                    <Controller onClick={controller} name="takeAdmin">
                        어드민 권한박탈
                    </Controller>
                )}
            </ControllerContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            <input type="checkbox" id="checkAll" onChange={checkAll} />
                        </Th>
                        <Th>UserId</Th>
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
                                <Tr key={`users/${index}`} color={checkedList.includes(datum.__id) ? "lightgray" : "white"}>
                                    <Td>
                                        <input
                                            type="checkbox"
                                            value={datum.__id}
                                            onChange={checkHandler}
                                            checked={checkedList.includes(datum.__id) ? true : false}
                                        />
                                    </Td>
                                    <Td>{datum.__id}</Td>
                                    <Td>{datum.name}</Td>
                                    <Td>{datum.email}</Td>
                                    <Td>{datum.track}</Td>
                                    <Td>{String(datum.authorized)}</Td>
                                    <Td>{datum.admin}</Td>
                                </Tr>
                            );
                        })}
                </Tbody>
            </Table>
        </div>
    );
};
const Table = styled.table`
    width: 100%;
`;
const Th = styled.th``;
const Td = styled.td``;
const Tr = styled.tr`
    background-color: ${(props) => props.color};
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Controller = styled.button`
    margin-top: -100%;
`;
const ControllerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;
export default ManageUsers;
