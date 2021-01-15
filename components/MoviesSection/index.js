import styles from './MoviesSection.module.css'

export default function MoviesSection({name}) {
  return (
    <div className={styles.appSectionContainer}>
      <div className={styles.appSectionTitle}>{name}</div>
      <div className={styles.sectionItems}>
        <div className={styles.movieItemContainer}><h2>movie</h2></div>
        <div className={styles.movieItemContainer}><h2>movie</h2></div>
        <div className={styles.movieItemContainer}><h2>movie</h2></div>
        <div className={styles.movieItemContainer}><h2>movie</h2></div>
      </div>
    </div>
  )
}