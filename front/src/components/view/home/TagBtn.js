import { Button } from "@mui/material";

export default function TagBtn({ tags }) {
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
                    key={tag}
                >
                    {tag}
                </Button>
            ))}
        </>
    );
}
