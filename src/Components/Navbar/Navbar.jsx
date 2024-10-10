import React, { useState } from 'react';
import '../Navbar/Navbar.css'
import NT from '../../Images/NucleusTeq Logo.png';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <img src={NT} alt='Logo' />
      </div>
      <h2 className='heading'>Welcome User</h2>
      <div className='navbar-button'>
        <button className='btn' onClick={toggleDropdown}>T</button>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <button className='dropdown-item'>Profile</button>
            <button className='dropdown-item'>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;