import {Card, CardContent, CardHeader, CardTitle}from './ui/card'
import { Calendar } from 'lucide-react';
const RightBottom =()=>{
    const stats = {
        easy: { count: 91, total: 852 },
        medium: { count: 210, total: 795 },
        hard: { count: 33, total: 792 }
    };
    return (
        <Card className='min-h-[30vh]'>
              <CardHeader>
                <CardTitle className="text-lg">Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(stats).map(([level, data]) => (
                    <div key={level} className="flex justify-between items-center">
                      <span className="capitalize">{level}</span>
                      <span>
                        {data.count}/{data.total}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
    )
}

export default RightBottom