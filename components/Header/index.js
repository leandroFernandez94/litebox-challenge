import styles from './Header.module.css'
import classnames from 'classnames'
import { Fragment, useEffect, useRef, useState } from 'react'
import Profile from '../Profile'
import AddMovieButton from '../AddMovieButton'
import useMobileMedia from '../../hooks/useMobileMedia'

export default function Header({openUploadMovieModal}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollValue = useRef(0)

  const isMobile = useMobileMedia()

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
      {isMobile ? (
        <img src="/liteflix.svg"></img>
      ) : (
        <Fragment>
          <div className={classnames(styles.headerSection, styles.mainSection)}>
            <img src="/liteflix.svg"></img>
            <a className={styles.mainOption}>inicio</a>
            <a className={styles.mainOption}>series</a>
            <a className={styles.mainOption}>peliculas</a>
            <a className={styles.mainOption}>agregados recientemente</a>
            <a className={styles.mainOption}>mi lista</a>
            <AddMovieButton onClick={() => openUploadMovieModal(true)} />
          </div>
          <div className={classnames(styles.headerSection, styles.profileSection)}>
            <span className={styles.mainOption}>Niños</span>
            <Profile/>
          </div>
        </Fragment>
      )}

    </nav>
  )
}