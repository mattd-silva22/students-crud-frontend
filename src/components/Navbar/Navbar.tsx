"use client";

import React, { useState } from "react";
import CreateModal from "../Modals/CreateModal/CreateModal";
import styles from "./navbar.module.scss";

export default function Navbar() {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsCreateOpen(false);
  };
  return (
    <>
      <header className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.logo}>FADP</h1>

          <button
            className={styles.add_btn}
            onClick={() => setIsCreateOpen(true)}
          >
            Cadastrar Aluno
          </button>
        </div>
      </header>

      <CreateModal onClose={onClose} isOpen={isCreateOpen} />
    </>
  );
}
