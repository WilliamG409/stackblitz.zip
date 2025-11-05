/* eslint-disable no-console */
import { downloadToBuffer, downloadToFile, parseUrl } from 'stackblitz-zip'

async function main() {
  const url = 'https://stackblitz.com/edit/nuxt-starter-k7spa3r4'
  const projectId = parseUrl(url)
  console.log(`Project ID: ${projectId}`)

  // Example 1: Download to file
  console.log('\nDownloading to file...')
  const filePath = await downloadToFile({
    projectId,
    outputPath: './test-download.zip',
  })
  console.log(`✅ Downloaded to: ${filePath}`)

  // Example 2: Download as buffer (for streaming)
  console.log('\nDownloading as buffer...')
  const buffer = await downloadToBuffer({ projectId })
  console.log(`✅ Downloaded ${projectId}: ${buffer.byteLength} bytes`)
}

main().catch(console.error)
