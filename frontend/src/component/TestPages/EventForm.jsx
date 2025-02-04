import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import ModeratorSearch from "./Moderator"
export default function EventForm() {
    const [title, setTitle] = useState("Charity Fundraiser")
    const [description, setDescription] = useState("An event to raise funds for a noble cause.")
    const [date, setDate] = useState("2025-02-15")
    const [location, setLocation] = useState("Community Hall, Downtown")
    const [status, setStatus] = useState("approved")
    const [selectedModerators, setSelectedModerators] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault()

        const eventData = { title, description, date, location, status, selectedModerators }
        console.log("New Event Data:", eventData)
        console.log("Moderators : ",selectedModerators)
        // Reset form fields after submission
        setTitle("")
        setDescription("")
        setDate("")
        setLocation("")
        setStatus("approved")

        setSelectedModerators([])
    }

    return (
        <div className="col-span-6 space-y-4 min-h-[69vh]">
            <Card className=''>
                {/* <h2 className="text-2xl font-bold">Create New Event</h2> */}
                <CardHeader><CardTitle >Create New Event </CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Event Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label><Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />

                        </div>
                        <div>
                            <ModeratorSearch selectedModerators={selectedModerators} setSelectedModerators={setSelectedModerators} />

                        </div>
                        <Button type="submit">Create Event</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
