'use server'

import connectMongoDB from '@/lib/connectMongoDB'
import Analyses from '@/interfaces/Analyses.interface'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const analysesId = url.pathname.split('/').pop()

  try {
    await connectMongoDB()
    const analyses = await Analyses.findById(analysesId)

    if (!analyses) {
      return NextResponse.json({ message: 'Analyses not found' }, { status: 404 })
    }

    return NextResponse.json(analyses)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
