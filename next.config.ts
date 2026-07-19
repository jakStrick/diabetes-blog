import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here, .dev.vars picked up on server start (touched to reload after adding Turnstile vars) */
};

export default nextConfig;
