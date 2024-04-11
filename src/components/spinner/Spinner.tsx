import { Flex, Spin } from 'antd';
import './spinner.css'

export const Spinner = () => {
    return (
        <Flex className="cards__spinner" gap="small" vertical >
            <Spin size="large">
                <div className="content" />
            </Spin>
        </Flex>
    )
}