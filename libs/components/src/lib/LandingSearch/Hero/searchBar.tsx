import { Search } from "tabler-icons-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <div className="rounded-md bg-gray-50 border-2 border-gray-300 flex items-center space-x-3 text-gray-700 px-6 py-3 w-full">
            <label htmlFor="search-landing-search">
                <Search />
            </label>
            <input
                id="search-landing-search"
                type="text"
                className="bg-gray-50 border-none font-medium text-xl rounded-md w-full"
                placeholder="Search"
                value={value || ""}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
