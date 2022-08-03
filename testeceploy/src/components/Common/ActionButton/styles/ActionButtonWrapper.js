import styled from "styled-components";

export const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  width: 70px;
  height: 70px;

  background-color: #ffffff;
  color: #900000;

  margin-right: 10px;
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
`;