import {
    DarkModeRounded,
    DashboardRounded,
    Email,
    KeyboardArrowRightRounded,
    LightModeRounded,
    Newspaper,
    Outbound,
    PermDataSettingOutlined,
    PolylineRounded,
    StorefrontRounded,
    TokenRounded,
    Upload,
    WebAssetRounded
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import DescriptionIcon from '@mui/icons-material/Description';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import React from "react"
import useAuthorizedHttp from '../../hooks/use-authorized-http';

const expandButtonClasses = {
    entering: 'rotate-180',
    entered: 'rotate-180',
    exiting: 'rotate-0',
    exited: 'rotate-0'
};

const expandedSidebarClasses = {
    entering: 'w-[100vw] md:w-[350px]',
    entered: 'w-[100vw] md:w-[350px]',
    exiting: 'w-[75px]',
    exited: 'w-[75px]'
};

const Sidebar = () => {
    const [marketplace, setMarketplace] = useState();
    const location = useLocation();
    const makeRequest = useAuthorizedHttp();
    const [highLightButton, setHighLightButton] = useState('');
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
            () => { }
        );
        // if (location.pathname.startsWith(props.navigate)) setSelected(true);

        // if (window.location.toString().includes('upload-logo')) {
        //     setHighLightButton('upload');
        // }
        // if(window.location.toString().includes('edit-')){
        //     setHighLightButton("edit-")
        // }
        // console.log(highLightButton)
    }, [makeRequest]);

    const navigate = useNavigate();
    const [expandMarketplaceCustomization, setExpandMarketplaceCustomization] = useState(true);
    const [expandNfts, setExpandNfts] = useState(false);
    const [isExpanded, setExpanded] = useState(true);
    const appCtx = useSelector((state) => state.app);
    let activeClassName = ""

    return (
        <Transition in={isExpanded} timeout={500}>
            {(state) => (
                <div
                    className={`${expandedSidebarClasses[state]} pt-[70px] z-20 md:relative fixed overflow-x-hidden h-[100vh] dark:bg-gray-700 bg-white  flex flex-col transition-all ease-out duration-500 shadow-sideBar`}
                >

                    {isExpanded && expandMarketplaceCustomization && (
                        <div className="bg-inherit p-3 flex flex-col items-start pl-16 gap-5">
                            {/* <button
                                className={`flex gap-3 ${highLightButton === 'upload' && 'text-secPurple'}`}
                                onClick={() => {
                                    navigate('/marketplace/upload-logo');
                                    setHighLightButton('upload');
                                }}
                            > */}
                            {/* <img
                                    className="h-6 w-5"
                                    src={`/icons/${highLightButton === 'upload' ? 'purple-header' : 'header'}.svg`}
                                ></img> */}
                            {/* <CallToActionOutlinedIcon className="transform rotate-180" />

                                <div>Header</div>
                            </button> */}
                            <NavLink
                                to="/marketplace/update-header"
                                className={({ isActive }) =>
                                    isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                                }
                            >
                                <div className="flex gap-1 items-center">
                                    <CallToActionOutlinedIcon className="transform rotate-180" />

                                    <div>Header</div>
                                </div>
                            </NavLink>
                            <NavLink
                                to={`/marketplace/edit-home-page?marketplaceId=${marketplace?.marketplaceId}&marketplaceName=${marketplace?.name}&domain=${marketplace?.domain}`}
                                className={({ isActive }) =>
                                    isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                                }
                            >
                                <div className="flex gap-1 items-center">
                                    <DescriptionIcon />
                                    <div>Pages</div>
                                </div>
                            </NavLink>

                            {/* <NavLink
                                to={`/marketplace/edit-footer-page?marketplaceId=${marketplace?.marketplaceId}&marketplaceName=${marketplace?.name}&domain=${marketplace?.domain}`}
                                className={({ isActive }) =>
                                    isActive ? 'text-secPurple no-underline' : 'no-underline text-inherit'
                                }
                            >
                                <div className="flex gap-1 items-center">
                                    <CallToActionOutlinedIcon />
                                    <div>Footer</div>
                                </div>
                            </NavLink> */}
                            <button
                                className={`flex gap-3`}
                                onClick={() => {
                                    window.open(`http://${marketplace?.domain}`);
                                    setHighLightButton('domain');
                                }}
                            >
                                <Outbound />
                                <div>Visit Event Page</div>
                            </button>

                            {/* <button
                                className={`flex gap-3 ${highLightButton === 'edit-' && 'text-secPurple'} `}
                                onClick={() => {
                                    navigate(
                                        `/marketplace/edit-home-page?marketplaceId=${marketplace?.marketplaceId}&marketplaceName=${marketplace?.name}&domain=${marketplace?.domain}`
                                    );
                                    setHighLightButton('edit-');
                                }}
                            >
                               
                                <DescriptionIcon />
                                <div>Pages</div>
                            </button> */}

                            {/* <button
                                className={`flex gap-3 ${highLightButton === 'footer' && 'text-secPurple'}`}
                                onClick={() => {
                                    navigate(
                                        `/marketplace/edit-footer-page?marketplaceId=${marketplace?.marketplaceId}&marketplaceName=${marketplace?.name}&domain=${marketplace?.domain}`
                                    );
                                    setHighLightButton('footer');
                                }}
                            >
                                
                                <CallToActionOutlinedIcon />
                                <div>Footer</div>
                            </button> */}
                            {/* <button
                                className={`flex gap-3 ${highLightButton === 'domain' && 'text-secPurple'}`}
                                onClick={() => {
                                    window.open(`http://${marketplace?.domain}`);
                                    setHighLightButton('domain');
                                }}
                            >
                                <Outbound />
                                <div>Visit Marketplace</div>
                            </button> */}
                        </div>
                    )}

                </div>
            )}
        </Transition>
    );
};

export default Sidebar;
