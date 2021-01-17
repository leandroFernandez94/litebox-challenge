import {useState, useEffect} from 'react';

export default function useMedia(query) {
  const [matches, setMatches] = useState();

  useEffect(() => setMatches(window.matchMedia(query).matches), [])

  useEffect(
    function setupMediaListener() {
      const media = window.matchMedia(query);

      function listener(listenerMedia) {
        setMatches(listenerMedia.matches);
      }

      media.addEventListener("change", listener);

      return function cleanupMediaListener() {
        media.removeEventListener("change", listener);
      };
    },
    [query]
  );

  return matches;
}
