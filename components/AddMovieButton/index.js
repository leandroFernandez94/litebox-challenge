import { useEffect, useRef } from 'react'
import styles from './AddMovieButton.module.css'

export default function AddMovieButton({onClick, short}) {
  const buttonRef = useRef()

  useEffect(() => {
    if(!short) {
      buttonRef.current.classList.add(`${styles.hovering}`)
      return
    }
    console.log('pasa', short)
    buttonRef.current.addEventListener('mouseenter', () => {
      buttonRef.current.classList.add(`${styles.hovering}`)
    })
    buttonRef.current.addEventListener('mouseleave', () => {
      buttonRef.current.classList.remove(`${styles.hovering}`)
    })
  }, [])
  return (
    <button className={styles.addMovieButton} ref={buttonRef} onClick={onClick}>
      <div className={styles.addMovieIcon}></div>
      <span className={styles.addMovieText}>Agregar pelicula</span>
    </button>
  )
}