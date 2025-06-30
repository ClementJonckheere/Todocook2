import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ placeholder }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}
