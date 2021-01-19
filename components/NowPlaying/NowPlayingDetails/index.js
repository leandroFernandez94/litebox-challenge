import { Fragment } from 'react'
import useMobileMedia from '../../../hooks/useMobileMedia'
import styles from './NowPlayingDetails.module.css'

function NowPlayingOptions({text, withPlay, withPlus}) {
  return (
    <div className={styles.nowPlayingOptionsOverlay}>
      <div className={styles.nowPlayingOptionsContainer}>
        {withPlay && <img src="/triangle.svg"></img>}
        {withPlus && <div className={styles.plusIcon}/>}
        <span className={styles.nowPlayingOptionsText}>{text}</span>
      </div>
    </div>
  )
}

export default function NowPlayingDetails({title, description}) {
  const isMobile = useMobileMedia()
  const isTablet = useMobileMedia('(max-width: 1024px)')

  return (
    <div className={styles.nowPlayingDetails}>
      <span className={styles.nowPlayingHeader}>original de <b>liteflix</b></span>
      <span className={styles.nowPlayingTitle}>{title}</span>
      {
        isMobile
        ? (
          <div className={styles.optionsContainer}>
            <NowPlayingOptions text="Reproducir" withPlay/>
            <div className={styles.imgContainer}>
              <img styles={styles.addListImg} src="/add-list.svg"></img>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className={styles.optionsContainer}>
              <NowPlayingOptions text="Reproducir" withPlay/>
              <NowPlayingOptions text="Mi Lista" withPlus/>
              
            </div>
            <div>
              <span className={styles.season}>Ver Temporada 1</span>
            </div>
            <div>
              <span className={styles.description}>
                {description}
              </span>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}