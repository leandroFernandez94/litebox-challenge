import styles from './Header.module.css'
import classnames from 'classnames'

export default function Header() {
  return (
    <nav className={styles.header}>
      <button className={styles.headerMenuBtn}>menu</button>
      <div className={classnames(styles.headerSection, styles.mainSection)}>
        <img src="/liteflix.svg"></img>
        <a className={styles.mainOption}>inicio</a>
        <a className={styles.mainOption}>series</a>
        <a className={styles.mainOption}>peliculas</a>
        <a className={styles.mainOption}>agregados recientemente</a>
        <a className={styles.mainOption}>mi lista</a>
        <button className={styles.mainOption}>+ agregar pelicula</button>
      </div>
      <div className={classnames(styles.headerSection, styles.profileSection)}>
        <span>Ninos</span>
      </div>
    </nav>
  )
}