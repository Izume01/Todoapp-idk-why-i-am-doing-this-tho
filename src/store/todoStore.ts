import { create } from "zustand";
import { produce } from "immer";

interface StoreState {
  data: {
    title: string;
    description: string;
    completed: boolean;
  };
  applyUpdates: (updates: Partial<StoreState["data"]>) => void;
}

const useStore = create<StoreState>((set) => ({
  data: {
    title: "",
    description: "",
    completed: false,
  },
  applyUpdates: (updates) =>
    set(
      produce((draft) => {
        Object.entries(updates).forEach(([key, val]) => {
          if (val && typeof val === "object" && !Array.isArray(val)) {
            const currentValue = draft.data[key as keyof typeof draft.data];
            draft.data[key as keyof typeof draft.data] = { 
              ...(typeof currentValue === 'object' && currentValue !== null ? currentValue : {}), 
              ...(typeof val === 'object' && val !== null ? val : {}) 
            };
          } else {
            draft.data[key as keyof typeof draft.data] = val;
          }
        });
      })
    ),
}));

export default useStore;
