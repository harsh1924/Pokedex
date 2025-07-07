const Search = ({ setSearch }) => {

    return (
        <div className='mx-auto pb-4'>
            <input
                type="text"
                placeholder='Pokemon Name...'
                className="w-[300px] md:w-[500px] bg-white flex flex-col outline-none border rounded-md text-[12px] px-4 py-1 border-gray-500"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export default Search