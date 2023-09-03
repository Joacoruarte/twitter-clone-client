import s from './index.module.scss';
import ConnectWithProvider from '@/components/IndexPage/ConnectWithProvider';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import OrOption from '@/components/IndexPage/OrOption';

export default function IdentifyUser() {
  return (
    <>
      <div className={s.login_form__providers}>
        <ConnectWithProvider
          text='Iniciar sesión'
          icon={<FcGoogle />}
          provider='Apple'
        />
        <ConnectWithProvider
          text='Iniciar sesión'
          icon={<AiFillApple />}
          provider='Google'
        />
      </div>
      <OrOption />
    </>
  );
}
