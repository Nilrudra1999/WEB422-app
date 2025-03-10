/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['upload.wikimedia.org'], // Allow any images from wikimedia url
    },
};

export default nextConfig;
