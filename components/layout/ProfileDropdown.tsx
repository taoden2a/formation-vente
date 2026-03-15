'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

// Icons
function UserIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function SettingsIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function LinkIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function LogoutIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

interface ProfileDropdownProps {
  isAuthenticated: boolean
  variant?: 'marketing' | 'product'
}

function NotesIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  )
}

const profileMenuItems = [
  { label: 'Mon compte', href: '/membre', icon: UserIcon },
  { label: 'Mes notes', href: '/notes', icon: NotesIcon },
  { label: 'Affiliation', href: '/affiliation', icon: LinkIcon },
  { label: 'Paramètres', href: '/parametres', icon: SettingsIcon },
]

export function ProfileDropdown({ isAuthenticated, variant = 'product' }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  // Ref mirrors isOpen — allows scroll/click handlers to read state without re-registering
  const isOpenRef = useRef(false)

  const open = () => { isOpenRef.current = true; setIsOpen(true) }
  const close = () => { isOpenRef.current = false; setIsOpen(false) }
  const toggle = () => { if (isOpenRef.current) close(); else open() }

  // Close on click outside — registered once, reads state via ref
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpenRef.current && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on scroll — registered once, no deps, reads state via ref
  useEffect(() => {
    const handleScroll = () => {
      if (isOpenRef.current) close()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // If not authenticated, show login button
  if (!isAuthenticated) {
    return (
      <Link
        href="/connexion"
        className="profile-login-btn"
      >
        Se connecter
      </Link>
    )
  }

  // Authenticated: show profile icon with dropdown
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggle}
        className={clsx(
          'profile-button',
          isOpen && 'profile-button-active'
        )}
        aria-label="Menu profil"
        aria-expanded={isOpen}
      >
        <UserIcon size={18} />
      </button>

      {/* Dropdown menu */}
      <div
        className={clsx(
          'profile-dropdown',
          isOpen ? 'profile-dropdown-open' : 'profile-dropdown-closed'
        )}
      >
        <div className="profile-dropdown-content">
          {/* Menu items */}
          {profileMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="profile-dropdown-item"
                onClick={close}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            )
          })}

          {/* Divider */}
          <div className="profile-dropdown-divider" />

          {/* Logout */}
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="profile-dropdown-item profile-dropdown-logout"
              onClick={close}
            >
              <LogoutIcon size={16} />
              <span>Se déconnecter</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
