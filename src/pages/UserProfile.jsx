import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGet } from "../api/useGet";

const UserProfile = () => {

    const [user, setUser] = useState({});
    const {id} = useParams();

    const getUser = async () => {
        const {success, data, error} = await useGet("/user", {id});
        if(success){
            // console.log("User", data);
            setUser(data);
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="mb-4">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
            </div>
            <Link to="/users" className="text-blue-600 hover:underline">Back to Users</Link>
        </div>
    );

}

export default UserProfile;