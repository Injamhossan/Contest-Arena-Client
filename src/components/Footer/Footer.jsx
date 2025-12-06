import React from 'react';
import FooterLogo from '../../assets/logo.svg';
import FaceBook from "../../assets/social/communication.png";
import Twitter from "../../assets/social/twitter.png";
import Instagram from "../../assets/social/social.png";
import LinkedIn from "../../assets/social/linkedin.png";

const Footer = () => {
  return (
    <div className="bg-white px-10 pt-10 border-t">
      <div>
      <footer className="footer sm:footer-horizontal mx-auto max-w-[1780px] text-gray-600 mb-6">

        {/* Brand */}
        <aside>
          <div className="flex items-center gap-2 mb-3">
            <img src={FooterLogo} alt="Footer Logo" className="h-[50px]" />
            <span className="text-xl font-bold bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
              Contest Arena
            </span>
          </div>
          <p>
            The ultimate platform for creative competitions. <br />
            Join thousands of creators in design, photography, <br />
            writing, and more. Build your portfolio and win prizes.
          </p>
        </aside>

        {/* Services */}
        <nav>
          <h6 className="footer-title text-gray-700">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

        {/* Company */}
        <nav>
          <h6 className="footer-title text-gray-700">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title text-gray-700">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>

        {/* Social */}
        <nav>
          <h6 className="footer-title text-gray-700">Social</h6>
          <div className="flex gap-3 items-center">
            <img src={FaceBook} alt="Facebook Logo" className="h-7 hover:opacity-70 cursor-pointer transition" />
            <img src={Twitter} alt="Twitter Logo" className="h-7 hover:opacity-70 cursor-pointer transition" />
            <img src={Instagram} alt="Instagram Logo" className="h-7 hover:opacity-70 cursor-pointer transition" />
            <img src={LinkedIn} alt="LinkedIn Logo" className="h-7 hover:opacity-70 cursor-pointer transition" />
          </div>
        </nav>
      </footer>
      </div>

      {/* Centered Copyright */}
      <hr />
      <div className="mx-auto max-w-[1780px] my-5 py-5">
        <p className="text-center text-gray-700 font-medium">
          © {new Date().getFullYear()} Contest Arena — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
