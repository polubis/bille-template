import { Button, useStepsProvider } from '@bille/ui';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  justify-content: flex-end;

  & > *:last-child {
    margin-left: 14px;
  }
`;

export interface FooterProps {
  disabled?: boolean;
  onSubmit?: () => void;
}

export const Footer = ({ disabled, onSubmit }: FooterProps) => {
  const { prev, next, isFirst, isLast } = useStepsProvider();

  return (
    <Container>
      {isFirst || (
        <Button
          motive="outlinedGray"
          data-cy="back-button"
          shape="rect"
          onClick={prev}
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
          next();
          onSubmit && onSubmit();
        }}
      >
        {isLast ? 'Submit' : 'Next'}
      </Button>
    </Container>
  );
};
