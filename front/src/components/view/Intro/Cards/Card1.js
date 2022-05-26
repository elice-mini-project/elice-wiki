import styled from "styled-components";

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url(https://images.unsplash.com/photo-1574330096374-a263e0a4b7f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-size: cover;
  border-radius: 16px;
  transition: background-image 0.3s ease;
`;

const TopSubtitle = styled.p`
  height: 0px;
  margin: 0px 0px 8px;
  overflow-y: hidden;
  font-size: 15px;
  line-height: 24px;
  color: rgba(0, 29, 54, 0.31);
  opacity: 0;
  transition: opacity 0.3s ease 0s, height 0.3s ease 0s;
`;

const CardTitle = styled.p`
  margin: 0 0 30px 0;
  font-size: 32px;
  font-weight: bold;
  line-height: 41px;
  color: #000000;
  transition: font-size 0.3s ease, line-height 0.3s ease;
`;

const PlusIconWrapper = styled.div`
  height: 24px;
  overflow-y: hidden;
  transition: height 0.3s ease 0s, opacity 0.3s ease 0s;
`;

const IconStyled = styled.span`
  height: 24px;
  width: 24px;
  min-width: 24px;
  color: rgb(51, 61, 75);
  display: inline-block;
  line-height: 0;
`;

const CardArticle = styled.p`
  margin: 0px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.5;
  color: #1d2229;
  letter-spacing: -0.1px;
  opacity: 0;
  transition: opacity 0.3s ease 0s;
`;

const CardBox = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 32px;
  overflow: hidden;
  border-radius: 16px;
  &:hover ${ImgBox} {
    filter: blur(30px);
    transform: scale(1.2);
  }

  &:hover ${TopSubtitle} {
    height: 24px;
    opacity: 1;
  }

  &:hover ${CardTitle} {
    font-size: 25px;
    line-height: 33px;
  }

  &:hover ${PlusIconWrapper} {
    height: 0px;
    opacity: 0;
  }

  &:hover ${CardArticle} {
    display: block;
    opacity: 1;
  }
`;

export const Card1 = () => {
  return (
    <>
      <CardBox>
        <ImgBox />
        <TopSubtitle>Learning</TopSubtitle>
        <CardTitle>
          배운 내용을 잘 기억할 수 있는 <br /> 방법은 없을까?
        </CardTitle>
        <PlusIconWrapper>
          <IconStyled>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 23.2C5.8 23.2.8 18.2.8 12S5.8.8 12 .8s11.2 5 11.2 11.2-5 11.2-11.2 11.2zm0-21c-5.4 0-9.8 4.4-9.8 9.8s4.4 9.8 9.8 9.8 9.8-4.4 9.8-9.8-4.4-9.8-9.8-9.8z"
                fill="#6b7684"
              ></path>
              <g fill="#6b7684">
                <path d="M17 12.8H7c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h10c.4 0 .8.3.8.8s-.4.8-.8.8z"></path>
                <path d="M12 17.8c-.4 0-.8-.3-.8-.8V7c0-.4.3-.8.8-.8s.8.3.8.8v10c-.1.4-.4.8-.8.8z"></path>
              </g>
            </svg>
          </IconStyled>
        </PlusIconWrapper>
        <CardArticle>
          6개월이라는 짧은 기간 동안, 레이서들은 다양한 주제의 많은 학습량을
          마주합니다.
          <br />
          <br />
          매일 빠르게 변화하는 학습 주제로 인해 레이서는 방대한 지식을 충분히
          소화하여 ‘내 것’으로 만드는데 어려움을 느낄 수 있습니다.
          <br />
          <br />
          쉽게 휘발되는 지식에 아쉬움을 느낀 우리는 학습에 들인
          <br />
          노력이 헛되지 않을 방법을 고민했습니다.
        </CardArticle>
      </CardBox>
    </>
  );
};
