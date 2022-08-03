import styled, { css } from "styled-components";

const LoginButton = css`
  background-color: #C10000;
  color: #ffffff;
`;

const BackgroundLessButton = css`
  background-color: #ffffff;
  color: #900000;
  border: solid 2px #900000;
  border-radius: 12px;

  :hover{
    background-color: #790000;
    color: #ffffff;
  }
`;

const DefaultButton = css`
  background-color: #C10000;
  color: #ffffff;
`;

export const ButtonWrapper = styled.button`
  border: none;
  padding: 16px 17px;
  font-size: 16px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  width: 100%;

  :hover{
    background-color: #900000;
  }
  ${({ login, backgroundLess }) => {
    if (login) return LoginButton;
    if (backgroundLess) return BackgroundLessButton;
    return DefaultButton;
  }};
`;