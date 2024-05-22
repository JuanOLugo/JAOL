import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { StoreContext } from "../../Context/StoreContext";
import Create from "./Create";
import { Input, button } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

function StartCreatingStore() {
  const { myAccount } = useContext(UserContext);
  const { myStores, setMyStores } = useContext(StoreContext);
  const [buttonVisible, setbuttonVisible] = useState(false);
  const [verifyClick, setverifyClick] = useState(false);
  const [Store, setStore] = useState({
    storename: "",
    storepassword: "",
  });

  const handleChangeName = (e) => {
    setStore({ ...Store, storename: e.target.value });
  };

  const handleChangePassword = (e) => {
    setStore({ ...Store, storepassword: e.target.value });
  };

  const handleSubmit = async (e) => {
    const data = await CreateStore(Store);
    if (data.response) {
      setverifyClick(true);
    }
  }

  useEffect(() => {
    if (Store.storename.length > 2) {
      setbuttonVisible(true);
    } else {
      setbuttonVisible(!setbuttonVisible);
    }
  }, [Store.storename]);

  useEffect(() => {
    if (Store.storepassword.length > 2) {
      setbuttonVisible(true);
    } else {
      setbuttonVisible(!setbuttonVisible);
    }
  }, [Store.storepassword]);

  const handleCreateStore = () => {
    if(Store.storename === "" || Store.storepassword === "" ){
        
    }
  }

  return (
    <div>
      {!myAccount ? null : !verifyClick ? (
        <Create>
          <h1 className="text-2xl">
            Bienvenido{" "}
            <label className="font-bold">
              {myAccount.userName.toUpperCase()}
            </label>
          </h1>
          <p className="my-2">
            Empezaremos creando tu tienda!{" "}
            <label className="font-bold">Añadele un nombre para empezar</label>
          </p>
          <Input
            label="Nombre de la tienda"
            variant="faded"
            onChange={handleChangeName}
            minLength={3}
            isRequired
            endContent={
              buttonVisible ? (
                <button
                  className="text-primary drop-shadow-2xl"
                  onClick={() => {
                    setverifyClick(!verifyClick);
                    setbuttonVisible(!buttonVisible);
                  }}
                >
                  <FaCheck />
                </button>
              ) : null
            }
          />
        </Create>
      ) : (
        <Create>
          <button
            onClick={() => {
              setverifyClick(!verifyClick);
              setbuttonVisible(!buttonVisible);
              setStore({
                storename: "",
                storepassword: "",
              });
            }}
          >
            <IoArrowBack />
          </button>
          <h1 className="text-2xl">
            Increible ese nombre{" "}
            <label className="font-bold">{Store.storename.toUpperCase()}</label>
          </h1>
          <p className="my-2">
            Ahora añadele una contraseña a tu tienda{" "}
            <label className="font-bold">
              es importante para garantizar la seguridad
            </label>
          </p>
          <Input
            type="password"
            label="Contraseña para la tienda"
            variant="faded"
            onChange={handleChangePassword}
            minLength={3}
            isRequired
            endContent={
              buttonVisible ? (
                <button className="text-primary drop-shadow-2xl" onClick={handleCreateStore}>
                  <FaCheck />
                </button>
              ) : null
            }
          />
        </Create>
      )}
    </div>
  );
}

export default StartCreatingStore;
