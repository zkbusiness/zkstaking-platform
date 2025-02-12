import type { ReferralEarning } from "@customtypes/referral";
import { Pagination } from "./Pagination";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@components/ui/Table";
import Copier from "@components/ui/Copier";
import { useEffect, useState } from "react";
import axiosRequest from "@utils/axiosRequest";
import { useUserInfo } from "@contexts/UserInfoContext";
import { CountUp } from "@components/ui/CountUp";

const DATA_PER_PAGE = 20;
export function ReferralTable() {
    const { userInfo } = useUserInfo();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [referrals, setReferrals] = useState<ReferralEarning[]>([]);

    const fetchData = async () => {
        try {
            const data: any = await axiosRequest.get("/referral", {
                address: userInfo.address,
                start: (currentPage - 1) * DATA_PER_PAGE,
                limit: DATA_PER_PAGE
            });
            setTotalPage(Math.ceil((data?.total || 0) / DATA_PER_PAGE));
            setReferrals(data?.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(currentPage);
    }, [currentPage]);

    return (
        <div className="space-y-4">
            <div className="rounded-md border border-zinc-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Address</TableHead>
                            <TableHead className="text-center">Commission</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {referrals.map((referral) => (
                            <TableRow key={referral.address}>
                                <TableCell className="font-medium text-center">{referral.name || "N/A"}</TableCell>
                                <TableCell className="font-mono text-sm text-center">
                                    <Copier text={referral.address} copyString={referral.address} reduce />
                                </TableCell>
                                <TableCell className="text-center"> <CountUp end={referral.commission} format="0,0.[0000]" />  ZKIP</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
        </div>
    );
}

