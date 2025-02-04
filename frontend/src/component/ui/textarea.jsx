export const Textarea = ({ id, value, onChange, placeholder = "Enter text...", required = false }) => {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
        />
    )
}

export default Textarea