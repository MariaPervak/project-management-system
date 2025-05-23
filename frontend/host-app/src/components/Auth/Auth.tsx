import {useContext, useEffect, useState} from "react";
import { useMutation, gql } from '@apollo/client';
import Modal from "../common/Modal/Modal.tsx";
import Toast from "../common/Toast/Toast.tsx";
import {AuthContext} from "../../../context/AuthContext/AuthContext.tsx";
import {clearToken} from "./helpers.ts";
import {Button, Input} from "ui_components/components";

import './Auth.scss';
import {SIGN_IN, SIGN_UP} from "../../utils/gql";

type Action = 'register' | 'auth';

interface Form {
  userName: string;
  email?: string;
  password: string;
}

interface AuthProps {
  onRegister?: (form: Form) => void;
  onAuth?: (form: Form) => void;
}



const Auth = ({onRegister, onAuth}: AuthProps) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [form, setForm] = useState<Form>({} as Form);
  const [signUp, { error: signUpError }] = useMutation(SIGN_UP);
  const [signIn, { error: signInError }] = useMutation(SIGN_IN);
  const [error, setError] = useState<string | null>(null);

  const authData = useContext(AuthContext);

  useEffect(() => {
    if (signUpError?.message){
      setError(signUpError.message);
    }
    if (signInError?.message){
      setError(signInError.message);
    }
  }, [signUpError, signInError])

  const handleAction = (type: Action) => {
    handleClose(type);
  }

  const handleRegister = () => {
    signUp({variables: {username: form.userName, email: form.email, password: form.password}}).then(() => {
      if (onRegister) {
        onRegister(form);
      }
      handleAction('register');
    })
  }

  const handleAuth = () => {
    try {
      signIn({variables: {username: form.userName, password: form.password}}).then((data: any) => {
        if (data.data?.signIn){
          localStorage.setItem('token', data.data.signIn);
          if (onAuth) {
            onAuth(form);
          }
          window.location.reload();
        }
      })
    } finally {
      handleAction('auth');
    }
  }

  const handleLogout = () => {
    clearToken();
    window.location.reload();
  }

  const handleClose = (type: Action ) => {
    if (type === 'register') {
      setIsRegisterOpen(false);
    } else {
      setIsAuthOpen(false);
    }
    setForm({} as Form);
  }

  return (
    <>
      <div className="auth-container">
        {authData.role === 'guest' && (
          <>
            <Button onClick={() => setIsRegisterOpen(true)}>Зарегистрироваться</Button>
            <Button onClick={() => setIsAuthOpen(true)}>Авторизоваться</Button>
          </>
        )}
        {authData.role !== 'guest' && (
          <Button onClick={handleLogout}>Выйти</Button>
        )}
      </div>
      <Modal
        isOpen={isRegisterOpen}
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onAction={handleRegister}
        onClose={() => handleClose('register')}
      >
        <Input
          type="text"
          name="userName"
          placeholder="Имя"
          onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
        />
      </Modal>
      <Modal
        isOpen={isAuthOpen}
        title="Авторизация"
        buttonText="Авторизоваться"
        onAction={handleAuth}
        onClose={() => handleClose('auth')}
      >
        <Input
          type="text"
          name="userName"
          placeholder="Имя"
          onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
        />
      </Modal>
      {error && (
        <Toast message={error} key={error} onClose={() => setError(null)}/>
      )}
    </>
  );
};

export default Auth;