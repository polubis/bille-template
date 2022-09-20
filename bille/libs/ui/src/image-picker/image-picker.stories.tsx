import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { ImagePicker } from './image-picker';
import { ImagePickerProps } from './models';

export default {
  component: ImagePicker,
  title: 'ImagePicker',
} as Meta;

const Template: Story<ImagePickerProps> = (args) => {
  const [image, setImage] = useState<ImagePickerProps['image']>(null);

  return (
    <div style={{ margin: '16px' }}>
      <ImagePicker {...args} image={image} onChange={setImage} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: ({ imageURL, open, clean }) => (
    <>
      {imageURL ? (
        <div>
          <img src={imageURL} alt="Avatar" />
          <button onClick={clean}>Clean</button>
        </div>
      ) : (
        <div>First choose image</div>
      )}

      <button onClick={open}>Pick image</button>
    </>
  ),
};
