import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input"
export default function ModeratorSearch({ selectedModerators, setSelectedModerators }) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.trim() === "") {
            setUsers([]);
            return;
        }

        const debounceTimeout = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/api/users/Search?query=${query}`);
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        }, 300); // 300ms debounce

        return () => clearTimeout(debounceTimeout); // Cleanup timeout
    }, [query]);

    // Function to add a moderator
    const handleAddModerator = (user) => {
        if (!selectedModerators.some((mod) => mod._id === user._id)) {
            setSelectedModerators([...selectedModerators, user]);
        }
        setQuery(""); // Clear search input after selection
        setUsers([]); // Clear user list
    };

    // Function to remove a moderator
    const handleRemoveModerator = (userId) => {
        setSelectedModerators(selectedModerators.filter((mod) => mod._id !== userId));
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium">Moderators</label>

            {/* Input Box with Selected Moderators */}
            <div className="border rounded w-full mt-1 p-2 flex flex-wrap gap-2 min-h-[40px] overflow-y-auto max-h-40">
                {selectedModerators.map((mod) => (
                    <div
                        key={mod._id}
                        className="flex items-center bg-blue-500 text-white text-xs rounded-full py-1 px-2"
                    >
                        <span>{mod.username}</span>
                        <button
                            onClick={() => handleRemoveModerator(mod._id)}
                            className="ml-1 text-sm"
                        >
                            ✖
                        </button>
                    </div>
                ))}

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-1 w-full min-w-[100px] flex-grow bg-transparent focus:outline-none"
                />
            </div>

            {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}

            {/* Search Results */}
            {query && (
                <ul className="mt-2 border rounded p-2 bg-white">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="p-2 border-b cursor-pointer hover:bg-gray-100"
                            onClick={() => handleAddModerator(user)}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
