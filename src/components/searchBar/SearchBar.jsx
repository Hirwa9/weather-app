import React, { useState } from 'react';
import './searchBar.css'
import { CaretDown, GpsFix, MagnifyingGlass, MapPin } from '@phosphor-icons/react';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';

const SearchBar = ({ search = () => { }, className }) => {

    const [city, setCity] = useState('');
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        search({ query: !useCurrentLocation ? city : null, useHere: useCurrentLocation });
    }

    return (
        <form action="" onSubmit={handleSubmit} className={className}>
            <div className='flex items-stretch bg-gray-800 text-amber-50 rounded-full overflow-hidden focus-within:border focus-within:border-dashed focus-within:border-slate-400 '>
                <MapPin size={20} className='shrink-0 self-center ms-3' />
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
                    onClick={() => { setUseCurrentLocation(false); }}
                >
                    <MagnifyingGlass size={20} />
                </button>
                <Menu className=" bg-gray-600 text-gray-200" menuButton={
                    <MenuButton className="border-s border-s-slate-500 px-3 flex-align-center">
                        <CaretDown className="me-1" />
                    </MenuButton>
                } transition>
                    <MenuItem className="text-sm active:scale-95" onClick={() => { setUseCurrentLocation(true); handleSubmit(); }}>
                        <GpsFix weight='fill' className="me-2 opacity-50" /> Use my location
                    </MenuItem>
                </Menu>

            </div>
        </form>
    )
}

export default SearchBar;
