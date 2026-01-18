import React from 'react'
import RegisterClient from '../components/auth/RegisterClient'
import { getCurrentUser } from '../actions/getCurrentUser';

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <div>
        <RegisterClient currentUser={currentUser}/>
      </div>
    </div>
  )
}

export default Register 