import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import AdminEvents from './pages/admin/AdminEvents'
import AdminGallery from './pages/admin/AdminGallery'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminEnrollments from './pages/admin/AdminEnrollments'
import AdminContacts from './pages/admin/AdminContacts'
import AdminSettings from './pages/admin/AdminSettings'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const { isAdmin, isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{
          style: { background: '#FDF5E6', color: '#2C1810', border: '1px solid #D2B48C' }
        }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/courses/:id" element={<PublicLayout><CourseDetail /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
          <Route path="/events/:id" element={<PublicLayout><EventDetail /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

          {/* User Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><PublicLayout><Dashboard /></PublicLayout></ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
          <Route path="/admin/events" element={<AdminRoute><AdminEvents /></AdminRoute>} />
          <Route path="/admin/gallery" element={<AdminRoute><AdminGallery /></AdminRoute>} />
          <Route path="/admin/testimonials" element={<AdminRoute><AdminTestimonials /></AdminRoute>} />
          <Route path="/admin/enrollments" element={<AdminRoute><AdminEnrollments /></AdminRoute>} />
          <Route path="/admin/contacts" element={<AdminRoute><AdminContacts /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
