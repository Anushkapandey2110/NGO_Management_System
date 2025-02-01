import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const CreateEvent = () => {
    return (
        <div className="col-span-6">
            <Card className=''> 
              <CardHeader>
                <CardTitle >Create Event</CardTitle>
              </CardHeader>
              <CardContent>
              {/* <div className="space-y-4 max-h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500" > */}
              <div className="space-y-4 min-h-[69vh] " >
                  <h2 className="text-lg font-semibold">Upcoming Events</h2>
                  
                  
                
                </div>
              </CardContent>
            </Card>
          </div>
    );
};

export default CreateEvent;
