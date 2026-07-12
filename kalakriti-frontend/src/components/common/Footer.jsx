import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Heart, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteService } from '../../services/services'

export default function Footer() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    siteService.get().then(res => setSettings(res.data)).catch(() => {})
  }, [])

  return (
    <footer className="bg-[#EBE2D3] text-[#3E3431] relative overflow-hidden border-t border-[#DED4C3]">
      {/* Faint mandala pattern */}
      <div className="absolute inset-0 bg-mandala opacity-20 pointer-events-none" />

      <div className="h-1 bg-gradient-to-r from-[#E0B3B7] via-[#D4B26F] to-[#704A87]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={settings?.logoUrl || '/logo.png'} alt="Kalakriti" className="w-16 h-16 object-contain" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-[#D4B26F]/40" />
              <Heart size={12} className="text-[#D4B26F] fill-[#D4B26F]" />
              <div className="h-px flex-1 bg-[#D4B26F]/40" />
            </div>
            <p className="text-sm leading-relaxed text-[#5C504E] mb-5">
              {settings?.tagline || 'enjoy ur art — Where creativity blooms and every stroke tells a story.'}
            </p>
            <div className="flex gap-3">
              <a href={settings?.instagramUrl || 'https://instagram.com/kalakriti.artstudio'} target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#3E3431]/10 text-xs font-semibold text-[#5C504E] hover:bg-[#704A87] hover:text-white transition-all">
                Instagram
              </a>
              <a href={settings?.facebookUrl || 'https://facebook.com/KalakritiArtStudio'} target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#3E3431]/10 text-xs font-semibold text-[#5C504E] hover:bg-[#704A87] hover:text-white transition-all">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4B26F] font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/courses', label: 'Courses' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/events', label: 'Events & Workshops' },
                { to: '/testimonials', label: 'Testimonials' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#5C504E] hover:text-[#704A87] transition-colors flex items-center gap-1.5">
                    <ChevronRight size={13} className="text-[#D4B26F]" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#D4B26F] font-bold mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-sm text-[#5C504E]">
              {['Art Classes', 'Workshops', 'Hobby Classes', 'Custom Art', 'Art Events', 'Birthday Parties'].map(c => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0B3B7] inline-block shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#D4B26F] font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#704A87] mt-0.5 shrink-0" />
                <span className="text-[#5C504E]">
                  {settings?.address || '208-B, 54th Cross, Opp Sri Rama Mandira, Rajajinagar 4th Block, Bangalore-10'}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-[#704A87] shrink-0" />
                <a href={`tel:${settings?.phone || '+918197344421'}`} className="text-[#5C504E] hover:text-[#704A87] transition-colors">
                  {settings?.phone || '+91 81973 44421'}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-[#704A87] shrink-0" />
                <a href={`mailto:${settings?.email || 'kalakriti.artstudio@gmail.com'}`} className="text-[#5C504E] hover:text-[#704A87] transition-colors text-xs">
                  {settings?.email || 'kalakriti.artstudio@gmail.com'}
                </a>
              </li>
              <li className="mt-4 bg-[#3E3431]/5 rounded-xl p-3 text-center">
                <p className="text-[#D4B26F] font-bold text-xs uppercase tracking-wider mb-1">Studio Timings</p>
                <p className="text-[#3E3431] font-bold text-lg">10:00 AM – 9:00 PM</p>
                <p className="text-[#5C504E] text-xs">Monday to Sunday</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#DED4C3] py-5 bg-[#3E3431]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#8F8082]">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Kalakriti Art Studio. Made with <Heart size={11} className="text-[#704A87] fill-[#704A87]" /> in Bangalore
          </p>
          <Link to="/admin/login" className="hover:text-[#D4B26F] transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  )
}
