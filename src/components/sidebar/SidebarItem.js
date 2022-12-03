import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { appActions } from '../../context/app-slice';

const SidebarItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSelected, setSelected] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith(props.navigate  ) || (props.navto?.includes(location.pathname) )) setSelected(true);
        else setSelected(false);
    }, [location, props.navigate]);

    const handleClick = useCallback(() => {
        if (props.text === 'Switch to dark mode' || props.text === 'Switch to light mode') {
            dispatch(appActions.toggleDarkMode());
        } else {
            navigate(props.navigate);
        }
    }, [dispatch, navigate, props.navigate, props.text]);

    return (
        <button
            onClick={handleClick}
            className={`flex flex-row text-left gap-5 items-center font-light px-5 h-[60px] transition-all ease-out duration-300 ${props.className} ${
                isSelected
                    ? 'bg-secPurple text-slate-100  rounded-md'
                    : 'dark:text-slate-100 text-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
        >
            {props.icon}
            
            <div>{props.children}</div>

        </button>
    );
};

export default SidebarItem;
