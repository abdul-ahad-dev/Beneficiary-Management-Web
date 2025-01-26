import { useState } from "react"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

const departmentOptions = [
    "Health Department",
    "Blood Bank",
    "Financial Aid",
    "Medical Assistance",
    "Education Support",
    "Food Distribution",
    "Job Training"
];


export default function RegisterBeneficiary() {
    const [formData, setFormData] = useState({
        cnic: "",
        name: "",
        phone: "",
        address: "",
        depart: "",
        purpose: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const naviagte = useNavigate()


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setIsLoading(true);
        
            const response = await axios.post('https://beneficiary-management-web-backend.vercel.app/seeker/register', formData);
           
            Swal.fire({
                title: "Success",
                text: "Appoinment Successfully Created",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });

            setIsLoading(false);
            formData.address = "",
                formData.cnic = "",
                formData.depart = "",
                formData.name = "",
                formData.phone = "",
                formData.purpose = ""
            console.log('Response:', response.data);
        } catch (error) {
            const errorMessage = error.message;
            Swal.fire({
                title: "Something Wrong",
                text: error.response.data.msg,
                icon: "error"
            });
            setIsLoading(false);
            console.error('Error sending data:', errorMessage);
        }
    }

    return (
        <div className="w-full py-14">
            <div className="max-w-2xl p-10 mx-auto shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold mb-8">Register Beneficiary</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="cnic">CNIC</Label>
                        <Input id="cnic" name="cnic" value={formData.cnic} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>


                    <div>
                        <Label htmlFor="depart">Department</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, depart: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departmentOptions.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="purpose">Purpose</Label>
                        <Textarea id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required />
                    </div>
                    {
                        isLoading ?
                            <div
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-600 hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500 cursor-not-allowed"
                                aria-disabled
                                role="status"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-200 animate-spin fill-black"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            <Button type="submit">Register and Generate Token</Button>
                    }
                </form>

                <Card className="flex mt-10 justify-center">
                    <Button variant="link" onClick={() => naviagte("/")}>
                        Back to Start Page
                    </Button>
                </Card>
            </div>
        </div>
    )
};