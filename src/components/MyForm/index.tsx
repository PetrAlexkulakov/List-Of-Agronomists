import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import styles from './styles.module.scss';
import { IParticipant } from "../../share/participants";
import { v4 as uuidv4 } from 'uuid';

const MyForm = ({ isOpen, closeModal, filteredPeople, editPerson }: { 
    isOpen: boolean, 
    closeModal: () => void, 
    filteredPeople: IParticipant[],
    editPerson: IParticipant | null 
  }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset
  } = useForm()

  
  useEffect(() => {
    if (editPerson) {
      setValue("name", editPerson.name);
      setValue("department", editPerson.department);
      setValue("phone", editPerson.phone);
      setValue("isTemporary", Boolean(editPerson.isTemporary));
      setValue("role", editPerson.role);
      setValue(
        "temporaryFor",
        editPerson.isTemporary
          ? editPerson.activeUntil?.split(".").reverse().join("-")
          : ""
      );
      setValue("comment", editPerson.comment);
    } else {
      reset();
    }
  }, [editPerson, reset, setValue]);

  const onSubmit = ({
    name,
    department,
    isTemporary,
    phone,
    role,
    comment,
    temporaryFor,
  }: {
    name: string;
    department: string;
    comment: string;
    isTemporary: boolean;
    phone: string;
    role: string;
    temporaryFor: string;
  }) => {
    const newParticipant: IParticipant = {
      id: uuidv4(),
      name,
      phone,
      role,
      activeUntil: isTemporary ? temporaryFor.split("-").reverse().join(".") : 'Постоянный',
      department,
      comment,
      isTemporary,
    };
    if (editPerson) {
      const personId = filteredPeople.findIndex((p) => p.id === editPerson.id)
      filteredPeople[personId] = newParticipant;
    } else {
      filteredPeople.push(newParticipant);
    }
    closeModal()
    reset()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel 
                  className="w-full md:w-3/5 p-0 pb-6 transform overflow-hidden rounded-2xl 
                    bg-white text-left align-middle shadow-xl transition-all"
                >
                  <div className="flex place-content-between p-6 py-3 border-b-2 order-slate-300">
                    {editPerson ?
                      <h3>Редактирование участника</h3>
                      :
                      <h3>Добавить нового участника</h3>
                    }
                    <button className={styles.closeIcon + ' border-0 rounded-none duration-0 p-0'} onClick={closeModal} />
                  </div>
                  <form className={styles.mainForm + ' p-6'} onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
                    <input 
                      {...register("name")} 
                      type="text" 
                      name="name" 
                      placeholder="Имя" 
                    />
                    <input 
                      {...register("department")} 
                      type="text" 
                      name="department" 
                      placeholder="Отделение" 
                    />
                    <div>
                      <select 
                        {...register("role")} 
                        name="role" 
                      >
                        <option value="Агроном">Агроном</option>
                        <option value="Руководитель">Руководитель</option>
                      </select>
                      <input 
                        {...register("phone")} 
                        type="text" 
                        name="phone" 
                        placeholder="Телефон приглашаемого" 
                      />
                    </div>
                    <div className="flex place-content-between">
                      <div className="w-1/2">
                        <input 
                          {...register("isTemporary")} 
                          type="checkbox" 
                          name="isTemporary" 
                          id="isTemporary" 
                        />
                        <label htmlFor="isTemporary"></label>
                        <div className="flex flex-col">
                          <div>Временный сотрудник</div>
                          <p>Укажите до какого срока нужен доступ</p>
                        </div>
                      </div>
                      <input 
                        {...register("temporaryFor")} 
                        className={styles.mainForm__inputDate} 
                        type="date" 
                        name="temporaryFor"
                      />
                    </div>
                    <textarea 
                      {...register("comment")} 
                      name="comment" 
                      cols={50} 
                      rows={3}
                    ></textarea>
                    <button type="submit">Сохранить</button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default MyForm
