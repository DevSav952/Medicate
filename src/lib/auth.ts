'use server'

import connectMongoDB from './connectMongoDB'
import Patient from '@/interfaces/Patient.interface'
import Doctor from '@/interfaces/Doctor.interface'
import { Session } from '@/interfaces/Session.interface'
import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { IDoctorSignUp, ISignIn, ISignUp } from '@/interfaces/shared'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

const defaultSession: Session = {
  isLoggedIn: false
}

const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: 'lama-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}

export const getSession = async () => {
  const session = await getIronSession<Session>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
    // session.theme = defaultSession.theme
  }

  return session
}

export const loginPatient = async (data: ISignIn) => {
  await connectMongoDB()
  const session = await getSession()
  const patient = await Patient.findOne({ email: data.email })

  if (!patient) {
    return { error: 'Patient not found' }
  }

  const isValidPass = await bcrypt.compare(data.password, patient._doc.passwordHash)

  if (!isValidPass) {
    return { error: 'Login or password incorrect' }
  }

  const { passwordHash, ...patientData } = patient._doc

  session.isLoggedIn = true
  session.role = 'patient'
  session.id = patientData._id
  session.userName = patientData.userName
  session.email = patientData.email

  await session.save()
}

export const registerPatient = async (patient: ISignUp) => {
  await connectMongoDB()
  const session = await getSession()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(patient.password, salt)

  const doc = new Patient({
    email: patient.email,
    passwordHash: hash,
    userName: patient.userName,
    dateOfBirth: '',
    phoneNumber: '',
    bloodType: '',
    diabetes: '',
    rhFactor: '',
    bloodTransfusion: '',
    intoleranceToMedicines: '',
    infectiousDiseases: '',
    surgicalInterventions: '',
    allergies: ''
  })

  const patientDoc = await doc.save()

  session.isLoggedIn = true
  session.role = 'patient'
  session.id = patientDoc._id
  session.userName = patientDoc.userName
  session.email = patientDoc.email

  await session.save()
}

export const logout = async () => {
  const session = await getSession()

  session.destroy()
  redirect('/')
}

export const loginDoctor = async (data: ISignIn) => {
  await connectMongoDB()
  const session = await getSession()
  const doctor = await Doctor.findOne({ email: data.email })

  if (!doctor) {
    return { error: 'Patient not found' }
  }

  const isValidPass = await bcrypt.compare(data.password, doctor._doc.passwordHash)

  if (!isValidPass) {
    return { error: 'Login or password incorrect' }
  }

  const { passwordHash, ...doctorData } = doctor._doc

  session.isLoggedIn = true
  session.role = 'doctor'
  session.id = doctorData._id
  session.userName = doctorData.userName
  session.email = doctorData.email

  await session.save()
}

export const registerDoctor = async (doctor: IDoctorSignUp) => {
  await connectMongoDB()
  const session = await getSession()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(doctor.password, salt)

  const doc = new Patient({
    email: doctor.email,
    passwordHash: hash,
    doctorName: doctor.doctorName,
    position: '',
    description: '',
    phone: ''
  })

  const patientDoc = await doc.save()

  session.isLoggedIn = true
  session.role = 'patient'
  session.id = patientDoc._id
  session.userName = patientDoc.userName
  session.email = patientDoc.email

  await session.save()
}
