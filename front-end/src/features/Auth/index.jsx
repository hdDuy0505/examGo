import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function AuthFeature(props) {
	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<Routes>
				<Route path="signin" element={<SignIn />} />
				<Route path="signup" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default AuthFeature;
