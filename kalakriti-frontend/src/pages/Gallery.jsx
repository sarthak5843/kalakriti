import { useEffect, useState } from 'react'
import { X, Palette } from 'lucide-react'
import { galleryService } from '../services/services'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    Promise.all([galleryService.getImages(), galleryService.getCategories()])
      .then(([imgRes, catRes]) => { setImages(imgRes.data || []); setCategories(catRes.data || []) })
      .catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'ALL'
    ? images
    : images.filter(img => img.category?.name === activeCategory)

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER with Soft Pastels */}
      <section className="relative overflow-hidden py-32 text-center bg-[#FAF6F0]">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, rgba(250,246,240,0.85) 0%, rgba(242,234,224,0.9) 60%, rgba(224,179,183,0.3) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#D4B26F]">Our Work</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Art Gallery</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-medium">
            A glimpse into the beautiful world of our students and instructors
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 border-b border-[#EBE3D5] bg-[#FAF6F0] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-3 flex-wrap justify-center">
          <button onClick={() => setActiveCategory('ALL')}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${activeCategory === 'ALL' ? 'bg-[#704A87] text-white shadow-sm' : 'bg-white text-[#3E3431] border border-[#E0D8C8] hover:bg-[#F2EAE0]'}`}>
            All Artworks
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${activeCategory === cat.name ? 'bg-[#704A87] text-white shadow-sm' : 'bg-white text-[#3E3431] border border-[#E0D8C8] hover:bg-[#F2EAE0]'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="relative overflow-hidden py-20 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-bl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EBE3D5] border-t-[#704A87] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#8F8082]">Loading gallery...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
              {filtered.map(img => (
                <div key={img.id}
                  className="break-inside-avoid rounded-2xl overflow-hidden border border-[#EBE3D5] hover:border-[#D4B26F] cursor-pointer group transition-all shadow-sm hover:shadow-lg bg-white p-2.5"
                  onClick={() => setLightbox(img)}>
                  <img src={img.imageUrl} alt={img.title || 'artwork'}
                    className="w-full object-cover rounded-xl group-hover:scale-102 transition-transform duration-500" />
                  {img.title && (
                    <div className="p-3 bg-white border-t border-gray-50 mt-1">
                      <p className="text-[#3E3431] text-xs font-bold truncate">{img.title}</p>
                      {img.artistName && <p className="text-[#D4B26F] text-xs mt-0.5 font-semibold">{img.artistName}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Palette size={48} className="mx-auto mb-4 text-[#E0B3B7]" />
              <p className="text-[#8F8082] text-lg font-medium">Gallery images will be added soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full bg-[#FCFAF7] rounded-2xl overflow-hidden shadow-2xl relative border border-[#EBE3D5]"
            onClick={e => e.stopPropagation()}>
            <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full max-h-[72vh] object-contain p-2" />
            {lightbox.title && (
              <div className="p-4 text-center border-t border-[#EBE3D5] bg-white">
                <p className="font-bold text-[#3E3431] text-lg">{lightbox.title}</p>
                {lightbox.artistName && <p className="text-[#704A87] text-sm mt-1 font-semibold">{lightbox.artistName}</p>}
              </div>
            )}
            <button onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#3E3431] shadow-lg hover:bg-[#F2EAE0] transition-colors cursor-pointer border border-[#EBE3D5]">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
