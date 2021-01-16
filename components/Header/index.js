import styles from './Header.module.css'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import MobileMenu from '../MobileMenu'

export default function Header({openUploadMovieModal}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollValue = useRef(0)

  function handleScrollChange() {
    const newScrollValue = window.scrollY
    if(!!newScrollValue !== !!scrollValue.current) {
      setIsScrolled(oldValue => !oldValue)
    }
    scrollValue.current = newScrollValue
  }

  useEffect(function changeBgOnScroll() {
    setIsScrolled(!!window.scrollY)
    scrollValue.current = window.scrollY
    window.addEventListener('scroll', handleScrollChange)
  }, [])

  return (
    <nav className={classnames(styles.header, {[styles.headerScrolled]: isScrolled})}>
      <MobileMenu />
      <div className={classnames(styles.headerSection, styles.mainSection)}>
        <img src="/liteflix.svg"></img>
        <a className={styles.mainOption}>inicio</a>
        <a className={styles.mainOption}>series</a>
        <a className={styles.mainOption}>peliculas</a>
        <a className={styles.mainOption}>agregados recientemente</a>
        <a className={styles.mainOption}>mi lista</a>
        <button className={styles.mainOption} onClick={() => openUploadMovieModal(true)}>+ agregar pelicula</button>
      </div>
      <div className={classnames(styles.headerSection, styles.profileSection)}>
        <span>Ninos</span>
      </div>
    </nav>
  )
}