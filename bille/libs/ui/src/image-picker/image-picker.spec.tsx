/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import { ImagePicker } from './image-picker';

describe('<ImagePicker />', () => {
  it('renders content', () => {
    render(
      <ImagePicker image={null} onChange={() => {}}>
        {() => <div>Content</div>}
      </ImagePicker>
    );

    screen.getByText('Content');
  });
});
