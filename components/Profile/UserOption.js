import classNames from 'classnames'
import styles from './Profile.module.css'

function Oval({selected}) {
  return (
    <div className={classNames(styles.oval, {[styles.selected]: selected})}>
      <img src={selected ? '/profile-icon-selected.svg' : '/profile-icon-not-selected.svg'} className={styles.selected} />
    </div>
  )
}


export default function UserOption({selected, username}) {
  return (
    <div className={classNames(styles.userOptionContainer, {[styles.selected]: selected})}>
      <Oval selected={selected} />
      <span className={classNames(styles.text, styles.userOptionName)}>{username}</span>
    </div>
  )
}