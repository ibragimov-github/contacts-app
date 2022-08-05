import styles from './App.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "../Header/Header";
import Homepage from '../../pages/Homepage/Homepage';
import Loginpage from '../../pages/Loginpage/Loginpage';
import Signuppage from '../../pages/Signuppage/Signuppage';

export interface IAppProps {
}

export function App({ }: IAppProps) {
  return (
    <div className={styles.container}>
      <CssBaseline />
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<Signuppage/>}/>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}
