import { Button, useStepsProvider } from '@bille/ui';
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
  onSubmit?: () => void;
}

export const FooterComponent = ({
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit = () => {},
}: FooterComponentProps) => {
  const { prev, next, isFirst, isLast } = useStepsProvider();

  return (
    <Footer>
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
          onSubmit();
        }}
      >
        {isLast ? 'Submit' : 'Next'}
      </Button>
    </Footer>
  );
};
