// src/store/useTripSearchStore.js
import { create } from 'zustand';

export const useTripSearchStore = create((set) => ({
  // القيم الابتدائية (يمكنك تعديل التاريخ الافتراضي ليطابق تاريخ اليوم أو ما يناسبك)
  originId: "",
  destinationId: "",
  tripDate: "2026-11-06",
  passengers: "1",

  // دوال لتحديث كل حقل على حدة
  setOriginId: (originId) => set({ originId }),
  setDestinationId: (destinationId) => set({ destinationId }),
  setTripDate: (tripDate) => set({ tripDate }),
  setPassengers: (passengers) => set({ passengers }),

  // دالة لتبديل مدينتي الانطلاق والوصول
  swapCities: () =>
    set((state) => ({
      originId: state.destinationId,
      destinationId: state.originId,
    })),
}));