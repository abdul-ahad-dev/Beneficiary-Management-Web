import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";


export default function SearchRecord() {
    const [filteredSeekers, setFilteredSeekers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState(undefined);
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const fetchSeekers = async () => {
            try {
                const response = await axios.get("https://beneficiary-management-web-backend.vercel.app/seeker");
                console.log(response.data.seeker)
                setFilteredSeekers(response.data.seeker);
            } catch (error) {
                console.error("Error fetching seekers data:", error);
            }
        };

        fetchSeekers();
    }, []);


    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get("https://beneficiary-management-web-backend.vercel.app/seeker/metadata");
                setDepartments(response.data.departments);
                setStatuses(response.data.statuses);
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };
        fetchMetadata();
    }, []);


    useEffect(() => {
        const fetchFilteredRecords = async () => {
            try {
                const params = {
                    searchTerm,
                    department: departmentFilter !== "All" ? departmentFilter : undefined,
                    status: statusFilter !== "All" ? statusFilter : undefined,
                    date: dateFilter ? format(dateFilter, "yyyy-MM-dd") : undefined
                };

                const response = await axios.get("https://beneficiary-management-web-backend.vercel.app/seeker/search", { params });
                setFilteredSeekers(response.data.seekers);
            } catch (error) {
                console.error("Error fetching filtered records:", error);
            }
        };

        fetchFilteredRecords();
    }, [searchTerm, departmentFilter, statusFilter, dateFilter]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl px-4 font-bold">Search Records</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="search">Search by Name or CNIC</Label>
                    <Input
                        id="search"
                        placeholder="Enter name or CNIC"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>CNIC</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Appointment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSeekers.map((seeker) => (
                        <TableRow key={seeker._id}>
                            <TableCell>{seeker.name}</TableCell>
                            <TableCell>{seeker.cnic}</TableCell>
                            <TableCell>{seeker.phone}</TableCell>
                            <TableCell>{seeker.depart}</TableCell>
                            <TableCell>{seeker.purpose}</TableCell>
                            <TableCell>{seeker.status}</TableCell>
                            <TableCell>{format(new Date(seeker.appointmentDateTime), "PPpp")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};