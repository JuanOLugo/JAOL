import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'

function UservInfoView() {

    const { myAccount, setMyAccount } = useContext(UserContext)

    return (
        <div className='h-full w-[90%] mx-auto'>
            <div className='py-5'>
                <h1 className='font-bold capitalize text-center text-3xl'>{myAccount.userName}</h1>
                <h1>{ }</h1>
                <h1 className='text-center font-light '>{myAccount.typeAccount === "owner" ? "Dueño de tienda" : "Tarbajador de la tienda"}</h1>
                <hr className='' />
            </div>

        </div>
    )
}

export default UservInfoView