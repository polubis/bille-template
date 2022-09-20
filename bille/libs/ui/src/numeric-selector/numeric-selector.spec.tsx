import { render, screen } from '@testing-library/react';
import { NumericSelector, NumericSelectorItem } from './numeric-selector';

describe('<Number>', () => {
  it('displays title', () => {
    render(<NumericSelector title="A">{[]}</NumericSelector>);

    screen.getByText('A');
  });

  it('displays items', () => {
    render(
      <NumericSelector title="A">
        <NumericSelectorItem>0</NumericSelectorItem>
        <NumericSelectorItem>1</NumericSelectorItem>
        <NumericSelectorItem>2</NumericSelectorItem>
      </NumericSelector>
    );

    screen.getByText('0');
    screen.getByText('1');
    screen.getByText('2');
  });
});
