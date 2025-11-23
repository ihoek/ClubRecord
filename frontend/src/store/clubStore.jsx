import { create } from "zustand";
import { persist } from "zustand/middleware";

const clubStore = create(
  persist(
    (set, get) => ({
      club: null,
      setClub: (club) => set({ club }),
    }),
    { name: "club" }
  )
);

export default clubStore;
