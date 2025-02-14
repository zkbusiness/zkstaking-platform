"use client";

import { useState, useRef, type ChangeEvent, useEffect } from "react";
import { cn } from "@utils/index";
import { FaUpload } from "react-icons/fa";
import { Spinner } from "./spinner";
import axiosRequest from "@utils/axiosRequest";
import { useUserInfo } from "@contexts/UserInfoContext";
import { toast } from "react-toastify";

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    canUpload?: boolean;
    onUpload?: (fileUrl: string) => void;
}

export function Avatar({ src = '', alt = "Avatar", size = "md", className, canUpload = false, onUpload }: AvatarProps) {
    const { userInfo } = useUserInfo();
    const [imageSrc, setImageSrc] = useState(src);
    const [uploading, setUploading] = useState(false);
    const [hover, setHover] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sizeClasses = {
        xs: "w-10 h-10",
        sm: "w-12 h-12",
        md: "w-24 h-24",
        lg: "w-36 h-36",
        xl: "w-48 h-48"
    };

    useEffect(() => {

        setImageSrc(src);
    }, [src]);

    const handleClick = () => {
        if (canUpload && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);

        // Upload File
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("address", userInfo.address);
        try {
            const data: any = await axiosRequest.post("/profile/upload", formData);
            // setImageSrc(process.env.NEXT_PUBLIC_SERVER_URL + data.filePath);
            onUpload?.(data.filePath);
            toast.success("Profile picture updated successfully", { position: "top-right" });
        } catch (error: any) {
            toast.error(error.message, { position: "top-right" });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={cn("relative rounded-full aspect-square overflow-hidden border-2 border-white", sizeClasses[size], className)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                src={imageSrc ? process.env.NEXT_PUBLIC_SERVER_URL + imageSrc : "/images/default_avatar.png"}
                alt={alt}
                className="transition-all h-full w-auto object-cover"
            />

            {canUpload && <div
                className={`absolute inset-0  ${hover ? "top-3/4" : "top-[110%]"} bg-black/50 flex items-center justify-center transition-all`}
                onClick={handleClick}
            >
                <FaUpload className="h-5 w-5" />
            </div>}

            {canUpload && (
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            )}

            {uploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white font-semibold animate-pulse"><Spinner variant="ring" /></span>
                </div>
            )}
        </div>
    );
}
