import React from 'react'
import { Spinner } from '@nextui-org/react'
function Wait() {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
        <Spinner label='Cargando la mejor experiencia!'></Spinner>
    </div>
  )
}

export default Wait