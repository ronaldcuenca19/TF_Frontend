import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export async function middleware(req) {
    let token = req.cookies.get("token");

    if (req.url.includes("/session")) {
        if (token != undefined) {
            return NextResponse.redirect(new URL("/principal", req.url));
        }
    }

    if (req.url.includes("/login")) {
        if (token != undefined) {
            return NextResponse.redirect(new URL("/principal", req.url));
        }
    }

    if (req.url.includes("/principal")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (req.url.includes("/producto/registrar") || req.url.includes("/producto")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (req.url.includes("/lote") || req.url.includes("/lote/registrar")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (req.url.includes("/usuario") || req.url.includes("/usuario/registrar")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (req.url.includes("/facturacion")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    const protectedRoutes = [
        "/principal",
        "/producto/registrar",
        "/producto",
        "/lote",
        "/lote/registrar",
        "/usuario",
        "/usuario/registrar",
        "/facturacion"
    ];

    // Verificar si la ruta actual requiere token
    if (protectedRoutes.some(route => req.url.includes(route))) {
        if (token === undefined) {
            // Si no hay token, redirigir a la página de inicio de sesión
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
