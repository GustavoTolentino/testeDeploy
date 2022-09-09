import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginMobileFormWrapper } from "./styles/LoginMobileFormWrapper.js";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { FiMail } from "react-icons/fi";
import { AiFillLock } from "react-icons/ai";
export default function LoginF({
  onSubmit,
  type,
  state,
  method,
  type2,
  state2,
  method2,
  ...props
}) {
  const navigate = useNavigate();
  return (
    <LoginMobileFormWrapper>
      <form onSubmit={onSubmit} className="loginFormBody">
        <h1 className="loginFormTitle">Entre em sua conta</h1>
        <div className="inputsAreaComponent">
          <Input
            mobilelogin={true}
            type={type}
            value={state}
            onChange={method}
            icon={<FiMail/>}
            style={{margin: "10px 0 0 0"}}
          />
          <Input
            type={type2}
            value={state2}
            onChange={method2}
            icon={<AiFillLock/>}
            mobilelogin={true}
          />
          <div className="loginButtonArea">
            <Button 
              login
              type="submit"
              >Entrar</Button>
            <Button
            style={{marginTop: "10px"}}
              backgroundLess 
              onClick={() => navigate('/mobile/inicio')}
              >Voltar</Button>
          </div>
        </div>
      </form>
    </LoginMobileFormWrapper>
  );
}