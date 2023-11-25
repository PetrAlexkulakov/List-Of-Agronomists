import { MyCombobox } from "../../components/MyCombobox"
import { participants } from "../../share/participants"
import NewUserButton from "./NewUserButton";
import styles from './styles.module.scss';

const Table = () => {
  return (
    <div className={styles.tablePage + " w-9/12 float-right bg-slate-50"}>
      <p className="text-base">Агрономы и участники</p>
      <div className="flex place-content-between mb-4">
        <h2>Участники хозяйства</h2>
        <NewUserButton>Добавить участника</NewUserButton>
      </div>
      {participants &&
        <div className={styles.mainTable + " bg-white"}>
          <MyCombobox />
          <table className="w-full">
            <thead>
              <tr>
                <th>Участник</th>
                <th>Роль/Активно до</th>
                <th>Отделение</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((item, index) =>
                <tr key={index}>
                  <td>
                    <div>{item.name}</div>
                    <p>{item.phone}</p>
                  </td>
                  <td>
                    <div>
                      <div>{item.role}</div>
                      <p>{item.activeUntil}</p>
                    </div>
                  </td>
                  <td className="flex place-content-between">
                    <div>{item.department}</div>
                    <div className="flex">
                      <div className={styles.icon + ' ' + styles.imgEdit} />
                      <div className={styles.icon + ' ' + styles.imgDelete} />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default Table
