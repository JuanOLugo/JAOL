import React from 'react'
import FormSign from './Form'
import LoginDesing from './LoginDesing'

function LoginApp() {
  return (
    <div className='flex justify-around items-center h-screen'>
        <LoginDesing/>
        <FormSign/>
    </div>
  )
}

export default LoginApp