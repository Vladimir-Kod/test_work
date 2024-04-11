import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { DiagramReducer } from "../features/diagram/diagram-reducer";
import { CardsReducer } from "../features/cards/cards-reducer";

const RootReducer = combineReducers({
    diagramReducer: DiagramReducer,
    cardsReducer: CardsReducer,
})

export const store=createStore(RootReducer,applyMiddleware(thunk))


export type AppStateType = ReturnType<typeof RootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

export type ActionTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<
    T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<ActionTypes<T>>