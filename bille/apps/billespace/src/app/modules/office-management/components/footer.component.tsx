import { Button } from '@bille/ui';
import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;

  & > *:last-child {
    margin-left: 14px;
  }
`;

export interface FooterComponentProps {
  disabled?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit?: () => void;
}

export const FooterComponent = ({
  disabled,
  isFirst,
  isLast,
  onNext,
  onPrev,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit = () => {},
}: FooterComponentProps) => {
  return (
    <Footer>
      {isFirst || (
        <Button
          motive="outlinedGray"
          data-cy="back-button"
          shape="rect"
          onClick={onPrev}
        >
          Back
        </Button>
      )}

      <Button
        motive="gray"
        shape="rect"
        data-cy="confirm-button"
        disabled={disabled}
        onClick={() => {
          onNext();
          onSubmit();
        }}
      >
        {isLast ? 'Submit' : 'Next'}
      </Button>
    </Footer>
  );
};
