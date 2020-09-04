import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import {getUserAccount} from '../graphql/queries';
import React, {ReactElement} from 'react';

const GET_USER = gql(getUserAccount)

export const UserAccount: React.FC = (): ReactElement => {
    const {loading, data, error} = useQuery(GET_USER, {variables: {token: localStorage.getItem('id_token')}});
    console.log('DATA:', data);

    return <h3>{data ?  data.getUserAccount.email : 'n/a' }</h3>

}
