"use client";

import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { zkSync, zkSyncSepoliaTestnet } from "viem/chains";
import {
    UseBalanceReturnType,
    useAccount,
    useBalance,
    useSwitchChain,
    useWriteContract,
} from "wagmi";

import ZK_TOKEN_ABI from "../abi/ZkTokenABI.json";
import STAKE_CONTRACT_ABI from "../abi/StakeABI.json";
import {
    APP_ENV,
    getZKTokenAddress,
    getStakingContractAddress,
} from "../config";

const publicClient = createPublicClient({
    chain: APP_ENV.ENABLE_TESTNETS ? zkSyncSepoliaTestnet : zkSync,
    transport: http(),
});

export type StakeInfoType = {
    hasStake: boolean;
    zkPrice: number;
    totalStakedOfAddress: number;
    balance: number;
    totalStaked: number;
    totalStaker: number;
    totalTx: number;
    rewards: number;
    dailyReward: number;
    stakeShare: number;
    lastClaimedTime: number;
    aprRate: number,
    transactions: {
        date: string;
        source: string;
        destination: string;
        sourceTransaction: string;
        destinationTransaction: string;
        status: string;
    }[];
};

export type StakeContextType = {
    stakeInfo: StakeInfoType;
    allowance: number;
    txStatus: string;
    currentTx: string;
    txHash: `0x${string}` | undefined;
    txError: any;
    calcRewards: () => number;
    approve: (amount: number) => void;
    stake: (amount: number) => void;
    unstake: (amount: number) => void;
    claim: () => void;
    setTxStatus: (status: string) => void;
    refresh: () => void;
};

const defaultValues: StakeInfoType = {
    hasStake: false,
    zkPrice: 0,
    totalStakedOfAddress: 0,
    balance: 0,
    rewards: 0,
    dailyReward: 0,
    stakeShare: 0,
    totalStaked: 0,
    totalStaker: 0,
    totalTx: 0,
    lastClaimedTime: 0,
    aprRate: 0,
    transactions: _.range(1, 11).map((index: number) => ({
        date: "09/12/2024",
        source: "0x1fd6cA086cA06cA0",
        destination: "0x7fd6cA086cA06cA0",
        sourceTransaction: "XXXXX-XXXX",
        destinationTransaction: "XXXXX-XXXX",
        status: "Success",
    })),
};

const StakeContext = createContext<StakeContextType>({
    stakeInfo: defaultValues,
    allowance: 0,
    currentTx: "",
    txStatus: "",
    txHash: undefined,
    txError: null,
    calcRewards: () => {
        return 0;
    },
    approve: () => { },
    stake: () => { },
    unstake: () => { },
    claim: () => { },
    setTxStatus: () => { },
    refresh: () => { },
});

export const useStakeContext = (): StakeContextType => useContext(StakeContext);

