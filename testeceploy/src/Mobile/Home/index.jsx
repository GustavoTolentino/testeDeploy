import React from "react";
import LogoGI from "../../assets/img/GraficaInteligente_FT.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Common/Button";
import "react-toastify/dist/ReactToastify.css";
import "./styles/style.css";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="contentHomeArea">
        <div className="mobileHomeContent">
            <img src={LogoGI} style={{width: "350px"}} alt="Logo do software Grafica Inteligente."/>
            <h1>Bem-vindo ao maior sistema de gráficas do pais!</h1>
            <div className="buttonMobileHomeArea">
                <Button 
                    backgroundLess={true}
                    onClick={() => navigate("/login")}
                >Entrar</Button>
            </div>
        </div>
    </div>
  );
}