import { LuCircleUserRound } from "react-icons/lu";
import Logo from "../../components/logo/Logo";

export default function AdminDashboard() {
return (<>
<section className="w-full bg-gray-100  h-screen">
    <header className=" bg-gray-100 py-2 px-5 w-full shadow flex justify-between dark:bg-gray-900">
<div className="flex gap-3 items-center">
    <Logo className=" size-10 "/>
    <h2 className="text-2xl font-semibold text-red-800 text-shadow-lg dark:text-red-700 ">NEPFLIX</h2>
    
</div>
<div className="flex items-center text-gray-900 dark:text-white gap-3 ">
    <LuCircleUserRound className="size-7"/>
    <span className="font-semibold" >Chiranjibi Debkota</span>
    <div className="relative inline-flex">
  <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
    <button type="button" className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative">
      Genre
    </button>

    <button type="button" className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative" aria-label="Menu">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
      </svg>
    </button>
  </span>

  <div role="menu" className=" absolute inset-end-0 top-12 z-auto w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
    <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
Action & Adventure
    </a>

    <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
      Comedy
    </a>

    <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
      Drama
    </a>
     <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
      
      Horror & Thriller
    </a>

 <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
      
      Sci-Fi & Fantasy
    </a>
    <button type="button" className="block w-full px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 ltr:text-left rtl:text-right">
      Delete
    </button>
  </div>
</div>
</div>
    </header>
    <main>
        <aside>sidebar</aside>
        <section>Content</section>
    </main>
    <footer>
        footer
    </footer>
</section>
   
</>

)  

}
