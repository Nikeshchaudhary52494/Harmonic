"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import queryString from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { Input } from "./ui/input";


const SearchInput = () => {
  const router = useRouter();
  const [value, setvalue] = useState<string>("");
  const debouncedValue = useDebounce<String>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }

    const url = queryString.stringifyUrl({
      url: '/search',
      //@ts-ignore
      query: query
    })
    router.push(url);
  }, [debouncedValue, router]);


  return (
    <Input
      placeholder="Search song"
      value={value}
      onChange={(e) => setvalue(e.target.value)}
    />
  )
}

export default SearchInput
