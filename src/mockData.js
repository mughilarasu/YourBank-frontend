export const loginData = {
  token: "cc66fbbbcb82042ce14f2d41c1292a5cd85d0ee1",
  customer: {
    id: 1,
    user: {
      username: "gagan",
      email: "gagan.globin76@gmail.com",
    },
    name: "Gagan C",
    address: "40, Kasthuri Nilaya\r\nOppt Mgm Apartment, Chikkalsandra",
    mobile_number: "8792691261",
  },
  account: [
    {
      customer: 1,
      account_number: "84394563126489",
      balance: "16831.00",
    },
    {
      customer: 1,
      account_number: "43640467978320",
      balance: "600000.00",
    },
    {
      customer: 1,
      account_number: "95571542285816",
      balance: "600000.00",
    },
  ],
};

export const allAccounts = [
  {
    id: 1,
    account_number: "12932300936278",
    customer: {
      id: 2,
      name: "test",
    },
  },
  {
    id: 2,
    account_number: "84394563126489",
    balance: "16831.00",
    customer: {
      id: 1,
      name: "Gagan C",
    },
  },
  {
    id: 3,
    account_number: "43640467978320",
    balance: "600000.00",
    customer: {
      id: 1,
      name: "Gagan C",
    },
  },
  {
    id: 4,
    account_number: "95571542285816",
    balance: "600000.00",
    customer: {
      id: 1,
      name: "Gagan C",
    },
  },
  {
    id: 5,
    account_number: "17463394595573",
    customer: {
      id: 2,
      name: "test",
    },
  },
];

export const transactionsHistory = {
  transactions: [
    {
      source_account: "test-12932300936278",
      target_account: "Gagan C-84394563126489",
      amount: "10.00",
      currency_type: "INR",
      transaction_date: "2023-04-13T13:49:34.297664Z",
    },
    {
      source_account: "test-12932300936278",
      target_account: "Gagan C-84394563126489",
      amount: "10000.00",
      currency_type: "INR",
      transaction_date: "2023-04-13T13:52:07.211222Z",
    },
    {
      source_account: "test-12932300936278",
      target_account: "Gagan C-84394563126489",
      amount: "10.00",
      currency_type: "INR",
      transaction_date: "2023-04-13T13:58:25.388926Z",
    },
    {
      source_account: "test-12932300936278",
      target_account: "Gagan C-84394563126489",
      amount: "1011.00",
      currency_type: "INR",
      transaction_date: "2023-04-13T13:59:16.232212Z",
    },
  ],
};
