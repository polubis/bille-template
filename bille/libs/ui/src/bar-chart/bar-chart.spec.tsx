import { render, screen } from '@testing-library/react';
import { BarChart } from './bar-chart';

describe('<BarChart>', () => {
  it('displays correct percentages', () => {
    render(<BarChart data={[5, 10]} />);

    screen.getByText('50%');
  });
});
