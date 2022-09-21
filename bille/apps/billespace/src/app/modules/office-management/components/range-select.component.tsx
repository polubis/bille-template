import { Range } from '@bille/ui';
import styled from 'styled-components';
import { mdiRestore } from '@mdi/js';
import Icon from '@mdi/react';

export interface RangeSelectItem {
  id: string;
  name: string;
  count: number;
}

export interface RangeSelectComponentProps {
  items: RangeSelectItem[];
  min: number;
  max: number;
  onChange: (item: RangeSelectItem) => void;
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px;
  align-items: flex-end;
  padding-right: 10px;
  gap: 20px;
`;

const ResetIcon = styled.div`
  cursor: pointer;
`;

export const RangeSelectComponent = ({
  items,
  min,
  max,
  onChange,
}: RangeSelectComponentProps) => {
  return (
    <>
      {items.map((item) => (
        <Row key={item.id}>
          <Range
            title={item.name}
            min={min}
            max={max}
            value={item.count}
            onChange={(e) =>
              onChange({
                ...item,
                count: +e.target.value,
              })
            }
          />
          <ResetIcon
            data-cy="range-reset-button"
            onClick={() =>
              onChange({
                ...item,
                count: min,
              })
            }
          >
            <Icon path={mdiRestore} size={1.5} color="black" />
          </ResetIcon>
        </Row>
      ))}
    </>
  );
};
