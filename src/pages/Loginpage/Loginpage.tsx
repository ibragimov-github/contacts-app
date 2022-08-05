import styles from './Loginpage.module.scss';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "store/slices/userSlice";
import { useDispatch } from 'react-redux'
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

interface ILoginpage { };

function Loginpage({ }: ILoginpage) {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const signin = (e: Event) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, login, password).then(({ user }) => {
      const userInfo = {
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      }
      dispatch(setUser(userInfo))
      nav('/');
    }).catch(()=> setOpen(true))
  }
  return (
    <div className={styles.container}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert 
          severity="error"
          onClose={handleCloseError}
        >data is incorrect</Alert>
      </Snackbar>
      <Typography
        variant='h4'
        component='span'
      >
        Login page
      </Typography>
      <form
        className={styles.form}
        onSubmit={signin}
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
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          type='password'
          className={styles.text}
          label="Password"
          variant="standard" />
        <Button
          variant="contained"
          color="primary"
          type='submit'
        >
          Login
        </Button>
      </form>
      <Button
        color="primary"
        onClick={() => nav('/signup')}
      >
        don't have an account? sign up
      </Button>
    </div>
  );
}

export default Loginpage;