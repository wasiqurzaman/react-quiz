import React from "react";

interface Props {
  children: React.ReactNode;
}
const Footer = ({ children }: Props) => {
  return <footer>{children}</footer>;
};

export default Footer;
