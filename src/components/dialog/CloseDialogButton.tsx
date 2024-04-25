import classNames from 'classnames';
import './dialog.scss';

interface CloseDialogButtonProps {
  className?: string;
  onClick: () => void;
}

export const CloseDialogButton = ({ className = '', onClick }: CloseDialogButtonProps) => {
  return (
    <button className={classNames({ dialog__close: true, [className]: className })}>
      <i className="fa fa-x" />
    </button>
  );
};
