import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: false,
	output: 'standalone',
	allowedDevOrigins: ['192.168.0.10'],
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
	typescript: {
		ignoreBuildErrors: true
	}
};

export default nextConfig;
