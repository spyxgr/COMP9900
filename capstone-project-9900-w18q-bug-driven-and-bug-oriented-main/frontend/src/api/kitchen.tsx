import apiClient from "./client";

// api of kitchen
// get all order
export const getKitchenOrder = async () => {
  const result = await apiClient.get(`/kitchen`);
  return result.data;
};

// get order of different status
export const postKitchenOrder = async (input: { 'orderStatus': string }) => {
  const result = await apiClient.post(`/kitchen`, JSON.stringify(input));
  return result.data;
};

// get items of a order
export const getKitchenEachOrder = async (id: string) => {
  const result = await apiClient.get(`/kitchen/${id}`);
  return result.data;
};

// edit item's status
export const postKitchenEachOrder = async (input: { 'itemIndex': number, 'itemStatus': string }, id: string) => {
  const result = await apiClient.post(`/kitchen/${id}`, JSON.stringify(input));
  return result.data;
};