import React from "react";
import { NextPage } from "next";
import { UserTable } from "@components/Leaderboard/UsersTable";

const Profile: NextPage = () => {

    return (
        <>
            <div className="min-h-80 py-8 px-2 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto ">
                    <div className=" shadow-xl rounded-lg overflow-hidden">
                        <h2 className=" text-5xl text-center font-bold mt-8 mb-4">Leaderboard</h2>

                        <div className="mt-4">
                            <UserTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
