import { useState, useEffect } from 'react'
const apiUrl = 'https://tsgroupsa.com.ar/backend/api'
import Spinner from '../../components/Spinner'

const Items = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${apiUrl}/pricing`
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <Spinner />

  return (
    <div className='max-w-7xl m-auto grid grid-cols-1 lg:grid-cols-4 gap-8 py-20 px-4'>
      {data.map((item, index) => (
        <article
          class='flex flex-col justify-center items-center gap-4 text-center shadow bg-slate-100 rounded-lg lg:aspect-square text-sm
           p-4 lg:p-8 animate-fade-up opacity-0'
          style={{ animationDelay: `${index * 100}ms` }}
          key={index}
        >
          <div class='aspect-square w-full max-w-20'>
            <img
              src={`${item.image}`}
              alt={item.title}
              class='object-contain w-full h-full'
            />
          </div>
          <div>
            <h1 class='font-bold uppercase'>{item.title}</h1>
            <p class='text-sm text-black/70'>{item.text}</p>
          </div>
          <div class='border border-black p-2 font-bold'>{item.price}</div>
        </article>
      ))}
    </div>
  )
}

export default Items
