import api from './api';

export const generatePrompt = async (promptData) => {
  const { data } = await api.post('/prompts/generate', promptData);
  return data;
};

export const getPrompts = async (params = {}) => {
  const { data } = await api.get('/prompts', { params });
  return data;
};

export const getPromptById = async (id) => {
  const { data } = await api.get(`/prompts/${id}`);
  return data;
};

export const updatePrompt = async (id, promptData) => {
  const { data } = await api.put(`/prompts/${id}`, promptData);
  return data;
};

export const deletePrompt = async (id) => {
  const { data } = await api.delete(`/prompts/${id}`);
  return data;
};

export const toggleFavorite = async (id) => {
  const { data } = await api.post(`/prompts/${id}/favorite`);
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await api.get('/prompts/dashboard');
  return data;
};
