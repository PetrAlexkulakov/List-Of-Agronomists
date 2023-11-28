import styles from './styles.module.scss';

const NewUserButton = ({ children, openModal }: { children: string, openModal: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      className={styles.newUserButton + " flex place-content-between items-center bg-white"}
      onClick={openModal}
    >
        <div className={styles.imgPlus} />
        {children}
    </button>
  )
}

export default NewUserButton