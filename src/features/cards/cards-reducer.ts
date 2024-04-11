
import { CardsAPI } from "../../api";
import { AppThunk, InferActionsTypes } from "../../app/store";


const initialStat: stateCardsDataType = {
    cardsData: {
        brigadesData: [],
        departments: [],
        connectionState: [],
    },
    isLoading: false,
    isError: false,
    connectedValue: null,
    departamentValue: null,
};

export const CardsReducer = (state: stateCardsDataType = initialStat, action: CardsActions): stateCardsDataType => {
    switch (action.type) {
        case 'CardsReducer/SET_DATA':
            return {
                ...state,
                cardsData: action.data
            };
        case 'CardsReducer/SET_ISLOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'CardsReducer/SET_IS_ERROR':
            return {
                ...state,
                isError: action.isError
            };
        case 'CardsReducer/SET_CONNECTED_VALUE':
            return {
                ...state,
                connectedValue: action.connectedValue
            };
        case 'CardsReducer/SET_DEPARTAMENT_VALUE':
            return {
                ...state,
                departamentValue: action.departamentValue
            };

        default:
            return state;
    }
};

export const actions = {
    setDataCard: (data: cardsDataType) =>
        ({ type: 'CardsReducer/SET_DATA', data } as const),
    setIsLoading: (isLoading: boolean) =>
        ({ type: 'CardsReducer/SET_ISLOADING', isLoading } as const),
    setIsError: (isError: boolean) =>
        ({ type: 'CardsReducer/SET_IS_ERROR', isError } as const),
    setConnectedValue: (connectedValue: number | null) =>
        ({ type: 'CardsReducer/SET_CONNECTED_VALUE', connectedValue } as const),
    setDepartamentValue: (departamentValue: number | null) =>
        ({ type: 'CardsReducer/SET_DEPARTAMENT_VALUE', departamentValue } as const),
}


export const getCardsDataTC = (): AppThunk => async (dispatch) => {
    dispatch(actions.setIsLoading(true))

    try {
        const responses = await Promise.all([
            CardsAPI.getBrigadesData(),
            CardsAPI.getDepartments(),
            CardsAPI.getConnectionState()
        ]);

        const newCardsData: cardsDataType = {
            brigadesData: responses[0].data,
            departments: responses[1].data,
            connectionState: responses[2].data,
        }

        dispatch(actions.setDataCard(newCardsData))
        console.log('CardsData in reducer', newCardsData)

    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(actions.setIsError(true))
    } finally {
        dispatch(actions.setIsLoading(false));
    }

}

export type CardsActions = InferActionsTypes<typeof actions>

type PositionType = {
    field: string
    cluster: number
    well: number
}

export type BrigadesDataType = {
    id: number
    brigade_name: string
    connectionStateId: number
    department: { id: number }
    position: PositionType
}

type DepartmentsType = {
    id: number
    name: string
}

type ConnectionStateType = {
    connectionStateId: number
    name: string
}

export type cardsDataType = {
    brigadesData: BrigadesDataType[],
    departments: DepartmentsType[],
    connectionState: ConnectionStateType[]
}

type stateCardsDataType = {
    cardsData: cardsDataType
    isLoading: boolean
    isError: boolean
    connectedValue: number | null
    departamentValue: number | null
}

