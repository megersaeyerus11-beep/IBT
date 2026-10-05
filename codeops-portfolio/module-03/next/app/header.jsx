import Link from "next/link";

export default function Header() {
return (
    <header className="site-header">
    <div className="container header-content">
        <Link href="/" className="logo">
        Addis Eats
        
        </Link>
        

        <nav className="navigation" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
        </nav>
    </div>
    </header>
);
}