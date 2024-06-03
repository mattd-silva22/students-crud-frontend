import React, { use, useEffect } from "react";
import Modal from "react-modal";
import { formatCpf } from "@/utils/formatCpf.utils";
import styles from "./createModal.module.scss";
import { useApp } from "@/hooks/useApp";
import { emailValidator } from "@/utils/emailValitador.util";
import { cpfValidator } from "@/utils/cpfValidator.util";
import { TStudent } from "@/app/types/student.type";
type TProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function CreateModal(props: TProps) {
  const { isOpen, onClose } = props;

  const [studentName, setStudentName] = React.useState<string>("");
  const [studentEmail, setStudentEmail] = React.useState<string>("");
  const [studentCpf, setStudentCpf] = React.useState<string>("");

  const { addStudent } = useApp();

  const handleCreate = () => {
    if (validateInput() === false) {
      return;
    }

    addStudent({
      name: studentName,
      email: studentEmail,
      cpf: studentCpf,
    } as TStudent);
    handleCancel();
  };

  const validateInput = () => {
    if (!studentName || !studentEmail || !studentCpf) {
      alert("Preencha todos os campos");
      return false;
    }

    if (studentName.length < 1) {
      alert("Nome inválido");
    }

    if (studentName.length > 255) {
      alert("Nome muito grande");
    }

    if (emailValidator(studentEmail) === false) {
      alert("Email inválido");
      return false;
    }

    if (cpfValidator(studentCpf) === false) {
      alert("CPF inválido");
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    setStudentEmail("");
    setStudentName("");
    setStudentCpf("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "30%",
          height: "60%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <div className={styles.modal}>
        <h2>Criar Aluno</h2>
        <form>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
              value={studentName}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={studentEmail}
              onChange={(e) => {
                setStudentEmail(e.target.value);
              }}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formatCpf(studentCpf ?? "")}
              onChange={(e) => {
                setStudentCpf(e.target.value);
              }}
            />
          </div>
        </form>
        <div className={styles["btn-area"]}>
          <button onClick={handleCreate} className={styles["save-btn"]}>
            Adicionar
          </button>
          <button onClick={handleCancel}>Canelar</button>
        </div>
      </div>
    </Modal>
  );
}
