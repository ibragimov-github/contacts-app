import styles from './Signuppage.module.scss';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "store/slices/userSlice";
import { useDispatch } from 'react-redux'
import { getDatabase, ref, set } from "firebase/database";


interface ISignuppage { }

function Signuppage({ }: ISignuppage) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signUp = (e: Event) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, login, password).then(({ user }) => {
      const userInfo = {
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      }
      dispatch(setUser(userInfo))
      const db = getDatabase();
      set(ref(db, 'users/' + user.uid), {
        email: user.email,
      }).then((e) => console.log(e))
      nav('/');
    })
  }
  return (
    <div className={styles.container}>
      <Typography
        variant='h4'
        component='span'
      >
        Sign up page
      </Typography>
      <form
        className={styles.form}
        onSubmit={signUp}
      >
        <TextField
          autoComplete='true'
          value={login}
          onChange={(e) => { setLogin(e.target.value) }}
          type='email'
          className={styles.text}
          label="Email"
          variant="standard" />
        <TextField
          autoComplete='true'
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
          type='password'
          className={styles.text}
          label="Password"
          variant="standard" />
        <Button
          type='submit'
          variant="contained"
          color="primary"
        >
          sign up
        </Button>
      </form>
      <Button
        color="primary"
        onClick={() => navigate('/login')}
      >
        registered? login
      </Button>
    </div>
  );
}

export default Signuppage;