import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { AiOutlineClose } from "react-icons/ai"
import "./styles/style.css";

export function EtiquetaScanner({closeModalMethod, methodUpdateArray}) {
  const [data, setData] = React.useState("Not Found");

  return (
    <div>
      <div className="modalOppacity"></div>
      <div className="modalAreaScanner">
        <div onClick={closeModalMethod} className="modalButtonArea"><AiOutlineClose/></div>
        <BarcodeScannerComponent
          width={"400px"}
          onUpdate={(err, result) => {
            if (result){
              methodUpdateArray(result.text);
            } 
            else {
              setData("Not Found");
              console.log(err);
            }
          }}
        />
        <p>{data}</p>
      </div>
    </div>
  );
}