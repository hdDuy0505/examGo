import React from 'react';

const Footer = () => {
	return (
		<div
			style={{ fontFamily: 'Yanone Kaffeesatz' }}
			className="flex justify-between items-center bg-[#04793f] p-3 md:px-10 lg:py-[20px] lg:px-[120px] shadow-[0_3px_6px_6px_rgba(0,0,0,0.5)]"
		>
			<div className="flex">
				<div className="flex items-center">
					<img
						className="h-[25px] md:h-[30px] lg:h-[35px]"
						src={window.location.origin + '/images/examgo_logo.png'}
						alt="logo"
					/>
				</div>

				<div className="ml-1 pl-2 md:ml-4">
					<div className="hidden sm:block">
						<ul className="flex">
							<li className="mx-2">About</li>
							<li className="mx-2">Support</li>
							<li className="mx-2">Contact</li>
						</ul>
					</div>
					<div className="text-lg">
						<span>© Team DKD</span>
					</div>
				</div>
			</div>
			<div className="text-center">
				<div className="flex bg-blue-500 rounded-tl-full px-2 py-1 md:px-4">
					<img
						className="h-7 md:h-8 mx-1 cursor-pointer"
						src={window.location.origin + '/images/facebook_icon.png'}
						alt="Facebook icon"
					/>
					<a
						href="https://github.com/t4n-du4ng/ExamGo"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="h-7 md:h-8 mx-1 cursor-pointer"
							src={window.location.origin + '/images/github_icon.png'}
							alt="Github icon"
						/>
					</a>
					<img
						className="h-7 md:h-8 mx-1 cursor-pointer"
						src={window.location.origin + '/images/gmail_icon.png'}
						alt="Gmail icon"
					/>
				</div>
				<div className="text-lg md:text-xl bg-yellow-700 rounded-br-full px-2 py-1 md:px-4">
					<span>Thank you!</span>
				</div>
			</div>
		</div>
	);
};

Footer.propTypes = {};

export default Footer;
