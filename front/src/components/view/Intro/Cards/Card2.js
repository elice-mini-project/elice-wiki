import styled from "styled-components";

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url(https://images.unsplash.com/photo-1510674485131-dc88d96369b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=349&q=80);
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

export const Card2 = () => {
  return (
    <>
      <CardBox>
        <ImgBox />
        <TopSubtitle>Community</TopSubtitle>
        <CardTitle>
          검색해 본 내용을 기록하고,  <br />공유 할 수 있는 방법은 없을까?
        </CardTitle>
        <PlusIconWrapper>
          <IconStyled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
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
          IT 기술은 시시각각 변화하며, 개발자가 알아야하는 지식은 끝이 없습니다.
          이러한 특성으로 개발자들은 구글링으로 학습을, 블로그로 기록과 공유를
          해왔습니다.
          <br />
          <br />
          그리고 기술이 사용되는 맥락에 따라 필요한 코드가 다르다는 특성으로
          /*elice*/ 의 교육 콘텐츠는 핵심적이고 대표적인 내용 위주로 정리하여
          전달하고 있습니다.
          <br />
          <br />
          레이서들이 그냥 개발자가 아닌 실력있는 개발자로 성장하길 바라는 우리는
          자기주도적이며 아는 것을 공유하는 학습공동체를 만들 방법을
          고민했습니다.
        </CardArticle>
      </CardBox>
    </>
  );
};
