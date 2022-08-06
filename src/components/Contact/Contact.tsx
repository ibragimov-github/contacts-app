import styles from './Contact.module.scss';
import { Button, Dialog, DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { SetStateAction, useEffect, useState } from 'react';


interface IContact {
  data: {
    firstName: string,
    id: string,
    lastName: string,
    phoneNumber: string
  },
  contacts?: Array<IContact>|undefined,
  setContacts?: (contacts: IContact) => void
}

function Contact({ data, contacts, setContacts }: IContact) {
  const db = getDatabase();
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [disabled, setDisabled] = useState(false);
  useEffect(()=> {
    if(firstName.trim().length && lastName.trim().length && phoneNumber.trim().length) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [firstName, lastName, phoneNumber])
  const handleClose = () => { 
    setOpen(false); 
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setPhoneNumber(data.phoneNumber)
  }
  const updateContact = () => {
    const postData = contacts.map((el:Object) => {
      if(el.id === data.id) {
        return {
          ...el,
          firstName,
          lastName,
          phoneNumber
        }
      }
      else {return el}
    })
    set(ref(db, 'users/' + user.uid + '/database'), postData).then(()=>setOpen(false))
  }
  const deleteContact = () => {
    const postData = contacts.filter((el: Object) => {
      if (el.id !== data.id) { return el; }
    })
    set(ref(db, 'users/' + user.uid + '/database'), postData)
    if (!postData.length) { setContacts([]) }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent className={styles.content}>
          <TextField
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value) }}
            label="First Name"
            size="small"
            variant="filled"
          />
          <TextField
            value={lastName}
            onChange={(e) => { setLastName(e.target.value) }}
            label="Last Name"
            size="small"
            variant="filled"
          />
          <TextField
            value={phoneNumber}
            onChange={(e) => { setPhoneNumber(e.target.value) }}
            label="PhoneNumber"
            size="small"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
          >cancel</Button>
          <Button
            disabled={disabled}
            onClick={updateContact}
          >save</Button>
        </DialogActions>
      </Dialog>
      <div
        className={styles.container}
        onClick={() => setOpen(true)}
      >
        <div className={styles.item}>
          <span>{data.firstName}</span>
          <span>{data.lastName}</span>
          <span>{data.phoneNumber}</span>
        </div>
        <IconButton
          onClick={deleteContact}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  );
}

export default Contact;