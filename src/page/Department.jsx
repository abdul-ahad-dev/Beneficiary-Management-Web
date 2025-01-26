import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios, { all } from "axios"
import { SeekerCard } from "../components/SeekerCard"
import Swal from "sweetalert2"

// Mock data for demonstration purposes
const MOCK_DEPARTMENTS = [
    "Financial Aid",
    "Medical Assistance",
    "Education Support",
    "Food Distribution",
    "Job Training",
]
const MOCK_STATUSES = ["Pending", "Approved", "Rejected"]


export default function Department() {
    const [department, setDepartment] = useState(null)
    const [seekers, setSeekers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")


    const getSeekers = () => {
        axios.get('http://localhost:4040/seeker')
            .then((response) => {
                const allSeekers = response.data.seeker;
                console.log(allSeekers)
                const filtered = allSeekers.filter(seeker => seeker.depart === department);
                setSeekers(filtered);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const department = await localStorage.getItem('depart');
                console.log("depart", department);

                setDepartment(department);

            } catch (error) {
                console.error('Error during fetching:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (department) {
            getSeekers();
        }
    }, [department]);

    
    const handleStatusUpdate = async (seekerId, newStatus) => {
        try {
            const response = await axios.put('http://localhost:4040/seeker/update-status', { _id: seekerId, status: newStatus });
            Swal.fire({
                title: "Success",
                text: "Successfully Updated",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            
            getSeekers()
        } catch (error) {
            const errorMessage = error.message;
            Swal.fire({
                title: "Something Wrong",
                text: errorMessage,
                icon: "error"
            });
            console.error('Error sending data:', error);
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">{department} Department Dashboard</h1>

            {/* <div className="mb-6">
                <Label htmlFor="search">Search Seekers</Label>
                <Input
                    id="search"
                    placeholder="Search by name or CNIC"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                />
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seekers.map((seeker) => (
                    <SeekerCard key={seeker._id} seeker={seeker} onUpdateStatus={handleStatusUpdate} />
                ))}
            </div>
        </div>
    )
};