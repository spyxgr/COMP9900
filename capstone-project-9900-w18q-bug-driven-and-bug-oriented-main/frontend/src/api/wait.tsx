import apiClient from "./client";

// api of waiter
// get request from customer
export const getWaitRequest = async () => {
  const result = await apiClient.get(`/wait/request`);
  return result.data;
};

// get item which finished
export const getWaitItem = async () => {
  const result = await apiClient.get(`/wait/item`);
  return result.data;
};

// get all order
export const getWaitOrder = async () => {
  const result = await apiClient.get(`/wait/order`);
  return result.data;
};

// confirm order
export const postWaitOrder = async (id: string) => {
  const result = await apiClient.post(`/wait/order/${id}`);
  return result.data;
};

// confirm item
export const postWaitItem = async (id: string) => {
  const result = await apiClient.post(`/wait/item/${id}`);
  return result.data;
};

// confirm request
export const postWaitRequest = async (id: string) => {
  const result = await apiClient.post(`/wait/request/${id}`);
  return result.data;
};