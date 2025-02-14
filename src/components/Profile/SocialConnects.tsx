import { BsTwitterX } from "react-icons/bs";
import TelegramConnect from "./SocialConnect/TelegramConnect";
import DiscordConnect from "./SocialConnect/DiscordConnect";

export function SocialConnections() {

    return (
        <div className="flex gap-2 flex-col xs:flex-row ">
            <TelegramConnect />
            <DiscordConnect />
            {/* <button className="bg-gray-700 hover:bg-gray-600 text-white shadow-sm px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
                <BsTwitterX />
                <span>Connect Twitter</span>
            </button> */}

        </div>
    );
}

