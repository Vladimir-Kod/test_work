import { PointsApi } from "../../api";
import { AppThunk, InferActionsTypes } from "../../app/store";

const initialStat: statePointType = {
    pointsData: [],
    isError: false,
    isLoading: false,
    currentPoint: null
};

export const DiagramReducer = (state: statePointType = initialStat, action: DiagramActions): statePointType => {
    switch (action.type) {
        case 'DiagramReducer/SET_POINTS':
            return {
                ...state,
                pointsData: action.points
            };
        case 'DiagramReducer/SET_IS_ERROE':
            return {
                ...state,
                isError: action.isError
            };
        case 'DiagramReducer/SET_IS_LOADED':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'DiagramReducer/SET_CURRENT_POINT':
            return {
                ...state,
                currentPoint: action.currentPoint
            };

        default:
            return state;
    }
};

export const actions = {
    setPoints: (points: PointDataType[]) =>
        ({ type: 'DiagramReducer/SET_POINTS', points } as const),
    setIsError: (isError: boolean) =>
        ({ type: 'DiagramReducer/SET_IS_ERROE', isError } as const),
    setIsLoading: (isLoading: boolean) =>
        ({ type: 'DiagramReducer/SET_IS_LOADED', isLoading } as const),
    setCurrentPoint: (currentPoint: number) =>
        ({ type: 'DiagramReducer/SET_CURRENT_POINT', currentPoint } as const),
}

export const getPointsTC = (getPointsData: { pointValue: string, isError: boolean }): AppThunk => async (dispatch) => {

    dispatch(actions.setIsLoading(true))

    if (getPointsData.isError) {
        dispatch(actions.setIsError(false));
    }

    try {
        const response = await PointsApi.getPoints(getPointsData.pointValue)
        dispatch(actions.setPoints(response.data))

    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(actions.setIsError(true))
    } finally {
        dispatch(actions.setIsLoading(false))
    }
}

export type DiagramActions = InferActionsTypes<typeof actions>
export type PointDataType = {
    x: string
    y: number
}
type statePointType = {
    pointsData: PointDataType[]
    isError: boolean
    isLoading: boolean
    currentPoint: number | null
}