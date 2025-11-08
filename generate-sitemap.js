// generate-sitemap.js
import fs from "fs";
import path from "path";

const baseUrl = "https://sohocomedyhouse.com";

const pages = [
    "",
    "events"
];

// 🗺️ Structured data for Google (local business info)
const jsonLd = `
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "ComedyClub",
    "name": "Soho Comedy House",
    "image": "${baseUrl}/logo-dark.png",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "30 Dean Street Bar and Club",
        "addressLocality": "Soho",
        "postalCode": "W1D 3RZ",
        "addressCountry": "UK"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.51403489052363,
        "longitude": -0.13256431534348898
    },
    "url": "${baseUrl}",
    "telephone": "+44 7733 976401",
    "priceRange": "££",
    "sameAs": [
        "https://www.instagram.com/soho_comedy_house",
        "https://www.instagram.com/30_dean_street"
    ]
}
</script>
`;

// 🧭 Sitemap XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
        .map(
            (page) => `
        <url>
            <loc>${baseUrl}/${page}</loc>
            <changefreq>weekly</changefreq>
            <priority>${page === "" ? "1.0" : "0.8"}</priority>
        </url>`
        )
        .join("")}
</urlset>`;

const publicDir = path.resolve("./public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml.trim());
fs.writeFileSync(path.join(publicDir, "schema.jsonld"), jsonLd.trim());

console.log("✅ Generated sitemap.xml and schema.jsonld in /public");
