import React, { useEffect, useState } from 'react';
import useAuthorizedHttp from '../../hooks/use-authorized-http';
import EditPages from './EditPages';

function EditPagesContainer(props) {
    const [marketplace, setMarketplace] = useState();
    const makeRequest = useAuthorizedHttp();

    useEffect(() => {
        makeRequest(
            {
                url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/user/marketplace/list`
            },
            (data) => {
                setMarketplace(data[0]);
            },
            (data) => {
                console.log(data);
            },
            () => {}
        );
    }, [makeRequest]);

    return (
        <div className='flex flex-col gap-4 '>
            <EditPages marketplace={marketplace ?? marketplace} />
            {props.children}
        </div>
    );
}

export default EditPagesContainer;
