import { prepare, useDispatch } from '@bille/billespace-store';
import { useEffect } from 'react';
import { useOfficeId } from './use-office-id';

export const useManagementPrepare = () => {
  const officeId = useOfficeId();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(prepare(officeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [officeId]);
};
