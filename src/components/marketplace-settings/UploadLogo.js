import { AccountBalance, AccountBalanceWallet, AccountCircle, Delete, ModeEdit } from "@mui/icons-material";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { appActions } from "../../context/app-slice";
import useAuthorizedHttp from "../../hooks/use-authorized-http";
import BlueButton from "../../ui/BlueButton";
import CancelIcon from '@mui/icons-material/Cancel';
import Input from "../../ui/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlueGradientButton from "../../ui/BlueGradientButton";
import { menuItemClasses } from "@mui/material";
import React from "react"
import HeaderMenuModal from "../../common/HeaderMenuModal";

const UploadLogo = (props) => {
	const [logo, setLogo] = useState();
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState();
	const [editName,setEditName] = useState(false);
	const appCtx = useSelector((state) => state.app);
	// const [newMarketplaceName,setNewMarketplaceName] = useState("");
	const [enableLink,setEnableLink] = useState(false)
	const [menuItems,setMenuItems] = useState([{name:"bhdjdd"},{name:"jhj"}])
	const navigate = useNavigate()
	const[openMenuModal,setOpenMenuModal] = useState(false);
	const dispatch  = useDispatch()
	const fileRef = useRef();
	let marketplace;
	const {target} = useParams()
	const makeRequest = useAuthorizedHttp();
	const [marketplaceId, setMarketplaceId] = useState();
	const [marketplaceName, setMarketplaceName] = useState();
	const [marketplaceDomain, setMarketplaceDomain] = useState();

	useEffect(() => {
		makeRequest(
			{
				url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/user/marketplace/list`,
			},
			(data) => {
				marketplace = data[0];
				setMarketplaceId(data[0].marketplaceId);
				setPreview(data[0].logo);
				setMarketplaceDomain(data[0].domain)
				
				setMarketplaceName(data[0].name)
			},
			(data) => {},
			() => {}
		);
	}, [makeRequest]);

	const handleLogoChange = useCallback((file) => {
		if (file) {
			setLogo(file);
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		}
	}, []);

	const openEditMenu = useCallback(()=>{
		navigate(`/marketplace/update-header/menuitem`)
	},[])
	const openAddMenuItem = useCallback(()=>{
		setOpenMenuModal(true);
	})
	const addMenuItem = useCallback((newItem)=>{
		setMenuItems((prev)=> [...prev,newItem])
	})
	const deleteMenuItem = useCallback((index)=>{
		
		const newMenuItems = menuItems.filter((item,i)=> i!==index)
		setMenuItems(newMenuItems)
		
	})

	const handleUpload = () => {
		console.log(logo);
		let flag = true;
		if (!logo) {
			toast.error("Logo can't be empty");
			flag = false;
		}
			if(editName && !marketplaceName ){
				toast.error("Marketplace name can't be empty");
				flag = false;
			}

		if (flag ) {
			setUploading(true);

			const data = new FormData();
			data.append("file", logo);

			let config = {
				method: "post",
				url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/${marketplaceId}/file/upload?type=marketplace-logo`,
				headers: {
					"Content-Type": "multipart/form-data",
					"X-Auth-Token": appCtx.authToken,
				},
				data: data,
			};

			toast.promise(
				() =>
					axios(config)
						.then(function (response) {
							const marketplace = {
								marketplaceId,
								logo: response.data.fileUrl,
								name:marketplaceName

							};
							makeRequest(
								{
									url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace`,
									method: "PUT",
									data: marketplace,
								},
								(data) => console.log(data),
								(data) => console.log(data),
								() => {
									setUploading(false);
									setEnableLink(true);
								}
							);
						})
						.catch(function (error) {
							toast.error("Uploading banner failed!");
							setUploading(false);
						}),
				{
					pending: "Updating your marketplace settings...",
					success: "Settings updated successfully!",
					error: "Uh-oh! Something went wrong",
				}
			);
		}
	};
	const updateMarketplaceName= (e) =>{
		e.preventDefault();
		if(!marketplaceName) {
			toast.error("new name can't be empty")
		}
	}

	return (
        <div className="flex gap-5  flex-col ">
            <div className="flex justify-between items-center">
                <div className="font-bold text-lg ">Header</div>
                {!target ? (
					<div>
						{/* <BlueGradientButton className="py-3 px-10" onClick={openEditMenu}>
                        Edit Menu
				</BlueGradientButton>*/}
					</div>
                   
				
                ) : (
                    <BlueGradientButton className="py-3 px-10" onClick={openAddMenuItem}>
                        Add
                    </BlueGradientButton>
                )}
            </div>
            <div className="flex  justify-between gap-10 ">
                {!target ? (
                    <div className=" flex flex-col gap-3 px-10 py-3 items-center dark:border-2 border-gray-700 shadow-md ">
                        <div className="flex flex-col gap-3">
                            <div className="font-bold  flex">Marketplace Name</div>
                            <div className="flex justify-between">
                                <div>{marketplaceName}</div>
                                <div>
                                    {
                                        <button onClick={() => setEditName(!editName)}>
                                            {editName ? <CancelIcon fontSize="small" /> : <ModeEdit fontSize="small" />}
                                        </button>
                                    }
                                </div>
                            </div>

                            {editName && (
                                <Input
                                    type="text"
                                    value={marketplaceName}
                                    onChange={(e) => setMarketplaceName(e.target.value)}
                                    className="border p-2 rounded-md"
                                    placeholder="New Marketplace Name"
                                />
                            )}
                        </div>
                        <div className=" font-bold">Upload logo</div>
                        <button
                            onClick={() => fileRef.current.click()}
                            className="group bg-gray-200 dark:bg-gray-700 dark:bg-zing-700 rounded-full w-[150px] h-[150px] mx-auto"
                        >
                            <div className="z-20  opacity-0 group-hover:opacity-100 bg-gray-400/50 items-center flex justify-center h-full rounded-full transition-all ease-out duration-300">
                                Browse for logo
                            </div>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="LOGO"
                                    className="object-cover relative bottom-[150px] w-[150px] h-[150px] z-10 rounded-full"
                                />
                            )}
                        </button>
                        <div>
                            <div className="text-[10px]">Maximum file size : 3MB</div>
                            <div className="text-[10px]">Format : JPG , PNG , SVG </div>
                        </div>

                        <button
                            disabled={!logo || uploading}
                            className="bg-secBlue text-white py-3 px-12 rounded-md"
                            name="Update"
                            filled
                            onClick={handleUpload}
                        >
                            Update
                        </button>
                        <input
                            hidden={true}
                            type="file"
                            ref={fileRef}
                            onChange={(e) => handleLogoChange(e.target.files[0])}
                        />
                    </div>
                ) : (
                    <div className=" flex flex-col gap-3 px-10 py-3  items-center dark:border-2 border-gray-700 shadow-md ">
						<div className="flex py-5 pl-7 pr-2 gap-4  items-center shadow-md rounded-md">
							<div className="font-semibold">Explore</div>
							<div className="flex gap-2 items-center text-sm ">
									{/* <button><ModeEdit/></button> */}
									<button><Delete/></button>
							</div>
						</div>
						{
							menuItems?.map((item ,index)=>{
								return (
                                    <div className="flex py-5 pl-7 pr-2 gap-4  items-center shadow-md rounded-md" key={item.name}>
                                        <div className="font-semibold">{item.itemName}</div>
                                        <div className="flex gap-2 items-center text-sm ">
                                            {/* <button>
                                                <ModeEdit />
                                            </button> */}
                                            <button onClick={()=> deleteMenuItem(index)}>
                                                <Delete />
                                            </button>
                                        </div>
                                    </div>
                                );
							})
						}
					</div>
                )}

                <div className=" rounded-lg w-[306%] sm:w-[121%] mr-[10px] flex flex-col shadow-prevBox dark:bg-inherit dark:border-darkBorder  h-[60vh] xl:w-3/4  border-white border-[20px] dark:border-darkSecondary ">
                    <div className="flex sm:flex-col md:flex-row justify-between pl-[1rem] pr-[4.5rem] xl:px-10 py-4 gap-5 items-center">
                        {preview && (
                            <img
                                src={preview}
                                alt="LOGO"
                                className="object-cover  w-[50px] h-[50px] z-10 rounded-full"
                            />
                        )}
                        <button className="text-xl font-light ">{marketplaceName}</button>
                        <input
                            className="outline-none rounded-xl py-1 px-2 dark:bg-darkBorder bg-[#D6D6D6]"
                            type="text"
                        />
                        <div className="flex gap-5 items-center">
                            <button className="">Explore</button>
							{menuItems?.map((item)=>{
							return	<button>{item.itemName}</button>
							}
							)}
                            <AccountBalanceWallet />
                            <AccountCircle />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start gap-32 flex-wrap items-center">
                {enableLink && <div className="text-green-500">Marketplace header details updated successfully </div>}
                {enableLink && (
                    <Link
                        className=" no-underline bg-secBlue py-3 px-12 rounded-md text-white"
                        to={`/marketplace/edit-home-page?marketplaceId=${marketplaceId}&marketplaceName=${marketplaceName}&domain=${marketplaceDomain}`}
                    >
                        Next : Configure Pages
                    </Link>
                )}
            </div>
			{
				openMenuModal && <HeaderMenuModal addMenuItem = {addMenuItem} setOpenMenuModal={setOpenMenuModal}/>
			}
        </div>
    );
};

export default UploadLogo;
