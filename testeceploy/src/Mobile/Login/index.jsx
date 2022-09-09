import React, { useState } from "react";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import LoginF from "../../components/Common/Forms/LoginMobileForm";
import LogoGI from "../../assets/img/GraficaInteligente_FT.png"
import { loginCrypto } from "../../services/cryptoLib";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineWave } from 'react-loader-spinner';
import { SystemInitialization } from "../../services/api";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [argumentTest, setArgumentTest] = useState("");
  const [valorTeste, setValorTeste] = useState("");

  const axios = require('axios').default;
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log("entrou no método");
    try{

      setIsLoading(true);
      const cryptedPassword = loginCrypto(password);
      const GUID_API_Identidade = "84720846-D06F-47DB-0001-000000000000";

      const returnMethod = await SystemInitialization();
      const URLAPIIdentidade = returnMethod.filter(x => x.id === GUID_API_Identidade);
      
      const APIIdentidade = axios.create({
          baseURL: URLAPIIdentidade[0].endereco
      });

      const { data, status } = await APIIdentidade.post("/identidade/realizar-entrada", {
        usuario: email,
        senha: cryptedPassword,
        alias: ""
      });
      console.log(data, status);
      if (status === 200) {
        localStorage.setItem("userToken", data.dados.jwt);
        navigate("/inicio");
      } else {
        loginError();
      }
      setIsLoading(false);
      navigate("/inicio");
      // navigate("/inicio");
    }
    catch (error)
    {
      setIsLoading(false);
      apiError();
      console.log(error);
    }
    // navigate("/inicio");
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
  function clickTest(){
    const cryptedPassword = loginCrypto(argumentTest);
    setValorTeste(cryptedPassword);
  }
  return (
    <div className="contentArea">
      <div className="loginMobileContentArea">
        <img src={LogoGI} style={{width: "350px"}} alt="Logo do software Grafica Inteligente."/>
        <LoginF 
          onSubmit={handleSignIn}
          type="text"
          state={email}
          method={(e) => setEmail(e.target.value)}
          type2="password"
          state2={password}
          method2={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="card-body loader-demo loader-demo-sk d-flex align-items-center justify-content-center">
        <LineWave
          height="100"
          width="100"
          color="#900000"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      {/* <div>
        <p>Input de teste</p>
        <input 
          type="text"
          onChange={(e) => setArgumentTest(e.target.value)}
          value={argumentTest}
        />
        <p>Seu valor eh: {valorTeste}</p>
      </div>
      <div>
        <Button onClick={clickTest}>Testar</Button>
      </div> */}
    </div>
  );
}