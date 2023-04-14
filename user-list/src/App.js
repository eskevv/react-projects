import { React, Fragment, useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
   const [usersList, setUsersList] = useState([]);

   const addUserHandler = (username, age) => {
      setUsersList((prevUsersList) => {
         return [...prevUsersList, { username: username, age: age, id: Math.random().toString() }]
      });
   };

   return <Fragment>
      <AddUser onAddUser={addUserHandler} />
      {usersList.length > 0 && <UsersList users={usersList} />}
   </Fragment>;
}

export default App;
