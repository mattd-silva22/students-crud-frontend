import React from "react";
import Modal from "react-modal";
import styles from "./viewModal.module.scss";
import { TStudent } from "@/app/types/student.type";
import { formatTimestamp } from "@/utils/formatTimestamp.util";
import { formatCpf } from "@/utils/formatCpf.utils";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  student: TStudent;
};
export default function ViewModal(props: TProps) {
  const { isOpen, onClose, student } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="View Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "30%",
          height: "50%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <div className={styles.modal}>
        <h2>Visualizar Aluno</h2>
        <p>Nome: {student.name}</p>
        <p>CPF: {formatCpf(student.cpf ?? "")}</p>
        <p>E-mail: {student.email}</p>
        <p>Ultima Atualização: {formatTimestamp(student.updated_at)}</p>
        <p>Criado em: {formatTimestamp(student.created_at)}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </Modal>
  );
}
