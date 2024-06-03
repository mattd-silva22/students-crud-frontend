import React from "react";
import styles from "./studentsToolsBar.module.scss";
import { User, Search } from "react-feather";
import { useApp } from "@/hooks/useApp";

export default function StudentsToolsBar() {
  const { studentsList } = useApp();
  return (
    <div className={styles.toolbar}>
      <span className={styles.summary}>
        <User size={16} />
        Total : {studentsList.length}
      </span>

      <div className={styles.searchBar}>
        <div className={styles.inputArea}>
          <Search size={16} />
          <input placeholder="Pesquisar" type="text" />
        </div>
      </div>
    </div>
  );
}
