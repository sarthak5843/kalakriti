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
    <footer className="bg-[#1a1a4e] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #E91E8C 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7B2D8B 0%, transparent 70%)' }} />

      <div className="h-1 bg-gradient-to-r from-[#E91E8C] via-[#C9A84C] to-[#7B2D8B]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={settings?.logoUrl || '/logo.png'} alt="Kalakriti" className="w-16 h-16 object-contain" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-[#C9A84C]/40" />
              <Heart size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
              <div className="h-px flex-1 bg-[#C9A84C]/40" />
            </div>
            <p className="text-sm leading-relaxed text-purple-200 mb-5">
              {settings?.tagline || 'enjoy ur art — Where creativity blooms and every stroke tells a story.'}
            </p>
            <div className="flex gap-3">
              <a href={settings?.instagramUrl || 'https://instagram.com/kalakriti.artstudio'} target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-purple-200 hover:bg-[#E91E8C] hover:text-white transition-all">
                Instagram
              </a>
              <a href={settings?.facebookUrl || 'https://facebook.com/KalakritiArtStudio'} target="_blank" rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-purple-200 hover:bg-[#7B2D8B] hover:text-white transition-all">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A84C] font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
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
                  <Link to={link.to} className="text-purple-200 hover:text-[#E91E8C] transition-colors flex items-center gap-1.5">
                    <ChevronRight size={13} className="text-[#C9A84C]" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C9A84C] font-bold mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-sm text-purple-200">
              {['Art Classes', 'Workshops', 'Hobby Classes', 'Custom Art', 'Art Events', 'Birthday Parties'].map(c => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E8C] inline-block shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A84C] font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#E91E8C] mt-0.5 shrink-0" />
                <span className="text-purple-200">
                  {settings?.address || '208-B, 54th Cross, Opp Sri Rama Mandira, Rajajinagar 4th Block, Bangalore-10'}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-[#E91E8C] shrink-0" />
                <a href={`tel:${settings?.phone || '+918197344421'}`} className="text-purple-200 hover:text-[#E91E8C] transition-colors">
                  {settings?.phone || '+91 81973 44421'}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-[#E91E8C] shrink-0" />
                <a href={`mailto:${settings?.email || 'kalakriti.artstudio@gmail.com'}`} className="text-purple-200 hover:text-[#E91E8C] transition-colors text-xs">
                  {settings?.email || 'kalakriti.artstudio@gmail.com'}
                </a>
              </li>
              <li className="mt-4 bg-white/10 rounded-xl p-3 text-center">
                <p className="text-[#C9A84C] font-bold text-xs uppercase tracking-wider mb-1">Studio Timings</p>
                <p className="text-white font-bold text-lg">10:00 AM – 9:00 PM</p>
                <p className="text-purple-200 text-xs">Monday to Sunday</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-purple-300">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Kalakriti Art Studio. Made with <Heart size={11} className="text-[#E91E8C] fill-[#E91E8C]" /> in Bangalore
          </p>
          <Link to="/admin/login" className="hover:text-[#C9A84C] transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  )
}
