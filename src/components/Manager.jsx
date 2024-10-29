import React, { useEffect } from 'react'
import PasswordForm from './PasswordForm'
import PasswordTable from './PasswordTable'
import { useNavigate } from 'react-router-dom'

const Manager = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/home');
        }
    }, [])
  return (
    <div>
      <PasswordForm/>
      <PasswordTable/>
    </div>
  )
}

export default Manager
