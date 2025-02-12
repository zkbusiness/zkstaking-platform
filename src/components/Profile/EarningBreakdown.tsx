import { Tooltip } from "@components/ui/ToolTip";
import { useUserInfo } from "@contexts/UserInfoContext";
import axiosRequest from "@utils/axiosRequest";
import { formatNumber } from "@utils/index";
import { useEffect, useState } from "react";
import { FaInfoCircle, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

type EarningsCategory = "invitingFriends" | "stakeRewards" | "dailyStakeCheckIns" | "communityEngagement" | "ambassadorBonuses";

interface Earnings {
    invitingFriends: number;
    stakeRewards: number;
    ambassadorBonuses: number;
    dailyStakeCheckIns: number;
    communityEngagement: number;
    lastStakeRewardsDate: Date | null;
    lastAmbassadorBonusesDate: Date | null;
    lastDailyStakeCheckInsDate: Date | null;
    lastCommunityEngagementDate: Date | null;
}

const categoryLabels: Record<EarningsCategory, string> = {
    invitingFriends: "Inviting Friends",
    ambassadorBonuses: "Ambassador Bonuses",
    communityEngagement: "Community Engagement",
    stakeRewards: "Staking Rewards",
    dailyStakeCheckIns: "Daily Stake Check-ins",
};

const Button = ({ disabled = false, loading = false, onClick }: { disabled?: boolean; loading?: boolean; onClick: () => void; }) => {
    return <button onClick={onClick} disabled={disabled} className={`w-24 flex items-center gap-1 justify-center text-center disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors`}>
        {disabled ? "Claimed" : "Claim"} {loading && <FaSpinner className=" animate-spin" />}
    </button>;
};

export function EarningsBreakdown() {
    const { userInfo, setUserInfo } = useUserInfo();

    const [canClaim, setCanClaim] = useState({
        stakeRewards: false,
        dailyStakeCheckIns: false,
        communityEngagement: false,
        ambassadorBonuses: false
    });

    const [nextClaimTime, setNextClaimTime] = useState({
        stakeRewards: "",
        dailyStakeCheckIns: "",
        communityEngagement: "",
        ambassadorBonuses: ""
    });

    const [loading, setLoading] = useState({
        stakeRewards: false,
        dailyStakeCheckIns: false,
        communityEngagement: false,
        ambassadorBonuses: false
    });

    useEffect(() => {
        const updateClaimTimes = () => {
            const now = new Date();

            const canClaimReward = (lastClaimDate: Date | null, interval: number) => {
                if (!lastClaimDate) return true;
                return now.getTime() - new Date(lastClaimDate).getTime() >= interval;
            };

            const timeRemaining = (lastClaimDate: Date | null, interval: number) => {
                if (!lastClaimDate) return "Now";

                const now = new Date();
                const nextClaim = new Date(new Date(lastClaimDate).getTime() + interval);
                const diff = nextClaim.getTime() - now.getTime();

                if (diff <= 0) return "Now";

                if (diff < 1000 * 60) {
                    const seconds = Math.floor(diff / 1000);
                    return `${seconds}s`;
                }

                if (diff < 1000 * 60 * 60) {
                    const minutes = Math.floor(diff / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    return `${minutes}m ${seconds}s`;
                }

                if (diff < 1000 * 60 * 60 * 24) {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    return `${hours}h ${minutes}m ${seconds}s`;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                if (days > 0) {
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    return `${days}D ${hours}h ${minutes}m ${seconds}s`;
                }

                const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
                if (months > 0) {
                    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    return `${months}M ${days}D ${hours}h ${minutes}m ${seconds}s`;
                }

                return "Now";
            };


            setCanClaim({
                stakeRewards: canClaimReward(userInfo.earnings.lastStakeRewardsDate, 24 * 60 * 60 * 1000),
                dailyStakeCheckIns: canClaimReward(userInfo.earnings.lastDailyStakeCheckInsDate, 24 * 60 * 60 * 1000),
                communityEngagement: canClaimReward(userInfo.earnings.lastCommunityEngagementDate, 7 * 24 * 60 * 60 * 1000),
                ambassadorBonuses: canClaimReward(userInfo.earnings.lastAmbassadorBonusesDate, 30 * 24 * 60 * 60 * 1000)
            });

            setNextClaimTime({
                stakeRewards: timeRemaining(userInfo.earnings.lastStakeRewardsDate, 24 * 60 * 60 * 1000),
                dailyStakeCheckIns: timeRemaining(userInfo.earnings.lastDailyStakeCheckInsDate, 24 * 60 * 60 * 1000),
                communityEngagement: timeRemaining(userInfo.earnings.lastCommunityEngagementDate, 7 * 24 * 60 * 60 * 1000),
                ambassadorBonuses: timeRemaining(userInfo.earnings.lastAmbassadorBonusesDate, 30 * 24 * 60 * 60 * 1000)
            });
        };

        updateClaimTimes();
        const interval = setInterval(updateClaimTimes, 1000);
        return () => clearInterval(interval);
    }, [userInfo.earnings]);

    const handleClaim = async (category: EarningsCategory) => {
        console.log(`Claimed ${category}`);
        try {
            let data: { lastDate: Date, reward: number; };
            switch (category) {
                case "stakeRewards":
                    setLoading({ ...loading, stakeRewards: true });
                    data = await axiosRequest.post("/profile/rewards/stake", { address: userInfo.address });
                    setLoading({ ...loading, stakeRewards: false });
                    toast.success(`Congratulations! Claimed ${data.reward}ZKIP.`, {
                        position: "top-right",
                    });
                    setUserInfo({ ...userInfo, earnings: { ...userInfo.earnings, lastStakeRewardsDate: data.lastDate, stakeRewards: userInfo.earnings.stakeRewards + data.reward } });
                    break;

                case "dailyStakeCheckIns":
                    setLoading({ ...loading, dailyStakeCheckIns: true });
                    data = await axiosRequest.post("/profile/rewards/checkin", { address: userInfo.address });
                    setLoading({ ...loading, dailyStakeCheckIns: false });
                    toast.success(`Congratulations! Claimed ${data.reward}ZKIP.`, {
                        position: "top-right",
                    });
                    setUserInfo({ ...userInfo, earnings: { ...userInfo.earnings, lastDailyStakeCheckInsDate: data.lastDate, dailyStakeCheckIns: userInfo.earnings.dailyStakeCheckIns + data.reward } });
                    break;

                default:
                    console.log("invalid category");
            }
        } catch (err: any) {
            console.log(err);
            setLoading({ stakeRewards: false, ambassadorBonuses: false, dailyStakeCheckIns: false, communityEngagement: false });
            toast.error(err?.message, {
                position: "top-right"
            });
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-2">
            <h2 className="text-2xl font-bold mb-4">ZKIP Earnings Breakdown</h2>
            <div className="space-y-4 text-xs sm:text-base">
                {Object.keys(categoryLabels).map((key) => {
                    const category = key as EarningsCategory;
                    return (
                        <div key={category} className="flex justify-between items-center space-x-8">
                            <span className="text-gray-400 flex justify-between w-full">{categoryLabels[category]}
                                {["dailyStakeCheckIns", "stakeRewards"].includes(category) && (
                                    <Button disabled={!canClaim[category as keyof typeof canClaim]} loading={loading[category as keyof typeof loading]} onClick={() => handleClaim(category)} />
                                )}</span>
                            <div className="flex items-center space-x-2 w-44 justify-between">

                                <span className="font-semibold">{formatNumber(userInfo.earnings[category])} ZKIP</span>
                                <Tooltip content={
                                    category === "invitingFriends" ? "Invite your friends to get rewards" :
                                        category === "ambassadorBonuses" || category === "communityEngagement" ? `Next reward in: ${nextClaimTime[category as keyof typeof nextClaimTime]}` :
                                            `Next claim in: ${nextClaimTime[category as keyof typeof nextClaimTime]}`}>
                                    <FaInfoCircle className="text-gray-400" />
                                </Tooltip>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
