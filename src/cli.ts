#!/usr/bin/env node

import process from 'node:process'
import { downloadToFile, parseUrl } from './download'

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
StackBlitz Project Downloader

Usage:
  stackblitz-zip <url> [output-path]

Arguments:
  url          StackBlitz project URL (e.g., https://stackblitz.com/edit/nuxt-starter-k7spa3r4)
  output-path  Optional path for the output zip file (defaults to <project-id>.zip)

Examples:
  stackblitz-zip https://stackblitz.com/edit/nuxt-starter-k7spa3r4
  stackblitz-zip https://stackblitz.com/edit/nuxt-starter-k7spa3r4 my-project.zip
`)
    process.exit(0)
  }

  const url = args[0]!
  const outputPath = args[1]

  try {
    const projectId = parseUrl(url)
    await downloadToFile({ projectId, outputPath, verbose: true })
  }
  catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
