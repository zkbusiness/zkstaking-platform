import React, { useState } from "react";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { useUserInfo } from "@contexts/UserInfoContext";
import CoinSpinner from "@components/ui/CoinSpinner";
import Copier from "@components/ui/Copier";
import { useScreenWidth } from "@hooks/useScreenWidth";
import Button from "@components/ui/Button";
import { CountUp } from "@components/ui/CountUp";
import { ReferralTable } from "@components/Referrals/ReferralTable";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Profile: NextPage = () => {
    const { isConnected } = useAccount();
    const { userInfo } = useUserInfo();
    const isNarrowScreen = useScreenWidth(860);
    const { openConnectModal } = useConnectModal();

    return (
        <>
            {!isConnected ? <> <h2 className=" text-5xl text-center font-bold mt-16 mb-6">Referrals</h2>
                <div onClick={openConnectModal} className="text-[#4075FF] hover:cursor-pointer hover:scale-110 text-center text-sm md:text-xl font-bold my-24">
                    Connect wallet to join
                </div> </> : userInfo.isLoading ? <div className="w-full flex justify-center items-center">
                    <CoinSpinner size="xl" />
                </div> :
                <div className="min-h-80 py-8 px-2 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto ">
                        <div className=" shadow-xl rounded-lg overflow-hidden">
                            <h2 className=" text-5xl text-center font-bold mt-8 mb-4">Referrals</h2>
                            <div className="flex flex-col  xs:flex-row m-2 text-center justify-center text-gray-400 items-center" >
                                <div className="flex whitespace-nowrap">Referral Link:&nbsp;</div>
                                <Copier reduce={isNarrowScreen} copyString={`${window.location.origin}/stake?code=${userInfo.referralCode}`} text={`${window.location.origin}/stake?code=${userInfo.referralCode}`} isLink />
                            </div>
                            <div className="flex gap-3 flex-col sm:flex-row">
                                <Button
                                    type="dark"
                                    className="min-[150px] w-full whitespace-nowrap"
                                >
                                    <span className="w-full">Users Invited</span>
                                    <span className=" w-full">
                                        <CountUp
                                            format="0,0"
                                            end={userInfo.numberOfUsersInvited}
                                        />
                                    </span>
                                </Button>
                                <Button
                                    type="dark"
                                    className="min-[150px] w-full whitespace-nowrap"
                                >
                                    <span className="w-full">Total Earnings</span>
                                    <span className=" w-full">
                                        <CountUp
                                            format="0,0.00"
                                            end={userInfo.earnings.invitingFriends}
                                            suffix="ZKIP"
                                        />
                                    </span>
                                </Button>
                            </div>
                            <div className="mt-4">
                                <ReferralTable />
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default Profile;
