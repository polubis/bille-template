export const next = <S extends { stage: string }, St extends S['stage']>(
  state: S,
  stage: St,
  change?: (state: Extract<S, { stage: St }>) => void
) => {
  state.stage = stage;
  change && change(state as Extract<S, { stage: St }>);
};

export const doWhen = <S extends { stage: string }, St extends S['stage']>(
  state: S,
  stages: St[],
  change: (state: Extract<S, { stage: typeof stages[number] }>) => void
) => {
  if (!stages.includes(state.stage as St)) {
    throw new Error(
      `Invalid state change. Current: ${state.stage} but allowed ${stages.join(
        ','
      )}`
    );
  }

  change(state as Extract<S, { stage: typeof stages[number] }>);
};
