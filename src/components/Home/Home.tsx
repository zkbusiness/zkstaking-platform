import Button from "@components/ui/Button";
import { CiCircleInfo } from "react-icons/ci";
import Link from "next/link";
import { CountUp } from "@components/ui/CountUp";
import { useStakeContext } from "@contexts/StakeContext";

const TX_COST = 0.1;

const Home = () => {

    const {
        stakeInfo: { totalTx, totalStaked, totalStaker },
    } = useStakeContext();

    return (
        <section className="min-h-screen md:min-h-96  md:h-[700px] lg:h-[760px] xl:h-[920px] translate-y-60  pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-36  md:pb-20 lg:pb-12 flex flex-col justify-end w-full ">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 xl:px-4 flex flex-col gap-6 flex-shrink-0 z-10  mb-12">
                <h1 className="text-4xl lg:text-6xl leading-[1.1] font-bold inline-block">
                    The Staking Platform
                </h1>
                <h2 className="text-2xl leading-[1.4] w-full max-w-[600px]">
                    ZKsync staking platform is an secured investor
                    <br className="hidden sm:block" />
                    platform, secured by contract.
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 my-6">
                    <Button type="primary" className="w-full sm:w-auto" rounded size="lg">
                        <Link href="/stake">
                            Start Staking
                        </Link>
                    </Button>
                    <Button className="w-full sm:w-auto" rounded size="lg">
                        <Link href="/audit/whitepaper.pdf">
                            Audit Whitepaper
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="w-full bg-[#0000001e]  backdrop-blur-3xl  rounded-[40px] ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
                    {[
                        { label: "TRANSACTIONS", value: <CountUp end={totalTx} /> },
                        { label: "STAKERS", value: <CountUp end={totalStaker} /> },
                        { label: "STAKING TX COST", value: <CountUp end={TX_COST} prefix="~$" /> },
                        { label: "TVL", value: <CountUp end={totalStaked} prefix="$" /> },
                    ].map((item, index) => (
                        <div
                            key={item.label}
                            className={` bg-background p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center text-center md:text-start backdrop-blur-2xl       
                                ${index === 0
                                    ? "rounded-t-[40px] md:rounded-tl-[40px] md:rounded-tr-none"
                                    : ""
                                }
                                ${index === 1 ? "md:rounded-tr-[40px] lg:rounded-tr-none" : ""}
                                ${index === 3 ? " lg:rounded-tr-[40px]" : ""}
                            `}
                        >
                            <div className=" w-fit">
                                <div className="text-lg font-semibold mb-2 flex items-center justify-center md:justify-start">
                                    {item.label}&nbsp;
                                    <CiCircleInfo className="opacity-70" />
                                </div>
                                <div className="text-5xl font-semibold">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" mt-px h-40 sm:h-32 md:h-40 lg:h-56 bg-gradient-to-b from-background  to-foreground"></div>
            </div>
        </section>
    );
};

export default Home;
