import styles from './styles.module.scss';

const NewUserButton = ({ children }: { children: string }) => {
  return (
    <button className={styles.newUserButton + " flex place-content-between items-center bg-white"}>
        <div className={styles.imgPlus} />
        {children}
    </button>
  )
}

export default NewUserButton