// Navbar layout sourced from Flowbite: https://flowbite.com/docs/components/navbar/
 "use client"

 import { useState } from "react"
 import { useRouter } from "next/navigation"
 import Link from "next/link"

export default function Navbar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function searchHandler(e: React.SubmitEvent) {
    e.preventDefault()
    if(!query) return
    router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return(
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-default bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="self-center text-xl text-heading font-semibold whitespace-nowrap">
          MTG-Collector
        </Link>
        <div className="flex items-center md:order-2">
          <form onSubmit={searchHandler} className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="text"
              value={query}
              placeholder="Search cards..."
              onChange={(e) => setQuery(e.target.value)}
              className="block ps-9 pe-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </form>
        </div>
      </div>
    </nav>  
  )
}