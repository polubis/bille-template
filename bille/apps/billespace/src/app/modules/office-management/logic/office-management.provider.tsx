import { createContext, useContext, ReactNode } from 'react';
import { useOfficeManagement } from './use-office-management';

interface OfficeManagementProviderProps {
  children: ReactNode;
}

const Context = createContext<
  ReturnType<typeof useOfficeManagement> | undefined
>(undefined);

export const OfficeManagementProvider = ({
  children,
}: OfficeManagementProviderProps) => {
  const value = useOfficeManagement();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useOfficeManagementContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error('Lack of provider');
  }

  return ctx;
};

export const useOfficeManagementState = () => {
  const { state } = useOfficeManagementContext();

  return state;
};

export const useSafeOfficeManagementState = () => {
  const ctx = useOfficeManagementContext();

  if (ctx.state.stage === 'CREATION' || ctx.state.stage === 'EDITION') {
    return ctx.state;
  }

  throw new Error('You are using unsafe state!');
};

export const useOfficeManagementAction = () => {
  const { state, ...actions } = useOfficeManagementContext();

  return actions;
};
