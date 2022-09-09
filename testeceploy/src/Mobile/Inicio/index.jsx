import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogoGI from "../../assets/img/GraficaInteligente_FT.png";
import { BsFillCameraFill, BsFillGearFill } from "react-icons/bs"
import { ImBarcode } from "react-icons/im"
import { BiImport } from "react-icons/bi"
import { GoTrashcan } from "react-icons/go"

import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import { LineWave } from 'react-loader-spinner';

import { ActionButton } from "../../components/Common/ActionButton";
import { Button } from "../../components/Common/Button";
import { PistolScannerModal } from "../../components/PistolScannerModal";
import { EtiquetaScanner } from "../../components/EtiquetaScanner";
import { InventoryModal } from "../../components/InventoryModal";
import { APIErrorModal } from "../../components/APIErrorModal";
import { ConfirmModal } from "../../components/ConfirmModal";
import { ConfirmModalPistol } from "../../components/ConfirmModalPistol";
import { SystemInitialization } from "../../services/api";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/style.css";

export function Inicio() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const axios = require('axios').default;
    
    const [boolModal, setBoolModal] = useState(false);
    const [boolPistolModal, setBoolPistolModal] = useState(false);
    const [boolInventoryModal, setBoolInventoryModal] = useState(false);
    const [boolErrorModal, setBoolErrorModal] = useState(false);
    const [boolConfirmModal, setBoolConfirmModal] = useState(false);
    const [boolConfirmModalPistol, setBoolConfirmModalPistol] = useState(false);
    const [canLoadList, setCanLoadList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [descriptionErrorVar, setDescriptionErrorVar] = useState("");
    const [tittleErrorVar, setTittleErrorVar] = useState("");

    const [intTypeOfSubmit, setIntTypeOfSubmit] = useState(0);
    
    const [arrayEtiquetas, setArrayEtiquetas] = useState([]);
    const userInfo = localStorage.getItem('userToken');

    useEffect(() => {
        verifyJWT();
    }, []);
    

    function verifyJWT(){
        console.log("verificando");
        if (userInfo) {
            console.log("user existe");
            if(userInfo.length <= 0 || userInfo === undefined){
                console.log("fora dos padroes")
                navigate("/login");            
            }
        }
        else{
            console.log("nao existe e vai redirec")
            navigate("/login");
        }
    }

  const OpenCloseModal = () =>
  {
    setBoolModal(!boolModal);
  }

  const OpenClosePistolModal = (originRequest) =>
  {
    if(originRequest === intTypeOfSubmit){
        setBoolPistolModal(true);
    }else{
        if(arrayEtiquetas[0] != null || arrayEtiquetas[0] != undefined)
        {
            OpenCloseConfirmModalPistol();
        }
        else{
            setBoolPistolModal(true);
        }
    }
  }
  
  const OpenCloseErrorModal = () =>
  {
    setBoolErrorModal(!boolErrorModal);
  }
  
  function OpenCloseInventoryModal(originRequest){
    if(originRequest === intTypeOfSubmit){
        setBoolInventoryModal(true);
    }else{
        if(arrayEtiquetas[0] != null || arrayEtiquetas[0] != undefined)
        {
            OpenCloseConfirmModal();
        }
        else{
            setBoolInventoryModal(true);
        }
    }
  }

  const closeInventoryModal = () => {
    setBoolInventoryModal(false);
  }

  const closePistolModal = () => {
    setBoolPistolModal(false);
  }
  
  const OpenCloseConfirmModal = () => 
  {
    setBoolConfirmModal(!boolConfirmModal);
  }
  const OpenCloseConfirmModalPistol = () => 
  {
    setBoolConfirmModalPistol(!boolConfirmModalPistol);
  }

  function YesClickMethodPistol() {
    setArrayEtiquetas(arrayEtiquetas.filter(element => {
        return element === "";
    }))
    OpenCloseConfirmModalPistol();
    setBoolInventoryModal(true);
    setIntTypeOfSubmit(1);
  }
  function YesClickMethod() {
    setArrayEtiquetas(arrayEtiquetas.filter(element => {
        return element === "";
    }))
    OpenCloseConfirmModal();
    setBoolInventoryModal(true);
    setIntTypeOfSubmit(2);
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
  
  function setNewEtiqueta(newEtiqueta, typeOfSub){
    if (arrayEtiquetas.filter(etiqueta => etiqueta !== newEtiqueta)){
        setArrayEtiquetas(arrayEtiquetas.concat(newEtiqueta));
        setIntTypeOfSubmit(typeOfSub);
        setCanLoadList(true);
        newEtiquetaOnTable(newEtiqueta);
    }
  }

  async function submitForApi(){
    try {
        setIsLoading(true);
        const GUID_API_Producao = "84720846-D06F-47DB-0001-000000000001";

        const returnMethod = await SystemInitialization();
        const URLAPIProducao = returnMethod.filter(x => x.id === GUID_API_Producao);
        
        const APIProducao = axios.create({
            baseURL: URLAPIProducao[0].endereco
        });        
        const config = {
            headers: { Authorization: `Bearer ${userInfo}` }
        };
        
        switch (intTypeOfSubmit) {
            // Caso o tipo de envio seja para liberacao de estoque
            case 1:
                    const dataRequestTag = { "etiquetas" : arrayEtiquetas };
                    const data = await APIProducao.post('/Expedicao/liberar-etiquetas-producao', dataRequestTag, config).then(result => {
                        if(result.status >= 200 && result.status <= 299){
                            popupTagsIndexed();
                            setArrayEtiquetas(arrayEtiquetas.filter(element => {
                                return element === "";
                            }))
                            setIsLoading(false);
                        }
                        else{
                            setTittleErrorVar(result.data);
                            setDescriptionErrorVar(result.data);
                            setIsLoading(false);
                            OpenCloseErrorModal();
                        }
                    });
            break;
            // Caso o tipo de envio seja para cadastro no estoque
            case 2:
                setIsLoading(true);
                const dataRequest = { "etiquetas" : arrayEtiquetas};
                await APIProducao.post('/Expedicao/entrar-estoque-etiquetas-producao', dataRequest, config ).then(result => {
                    if(result.status >= 200 && result.status <= 299){
                        popupTagsIndexed();
                        setArrayEtiquetas(arrayEtiquetas.filter(element => {
                            return element === "";
                        }))
                        setIsLoading(false);
                    }
                    else{
                        setTittleErrorVar(result.response.data);
                        setDescriptionErrorVar(result.response.data);
                        setIsLoading(false);
                        OpenCloseErrorModal();
                    }
                });
            break;
        
            default:
                console.log("foi padrao");
                break;
        }
    } catch (error) {
        console.log("deu errro: " + error);
        setIsLoading(false);
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
                closeModalMethod={closePistolModal}
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
        { boolInventoryModal && !isMobile && (
            <InventoryModal 
                closeModalMethod={closeInventoryModal}
                methodUpdateArray={setNewEtiqueta}
            />
        )}
        { boolConfirmModal && !isMobile && (
            <ConfirmModal 
                yesClickMethod={YesClickMethod}
                noClickMethod={OpenCloseConfirmModal}
            />
        )}
        { boolConfirmModalPistol && !isMobile && (
            <ConfirmModalPistol 
                yesClickMethod={YesClickMethodPistol}
                noClickMethod={OpenCloseConfirmModalPistol}
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
                                method={() => OpenClosePistolModal(1)}
                                icon={<ImBarcode/>}
                                actionText="Liberar"
                                isActive
                            />
                        )}
                        { !isMobile && (
                            <ActionButton
                                method={() => OpenCloseInventoryModal(2)}
                                icon={<ImBarcode/>}
                                actionText="Estoque"
                                isActive
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
                        <Button onClick={submitForApi}>Gravar</Button>
                        <div className="loaderCentralizeArea">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
