import Reservation from '../components/Reservation'
import Slider from './Slider'

const Home = () => {
  return (
    <section className='max-w-7xl m-auto py-20 px-4 relative'>
      <div className='max-w-3xl lg:absolute left-0 top-20 -z-10 mb-8 lg:mt-8 animate-fade'>
        <Slider />
      </div>
      <div className='flex items-end flex-col'>
        <div className='lg:text-right opacity-0 animate-fade-up animate-delay-200'>
          <h2 className='font-bold text-xl lg:text-3xl text-black/60 tracking-widest'>THE NORTH AWAITS YOU</h2>
          <h1 className='text-primary text-4xl lg:text-6xl font-black italic'>DISCOVER IT YOUR WAY</h1>
          <h3 className='font-bold italic lg:text-xl text-black/20'>VEHICLE RENTAL FOR SALTA, JUJUY & TUCUMAN</h3>
        </div>
        <div className='w-full lg:max-w-md mt-4 opacity-0 animate-fade-left animate-delay-300'>
          <h2 className='text-primary mb-2 lg:pl-10'>Make your reservation!</h2>
          <Reservation />
        </div>
      </div>
    </section>
  )
}

export default Home
