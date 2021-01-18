import { useMemo, useRef, useState } from 'react';
import classNames from 'classnames'
import Modal from 'react-modal';
import styles from './UploadModal.module.css'

const SELECT_OPTIONS = [
  'Accion',
  'Animacion',
  'Aventuras',
  'Terror',
  'Suspenso',
  'Ciencia Ficcion',
  'Comedia',
  'Documentales'
]

Modal.setAppElement('#upload-movie-modal')

const modalStyle = {
  content: {
    borderRadius: '10px',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
    paddingLeft: '35px',
    paddingRight: '35px',
    color: '#9b9b9b',
    height: 'fit-content',
    maxWidth: '700px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1'
  }
}

function handleInputChange(seter) {
  return (e) => {
    seter(e.target.value)
  }
}

export default function UploadModal({isOpen, onCloseModal}) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(SELECT_OPTIONS[0])
  const [poster, setPoster] = useState(null)
  const [uploadingState, setUploadingState] = useState("not-uploaded")


  const isSubmitEnabled = useMemo(() => {
    return (poster && title.length && category.length )
  }, [poster, title, category])
  
  async function handleSubmit(e) {
    e.preventDefault()
    const file = poster

    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/get-presigned-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      const uploadDBDocument = await fetch('/api/post-movie', {
        method: 'POST',
        body: JSON.stringify({
          title: titleRef.current.value,
          category: categoryRef.current.value,
          filename
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      setUploadingState('success')
    } else {
      setUploadingState('failed')
      console.error('Upload failed.');
    }
  }

  function handleFileUpload(e) {
    e.preventDefault()
    const file = e.target.files[0];
    setPoster(file)
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={modalStyle}>
      <form className={styles.modalForm} onSubmit={handleSubmit}>
        <input
          onChange={handleFileUpload}
          type="file"
          required
          id="file-input"
          className={styles.fileInput}
          accept="image/png, image/jpeg"
        />
        <label
          htmlFor="file-input"
          className={styles.fileInputLabel}
          id="file-input-label">
          <span className={styles.clipContainer}>
            <img src="/clip.svg" className={styles.clip}></img>
            <span className={styles.highlightedText}>Agregar archivo </span>
            <span className={styles.text}>o arrastrarlo y soltarlo aqui</span>
          </span>
        </label>
        <div className={styles.detailsContainer}>
          <label htmlFor="upload-movie-title">
            <span className={styles.inputLabel}>nombre de la pelicula</span>
            <input className={styles.modalInput} onChange={handleInputChange(setTitle)} required id="upload-movie-title" placeholder="title..."></input>
          </label>
          <label htmlFor="upload-movie-category">
            <span className={styles.inputLabel}>categoria</span>
            <select className={styles.modalInput} onChange={handleInputChange(setCategory)} required id="upload-movie-category" placeholder="title...">
              {SELECT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>  
              ))}
            </select>
          </label>
        </div>
        <div className={styles.submitBtnContainer}>
          <button 
            className={classNames(styles.submitBtn, isSubmitEnabled && styles.submitBtnEnabled)} 
            type="submit">
              Subir Pelicula
          </button>
        </div>
      </form>
    </Modal>
  )
}