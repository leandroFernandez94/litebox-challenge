import classNames from 'classnames'
import styles from './FinishedState.module.css'

export default function FinishedState({onClose, title}) {
  return <div className={styles.finishedStateContainer}>
    <img src="/liteflix.svg"></img>
    <div className={styles.congrats}>
    <span>Felicitaciones!</span>
    </div>
    <div><span><b>{title}</b> fue corectamente subido a la categoria <b>Aventuras</b></span></div>
    <button className={styles.close} onClick={onClose}>Cerrar</button>
  </div>
}