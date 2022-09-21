import {
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  SelectionDialog,
  SelectionDialogItem,
  SelectionDialogItemProps,
} from '../selection-dialog';
import { SmallTitleStyle } from '../typography/typography';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiLoading } from '@mdi/js';
import { SelectProps } from './models';

const leftToRight = keyframes`
  0% {
    transform: translateX(-60px) rotate(60deg);
  } 100% {
    transform: translateX(260px) rotate(60deg);
  }
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  align-self: center;
`;

const Wrapper = styled.div<{ disabled?: boolean; 'data-loading'?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 300ms;
  background-color: #f6f6f6;

  border-bottom: 2px solid
    ${(props) => (props.disabled ? '#EBEBEB' : '#323232')};

  ${(props) =>
    props['data-loading']
      ? css`
          &::before {
            content: '';
            position: absolute;
            height: 60px;
            width: 50px;
            border-radius: 50%;
            background-color: #ffffffca;
            filter: blur(0.5rem);
            will-change: transform;
            animation: ${leftToRight} 2s infinite;
          }
        `
      : ''}
`;

const Input = styled.input`
  ${SmallTitleStyle};
  width: 100%;
  border: none;
  background: transparent;
  font-family: 'Billennium-Regular', sans-serif;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export interface SelectItemProps extends SelectionDialogItemProps {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

export const SelectItem = SelectionDialogItem;

export const Select = ({
  disabled,
  loading,
  placeholder,
  title,
  value,
  children,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const enhancedChildren = Children.map(children, (child, idx) => {
    if (!isValidElement<SelectItemProps>(child)) {
      return null;
    }

    const element: ReactElement<SelectItemProps> = child;

    return cloneElement(element, {
      ...child.props,
      onClick: (e: MouseEvent<HTMLElement>) => {
        element.props.onClick && element.props.onClick(e);
        setOpen(false);
      },
    });
  });

  const handleOpen = () => {
    if (!loading && !disabled) setOpen(true);
  };

  return (
    <Container>
      <Wrapper
        onClick={handleOpen}
        disabled={disabled}
        data-loading={!!loading}
      >
        <Input
          data-cy="select-input"
          placeholder={placeholder}
          readOnly
          value={value}
          disabled={disabled}
        />
        {loading ? (
          <Icon
            path={mdiLoading}
            spin
            size={1}
            color={open ? 'black' : '#b4b4b4'}
          />
        ) : (
          <Icon
            path={mdiChevronDown}
            size={1}
            color={disabled ? '#b4b4b4' : 'black'}
          />
        )}
      </Wrapper>
      {open && (
        <SelectionDialog title={title} onClose={() => setOpen(false)}>
          {enhancedChildren}
        </SelectionDialog>
      )}
    </Container>
  );
};
