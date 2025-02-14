import { Pagination } from "./Pagination";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@components/ui/Table";
import Copier from "@components/ui/Copier";
import { useEffect, useState } from "react";
import axiosRequest from "@utils/axiosRequest";
import { CountUp } from "@components/ui/CountUp";
import { TableUser } from "@customtypes/usertable";

const DATA_PER_PAGE = 20;
export function UserTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [users, setUsers] = useState<TableUser[]>([]);

    const fetchData = async () => {
        try {
            const data: any = await axiosRequest.get("/leaderboard", {
                start: (currentPage - 1) * DATA_PER_PAGE,
                limit: DATA_PER_PAGE
            });
            setTotalPage(Math.ceil((data?.total || 0) / DATA_PER_PAGE));
            setUsers(data?.result || []);
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
            <div className="rounded-md border text-sm  border-zinc-800 w-full overflow-y-auto">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">S/N</TableHead>
                            <TableHead className="text-center">User</TableHead>
                            <TableHead className="text-center">AMOUNT STAKED ($ZK)</TableHead>
                            <TableHead className="text-center">REFERRALS</TableHead>
                            <TableHead className="text-center">CHECKING COUNT</TableHead>
                            <TableHead className="text-center">ZKIPs COLLECTED</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((referral, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-center">{DATA_PER_PAGE * (currentPage - 1) + i + 1}</TableCell>
                                <TableCell className=" text-center"><Copier text={referral.address} copyString={referral.address} reduce /></TableCell>
                                <TableCell className=" text-center"><CountUp end={referral.stakedAmount} format="0,0.[000]" suffix="ZK" /></TableCell>
                                <TableCell className=" text-center"><CountUp end={referral.numberOfUsersInvited} /></TableCell>
                                <TableCell className=" text-center"><CountUp end={referral.dailyCheckIns} /></TableCell>
                                <TableCell className=" text-center"><CountUp suffix="ZKIP" end={referral.zkipCollected} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
        </div>
    );
}

