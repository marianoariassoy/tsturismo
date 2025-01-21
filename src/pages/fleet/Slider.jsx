import { useState, useEffect } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Item from './Item'
const apiUrl = 'https://tsgroupsa.com.ar/backend/api'
import Spinner from '../../components/Spinner'

const Slider = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${apiUrl}/fleet`
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const sliderProperties = {
    autoplay: false,
    transitionDuration: 300,
    indicators: true,
    arrows: false,
    infinite: true,
    pauseOnHover: false
  }

  if (loading) return <Spinner />

  return (
    <div class='max-w-6xl m-auto py-20 px-4 opacity-0 animate-fade-left'>
      <Slide {...sliderProperties}>
        {data.map(item => (
          <Item
            key={item.id}
            data={item}
          />
        ))}
      </Slide>
    </div>
  )
}

export default Slider
