import React from "react";
import Modal from "react-modal";
import styles from "./deleteModal.module.scss";
import { TStudent } from "@/app/types/student.type";
import { useApp } from "@/hooks/useApp";
import { toast } from "react-toastify";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  student: TStudent;
};
export default function DeleteModal(props: TProps) {
  const { isOpen, onClose, student } = props;

  const { deleteStudent } = useApp();

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "30%",
          height: "30%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <div className={styles.modal}>
        <h2>Deletar Aluno</h2>
        <p>Tem certeza que deseja deletar este aluno?</p>
        <p className={styles.student}>Aluno: {student.name}</p>

        <div className={styles["btn-area"]}>
          <button
            onClick={() => handleDelete(student.id)}
            className={styles["delete-btn"]}
          >
            Deletar
          </button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
}
