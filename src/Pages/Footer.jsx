import React from 'react';
import { CiInstagram,CiYoutube ,CiMail } from "react-icons/ci";
import { TiLocationArrowOutline } from "react-icons/ti";


export default function Footer() {
  return (
    <div>
        <div className="container-fluid px-5 py-3">
            <div className="row d-flex justify-content-between">
                <div className="col-lg-6 justify-content-center justify-content-md-start d-flex align-items-center gap-2">
                    <a target='blank' href="https://www.instagram.com/_bharti.s?utm_source=qr&igsh=MWNjN3F2c2k5NW84">
                    <CiInstagram/>
                    </a>
                    <TiLocationArrowOutline/>
                    <CiYoutube />
                    <a href="mailto:bhartikumawat89499@gmail.com">
                      <CiMail/>
                    </a>
                   

                </div>
                <div className="col-lg-6 d-flex justify-content-end  align-items-center">
                <p>
                Copyright All Right Reserved 2025@</p>
                </div>
            </div>
        </div>
      
    </div>
  )
}
