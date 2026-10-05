import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
    <p>Home</p>
    <Link href={"/menu"}>menu</Link><br></br>
    <Link href={"/cart"}>cart</Link><br></br>
    <Link href={"/Checkout"}>Checkout</Link>

   </div>
  );
}
