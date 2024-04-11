import { useState, useEffect, useRef, useCallback } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../app/store';
import { PointDataType, actions, getPointsTC } from './diagram-reducer';
import { InputBar } from '../../components/inputBar';
import { Spinner } from '../../components/spinner';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from 'antd';
import './diagram.css'


export const Diagram = (props: HighchartsReact.Props) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [pointValue, setPointValue] = useState<string>('');

    const dispatch = useDispatch();
    const points = useSelector((state: AppStateType) => state.diagramReducer.pointsData)
    const isLoading = useSelector((state: AppStateType) => state.diagramReducer.isLoading)
    const isError = useSelector((state: AppStateType) => state.diagramReducer.isError)
    const currentPoint = useSelector((state: AppStateType) => state.diagramReducer.currentPoint)
    const navigate = useNavigate()


    const options: Highcharts.Options = {
        title: {
            text: 'My Diagram'
        },
        yAxis: {
            title: {
                text: 'Значение точки',
                style: {
                    color: 'red'
                }
            },
            labels: {
                style: {
                    color: 'red'
                }
            },
        },
        xAxis: {
            categories: !points ? [] : points.map((el: PointDataType) => el.x.slice(0, 16)),
            plotLines: [{
                value: 0,
                color: 'red',
                width: 2,
                zIndex: 5
            }]

        },
        series: [{
            name: 'Диаграмма',
            type: 'line',
            color: 'red',
            lineWidth: 1,
            step: 'left',
            data: !points ? [] : points.map((el: PointDataType) => el.y)

        }],

        tooltip: {
            formatter: function () {
                return `   <p style="font-weight: bold">${this.x} <p style="color: red">Значение точки: ${this.y}</p>`;
            },
            shared: true,
            useHTML: true,
        },

    };

    useEffect(() => {

        if (pointValue) {
            dispatch(getPointsTC({ pointValue, isError }))
        }
    }, [pointValue]);

    const onclickButtonHandler = useCallback((value: string, currentPoint: number) => {
        setPointValue(value)
        dispatch(dispatch(actions.setCurrentPoint(currentPoint)))
    }, [])

    return (
        <>
            {isLoading && <Spinner />}
            <div className={`${!isLoading ? 'diagram__wrapper' : 'diagram__wrapper--opacity'}`}>

                <Flex gap="small" wrap="wrap">
                    <Button className='diagram__navigate_button' onClick={() => navigate('/')} type="primary">К карточкам</Button>
                </Flex>

                <InputBar
                    onClick={onclickButtonHandler}
                    titleButton='Загрузить точки'
                    placeholder='Кол-во точек'
                    isLoading={isLoading}
                    currentPoint={currentPoint}
                />

                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartComponentRef}
                    {...props}
                />

                <p className={isError ? 'diagram__natification' : 'diagram__natification--opacity'}>Что-то пошло не так</p>

            </div>
        </>
    )
}