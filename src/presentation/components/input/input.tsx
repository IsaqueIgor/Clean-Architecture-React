import React from 'react';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} className={Styles.input} />
      <label data-testid={`${props.name}-label`} className={Styles.inputLabel}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
