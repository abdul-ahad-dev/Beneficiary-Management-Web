import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Swal from 'sweetalert2'
import axios from "axios"

const departmentOptions = [
    "Financial Aid",
    "Medical Assistance",
    "Education Support",
    "Food Distribution",
    "Job Training"
]

export default function CreateDepartment() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [depart, setDepartmentName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!email || !password || !depart) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
            })
            return
        }

        try {
            const response = await axios.post('http://localhost:4040/auth/signup', { email, password, depart });
            Swal.fire({
                title: "Success",
                text: "Successfully Created",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            // Reset form
            setEmail("")
            setPassword("")
            setDepartmentName("")
            console.log('Response:', response.data);
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
        <div className="container mx-auto py-10">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Create Department Account</CardTitle>
                    <CardDescription>Add a new department to the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="department@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department Name</Label>
                            <Select value={depart} onValueChange={setDepartmentName} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
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
                        <Button type="submit" className="w-full">Create Department Account</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
};