import React, { useContext } from 'react';
import MuiChart from './MChart';
import { AuthContext } from '../providers/AuthProvider';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user)

    return (
        <div>
            <h3 className='text-center font-bold text-xl'>MY PROFILE</h3>
            <div>
                {/* Display user information */}
                <p>Email: {user?.email}</p>
                <p>Display Name: {user?.displayName}</p>
                <p>Profile Picture: {user?.photoURL}</p>

                {/* Allow user to update profile */}
                <ProfileUpdate />
            </div>
            <div>
                <MuiChart />
            </div>
        </div>
    );
};

export default Profile;
