"use client";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { login } from '@/src/hooks/services_authenticate';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../menu/menu';
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
        swal({
          title: "Succesful",
          text: "Bienvendo"+info.data.tag.user,
          icon: "success",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        router.push('/principal');
        router.refresh();
        console.log("NO");
      } else {
      }
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h1 style={{ color: '#005c00' }}>Inicio Sesion</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card bg-glass mx-auto" style={{ border: '8px solid rgba(144, 198, 149);, 1', width: '100%', maxWidth: '600px' }}>
            <div className="card-body px-5 py-5">
              <div className="text-center mb-4">
                <Image src="/icono.png" width={240} height={240} alt="logo" />
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
                  <label className="form-label" style={{ color: '#889859', fontSize: '18px' }}>Usuario</label>
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
                  <label className="form-label" style={{ color: '#889859', fontSize: '18px' }}>Clave</label>
                  <div className='alert alert-danger invalid-feedback'>{errors.clave?.message}</div>
                </div>

                <button type="submit" className="btn btn-success btn-block mb-4" style={{ background: '#728C69', fontSize: '20px' }}>
                  INICIAR SESIÓN
                </button>
              </form>
              <p><a href="/contra"style={{ color: '#C7EA46', fontSize: '17px' }}>Carrera de Computacion</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
