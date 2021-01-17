import styles from './NowPlayingDetails.module.css'

export default function NowPlayingDetails({title}) {
  return (
    <div className={styles.nowPlayingDetails}>
      <h2 className={styles.nowPlayingHeader}><b>original</b> de liteflix</h2>
      <h2 className={styles.nowPlayingTitle}>{title}</h2>
    </div>
  )
}