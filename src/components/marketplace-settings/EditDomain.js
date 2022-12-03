import ModalOverlay from "../common/ModalOverlay";
import Input from "../../ui/Input";
import {useCallback, useState} from "react";
import BlueGradientButton from "../../ui/BlueGradientButton";
import {CloseRounded} from "@mui/icons-material";
import useAuthorizedHttp from "../../hooks/use-authorized-http";
import {toast} from "react-toastify";
import React from "react"

const EditDomain = props => {
    const [name, setName] = useState(props.marketplace.domain.split('.')[0]);
    const [loading, setLoading] = useState(false);
    const makeRequest = useAuthorizedHttp();

    const handleSaveClick = useCallback(() => {
        if (!name) {
            toast.error("Domain name can't be empty!");
            return;
        }

        toast.promise(() => makeRequest({
            url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace`,
            method: 'put',
            data: {
                marketplaceId: props.marketplace.marketplaceId,
                domain: name+process.env.REACT_APP_MARKETPLACE_DOMAIN
            }
            },
            () => {props.toggleEditDomain(); window.location.href='/marketplace'}
            ), {
            pending: 'Updating your domain...',
            success: 'Successfully updated your domain!',
            error: "Couldn't update your domain!"
        });
    }, [makeRequest, name, props.marketplace.marketplaceId]);

    return <ModalOverlay>
        <div className={'rounded-lg h-fit w-[500px] dark:bg-slate-800 bg-gray-200 border-2 border-gray-500 p-10 dark:text-gray-300 grid gap-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-xl font-bold'}>Change your domain name</div>
                <button className={'text-rose-500'} onClick={props.toggleEditDomain}>
                    <CloseRounded />
                </button>
            </div>
            <Input
                type={'text'}
                value={name}
                disabled={loading}
                placeholder={'Type your new domain name'}
                onChange={e => setName(e.target.value)}
            />
            <BlueGradientButton onClick={handleSaveClick} className={'w-full'}>Save</BlueGradientButton>
        </div>
    </ModalOverlay>
}

export default EditDomain;