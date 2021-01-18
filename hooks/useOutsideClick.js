import {useEffect} from 'react';

function useOutsideClick(ref, outsideHandler) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target) && outsideHandler) {
      outsideHandler(event);
    }
  }

  useEffect(() => {
    window.document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

export default useOutsideClick;
