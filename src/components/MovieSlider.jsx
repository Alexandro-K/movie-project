import {React, useEffect, useRef, useState }  from 'react'
import MovieCard from '../components/MovieCard';


const MovieSlider = ({title, movies}) => {
  // Ref tidak mererender elemen
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollright, setScrollright] = useState(false);

  // Mengecek Posisi Scroll
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if(!el) return;

    // Jika sudah digeser ke kanan artinya el > 0 tampilkan button untuk ke kiri
    setScrollLeft(el.scrollLeft > 0);

    // Catatan
    // clientwidth merupakan lebar yang terlihat oleh user termasuk padding, tidak termasuk scrollbar, border, atau margin
    // scrollwidth merupakan semua lebar dari konten termasuk bagian yang tidak terlihat
    // Misal total width 1200 ( yang terlihat (clientwidth) = 400 ; sementara total (scrollwidth) = 1200 )

    
    setScrollright(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  // Jumlah Scroll
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 500;
    el.scrollBy({left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth'});
  }

  // Update Button Saat Scroll
  useEffect(() => {
    const el = scrollRef.current;

    if (movies.length > 0) {
      // Dilakukan untuk melakukan eksekusi function sebelum repaint layar berikutnya
      // Biasanya mengikuti refresh rate pengguna
      requestAnimationFrame(() => {
        updateScrollButtons();
      });
    }
    

    if(el){
      el.addEventListener('scroll', updateScrollButtons)
      window.addEventListener('resize', updateScrollButtons)
    }

    return () => {
      if (el) el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    }
  }, [movies]);


  return (
    <div className='relative'>

      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 m-10 gap-6">
        {movies.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))}
      </div> */}

      <div className="px-12 relative">
        {/* Prev Button */}
        {scrollLeft && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <button className='rounded-2xl p-2 border cursor-pointer border-blue-400 text-blue-400 bg-blue-100 hover:scale-110 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-300 transition-all duration-300' onClick={() => scroll('left')}>&lt;</button>
        </div>
        )}

        {/* Next Button */}
        {scrollright && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <button className='rounded-2xl p-2 border cursor-pointer border-blue-400 text-blue-400 bg-blue-100 hover:scale-110 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-300 transition-all duration-300' onClick={() => scroll('right')}>&gt;</button>
        </div>
        )}

        {/* Title */}
        <h2 className="text-slate-800 text-2xl font-bold m-4">{title}</h2>
        
        {/* Movie Slider */}
        <div ref={scrollRef} className="m-4 flex gap-4 overflow-x-auto scroll-smooth">
          {movies.map((movie) => (
              <div className="flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px]" key={movie.id}>
                <MovieCard movie={movie}/>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieSlider;