/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loving-liger-previously.ngrok-free.app",
                port: "",
                pathname: "/**",
            },
        ],
    }
};
export default nextConfig;
