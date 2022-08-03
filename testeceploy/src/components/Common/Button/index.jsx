import React from "react";
import { ButtonWrapper } from "./styles/ButtonWrapper";

export function Button({
  children,
  login,
  backgroundLess,
  onClick,
  ...props
}) {
  return (
    <ButtonWrapper
      onClick={onClick}
      login={login}
      backgroundLess={backgroundLess}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}