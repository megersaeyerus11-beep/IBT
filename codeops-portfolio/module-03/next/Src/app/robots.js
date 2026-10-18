const siteUrl =
  process.env.SITE_URL || "http://localhost:3000";

export default function robots() {
  const base = siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu"],
      disallow: [
        "/checkout",
        "/orders",
        "/signin",
        "/register",
        "/api/",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
