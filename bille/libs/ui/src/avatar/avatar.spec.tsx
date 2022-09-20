import { render, screen } from '@testing-library/react';

import { Avatar } from './avatar';
import { AvatarProps } from './models';

describe('<Avatar>', () => {
  const LETTER = 'A';

  const PROPS: AvatarProps = {
    src: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391',
    text: 'Example text...',
  };

  it('assigns alt attribute', () => {
    render(<Avatar {...PROPS} />);
    screen.getByAltText(PROPS.text);
  });

  it('assigns title attribute', () => {
    render(<Avatar {...PROPS} />);
    screen.getByTitle(PROPS.text);
  });

  it('displays letter instead of an image', () => {
    render(<Avatar {...PROPS} letter={LETTER} />);
    screen.getByText(LETTER);
  });
});
