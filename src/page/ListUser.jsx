import React, { useEffect, useState } from 'react';
import {auth} from '../firebase'
const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRecords = await auth.listUsers();
        const userList = userRecords.users.map((user) => ({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            {user.displayName || user.email} (UID: {user.uid})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUser

