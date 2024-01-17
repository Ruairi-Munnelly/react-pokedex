import { useState, useEffect } from "react";

export default function useFetch(endpoint: string) {
  const [data, setData] = useState<object | object[]>({});
  const [error, setError] = useState<null | object>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async (endpoint: string) => {
      try {
        let response = await fetch(endpoint);
        if (response.ok) {
          let json = await response.json();
          setData(json);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          throw error;
        }
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };
    getData(endpoint)
  },[endpoint,error]);

  return { data, error, loading };
}
