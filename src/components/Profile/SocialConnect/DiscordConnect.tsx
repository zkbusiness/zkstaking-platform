import { useUserInfo } from '@contexts/UserInfoContext';
import axiosRequest from '@utils/axiosRequest';
import { useDiscordLogin, DiscordLoginParams } from 'react-discord-login';
import { CodeResponse, ErrorResponse, TokenResponse } from 'react-discord-login/dist/DiscordLoginTypes';
import { FaDiscord } from 'react-icons/fa';
import { toast } from 'react-toastify';

type UseDiscordLoginParams = DiscordLoginParams & {
    onSuccess?: (response: CodeResponse | TokenResponse) => Promise<void> | void,
    onFailure?: (error: ErrorResponse) => Promise<void> | void;
};

const DiscordConnect: React.FC = () => {

    const { userInfo, setUserInfo } = useUserInfo();

    const discordLoginParams: UseDiscordLoginParams = {
        clientId: process.env.NEXT_PUBLIC_DISCORD_LOGINBOT_CLIENT_ID || "",
        redirectUri: process.env.NEXT_PUBLIC_DISCORD_LOGINBOT_REDIRECT_URI,
        responseType: 'token', // or 'code'
        scopes: ['identify', 'email'],
        onSuccess: async (response: TokenResponse | CodeResponse) => {
            const authData = (response as TokenResponse).user;
            try {
                const data: string = await axiosRequest.post("/profile/social/discord", { address: userInfo.address, id: authData?.id || "" });
                setUserInfo({ ...userInfo, discordId: (authData?.id || "").toString() });
                toast.success(data, { position: "top-right" });
            } catch (err: any) {
                toast.error(err.message, { position: "top-right" });
            }
        },
        onFailure: (error: any) => {
            console.error('Login failed:', error);
        },
    };

    const { buildUrl, isLoading } = useDiscordLogin(discordLoginParams);

    return !!!userInfo.discordId ? (
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-4 py-2 rounded-md transition-colors flex items-center space-x-3 justify-center"
            onClick={() => (window.location.href = buildUrl())} disabled={isLoading}>
            <FaDiscord size={24} />
            <span>
                {isLoading ? 'Loading...' : 'Log in with Discord'}
            </span>
        </button>
    ) : (
        <button className="bg-indigo-600  text-white shadow-sm px-4 py-2 rounded-md transition-colors flex items-center space-x-3 justify-center"
        >
            <FaDiscord size={24} />
            <span>
                Discord Connected
            </span>
        </button>
    );
};

export default DiscordConnect;