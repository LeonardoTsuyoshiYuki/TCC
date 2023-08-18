import styled from "styled-components"
const colors = {
    primary: "#e0f7fa",
};

export const Container = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 50vh;
        gap: 20px;
        color: ${colors.primary};
    `
export const Title = styled.h2`
    color: ${props => props.isPrimary ? colors.primary : colors.secondary};

`
const FlexCenteredColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledContainer = styled(FlexCenteredColumn)`
  height: 50vh;
  gap: 20px;
`;