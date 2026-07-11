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

      {/* HEADER with Indian art background */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.22) saturate(0.65)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, rgba(45,27,105,0.85) 0%, rgba(107,45,139,0.78) 60%, rgba(201,168,76,0.20) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#FFD6EC]">Our Work</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Art Gallery</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            A glimpse into the beautiful world of our students and instructors
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 border-b border-[#EDE0F8]" style={{ background: '#FFF8FF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-3 flex-wrap justify-center">
          <button onClick={() => setActiveCategory('ALL')}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${activeCategory === 'ALL' ? 'bg-[#6B2D8B] text-white shadow-md' : 'bg-white text-[#6B2D8B] border border-[#D4B8E8] hover:bg-[#EDE0F8]'}`}>
            All Artworks
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${activeCategory === cat.name ? 'bg-[#6B2D8B] text-white shadow-md' : 'bg-white text-[#6B2D8B] border border-[#D4B8E8] hover:bg-[#EDE0F8]'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="relative overflow-hidden py-20" style={{ background: '#FEFAF4' }}>
        <div className="wc-bl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EDE0F8] border-t-[#6B2D8B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#7B6B8B]">Loading gallery...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map(img => (
                <div key={img.id}
                  className="break-inside-avoid rounded-2xl overflow-hidden border border-[#EDE0F8] hover:border-[#C9A84C] cursor-pointer group transition-all shadow-sm hover:shadow-lg"
                  onClick={() => setLightbox(img)}>
                  <img src={img.imageUrl} alt={img.title || 'artwork'}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {img.title && (
                    <div className="p-3 bg-white">
                      <p className="text-[#2D1B69] text-xs font-semibold truncate">{img.title}</p>
                      {img.artistName && <p className="text-[#E91E8C] text-xs mt-0.5">{img.artistName}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Palette size={48} className="mx-auto mb-4 text-[#D4B8E8]" />
              <p className="text-[#7B6B8B] text-lg">Gallery images will be added soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}>
            <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full max-h-[72vh] object-contain" />
            {lightbox.title && (
              <div className="p-4 text-center border-t border-[#EDE0F8]">
                <p className="font-bold text-[#2D1B69]">{lightbox.title}</p>
                {lightbox.artistName && <p className="text-[#E91E8C] text-sm mt-1">{lightbox.artistName}</p>}
              </div>
            )}
            <button onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#2D1B69] shadow-lg hover:bg-[#EDE0F8] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
