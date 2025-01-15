const Item = ({ data }) => {
  return (
    <article className='flex justify-between gap-12  flex-col lg:flex-row lg:items-center'>
      <div className='max-w-xl'>
        <img
          src={data.image}
          alt={data.title}
          className='w-full h-full object-contain'
        />
      </div>
      <div className='flex flex-col gap-y-4 lg:text-right'>
        <h1 className='text-primary font-bold text-xl'>{data.title}</h1>
        <div className='text-black/50 text-sm lg:text-base whitespace-pre-wrap'>{data.text}</div>
        <h2 className='text-primary font-black italic lg:text-3xl uppercase tracking-widest'>{data.location}</h2>
      </div>
    </article>
  )
}

export default Item
