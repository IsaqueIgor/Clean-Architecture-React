/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, memo, useRef } from 'react';

import Context from '@/presentation/contexts/form/form-context';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();
  const error = state[`${props.name}Error`];

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        id={`${props.name}-input`}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        className={Styles.input}
        autoComplete="off"
        onChange={(e) => {
          setState({ ...state, [e.target.name]: e.target.value });
        }}
      />
      <label
        htmlFor={`${props.name}-input`}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}
      >
        {error ? '🔴' : '✔'}
      </span>
    </div>
  );
};

export default memo(Input);
