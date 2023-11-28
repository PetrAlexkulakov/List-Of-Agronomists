import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import styles from './styles.module.scss';
import { IParticipant } from "../../share/participants";

const MyForm = ({ isOpen, closeModal, filteredPeople }: { 
    isOpen: boolean, closeModal: () => void, filteredPeople: IParticipant[] 
  }) => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm()

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
      name,
      phone,
      role,
      activeUntil: isTemporary ? temporaryFor : 'Постоянный',
      department,
      comment
    };
  
    filteredPeople.push(newParticipant);
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
                <Dialog.Panel className="w-3/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>Добавить нового участника</div>
                  <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
                    <input {...register("name")} type="text" name="name" placeholder="Имя" />
                    <input {...register("department")} type="text" name="department" placeholder="Отделение" />
                    <div>
                      <select {...register("role")} name="role" id="">
                        <option value="Агроном">Агроном</option>
                        <option value="Руководитель">Руководитель</option>
                      </select>
                      <input {...register("phone")} type="text" name="phone" placeholder="Телефон приглашаемого" />
                    </div>
                    <div className="flex place-content-between">
                      <div className="w-1/2">
                        <input {...register("isTemporary")} type="checkbox" name="isTemporary" id="isTemporary" />
                        <label htmlFor="isTemporary"></label>
                        <div className="flex flex-col">
                          <div>Временный сотрудник</div>
                          <p>Укажите до какого срока нужен доступ</p>
                        </div>
                      </div>
                      <input {...register("temporaryFor")} className={styles.mainForm__inputDate} type="date" name="temporaryFor" id="" />
                    </div>
                    <textarea {...register("comment")} name="comment" id="" cols={50} rows={3}></textarea>
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
