import { CardContent } from "@mui/material";
import styled from "styled-components";

function Goal({ goal }) {
  const { week, title, core_goal, goalList } = goal;
  return (
    <CardContainer>
      <CardContent>
        <GoalHeader>
          <img
            style={{ width: "10%", marginRight: "5px" }}
            src="/image/logo_small.png"
            alt="엘리스위키 로고"
          />
          <HeaderTitle>Elice Racer's Goal</HeaderTitle>
        </GoalHeader>

        <Container>
          <WeekTitle>
            WEEK {week} : {title}
          </WeekTitle>
          <div style={{ marginBottom: "10%" }}>
            <CoreGoalTitle>핵심목표</CoreGoalTitle>

            <GoalContents>{core_goal} </GoalContents>
          </div>

          <div>
            <GoalListTitle goalList={goalList}>주간목표</GoalListTitle>
            {goalList.map((goal, idx) => (
              <>
                {goal === "" ? (
                  <></>
                ) : (
                  <GoalContents key={`goal_${idx}`}>
                    {idx + 1}. {goal}
                  </GoalContents>
                )}
              </>
            ))}
          </div>
        </Container>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  max-width: 95%;
  border-radius: 5%;
  background-color: rgba(207, 211, 236, 0.3);
  transition-property: background-color;
  transition-duration: 0.5s;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  &:hover {
    background-color: rgba(207, 211, 236, 0.7);
  }
`;

const GoalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5%;
`;

const HeaderTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;

const GoalListTitle = styled.div`
  color: #8b8b8c;
  font-weight: 500;
  margin-bottom: 5%;
  display: ${(props) => (props.goalList[0].length === 0 ? "none" : null)};
`;

const CoreGoalTitle = styled.div`
  color: #8b8b8c;
  font-weight: 500;
  margin-bottom: 5%;
`;

const GoalContents = styled.div`
  font-size: 0.9rem;
  margin-bottom: 4%;
`;

const WeekTitle = styled.div`
  margin-bottom: 10%;
  font-weight: 700;
  background: linear-gradient(90deg, #5438d1, #8938d1 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Container = styled.div``;

export default Goal;
