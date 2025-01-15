import { useState, useEffect } from 'react'
const apiUrl = 'http://localhost/sites/tstusismo-backend/api'
import Spinner from '../../components/Spinner'

const Items = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${apiUrl}/promos`
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
      {data.map((item, index) => (
        <article
          class='flex flex-col justify-center items-center gap-4 text-center animate-fade-up opacity-0'
          style={{ animationDelay: `${index * 100}ms` }}
          key={index}
        >
          <div class='aspect-square w-full max-w-32 lg:max-w-40'>
            <img
              src={`${item.image}`}
              alt={item.title}
              class='object-contain w-full h-full'
            />
          </div>
          <p class='text-sm text-primary'>{item.discount}</p>
        </article>
      ))}
    </div>
  )
}

export default Items
