import styled, { css } from "styled-components";

const LoginButton = css`
  background-color: #C10000;
  color: #ffffff;
`;

const CloseModal = css`
  margin: 0 10px;
  background-color: #900000;
  color: #ffffff;
  height: 30px;
  padding: 5px 4px;
  font-size: 16px;
  width: 60%;

  :hover{
    background-color: #790000;
    color: #ffffff;
  }
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
  ${({ login, backgroundLess, closeModal }) => {
    if (login) return LoginButton;
    if (backgroundLess) return BackgroundLessButton;
    if (closeModal) return CloseModal;
    return DefaultButton;
  }};
`;