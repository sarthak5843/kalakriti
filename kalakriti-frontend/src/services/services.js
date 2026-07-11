import api from './api'

// Auth
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
}

// Courses
export const courseService = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  enroll: (data) => api.post('/courses/enroll', data),
  myEnrollments: () => api.get('/courses/my-enrollments'),
}

// Events
export const eventService = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  book: (eventId, paymentId) => api.post(`/events/${eventId}/book`, null, { params: { paymentId } }),
  myBookings: () => api.get('/events/my-bookings'),
}

// Gallery
export const galleryService = {
  getCategories: () => api.get('/gallery/categories'),
  getImages: (categoryId) => categoryId
    ? api.get(`/gallery/category/${categoryId}`)
    : api.get('/gallery'),
}

// Testimonials
export const testimonialService = {
  getApproved: () => api.get('/testimonials/approved'),
  submit: (data) => api.post('/testimonials', data),
}

// Contact
export const contactService = {
  submit: (data) => api.post('/contact', data),
}

// Site Settings
export const siteService = {
  get: () => api.get('/settings'),
}

// Admin
export const adminService = {
  // Dashboard
  stats: () => api.get('/admin/stats'),

  // Courses
  createCourse: (data) => api.post('/admin/courses', data),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
  addBatch: (courseId, data) => api.post(`/admin/courses/${courseId}/batches`, data),

  // Enrollments
  getEnrollments: () => api.get('/admin/enrollments'),
  approveEnrollment: (id) => api.put(`/admin/enrollments/${id}/status`, null, { params: { status: 'APPROVED' } }),
  rejectEnrollment: (id) => api.put(`/admin/enrollments/${id}/status`, null, { params: { status: 'REJECTED' } }),

  // Events
  createEvent: (data) => api.post('/admin/events', data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  getEventBookings: () => api.get('/admin/events/bookings'),
  approveEventBooking: (id) => api.put(`/admin/events/bookings/${id}/status`, null, { params: { status: 'CONFIRMED' } }),
  rejectEventBooking: (id) => api.put(`/admin/events/bookings/${id}/status`, null, { params: { status: 'REJECTED' } }),

  // Gallery
  getGalleryCategories: () => api.get('/gallery/categories'),
  createCategory: (data) => api.post('/admin/gallery/categories', data),
  deleteCategory: (id) => api.delete(`/admin/gallery/categories/${id}`),
  uploadImage: (formData) => api.post('/admin/gallery/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteImage: (id) => api.delete(`/admin/gallery/images/${id}`),

  // Testimonials
  getTestimonials: () => api.get('/admin/testimonials'),
  approveTestimonial: (id) => api.put(`/admin/testimonials/${id}/status`, null, { params: { status: 'APPROVED' } }),
  rejectTestimonial: (id) => api.put(`/admin/testimonials/${id}/status`, null, { params: { status: 'REJECTED' } }),

  // Contacts
  getContacts: () => api.get('/admin/contacts'),
  markRead: (id) => api.put(`/admin/contacts/${id}/read`),

  // Users
  getUsers: () => api.get('/admin/users'),

  // Site Settings
  updateSettings: (data) => api.put('/admin/settings', data),
  uploadLogo: (formData) => api.post('/admin/settings/logo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadQrCode: (formData) => api.post('/admin/settings/qrcode', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}
