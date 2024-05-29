import React, { useContext, useEffect, useState } from 'react'
import { Card, Divider, CardHeader, CardBody, CardFooter, Link, getKeyValue, Button, Table, TableHeader, TableBody, TableCell, TableColumn, TableRow } from '@nextui-org/react'
import { StoreContext } from '../../Context/StoreContext';
import { CreateStoreContable, NewBill, getLogContable } from '../../Helpers/Connections';
import Wait from '../Wait';

function StorebasicInfo() {

    const { myStores, myContable, setmyContable} = useContext(StoreContext)
    const [logDual, setlogDual] = useState(null) 
    useEffect(() => {
      if(myStores){

        const myDate =  new Date().toString().split(" ", 4)
        const mapping = myStores[0].StoreContableLog.filter(e => {
            return e.date.split(" ", 4).toString() === myDate.toString()
        })
        setmyContable(mapping[0])

      }
    }, [myStores])
    
    useEffect(() => {
      if(myContable){
        setlogDual([...myContable.bills, ...myContable.credits])
        console.log(myContable)
      }

      
    }, [myContable])
    
    const createBill = async () => {
        const newBill = {
            billTitle: "",
            billAmount: "",
            idContable: myContable._id,
            dateContable: myContable.date
        }

       const data = await NewBill(newBill)
       setmyContable(data.data.contable)

        
    }

    const columns = [
        {
            key: `${"titleBill" }`,
            label: "TIPO",
        },
        {
            key: "totalBill",
            label: "CANTIDAD",
        },
        {
            key: "dateBill",
            label: "FECHA",
        },
    ];

    const createMyStoreContable = async () => {
        const data = await CreateStoreContable(myStores[0].id)
        setmyContable(data.data)
    }




    return (
        <div>
            <div className='py-3 px-5'>
                <h1 className='font-bold text-4xl'>General</h1>
                <h1 className='font-light'>Bienvenido a la la informacion general de tu tienda</h1>
            </div>
            <div className='flex px-5 py-3 w-full justify-around'>
                {!myStores ? <Wait/> : !myContable  ? <Card className="max-w-[200px] max-h-[200px]">
                    <CardBody>
                        <p>Crea tu log contable</p>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex gap-3">
                        <div className="flex flex-col">
                            <Button color="primary" onPress={createMyStoreContable} variant='shadow'>
                                Crear log Contable
                            </Button>
                        </div>
                    </CardFooter>
                </Card> : <Card className="max-w-[200px] max-h-[200px]">
                    <CardBody>
                        <p>Añade los gastos de tu empresa</p>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex gap-3">
                        <div className="flex flex-col">
                            <Button color="primary"  variant='bordered'>
                                Gastos
                            </Button>
                        </div>
                    </CardFooter>
                </Card>}
                <div>
                    <Card className="max-w-[200px] max-h-[200px]">
                        <CardBody>
                            <p>Agrega creditos a tus clientes</p>
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex gap-3">
                            <div className="flex flex-col">
                                <Button color="primary" onPress={createBill} variant='bordered'>
                                    Clientes
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            
        </div>
    )
}

export default StorebasicInfo