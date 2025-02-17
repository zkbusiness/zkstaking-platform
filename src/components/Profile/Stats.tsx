import { CountUp } from "@components/ui/CountUp";

export function Stats({ stakedAmount, totalZKIP }: { stakedAmount: number; totalZKIP: number; }) {
    return (
        <div className="grid grid-cols-2 gap-4 bg-gray-800 rounded-lg p-4 text-center sm:text-start">
            <div>
                <h3 className="text-lg font-semibold text-gray-400">Staked ZK</h3>
                <p className="text-2xl font-bold"><CountUp end={stakedAmount} format="0,0.[000]" /></p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-400">Total ZKIP</h3>
                <p className="text-2xl font-bold"><CountUp end={totalZKIP} format="0,0.[000]" /></p>
            </div>
        </div>
    );
}

