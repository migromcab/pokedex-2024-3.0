import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './buttons.scss';

export type ButtonSizes = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes;
  color?: 'primary' | 'secondary' | 'warning';
  variant?: 'outlined' | 'ghost' | 'filled';
  block?: boolean;
  loading?: boolean;
}

export const Button = ({
  className = '',
  loading,
  disabled,
  size = 'md',
  color,
  block,
  variant = 'outlined',
  children,
  ...rest
}: ButtonProps) => {
  const classes = classNames({
    btn: true,
    [className]: className,
    'btn--block': block,
    'btn--disabled': disabled,
    'btn--loading': loading,
    [`btn--${size}`]: size,
    [`btn--${color}`]: color,
    [`btn--${variant}`]: variant
  });

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
