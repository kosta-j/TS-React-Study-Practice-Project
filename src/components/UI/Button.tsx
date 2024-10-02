import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type BasePropsType = {
  children: ReactNode;
  textOnly: string;
};

type ButtonPropsType = ComponentPropsWithoutRef<'button'> &
  BasePropsType & { to?: never };

type ButtonLinkPropsType = LinkProps & BasePropsType & { textOnly: string };

function isLinkProps(
  props: ButtonPropsType | ButtonLinkPropsType
): props is ButtonLinkPropsType {
  return 'to' in props;
}

export default function Button(props: ButtonPropsType | ButtonLinkPropsType) {
  if (isLinkProps(props)) {
    const { children, textOnly, ...restProps } = props;
    return (
      <Link
        className={`button ${textOnly ? 'button--text-only' : ''}`}
        {...restProps}
      ></Link>
    );
  }
  const { children, textOnly, ...restProps } = props;
  return (
    <button
      className={`button ${textOnly ? 'button--text-only' : ''}`}
      {...restProps}
    ></button>
  );
}
