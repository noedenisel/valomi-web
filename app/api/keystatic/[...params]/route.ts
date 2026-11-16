import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';
import { adminHabilitado } from '@/lib/admin';

const handler = makeRouteHandler({ config });
const cerrado = () => new Response('No encontrado', { status: 404 });

export const GET = (req: Request) => (adminHabilitado() ? handler.GET(req) : cerrado());
export const POST = (req: Request) => (adminHabilitado() ? handler.POST(req) : cerrado());
