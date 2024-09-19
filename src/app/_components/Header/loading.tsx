"use client";

export default function Loading() {

  return (
    <div className="flex flex-col items-center">
        <div className="min-h-20 w-full border-x border-slate-400 bg-black md:max-w-screen-xl">
          <div className="flex min-h-20 justify-between items-center border-b border-slate-400 p-5">
            <div className="flex flex-row items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="flex-1">
                <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
              </div>
            </div>
            <div className="w-20 h-4 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
  );
}
