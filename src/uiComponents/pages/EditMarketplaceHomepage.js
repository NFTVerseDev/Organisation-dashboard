import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import React from "react"
import useAuthorizedHttp from '../../hooks/use-authorized-http';
import PreviewContainer from '../../ui/PreviewContainer';
import BlueGradientButton from '../../ui/BlueGradientButton';
import EditPagesContainer from '../../components/marketplace-settings/EditPagesContainer';
import Input from '../../ui/Input';

const EditMarketplaceHomepage = (props) => {
    const [banner, setBanner] = useState();
    const [bannerPreview, setBannerPreview] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [buttonLabel, setButtonLabel] = useState('');
    const [buttonURL, setButtonURL] = useState("/explore");
    const [uploading, setUploading] = useState(false);
    const[logo,setLogo] = useState("")

    const url = new URL(window.location.href);
    const marketplaceId = url.searchParams.get('marketplaceId');
    const marketplaceName = url.searchParams.get('marketplaceName');
    const domain = url.searchParams.get('domain');

    const fileRef = useRef();

    const makeRequest = useAuthorizedHttp();

    const navigate = useNavigate();

    const appCtx = useSelector((state) => state.app);

    useEffect(() => {
        makeRequest(
            {
                url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/localhost/page/home/detail`
            },
            (data) => {
                
                data.bannerImage && setBannerPreview(data.bannerImage);
                data.title && setTitle(data.title);
                data.logo && setLogo(data.logo)
                data.description && setDescription(data.description);
                data.buttonLabel && setButtonLabel(data.buttonLabel);
                data.buttonLink && setButtonURL(data.buttonLink);
            },
            (data) => console.log(data),
            () => {}
        );

    }, [domain, makeRequest]);

 

    useEffect(() => {
        if (!banner) return;

        const preview = URL.createObjectURL(banner);
        setBannerPreview(preview);
        return () => URL.revokeObjectURL(preview);
    }, [banner]);

    const handleSaveClick = () => {
        let flag = true;
        if (!banner && !bannerPreview) {
            flag = false;
            toast.error("Banner can't be empty!");
        }
        if (!title) {
            flag = false;
            toast.error("Title can't be empty!");
        }
        if (!description) {
            flag = false;
            toast.error("Description can't be empty!");
        }
        if (!buttonLabel) {
            flag = false;
            toast.error("Button label can't be empty!");
        }
        if (!buttonURL) {
            flag = false;
            toast.error("Button URL can't be empty!");
        }

        if (flag) {
            setUploading(true);
            const data = new FormData();
            data.append('file', banner);

            let config = {
                method: 'post',
                url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/${marketplaceId}/file/upload`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Auth-Token': appCtx.authToken
                },
                data: data
            };

            toast.promise(
                () =>
                    axios(config)
                        .then(function (response) {
                            const marketplace = {
                                description,
                                title,
                                buttonLabel,
                                buttonLink: buttonURL,
                                marketplaceId,
                                page: 'home',
                                bannerImage: response.data.fileUrl
                            };
                            makeRequest(
                                {
                                    url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/page`,
                                    method: 'POST',
                                    data: marketplace
                                },
                                (data) => console.log(data),
                                (data) => console.log(data),
                                () => {
                                    setUploading(false);
                                }
                            );
                        })
                        .catch(function (error) {
                            toast.error('Uploading banner failed!');
                            setUploading(false);
                        }),
                {
                    pending: 'Updating your marketplace settings...',
                    success: 'Settings updated successfully!',
                    error: 'Uh-oh! Something went wrong'
                }
            );
        }
    };

    return (
        <>
            {/* <div className="text-2xl font-bold mx-auto mb-10">Edit your marketplace Home</div> */}
            <EditPagesContainer>
                <div className="grid grid-cols-6 gap-10 ">
                    <div className="col-span-2 flex flex-col gap-3  h-[60vh] edit-scrollbar p-2">
                        {/* <button className="text-sky-500 text-left" onClick={() => navigate('/marketplace')}>
                        <KeyboardArrowLeftRounded />
                        Back
                    </button> */}

                        <Input
                            
                            disabled={uploading}
                            type="text"
                            placeholder="Enter an appropriate title"
                            description="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <Input
                            disabled={uploading}
                            type="textarea"
                            placeholder="Enter an appropriate description"
                            description="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <div className="grid gap-1">
                            <label className="font-bold  dark:text-gray-400">Select banner</label>
                            <button
                                className=" py-4 bg-[#EDEDED] rounded-lg text-black  dark:text-gray-400 dark:bg-darkPrimary border flex items-center justify-center gap-4  "
                                disabled={uploading}
                                onClick={() => fileRef.current.click()}
                            >   <img src="/icons/brows.svg" alt ="" className='w-8 h-8'/>
                                Browse or Drag & Drop
                            </button>
                            <input
                                hidden={true}
                                ref={fileRef}
                                type="file"
                                onChange={(e) => setBanner(e.target.files[0])}
                            />
                        </div>
                      
                        <Input
                            disabled={uploading}
                            type="text"
                            placeholder="Explore"
                            description="Button label"
                            onChange={(e) => setButtonLabel(e.target.value)}
                            value={buttonLabel}
                        />
                        <Input
                            disabled={uploading}
                            type="text"
                            placeholder="/explore"
                            description="Button link"
                            onChange={(e) => setButtonURL(e.target.value)}
                            value={buttonURL}
                        />
             
                        
                        {/* <BlueGradientButton
                        disabled={uploading}
                        className="w-full"
                        onClick={() => navigate('/marketplace')}
                    >
                        Discard changes
                    </BlueGradientButton> */}
                    </div>
                    <div className='col-span-4 flex flex-col items-end'>
                    {/* <div className=" rounded-lg  flex flex-col shadow-prevBox bg-inherit dark:text-white h-[60vh] dark:border-darkBorder border-white border-[20px] dark:border-darkSecondary">
                        <div className="flex justify-around px-5 py-10">
                            <img className="h-8 w-8 rounded-full object-cover" src={logo} alt="logo" />  
                            <button className="text-xl font-light">{marketplaceName}</button>
                            <input className="outline-none dark:bg-darkBorder rounded-xl bg-[#D6D6D6]" type="text" />
                            <button className="">Explore</button>
                            <div className="flex gap-5 items-center">
                               
                                <button className="w-5 h-6">
                                    <AccountBalanceWalletIcon />
                                </button>
                                <AccountCircleIcon/>
                            </div>
                        </div>
                        <div className=" h-full px-20 gap-10">
                            <div className="flex flex-col items-start justify-center gap-5 ">
                                <div className="text-4xl font-bold">{title}</div>
                                <div className="text-2xl">{description}</div>
                                <button
                                    className="w-[200px] dark:bg-white bg-black  text-white dark:text-black py-3 font-bold rounded-md"
                                    onClick={() => window.open('https://' + buttonURL)}
                                >
                                    {buttonLabel}
                                </button>
                            </div>
                            <div className="flex items-center justify-end">
                                {!bannerPreview && <div className="text-2xl">Select your banner image</div>}
                                {bannerPreview && (
                                    <img
                                        alt="Banner"
                                        src={bannerPreview}
                                        className="object-cover rounded-lg max-h-[250px]"
                                    />
                                )}
                            </div>
                        </div>
                    </div> */}
                    <PreviewContainer>
                    <div className="flex h-full px-10 gap-10">
                            <div className="flex flex-col items-start justify-center gap-5 ">
                                <div className="text-xl font-bold">{title ||"Title"}</div>
                                <div className="text-lg">{description || "Description"}</div>
                                <button
                                    className="w-[200px] dark:bg-white bg-black  text-white dark:text-black py-3 font-bold rounded-md"
                                    onClick={() => window.open('https://' + buttonURL)}
                                >
                                    {buttonLabel||"Explore"}
                                </button>
                            </div>
                            <div className="flex items-center justify-end">
                                {!bannerPreview && <div className="text-2xl">Select your banner image</div>}
                                {bannerPreview && (
                                    <img
                                        alt="Banner"
                                        src={bannerPreview}
                                        className="object-cover rounded-lg max-h-[250px]"
                                    />
                                )}
                            </div>
                        </div>
                        </PreviewContainer>
                    <BlueGradientButton disabled={uploading} className="py-2 mt-3 w-48" onClick={handleSaveClick}>
                            Save
                        </BlueGradientButton>
                        </div>
                </div>
            </EditPagesContainer>
        </>
    );
};

export default EditMarketplaceHomepage;
