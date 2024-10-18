export const Input = ({type,placeholder}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
    )
}