import AccountLinks from "../AccountLinks"
import Cart from "../Cart"
import Logo from "../Logo"
import MobileMenu from "./MobileMenu"

const Header = () => {
    return(
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0 min-w-0">
                        <Logo/>
                    </div>

                    {/* Desktop Account Links and Cart */}
                    <div className="hidden md:flex flex-shrink-0 items-center gap-4">
                        <AccountLinks/>
                        <Cart/>
                    </div>

                    {/* Mobile: Menu and Cart */}
                    <div className="md:hidden flex flex-shrink-0 items-center gap-3">
                        <MobileMenu />
                        <Cart/>
                    </div>
    
                </div>
            </div>
        </header>
    )
}

export default Header
