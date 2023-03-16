import apiClient from "./client";

interface input {
  staff: any,
  key: any,
  table: string,
  diner: string
}

// api of home page
// check the key of staff
export const checkLogin = async (input: input) => {
  const data = JSON.stringify(input);
  return await apiClient.post(`/staff`, data);
};

// check which table is available
export const getCustomerTable = async () => {
  return await (await apiClient.get(`/`)).data;
};