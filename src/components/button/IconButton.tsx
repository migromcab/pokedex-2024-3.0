import { ReactNode } from 'react';
import { Button, ButtonProps, ButtonSizes } from './Button';
import classNames from 'classnames';

interface IconBonitoProps {
  muyBello: boolean;
}

interface IconButtonProps extends IconBonitoProps, Omit<ButtonProps, 'block' | 'loading' | 'onClick'> {
  icon: ReactNode;
  size: ButtonSizes;
}

interface IconButtonProps extends IconBonitoProps, Pick<ButtonProps, 'block' | 'loading' | 'onClick'> {
  icon: ReactNode;
  size: 'sm' | 'md' | 'lg';
}

export const IconButton = ({ icon, muyBello, className = '', children, ...rest }: IconButtonProps) => {
  const classes = classNames({
    'btn--icon': true,
    'btn--muy-bello': muyBello,
    [className]: className
  });
  return (
    <Button className={classes} {...rest} size="sm">
      <span className="mr-2">{icon}</span>
      {children}
    </Button>
  );
};

const T = () => {
  return <IconButton icon={<>esto es un icono</>}>;
};
