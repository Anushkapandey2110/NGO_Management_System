import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Header =()=>{
    const { logout }=useContext(AuthContext);
    const navigate=useNavigate();
    const Handlelogout=()=>{
        logout();
        navigate('/')
    }
    return (
        <>
            <header className="bg-black text-white p-4 sticky-top-0 " >
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">NGO Management</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, John Doe (Admin)</span>
                        <button onClick={Handlelogout} className="px-3 py-1 rounded bg-gray-700">Logout</button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;