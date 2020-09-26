import React, { useContext } from 'react';

import Context from '@/presentation/contexts/form/form-context';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const getStatus = (): string => (error ? '🔴' : '✔');
  const getTitle = (): string => error || 'Tudo certo!';
  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        className={Styles.input}
        autoComplete="off"
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
      {/* <label data-testid={`${props.name}-label`} className={Styles.inputLabel}>
        {props.placeholder}
      </label> */}
    </div>
  );
};

export default Input;
