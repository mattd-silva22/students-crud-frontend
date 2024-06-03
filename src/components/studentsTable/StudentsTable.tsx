import React, { use, useEffect } from "react";
import styles from "./studentsTable.module.scss";
import { formatCpf } from "@/utils/formatCpf.utils";
import { formatTimestamp } from "@/utils/formatTimestamp.util";
import { Menu } from "react-feather";
import { useApp } from "@/hooks/useApp";
import { TStudent } from "@/app/types/student.type";
import { ChevronLeft, ChevronRight, Eye, Trash, Edit } from "react-feather";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import ViewModal from "../Modals/ViewModal/ViewModal";
import EditModal from "../Modals/EditModal/EditlModal";
export default function StudentsTable() {
  const { studentsList, isLoading, segmentedStudentsList } = useApp();
  const [page, setPage] = React.useState(1);
  const [currentData, setCurrentData] = React.useState<TStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = React.useState<TStudent>(
    {} as TStudent
  );
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isViewOpen, setIsViewOpen] = React.useState(false);

  const closeModal = () => {
    setIsDeleteOpen(false);
    setIsEditOpen(false);
    setIsViewOpen(false);
    setSelectedStudent({} as TStudent);
  };

  const handleSwitchPage = (page: number) => {
    setPage(page);
  };

  const handleDelete = (student: TStudent) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handleView = (student: TStudent) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  const handleEdit = (student: TStudent) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };

  useEffect(() => {
    if (!isLoading && segmentedStudentsList) {
      setCurrentData(segmentedStudentsList[page - 1]);
    }
  }, [studentsList, page, isLoading]);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Ultima Atualização</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && currentData
            ? currentData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatCpf(item.cpf)}</td>
                    <td>{item.email}</td>

                    <td>{formatTimestamp(item.updated_at)}</td>
                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div className={styles.dropbtn}>
                        <Menu size={16} />
                        <div className={styles.dropmenu}>
                          <ul>
                            <li>
                              <button onClick={() => handleView(item)}>
                                <Eye size={16} />
                                Visualizar
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleEdit(item)}>
                                <Edit size={16} />
                                Editar
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleDelete(item)}>
                                <Trash size={16} />
                                Excluir
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>

      <div className={styles.pageSelector}>
        <div className={styles.selector}>
          <div>
            <button
              disabled={page === 1}
              onClick={() => handleSwitchPage(page - 1)}
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <div className={styles.summary}>
            <p>
              {" "}
              {page} /{" "}
              {segmentedStudentsList ? segmentedStudentsList.length : "0"}
            </p>
            <p>
              Exbindo {currentData ? currentData.length : "0"} de{" "}
              {studentsList ? studentsList.length : "0"} registros
            </p>
          </div>
          <div>
            <button
              disabled={page === segmentedStudentsList.length}
              onClick={() => handleSwitchPage(page + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={closeModal}
        student={selectedStudent}
      />

      <ViewModal
        isOpen={isViewOpen}
        onClose={closeModal}
        student={selectedStudent}
      />

      <EditModal
        isOpen={isEditOpen}
        onClose={closeModal}
        student={selectedStudent}
      />
    </>
  );
}
