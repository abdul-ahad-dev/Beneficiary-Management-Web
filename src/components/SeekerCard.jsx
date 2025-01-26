import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, UserIcon, PhoneIcon, FileTextIcon, ActivityIcon } from "lucide-react"
import { format } from "date-fns"


const statusOptions = ["Pending", "In Progress", "Completed", "Rejected"]

export function SeekerCard({ seeker, onUpdateStatus }) {
    const [status, setStatus] = useState(seeker.status)

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus)
        onUpdateStatus(seeker._id, newStatus)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800"
            case "In Progress":
                return "bg-blue-100 text-blue-800"
            case "Rejected":
                return "bg-red-100 text-red-800"
            default:
                return "bg-yellow-100 text-yellow-800"
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{seeker.name}</span>
                    <Badge variant="outline" className={`${getStatusColor(status)} px-2 py-1 rounded-full text-xs font-semibold`}>
                        {status}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <UserIcon className="w-4 h-4" />
                    <span>CNIC: {seeker.cnic}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{seeker.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ActivityIcon className="w-4 h-4" />
                    <span>{seeker.depart}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FileTextIcon className="w-4 h-4" />
                    <span>Purpose: {seeker.purpose}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Appointment: {format(new Date(seeker.appointmentDateTime), "PPpp")}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Select onValueChange={handleStatusChange} defaultValue={status}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardFooter>
        </Card>
    )
};