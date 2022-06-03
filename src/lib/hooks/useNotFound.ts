import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from '../../store';
import { resetError, showNotFoundError } from '../../store/features/errorSlice';

export default function useNotFound() {
  const dispatch = useAppDispatch();

  const isNotFound = useSelector((state: RootState) => state.error.errorType === 'NOT_FOUND');

  const showNotFound = useCallback(() => dispatch(showNotFoundError()), [dispatch]);

  const reset = useCallback(() => dispatch(resetError), [dispatch]);

  return { showNotFound, reset, isNotFound };
}
