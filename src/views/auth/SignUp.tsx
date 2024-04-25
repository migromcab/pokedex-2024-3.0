import { Button } from '../../components/button/Button';
import { Dialog, CloseDialogButton } from '../../components/dialog';

import './sign-up.scss';

interface SignUpProps {
  isOpen: boolean;
  close: () => void;
}

export const SignUp = ({ isOpen, close }: SignUpProps) => {
  return (
    <Dialog show={isOpen} size="xs" className="sign-up-dialog" onOverlayClick={close}>
      <div className="sign-up">
        <CloseDialogButton onClick={close} />
        <h2 className="font-bold text-lg">Sign Up</h2>
        <div>
          <label className="block mb-3">Nombre de usuario</label>
          <input name="username" />
        </div>
        <div>
          <label className="block mb-3">Contraseña</label>
          <input name="password" type="password" />
        </div>
        <div className="text-right ">
          <Button type="submit">Sign up</Button>
        </div>
      </div>
    </Dialog>
  );
};
