import { BUCKET_URL } from '@/constants/bucket'
import matter, { GrayMatterFile } from 'gray-matter'

export async function getMarkdownFromS3(filename: string): Promise<GrayMatterFile<string>> {
  const res = await fetch(`${BUCKET_URL}/custom/blog/${filename}`)
  if (!res.ok) throw new Error('Помилка завантаження файлу')

  const blog = await res.text()

  const matterResult = matter(blog)

  return matterResult
}
