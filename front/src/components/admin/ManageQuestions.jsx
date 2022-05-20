import React from "react";
import * as Api from "../../api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [data, setData] = React.useState();
  const [checkedList, setCheckedList] = React.useState([]);
  const navigate = useNavigate();

  const getData = React.useCallback(async () => {
    const { data } = await Api.get("auths");
    setData(data.payload);
  });

  React.useEffect(() => {
    getData();
  }, []);
  const checkAll = (e) => {
    if (e.target.checked) {
      const idList = data.map((datum) => datum.id);
      setCheckedList(idList);
    } else {
      setCheckedList([]);
    }
  };
  const checkHandler = (e) => {
    if (e.target.checked) {
      const newCheckedList = [...checkedList, parseInt(e.target.value)];
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter((id) => id !== parseInt(e.target.value));
      setCheckedList(newCheckedList);
    }
  };
  const controller = async (e) => {
    const checkedIdString = checkedList.join(",");
    if (e.target.name === "deleteQuestion") {
      await Api.delete("auth", checkedIdString);
      alert(`질문을 삭제하였습니다.`);
      getData();
    } else if (e.target.name === "setCurrentQuestion") {
      if (checkedList.length > 1) {
        alert("현재 질문은 1개만 설정할 수 있습니다.");
      } else {
        const { data } = await Api.put(`auth/${checkedList[0]}`, { current: true });
        alert(`Id: ${data.payload.id}를 현재 질문으로 설정하였습니다.`);
        getData();
      }
    } else if (e.target.name === "createNewQuestion") {
      navigate("/editquestion/new");
    }
    setCheckedList([]);
    document.getElementById("checkAll").checked = false;
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ControllerContainer>
        <Controller onClick={controller} name="setCurrentQuestion">
          현재 질문으로 설정
        </Controller>
        <Controller onClick={controller} name="createNewQuestion">
          새로만들기
        </Controller>
        <Controller onClick={controller} name="deleteQuestion">
          제거하기
        </Controller>
      </ControllerContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <input type="checkbox" id="checkAll" onChange={checkAll} />
            </Th>
            <Th>Id</Th>
            <Th>Question</Th>
            <Th>Answer</Th>
            <Th>Current</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((datum, index) => {
              return (
                <Tr key={`users/${index}`} color={checkedList.includes(datum.id) ? "lightgray" : "white"}>
                  <Td>
                    <input type="checkbox" value={datum.id} onClick={checkHandler} checked={checkedList.includes(datum.id) ? true : false} />
                  </Td>
                  <Td>{datum.id}</Td>
                  <Td>
                    <Title
                      onClick={() => {
                        navigate(`/editquestion/${datum.id}`);
                      }}
                    >
                      {datum.question}
                    </Title>
                  </Td>
                  <Td>{datum.answer}</Td>
                  <Td>{String(datum.current)}</Td>
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
  text-align: center;
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
const Title = styled.a`
  text-decoration: underline;
  color: black;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;
export default ManageUsers;
