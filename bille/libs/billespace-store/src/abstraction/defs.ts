import { PayloadAction as ToolkitPayloadAction } from '@reduxjs/toolkit';

export type Action<
  P = void,
  T extends string = string,
  M = never,
  E = never
> = ToolkitPayloadAction<P, T, M, E>;

export type State<
  S extends string,
  D extends Record<string, unknown> | undefined = undefined
> = D extends undefined
  ? {
      stage: S;
    }
  : D & { stage: S };
