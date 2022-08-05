import { useAuth } from "hooks/useauth";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styles from './Homepage.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth, User } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

interface IHomepage { }

function Homepage({ }: IHomepage) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [save, setSave] = useState(true);
  const [contacts, setContacts] = useState([]);
  const db = getDatabase()
  const pushData = () => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user.uid}/database`)).then(snapshot => {
      if (snapshot.exists()) {
        set(ref(db, 'users/' + user.uid + '/database'), [
          ...snapshot.val(),
          {
            id: uuidv4(),
            firstName,
            lastName,
            phoneNumber
          }
        ]).then(() => handleClose())
      }
      else {
        set(ref(db, 'users/' + user.uid + '/database'), [
          {
            id: uuidv4(),
            firstName,
            lastName,
            phoneNumber
          }
        ]).then(() => handleClose())
      }
    })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (firstName.trim().length && lastName.trim().length && phoneNumber.trim().length) { setSave(false) }
    else { setSave(true) }
  }, [firstName, lastName, phoneNumber])
  const handleClose = () => {
    setOpen(false);
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
  };
  const style: Object = {
    right: 20,
    bottom: 20,
    position: 'fixed'
  }
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) { navigate('/login') }
  }, [])
  return (
    <div className={styles.container}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {'Add new contact'}
        </DialogTitle>
        <DialogContent className={styles['dialog-content']}>
          <TextField
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value) }}
            label="First Name"
            size="small"
            variant="filled" />
          <TextField
            value={lastName}
            onChange={(e) => { setLastName(e.target.value) }}
            label="Last Name"
            size="small"
            variant="filled" />
          <TextField
            value={phoneNumber}
            onChange={(e) => { setPhoneNumber(e.target.value) }}
            type='tel'
            label="Phone Number"
            size="small"
            variant="filled" />
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Button
            startIcon={<CloseIcon />}
            onClick={handleClose}
            variant='outlined'
            color='error'
          >cancel</Button>
          <Button
            disabled={save}
            endIcon={<DoneIcon />}
            onClick={pushData}
            variant='contained'
            color='info'
          >Save</Button>
        </DialogActions>
      </Dialog>
      <Fab
        onClick={handleClickOpen}
        style={style}
        color="primary"
        aria-label="add">
        <AddIcon />
      </Fab>
      
    </div>
  );
}

export default Homepage;