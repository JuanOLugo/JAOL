import { useContext, useEffect, useState } from 'react'
import { LoginUser } from '../../Helpers/Connections'
import { Input } from "@nextui-org/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, useDisclosure } from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { UserContext } from '../../Context/UserContext';


function FormSign() {
  const [UserInitials, setUserInitials] = useState({
    username: "",
    password: ""
  })
  const [isVisible, setisVisible] = useState(false)
  const [errors, seterrors] = useState(null)
  const [Success, setSuccess] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { myAccount, setMyAccount } = useContext(UserContext)

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        seterrors(null)
      }, 2000)
    }
  }, [errors])



  const handleChangeUsername = (e) => {
    setUserInitials({ ...UserInitials, username: e.target.value })
  }

  const handleChangePassword = (e) => {
    setUserInitials({ ...UserInitials, password: e.target.value })
  }

  const handleSubmitLogin = async () => {
    const data = await LoginUser(UserInitials).then(res => res).then(data => {
      setSuccess(data.data.msgOK)
      setTimeout(() => {
        window.localStorage.setItem("u53r", data.data.token)
        setMyAccount(data.data.user)
        setSuccess(null)
        console.log(myAccount)
      }, 500)
     })
    .catch(err => seterrors(err.response.data.msgERR))
    



  }


  const toggleVisibility = () => setisVisible(!isVisible)
  return (
    <div className='dark:border-2 dark:border-sky-600 py-7 px-5 shadow-xl rounded-xl' >
      <form action="" >
        <Input type="text" label="Nombre de usuario" variant='bordered' className='w-80 ' isRequired isClearable onChange={handleChangeUsername} />
        <Input type={isVisible ? "text" : "password"} label="Contraseña" variant='bordered' isRequired onChange={handleChangePassword} className='w-80 my-5 ' endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <FaEyeSlash className='text-xl text-default-400  mb-2 pointer-events-none'></FaEyeSlash>
            ) : (
              <FaEye className='text-xl text-default-400 pointer-events-none mb-2'></FaEye>
            )}
          </button>
        }
        />
        <RegisterModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <span className="text-danger">{errors}</span>
        <span className="text-success">{Success}</span>
        <div className='flex justify-center'>
          <Button className=' my-2 mx-auto ' color='primary' onPress={handleSubmitLogin}>Iniciar sesion</Button>
        </div>
        <div className='flex justify-center'>
          <NavLink className="text-sky-600 mx-auto my-2 dark:text-white " to={"/forgotpassword"}>He olvidado mi contraseña</NavLink>
        </div>
      </form>
      <hr className='dark:border-white' />
      <div className='flex justify-center'>
        <Button className='my-2' color='warning' onPress={onOpen}>Crea una cuenta nueva</Button>
      </div>
    </div>
  )
}

export default FormSign