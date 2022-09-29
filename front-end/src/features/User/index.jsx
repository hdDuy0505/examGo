import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import EditInfo from './pages/EditInfo';
import ChangePass from './pages/ChangePass';
function UserFeature(props) {
	return (
		<div className="min-h-[80vh]">
			<Routes>
				<Route path="me" element={<UserProfile />} />
				<Route path="edit" element={<EditInfo />} />
				<Route path="change-pass" element={<ChangePass />} />
			</Routes>
		</div>
	);
}

UserFeature.propTypes = {};

export default UserFeature;
