import styles from './Profile.module.css'
import classNames from 'classnames'

export default function SettingButton() {
  return (
    <div className={styles.logoutOptionContainer}>
      <div className={classNames(styles.text,styles.logoutOptionText)}>Logout</div>
    </div>
  )
}