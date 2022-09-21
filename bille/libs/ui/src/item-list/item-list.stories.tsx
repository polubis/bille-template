import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { ItemList } from './item-list';
import { ItemListProps } from './item-list';

export default {
  component: ItemList,
  title: 'ItemList',
} as Meta;

interface Item {
  id: string;
  name: string;
  count: number;
}

const Template: Story<ItemListProps<Item>> = (args) => {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'First',
      count: 0,
    },
    {
      id: '2',
      name: 'Second',
      count: 0,
    },
    {
      id: '3',
      name: 'Last',
      count: 0,
    },
  ]);

  return (
    <ItemList<Item>
      {...args}
      data={items}
      onItemAdd={(name) => {
        setItems((prevItems) => [
          ...prevItems,
          { id: new Date().toString(), name, count: 0 },
        ]);
      }}
      onChange={(item) => {
        setItems((prevItems) =>
          prevItems.map((currItem) =>
            currItem.id === item.id ? { ...currItem, ...item } : currItem
          )
        );
      }}
      onDeleteItem={(id) =>
        setItems((prevItems) =>
          prevItems.filter((currItem) => currItem.id !== id)
        )
      }
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {};
