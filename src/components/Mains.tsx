import { ReactNode } from "react";

const Mains = ({ children }: { children: ReactNode }) => {
  return <main className="main">{children}</main>;
};

export default Mains;
