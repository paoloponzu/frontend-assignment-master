import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const SearchInput = (props) => {
    return (
        <div className="centered">
            <Input
                className="custom-col csz-20"
                placeholder="Pokemons by name"
                value={props.value}
                onChange={(event) => {
                    props.handleChange(event.target.value)
                }} />

            <Button
                className="custom-col csz-8 mrg-left3"
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => {
                    props.getData(props.value)
                }}>
                Search
            </Button>
        </div>
    )

}
export default SearchInput;