import { ReactNode } from 'react';

export interface ImagePickerPayload {
  imageURL: string | null;
  image: File | null;
  open: () => void;
  clean: () => void;
}

export interface ImagePickerProps {
  image: ImagePickerPayload['image'];
  children: (payload: ImagePickerPayload) => ReactNode;
  onChange: (file: ImagePickerPayload['image']) => void;
}
