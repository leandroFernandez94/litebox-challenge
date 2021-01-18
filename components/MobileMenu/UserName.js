import styles from './MobileMenu.module.css'

export default function UserName({name}) {
  return (
    <div className={styles.usernameContainer}>
      <div className={styles.oval}>
        <img src="/profile-icon-selected.svg"></img>
      </div>
      <span className={styles.usernameTxt}>{name}</span>
    </div>
  )
}