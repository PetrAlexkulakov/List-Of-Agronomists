import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import styles from './styles.module.scss';

const MyForm = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
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
                  <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" name="name" placeholder="Имя" />
                    <input type="text" name="department" placeholder="Отделение" />
                    <div>
                      <select name="role" id="">
                        <option value="agronomist">Агроном</option>
                        <option value="director">Руководитель</option>
                      </select>
                      <input type="text" name="phone" placeholder="Телефон приглашаемого" />
                    </div>
                    <div className="flex place-content-between">
                      <div className="w-1/2">
                        <input type="checkbox" name="isTemporary" id="isTemporary" />
                        <label htmlFor="isTemporary"></label>
                        <div className="flex flex-col">
                          <div>Временный сотрудник</div>
                          <p>Укажите до какого срока нужен доступ</p>
                        </div>
                      </div>
                      <input className={styles.mainForm__inputDate} type="date" name="temporaryFor" id="" />
                    </div>
                    <textarea name="comment" id="" cols={50} rows={3}></textarea>
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
