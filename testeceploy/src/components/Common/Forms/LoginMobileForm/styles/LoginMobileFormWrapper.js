import styled, { css } from "styled-components";

export const LoginMobileFormWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
  display: flex;
  align-items: center;
  // width: 500px;
  .loginFormBody {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: #ffffff;
    padding: 60px;
  }
  .loginFormTitle{
    font-size: 20px;
    color: #000000;
    font-family: 'Poppins';
    font-weight: bold;
  }
  .forgotPasswordDiv{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: #979797;
    margin-bottom: 100px;
    margin-top: 5px;
  }
  .loginButtonArea{
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .inputsAreaComponent {
    width: 100%;
  }
  @media screen and (max-width : 1050px) {
    .loginFormBody{
        width: 100%;
    }
}
  @media screen and (max-width : 900px) {
      .loginFormBody{
        width: 100%;
      }
      .forgotPasswordDiv{
        margin-bottom: 60px;
      }
  }
`;