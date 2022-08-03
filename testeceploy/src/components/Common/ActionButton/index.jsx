import React from "react";
import { ActionButtonWrapper } from "./styles/ActionButtonWrapper";

export function ActionButton({
    method,
    actionclass,  
    icon,
    actionText,
    ...props
}) {
  return (
    <ActionButtonWrapper onClick={method} className={actionclass} {...props}>
      {icon}
      <h2>{actionText}</h2>
    </ActionButtonWrapper>
  );
}