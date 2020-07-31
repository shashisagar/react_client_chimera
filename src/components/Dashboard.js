import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

function Dashboard(props) {
  const user = getUser();
  const obj = JSON.parse(user);
  console.log(user);
  if(!user) {
    props.history.push('/login');
    return null;
  }
  else {
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  return (
    <div>
      Welcome {obj.firstName}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
  }
}

export default Dashboard;
