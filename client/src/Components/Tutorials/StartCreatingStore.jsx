import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { StoreContext } from "../../Context/StoreContext";
import Create from "./Create";
import { Input } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { CreateStore } from "../../Helpers/Connections";

function StartCreatingStore() {
  const { myAccount } = useContext(UserContext);
  const { setMyStores, myStores } = useContext(StoreContext);
  const [buttonVisible, setbuttonVisible] = useState(false);
  const [verifyClick, setverifyClick] = useState(false);
  const [errors, seterrors] = useState(null);
  const [Store, setStore] = useState({
    storename: "",
    storepassword: "",
  });

  useEffect(() => {
    //Validation
    if (myAccount) {
      if (myAccount.Stores.length > 0) {
        window.localStorage.setItem("createStoreTutorial", "true");
        window.location.reload()
      }
    }
  }, [myAccount]);

  const handleChangeName = (e) => {
    setStore({ ...Store, storename: e.target.value });
  };

  const handleChangePassword = (e) => {
    setStore({ ...Store, storepassword: e.target.value });
  };

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

  const handleCreateStore = async () => {
    if (Store.storename === "" || Store.storepassword === "") {
      seterrors("Por favor, rellene todos los campos");
    } else {
      const data = await CreateStore(Store)
        .then((res) => res)
        .then((data) => data);
      setMyStores(data.data.userStores);
      window.localStorage.setItem("createStoreTutorial", "true")
      setStore({ storename: "", storepassword: "" });
      window.location.reload()
    }
  };

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        seterrors(null);
      }, 2000);
    }
  }, [errors]);

  setTimeout(() => {
    return (
      <div>
        <h1>{errors}</h1>
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
                  <button
                    className="text-primary drop-shadow-2xl"
                    onClick={handleCreateStore}
                  >
                    <FaCheck />
                  </button>
                ) : null
              }
            />
          </Create>
        )}
      </div>
    );
  }, 1)
}

export default StartCreatingStore;
