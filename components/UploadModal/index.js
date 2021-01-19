import { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames'
import Modal from 'react-modal';
import styles from './UploadModal.module.css'
import UploadStateBar from './UploadStateBar';
import FinishedState from './FinishedState';

export const STATES = {
  NOT_UPLOADED: 'not-uploaded',
  FINISHED: 'finished',
  ERROR: 'error',
  SUCCESS: 'success'
}

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

Modal.setAppElement('#upload-movie-modal')

export default function UploadModal({isOpen, onCloseModal}) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(SELECT_OPTIONS[0])
  const [poster, setPoster] = useState(null)
  const [uploadingState, setUploadingState] = useState(STATES.NOT_UPLOADED)

  function closeModal() {
    setTitle("")
    setCategory(SELECT_OPTIONS[0])
    setPoster(null)
    setUploadingState(STATES.NOT_UPLOADED)
    onCloseModal()
  }

  const isSubmitEnabled = useMemo(() => {
    return (uploadingState === 'success' && title.length && category.length )
  }, [uploadingState, title, category])
  
  const handleSubmit = useCallback(
    async (e) => {
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
        try {
          await fetch('/api/post-movie', {
            method: 'POST',
            body: JSON.stringify({
              title: title,
              category: category,
              filename
            }),
            headers: {
              'Content-Type': 'application/json'
            },
          })

          setUploadingState(STATES.FINISHED)
        } catch(e) {
          setUploadingState(STATES.ERROR)
        }
      } else {
        console.error('Upload failed.');
      }
    }
  , [title, category, poster])

  function handleFileUpload(e) {

    //JUST FOR FRONTEND DEMONSTRATION, WOULD NEVER DO THIS ON A REAL PROJECT
    function fakeDelay() {
      if(counter === 100) {
        setUploadingState(STATES.SUCCESS)
        clearInterval(intervalId)
      } else {
        counter++
        console.log(counter)
        setUploadingState(counter)
      }
    }

    e.preventDefault()
    setUploadingState(0)
    let counter = 0
    const intervalId = setInterval(fakeDelay, 50)
    const file = e.target.files[0];
    setPoster(file)
  }
  
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={
        {
          ...modalStyle,
          content: {
            ...modalStyle.content, 
            backgroundColor: uploadingState === STATES.FINISHED ? '#7ed321' : 'white'}
        }
      }
    >
      {
        uploadingState === STATES.FINISHED && (
          <FinishedState onClose={closeModal} title={title}/>
        )
      }
      {
        uploadingState !== STATES.FINISHED && (
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <input
              onChange={handleFileUpload}
              type="file"
              required
              id="file-input"
              className={styles.fileInput}
              accept="image/png, image/jpeg"
            />
            {
              uploadingState === STATES.NOT_UPLOADED
              ? (
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
              ) : 
              <UploadStateBar status={uploadingState}/>
            }
            <div className={styles.detailsContainer}>
              <label htmlFor="upload-movie-title">
                <span className={styles.inputLabel}>nombre de la pelicula</span>
                <input className={styles.modalInput} onChange={handleInputChange(setTitle)} required id="upload-movie-title" placeholder="title..."></input>
              </label>
              <label htmlFor="upload-movie-category">
                <span className={styles.inputLabel}>categoria</span>
                <select className={classNames(styles.modalInput, styles.selectInput)} onChange={handleInputChange(setCategory)} required id="upload-movie-category" placeholder="title...">
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
        )
      }
    </Modal>
  )
}