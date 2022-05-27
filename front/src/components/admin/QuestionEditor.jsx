import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../../api";
import DOMPurify from "dompurify";

const QuestionEditor = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [title, setTitle] = React.useState();
    const [answer, setAnswer] = React.useState();
    const [value, setValue] = React.useState();
    const [url, setUrl] = React.useState();
    const [source, setSource] = React.useState();
    const [tooltipShow, setTooltipShow] = React.useState({
        imgTooltip: false,
        codeTooltip: false,
    });

    const getCurrentQuestion = React.useCallback(async () => {
        let { data } = await Api.get("auth", id);
        data = data.payload;
        setTitle(data.question);
        setAnswer(data.answer);
        setUrl(data.url);
        setSource(data.source);
        setValue({
            url: data.url,
            source: data.source,
        });
    });

    React.useEffect(() => {
        if (id !== "new") {
            getCurrentQuestion();
        }
    }, []);

    const onChangeHandler = (e) => {
        if (e.target.id === "imgurl") {
            setUrl(e.target.value);
        } else if (e.target.id === "sourcecode") {
            setSource(e.target.value);
        } else if (e.target.id === "title") {
            setTitle(e.target.value);
        } else if (e.target.id === "answer") {
            setAnswer(e.target.value);
        }
    };
    const clickHandler = () => {
        setValue({
            url,
            source,
        });
    };
    const saveData = async () => {
        if (id === "new") {
            await Api.post("auth", { question: title, answer: answer, ...value });
        } else {
            await Api.put(`auth/${id}`, { question: title, answer: answer, ...value });
        }
        navigate("/admin/questions");
    };
    const abortChange = () => {
        navigate("/admin/questions");
    };
    const showTooltip = (e) => {
        const object = { ...tooltipShow };
        object[e.target.name] = true;
        setTooltipShow(object);
    };
    const unshowTooltip = (e) => {
        const object = { ...tooltipShow };
        object[e.target.name] = false;
        setTooltipShow(object);
    };
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center" }}>
            <Wrapper>
                <div style={{ width: "40vw" }}>
                    <label for="title">Question</label>
                    <Input id="title" placeholder="Question" value={title} onChange={onChangeHandler} />
                    <label for="answer">Answer</label>
                    <Input id="answer" placeholder="Answer" value={answer} onChange={onChangeHandler} />
                    <label for="imgurl">Img URL</label>
                    <div style={{ display: "inline-block", marginLeft: "10px" }}>
                        <img
                            src="/image/questionMark.png"
                            name="imgTooltip"
                            style={{ height: "14px", WebkitUserSelect: "none" }}
                            onMouseDown={showTooltip}
                            onMouseUp={unshowTooltip}
                            onMouseLeave={unshowTooltip}
                            draggable="false"
                        />
                        <Tooltip show={tooltipShow.imgTooltip}>
                            1. <strong>Image url</strong> from web ( https://images.unsplash.com/photo-164... )<br />
                            2. <strong>Image path</strong> ( /image/filename )
                        </Tooltip>
                    </div>
                    <Input id="imgurl" placeholder="Img URL" value={url} onChange={onChangeHandler} />

                    <label for="sourcecode">Source Code</label>
                    <div style={{ display: "inline-block", marginLeft: "10px" }}>
                        <img
                            src="/image/questionMark.png"
                            name="codeTooltip"
                            style={{ height: "14px", WebkitUserSelect: "none" }}
                            onMouseDown={showTooltip}
                            onMouseUp={unshowTooltip}
                            onMouseLeave={unshowTooltip}
                            draggable="false"
                        />
                        <Tooltip show={tooltipShow.codeTooltip}>
                            1. Inline style : style="color: #000000"
                            <br />
                            2. Basic HTML tags can be used
                            <br />
                            3. <strong>br</strong> tag for line break
                            <br />
                            4. <strong>span</strong> tag for change font color inline
                            <br />
                            5. Content line max length : upto 4
                        </Tooltip>
                    </div>
                    <InputArea id="sourcecode" placeholder="Type your source code here..." value={source} onChange={onChangeHandler} />
                </div>
                <MiddleWrapper>
                    <Img draggable={false} src="/image/rightArrow.png" alt="ArrowRight Png" style={{ width: "100px", WebkitUserSelect: "none" }} />
                    <Button onClick={clickHandler}>미리보기</Button>
                    <Button onClick={saveData} style={{ marginTop: "5%" }}>
                        저장하기
                    </Button>
                    <Button onClick={abortChange} style={{ marginTop: "5%" }}>
                        취소하기
                    </Button>
                </MiddleWrapper>
                <div>
                    <label for="preview">Preview</label>
                    <Preview id="preview">
                        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ height: "45%", marginBottom: "3%" }}>
                                {value && (
                                    <div style={{ height: "100%" }}>
                                        <img draggable={false} src={value.url || "/image/Default.png"} style={{ height: "70%" }} />
                                        <div
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value.source) || "<h5>소스코드입력</h5>" }}
                                            style={{ height: "30%", textAlign: "center", fontWeight: "bold" }}
                                        />
                                    </div>
                                )}
                            </div>
                            <img draggable={false} src="/image/Answer_the_question.png" style={{ height: "8%" }} />
                        </div>
                    </Preview>
                </div>
            </Wrapper>
        </div>
    );
};
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const Input = styled.input`
    padding-left: 10px;
    height: auto;
    width: 40vw;
    margin: 0;
    margin-bottom: 10px;
    border: 1px solid black;
`;
const InputArea = styled.textarea`
    padding-left: 10px;
    height: 25vh;
    width: 40vw;
    resize: none;
    margin: 0;
`;
const Preview = styled.div`
    height: 40vh;
    width: 40vw;
    border: 1px solid black;
    overflow: hidden;
    -webkit-user-select: none;
`;
const MiddleWrapper = styled.div`
  margin: 0 1vw 0 1vw
  height: 40vh;
  width: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1000px) {
    width: 80vw;
    position: fixed;
    top: 10px;
    flex-direction: row;
  }
`;
const Button = styled.button`
    width: 100px;
    @media only screen and (max-width: 1000px) {
        margin: 0 !important;
    }
`;
const Img = styled.img`
    @media only screen and (max-width: 1000px) {
        display: none;
    }
`;
const Tooltip = styled.div`
    display: ${(props) => (props.show ? "block" : "none")};
    position: absolute;
    z-index: 1;
    background-color: lightgray;
    padding: 10px;
    width: auto;
    height: auto;
    font-size: 13px;
`;
export default QuestionEditor;
