import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type StateProps = {
  bears: number;
};

export type ActionsProps = {
  setBears: (bears: number) => void;
};

export type StoreProps = StateProps & ActionsProps;

const initialState = {
  bears: 0,
};

export const createZustandStore = create<StoreProps>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setBears: bears => set({ bears }),
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
