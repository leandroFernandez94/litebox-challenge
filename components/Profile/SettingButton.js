import styles from './Profile.module.css'
import classNames from 'classnames'
export default function SettingButton({name}) {
  return (
    <div className={styles.settingButtonContainer}>
      <div className={classNames(styles.text, styles.settingButtonText)}>{name}</div>
      <hr className={styles.horizontalLine} />
    </div>
  )
}