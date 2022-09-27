import React from "react";
import { Props } from "../protocols/react/Props";
import { Header } from "./Header";

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
