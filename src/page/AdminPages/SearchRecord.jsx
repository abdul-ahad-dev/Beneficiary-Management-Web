import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";


export default function SearchRecord() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchSeekers = async () => {
            try {
                const response = await axios.get("http://localhost:4040/seeker"); 
                console.log(response)
                setRecords(response.data.seeker);
            } catch (error) {
                console.error("Error fetching seekers data:", error);
            }
        };

        fetchSeekers();
    }, []);

    return (
        <div className="space-y-6 pt-6">
            <div className="flex items-center space-x-2">
                <Input className="max-w-sm" placeholder="Search by CNIC, name, or phone..." />
                <Button>Search</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>CNIC</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Appointment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.map((seeker) => (
                        <TableRow key={seeker._id}>
                            <TableCell className="font-medium">{seeker._id.slice(-6)}</TableCell>
                            <TableCell>{seeker.name}</TableCell>
                            <TableCell>{seeker.cnic}</TableCell>
                            <TableCell>{seeker.phone}</TableCell>
                            <TableCell>{seeker.depart}</TableCell>
                            <TableCell>{seeker.purpose}</TableCell>
                            <TableCell>{seeker.status}</TableCell>
                            <TableCell className="text-right">{format(new Date(seeker.appointmentDateTime), "PPpp")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};