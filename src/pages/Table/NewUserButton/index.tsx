import styles from './styles.module.scss';

const NewUserButton = ({ children, openModal }: { children: string, openModal: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      className={styles.newUserButton + 
        " flex sm:place-content-between items-center bg-white w-full sm:w-1/3 place-content-center"}
      onClick={openModal}
    >
        <div className={styles.imgPlus} />
        {children}
    </button>
  )
}

export default NewUserButton