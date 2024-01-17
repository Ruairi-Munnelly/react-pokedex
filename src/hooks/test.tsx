import {useState, useEffect } from 'react';

export default function useFetch(url: string) {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null|object>(null);

  useEffect(() => {
    const getData = async (endpoint:string) => {
      try {
        let response = await fetch(endpoint);
        if (response.ok) {
          let json = response.json();
          setData(json);
          setLoading(false);
        } else {
          throw error;
        }
      } catch(e:any) {
        setError(e);
        setLoading(false);
    } 
  }
  getData(url);
},[url,error])

  return {data, loading, error}
}

