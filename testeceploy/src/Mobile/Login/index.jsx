import React, { useState } from "react";
import "./styles/style.css";
// import { useHistory } from "react-router-dom";
import LoginMobileForm from "../../Common/Forms/LoginForm";
import LogoGI from "../../../assets/img//GraficaInteligente_FT.png"
// import { apiIdentidade } from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    // console.log("entrou no método");
    // try{
    //   const { data, status } = await apiIdentidade.post("/realizar-entrada", {
    //     Usuario: email,
    //     Senha: password,
    //   });
  
    //   if (status === 200) {
    //     localStorage.setItem("userToken", data.dados.jwt);
    //     history.push('/submenu');
    //   } else {
    //     loginError();
    //   }
    //   history.push('/submenu')
    // }
    // catch (error)
    // {
    //   apiError();
    //   console.log(error);
    // }
    // history.push("/mobile/inicio");
  };

  const loginError = () => {
    toast.error("Verifique seu Usuario e Senha e tente novamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const apiError = () => {
    toast.error("Não foi possível acessar a API no momento, tente novamente mais tarde", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="contentArea">
      <div className="loginMobileContentArea">
        <img src={LogoGI} style={{width: "350px"}} alt="Logo do software Grafica Inteligente."/>
        <LoginMobileForm 
          onSubmit={handleSignIn}
          type="text"
          state={email}
          method={(e) => setEmail(e.target.value)}
          type2="text"
          state2={email}
          method2={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}