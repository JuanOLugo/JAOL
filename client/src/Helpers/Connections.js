import axios from "axios";
const BASE_URL = "http://localhost:3002/api/";

export const LoginUser = async (user) => {
  if (window.localStorage.getItem("u53r")) {
    const data = await axios.post(`${BASE_URL}users/login`, null, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("u53r")}`,
      },
    });
    return data;
  } else {
    const data = await axios.post(`${BASE_URL}users/login`, user);
    return data;
  }
};

export const CreateUser = async (user) => {
  const data = await axios.post(`${BASE_URL}users/createuser`, user);
  return data;
};

export const CreateStore = async (storeInformation) => {
  const data = await axios.post(`${BASE_URL}stores/create`, storeInformation, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
};

export const GetMyStores = async () => {
  const data = await axios.get(`${BASE_URL}stores/mystores`, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
};

export const CreateStoreContable = async (idStore) => {
  const data = await axios.post(`${BASE_URL}stores/logcontable`, { idStore }, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
}

export const getLogContable = async (idStore, idLog) => {
  const data = await axios.post(`${BASE_URL}stores/getlog`, { idStore, idLog }, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
}

export const NewBill = async (bill) => {
  const data = await axios.post(`${BASE_URL}contable/addbill`, bill, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
}

export const GetMyBills = async (bills) => {
  const data = await axios.post(`${BASE_URL}contable/getbills`, {bills: bills}, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
}

export const getBillsAndCredits  = async (bills, credits) => {
  const data = await axios.post(`${BASE_URL}stores/getbillsandcredit`, { bills, credits }, {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("u53r"),
    },
  });
  return data;
}