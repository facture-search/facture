import Link from "next/link";
import { Logo } from "../../Logo";
import { Search } from "../../Search";

export function NavMain() {
    return (
        <nav className="p-6 bg-gray-800 space-y-10">
            <ul className="flex flex-col md:flex-row justify-center md:justify-between items-center w-5/6 mx-auto space-y-3 md:space-y-0 md:space-x-3">
                <li className="w-full md:w-2/3">
                    <Logo />
                </li>
                <li className="w-full md:w-1/3 min-w-max">
                    <Search />
                </li>
            </ul>
        </nav>
    );
}

export default NavMain;
