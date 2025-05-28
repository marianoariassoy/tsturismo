import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

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
      <div className='border shadow-lg p-4 lg:p-8 rounded-2xl flex flex-col gap-y-4 bg-white'>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              className='h-4 w-4 text-primary'
              fill='currentColor'
            >
              <path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z' />
            </svg>
            <span className='text-black/30 font-light'>Name</span>
          </div>
          <div className='flex flex-col gap-y-2'>
            <input
              type='text'
              {...register('name', { required: true })}
              className='w-full border rounded-lg px-2 py-1 text-black/50'
            />
            {errors.name && <Error />}
          </div>
          <div className='grid grid-cols-2 gap-x-4'>
            <div>
              <div className='flex items-center gap-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='h-4 w-4 text-primary'
                  fill='currentColor'
                >
                  <path d='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z' />
                </svg>
                <span className='text-black/30 font-light'>Email</span>
              </div>
              <div className='flex flex-col gap-y-2'>
                <input
                  type='email'
                  {...register('email', { required: true })}
                  className='w-full border rounded-lg px-2 py-1 text-black/50'
                />
                {errors.email && <Error />}
              </div>
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='h-4 w-4 text-primary'
                  fill='currentColor'
                >
                  <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
                </svg>
                <span className='text-black/30 font-light'>Teléfono</span>
              </div>
              <input
                type='text'
                {...register('phone')}
                className='w-full border rounded-lg px-2 py-1 text-black/50'
              />
            </div>
          </div>

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
