// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { useNavigate } from 'react-router-dom';

// const Slash = () => {
//     const navigate= useNavigate();
//     const handleClick=()=>{
//         navigate("/home");
//     }
//     return (
//         <div className="">
//             <Card className=''> 
//               <CardHeader>
//                 <CardTitle >Slash</CardTitle>
//               </CardHeader>
//               <CardContent>
//               {/* <div className="space-y-4 max-h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500" > */}
//               <div  onClick={handleClick}className="space-y-4 min-h-[69vh] " >

//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//     );
// };

// export default Slash;


import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm'

const Slash = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/home");
    }

    useEffect(() => {
        if (query.trim() === "") {
            setUsers([]);
            return;
        }

        setLoading(true);
        const debounceTimeout = setTimeout(async () => {
            const response = await axios.get(`http://localhost:3001/api/users/Search?query=${query}`);
            try {
            } catch (error) {
                setUsers(response.data.users);
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        }, 300); // 300ms debounce

        return () => clearTimeout(debounceTimeout); // Cleanup timeout
    }, [query]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 w-full rounded"
            />

            {loading && <p>Loading...</p>}

            <ul className="mt-2 border rounded p-2">
                {users.map(user => (
                    <li key={user._id} className="p-2 border-b">
                        {user.username}
                    </li>
                ))}
            </ul>

            <Button onClick={handleClick}>Go to Dashboard</Button>



            <EventForm />
        </div>
    );
};

export default Slash;
