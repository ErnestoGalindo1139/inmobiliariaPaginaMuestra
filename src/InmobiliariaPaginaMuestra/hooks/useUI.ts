import { useContext } from 'react';
import { UIContext, UIContextProps } from '../context/UIContext';

export const useUI = (): UIContextProps => useContext(UIContext);
