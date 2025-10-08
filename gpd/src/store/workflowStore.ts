import { create } from 'zustand';

type WorkflowState = {
  selectedItem: number | null;
  isSheetOpen: boolean;
  isModalOpen: boolean;
  isFormOpen: boolean;
  setSelectedItem: (id: number | undefined) => void;
  toggleSheet: (value: boolean) => void;
  toggleModal: (value: boolean) => void;
  toggleForm: (value: boolean) => void;
};

export const useWorkflowState = create<WorkflowState>((set) => ({
  selectedItem: null,
  isSheetOpen: false,
  isModalOpen: false,
  isFormOpen: false,
  setSelectedItem: (id) => set({ selectedItem: id }),
  toggleSheet: (value) => set({ isSheetOpen: value }),
  toggleModal: (value) => set({ isModalOpen: value }),
  toggleForm: (value) => set({ isFormOpen: value }),
}));