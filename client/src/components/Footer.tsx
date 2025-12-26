import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Home className="text-amber-500" size={24} />
                            <h3 className="text-xl font-bold text-white">ituBeeNBee</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            This webapp is a project for the Software Engineering course at Istanbul Technical University. Do not use it for real purposes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm hover:text-amber-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/trips" className="text-sm hover:text-amber-500 transition-colors">
                                    My Trips
                                </Link>
                            </li>
                            <li>
                                <Link to="/owner-dashboard" className="text-sm hover:text-amber-500 transition-colors">
                                    Become a Host
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-amber-500 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-amber-500 transition-colors">
                                    Safety Information
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-amber-500 transition-colors">
                                    Cancellation Options
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-amber-500 transition-colors">
                                    Trust & Safety
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm">
                                <Mail size={16} className="text-amber-500" />
                                <a href="mailto:buzzbuzzbuzz@itubeenbee.com" className="hover:text-amber-500 transition-colors">
                                    buzzbuzzbuzz@itubeenbee.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Phone size={16} className="text-amber-500" />
                                <a href="tel:+905555555555" className="hover:text-amber-500 transition-colors">
                                    +90 (555) 555-5555
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <MapPin size={16} className="text-amber-500 mt-0.5" />
                                <span>Istanbul Technical University<br />Istanbul, Turkey</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-gray-400">
                            © {currentYear} ituBeeNBee. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-amber-500 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-amber-500 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-amber-500 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-amber-500 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <a href="#" className="hover:text-amber-500 transition-colors">
                                Privacy Policy
                            </a>
                            <span>•</span>
                            <a href="#" className="hover:text-amber-500 transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
