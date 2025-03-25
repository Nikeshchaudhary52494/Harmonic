"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { Song } from "@prisma/client";
import { searchSongs } from "@/actions/song/searchSongs";

interface SearchInputProps {
  setSearchResults: (songs: Song[]) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  setSearchResults,
  placeholder = "Search song or artist...",
  className = ""
}: SearchInputProps) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    if (!debouncedValue.trim()) return;
    const performSearch = async () => {
      const songs = await searchSongs(debouncedValue);
      setSearchResults(songs);
    };

    performSearch();
  }, [debouncedValue, setSearchResults]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`pl-10 ${className}`}
      />
    </div>
  );
};

export default SearchInput;