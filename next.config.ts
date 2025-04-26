import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [new URL('https://mihayudoygfiuzekgjfo.supabase.co/**')],
    
  // },
  // images: {
  //   remotePatterns: [new URL('https://mihayudoygfiuzekgjfo.supabase.co/storage/**')],
    
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'mihayudoygfiuzekgjfo.supabase.co',
  //       pathname: '/storage/v1/object/public/recipeimages/**',
  //     },
  //   ],
  // },
  
    images: {
      domains: ['mihayudoygfiuzekgjfo.supabase.co'],  // ここにホスト名を追加
    },
};

export default nextConfig;
