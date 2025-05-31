export interface ISelectItem {
  label: string
  value: string
}

export interface ISignIn {
  email: string
  password: string
}

export interface IDoctorSignIn {
  email: string
  password: string
}

export interface ISignUp {
  email: string
  password: string
  userName: string
  confirmPassword: string
}

export interface IDoctorSignUp {
  email: string
  password: string
  doctorName: string
  confirmPassword: string
  position: string
  phone: string
}

export interface SelectOption {
  label: string
  value: string
}

export interface AppointmentEmailProps {
  appointmentId: string
  patientName: string
  appointmentDate: string
  appointmentTime: string
  doctorName: string
}

export interface PaymentSuccessEmail {
  patientName: string
  appointmentDate: string
  appointmentTime: string
  doctorName: string
  paymentAmount: number
}
