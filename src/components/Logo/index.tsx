import Link from "next/link"
import Image from "next/image"
const Logo = () => {
    return(
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <Image src="/logo2.png" alt= 'logo' width="40" height="40"></Image>
            <h1 className="font-bold text-2xl text-white hover:bg-linear-to-r from-pink-400 via-yellow-300 to-green-400 bg-clip-text" >Writer<span className="text-amber-600 ">Hub</span></h1>
        </Link>
    )
}

export default Logo
