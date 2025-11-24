// src/app/api/auth/[...nextauth]/route.ts

import { handlers } from '@/auth';

// NextAuth가 GET/POST에 대응하도록 전달
export const GET = handlers.GET;
export const POST = handlers.POST;
