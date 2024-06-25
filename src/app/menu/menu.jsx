import Link from "next/link";
import Cookies from 'js-cookie';
import Image from 'next/image'

export default function Menu() {

    const cerrarSesion = () => {
        // Eliminar el token de la cookie
        Cookies.remove('token');
        Cookies.remove('user');
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{
            color: "blue", // Color del texto en azul
        }}>
            <div className="container-fluid">
                <header style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1030 }}>
                    <nav className="navbar navbar-expand-lg" style={{
                        backgroundColor: '#ffd19b', // Fondo color verde agua
                        color: "blue", // Color del texto en azul
                    }}>
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {Cookies.get('rol') === 'admin' ? (
                                        <li className="nav-item">
                                            <Link href="/detalle" className="nav-link active" aria-current="page" style={{ fontSize: '18px' }}>Detalle</Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link href="/principal" className="nav-link active" aria-current="page" style={{ fontSize: '18px' }}>Cargar</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Agregar la imagen a la derecha del navbar */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link href="/login" className="nav-link active" aria-current="page" style={{ marginRight: '20px', fontSize: '20px' }} onClick={cerrarSesion}>Cerrar Sesión</Link>
                                </li>
                            </ul>
                            <Image src="/logo.png" alt="Logo" width={150} height={50} />
                        </div>
                    </nav>
                </header>
            </div>
        </nav>
    );
}
