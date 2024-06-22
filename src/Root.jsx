import { Outlet } from "react-router-dom";
import styled from "styled-components";

const CommonWrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const ContentWrapper = styled.div`
  padding: 50px 0;
  max-width: 1280px;
  margin: 0 auto;
`;

function Root() {
  return (
    <CommonWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </CommonWrapper>
  );
}

export default Root;
