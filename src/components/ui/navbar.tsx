"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { PlusCircleIcon, LayoutDashboardIcon, ActivityIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="flex max-w-fit fixed top-2 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-[#0b0a0a] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4">
      <Link href="/" className="text-xl font-bold text-neutral-200 justify-items-center flex">
        ExpiryGuard
      </Link>
      {pathname !== "/add-delivery" && (
        <Link
          href="/add-delivery"
          className="relative dark:text-gray-500 items-center flex space-x-1 text-neutral-100 dark:hover:text-white hover:text-white"
        >
          <span>
            <PlusCircleIcon className="hidden sm:inline" />
          </span>
          <span className="block text-sm">Add Delivery</span>
        </Link>
      )}
      {pathname !== "/dashboard" && (
        <Link
          href="/dashboard"
          className="relative dark:text-gray-500 items-center flex space-x-1 text-neutral-100 dark:hover:text-white hover:text-white"
        >
          <span>
            <LayoutDashboardIcon className="hidden sm:inline" />
          </span>
          <span className="block text-sm">Dashboard</span>
        </Link>
      )}
      {pathname !== "/actions" && (
        <Link
          href="/actions"
          className="relative dark:text-gray-500 items-center flex space-x-1 text-neutral-100 dark:hover:text-white hover:text-white"
        >
          <span>
            <ActivityIcon className="hidden sm:inline" />
          </span>
          <span className="block text-sm">Actions</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
