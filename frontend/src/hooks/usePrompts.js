import { useState, useCallback } from 'react';
import * as promptService from '../services/promptService';
import toast from 'react-hot-toast';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const fetchPrompts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const data = await promptService.getPrompts(params);
      setPrompts(data.prompts);
      setPagination(data.pagination);
    } catch {
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const generate = useCallback(async (promptData) => {
    setGenerating(true);
    try {
      const data = await promptService.generatePrompt(promptData);
      toast.success('Prompt generated successfully!');
      return data;
    } catch {
      return null;
    } finally {
      setGenerating(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      await promptService.deletePrompt(id);
      setPrompts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Prompt deleted');
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggleFav = useCallback(async (id) => {
    try {
      const updated = await promptService.toggleFavorite(id);
      setPrompts((prev) => prev.map((p) => (p._id === id ? { ...p, isFavorite: updated.isFavorite } : p)));
      return updated;
    } catch {
      return null;
    }
  }, []);

  return { prompts, pagination, loading, generating, fetchPrompts, generate, remove, toggleFav };
};
