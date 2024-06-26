import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Divider,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  getKeyValue,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
} from "@nextui-org/react";
import { StoreContext } from "../../Context/StoreContext";
import {
  CreateStoreContable,
  GetMyBills,
  NewBill,
  getBillsAndCredits
} from "../../Helpers/Connections";
import Wait from "../Wait";



function StorebasicInfo() {
  const { myStores, myContable, setmyContable, myBills, setmyBills } =
    useContext(StoreContext);
  const [logDual, setlogDual] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (myStores && firstLoad) {
        setFirstLoad(false);
        const myDate = new Date().toString().split(" ", 4);
        console.log(myStores[0].StoreContableLog);
        const mapping = myStores[0].StoreContableLog.find((e) => {
          return e.date.split(" ", 4).toString() === myDate.toString();
        });
        if (mapping) setmyContable(mapping);
        else {
          const myContableLog = async () => {
            const data = await CreateStoreContable(myStores[0].id);
            setmyContable(data.data.savedLog);
          };
          myContableLog();
        }
      }
    }, [myStores]);

  useEffect(() => {
    if (myContable) {
      console.log(myContable)
      const getBC = async () => {
        const data = await getBillsAndCredits(myContable.bills, myContable.credits);
        setmyBills(data.data.bills);
      };
      getBC();
      
    }
  }, [myContable]);

  useEffect(() => {
    if (myBills) {
      setlogDual([...myBills]);
      console.log(myBills)
    }
  }, [myBills]);

  const createBill = async () => {

    const newBill = {
      billTitle: "Nueva bill",
      billAmount: "700",
      idContable: myContable._id || myContable.id ,
      dateContable: myContable.date,
    };

    const data = await NewBill(newBill);
    setmyBills(data.data.bills);
  };

  const columns = [
    {
      key: `titleBill`,
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

  const createMyStoreContable = async () => {};

  return (
    <div>
      <div className="py-3 px-5">
        <h1 className="font-bold text-4xl">General</h1>
        <h1 className="font-light">
          Bienvenido a la la informacion general de tu tienda
        </h1>
      </div>
      <div className="flex px-5 py-3 w-full justify-around">
        {!myStores ? (
          <Wait />
        ) : !myContable ? (
          <Card className="max-w-[200px] max-h-[200px]">
            <CardBody>
              <p>Crea tu log contable</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex gap-3">
              <div className="flex flex-col">
                <Button
                  color="primary"
                  onPress={createMyStoreContable}
                  variant="shadow"
                >
                  Crear log Contable
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="max-w-[200px] max-h-[200px]">
            <CardBody>
              <p>Añade los gastos de tu empresa</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex gap-3">
              <div className="flex flex-col">
                <Button color="primary" variant="bordered">
                  Gastos
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
        <div>
          <Card className="max-w-[200px] max-h-[200px]">
            <CardBody>
              <p>Agrega creditos a tus clientes</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex gap-3">
              <div className="flex flex-col">
                <Button color="primary" onPress={createBill} variant="bordered">
                  Clientes
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div>
        {!myBills ? (
          ""
        ) : (
          <div className="w-full h-full ">
            <div className="px-4">
              <h1 className="font-bold text-2xl mb-5">Registro de hoy</h1>

              <Table
                aria-label="Example table with dynamic content"
                className="lg:h-96 h-56"
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={myBills}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorebasicInfo;
