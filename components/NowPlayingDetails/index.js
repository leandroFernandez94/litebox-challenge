import styles from './NowPlayingDetails.module.css'

export default function NowPlayingDetails({title}) {
  return (
    <div className={styles.nowPlayingDetails}>
      <h2 className="now-playing-header">original de liteflix</h2>
      <h2 className="now-playing-title">{title}</h2>
    </div>
  )
}