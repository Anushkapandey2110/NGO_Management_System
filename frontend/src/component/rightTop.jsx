import {Card, CardContent, CardHeader, CardTitle}from './ui/card'
import { Calendar } from 'lucide-react';
const RightTop =()=>{
    return (
        <Card className='min-h-[40vh]'>
            <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar className="w-full h-48" />
            </CardContent>
        </Card>
    )
}

export default RightTop;