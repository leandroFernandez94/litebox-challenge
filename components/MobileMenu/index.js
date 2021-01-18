import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { createPortal } from 'react-dom'
import styles from './MobileMenu.module.css'
import UserName from './UserName'
import useOutsideClick from '../../hooks/useOutsideClick'
import UserSetting from './UserSetting'
import NotificationsBell from '../NotificationsBell'
import AddMovieButton from '../AddMovieButton'

function Menu({isOpen, close, addMovieHandler}) {
  const menuRef = useRef()
  useOutsideClick(menuRef, close)

  return (
    <div className={classNames(styles.overlay, {[styles.open]: isOpen})}>
      <div ref={menuRef} className={classNames(styles.sidebarContainer, isOpen && styles.sidebarContainerOpen)}>
        <div className={styles.sidebarHeader}>
          <div className={styles.menuImgContainer} onClick={close}>
            <img src="/menu.svg" className={styles.menuImg}></img>
          </div>
          <img src="/liteflix.svg"></img>
        </div>
        <div className={styles.sidebarContent}>
          <UserName name="Leandro Fernandez"/>
          <ul className={styles.optionsContainer}>
            <UserSetting name="Cambiar Usuario"/>
            <UserSetting name="Configuracion"/>
            <UserSetting name="Ayuda"/>
          </ul>
          <div className={styles.notifications}>
            <NotificationsBell hasNotifications />
            <span className={styles.notificationsText}>Novedades</span>
          </div>
          <ul className={styles.optionsContainer}>
            <li className={styles.category}>Series</li>
            <li className={styles.category}>Peliculas</li>
            <li className={styles.category}>Mi Lista</li>
            <li className={styles.category}>Ninos</li>
          </ul>
          <AddMovieButton onClick={addMovieHandler} />
          <div className={styles.logout}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default function MobileMenu({addMovieHandler}) {
  const [isOpen, setIsOpen] = useState(false)
  const mobileElement = useRef(null)
  useEffect(() => {
    mobileElement.current = document.querySelector('#mobile-sidebar')
  }, [])

  function addMovie() {
    setIsOpen(false)
    addMovieHandler()
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuImgContainer} onClick={() => setIsOpen(oldVal => !oldVal)}>
        <img src="/menu.svg" className={styles.menuImg}></img>
      </div>
      {mobileElement.current && createPortal(
        <Menu 
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          addMovieHandler={addMovie}/>,
        mobileElement.current
      )}
    </div>
  )
}