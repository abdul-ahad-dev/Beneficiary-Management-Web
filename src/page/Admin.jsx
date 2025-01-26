import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Dashboard from "./AdminPages/Dashboard"
import SearchRecord from "./AdminPages/SearchRecord"
import CreateDepartment from "../components/CreateDepartment"


export default function Admin() {
    const [activeTab, setActiveTab] = useState("/admin")
    const location = useLocation()


    useEffect(() => {
        setActiveTab(location.pathname)
    }, [location.pathname]);

    const navigate = useNavigate(); 

    const handleLogout = () => {
        navigate("/"); 
    };
    const renderComponent = () => {
        switch (activeTab) {
            case "/admin":
                return <Dashboard />
            case "/admin/searchrecoard":
                return <SearchRecord />
            case "/admin/createacc":
                return <CreateDepartment />
            default:
                return <Dashboard /> // Fallback to Dashboard if no match
        }
    }

    return (
        <div className="min-h-screen ">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between md:flex-row flex-col py-4 gap-4 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-gray-900">BMS Admin</span>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" asChild>
                                <Link to={"/admin"}>
                                    Dashboard
                                </Link>
                            </Button>

                            <Button variant="ghost" asChild>
                                <Link to={"/admin/searchrecoard"}>
                                    Search Recoard
                                </Link>
                            </Button>

                            <Button variant="ghost" asChild>
                                <Link to={"/admin/createacc"}>
                                    Department
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center">
                            <Button onClick={handleLogout} variant="ghost" size="sm">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Render the appropriate component based on the activeTab */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {renderComponent()}
            </main>
        </div>
    )
}