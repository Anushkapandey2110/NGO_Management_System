import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';

const Slash = () => {
    const navigate= useNavigate();
    const handleClick=()=>{
        navigate("/home");
    }
    return (
        <div className="">
            <Card className=''> 
              <CardHeader>
                <CardTitle >Slash</CardTitle>
              </CardHeader>
              <CardContent>
              {/* <div className="space-y-4 max-h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500" > */}
              <div  onClick={handleClick}className="space-y-4 min-h-[69vh] " >
                  
                </div>
              </CardContent>
            </Card>
          </div>
    );
};

export default Slash;
