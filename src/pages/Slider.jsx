import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// const apiUrl = 'https://tsgroupsa.com.ar/backend/api'

const Slider = ({ images }) => {
  // const [data, setData] = useState(null)
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const url = `${apiUrl}/portada`
  //       const response = await fetch(url)
  //       const json = await response.json()
  //       setData(json)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const sliderProperties = {
    autoplay: true,
    transitionDuration: 500,
    indicators: false,
    arrows: false,
    infinite: true,
    pauseOnHover: false
  }

  return (
    <Fade {...sliderProperties}>
      {images.map((item, index) => (
        <img
          src={item}
          alt=''
          key={index}
          className='w-full h-screen object-cover object-center'
        />
      ))}
    </Fade>
  )
}

export default Slider
