import { useRef, useState } from 'react';
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
    marginBottom: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
    paddingLeft: '35px',
    paddingRight: '35px',
    color: '#9b9b9b',
    height: 'fit-content'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
}

export default function UploadModal({isOpen, onCloseModal}) {
  const titleRef = useRef()
  const categoryRef = useRef()
  const posterRef = useRef(null)
  const [uploadingState, setUploadingState] = useState("not-uploaded")
  
  async function handleSubmit(e) {
    e.preventDefault()
    const file = posterRef.current

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
    posterRef.current = file
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
            <span>o arrastrarlo y soltarlo aqui</span>
          </span>
        </label>
        <div className={styles.detailsContainer}>
          <label htmlFor="upload-movie-title">
            <span className={styles.inputLabel}>nombre de la pelicula</span>
            <input className={styles.modalInput} ref={titleRef} id="upload-movie-title" placeholder="title..."></input>
          </label>
          <label htmlFor="upload-movie-category">
            <span className={styles.inputLabel}>categoria</span>
            <select className={styles.modalInput} ref={categoryRef} id="upload-movie-category" placeholder="title...">
              {SELECT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>  
              ))}
            </select>
          </label>
        </div>
        <div className={styles.submitBtnContainer}>
          <button className={styles.submitBtn} type="submit">Subir Pelicula</button>
        </div>
      </form>
    </Modal>
  )
}