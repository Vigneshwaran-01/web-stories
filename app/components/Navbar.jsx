"use client";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";
import Link from 'next/link'

const NavLinks = ({ selectedDropdown, setSelectedDropdown }) => {
  return (
    <>
      <ul className="hidden md:flex gap-5 mt-2 justify-center items-center">
        <li>
          <Dropdown
            value={"Carbonio Mail"}
            isOpen={selectedDropdown === "Carbonio Mail"}
            toggleDropdown={() =>
              setSelectedDropdown(
                selectedDropdown === "Carbonio Mail" ? null : "Carbonio Mail"
              )
            }
            options={[
                { label: "Home", link: "/" },
                { label: "About Us", link: "/about" },
                { label: "Services", link: "/services" },
              ]}
          />
        </li>
        <li>
          <Dropdown
            isOpen={selectedDropdown === "Servers"}
            toggleDropdown={() =>
              setSelectedDropdown(
                selectedDropdown === "Servers" ? null : "Servers"
              )
            }
            value={"Servers"}
            options={[
                { label: "Home", link: "/" },
                { label: "About Us", link: "/about" },
                { label: "Services", link: "/services" },
              ]}
          />
        </li>
        <li>
          <Dropdown
            isOpen={selectedDropdown === "Spam Filter"}
            toggleDropdown={() =>
              setSelectedDropdown(
                selectedDropdown === "Spam Filter" ? null : "Spam Filter"
              )
            }
            value={"Spam Filter"}
            options={[
                { label: "Home", link: "/" },
                { label: "About Us", link: "/about" },
                { label: "Services", link: "/services" },
              ]}
          />
        </li>

        <li className="text-lg text-gray-700">Contact us</li>

        <li className="text-lg font-medium text-gray-700">Get a Demo</li>
      </ul>
    </>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white p-2 sticky top-0 flex-wrap z-50">
      <nav className="flex md:flex-row justify-between px-4 items-center">
        <div className="max-w-56 min-w-44">
          <img src="/company-logo.webp" alt="company-logo" />
        </div>

        <NavLinks
          selectedDropdown={selectedDropdown}
          setSelectedDropdown={setSelectedDropdown}
        />

        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <RiCloseLine size={30} /> : <RiMenu2Line size={30} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex flex-col md:hidden mt-4">
          <ul className="space-y-4">
            <li>
              <Dropdown
                value={"Carbonio Mail"}
                isOpen={selectedDropdown === "Carbonio Mail"}
                toggleDropdown={() =>
                  setSelectedDropdown(
                    selectedDropdown === "Carbonio Mail" ? null : "Carbonio Mail"
                  )
                }
                options={[
                    { label: "Home", link: "/" },
                    { label: "About Us", link: "/about" },
                    { label: "Services", link: "/services" },
                  ]}
              />
            </li>
            <li>
              <Dropdown
                isOpen={selectedDropdown === "Servers"}
                toggleDropdown={() =>
                  setSelectedDropdown(
                    selectedDropdown === "Servers" ? null : "Servers"
                  )
                }
                value={"Servers"}
                options={[
                    { label: "Home", link: "/" },
                    { label: "About Us", link: "/about" },
                    { label: "Services", link: "/services" },
                  ]}
              />
            </li>
            <li>
              <Dropdown
                isOpen={selectedDropdown === "Spam Filter"}
                toggleDropdown={() =>
                  setSelectedDropdown(
                    selectedDropdown === "Spam Filter" ? null : "Spam Filter"
                  )
                }
                value={"Spam Filter"}
                options={[
                    { label: "Home", link: "/" },
                    { label: "About Us", link: "/about" },
                    { label: "Services", link: "/services" },
                  ]}
              />
            </li>

            <li className="text-lg text-gray-700">Contact us</li>
            <li className="text-lg font-medium text-gray-700">Get a Demo</li>
          </ul>
        </div>
      )}
    </header>
  );
}
