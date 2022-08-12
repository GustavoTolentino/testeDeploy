import styled, { css } from "styled-components";

const activeActionButton = css`
  :hover{
    background-color: #f9f9f9;
    color: #6C0000;
    svg{
      color: #6C0000;
    }
  }
`;
  
const defaultActionButton = css`
  background-color: #E9E9E9;
  svg {
    color: #944B4B;
  }
  h2{
    color: #944B4B;
  }
`;

export const ActionButtonWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  width: 70px;
  height: 70px;

  padding: 4px;
  margin-right: 10px;

  background-color: #ffffff;
  color: #900000;
  border-radius: 4px;

  svg{
    color: #900000;
    width: 25px;
    height: 20px;
  }
  
  h2{
    font-size: 14px;
    margin-bottom: -10px;
    margin-top: 10px;
  }

  ${({ isActive }) => {
    if (isActive) return activeActionButton;
    return defaultActionButton;
  }};
`;