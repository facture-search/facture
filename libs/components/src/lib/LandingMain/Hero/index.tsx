import Link from "next/link";
import Search from "./search";

export function Hero() {
    return (
        <div className="space-y-14 text-center xl:mx-auto xl:w-3/5">
            <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Connecting Manufacturers. Driving Innovation.</h1>
                <h2 className="text-xl md:text-2xl font-medium text-gray-700">
                    Facture is an online search directory connecting manufacturers to aspiring entrepreneurs to drive local innovation.
                </h2>
            </div>
            <ul className="flex flex-col md:flex-row items-stretch md:items-center justify-center space-x-0 md:space-x-7 space-y-3 md:space-y-0 w-full">
                <div className="md:w-2/3">
                    <Search />
                </div>
                <Link href="https://forms.gle/59gjvMtDMJ6rmDbS7">
                    <a className="p-6 bg-gray-300 hover:bg-gray-400 transition-colors text-lg rounded-md font-medium text-gray-700 md:w-1/3 min-w-max">
                        Register Your Business
                    </a>
                </Link>
            </ul>
        </div>
    );
}

export default Hero;