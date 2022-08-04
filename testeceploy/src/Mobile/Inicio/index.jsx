import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LogoGI from "../../assets/img/GraficaInteligente_FT.png";
import "./styles/style.css";
import { Button } from "../../components/Common/Button";
import { ActionButton } from "../../components/Common/ActionButton";
import { BsFillCameraFill, BsFillGearFill } from "react-icons/bs"
import { IoMdQrScanner } from "react-icons/io"
import { AiOutlineClose } from "react-icons/ai";
import { BiImport } from "react-icons/bi"
import { EtiquetaScanner } from "../EtiquetaScanner";
import { useMediaQuery } from 'react-responsive';
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Inicio() {
    // const history = useNavigate();
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [boolModal, setBoolModal] = useState(false);
    const [canLoadList, setCanLoadList] = useState(false);
    const [arrayEtiquetas, setArrayEtiquetas] = useState([]);

  const OpenCloseModal = () =>
  {
    if(boolModal === false)
        setBoolModal(true);
    else
        setBoolModal(false);
  }
  function newEtiquetaOnTable(etiqueta){
    toast.success('A etiqueta: ' + etiqueta + " foi adicionada com sucesso!", {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  }
  function thisEtiquetaAlreadyExists(etiqueta){
    toast.error('A etiqueta: ' + etiqueta + " ja foi lida!", {
    position: "top-right",
    autoClose: 8000,
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
    }else{
        thisEtiquetaAlreadyExists(newEtiqueta);
    }
  }
  function deleteEtiqueta(etiquetaIndex) {
    setArrayEtiquetas(arrayEtiquetas.filter(element => {
        return element !== etiquetaIndex;
    }))
  }

  return (
    <div className="contentArea">
        <div className="mobileInicioContent">
            <img src={LogoGI} style={{width: "320px"}} alt="Logo do software Grafica Inteligente."/>
            <h1>Bem-vindo, Joao!</h1>

            { boolModal && isMobile && (
            <EtiquetaScanner 
                closeModalMethod={OpenCloseModal}
                methodUpdateArray={setNewEtiqueta}
            />)}

            <div className="actionsArea">
                <h2>Ações</h2>
                
                <div className="actionsButtonsArea">
                    { isMobile && (
                        <ActionButton
                            method={OpenCloseModal}
                            icon={<BsFillCameraFill/>}
                            actionText="Etiquetas"
                        />
                    )}
                    { !isMobile && (
                        <ActionButton
                            icon={<IoMdQrScanner/>}
                            actionText="Scannear"
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
                autoClose={8000}
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
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Etiqueta</th>
                            <th scope="col">Acoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        { canLoadList && arrayEtiquetas.map((etiqueta) => (
                            <tr key={etiqueta.key}>
                                <th></th>
                                <td>{etiqueta}</td>
                                <td><AiOutlineClose onClick={() => deleteEtiqueta(etiqueta)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button>Gravar</Button>
            </div>
        </div>
    </div>
  );
}
