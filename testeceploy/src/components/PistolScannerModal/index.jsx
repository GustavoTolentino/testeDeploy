import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"

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
        <div className="modalAreaScanner">
          <div onClick={closeModalMethod} className="modalButtonArea">
            <AiOutlineClose/>
          </div>
          <h2 style={{fontSize: "18px"}}>Utilize o Scanner de Pistola para adicionar um novo codigo de barras!</h2>
          <input 
            id="pistolInput" 
            type="text" 
            onChange={(e) => setPistolInputData(e.target.value)}
            value={pistolInputData}
            placeholder="Codigo de Barras"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}