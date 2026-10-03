import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            AUTHENTIC ETHIOPIAN FOOD
          </p>

          <h1>
            Welcome to
            <br />
            Addis Eats
          </h1>

          <p className="hero-text">
            Enjoy delicious Ethiopian dishes delivered
            fresh to your door.
          </p>

          <Link href="/menu" className="button">
            Explore Our Menu
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src="/images/doro-wat.jpg"
            alt="Doro Wat"
            width={500}
            height={400}
            priority
          />
        </div>
      </section>
    </main>
  );
}