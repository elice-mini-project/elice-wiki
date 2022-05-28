import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TagBtn({ tags }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`tag/${e.target.value}`);
  };

  return (
    <>
      {tags?.map((tag) => (
        <Button
          variant="outlined"
          sx={{
            fontSize: "0.5rem",
            borderRadius: "100px",
            m: "5px 3px",
          }}
          value={tag}
          key={tag}
          onClick={(e) => handleClick(e)}
        >
          {tag}
        </Button>
      ))}
    </>
  );
}
