import { create } from "zustand";

interface WorkflowState {
  selectedItem: number
  setSelectedItem: (id: number) => void
}

export const useWorkflowState = create<WorkflowState>((set) => ({
  selectedItem: 0,
  setSelectedItem: (id) => set({ selectedItem: id }),

}));
