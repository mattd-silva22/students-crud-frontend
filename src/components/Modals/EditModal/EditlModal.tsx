import React, { use, useEffect } from "react";
import Modal from "react-modal";
import { TStudent } from "@/app/types/student.type";
import { formatCpf } from "@/utils/formatCpf.utils";
import styles from "./editModal.module.scss";
import { useApp } from "@/hooks/useApp";
import { emailValidator } from "@/utils/emailValitador.util";
import { toast } from "react-toastify";
type TProps = {
  isOpen: boolean;
  onClose: () => void;
  student: TStudent;
};
export default function EditModal(props: TProps) {
  const { isOpen, onClose, student } = props;

  const [editedName, setEditedName] = React.useState<string>("");
  const [editedEmail, setEditedEmail] = React.useState<string>("");

  const { updateStudent } = useApp();

  const handleUpdate = () => {
    if (validateInput() === false) {
      return;
    }

    updateStudent({
      ...student,
      name: editedName,
      email: editedEmail,
    });

    handleCancel();
  };

  const validateInput = () => {
    if (!editedName || !editedEmail) {
      alert("Preencha todos os campos");
      return false;
    }

    if (editedName.length < 1) {
      alert("Nome inválido");
    }

    if (editedName.length > 255) {
      alert("Nome muito grande");
    }

    if (emailValidator(editedEmail) === false) {
      alert("Email inválido");
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    setEditedEmail("");
    setEditedName("");
    onClose();
  };

  useEffect(() => {
    setEditedName(student.name);
    setEditedEmail(student.email);
  }, [student]);

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
        <h2>Editar Aluno</h2>
        <form>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => {
                setEditedName(e.target.value);
              }}
              value={editedName}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedEmail}
              onChange={(e) => {
                setEditedEmail(e.target.value);
              }}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formatCpf(student.cpf ?? "")}
              disabled
            />
          </div>
        </form>
        <div className={styles["btn-area"]}>
          <button onClick={handleUpdate} className={styles["save-btn"]}>
            Salvar
          </button>
          <button onClick={handleCancel}>Canelar</button>
        </div>
      </div>
    </Modal>
  );
}
