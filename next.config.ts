import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    // v1 had separate pages; send old links to the matching section.
    async redirects() {
        return [
            { source: "/about", destination: "/#about", permanent: true },
            { source: "/service", destination: "/#services", permanent: true },
            { source: "/portfolio", destination: "/#portfolio", permanent: true },
            { source: "/contact", destination: "/#contact", permanent: true },
        ];
    },
};

export default nextConfig;
