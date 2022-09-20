import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';
import { ImagePickerPayload, ImagePickerProps } from './models';

const Input = styled.input`
  display: none;
`;

export const ImagePicker = ({
  image,
  children,
  onChange,
}: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const image = e.target.files ? e.target.files[0] : null;

    onChange(image);
  };

  const clean = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.value = '';
    onChange(null);
  };

  const open = (): void => {
    inputRef.current?.click();
  };

  const imageURL = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image]
  );

  const payload: ImagePickerPayload = {
    imageURL,
    image,
    open,
    clean,
  };

  return (
    <>
      {children(payload)}
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
};
