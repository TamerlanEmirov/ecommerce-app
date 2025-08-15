"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Category from "./Category";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/redux/searchSlice";
import { RootState } from "@/redux/store";
import Search from "./Search";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.search.filter);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    dispatch(setFilter(currentFilter === "mostRated" ? "all" : "mostRated"));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-emerald-600 z-50">
            TamerStore
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <button
              onClick={handleClick}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg border font-medium text-sm sm:text-base transition-colors duration-300 ${
                currentFilter === "mostRated"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-white text-gray-900 border-gray-300"
              } hover:bg-emerald-500 hover:text-white`}
            >
              Most Rated
            </button>

            <Category />
            <div className="w-32 sm:w-44 lg:w-64">
              <Search />
            </div>

            {[["/about", "About"], ["/contact", "Contact"], ["/cart", <CiShoppingCart size={20} key="cart" />], ["/profile", "Profile"]].map(
              ([path, label]) => (
                <Link
                  key={path as string}
                  href={path as string}
                  className={`text-sm sm:text-base text-gray-900 hover:text-emerald-500 transition ${
                    pathname === path ? "text-emerald-600 font-semibold" : ""
                  }`}
                >
                  {label}
                </Link>
              )
            )}

            <SignedOut>
              <div className="flex gap-2">
                <SignInButton>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm sm:text-base">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <SignOutButton>
                  <button className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>

          {/* Mid Navbar */}
          <div className="hidden md:flex lg:hidden items-center gap-4">
            <button
              onClick={handleClick}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg border font-medium text-sm sm:text-base transition-colors duration-300 ${
                currentFilter === "mostRated"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-white text-gray-900 border-gray-300"
              } hover:bg-emerald-500 hover:text-white`}
            >
              Most Rated
            </button>

            <Category />
            <div className="w-32 sm:w-44 lg:w-64">
              <Search />
            </div>

            {/* Hamburger */}
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <FaTimes size={24} color="black" /> : <FaBars size={24} color="black" />}
            </button>
          </div>

          {/* Mobile Navbar */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <FaTimes size={24} color="black" /> : <FaBars size={24} color="black" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleMenu}
        ></div>

        {/* Sidebar Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-72 sm:w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link
              href="/"
              className="text-xl font-bold text-emerald-600"
              onClick={toggleMenu}
            >
              TamerStore
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <FaTimes size={22} />
            </button>
          </div>

        {/* Content (no scroll, full height) */}
<div className="flex flex-col justify-between flex-1 px-5 py-6">
  <div className="space-y-4">
    {/* Links */}
    {[["/about", "About"], ["/contact", "Contact"], ["/cart", "Cart"], ["/profile", "Profile"]].map(
      ([path, label]) => (
        <Link
          key={path as string}
          href={path as string}
          onClick={toggleMenu}
          className={`block font-medium text-base transition ${
            pathname === path
              ? "text-emerald-600 font-semibold"
              : "text-gray-900 hover:text-emerald-600"
          }`}
        >
          {label}
        </Link>
      )
    )}
  </div>

  {/* Auth */}
    <SignedOut>
      <div className="flex gap-2">
        <SignInButton>
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded text-white transition">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="flex-1 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white transition">
            Sign Up
          </button>
        </SignUpButton>
      </div>
    </SignedOut>

    <SignedIn>
      <UserButton afterSignOutUrl="/" />
      <SignOutButton>
        <button className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition">
          Sign Out
        </button>
      </SignOutButton>
    </SignedIn>
  
</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
