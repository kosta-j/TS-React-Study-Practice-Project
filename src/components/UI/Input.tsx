import { ComponentPropsWithoutRef } from 'react';

type InputPropsType = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input(props: InputPropsType) {
  const { label, id, ...restProps } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...restProps} />
    </div>
  );
}
