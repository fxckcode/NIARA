import { useState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { login } from '../../services/login.services'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: '' }

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido'
      isValid = false
    } else {
      newErrors.email = ''
    }

    setErrors(newErrors)

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      await login(email, password)
    }
  }

  return (
    <div className='p-10 lg:w-1/4 rounded shadow-md  border border-gray-300'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <h2 className='text-center font-semibold text-2xl'>Iniciar Sesión</h2>
        <Input
          type='text'
          label='Email'
          placeholder='Correo Electrónico'
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value)
            validateForm()
          }}
        />
        <Input
          type='password'
          label='Contraseña'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            validateForm()
          }}
        />
        <Button label='Iniciar Sesión' />
        <span className='w-full h-[0.5px] bg-gray-400 rounded'></span>
        <p className='text-sm text-center'>¿Aún no estas registrado? <a href="/auth/signup" className='text-[#FF7A00] underline'>Registrate aquí</a></p>
      </form>
    </div>
  )
}

export default LoginForm