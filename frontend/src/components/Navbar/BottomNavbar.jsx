import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, ShoppingCart, User, ScanLine } from 'lucide-react';

export default function BottomNavbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md rounded-t-2xl">
      <div className="relative h-20 flex justify-between items-center px-6">

        {/* Bouton central "Scanner" */}
        <div className="absolute inset-x-0 -top-6 flex justify-center z-10">
          <Link
            to="/scanner"
            className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white"
          >
            <ScanLine className="w-6 h-6" />
          </Link>
        </div>

        {/* Icônes autour */}
        <div className="flex justify-between w-full items-center px-2">
          <NavItem to="/" icon={<Home />} label="Accueil" active={isActive('/')} />
          <NavItem to="/calendrier" icon={<Calendar />} label="Semaine" active={isActive('/calendrier')} />
          <div className="w-14" /> {/* Spacer bouton central */}
          <NavItem to="/garde-manger" icon={<ShoppingCart />} label="Panier" active={isActive('/garde-manger')} />
          <NavItem to="/profil" icon={<User />} label="Profil" active={isActive('/profil')} />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label, active }) {
  return (
    <Link to={to} className={`flex flex-col items-center text-xs ${active ? 'text-green-600' : 'text-gray-500'}`}>
      <div className="w-5 h-5">{icon}</div>
      <span className="mt-1">{label}</span>
    </Link>
  );
}
