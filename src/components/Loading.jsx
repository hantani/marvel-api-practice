import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};
`;

function Loading() {
  return <Wrapper>Loading...</Wrapper>;
}

export default Loading;
