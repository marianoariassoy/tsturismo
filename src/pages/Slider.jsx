import { useState, useEffect } from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
const apiUrl = 'http://localhost/sites/tstusismo-backend/api'
import Spinner from '../components/Spinner'

const Slider = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${apiUrl}/portada`
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
    autoplay: true,
    transitionDuration: 300,
    indicators: false,
    arrows: false,
    infinite: true,
    pauseOnHover: false
  }

  if (loading) return <Spinner />

  return (
    <div>
      <Fade {...sliderProperties}>
        {data.map(item => (
          <img
            src={item.image}
            alt='fleet'
            key={item.id}
            className='w-full h-full object-contain'
          />
        ))}
      </Fade>
    </div>
  )
}

export default Slider
