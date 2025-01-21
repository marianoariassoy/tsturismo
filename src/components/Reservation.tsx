import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Reservation = () => {
  type Inputs = {
    location: string
    pickupdate: string
    dropoffdate: string
    pickuptime: string
    dropofftime: string
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
      subject: 'Reservation'
    }

    axios.post('https://tsgroupsa.com.ar/backend/send-reservation.php', { ...data, ...sender }).then(data => {
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
    return <div className='text-sm text-primary'>Is required</div>
  }

  return error ? (
    <span className='text-2xl'>Error</span>
  ) : sended ? (
    <div className='text-3xl font-medium text-primary lg:min-h-[250px]'>Your reservation has been sent</div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='border shadow-lg p-4 lg:p-8 rounded-2xl flex flex-col gap-y-4 '>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 384 512'
              className='h-4 w-4 text-primary'
              fill='currentColor'
            >
              <path d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z' />
            </svg>
            <span className='text-black/30 font-light'>Pick-Up Point</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <select
              {...register('location', { required: true })}
              className='w-full border rounded-lg px-2 py-1 text-black/50'
            >
              <option value=''>Select a location</option>
              <option>Zuviría 333 2 D</option>
              <option>Amador Caro 175 cp 4403, Cerrillos</option>
            </select>
            {errors.location && <Error />}
          </div>
        </div>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              className='h-4 w-4 text-primary'
              fill='currentColor'
            >
              <path d='M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z' />
            </svg>
            <span className='text-black/30 font-light'>Pick-Up & Drop Off Dates</span>
          </div>
          <div className='flex justify-between lg:gap-x-4'>
            <div className='flex flex-col gap-y-1'>
              <input
                type='date'
                {...register('pickupdate', { required: true })}
                className='w-full border rounded-lg px-2 py-1 text-black/50'
              />
              {errors.pickupdate && <Error />}
            </div>
            <div className='flex flex-col gap-y-1'>
              <input
                type='date'
                {...register('dropoffdate', { required: true })}
                className='w-full border rounded-lg px-2 py-1 text-black/50'
              />
              {errors.dropoffdate && <Error />}
            </div>
          </div>
        </div>
        <div className='flex gap-x-4 justify-between'>
          <div className='w-full flex flex-col gap-y-2'>
            <div className='flex items-center gap-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                className='h-4 w-4 text-primary'
                fill='currentColor'
              >
                <path d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
              </svg>
              <span className='text-black/30 font-light'>Pick-Up</span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <input
                type='time'
                {...register('pickuptime', { required: true })}
                className='w-full border rounded-lg px-2 py-1 text-black/50'
              />
              {errors.pickuptime && <Error />}
            </div>
          </div>
          <div className='w-full flex flex-col gap-y-2 '>
            <div className='flex items-center gap-x-2 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                className='h-4 w-4 text-primary'
                fill='currentColor'
              >
                <path d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
              </svg>
              <span className='text-black/30 font-light'>Drop Off</span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <input
                type='time'
                {...register('dropofftime', { required: true })}
                className='w-full border rounded-lg px-2 py-1 text-black/50'
              />
              {errors.dropofftime && <Error />}
            </div>
          </div>
          <div className='flex items-center'>
            {sending ? (
              <svg
                className='animate-spin h-8 w-8'
                viewBox='0 0 512 512'
              >
                <path d='M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z' />
              </svg>
            ) : (
              <button className='bg-primary text-white px-6 py-4 rounded-xl text-3xl italic hover:bg-black transition-colors'>
                Go!
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default Reservation
