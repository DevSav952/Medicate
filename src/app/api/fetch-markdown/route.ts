import { NextResponse } from 'next/server'
import { BUCKET_URL } from '@/constants/bucket'

export async function GET() {
  const s3Url = `${BUCKET_URL}/custom/blog/1749101193612-blog_Заголовок_статті.md`

  const res = await fetch(s3Url)
  if (!res.ok) {
    return new NextResponse('Не вдалося завантажити файл', { status: 500 })
  }

  const content = await res.text()

  console.log('content', content)

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown'
    }
  })
}
