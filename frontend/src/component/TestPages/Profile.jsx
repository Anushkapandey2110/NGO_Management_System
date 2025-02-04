import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const Profile = () => {
  return (
    <div className="col-span-6">
      <Card className=''>
        <CardHeader>
          <CardTitle >Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="space-y-4 max-h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500" > */}
          <div className="space-y-4 min-h-[69vh] " >
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            {/* <p>You have 3 upcoming events this week.</p>
                  
                  <h2 className="text-lg font-semibold mt-6">Your Role</h2>
                  <p>You are logged in as: Admin</p>
                  
                  <h2 className="text-lg font-semibold mt-6">Quick Actions</h2> */}


          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