/* Context provider */
export const StakeContextProvider = (props: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);
    const { address, chainId, status: accountStaus } = useAccount();
    const { switchChain } = useSwitchChain();
    const { writeContract, status, error, data } = useWriteContract();
    // const {data} = useReadContract();
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
    const [currentTx, setCurrentTx] = useState("");
    const [txStatus, setTxStatus] = useState("");
    const token = getZKTokenAddress(chainId);
    const contract = getStakingContractAddress(chainId ? chainId : 300);

    const balance: UseBalanceReturnType = useBalance({
        address,
        token,
        chainId,
    });
    const [stakeInfo, setStakeInfo] = useState();
    const [allowance, setAllowance] = useState();
    const [totalStaked, setTotalStaked] = useState();
    const [totalStaker, setTotalStaker] = useState();
    const [totalTx, setTotalTx] = useState();
    const [totalStakedOfAddress, setTotalStakedOfAddress] = useState();

    const approve = (amount: number) => {
        setCurrentTx("approve");
        setTxStatus("");
        const largeNumber = BigInt(amount) * BigInt(10 ** APP_ENV.ZK_DECIMAL);
        const largeNumberString = largeNumber.toString();
        writeContract({
            abi: ZK_TOKEN_ABI as any,
            address: token,
            functionName: "approve",
            args: [contract, largeNumberString],
            // gas: parseGwei('0.001'),
        });
    };

    const stake = (amount: number) => {
        setCurrentTx("stake");
        setTxStatus("");
        const largeNumber = BigInt(amount) * BigInt(10 ** APP_ENV.ZK_DECIMAL);
        const largeNumberString = largeNumber.toString();
        writeContract({
            abi: STAKE_CONTRACT_ABI as any,
            address: contract,
            functionName: "stake",
            args: [largeNumberString],
            // gas: parseGwei('0.001'),
        });
        refresh();
    };

    const unstake = (amount: number) => {
        setCurrentTx("unstake");
        setTxStatus("");
        const largeNumber = BigInt(amount) * BigInt(10 ** APP_ENV.ZK_DECIMAL);
        const largeNumberString = largeNumber.toString();
        writeContract({
            abi: STAKE_CONTRACT_ABI as any,
            address: contract,
            functionName: "unstake",
            args: [largeNumberString],
            // gas: parseGwei('0.001'),
        });
        refresh();
    };

    const claim = () => {
        setCurrentTx("claim");
        setTxStatus("");
        writeContract({
            abi: STAKE_CONTRACT_ABI as any,
            address: contract,
            functionName: "claim",
            args: [],
            // gas: parseGwei('0.0001'),
        });
        refresh();
    };
    const [stakeInfoValues, setStakeInfoValues] =
        useState<StakeInfoType>(defaultValues);
    const [allowanceValue, setAllowanceValue] = useState<number>(0);

    const refresh = async () => {
        try {
            await balance.refetch();
            const [
                stakeInfo,
                allowance,
                totalStakedOfAddress,
            ]: any = await Promise.all([
                publicClient.readContract({
                    abi: STAKE_CONTRACT_ABI as any,
                    address: contract,
                    functionName: "getStakeInfo",
                    args: [address || "0x0"],
                }),
                publicClient.readContract({
                    abi: ZK_TOKEN_ABI as any,
                    address: token,
                    functionName: "allowance",
                    args: [address || "0x0", contract],
                }),
                publicClient.readContract({
                    abi: STAKE_CONTRACT_ABI as any,
                    address: contract,
                    functionName: "getTokensStaked",
                    args: [address || "0x0"],
                }),
            ]);

            setStakeInfo(stakeInfo);
            setAllowance(allowance);
            setTotalStakedOfAddress(totalStakedOfAddress);

        } catch (error) {
            console.log("Wrong network", error);
        }
    };

    const refreshWithoutConnect = async () => {
        const [
            totalStaked,
            totalStaker,
            totalTx
        ]: any = await Promise.all([
            publicClient.readContract({
                abi: STAKE_CONTRACT_ABI as any,
                address: contract,
                functionName: "getTotalStaked",
                args: [],
            }),
            publicClient.readContract({
                abi: STAKE_CONTRACT_ABI as any,
                address: contract,
                functionName: "getTotalStakedUser",
                args: [],
            }),
            publicClient.readContract({
                abi: STAKE_CONTRACT_ABI as any,
                address: contract,
                functionName: "getTotalTx",
                args: [],
            }),
        ]);
        setTotalStaked(totalStaked ? totalStaked : 0);
        setTotalStaker(totalStaker ? totalStaker : 0);
        setTotalTx(totalTx ? totalTx : 0);
    }

    const calcRewards = () => {
        // const data: any = stakeInfo.data;
        if (stakeInfo) {
            const now = Number(Math.floor(new Date().getTime() / 1000));

            const stakedAmount = Number(stakeInfo[0]);
            const unclaimedAmount = Number(stakeInfo[1]);
            const lastClaimedTime = Number(stakeInfo[2]);
            const aprRate = Number(stakeInfo[4]);
            const rate = Number(aprRate / 10000); // 8%  / 100
            const decimal = Number(10 ** APP_ENV.ZK_DECIMAL);

            return (
                (unclaimedAmount +
                    (stakedAmount * rate * (now - lastClaimedTime)) /
                    Number(365 * 24 * 60 * 60)) /
                decimal
            );
        } else {
            return 0;
        }
    };

    useEffect(() => {
        if (address && accountStaus === "connected") {
            switchChain({ chainId: APP_ENV.ENABLE_TESTNETS ? zkSyncSepoliaTestnet.id : zkSync.id });
            refresh();
        }
        refreshWithoutConnect();
    }, [address, chainId, accountStaus]);

    useEffect(() => {
        setStakeInfoValues((prevState) => ({
            ...prevState,
            balance: Number(balance.data?.formatted || 0),
        }));
    }, [balance.data?.value]);

    useEffect(() => {
        setAllowanceValue(Number(allowance));
    }, [allowance]);

    useEffect(() => {
        setStakeInfoValues((prevState) => ({
            ...prevState,
            totalStaked: Number(totalStaked) / 10 ** APP_ENV.ZK_DECIMAL,
            totalStakedOfAddress:
                Number(totalStakedOfAddress) / 10 ** APP_ENV.ZK_DECIMAL,
            totalStaker: Number(totalStaker)
        }));
    }, [totalStaked, totalStakedOfAddress, totalStaker]);

    useEffect(() => {
        if (stakeInfo) {
            const data: any = stakeInfo;
            if (data) {
                const stakedAmount = Number(data[0]);
                const aprRate = Number(stakeInfo[4]);
                const rate = Number(aprRate / 10000);

                const decimal = Number(10 ** APP_ENV.ZK_DECIMAL);
                const rewards = calcRewards();
                setStakeInfoValues((prevState) => ({
                    ...prevState,
                    hasStake: stakedAmount > 0,
                    stakeShare: stakedAmount / decimal,
                    rewards,
                    dailyReward:
                        (stakedAmount * rate) / Number(365 * 24 * 60 * 60) / decimal,
                    lastClaimedTime: stakeInfo[2],
                    aprRate: Number(aprRate / 100),
                }));
            }
        }
    }, [stakeInfo]);

    useEffect(() => {
        setTxStatus(status);
    }, [status]);

    useEffect(() => {
        setTxHash(data);
    }, [data]);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCount(count + 1);
            const rewards = calcRewards();
            setStakeInfoValues((prevState) => ({
                ...prevState,
                rewards,
            }));
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch(
                    `https://api.geckoterminal.com/api/v2/networks/zksync/tokens/${process.env.NEXT_PUBLIC_ZK_ADDRESS_MAINNET}`
                );
                const priceInfo = await data.json();
                const price = priceInfo.data.attributes.price_usd;
                setStakeInfoValues((prev) => ({
                    ...prev,
                    zkPrice: price,
                }));
            } catch (e) { }
        })();
    }, []);

    return (
        <StakeContext.Provider
            value={{
                stakeInfo: stakeInfoValues,
                allowance: allowanceValue,
                txStatus,
                txHash,
                currentTx,
                txError: error,
                calcRewards,
                approve,
                stake,
                unstake,
                claim,
                setTxStatus,
                refresh,
            }}
        >
            {props.children}
        </StakeContext.Provider>
    );
};
