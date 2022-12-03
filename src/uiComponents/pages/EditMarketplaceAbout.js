import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import React from "react"
import useAuthorizedHttp from '../../hooks/use-authorized-http';
import BlueGradientButton from '../../ui/BlueGradientButton';
import PreviewContainer from '../../ui/PreviewContainer';
import RichTextEditor from '../../common/RichTextEditor';
import EditPagesContainer from '../../components/marketplace-settings/EditPagesContainer';
import SuggestionTemplateContainer from '../../ui/SuggestionTemplateContainer';

const EditMarketplaceAbout = (props) => {
    const [about, setAbout] = useState('Edit about');
    const [uploading, setUploading] = useState(false);
    const [marketplace,setMarketplace] =useState()

    const url = new URL(window.location.href);
    const marketplaceId = url.searchParams.get('marketplaceId');
    const domain = url.searchParams.get('domain');

    const navigate = useNavigate();

    const makeRequest = useAuthorizedHttp();

    useEffect(() => {
        makeRequest(
            {
                url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/${domain}/page/about-us/detail`
            },
            (data) => {
                setAbout(data.description ? data.description : '');
            },
            (data) => console.log(data),
            () => {}
        );
    }, [domain, makeRequest]);

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

    const handleSaveClick = () => {
        if (!about) {
            toast.error("About can't be empty");
            return;
        }
        setUploading(true);

        const data = {
            description: about,
            marketplaceId,
            page: 'about-us'
        };

        toast.promise(
            () =>
                makeRequest(
                    {
                        data,
                        url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/page`,
                        method: 'POST'
                    },
                    (data) => {
                        console.log(data);
                    },
                    () => {
                        setUploading(false);
                    }
                ),
            {
                pending: 'Updating your marketplace settings...',
                success: 'Settings updated successfully!',
                error: 'Uh-oh! Something went wrong'
            }
        );
    };

    return (
        <>
            {/* <div className="text-2xl font-bold mx-auto mb-10">Edit your marketplace About Us</div> */}
            <EditPagesContainer>
                <div className="grid grid-cols-5  gap-10">
                    <div className="col-span-2 flex flex-col gap-5 items-center">
                        {/* <button className="text-sky-500 text-left" onClick={() => navigate('/marketplace')}>
                        <KeyboardArrowLeftRounded />
                        Back
                    </button> */}
                        <div className={'text-gray-800 h-[300px] mb-10'}>
                            <RichTextEditor value={about} onChange={(e) => setAbout(e)} />
                        </div>
                        <BlueGradientButton
                            disabled={uploading}
                            className=" flex justify-center px-24 text-white border"
                            onClick={handleSaveClick}
                        >
                            Save
                        </BlueGradientButton>
                        {/* <BlueGradientButton
                        disabled={uploading}
                        className="w-full"
                        onClick={() => navigate('/marketplace')}
                    >
                        Discard changes
                    </BlueGradientButton> */}
                    </div>
                    {/* <div className="col-span-2 rounded-lg  flex flex-col gap-10 items-start p-20 bg-prevBg shadow-prevBox text-white border-white border-[20px] dark:border-darkSecondary">
                    <div className="text-2xl font-bold">About Us</div>
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: about }} />
                </div> */}
                    <PreviewContainer page="About Us">
                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: about }} />
                    </PreviewContainer>
                </div>
                <div className="mt-7 flex flex-col">
                    <div className="text-2xl font-bold">About us template</div>
                    <SuggestionTemplateContainer setter={setAbout}>
                        Hi, welcome to our marketplace. We are one of the best NFT sellers in our current industry with
                        having more than X plus listed NFTs and Y sold NFTs on our marketplace. We have revolutionised
                        our industry by moving from the traditional way of representing our product to a better & unique
                        way of representing it in the form of NFTs. Our product has attracted customers from the gen z
                        generation to millennials. We provide complete ownership of the product to our buyers and a
                        secure and reliable way of doing transactions on our platform. With growing demands and tech for
                        web 3 products we are sure to disrupt the traditional way of doing things in our industry.
                    </SuggestionTemplateContainer>
                </div>
            </EditPagesContainer>
        </>
    );
};

export default EditMarketplaceAbout;
