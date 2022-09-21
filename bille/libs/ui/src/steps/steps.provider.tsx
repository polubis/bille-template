/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface StepsContext {
  step: number;
  isLast: boolean;
  isFirst: boolean;
  prev: () => void;
  next: () => void;
}

interface StepsProviderProps {
  children: ReactNode;
  maxStep: number;
}

const Context = createContext<StepsContext | undefined>(undefined);

export const StepsProvider = ({ children, maxStep }: StepsProviderProps) => {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((step) => {
      const nextStep = step + 1;
      return nextStep > maxStep ? maxStep : nextStep;
    });
  };

  const prev = () => {
    setStep((step) => {
      const prevStep = step - 1;
      return prevStep < 0 ? 0 : prevStep;
    });
  };

  const value: StepsContext = useMemo(
    () => ({
      step: step,
      isLast: step === maxStep,
      isFirst: step === 0,
      prev,
      next,
    }),
    [step, maxStep]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStepsProvider = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error('Missing StepsProvider.');
  }

  return ctx;
};
