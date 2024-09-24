"use client";

import Link from "next/link";

export default function Navigation({ id }: { id?: string  }) {

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Profile", path: `/@${id}` },
  ];

  return (
    <nav className="p-4">
      <ul className="flex flex-row justify-between text-lg">
        {navigation.map((nav, index) => {
          return (
            <Link href={nav.path} key={index}>
              <li className="rounded-md bg-slate-200 px-4 text-black">{ nav.title }</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
