import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Form = () => {
  type Inputs = {
    name: string
    email: string
    phone: string
    message: string
  }

  const [sended, setSended] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: Inputs) => {
    setSending(true)
    const sender = {
      to: 'info@tsgroupsa.com.ar',
      from: 'no-reply@tsgroupsa.com.ar',
      from_name: 'Ts Turismo',
      subject: 'Contact'
    }

    axios.post('https://tsgroupsa.com.ar/backend/send-email.php', { ...data, ...sender }).then(data => {
      if (data.data === 'success') {
        setSended(true)
        setSending(false)
      } else {
        setError(true)
        setSending(false)
      }
    })
  }

  const Error = () => {
    return <div className='text-sm mt-1 text-primary'>Este campo es requerido</div>
  }

  return (
    <>
      {error ? (
        <span className='text-2xl'>Error</span>
      ) : sended ? (
        <span className='text-3xl font-medium text-primary'>Su mensaje fue enviado exitosamente</span>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <input
              className='w-full border h-11 px-4'
              placeholder='Nombre'
              {...register('name', { required: true })}
            />
            {errors.name && <Error />}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                className='w-full border h-11  px-4'
                placeholder='Email'
                {...register('email', { required: true })}
              />
              {errors.email && <Error />}
            </div>
            <div>
              <input
                className='w-full border h-11  px-4'
                placeholder='Teléfono'
                {...register('phone', { required: true })}
              />
              {errors.phone && <Error />}
            </div>
          </div>
          <textarea
            className='w-full border h-32 p-4 mt-4 mb-2'
            placeholder='Mensaje'
            {...register('message')}
          />

          {sending ? (
            <svg
              className='animate-spin h-8 w-8'
              viewBox='0 0 512 512'
            >
              <path d='M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z' />
            </svg>
          ) : (
            <button
              type='submit'
              className='bg-primary text-white h-11 hover:bg-black transition px-8'
            >
              Send
            </button>
          )}
        </form>
      )}
    </>
  )
}

export default Form
