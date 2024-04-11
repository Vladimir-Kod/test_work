import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, getCardsDataTC } from "./cards-reducer";
import { AppStateType } from "../../app/store";
import { Select, Space } from 'antd';
import { Button, Flex } from 'antd';
import { CustomCard } from "../../components/customCard";
import { Spinner } from "../../components/spinner";
import { useNavigate } from "react-router-dom";
import './cards.css';


export const Cards = () => {

    const dispatch = useDispatch();
    const cardsData = useSelector((state: AppStateType) => state.cardsReducer.cardsData);
    const isLoading = useSelector((state: AppStateType) => state.cardsReducer.isLoading);
    const isError = useSelector((state: AppStateType) => state.cardsReducer.isError);
    const connectedValue = useSelector((state: AppStateType) => state.cardsReducer.connectedValue);
    const departamentValue = useSelector((state: AppStateType) => state.cardsReducer.departamentValue);
    const navigate = useNavigate()

    const [connectedFilterValue, setConnectedFilterValue] = useState<number | null>(connectedValue);
    const [deportamentFilterValue, setDeportamentFilterValue] = useState<number | null>(departamentValue);

    useEffect(() => {
        cardsData.brigadesData.length === 0 && dispatch(getCardsDataTC());
    }, []);

    const filterData = () => {
        let filteredData = cardsData.brigadesData;
        if (connectedFilterValue !== null) {
            filteredData = filteredData.filter(el => el.connectionStateId === connectedFilterValue);
        }
        if (deportamentFilterValue !== null) {
            filteredData = filteredData.filter(el => el.department.id === deportamentFilterValue);
        }
        return filteredData;
    };

    const connectedHandleChange = (value: string) => {
        setConnectedFilterValue(+value);
        dispatch(actions.setConnectedValue(+value))
    };

    const deportamentHandleChange = (value: string) => {
        setDeportamentFilterValue(+value);
        dispatch(actions.setDepartamentValue(+value))
    };


    return (
        <div className="cards__wrapper">
            {isLoading && <Spinner />}
            <Flex gap="small" wrap="wrap">
                <Button className="cards__navigate_button" onClick={() => navigate('/diagram')} type="primary">К диаграмме</Button>
            </Flex>

            <Space className="cards__select__wrapper" wrap>
                <Select
                    value={connectedFilterValue !== null 
                        ? cardsData.connectionState.find(el => el.connectionStateId === connectedFilterValue)?.name 
                        : undefined}
                    className="cards__select__connecting"
                    placeholder="Доступность"
                    onChange={connectedHandleChange}
                    options={cardsData.connectionState.map(el => ({ value: el.connectionStateId, label: el.name }))}
                /> 
                <Select
                    value={deportamentFilterValue !== null 
                        ? cardsData.departments.find(el => el.id === deportamentFilterValue)?.name 
                        : undefined}
                    className="cards__select__deportament"
                    placeholder="Департамент"
                    onChange={deportamentHandleChange}
                    options={cardsData.departments.map(el => ({ value: el.id, label: el.name }))}
                /> 
            </Space>

            <p className={isError ? "cards__error__info" : "cards__error__info--hide"}>Что-то пошло не так!</p>

            <CustomCard filteredData={filterData()} cardsData={cardsData} />
        </div>
    );
};
