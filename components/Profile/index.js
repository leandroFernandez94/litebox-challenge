import { useEffect, useRef, useState } from 'react'
import styles from './Profile.module.css'
import SettingButton from './SettingButton'
import UserOption from './UserOption'
import Logout from './Logout'

export default function Profile() {
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef()

  useEffect(() => {
    containerRef.current.addEventListener('mouseenter', () => {
      setExpanded(true)
    })
    containerRef.current.addEventListener('mouseleave', () => {
      setExpanded(false)
    })
  }, [])


  return (
    <div className={styles.profileContainer} ref={containerRef} onClick={() => setExpanded(oldVal => !oldVal)}>
      <img src="/profile-icon-desktop.svg"></img>
      <div className={styles.arrow}></div>
      {expanded && (
        <div className={styles.dropdownPosition}>
          <div className={styles.dropdownContainer}>
            <UserOption selected username="Leandro Fernandez" />
            <UserOption username="User 03" />
            <UserOption username="User 04" />
            <SettingButton name="Configuracion"/>
            <SettingButton name="Ayuda" />
            <Logout/>
          </div>
        </div>)
      }
    </div>
  )
}