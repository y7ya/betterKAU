import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../../css/app.css";
import Logo from "../../../imgs/logo.png"

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg  background-nav navbar-dark shdow">
            <div class="container">
                <a class="navbar-brand" href="#"><img class="w-75" src={Logo} alt="BetterKAU" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end w-50 text-bg-dark" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">

                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>


                    <div class="offcanvas-body">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
                            <li class="nav-item mx-2">
                                <a class="nav-link link-light" href="#">Home</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link link-light" href="#">Schedule</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link link-light" href="#">Services</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link link-light" href="#">About</a>
                            </li>
                        </ul>
                        <a href="#" class="btn btn-outline-light ms-lg-3 w-auto">Get Started</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar