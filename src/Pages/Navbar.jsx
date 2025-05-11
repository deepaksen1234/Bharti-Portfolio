import React from 'react'
import { CiInstagram,CiMail } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import Logo from "../../public/fav-icon.png"

export default function Navbar() {
  return (
    <div>
      <nav className="d-flex justify-content-center">
        <div className="main-bar-div border d-flex gap-5 align-items-center">
          <div className="header-title-text">
            <a href="#home">
              Bharti Kumawat
            </a>
          </div>
          <div className='d-block d-md-none'>
            <a className="btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              <FaBarsStaggered />
            </a>
          </div>
          <ul className="d-flex navbar-section list-unstyled gap-4 m-0 p-0 d-none d-md-flex">
            <li><a href="#about" className="text-decoration-none about-nav-bar text-dark">About</a></li>
            <li><a href="#portfolio" className="text-decoration-none nav-1 text-dark">Portfolio</a></li>
            <li><a href="#vital"  className="text-decoration-none nav-1 text-dark">Vital Stats</a></li>
            <li><a target='blank' href="https://www.instagram.com/_bharti.s?utm_source=qr&igsh=MWNjN3F2c2k5NW84" className="text-decoration-none nav-1 text-dark"><CiInstagram /></a></li>
          </ul>
        </div>
      </nav>

      {/* mobile navbar */}
      <div className="offcanvas mobileside-bar offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <img style={{
              width:'45%'
            }} src={Logo} alt="" />
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled">
            <li><a href="#about" className="text-decoration-none d-block py-2">About</a></li>
            <li><a href="#portfolio" className="text-decoration-none d-block py-2">Portfolio</a></li>
            <li><a href="#contact" className="text-decoration-none d-block py-2">Contact</a></li>
            <li className='d-flex gap-2'>
            <a target='blank' href="https://www.instagram.com/_bharti.s?utm_source=qr&igsh=MWNjN3F2c2k5NW84" className="text-decoration-none nav-1 text-dark"><CiInstagram /></a>
               <a href="mailto:bhartikumawat89499@gmail.com">
                                    <CiMail/>
                                  </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
