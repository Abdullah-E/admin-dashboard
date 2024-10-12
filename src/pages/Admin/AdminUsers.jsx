import React, { useEffect, useState } from "react";

import { useDelete } from "@/api/useDelete";
import { useGet } from "@/api/useGet";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const { success, data } = await useGet("/users");
        if (success) {
            setUsers(data);
        } else {
            alert("Failed to fetch users");
        }
    };

    const deleteUser = async (id) => {
        const { success } = await useDelete("/user", { id });
        if (success) {
            alert("User deleted successfully");
            getUsers();
        } else {
            alert("Failed to delete user");
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            
            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                                <button 
                                    onClick={() => alert(`Edit user: ${user.id}`)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => deleteUser(user.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;