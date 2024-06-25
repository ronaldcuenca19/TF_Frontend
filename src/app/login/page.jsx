"use client";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { login } from '@/src/hooks/services_authenticate';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function Login() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    correo: Yup.string().trim().required('El correo es requerido'),
    clave: Yup.string().trim().required('La clave es requerida')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let { errors } = formState;

  const sendInfo = (data) => {
    login(data).then((info) => {
      if (info.code == 200) {
        console.log('HAMTAROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOADAFDAFBDBFIDSBN');
        Cookies.set('token', info.data.tag.token);
        Cookies.set('user', info.data.tag.user);
        Cookies.set('external', info.data.tag.external);
        Cookies.set('rol', info.data.tag.rol);
        swal({
          title: "Succesful",
          text: "Bienvendo"+info.data.tag.user,
          icon: "success",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        if (Cookies.get('rol')=='docente') {
        router.push('/principal');
        router.refresh();
        }else if (Cookies.get('rol')=='admin') {
        router.push('/detalle');
        router.refresh();
        }
      } else {
      }
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h1 style={{ color: '#ff4500' }}>Inicio Sesion</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card bg-glass mx-auto" style={{ border: '8px solid rgba(250, 128, 114, 1)', width: '100%', maxWidth: '600px' }}>
            <div className="card-body px-5 py-5">
              <div className="text-center mb-4">
                <Image src="/logo.png" width={500} height={220} alt="logo" />
              </div>
              <form onSubmit={handleSubmit(sendInfo)}>
                <div className="form-outline mb-4">
                  <input
                    {...register('correo')}
                    name="correo"
                    id="correo"
                    className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                    placeholder='Ingresar correo'
                    style={{ fontSize: '20px' }}
                  />
                  <label className="form-label" style={{ color: '#db3210', fontSize: '18px' }}>Usuario</label>
                  <div className='alert alert-danger invalid-feedback'>{errors.correo?.message}</div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    {...register('clave')}
                    type="password"
                    name="clave"
                    id="clave"
                    className={`form-control ${errors.clave ? 'is-invalid' : ''}`}
                    placeholder='Ingresar clave'
                    style={{ fontSize: '20px' }}
                  />
                  <label className="form-label" style={{ color: '#db3210', fontSize: '18px' }}>Clave</label>
                  <div className='alert alert-danger invalid-feedback'>{errors.clave?.message}</div>
                </div>

                <button type="submit" className="btn btn-success btn-block mb-4" style={{ background: '#fc4b08', fontSize: '20px' }}>
                  INICIAR SESIÓN
                </button>
              </form>
              <p><a href="/contra"style={{ color: '#ffdcc8', fontSize: '17px' }}>Seguimiento Académico</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
