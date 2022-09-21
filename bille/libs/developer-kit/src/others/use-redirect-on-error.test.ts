import { renderHook, act } from '@testing-library/react';
import { useRedirectOnError } from './use-redirect-on-error';

const useNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => useNavigate,
}));

describe('useRedirectOnError()', () => {
  it('redirects when predicates truthy', () => {
    const hook = renderHook(() => useRedirectOnError());

    act(() => {
      const { when, codeIsEqualTo } = hook.result.current;

      when(codeIsEqualTo(200)).redirect({ code: 200 });
      when(codeIsEqualTo(200)).redirect({ code: 201 });
      when(codeIsEqualTo('OTHER_ERROR')).redirect({ code: 201 });
      when().redirect({ code: 201 });
    });

    expect(useNavigate).toHaveBeenCalledTimes(2);
  });
});
