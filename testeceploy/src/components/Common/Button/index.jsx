import React from "react";
import { ButtonWrapper } from "./styles/ButtonWrapper";

export function Button({
  children,
  login,
  backgroundLess,
  closeModal,
  onClick,
  ...props
}) {
  return (
    <ButtonWrapper
      onClick={onClick}
      login={login}
      backgroundLess={backgroundLess}
      closeModal={closeModal}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}