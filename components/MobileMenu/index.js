import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { createPortal } from 'react-dom'
import styles from './MobileMenu.module.css'

const Menu = ({isOpen}) => (
  <div className={classNames(styles.sidebarContainer, isOpen && styles.sidebarContainerOpen)}></div>
)


export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const mobileElement = useRef(null)
  useEffect(() => {
    mobileElement.current = document.querySelector('#mobile-sidebar')
  }, [])

  console.log(mobileElement.current && isOpen)

  return (
    <div className={styles.menuContainer} onClick={() => setIsOpen(oldVal => !oldVal)}>
      <img src="/menu.svg"></img>
      {mobileElement.current && createPortal(
        <Menu isOpen={isOpen}/>,
        mobileElement.current
      )}
    </div>
  )
}