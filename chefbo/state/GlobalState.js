import { createContext, useReducer, useEffect, useContext } from 'react'
import reducers from './Reducers'
import { createStore} from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'





const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }
  
const initialState = { Cart: [], customer: {}, subtotal: 0, tips: 0, lunch: [], lunchInCart: 0};
// const store = createStore(reducers, initialState)
const store = createStore(
    persistReducer(persistConfig, reducers),
    initialState,
   );

export default store;