import { Card } from 'antd';
import { BrigadesDataType, cardsDataType } from "../../features/cards/cards-reducer";
import { CheckIcon } from '../../assets/icon/CheckIcon';
import { DisconnectIcon } from '../../assets/icon/DisconnectIcon';
import './customCard.css';

type CustomCardType = {
    filteredData: BrigadesDataType[]
    cardsData: cardsDataType
}

export const CustomCard = (props: CustomCardType) => {
    const {filteredData, cardsData} = props

    return (
        <div className='card__root'>
         {filteredData ? filteredData.map(el => {
                return (
                        <Card key={el.id} 
                        size="small" 
                        title={el.brigade_name} 
                        bordered={false}  
                        style={{minWidth: "100px",  boxShadow: '1px 0 10px rgba(0, 0, 0, 0.1)' }} // оставил инлайн стили т.к. через className не отрабатывали
                        >

                            <h3>{cardsData.departments.find(item => item.id === el.department.id)?.name}</h3>
                            <div className='card__discription'>
                                <p>
                                    <span className={`card__discription__paragraph--bold ${el.connectionStateId === 1 ? 'green' : 'red'}`}>
                                        Соединение: 
                                    </span>
                                    <span className={el.connectionStateId === 1 ? 'green' : 'red'}>
                                        {cardsData.connectionState
                                        .find(item => item.connectionStateId === el.connectionStateId)?.name === "Доступен "
                                            ? ' В норме '
                                            : ' Нет связи '
                                        }
                                    </span>
                                    <span>{el.connectionStateId === 1 ? <CheckIcon /> : <DisconnectIcon />}</span>
                                </p>
                                <p><span className='card__discription__paragraph--bold'>Кластер: </span><span>{el.position.cluster}</span></p>
                                <p><span className='card__discription__paragraph--bold'>Поле: </span><span>{el.position.field}</span></p>
                                <p><span className='card__discription__paragraph--bold'>Скважина: </span><span>{el.position.well}</span></p>
                            </div>

                        </Card>
                )
            }) : 'No data'}
        </div>
    )
}