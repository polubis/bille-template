import { useNavigate } from 'react-router-dom';

type Code = string | number;

type Predicate = (error: unknown) => boolean;

interface DescribedError {
  code: Code;
}

const isDescribedError = (
  error: unknown | DescribedError
): error is DescribedError => (error as DescribedError)?.code !== undefined;

const getCode = (error: unknown): Code => {
  if (!isDescribedError(error)) {
    return 'UNKNOWN_ERROR';
  }

  return error.code;
};

const codeIsEqualTo =
  (...codes: Code[]) =>
  (error: unknown) => {
    const extractedCode = getCode(error);
    return codes.some((code) => code === extractedCode);
  };

export const useRedirectOnError = () => {
  const navigate = useNavigate();

  const when = (...predicates: Predicate[]) => {
    return {
      redirect: (error: unknown) => {
        const allValid = (predicates ?? []).every((predicate) =>
          predicate(error)
        );
        allValid && navigate(`/error?code=${getCode(error)}`);
      },
    };
  };

  return { when, codeIsEqualTo };
};
