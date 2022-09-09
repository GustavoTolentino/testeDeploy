import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../Common/Button";
import "./styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function ConfirmModal({yesClickMethod, noClickMethod}) {

  return (
    <div>
      <div className="modalOppacity"/>
      <div className="centerAreaModal">
        <div className="backgroundConfirmModal">
            <span>Voce ainda possui codigos de barras pendentes, deseja limpa-los?</span>
            <div className="buttonConfirmModalArea">
                <Button onClick={yesClickMethod} confirmButton>Sim</Button>
                <Button onClick={noClickMethod} confirmButton>Nao</Button>
            </div>
        </div>
      </div>
    </div>
  );
}