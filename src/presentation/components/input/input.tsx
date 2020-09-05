import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const value = useContext(Context);
  const error = value[`${props.name}Error`];
  return (
    <div className={Styles.inputWrap}>
      <input {...props} className={Styles.input} autoComplete='off' />
      <label data-testid={`${props.name}-label`} className={Styles.inputLabel}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
