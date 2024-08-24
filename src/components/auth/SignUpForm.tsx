import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';
import axios from 'axios';

function SignUpForm() {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [zonaHoraria, setZonaHoraria] = useState('');
    const [indicativo, setIndicativo] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        nombres: '',
        apellidos: '',
        zonaHoraria: '',
        indicativo: '',
        celular: '',
        email: '',
        password: ''
    });
    const [country, setCountry] = useState([])
    const [timezone, setTimeZone] = useState([])

    useEffect(() => {
        const getData = async () => {
            axios.get('https://restcountries.com/v3.1/all').then((response) => {
                if (response.status == 200) {
                    const data = response.data

                    const code = data.map(country => ({
                        name: country.name.common,
                        callingCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes.join(', ') : '')
                    }));

                    console.log(code);


                    setCountry(code)
                }
            })

            axios.get('https://worldtimeapi.org/api/timezone').then((response) => {
               if (response.status == 200) {
                const data = response.data
                setTimeZone(data)
               } 
            })
        }

        getData()
    }, [])

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            nombres: '',
            apellidos: '',
            zonaHoraria: '',
            indicativo: '',
            celular: '',
            email: '',
            password: ''
        };

        if (!nombres) {
            newErrors.nombres = 'El nombre es requerido';
            isValid = false;
        }

        if (!apellidos) {
            newErrors.apellidos = 'El apellido es requerido';
            isValid = false;
        }

        if (!zonaHoraria) {
            newErrors.zonaHoraria = 'La zona horaria es requerida';
            isValid = false;
        }

        if (!indicativo) {
            newErrors.indicativo = 'El indicativo es requerido';
            isValid = false;
        }

        if (!celular) {
            newErrors.celular = 'El número de celular es requerido';
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'El correo electrónico es requerido';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo electrónico no es válido';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida';
            isValid = false;
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
            isValid = false;
        } else if (!/[a-zA-Z]/.test(password)) {
            newErrors.password = 'La contraseña debe contener al menos una letra';
            isValid = false;
        } else if (/^\d+$/.test(password)) {
            newErrors.password = 'La contraseña no puede ser completamente numérica';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Formulario válido:', {
                nombres,
                apellidos,
                zonaHoraria,
                indicativo,
                celular,
                email,
                password
            });
        }
    };

    return (
        <div className='p-10 lg:w-1/4 rounded shadow-md border border-gray-300'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <h2 className='text-center font-semibold text-2xl'>Registro</h2>
                <Input
                    type='text'
                    label='Nombres'
                    placeholder='Nombres'
                    value={nombres}
                    error={errors.nombres}
                    onChange={(e) => {
                        setNombres(e.target.value);
                        validateForm();
                    }}
                    required
                />
                <Input
                    type='text'
                    label='Apellidos'
                    placeholder='Apellidos'
                    value={apellidos}
                    error={errors.apellidos}
                    onChange={(e) => {
                        setApellidos(e.target.value);
                        validateForm();
                    }}
                    required
                />

                <Select label='Zona Horaria' error={errors.zonaHoraria}>
                    {
                        timezone.map((t) => (
                            <option value="">{t}</option>
                        ))
                    }
                </Select>
                <div className="flex flex-row w-full items-center gap-2">
                    <Select
                        label='Indicativo'
                        value={indicativo}
                        error={errors.indicativo}
                        onChange={(e) => {
                            setIndicativo(e.target.value);
                            validateForm();
                        }}
                        required
                    >
                        {
                            country.map((c, index) => (
                                <option value={c.callingCode} key={index}>{c.callingCode} {c.name}</option>
                            ))
                        }
                        
                    </Select>
                    <Input
                        type='text'
                        label='Celular'
                        placeholder='Celular'
                        value={celular}
                        error={errors.celular}
                        onChange={(e) => {
                            setCelular(e.target.value);
                            validateForm();
                        }}
                        required
                    />
                </div>
                {errors.indicativo && <div className="text-red-500 text-sm">{errors.indicativo}</div>}
                {errors.celular && <div className="text-red-500 text-sm">{errors.celular}</div>}

                <Input
                    type='text'
                    label='Email'
                    placeholder='Correo Electrónico'
                    value={email}
                    error={errors.email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateForm();
                    }}
                    required
                />
                <Input
                    type='password'
                    label='Contraseña'
                    placeholder='Contraseña'
                    value={password}
                    error={errors.password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validateForm();
                    }}
                    required
                />
                <Button label='Registrarse' />
                <span className='w-full h-[0.5px] bg-gray-400 rounded'></span>
                <p className='text-sm text-center'>¿Ya tienes una cuenta? <a href="/auth/login" className='text-[#FF7A00] underline'>Inicia sesión aquí</a></p>
            </form>
        </div>
    );
}

export default SignUpForm;