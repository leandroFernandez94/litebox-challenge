import styles from './MobileMenu.module.css'

export default function MobileMenu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  )
}