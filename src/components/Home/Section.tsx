import Image from "next/image";

export const Sections = () => {
    return (
        <>
            <section
                className={` px-6 lg:px-12 xl:px-28 py-8 md:py-10 flex flex-col md:flex-row-reverse justify-between items-center gap-10 z-50`}
            >
                <div className="w-full min-h-[300px] max-w-[400px] flex  relative">
                    <Image
                        draggable="false"
                        className="w-64 m-auto rounded-md aspect-square"
                        src={"/images/zk-coin-front.png"}
                        alt={"security"}
                        width={256}
                        height={256}
                    />
                </div>
                <div className="space-y-4 md:space-y-6 md:max-w-[50%]">
                    <h3 className="text-[#4075FF]  tracking-wider text-lg md:text-xl font-bold">
                        ZK BUSINESS
                    </h3>
                    <h2
                        className={`text-3xl xs:text-5xl font-bold max-w-[500px] text-white`}
                    >
                        A ZkBusiness Staking platform...
                    </h2>

                    <p className="text-lg md:text-xl flex flex-col mt-10 space-y-16 ">
                        Zk Business Staking focuses on security with stringent measures in place
                        to keep user funds safe. On ZkBusiness, the competitive nature of
                        staking rewards, along with very low fees, creates a high appeal for
                        many investors.
                    </p>
                </div>
            </section>

            <section
                className={` px-6 lg:px-12 xl:px-28 py-8 md:py-10 md:flex-row flex flex-col justify-between items-center gap-10 z-50`}
            >
                <div className="w-full min-h-[300px] max-w-[400px] flex   aspect-square relative">
                    <Image
                        draggable="false"
                        className="w-full m-auto aspect-auto rounded-md"
                        src={"/images/staking.png"}
                        alt={"APY"}
                        width={400}
                        height={284}
                    />
                </div>

                <div className={`space-y-4 md:space-y-6 md:max-w-[50%]`}>
                    <h3 className="text-[#4075FF]  tracking-wider text-lg md:text-xl font-bold">
                        INCOME BY APR
                    </h3>
                    <h2
                        className={`text-3xl xs:text-5xl font-bold max-w-[500px] text-white`}
                    >
                        Initial Bonus
                    </h2>

                    <p className="text-lg md:text-xl flex flex-col mt-10 space-y-16 ">
                        At our staking platform, we understand how important returns are for
                        your investments. That’s why we offer an APY of 8.7%, designed to
                        help you grow your assets over time. Even more exciting, the first
                        100 users who join us will receive a special rate of 13.5% APY on
                        their initial stake. This limited-time offer is a great way to
                        kickstart your earnings. We invite you to take part in this
                        exclusive promotion before it runs out!
                    </p>
                </div>
            </section>

            <section
                className={` px-6 lg:px-12 xl:px-28 py-8 md:py-10 md:flex-row-reverse flex flex-col justify-between items-center gap-10 z-50`}
            >
                <div className="w-full min-h-[300px] max-w-[400px] flex  relative">
                    <Image
                        draggable="false"
                        className="w-full m-auto rounded-md aspect-square"
                        src={"/images/userfriendly.png"}
                        alt={"User Friendly"}
                        width={400}
                        height={400}
                    />
                </div>
                <div className={`space-y-4 md:space-y-6 md:max-w-[50%]`}>
                    <h3 className="text-[#4075FF]  tracking-wider text-lg md:text-xl font-bold">
                        USER-FRIENDLY DESIGN
                    </h3>
                    <h2
                        className={`text-3xl xs:text-5xl font-bold max-w-[500px] text-white`}
                    >
                        Easy to Use
                    </h2>

                    <p className="text-lg md:text-xl flex flex-col mt-10 space-y-16 ">
                        ZK Business makes staking effortless. With just a few clicks, connect your wallet, stake your tokens, and start earning rewards instantly. No complexities, no hassles.
                    </p>
                </div>
            </section>

            <section
                className={` px-6 lg:px-12 xl:px-28 py-8 md:py-10 flex flex-col md:flex-row  justify-start  justify-self-start items-center gap-10 z-50`}
            >
                <div className={`space-y-4 md:space-y-6`}>
                    <h3 className="text-[#4075FF]  tracking-wider text-lg md:text-xl font-bold">
                        STAKE ON ZKSYNC
                    </h3>
                    <h2 className={`text-3xl xs:text-5xl font-bold text-white`}>
                        Ready to Stake for ZK?
                    </h2>

                    <p className="text-lg md:text-xl flex flex-col mt-10 space-y-16 ">
                        Stake now and be part of our community!
                    </p>
                </div>
            </section>
        </>
    );
};
