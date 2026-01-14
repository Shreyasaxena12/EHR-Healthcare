import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/auth/AuthContext";
import { FiMenu, FiX } from "react-icons/fi"; // icons for hamburger

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const adminMenu = [
        { label: "Dashboard", path: "/admin-dashboard" },
        {
            label: "Users",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/user-dash" },
                { label: "All Users", path: "/admin-dashboard/allusers" },
                { label: "Add User", path: "/admin-dashboard/add-user" }, // If this route exists
            ],
        }
        ,
        {
            label: "Labs",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/labs-dash" },
                { label: "Reports", path: "/admin-dashboard/labs-report" },
                { label: "Labs Assistants", path: "/admin-dashboard/labs-assistants" },
            ],
        },
        {
            label: "Finance",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/finance-dash" },
                { label: "Revenue Reports", path: "/admin-dashboard/finance-reports" },
            ],
        },
        {
            label: "Pharmacy",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/Pharmacy-dash" },
                { label: "Inventory", path: "/admin-dashboard/pharmacy-inventory" },
                { label: "Issue Medicine", path: "/admin-dashboard/pharmacy-issue" },
            ],
        },
        {
            label: "Wards",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/wards-dash" },
            ],
        },
        {
            label: "Reports",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/reports-dash" },
                { label: "Revenue Report", path: "/admin-dashboard/reports-revenue" },
            ],
        },
        {
            label: "Teams",
            subItems: [
                { label: "Dashboard", path: "/admin-dashboard/team-dash" },
                { label: "Doctors", path: "/admin-dashboard/team-doctor" },
                { label: "Nurses", path: "/admin-dashboard/team-nurse" },
                { label: "Labs Staff", path: "/admin-dashboard/team-lab" },

            ],
        },
    ];

    const doctorMenu = [
        {
            label: "Dashboard",
            path: "/doctor-dashboard",
        },
        {
            label: "Appointments",
            subItems: [
                { label: "Today's Appointments", path: "/doctor-dashboard/appointments" },
                { label: "All Appointments", path: "/doctor-dashboard/all-apointments" },
            ],
        },
        {
            label: "Patients",
            subItems: [
                { label: "Current Patient List", path: "/doctor-dashboard/current-patient" },
                { label: "All Patient", path: "/doctor-dashboard/all-patient" },
                { label: "Add Patient", path: "/doctor-dashboard/add-patient" }
            ],
        },
        {
            label: "Lab Reports",
            subItems: [
                { label: "Add Reports", path: "/doctor-dashboard/add-reports" },
                { label: "All Reports", path: "/doctor-dashboard/reports" },
            ],
        },
        {
            label: "Prescriptions",
            subItems: [
                { label: "Write Prescription", path: "/doctor-dashboard/add-prescription" },
                { label: "Prescription History", path: "/doctor-dashboard/all-prescription" },
            ],
        },
        {
            label: "Performance",
            subItems: [
                { label: "Monthly Stats", path: "/doctor-dashboard/stats" },
                { label: "Patient Feedback", path: "/doctor-dashboard/feedbacks" },
            ],
        },
    ];

    // Labs
    const labMenu = [
        {
            label: "Dashboard",
            path: "/labs-dashboard",
        },
        {
            label: "Request",
            subItems: [
                { label: "Nurse Request", path: "/labs-dashboard/nurse-request" },
                { label: "Doctor Requests", path: "/labs-dashboard/doctor-request" },
            ],
        },
        {
            label: "Reports",
            subItems: [
                { label: "Upload Report", path: "/labs-dashboard/upload-report" },
                { label: "All Reports", path: "/labs-dashboard/all-report" },
                { label: "Pending Reports", path: "/labs-dashboard/pending-reports" },
            ],
        },
        {
            label: "Patients",
            subItems: [
                { label: "Patient List", path: "/labs-dashboard/all-patient" },
                { label: "Add Patient", path: "/labs-dashboard/add-patient" },
                { label: "Patient History", path: "/labs-dashboard/patient-history" },
            ],
        },
        {
            label: "Billing",
            subItems: [
                { label: "Invoices", path: "/labs-dashboard/invoices" },
                { label: "Payments Received", path: "/labs-dashboard/payments" },
                { label: "Generate Bill", path: "/labs-dashboard/generate-bill" },
            ],
        },
        {
            label: "Inventory",
            subItems: [
                { label: "Lab Equipment", path: "/labs-dashboard/equipment" },
                { label: "Stock Management", path: "/labs-dashboard/stock" },
            ],
        },
        {
            label: "Performance",
            subItems: [
                { label: "Monthly Analytics", path: "/labs-dashboard/analytics" },
                { label: "Technician Logs", path: "/labs-dashboard/technician-logs" },
            ],
        },
    ];

    const accountsMenu = [
        {
            label: "Dashboard",
            path: "/accounts-dashboard",
        },
        {
            label: "Billing",
            subItems: [
                { label: "Invoices", path: "/accounts-dashboard/invoices" },
                { label: "Create Invoice", path: "/accounts-dashboard/invoices/create" },
                { label: "Payments", path: "/accounts-dashboard/payments" },
                { label: "Refunds", path: "/accounts-dashboard/refunds" },
            ],
        },
        {
            label: "Insurance Claims",
            subItems: [
                { label: "Claims List", path: "/accounts-dashboard/insurance-claims" },
                { label: "Submit Claim", path: "/accounts-dashboard/insurance-claims/submit" },
                { label: "Claim Reports", path: "/accounts-dashboard/insurance-claims/reports" },
            ],
        },
        {
            label: "Expenses",
            subItems: [
                { label: "Expense List", path: "/accounts-dashboard/expenses" },
                { label: "Add Expense", path: "/accounts-dashboard/expenses/add" },
            ],
        },
        {
            label: "Reports",
            path: "/accounts-dashboard/reports",
        },
        {
            label: "Users",
            path: "/accounts-dashboard/users",
        },

    ];


    const menuItems = {
        admin: adminMenu,
        doctor: doctorMenu,
        labs: labMenu,
        accounts: accountsMenu,
    };

    const links = menuItems[user.role] || [];

    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="bg-[#141414] text-white px-6 py-3 flex justify-between items-center shadow-md relative z-50">
            {/* Logo and Title */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-2 text-2xl font-bold select-none">
                    <img src="/logo.png" alt="logo" className="w-12" />
                    <Link to={`/${user.role}-dashboard`}>EHR</Link>
                </div>
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white text-2xl focus:outline-none"
                >
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 ml-6">
                {links.map((item, idx) => {
                    const isActive = item.path
                        ? location.pathname === item.path
                        : item.subItems?.some((sub) => location.pathname === sub.path);

                    return (
                        <li key={idx} className="relative group">
                            {item.subItems ? (
                                <>
                                    <span
                                        className={`cursor-pointer flex items-center gap-1 hover:text-[#dcdc3c] ${isActive ? "text-[#dcdc3c] font-semibold" : ""
                                            }`}
                                    >
                                        {item.label} <span className="text-xs">▼</span>
                                    </span>
                                    <ul className="absolute left-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-md z-50 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
                                        {item.subItems.map((sub) => (
                                            <li key={sub.path}>
                                                <Link
                                                    to={sub.path}
                                                    className={`block px-4 py-2 text-sm hover:bg-[var(--clr-lemon)] hover:text-white hover:rounded-md ${location.pathname === sub.path ? "text-[#dcdc3c] font-semibold" : ""
                                                        }`}
                                                >
                                                    {sub.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={`hover:text-[#dcdc3c] transition duration-200 ${location.pathname === item.path ? "text-[#dcdc3c] font-semibold" : ""
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* User Dropdown */}
            <div className="relative ml-4" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center space-x-2 focus:outline-none"
                >
                    <div className="bg-[#dcdc3c] cursor-pointer text-black rounded-full w-10 h-10 flex items-center justify-center uppercase font-bold">
                        {(user.name && user.name[0]) || user.id[0] || "U"}
                    </div>
                    <svg
                        className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-black ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold">{user.name || user.id}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                        <ul>
                            <li>
                                <Link
                                    to={`/${user.role}-dashboard`}
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Settings and Support
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#141414] text-white shadow-lg z-40">
                    <ul className="flex flex-col p-4 space-y-3">
                        {links.map((item, idx) => (
                            <li key={idx}>
                                {item.subItems ? (
                                    <details className="group">
                                        <summary className="cursor-pointer font-semibold hover:text-[#dcdc3c] flex justify-between">
                                            {item.label}
                                            <span>▼</span>
                                        </summary>
                                        <ul className="ml-4 mt-2">
                                            {item.subItems.map((sub) => (
                                                <li key={sub.path}>
                                                    <Link
                                                        to={sub.path}
                                                        className={`block py-1 hover:text-[#dcdc3c] ${location.pathname === sub.path ? "text-[#dcdc3c] font-semibold" : ""}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`block hover:text-[#dcdc3c] ${location.pathname === item.path ? "text-[#dcdc3c] font-semibold" : ""}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
