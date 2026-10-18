const siteUrl = process.env.SITE_URL;

export default function sitemap() {
  if (!siteUrl) {
    throw new Error("SITE_URL must be configured for the sitemap.");
  }

  const base = siteUrl.replace(/\/$/, "");

  return [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/menu`, priority: 0.9, changeFrequency: "daily" },
  ];
}
