import React, {Component, FunctionComponent} from "react";
import { Select } from 'antd';
import {useTranslation} from 'react-i18next';

const { Option } = Select;

export const LanguageSelector: FunctionComponent = (props) => {
    const { i18n } = useTranslation();

    const handleChange = async (value: string) => {
        await i18n.changeLanguage(value);
        localStorage.setItem('lang', value);
    };

    return (
        <div>
            <Select defaultValue="en" size='small' onChange={handleChange}>
                <Option value="en">English</Option>
                <Option value="gr">Ελληνικά</Option>
            </Select>
        </div>
    )
};




