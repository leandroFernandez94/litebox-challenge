import classNames from 'classnames'
import styles from './NotificationsBell.module.css'

export default function NotificationsBell({hasNotifications}) {
  return (
    <div className={styles.bellContainer}>
      <img src="/bell.svg"></img>
      {
        hasNotifications && (
          <div className={styles.notificationsDot} />
        )
      }
    </div>
  )
}