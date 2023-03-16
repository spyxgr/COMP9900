import apiClient from "./client";

// api of manager
// get all category
export const getManagerCategory = async () => {
  const result = await apiClient.get(`/manager/category`);
  return result.data;
}

// add new category
export const postManagerCategory = async (input: { 'categoryName': string }) => {
  const data = JSON.stringify(input);
  const result = await apiClient.post(`/manager/category/add`, data);
  return result.data;
}

// get all items
export const getManagerItem = async () => {
  const result = await apiClient.get(`/manager/item`);
  return result.data;
}

// add new item
export const addManagerItem = async (input: {
  categoryName: string;
  title: string;
  description: string;
  ingredient: string;
  cost: number;
  calorie: number;
  picture: string;
}) => {
  const data = JSON.stringify(input);
  const result = await apiClient.post(`/manager/item/add`, data);
  return result.data;
}

// delete item
export const deleteManagerItem = async (id: string) => {
  const result = await apiClient.post(`/manager/item/${id}`);
  return result.data;
}

// edit item
export const editManagerItem = async (id: string, input: {
  categoryName: string;
  title: string;
  description: string;
  ingredient: string;
  cost: number;
  calorie: number;
  picture: string;
}) => {
  const data = JSON.stringify(input);
  const result = await apiClient.put(`/manager/item/${id}`, data);
  return result.data;
}

// get all key of staff
export const getManagerKey = async () => {
  const result = await apiClient.get(`/manager/key`);
  return result.data;
}

// add new key
export const postManagerKey = async (input: {
  role: string;
  name: string;
  key: string;
}) => {
  const data = JSON.stringify(input)
  const result = await apiClient.post(`/manager/key`, data);
  return result.data;
}

// delete key
export const deleteManagerKey = async (input: {
  role: string;
  key: string;
}) => {
  const data = JSON.stringify(input)
  const result = await apiClient.delete(`/manager/key`, { data: data });
  return result.data;
}

// edit the order of category
export const postManagerCategoryOrder = async (
  input: {
    categoryList: {
      categoryName: string;
      lastModified: string;
      categoryId: number;
    }[]
  }) => {
  const data = JSON.stringify(input);
  const result = await apiClient.post(`/manager/category`, data);
  return result.data;
}

// edit the order of item
export const postManagerItemOrder = async (
  input: {
    itemList: {
      ingredient: string;
      picture: string;
      categoryName: string;
      dishId: number;
      description: string;
      calorie: number;
      dishName: string;
      price: number;
    }[]
  }) => {
  const data = JSON.stringify(input);
  const result = await apiClient.post(`/manager/item`, data);
  return result.data;
}
