import { useState } from 'react'
import styles from './Profile.module.css'

export default function Profile() {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={styles.profileContainer} onClick={() => setExpanded(oldVal => !oldVal)}>
      <img src="/profile-icon-desktop.svg"></img>
      <div className={styles.arrow}></div>
    </div>
  )
}