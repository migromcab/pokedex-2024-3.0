import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './dialog.scss';
import classNames from 'classnames';

interface DialogProps {
  show?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  size: 'xs' | 'sm' | 'md';
  onOverlayClick?: () => void;
}

export const Dialog = ({
  className = '',
  onOverlayClick,
  contentClassName = '',
  size = 'md',
  children,
  show
}: DialogProps) => {
  if (!show) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={classNames({
          dialog: true,
          [className]: className
        })}
      >
        <div className="dialog-overlay" onClick={onOverlayClick} />
        <div
          className={classNames({
            dialog__content: true,
            [`dialog__content--${size}`]: size,
            [contentClassName]: contentClassName
          })}
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};
