import React, { useState } from 'react';
import './searchBar.css'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react';

const SearchBar = ({ search = () => { }, className }) => {

    const [city, setCity] = useState('');
    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        search(city);
    }

    return (
        <form action="" onSubmit={handleSubmit} className={className}>
            <div className='flex items-stretch bg-gray-800 text-amber-50 rounded-full overflow-hidden focus-within:border focus-within:border-dashed focus-within:border-slate-400 '>
                <MapPin size={20} className='self-center ms-3' />
                <input
                    className='flex-1 px-2 outline-0 bg-inherit search-input caret-inherit'
                    style={{ transition: "padding .1s" }}
                    type="text"
                    name="city_name"
                    id="search-input"
                    placeholder='Enter city/location name'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <button
                    type="submit"
                    className='flex items-center justify-center w-[20%] min-w-10 max-w-20 h-8 py-1 cursor-pointer active:scale-95 hover:bg-white/10 active:bg-transparent'
                    style={{ transition: "scale .1s, background .3s" }}
                    onClick={() => handleSubmit()}
                >
                    <MagnifyingGlass size={20} />
                </button>
            </div>
        </form>
    )
}

export default SearchBar;
