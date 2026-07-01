import { BikeIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { footerData } from "../assets/assets";

function Footer() {
    return (
        <footer className="bg-app-green text-white px-30 py-12">
            <div className="max-w-7xl mx-auto">

                {/* TOP */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                            <BikeIcon />
                            <span>{footerData.brand.name}</span>
                        </Link>

                        <p className="text-sm text-white/70 leading-relaxed">
                            {footerData.brand.description}
                        </p>

                        {/* Socials */}
                        <div className="flex gap-3 mt-2">
                            {footerData.brand.socials.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Sections */}
                    {footerData.sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                                {section.title}
                            </h3>

                            <ul className="flex flex-col gap-2 text-sm text-white/70">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        {link.to ? (
                                            <Link
                                                to={link.to}
                                                className="hover:text-white transition"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="hover:text-white transition"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                            Contact Us
                        </h3>

                        <div className="flex flex-col gap-3 text-sm text-white/70">
                            {footerData.contact.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <item.icon size={16} />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">

                    <p>{footerData.bottom.copyright}</p>

                    <div className="flex gap-4">
                        {footerData.bottom.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="hover:text-white transition"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;