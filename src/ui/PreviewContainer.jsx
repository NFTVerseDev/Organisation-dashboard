import React, { useEffect, useState } from 'react';
import useAuthorizedHttp from '../hooks/use-authorized-http';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function PreviewContainer(props) {
    const makeRequest = useAuthorizedHttp();
    const [marketplace, setMarketplace] = useState();
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
        <div className="col-span-3 rounded-lg  flex flex-col gap-10 items-start p-4 dark:bg-inherit bg-[#F8FAFC] shadow-prevBox dark:text-white border-white border-[20px] dark:border-darkBorder">
            <div className="flex justify-evenly w-full items-center ">
                {marketplace?.logo && <img src={`${marketplace?.logo}`}className="w-10 h-10 rounded-full" alt="logo" />}
            
                <button className="text-xl font-light">{marketplace?.name}</button>
                <input className="outline-none dark:bg-darkBorder bg-[#D6D6D6] rounded-xl py-1 px-2 w-1/3" type="text" />
                <button className="">Explore</button>
              
                    <button className="w-5 h-6">
                        <AccountBalanceWalletIcon/>
                    </button>
                    <AccountCircleIcon />
             
            </div>
            <div className="text-2xl font-bold">{props.page}</div>
            {props.children}
        </div>
    );
}

export default PreviewContainer;
