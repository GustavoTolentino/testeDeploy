import React from "react";
// import { useHistory } from "react-router-dom";
import LogoGI from "../../../assets/img/nucleoImages/GraficaInteligente_FT.png";
import "./styles/style.css";
import { Button } from "../../Common/Button";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
  // const history = useHistory();
  return (
    <div className="contentArea">
        <div className="mobileHomeContent">
            <img src={LogoGI} style={{width: "350px"}} alt="Logo do software Grafica Inteligente."/>
            <h1>Bem-vindo ao maior sistema de gráficas do pais!</h1>
            <div className="buttonMobileHomeArea">
                {/* <Button 
                    backgroundLess={true}
                    onClick={() => history.push("/mobile/login")}
                >Entrar</Button> */}
            </div>
        </div>
    </div>
  );
}