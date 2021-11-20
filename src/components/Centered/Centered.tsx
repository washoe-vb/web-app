import { FC } from "react";
import { Modal } from "antd";

export const Centered: FC = ({ children }) => (
  <Modal visible mask={false} closable={false} footer={null} >
    {children}
  </Modal>
);
