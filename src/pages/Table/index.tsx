import { useEffect, useState } from "react";
import { MyCombobox } from "../../components/MyCombobox"
import { IParticipant, participants } from "../../share/participants"
import NewUserButton from "./NewUserButton";
import styles from './styles.module.scss';
import MyForm from "../../components/MyForm";

const Table = () => {
  const [filteredPeople, setFilteredPeople] = useState(participants);
  const [viewedPeople, setViewedPeople] = useState(filteredPeople);
  const [editPerson, setEditPerson] = useState<IParticipant | null>(null);
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = window.innerWidth < 680

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  const handleDelete = (indexToDelete: number) => {
    const updatedPeople = [...filteredPeople];
    updatedPeople.splice(indexToDelete, 1);

    setFilteredPeople(updatedPeople);
  };

  const handleEdit = (indexToEdit: number) => {
    setIndexToEdit(indexToEdit);
    openModal();
  };

  const handleCreate = () => {
    setIndexToEdit(null);
    openModal()
  }

  useEffect(() => {
    setEditPerson(indexToEdit !== null ? participants[indexToEdit] : null);
  }, [indexToEdit]);
  

  useEffect(() => {
    setViewedPeople(filteredPeople);
  }, [filteredPeople]);

  return (
    <>
      <div className={styles.tablePage + " w-full md:w-9/12 float-right bg-slate-50"}>
        <p className="text-base">Агрономы и участники</p>
        <div className="flex place-content-between flex-wrap mb-4">
          <h2 className="mb-2">Участники хозяйства</h2>
          <NewUserButton openModal={handleCreate}>Добавить участника</NewUserButton>
        </div>
        {viewedPeople &&
        <>
          <MyCombobox filteredPeople={filteredPeople} setViewedPeople={setViewedPeople} />
          <div className={styles.mainTable + " bg-white"}>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Участник</th>
                  <th>Роль/Активно до</th>
                  <th>Отделение</th>
                </tr>
              </thead>
              <tbody>
              {viewedPeople.map((item, index) => {
                if (!isSmallScreen) {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='font-bold'>{item.name}</div>
                        <p>{item.phone}</p>
                      </td>
                      <td>
                        <div>
                          <div>{item.role}</div>
                          {item.isTemporary ? 
                            <p>до {item.activeUntil}</p>
                          :
                            <p>{item.activeUntil}</p>
                          }
                        </div>
                      </td>
                      <td className="flex place-content-between content-center">
                        <div>{item.department}</div>
                      </td>
                      <td className="p-0">
                        <div className="flex gap-1">
                          <button 
                            className={styles.icon + ' ' + styles.imgEdit}
                            onClick={() => handleEdit(index)}
                          />
                          <button
                            onClick={() => handleDelete(index)}
                            className={styles.icon + ' ' + styles.imgDelete}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='font-bold'>{item.name}</div>
                        <p>{item.phone}</p>
                        <div>{item.department}</div>
                      </td>
                      <td>
                        <div className="flex gap-1 place-content-end">
                          <button className={styles.icon + ' ' + styles.imgEdit} />
                          <button
                            onClick={() => handleDelete(index)}
                            className={styles.icon + ' ' + styles.imgDelete}
                          />
                        </div>
                        <div>
                          <div>{item.role}</div>
                          {item.isTemporary ? 
                            <p>до {item.activeUntil}</p>
                          :
                            <p>{item.activeUntil}</p>
                          }
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              </tbody>
            </table>
          </div>
        </>
        }
      </div>
      <MyForm 
        isOpen={isOpen} 
        closeModal={closeModal} 
        filteredPeople={filteredPeople} 
        editPerson={editPerson}
      />
    </>
  )
}

export default Table
