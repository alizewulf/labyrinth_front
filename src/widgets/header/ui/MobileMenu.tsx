"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_ROUTES, PATIENT_ROUTES, DOCTOR_ROUTES, ADMIN_ROUTES } from "../config/nav.config";
import { useAppSelector } from "@/store/hooks";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const getRoutes = () => {
    if (!isAuthenticated) return PUBLIC_ROUTES;
    if (user?.role === "doctor") return DOCTOR_ROUTES;
    if (user?.role === "admin") return ADMIN_ROUTES;
    return PATIENT_ROUTES;
  };

  const routes = getRoutes();

  return (
    <div className="md:hidden">
      {/* Hamburger / Close Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors focus:outline-hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] max-w-[85vw] bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-100">
            <span className="font-semibold text-text-primary text-base">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 mt-6">
            {routes.map((route) => {
              const isActive = pathname === route.route;
              return (
                <Link
                  key={route.label}
                  href={route.route}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#2563EB] font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                  }`}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile / Auth in Drawer */}
        <div className="pt-6 border-t border-gray-100">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-text-primary">
                {user?.name} {user?.surname}
              </div>
              <div className="text-xs text-text-secondary capitalize">
                Role: {user?.role}
              </div>
              {user?.role === "doctor" && (
                <Link
                  href="/doctor/settings"
                  className="mt-2 text-sm text-[#2563EB] font-medium hover:underline"
                >
                  Go to Settings →
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="w-full text-center py-2.5 rounded-lg bg-status-available text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
