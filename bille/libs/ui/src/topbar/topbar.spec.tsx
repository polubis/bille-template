import { render, screen } from '@testing-library/react';

import { Topbar } from './topbar';

describe('<Topbar>', () => {
  const SRC =
    'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=391';

  it('renders topbar content', () => {
    render(<Topbar title="Title" src={SRC} text="Text" />);

    screen.getByText('Title');
    screen.getByAltText('Text');
  });
});
