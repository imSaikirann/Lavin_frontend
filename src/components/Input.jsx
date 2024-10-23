export const Input = ({ type, name, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'
        />
    );
};
