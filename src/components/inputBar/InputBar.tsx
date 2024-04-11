import { InputNumber, Button, Flex } from 'antd';
import { memo, useState } from 'react';
import './inputBar.css'

type InputBarType = {
    onClick: (newPoint: string, currentPoint: number) => void
    maxValue?: number
    minValue?: number
    placeholder?: string
    titleButton: string
    isLoading: boolean
    currentPoint: number | null

}
export const InputBar = memo((props: InputBarType) => {

    const { onClick, maxValue = 1000, minValue = 1, placeholder = '', titleButton, isLoading, currentPoint } = props
    const [inputValue, setInputValue] = useState<number | null>(currentPoint);
    //maxValue ограничил до 1000 потому что на 10 000 уже интерфейс тяжело отрабатывает не говоря уже о 1 000 000 точек

    const onChange = (value: number | null) => {
        setInputValue(value);
    };

    const onclickButtonHandler = () => {
        if (inputValue) {
            onClick(inputValue.toString(), inputValue)
        }
    }

    return (
        <div className='inputbar__wrapper'>
            <InputNumber
                className='inputbar__input'
                min={minValue} max={maxValue}
                value={inputValue}
                placeholder={placeholder}
                onChange={onChange} />
            <Flex gap="small" wrap="wrap">
                <Button disabled={isLoading} onClick={onclickButtonHandler} type="primary">{titleButton}</Button>
            </Flex>
        </div>
    )
})