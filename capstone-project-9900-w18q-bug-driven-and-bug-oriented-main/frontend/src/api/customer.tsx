import apiClient from "./client";

// api of customer
// customer initialize
export const getCustomerInit = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}/hot`);
  return result.data;
};

// get menu's category
export const getCustomerCategory = async (a: string, b: string) => {
  const result = await apiClient.get(`/customer/${a}/${b}`);
  return result.data;
};

// get current order 
export const getCustomerOrder = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}`);
  return result.data;
};

// post order
export const postCustomerOrder = async (a:
  {
    'orderList': any
  },
  id: string) => {
  const result = await apiClient.post(`/customer/${id}`, JSON.stringify(a));
  return result.data;
};

// reuqest bill
export const getCustomerBill = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}/bill`);
  return result.data;
};

// request service
export const postCustomerRequest = async (id: string) => {
  const result = await apiClient.post(`/customer/${id}/help`);
  return result.data;
};

// get recommend items
export const postCustomerRecommend = async (a: any,
  id: string) => {
  const result = await apiClient.post(`/customer/${id}/recommend`, JSON.stringify(a));
  return result.data;
};