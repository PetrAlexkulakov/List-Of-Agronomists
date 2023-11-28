import { useEffect, useState } from "react";
import { MyCombobox } from "../../components/MyCombobox"
import { participants } from "../../share/participants"
import NewUserButton from "./NewUserButton";
import styles from './styles.module.scss';
import MyForm from "../../components/MyForm";

const Table = () => {
  const [filteredPeople, setFilteredPeople] = useState(participants)
  const [viewedPeople, setViewedPeople] = useState(filteredPeople);
  const [isOpen, setIsOpen] = useState(true);

  const handleDelete = (indexToDelete: number) => {
    const updatedPeople = [...filteredPeople];
    updatedPeople.splice(indexToDelete, 1);

    setFilteredPeople(updatedPeople);
  };

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    setViewedPeople(filteredPeople);
  }, [filteredPeople]);

  return (
    <>
      <div className={styles.tablePage + " w-9/12 float-right bg-slate-50"}>
        <p className="text-base">Агрономы и участники</p>
        <div className="flex place-content-between mb-4">
          <h2>Участники хозяйства</h2>
          <NewUserButton openModal={openModal}>Добавить участника</NewUserButton>
        </div>
        {viewedPeople &&
          <div className={styles.mainTable + " bg-white"}>
            <MyCombobox filteredPeople={filteredPeople} setViewedPeople={setViewedPeople} />
            <table className="w-full">
              <thead>
                <tr>
                  <th>Участник</th>
                  <th>Роль/Активно до</th>
                  <th>Отделение</th>
                </tr>
              </thead>
              <tbody>
                {viewedPeople.map((item, index) =>
                  <tr key={index}>
                    <td>
                      <div className='font-bold'>{item.name}</div>
                      <p>{item.phone}</p>
                    </td>
                    <td>
                      <div>
                        <div>{item.role}</div>
                        <p>{item.activeUntil}</p>
                      </div>
                    </td>
                    <td className="flex place-content-between content-center">
                      <div>{item.department}</div>
                      <div className="flex gap-1">
                        <button className={styles.icon + ' ' + styles.imgEdit} />
                        <button
                          onClick={() => handleDelete(index)}
                          className={styles.icon + ' ' + styles.imgDelete}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
      <MyForm isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default Table
