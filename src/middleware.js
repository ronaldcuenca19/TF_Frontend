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

    if (req.url.includes("/detalle") || req.url.includes("/detalle/nota/<external>")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    const protectedRoutes = [
        "/principal",
        "/detalle",
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
