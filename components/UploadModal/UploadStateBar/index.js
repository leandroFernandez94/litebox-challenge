import classNames from 'classnames'
import styles from './UploadStateBar.module.css'

import {STATES} from '../index'

const ErrorText = () => (
  <span><b>Error!</b> No se pudo cargar la película</span> 
)

const SuccessText = () => (
  <span>100% Cargado</span>
)

const LoadingText = ({percent}) => (
  <span>Cargando {percent}%</span>
)


export default function UploadStateBar({status}) {
  console.log('status', status)
  let statusText
  switch(status) {
    case STATES.ERROR:
      statusText = <ErrorText />
      break
    case STATES.SUCCESS:
      statusText = <SuccessText />
      break
    default:
      statusText = <LoadingText percent={status}/>
  }

  const width = 
    (status === STATES.SUCCESS || status === STATES.ERROR)
     ? 100 
     : status

  return (
    <div 
      className={classNames(
        styles.container, 
        {
          [styles.error]: status === STATES.ERROR,
          [styles.success]: status === STATES.SUCCESS,
        }
      )}>
      <div className={styles.statusText}>{statusText}</div>
      <div className={styles.statusBarContainer}>
        <div className={styles.statusBarOverlay} style={{width: `${width}%`}}></div>
      </div>
    </div>
  )
}