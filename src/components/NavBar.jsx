import React, { useState } from 'react'
import logo from '../images/logo.svg'
import { FaAlignRight } from 'react-icons/fa'
import { NavLink, Link } from 'react-router-dom'


export default function NavBar() {

	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => {
		setIsOpen(!isOpen);
	}


	return (
		<nav className='navbar'>
			<div className="nav-center">
				<div className="nav-header">
					<Link to='/'>
						<img src={logo} alt="Beach Resort" />
					</Link>
					<button className="nav-btn">
						<FaAlignRight className='nav-icon' onClick={handleToggle} />
					</button>
				</div>
				<ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
					<li>
						<NavLink
							exact
							to='/'
							activeStyle={{ background: '#7dafac94', borderRadius: '5px', padding: '5px' }}
						>Home</NavLink>
					</li>
					<li>
						<NavLink
							to='/rooms/'
							activeStyle={{ background: '#7dafac94', borderRadius: '5px', padding: '5px' }}
						>Rooms</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}
