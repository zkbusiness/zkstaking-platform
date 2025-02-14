"use client";

import { useUserInfo } from "@contexts/UserInfoContext";
import axiosRequest from "@utils/axiosRequest";
import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export default function EditUsername() {
    const { userInfo, setUserInfo } = useUserInfo();

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(userInfo.name);
    const [isSaving, setIsSaving] = useState(false);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {

        try {
            setIsSaving(true);
            const data: any = await axiosRequest.put("/profile/name", {
                address: userInfo.address, name: username
            });
            toast.success(data, { position: "top-right" });
            setUserInfo({ ...userInfo, name: username });
            setIsSaving(false);
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
            setIsSaving(false);
            setUsername(userInfo.name);
            if (userInfo.name) setIsEditing(false);
        }
    };

    useEffect(() => {
        setUsername(userInfo.name);
        if (!userInfo.name) setIsEditing(true);
    }, [userInfo.name]);

    if (isEditing) {
        return (
            <div className="flex items-center space-x-2 sm:justify-start justify-center">
                <input type="text" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} className="bg-transparent border rounded-md px-2 border-gray-400  focus:outline-none max-w-xs text-3xl font-bold w-full" placeholder="Full Name" />
                {isSaving ? <FaSpinner className="h-5 w-5 text-green-500 animate-spin" /> : <FaCheck className="h-5 w-5 text-green-500" onClick={handleSaveClick} />}
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2 w-full sm:justify-start justify-center">
            <h1 className="text-3xl font-bold min-w-48 mx-2 border border-transparent">{username}</h1>
            <FaEdit className="h-5 w-5" onClick={handleEditClick}>
                Edit
            </FaEdit>
        </div>
    );
}

