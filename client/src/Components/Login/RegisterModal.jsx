import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CreateUser } from '../../Helpers/Connections';
import axios from 'axios';

function RegisterModal({ isOpen, onOpenChange }) {
    const [isVisible, setisVisible] = useState(false)
    const toggleVisibility = () => setisVisible(!isVisible)
    const [Success, setSuccess] = useState(null)
    const [UserInitials, setUserInitials] = useState({
        username: "",
        password: "",
        usertype: ""
    })
    const [errors, seterrors] = useState(null)

    const onSubmitHandle = async (e) => {
        e.preventDefault()
        if(!UserInitials || UserInitials.username == "" || UserInitials.password == "" || UserInitials.usertype == ""){
            seterrors("Rellene los campos")
        }else{
            const data = await CreateUser(UserInitials).catch(err => err)
            if(data.response){
                seterrors(data.response.data.msgERR)
            }else{
                setSuccess(data.data.msgOK)
                setTimeout(() => {
                    setSuccess(null)
                    onOpenChange()
                }, 500)
            }
        }
    }

    useEffect(() => {
        if(errors){
            setTimeout(()=>{
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

    const handleUserType = (key) => {
        setUserInitials({ ...UserInitials, usertype: key })
    }


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h1 className='font-bold text-3xl'>Registrate</h1>
                            <p className='font-thin'>Es gratis!</p>
                        </ModalHeader>
                        <ModalBody>
                            <form action="" className='mx-auto' >
                                <Input type='text' label='Nombre de usuario' variant='bordered' className='w-80' isClearable isRequired onChange={handleChangeUsername} />
                                <Input type={isVisible ? "text" : "password"} label="Contraseña" variant='bordered' isRequired className='w-80 my-5 ' onChange={handleChangePassword} endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <FaEyeSlash className='text-xl text-default-400  mb-2 pointer-events-none'></FaEyeSlash>
                                        ) : (
                                            <FaEye className='text-xl text-default-400 pointer-events-none mb-2'></FaEye>
                                        )}
                                    </button>
                                } />
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="shadow" color='warning'>Selecciona tu usuario</Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Guardar tipo de usuario"
                                        onAction={handleUserType}
                                    >
                                        <DropdownItem key="owner">Dueño de local</DropdownItem>
                                        <DropdownItem key="worker">Trabajador</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <div className='flex justify-center'>
                                    <h1 className='text-danger my-3 absolute'>{errors}</h1>
                                    <h1 className='text-success my-3 absolute'>{Success}</h1>
                                </div>
                                <br />
                                <Button color='primary' className='my-4' onClick={onSubmitHandle}>Registrarse</Button>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default RegisterModal