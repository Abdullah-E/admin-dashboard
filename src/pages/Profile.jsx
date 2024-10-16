// UserProfile.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "@/api/useGet";

const Profile = () => {

    console.log("UserProfile");
    const [user, setUser] = useState({});

    const getUser = async () => {
        const userStore = JSON.parse(localStorage.getItem("user"));
        const { success, data} = await useGet("/user", { id: userStore.id });
        if (success) {
            setUser(data);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="mb-4">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <Link to="/edit-profile" className="text-blue-600 hover:underline">Edit Profile</Link>
        </div>
    );
};

export default Profile;
