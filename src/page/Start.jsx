import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus, Scan } from "lucide-react"
import { Link } from "react-router-dom"

export default function Start() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-6xl w-full px-4">
                <h1 className="text-4xl font-bold text-center mb-12">Beneficiary Management System</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center">
                                <LogIn className="mr-2" />
                                Login
                            </CardTitle>
                            <CardDescription>Admin / Department Staff</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>Access the system as an administrator or department staff member.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link to="/login">Login</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center">
                                <UserPlus className="mr-2" />
                                Receptionist
                            </CardTitle>
                            <CardDescription>Beneficiary Registration</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>Register new beneficiaries and generate tokens for assistance.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link to="/registerbeneficiary">Register Beneficiary</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center">
                                <Scan className="mr-2" />
                                Department
                            </CardTitle>
                            <CardDescription>Scan Token</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>Scan beneficiary tokens to access and update their information.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link to="/scan">Scan Token</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
};