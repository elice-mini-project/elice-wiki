import { TextField, Button } from "@mui/material";

export default function CommentInput({ comment, setComment }) {
    return (
        <>
            <TextField
                sx={{ m: "1% 0 1% 1%", width: "100%" }}
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Button sx={{ m: "1%" }} type="submit">
                완료
            </Button>
        </>
    );
}
