import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Common/Button";
import InventoryCartoon from "../../assets/img/InventoryCartoon.svg";
import "./styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export function InventoryModal({closeModalMethod, methodUpdateArray}) {
  const [pistolInputData, setPistolInputData] = useState('');
  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pressione ENTER para enviar
    </Tooltip>
  );

  function handleVerifyPistolInput(){
    methodUpdateArray(pistolInputData, 2);
    setPistolInputData("");
  }

  return (
    <div>
      <div className="modalOppacity"/>
      <div className="centerAreaModal">
        <div className="modalAreaPistolScanner">
          <div onClick={closeModalMethod} className="modalButtonArea">
            <AiOutlineClose 
              className="closeButtonPistolModal"
              size={18}
            />
          </div>
          <h2>Utilize o Scanner de Pistola para adicionar um novo produto ao estoque!</h2>
          <img src={InventoryCartoon} alt="Cartoon para ilustrar um estoque para caixa de papelao" />
          <div className="inputButtonArea">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <input 
                id="pistolInput" 
                type="text" 
                value={pistolInputData}
                onKeyPress={(e) => {if(e.key === 'Enter'){
                  handleVerifyPistolInput();
                }}}
                placeholder="Codigo de Barras"
                onChange={(e) => setPistolInputData(e.target.value)}
                autoFocus
              />
            </OverlayTrigger>             
              <Button onClick={closeModalMethod} closeModal>Fechar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}