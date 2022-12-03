import {EditRounded, OpenInNewRounded, Storefront} from "@mui/icons-material";
import React from "react"

const MarketplaceDomain = (props) => {

    return (
        <div className="grid gap-10">
            <div className="text-xl font-bold">Your domains</div>
            <div className="grid grid-cols-2">
                <div
                    className="rounded-lg dark:bg-gray-700 hover:dark:bg-gray-600 bg-gray-100 hover:bg-gray-200 p-5 transition-all ease-out duration-300 flex items-center gap-5">
                    <div
                        className="w-[60px] h-[60px] flex items-center justify-center bg-gray-300 dark:bg-gray-500 rounded-full">
                        {props.marketplace.logo ? (
                            <img
                                className="w-[60px] h-[60px] rounded-full"
                                src={props.marketplace.logo}
                                alt="LOGO"
                            />
                        ) : (
                            <Storefront fontSize="large"/>
                        )}
                    </div>
                    <div className="flex-grow flex justify-between">
                        <div className="grid">
                            <div className="text-xl font-bold">{props.marketplace.name}</div>
                            <div>{props.marketplace.domain}</div>
                        </div>
                        <div className={'flex flex-col justify-between'}>
                            <button onClick={() => window.open("http://" + props.marketplace.domain)}>
                                <OpenInNewRounded/>
                            </button>
                            <button onClick={props.toggleEditDomain}>
                                <EditRounded/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceDomain;
