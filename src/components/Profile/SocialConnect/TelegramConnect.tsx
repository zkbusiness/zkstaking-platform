import { useUserInfo } from '@contexts/UserInfoContext';
import { LoginButton, TelegramAuthData } from '@telegram-auth/react';
import axiosRequest from '@utils/axiosRequest';
import React from 'react';
import { FaTelegram, FaTelegramPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TelegramConnect = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const onLogin = async (authData: TelegramAuthData) => {
        try {
            const data: string = await axiosRequest.post("/profile/social/telegram", { address: userInfo.address, id: authData.id });
            setUserInfo({ ...userInfo, telegramId: (authData.id).toString() });
            toast.success(data, { position: "top-right" });
        } catch (err: any) {
            toast.error(err.message, { position: "top-right" });
        }
    };
    return !!!userInfo.telegramId ? (
        <LoginButton botUsername={process.env.NEXT_PUBLIC_TELEGRAM_LOGINBOT_USERNAME || ""} buttonSize="large" cornerRadius={6} requestAccess={"write"} showAvatar={false} onAuthCallback={onLogin} />
    ) : <button className="bg-blue-400 text-white shadow-sm px-4 py-2 rounded-md transition-colors flex items-center space-x-3 justify-center"
    >
        <FaTelegramPlane size={24} />
        <span>
            Telegram Connected
        </span>
    </button>;
};

export default TelegramConnect;