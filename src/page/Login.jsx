import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const naviagte = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://beneficiary-management-web-backend.vercel.app/auth/login", { email, password });
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
            if (response.data.role == "depart") {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("depart", response.data.depart)
                localStorage.setItem("id", response.data.id)
                naviagte("/department")
            }
            if (response.data.role == "admin") {
                localStorage.setItem("token", response.data.token)
                naviagte("/admin")
            }
            console.log('Response:', response.data);
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (error.response) {
                Swal.fire({
                    title: "Something Wrong",
                    text: error.response.data.msg,
                    icon: "error"
                });
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login{import.meta.env.API}</CardTitle>
                    <CardDescription>Enter your credentials to access the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
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
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="link" onClick={() => naviagte("/")}>
                        Back to Start Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

