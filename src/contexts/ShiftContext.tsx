import { createContext, useContext } from "react";
import { Dayjs } from 'dayjs';

// Define context type
interface ShiftContextType {
  currentShiftDate: Dayjs;
  setCurrentShiftDate: (value: Dayjs) => void;
  customizedHighlightFields: string[];
  setCustomizedHighlightFields: (value: string[]) => void;
}

// Create Context
export const ShiftContext = createContext<ShiftContextType>(null);

// Custom Hook to use the context
export const useShiftContext = () => useContext(ShiftContext);