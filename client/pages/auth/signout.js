import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';


export default () => {
    const { doRequest } = useRequest()
    useEffect(() => {
        doRequest({
            url: '/api/users/signout',
            method: 'post',
            body: {},
            onSuccess: () => Router.push('/')
        });
    }, []);
    return <div>Signing you out...</div>;
};
