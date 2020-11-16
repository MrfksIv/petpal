import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import {getUserAccount} from '../graphql/queries';
import React, {ReactElement} from 'react';
import {navigateToAuthPage} from '../utils/client-utils';

const GET_USER = gql(getUserAccount)

export const UserAccount: React.FC = (): ReactElement => {
    const {loading, data, error} = useQuery(GET_USER, {variables: {token: localStorage.getItem('id_token')}});

    if (error && error.message && error.message.indexOf('401')) {
        navigateToAuthPage();
    }
    console.log('DATA:', data);

    return <h3>{data ?  data.getUserAccount.email : 'n/a' }</h3>

}
