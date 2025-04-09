import { create } from "zustand";

const initialState = {
  albedoUrl: null,
  roughnessUrl: null,
  normalsUrl: null,
  repeat: 6,
  stagePreset: "rembrandt",
  lightIntensity: 0.5,
  enableRandom: 0,
  useNoiseMap: 0,
  useSuslikMethod: 0,
  debugNoise: 0,
  selectedModel: "chair",
};

export const useAppStore = create((set) => ({
  ...initialState,

  // function to update the different fields inside the store
  update: (options) => set((state) => ({ ...state, ...options })),
}));
