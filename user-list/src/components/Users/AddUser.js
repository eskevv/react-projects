import { React, useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css'
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

function validInput(username, age, setError) {
   if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
         title: 'Invalid Input',
         message: 'Please enter a valid name, and age (non-empty values).'
      });
      return false;
   }
   if (+age < 1) {
      setError({
         title: 'Invalid Age',
         message: 'Please enter a valid age (> 0).'
      });
      return false;
   }
   return true;
}

function AddUser(props) {
   const nameInputRef = useRef();
   const ageInputRef = useRef();
   const [error, setError] = useState();

   const addUserHandler = (event) => {
      event.preventDefault();
      const enteredUsername = nameInputRef.current.value;
      const enteredAge = ageInputRef.current.value;
      if (!validInput(enteredUsername, enteredAge, setError)) {
         return;
      }

      props.onAddUser(enteredUsername, enteredAge);
      nameInputRef.current.value = '';
      ageInputRef.current.value = '';
   };

   const errorHandler = () => {
      setError(null);
   }

   return <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
         <form onSubmit={addUserHandler}>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' ref={nameInputRef} />
            <label htmlFor='age'>Age (Years)</label>
            <input id='age' type='number' ref={ageInputRef} />
            <Button type='submit'>Add User</Button>
         </form>
      </Card>
   </div>;
}

export default AddUser;