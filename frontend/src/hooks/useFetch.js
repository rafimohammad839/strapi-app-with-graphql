import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          setData(json.data)
        } else if (json.error) {
          setError(json.error);
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
    
  }, [url]);

  return { data, error, loading };
}

export default useFetch;