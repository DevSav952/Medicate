import type { Metadata } from 'next'
import { Roboto, Jost } from 'next/font/google'
import './globals.css'
import { SITE_NAME } from '@/constants/seo'

const roboto = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--primary-font',
  style: ['normal']
})

const jost = Jost({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--secondary-font',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description:
    'Medicate puts your entire healthcare journey in one place: book video visits, manage prescriptions, track vitals, and access personalised wellness insights — all with hospital‑grade security.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${jost.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
