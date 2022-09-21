import { mdiPlus, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Input } from '../input';

type DataItem = { id: string | number; name: string };

export interface ItemListProps<T extends DataItem> {
  data: T[];
  placeholder?: string;
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

const IconContainer = styled.div`
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
  placeholder = 'Add new item...',
  onChange,
  onDeleteItem,
  onItemAdd,
}: ItemListProps<T>) => {
  const [newItem, setNewItem] = useState<string>('');

  const addItem = (name: string, key?: string) => {
    if (!key || key === 'Enter') {
      if (name.length > 0) {
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
            data-cy="edit-item-input"
            value={item.name}
            onChange={(e) => changeItem(item, e.target.value)}
          />
          <IconContainer
            data-cy="delete-item-button"
            onClick={() => onDeleteItem(item.id)}
          >
            <Icon path={mdiTrashCanOutline} size={1.2} color="black" />
          </IconContainer>
        </Row>
      ))}

      <Row
        showIcon={newItem.length > 0}
        onKeyDown={(e) => addItem(newItem, e.key)}
      >
        <Input
          data-cy="add-item-input"
          value={newItem}
          placeholder={placeholder}
          onChange={(event) => {
            setNewItem(event.target.value);
          }}
        />
        {newItem.length ? (
          <IconContainer onClick={() => addItem(newItem)}>
            <Icon
              path={mdiPlus}
              size={1.2}
              color="black"
              data-cy="add-item-button"
            />
          </IconContainer>
        ) : null}
      </Row>
    </Container>
  );
};
