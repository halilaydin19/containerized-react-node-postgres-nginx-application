import { create } from 'zustand';

export const useMessageStore = create(() => ({
  message: ''
}));