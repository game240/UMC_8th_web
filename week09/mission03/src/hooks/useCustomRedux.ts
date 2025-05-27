import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch } from "../store/store";
import type { RootState } from "../store/store";

export const useDispatch = () => useDefaultDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
