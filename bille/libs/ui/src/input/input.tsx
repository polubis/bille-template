import styled, { css } from 'styled-components';
import { SmallTitleStyle } from '../typography/typography';
import { mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';
import { InputProps } from './models';

const IconWrapper = styled.div``;

const Container = styled.div<InputProps>`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  background-color: #f6f6f6;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 2px solid transparent;
  }

  input {
    z-index: 1;
    height: 100%;
    width: 100%;
    background: none;
    border-radius: 4px;
    border: none;
    padding: 0 16px;
    outline: none;
    ${SmallTitleStyle}

    &::placeholder {
      font-family: 'Billennium-Regular', sans-serif;
    }
  }

  ${IconWrapper} {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 48px;
    width: 56px;
    justify-content: center;
  }

  ${(props) => {
    if (props.invalid) {
      return css`
        &::after {
          border-color: #ff0000;
        }

        input {
          color: #ff0000;
          padding: 0 56px 0 16px;

          &::placeholder {
            color: #ff0000;
          }

          &:focus {
            outline-color: #ff0000;
          }
        }

        ${IconWrapper} {
          svg path {
            fill: #ff0000 !important;
          }
        }
      `;
    }

    if (props.disabled) {
      return css`
        &::after {
          border-color: #cbc0c0;
        }

        input {
          color: #cbc0c0;
          cursor: not-allowed;

          &::placeholder {
            color: #cbc0c0;
          }
        }
      `;
    }

    return css`
      &::after {
        border-color: #303030;
      }

      input {
        color: #303030;

        &:focus {
          outline-color: #303030;
        }

        &::placeholder {
          color: #303030;
        }
      }
    `;
  }}
`;

export const Input = ({ invalid, ...inputProps }: InputProps) => {
  return (
    <Container disabled={inputProps.disabled} invalid={invalid}>
      <input autoCorrect="off" autoComplete="off" {...inputProps} />
      {invalid && (
        <IconWrapper>
          <Icon path={mdiAlert} size={1} />
        </IconWrapper>
      )}
    </Container>
  );
};
