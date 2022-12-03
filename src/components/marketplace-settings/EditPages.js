import BlueButton from "../../ui/BlueButton";
import BlueGradientButton from "../../ui/BlueGradientButton";
import { useEffect, useState } from "react";
import useAuthorizedHttp from "../../hooks/use-authorized-http";
import { useNavigate } from "react-router-dom";
import React from "react"

const EditPages = (props) => {
	const [bannerPreview, setBannerPreview] = useState();
	const [title, setTitle] = useState("Edit the title");
	const [subtitle, setSubtitle] = useState("Edit the subtitle");
	const [buttonLabel, setButtonLabel] = useState("Button Label");
	const [buttonURL, setButtonURL] = useState("#");
	const [highLightButton,setHighLightButton] = useState("");

	const makeRequest = useAuthorizedHttp();

	const navigate = useNavigate();

	useEffect(() => {
		if(window.location.toString().includes("edit-home-page")){
			setHighLightButton("home");
		}
		// else if(window.location.toString().includes("edit-privacy-page")){
		// 	setHighLightButton("privacy");
		// }
		else if(window.location.toString().includes("edit-about-page")){
			setHighLightButton("about");
		}
		// else if(window.location.toString().includes("edit-faq-page")){
		// 	setHighLightButton("faq");
		// }
		// else if(window.location.toString().includes("edit-tos-page")){
		// 	setHighLightButton("tos");
		// }
		makeRequest(
			{
				url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/marketplace/localhost/page/home/detail`,
			},
			(data) => {
				data.bannerImage && setBannerPreview(data.bannerImage);
				data.title && setTitle(data.title);
				data.description && setSubtitle(data.description);
				data.buttonLabel && setButtonLabel(data.buttonLabel);
				data.buttonLink && setButtonURL(data.buttonLink);
			},
			(data) => console.log(data),
			() => {}
		);
	}, [makeRequest, props]);

	return (
		<div className="flex shadow-md rounded-md dark:bg-darkSecondary">
			
				{/* <div className="text-lg font-bold mx-auto mb-5">Edit your marketplace pages</div> */}
				<div className="flex justify-between w-[300px] font-bold">
					<BlueButton
						className={(highLightButton === "home") && `bg-secPurple text-white font-bold border-none  h-12` }
						
						onClick={() =>
							navigate(
								`/marketplace/edit-home-page?marketplaceId=197&marketplaceName=${props.marketplace?.name}&domain=localhost`
							)
						}
					>Home Page</BlueButton>
					
					<BlueButton
					className={(highLightButton === "about") && `bg-secPurple text-white font-bold border-none h-12` }
						
						onClick={() =>
							navigate(
								`/marketplace/edit-about-page?marketplaceId=197&domain=localhost`
							)
						}
					>
					About
					</BlueButton>
					
				</div>
			
			{/* <div className="col-span-5 h-[60vh] ">
				<div className="text-lg font-bold mx-auto mb-5">Preview of your marketplace</div>
				<div className="rounded-lg border flex flex-col h-full">
					<div className="flex justify-between px-20 py-5">
						<button className="text-xl font-light">{props.marketplace.name}</button>
						<div className="flex gap-5">
							<button className="">Home</button>
							<button className="">About us</button>
							<button className="">FAQ</button>
							<button className="">TNC</button>
						</div>
					</div>
					<div className="grid grid-cols-2 h-full p-20 gap-10">
						<div className="flex flex-col items-start justify-center gap-5 ">
							<div className="text-4xl font-bold">{title}</div>
							<div className="text-2xl">{subtitle}</div>
							<BlueGradientButton
								className="w-[200px]"
								onClick={() => window.open("https://" + buttonURL)}
							>
								{buttonLabel}
							</BlueGradientButton>
						</div>
						<div className="flex items-center justify-end">
							{!bannerPreview && (
								<div className="text-2xl">Select your banner image</div>
							)}
							{bannerPreview && (
								<img
									alt="Banner"
									src={bannerPreview}
									className="object-cover rounded-lg h-[350px]"
								/>
							)}
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default EditPages;
