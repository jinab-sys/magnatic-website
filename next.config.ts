import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
        // Include all asset folders in every API route's serverless bundle
        "/api/avatar-image": ["./app/assets/avatars/**"],
        "/api/video": ["./app/assets/videos/**"],
        "/api/influencer-image": ["./app/assets/influencer_profiles/**"],
    },
};

export default nextConfig;
