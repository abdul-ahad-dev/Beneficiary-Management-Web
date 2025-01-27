import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
    { name: "Financial Aid", visitors: 400 },
    { name: "Medical Assistance", visitors: 300 },
    { name: "Education Support", visitors: 200 },
    { name: "Food Distribution", visitors: 278 },
    { name: "Job Training", visitors: 189 },
]

export default function Dashboard() {
    const [departmentCounts, setDepartmentCounts] = useState([]);
    const [totalSeekers, setTotalSeekers] = useState(0);
    const [activeCases, setActiveCases] = useState(0);
    const [completedCases, setCompletedCases] = useState(0);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await axios.get('https://beneficiary-management-web-backend.vercel.app/seeker/depart-wise');
                const data = response.data;

                setDepartmentCounts(data); // Set department-wise data for the chart

                // Calculate total seekers, active and completed cases
                let totalSeekersCount = 0;
                let activeCasesCount = 0;
                let completedCasesCount = 0;
                let departmentNames = [];

                data.forEach(department => {
                    totalSeekersCount += department.totalCount;

                    department.statuses.forEach(status => {
                        if (status.status === "In Progress") activeCasesCount += status.count;
                        if (status.status === "Completed") completedCasesCount += status.count;
                    });

                    departmentNames.push(department.department);
                });

                setTotalSeekers(totalSeekersCount);
                setActiveCases(activeCasesCount);
                setCompletedCases(completedCasesCount);
                setDepartments(departmentNames);
            } catch (error) {
                console.error("Error fetching department data", error);
            }
        };

        fetchDepartmentData();
    }, []);


    const chartData = departmentCounts.map(department => ({
        name: department.department,
        visitors: department.totalCount,
    }));

    return (
        <div className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSeekers}</div>
                        <p className="text-xs text-muted-foreground">+80 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCases}</div>
                        <p className="text-xs text-muted-foreground">+22 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedCases}</div>
                        <p className="text-xs text-muted-foreground">+43 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{departments.length}</div>
                        <p className="text-xs text-muted-foreground"> {departments.join(", ")}</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Department Activity</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="visitors" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
};