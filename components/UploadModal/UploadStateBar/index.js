import classNames from 'classnames'
import styles from './UploadStateBar.module.css'

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
    case 'error':
      statusText = <ErrorText />
      break
    case 'success':
      statusText = <SuccessText />
      break
    default:
      statusText = <LoadingText percent={status}/>
  }

  const width = 
    (status === 'success' || status === 'error')
     ? 100 
     : status

  return (
    <div 
      className={classNames(
        styles.container, 
        {
          [styles.error]: status === 'error',
          [styles.success]: status === 'success',
        }
      )}>
      <div className={styles.statusText}>{statusText}</div>
      <div className={styles.statusBarContainer}>
        <div className={styles.statusBarOverlay} style={{width: `${width}%`}}></div>
      </div>
    </div>
  )
}