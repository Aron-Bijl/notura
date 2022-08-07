import React from 'react';
// import { Link } from 'react-router-dom';


export default function Footer () {

    return(
       <>
         <footer className="notura-footer pt-3 pt-md-5 bg-lightest-gray">
            <div className="container">
            <div className="row pt-4 pb-0 pb-md-5">
                <div className="col-md-6">
                <div className="notura-footer-contnet pe-0 pe-lg-5 me-0 me-md-5">
                    <a href="/">
                    <h3>Notura</h3>
                    </a>
                    <h5 className="mt-3 pe-0 pe-lg-5 me-0 me-lg-4">A recipe App that solely exists for the pleasures of your mouth.</h5>
                </div>
                </div>
                <div className="col-md-2">
                          {/*
                <h6 className="caption mb-2">
                    Notura
                </h6>
                <ul>
                    <li><Link to="#0">About us</Link></li>
                    <li><Link to="#0">Careers</Link></li>
                    <li><Link to="#0">Contact us</Link></li>
                    <li><Link to="#0">Feedback</Link></li>
                </ul>
                </div>
                <div className="col-md-2">
                <h6 className="caption mb-2">
                    Legal
                </h6>
                <ul>
                    <li><Link to="#0">Terms</Link></li>
                    <li><Link to="#0">Conditions</Link></li>
                    <li><Link to="#0">Cookies</Link></li>
                    <li><Link to="#0">Copyright</Link></li>
                </ul>
                */}
                </div>
            </div>
            </div>
            <div className="container">
            <hr />
            <div className="row pb-4 pt-2 align-items-center">
                <div className="col-md-6 order-2 order-md-0">
                <p className="text-gray-300 small text-start mb-0">&copy; 2022 Notura - All rights reserved</p>
                </div>
            </div>
            </div>
        </footer>
       </>
    )
}