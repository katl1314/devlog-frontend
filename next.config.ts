import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: false,
	output: 'standalone',
	// 외부 이미지 조회
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				hostname: 'kwzbpyrchjwfnfontxvt.supabase.co',
				port: '',
				protocol: 'https'
			},
			{
				hostname: 'lh3.googleusercontent.com',
				port: '',
				protocol: 'https'
			}
		]
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	}
};

export default nextConfig;
