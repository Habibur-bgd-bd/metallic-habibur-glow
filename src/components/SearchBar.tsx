import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative max-w-xl w-full">
    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
    <input
      type="text"
      placeholder="Search videos..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
    />
  </div>
);

export default SearchBar;
