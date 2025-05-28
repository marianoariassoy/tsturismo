import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const Slider = ({ images }) => {
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
          className='w-full h-[60vh] object-cover object-center'
        />
      ))}
    </Fade>
  )
}

export default Slider
