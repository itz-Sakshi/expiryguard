import React from "react";
import Link from "next/link";
 

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full flex-col">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        ExpiryGuard <br />
      </h2>
      <p className="max-w-xl mx-auto text-lg md:text-2xl text-neutral-800 dark:text-neutral-100 text-center">
      Reduce Waste. Save Money. Support Communities.
      </p>
      <Link href="/add-delivery">
        <button 
          className="relative group/btn bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-500 to-neutral-600 block dark:bg-zinc-800 text-center m-auto text-white rounded-[30px] p-[10px] shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8 z-100 cursor-pointer text-xl"
        >
          Get Started
        </button>
        </Link>
    

      </div>
      
  );
}
