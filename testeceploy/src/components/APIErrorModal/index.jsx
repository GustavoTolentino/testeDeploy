import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Common/Button";
import errorCartoon from "../../assets/img/ErrorCartoon.svg";
import "./styles/style.css";

export function APIErrorModal({closeErrorModalMethod, tittleError, descriptionError}) {

  return (
    <div>
      <div className="modalOppacity"/>
      <div className="centerAreaModal">
        <div className="modalAreaErrorScanner">
          <div onClick={closeErrorModalMethod} className="modalButtonArea">
            <AiOutlineClose 
              className="closeButtonPistolModal"
              size={18}
            />
          </div>
          <h2>Infelizmente houve um erro!</h2>
          <img src={errorCartoon} alt="Imagem que remete a um computador quebrado para simbolizar o erro que ocorreu no sistema" />
          <details>
            <summary>{tittleError}</summary>
            <p>{descriptionError}</p>
          </details>
        </div>
      </div>
    </div>
  );
}