import { create } from 'zustand';
// 🔥 REMOVED persist middleware import entirely!
import set from 'lodash/set';
import get from 'lodash/get';

type EditorStore = {
  config: any;
  currentSlug: string | null;
  setConfig: (newConfig: any, slug: string) => void;
  updateField: (path: string, value: any) => void;
  updateFromJson: (jsonString: string) => boolean;
  addArrayItem: (path: string, defaultItem: any) => void;
  removeArrayItem: (path: string, index: number) => void;
};

export const useEditorStore = create<EditorStore>()((setStore) => ({
  config: null,
  currentSlug: null,
  
  setConfig: (newConfig, slug) => setStore({ config: newConfig, currentSlug: slug }),

  updateField: (path, value) => setStore((state) => {
    if (!state.config) return state;
    const newConfig = structuredClone(state.config); 
    set(newConfig, path, value);
    return { config: newConfig };
  }),

  addArrayItem: (path, defaultItem) => setStore((state) => {
    if (!state.config) return state;
    const newConfig = structuredClone(state.config);
    const arr = get(newConfig, path, []);
    arr.push(defaultItem);
    set(newConfig, path, arr);
    return { config: newConfig };
  }),

  removeArrayItem: (path, index) => setStore((state) => {
    if (!state.config) return state;
    const newConfig = structuredClone(state.config);
    const arr = get(newConfig, path, []);
    arr.splice(index, 1);
    set(newConfig, path, arr);
    return { config: newConfig };
  }),

  updateFromJson: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setStore({ config: parsed });
      return true;
    } catch (e) {
      return false;
    }
  }
}));