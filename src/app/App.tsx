import React, { useState, useEffect, useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type PointDataType = {
    x: string
    y: number
}

function App(props: HighchartsReact.Props) {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [BrigadesData, setBrigadesData] = useState<any>(null);
    const [Departments, setDepartments] = useState<any>(null);
    const [ConnectionState, setConnectionState] = useState<any>(null);
    const [Points, setPoints] = useState<any>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [pointValue, setPointValue] = useState<string>('0');


    const options: Highcharts.Options = {
        title: {
            text: 'My chart'
        },
        yAxis: {
            title: {
                text: 'Значение точки',
                style: {
                    color: 'red' // Установка красного цвета для текста оси Y
                }
            },
            labels: {
                style: {
                    color: 'red' // Установка красного цвета для меток на оси Y
                }
            },
        },
        xAxis: {
            categories: !Points ? [] : Points.map((el: PointDataType) => el.x.slice(0,16)),
            plotLines: [{ // Добавление линии по оси Y
                value: 0, // Значение, где должна быть линия
                color: 'red', // Цвет линии
                width: 2, // Ширина линии
                zIndex: 5 // Индекс слоя, чтобы линия находилась поверх остальных элементов графика
            }]

        },
        series: [{
            name: 'Диаграмма',
            type: 'line',
            color: 'red', // Цвет линии
            lineWidth: 1, // Ширина линии
            step: 'left',
            data: !Points ? [] : Points.map((el:PointDataType) => el.y)

        }],

        tooltip: {
            formatter: function () {
                return `<p style="font-weight: bold">${this.x}</><p style="color: red">Значение точки: ${this.y}</p>`;
            },
            shared: true, // Совместное отображение тултипа для всех точек
            useHTML: true, // Использование HTML для форматирования содержимого
        },

    };

    useEffect(() => {
        fetchData();
    }, [pointValue]);

    const fetchData = async () => {
        try {
            const urls = [
                'https://v1336-api-test.onrender.com/getBrigadesData',
                'https://v1336-api-test.onrender.com/getDepartments',
                'https://v1336-api-test.onrender.com/getConnectionState',
                'https://v1336-api-test.onrender.com/getPointsFast?points=' + pointValue
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const jsonResponses = await Promise.all(responses.map(response => response.json()));

            setBrigadesData(jsonResponses[0]);
            setDepartments(jsonResponses[1]);
            setConnectionState(jsonResponses[2]);
            setPoints(jsonResponses[3]);

            console.log('BrigadesData:', jsonResponses[0]);
            console.log('Departments:', jsonResponses[1]);
            console.log('ConnectionState:', jsonResponses[2]);
            console.log('Points:', jsonResponses[3]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const changeInputHAndler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const buttonHandler = () => {
        setPointValue(inputValue)
        setInputValue('')

    }

    return (
        <div style={{ border: '1px solid red' }}>
            <h1>Hello world</h1>
            <input value={inputValue} type='text' onChange={changeInputHAndler}></input>
            <button onClick={buttonHandler}>Загрузить точки</button>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
                {...props}
            />

        </div>
    );
}

export default App;
