import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Common/Button";
import barcodeCartoon from "../../assets/img/Barcode-amico.svg";
import "./styles/style.css";

export function PistolScannerModal({closeModalMethod, methodUpdateArray}) {
  const [pistolInputData, setPistolInputData] = useState('');
  
  useEffect(() => {
    handleVerifyPistolInput();
  }, [pistolInputData]);

  function handleVerifyPistolInput(){
    if(pistolInputData.length === 22){
      methodUpdateArray(pistolInputData);
      setPistolInputData("");
    }
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
          <h2>Utilize o Scanner de Pistola para adicionar um novo codigo de barras!</h2>
          <img src={barcodeCartoon} alt="Cartoon para ilustrar o processo de scannear um codigo de barras" />
          <div className="inputButtonArea">
            <input 
              id="pistolInput" 
              type="text" 
              onChange={(e) => setPistolInputData(e.target.value)}
              value={pistolInputData}
              placeholder="Codigo de Barras"
              autoFocus
            />
            <Button onClick={closeModalMethod} closeModal>Fechar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}