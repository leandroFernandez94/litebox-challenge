import styles from './MobileMenu.module.css'
import classNames from 'classnames'
export default function UserSetting({name}) {
  return (
    <li className={styles.userSettingContainer}>
      <div className={classNames(styles.text, styles.userSettingText)}>{name}</div>
      <hr className={styles.horizontalLine} />
    </li>
  )
}