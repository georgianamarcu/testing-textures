import { create } from "zustand";

const initialState = {
  albedoUrl: null,
  roughnessUrl: null,
  normalsUrl: null,
  repeat: 10,
  stagePreset: "rembrandt",
  lightIntensity: 0.5,
};

export const useAppStore = create((set) => ({
  ...initialState,

  // function to update the different fields inside the store
  update: (options) => set((state) => ({ ...state, ...options })),
}));
