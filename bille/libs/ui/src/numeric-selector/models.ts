import { ReactElement } from "react";

export interface NumericSelectorItemProps {
  active?: boolean;
}

export interface NumericSelectorProps {
  title: string;
  children: ReactElement<NumericSelectorItemProps>[];
}
