export interface Session {
  isLoggedIn: boolean
  id?: string
  userName?: string
  email?: string
  role?: 'patient' | 'doctor'
}
