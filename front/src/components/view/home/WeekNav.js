import { useState } from "react";
import { Button, Divider } from "@mui/material";
import { getGoal } from "./HomeData";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WeekNav = ({ setGoal }) => {
    const [isClicked, setIsClicked] = useState(new Array(25).fill(false));
    const navigate = useNavigate();

    const handleClick = (e) => {
        const newArr = new Array(25).fill(false);
        const week = parseInt(e.target.value) + 1;
        newArr[e.target.value] = !newArr[e.target.value];
        setIsClicked(newArr);
        getGoal(setGoal, week);
        navigate(`week/${week}`);
    };

    return (
        <>
            <NavContainer>
                <Button disabled style={{ color: "black" }}>
                    WEEK
                </Button>

        {new Array(24).fill(null).map((_, idx) => (
          <>
            <Button
              value={idx}
              key={`week_${idx}`}
              size="small"
              variant={isClicked[idx] ? "contained" : "text"}
              sx={{
                minWidth: "2.5%",
                maxHeight: "60%",
                borderRadius: "30px",
                margin: "0 3px",
              }}
              onClick={handleClick}
            >
              {String(idx + 1).padStart(2, "0")}
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
          </>
        ))}

                <Button
                    value={24}
                    variant={isClicked[24] ? "contained" : "text"}
                    size="small"
                    sx={{
                        minWidth: "3%",
                        maxHeight: "60%",
                        borderRadius: "30px",
                        margin: "0 3px",
                    }}
                    onClick={handleClick}
                >
                    기타
                </Button>
            </NavContainer>
        </>
    );
};

const NavContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: #f1f1f1;
    border-top: 5px solid #7353ea;
`;

export default WeekNav;
