import { useState, useEffect } from 'react'
const apiUrl = 'http://localhost/sites/tstusismo-backend/api'
import Spinner from '../../components/Spinner'

const Items = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${apiUrl}/packs`
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
        console.log(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <Spinner />

  return (
    <div className='max-w-7xl m-auto grid grid-cols-2 lg:grid-cols-4 gap-8 py-20 px-4'>
      {data.map((pack, index) => (
        <article
          className='flex flex-col items-center justify-start gap-2 text-center animate-fade-up opacity-0'
          style={{ animationDelay: `${index * 100}ms` }}
          key={index}
        >
          <div className='aspect-square w-full max-w-28 lg:max-w-40 h-42'>
            <img
              src={`${pack.image}`}
              alt={pack.title}
              className='object-contain w-full h-full'
            />
          </div>
          <div className='text-primary'>
            <h1 className='font-light uppercase'>{pack.title}</h1>
            <h2 className='font-bold text-3xl uppercase italic -mt-2'>Pack</h2>
          </div>
          <p className='text-sm text-gray-500 whitespace-pre-line'>{pack.text}</p>
        </article>
      ))}
    </div>
  )
}

export default Items
