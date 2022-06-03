import { useState, useCallback } from 'react';
import { AxiosError, AxiosPromise } from 'axios';

type PromiseCreator<R> = (...params: any[]) => AxiosPromise<R>;

type UseRequestReturnType<R> = [(...args: any[]) => void, boolean, R | null, AxiosError | null, () => void];

export default function useRequest<R = any>(promiseCreator: PromiseCreator<R>): UseRequestReturnType<R> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const onRequest = useCallback(async (...params: any[]) => {
    try {
      setLoading(true);
      const response = await promiseCreator(...params);
      setData(response.data);
    } catch (e) {
      setError(e as AxiosError);
      throw e;
    }
    setLoading(false);
  }, []);

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return [onRequest, loading, data, error, onReset];
}
