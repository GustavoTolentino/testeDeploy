import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LogoGI from "../../assets/img/GraficaInteligente_FT.png";
import "./styles/style.css";
import { Button } from "../../components/Common/Button";
import { ActionButton } from "../../components/Common/ActionButton";
import { BsFillCameraFill, BsFillGearFill } from "react-icons/bs"
import { ImBarcode } from "react-icons/im"
import { BiImport } from "react-icons/bi"
import { GoTrashcan } from "react-icons/go"
import { EtiquetaScanner } from "../../components/EtiquetaScanner";
import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PistolScannerModal } from "../../components/PistolScannerModal";
import { APIErrorModal } from "../../components/APIErrorModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import { axios } from "axios" 

export function Inicio() {
    // const history = useNavigate();
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [boolModal, setBoolModal] = useState(false);
    const [boolPistolModal, setBoolPistolModal] = useState(false);
    const [boolErrorModal, setBoolErrorModal] = useState(false);
    const [descriptionErrorVar, setDescriptionErrorVar] = useState("");
    const [tittleErrorVar, setTittleErrorVar] = useState("");
    const [canLoadList, setCanLoadList] = useState(false);
    const [arrayEtiquetas, setArrayEtiquetas] = useState([]);
    const axios = require('axios').default;

  const OpenCloseModal = () =>
  {
    if(boolModal === false)
        setBoolModal(true);
    else
        setBoolModal(false);
  }
  const OpenClosePistolModal = () =>
  {
    if(boolPistolModal === false)
        setBoolPistolModal(true);
    else
        setBoolPistolModal(false);
  }
  const OpenCloseErrorModal = () =>
  {
    if(boolErrorModal === false)
        setBoolErrorModal(true);
    else
        setBoolErrorModal(false);
  }
  function newEtiquetaOnTable(etiqueta){
    toast.success('A etiqueta: ' + etiqueta + " foi adicionada com sucesso!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  }
  function popupTagsIndexed(){
    toast.success('As etiquetas foram gravadas com sucesso!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  }
  function setNewEtiqueta(newEtiqueta){
    if (arrayEtiquetas.filter(etiqueta => etiqueta !== newEtiqueta)){
        setArrayEtiquetas(arrayEtiquetas.concat(newEtiqueta));
        setCanLoadList(true);
        newEtiquetaOnTable(newEtiqueta);
    }
  }
  async function testeAPI(){
    try {
        const dataRequest = { "etiquetas" : arrayEtiquetas };
        console.log(arrayEtiquetas);
        // var meuCarro = new Object();
        // meuCarro.etiquetas = ["asdfasdfasdfasdfasdf", "asdasdasdasdasdasdasda"];
        // {etiquetas: ["joasas", "aaaaaaaaaaaaaaaaaaaaaaaaaa"]}
        
    
        const data = await axios.post('https://nlgierpproducaoapi.azurewebsites.net/api/v1/Expedicao/liberar-etiquetas-producao', dataRequest).then(result => {
            console.log(result);
            if(result.status >= 200 && result.status <= 299){
                popupTagsIndexed();
                setArrayEtiquetas(arrayEtiquetas.filter(element => {
                    return element === "";
                }))
                console.log(data);    
            }
            else{
                setTittleErrorVar(result.data);
                setDescriptionErrorVar(result.data);
                OpenCloseErrorModal();
                console.log("entrou no else da parada")
                console.log(data);    
            }
        });

        // axios.post('https://nlgierpproducaoapi.azurewebsites.net/api/v1/Expedicao/liberar-etiquetas-producao', dataRequest).then(result => console.log(result))
        
        
    } catch (error) {
        if(error.response.data)
        {
            console.log(error);
            setTittleErrorVar("Erro " + error.response.data.status);
            setDescriptionErrorVar(error.response.data.erros);
            OpenCloseErrorModal();
        }
        else{
            setTittleErrorVar(error.name);
            setDescriptionErrorVar(error.message);
            OpenCloseErrorModal();
        }
    }

  }
  function deleteEtiqueta(etiquetaIndex) {
    setArrayEtiquetas(arrayEtiquetas.filter(element => {
        return element !== etiquetaIndex;
    }))
  }

  return (
      <div className="contentArea">
        { boolModal && isMobile && (
            <EtiquetaScanner 
                closeModalMethod={OpenCloseModal}
                methodUpdateArray={setNewEtiqueta}
            />
        )}
        { boolPistolModal && !isMobile && (
            <PistolScannerModal 
                closeModalMethod={OpenClosePistolModal}
                methodUpdateArray={setNewEtiqueta}
            />
        )}
        { boolErrorModal && !isMobile && (
            <APIErrorModal 
                closeErrorModalMethod={OpenCloseErrorModal}
                tittleError={tittleErrorVar}
                descriptionError={descriptionErrorVar}
            />
        )}
        <div className="mobileInicioContent">
            <div className="ContentInicioPage">
                <img src={LogoGI} style={{width: "320px"}} alt="Logo do software Grafica Inteligente."/>
                <h1>Bem-vindo, Joao!</h1>

                <div className="actionsArea">
                    <h2>Ações</h2>
                    
                    <div className="actionsButtonsArea">
                        { isMobile && (
                            <ActionButton
                                method={OpenCloseModal}
                                icon={<BsFillCameraFill/>}
                                actionText="Etiquetas"
                                isActive
                            />
                        )}
                        { !isMobile && (
                            <ActionButton
                                method={OpenClosePistolModal}
                                icon={<ImBarcode/>}
                                actionText="Liberar"
                                isActive
                            />
                        )}
                        { !isMobile && (
                            <ActionButton
                                icon={<ImBarcode/>}
                                actionText="Estoque"
                            />
                        )}
                        { !isMobile && (
                            <ActionButton
                                icon={<BiImport/>}
                                actionText="Importar"
                            />
                        )}
                        <ActionButton
                            icon={<BsFillGearFill/>}
                            actionText="Configurar"
                        />
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="tagMobileArea">
                    <h2>Etiquetas Pendentes</h2>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className="thTextCenter">#</th>
                                <th scope="col">Etiqueta</th>
                                <th scope="col" className="thTextCenter">Acoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            { canLoadList && arrayEtiquetas.map((etiqueta, i) => (
                                <tr key={i}>
                                    <th></th>
                                    <td style={{padding: "5px"}}>{etiqueta}</td>
                                    <td className="tdDelete">
                                        <GoTrashcan 
                                            size={20}
                                            className="trashCanIcon"
                                            onClick={() => deleteEtiqueta(etiqueta)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            { (arrayEtiquetas === null) || (arrayEtiquetas === "") || (arrayEtiquetas.length < 1) && (
                                <tr>
                                    <th></th>
                                    <td style={{padding: "5px"}}>&nbsp;</td>
                                    <td className="tdDelete">
                                        <GoTrashcan 
                                            size={20}
                                            className="trashCanIcon"
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="buttonAreaScreenApp">
                        <Button onClick={testeAPI}>Gravar</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
