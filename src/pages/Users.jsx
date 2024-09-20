import React, { useEffect, useState } from "react";
import { useGet } from "../api/useGet";

const Users = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const {success, data, error} = await useGet("/users");
        if(success){
            // console.log("Users", data);
            setUsers(data);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            {/* users table: */}
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Users;
