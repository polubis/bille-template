import { ReactElement } from "react";
import { SelectionDialogItemProps } from "../selection-dialog";

export interface SelectProps {
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  title: string;
  value: string;
  children:
    | ReactElement<SelectionDialogItemProps>
    | ReactElement<SelectionDialogItemProps>[];
}
