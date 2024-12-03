import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function Footer() {
    return (
        <footer className="w-full bg-indigo-950 text-white flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-800 fixed bottom-0">
            {/* Left Section */}
            <div className="text-center md:text-left">
                <p className="text-sm md:text-base">
                    💻 Code by{' '}
                    <a
                        href="https://github.com/VikasSaxena2204"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-400 transition"
                    >
                        Vikas Saxena
                    </a>{' '}
                    🚀
                </p>
                <p className="text-xs md:text-sm">
                    © 2024 🌟 All rights reserved to Vikas Saxena.
                </p>
            </div>


            {/* Social Media Links */}
            <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a
                    href="https://wa.me/919315858299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-green-500 transition"
                >
                    <IoLogoWhatsapp />
                </a>
                <a
                    href="mailto:vikassaxena123578@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-red-500 transition"
                >
                    <FaEnvelope />
                </a>
                <a
                    href="https://www.linkedin.com/in/2204-vikas-saxena/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-blue-500 transition"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://github.com/VikasSaxena2204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-gray-500 transition"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://my-portfolio-vikas.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-amber-500 transition"
                >
                    <FaGlobe />
                </a>
                <a
                    href="tel:+919315858299"
                    className="text-xl hover:text-teal-400 transition"
                >
                    <FaPhoneAlt />
                </a>
            </div>
        </footer>
    );
}
