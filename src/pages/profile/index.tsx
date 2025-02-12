import React from "react";
import { NextPage } from "next";
import { Stats } from "@components/Profile/Stats";
import { EarningsBreakdown } from "@components/Profile/EarningBreakdown";
import { SocialConnections } from "@components/Profile/SocialConnects";
import { useAccount } from "wagmi";
import EditUsername from "@components/Profile/EditUserName";
import { useUserInfo } from "@contexts/UserInfoContext";
import CoinSpinner from "@components/ui/CoinSpinner";
import { Avatar } from "@components/ui/Avatar";
import Copier from "@components/ui/Copier";
import { useScreenWidth } from "@hooks/useScreenWidth";


const Profile: NextPage = () => {
    const isNarrowScreen = useScreenWidth(860);
    const { isConnected } = useAccount();
    const { userInfo, setUserInfo } = useUserInfo();

    const onAvatarUpload = (url: string) => {
        setUserInfo({
            ...userInfo,
            avatarUrl: url
        });
    };

    return (
        <>
            {!isConnected ? <> <h2 className=" text-5xl text-center font-bold mt-16 mb-6">Profile Page</h2>
                <div className="text-[#4075FF] text-center text-sm md:text-xl font-bold my-24">
                    Connect wallet to join
                </div> </> : userInfo.isLoading ? <div className="w-full flex justify-center items-center">
                    <CoinSpinner size="xl" />
                </div> :
                <div className="min-h-screen py-12 px-2 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto ">
                        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                            <div className="px-4 py-8 sm:px-10 sm:py-10">
                                <div className="flex flex-col sm:flex-row items-center mb-8">
                                    <Avatar size="lg" canUpload src={process.env.NEXT_PUBLIC_SERVER_URL + userInfo.avatarUrl} onUpload={onAvatarUpload} />
                                    <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                                        <EditUsername />
                                        <div className="mt-2 text-start text-gray-400">
                                            <div className="flex flex-col  xs:flex-row" >
                                                <div className="flex whitespace-nowrap">Referral Link:&nbsp;</div>
                                                <Copier reduce={isNarrowScreen} copyString={`${window.location.origin}/stake?code=${userInfo.referralCode}`} text={`${window.location.origin}/stake?code=${userInfo.referralCode}`} isLink />
                                            </div>
                                            <div className="mt-1">
                                                Users Invited: <span className="font-semibold">{userInfo.numberOfUsersInvited}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Stats stakedAmount={userInfo.stakedAmount} totalZKIP={userInfo.earnings.invitingFriends + userInfo.earnings.ambassadorBonuses + userInfo.earnings.communityEngagement + userInfo.earnings.dailyStakeCheckIns + userInfo.earnings.stakeRewards} />

                                <div className="mt-8">
                                    <EarningsBreakdown />
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold mb-4">Social Connections</h2>
                                    <SocialConnections />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>}
        </>
    );
};

export default Profile;
