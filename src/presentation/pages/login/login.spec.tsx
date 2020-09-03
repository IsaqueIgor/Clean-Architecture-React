import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Component', () => {
  test('Should not render Spinner and Error on start', () => {
    const { getByTestId } = render(<Login />);
    const erroWrap = getByTestId('error-wrap');
    expect(erroWrap.childElementCount).toBe(0);
  });
});
