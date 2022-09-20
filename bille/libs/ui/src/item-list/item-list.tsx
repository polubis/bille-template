import { mdiPlus, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Input } from '../input';

type DataItem = { id: string | number; name: string };

export interface ItemListProps<T extends DataItem> {
  data: T[];
  placeholder?: string;
  invalid?: boolean;
  onChange: (item: T) => void;
  onDeleteItem: (id: T['id']) => void;
  onItemAdd: (name: string) => void;
}

const appear = keyframes`
  0% {
    transform: scale(0);
  } 100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
`;

const Row = styled.div<{
  invalid?: boolean;
  item?: boolean;
  showIcon: boolean;
}>`
  display: grid;
  grid-template-columns: ${(props) => (props.showIcon ? '1fr 60px' : '1fr')};
  align-items: center;
  gap: 20px;
  overflow: hidden;
  border-bottom: 2px solid #303030;
  background-color: #f6f6f6;

  & > div::after {
    border: none;
  }

  & input {
    & :focus {
      outline: none;
    }
  }

  ${(props) =>
    props.item &&
    css`
      animation: ${appear} 0.2s forwards;
    `}
`;

const IconContainer = styled.div<{ invalid?: boolean; type: 'delete' | 'add' }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${appear} 0.1s forwards;

  svg {
    transition: 0.1s;
  }

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

export const ItemList = <T extends DataItem>({
  data,
  invalid,
  placeholder = 'Add new item...',
  onChange,
  onDeleteItem,
  onItemAdd,
}: ItemListProps<T>) => {
  const [newItem, setNewItem] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const addItem = (name: string, key?: string) => {
    if (!key || key === 'Enter') {
      if (name.length > 0) {
        setError(false);
        setNewItem('');
        onItemAdd(name);
      }
    }
  };

  const changeItem = (item: T, name: string) => {
    onChange({ ...item, name });
  };

  return (
    <Container>
      {data.map((item) => (
        <Row item key={item.id} showIcon>
          <Input
            value={item.name}
            onChange={(e) => changeItem(item, e.target.value)}
          />
          <IconContainer type="delete" onClick={() => onDeleteItem(item.id)}>
            <Icon path={mdiTrashCanOutline} size={1.2} color="black" />
          </IconContainer>
        </Row>
      ))}

      <Row
        invalid={error}
        showIcon={newItem.length > 0}
        onKeyDown={(e) => addItem(newItem, e.key)}
      >
        <Input
          value={newItem}
          placeholder={placeholder}
          invalid={error}
          onChange={(event) => {
            setNewItem(event.target.value);
          }}
        />
        {newItem.length ? (
          <IconContainer
            invalid={newItem.length ? error : invalid}
            type="add"
            onClick={() => addItem(newItem)}
          >
            <Icon path={mdiPlus} size={1.2} color="black" />
          </IconContainer>
        ) : null}
      </Row>
    </Container>
  );
};
