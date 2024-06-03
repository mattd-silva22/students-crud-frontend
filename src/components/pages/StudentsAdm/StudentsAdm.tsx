"use client";
import StudentsTable from "@/components/studentsTable/StudentsTable";
import React from "react";
import styles from "./studentsAdm.module.scss";
import StudentsToolsBar from "@/components/StudentsToolsBar/StudentsToolsBar";
import { useApp } from "@/hooks/useApp";
export default function StudentsAdm() {
  const { isLoading, studentsList } = useApp();

  return (
    <>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.pageInfo}>
            <h1>Gerencie os alunos cadastrados no sistema</h1>
            <p>Adicone, delete ou atualize o cadastro dos alunos</p>
          </div>

          {isLoading || !studentsList.length ? (
            <p>Carregando...</p>
          ) : (
            <>
              <StudentsToolsBar />

              <StudentsTable />
            </>
          )}
        </div>
      </main>
    </>
  );
}
