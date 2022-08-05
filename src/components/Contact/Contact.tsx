import styles from './Contact.module.scss';

interface IContact {
  data: {
    firstName: string,
    id: string,
    lastName: string,
    phoneNumber: string
  }
}

function Contact({data}: IContact) {
  return (
    <div className={styles.container}>
      <span>{data.firstName}</span>
      <span>{data.lastName}</span>
    </div>
  );
}

export default Contact;