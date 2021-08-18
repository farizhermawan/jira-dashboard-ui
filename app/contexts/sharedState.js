import {createContext, useContext} from 'react';

export const SharedStateContext = createContext(null);

export function useSharedState() {
  return useContext(SharedStateContext);
}
