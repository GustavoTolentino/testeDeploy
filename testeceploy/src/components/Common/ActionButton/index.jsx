import React from "react";
import { ActionButtonWrapper } from "./styles/ActionButtonWrapper";

export function ActionButton({
    method,
    actionclass,  
    icon,
    actionText,
    isActive,
    ...props
}) {
  return (
    <ActionButtonWrapper 
      onClick={method} 
      className={actionclass} 
      isActive={isActive}
      {...props}
    >
      {icon}
      <h2>{actionText}</h2>
    </ActionButtonWrapper>
  );
}