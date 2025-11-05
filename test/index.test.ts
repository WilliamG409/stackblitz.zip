import { existsSync, readFileSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import JSZip from 'jszip'
import { afterEach, describe, expect, it } from 'vitest'
import { downloadToBuffer, downloadToFile, parseUrl } from '../src'

const testOutputs: string[] = []

afterEach(() => {
  // Clean up any test zip files
  for (const file of testOutputs) {
    if (existsSync(file)) {
      unlinkSync(file)
    }
  }
  testOutputs.length = 0
})

describe('downloadToFile', () => {
  it('downloads a valid project and creates a zip file', async () => {
    const outputPath = resolve(process.cwd(), 'test-download.zip')
    testOutputs.push(outputPath)

    const result = await downloadToFile({
      projectId: 'nuxt-starter-k7spa3r4',
      outputPath,
    })

    expect(result).toBe(outputPath)
    expect(existsSync(outputPath)).toBe(true)

    // Verify the zip contains files
    const zipData = readFileSync(outputPath)
    const zip = await JSZip.loadAsync(zipData)
    const fileNames = Object.keys(zip.files)
    expect(fileNames.length).toBeGreaterThan(0)

    // Check for expected files
    expect(fileNames).toContain('package.json')
    expect(fileNames).toContain('app.vue')
  }, 30000)

  it('generates default output path when not specified', async () => {
    const result = await downloadToFile({
      projectId: 'nuxt-starter-k7spa3r4',
    })

    testOutputs.push(result)
    expect(result).toMatch(/nuxt-starter-k7spa3r4\.zip$/)
    expect(existsSync(result)).toBe(true)
  }, 30000)

  it('throws error for invalid project ID', async () => {
    await expect(
      downloadToFile({
        projectId: 'this-project-definitely-does-not-exist-123456789',
      }),
    ).rejects.toThrow()
  })

  it('excludes node_modules and .git directories', async () => {
    const outputPath = resolve(process.cwd(), 'test-exclusions.zip')
    testOutputs.push(outputPath)

    await downloadToFile({
      projectId: 'nuxt-starter-k7spa3r4',
      outputPath,
    })

    const zipData = readFileSync(outputPath)
    const zip = await JSZip.loadAsync(zipData)
    const fileNames = Object.keys(zip.files)

    // Should not contain node_modules or .git paths
    const hasNodeModules = fileNames.some(f => f.includes('node_modules/'))
    const hasGit = fileNames.some(f => f.includes('.git/'))

    expect(hasNodeModules).toBe(false)
    expect(hasGit).toBe(false)
  }, 30000)
})

describe('parseUrl', () => {
  it('extracts project ID from URL', () => {
    const projectId = parseUrl('https://stackblitz.com/edit/nuxt-starter-k7spa3r4')
    expect(projectId).toBe('nuxt-starter-k7spa3r4')
  })

  it('handles URLs with query parameters', () => {
    const projectId = parseUrl('https://stackblitz.com/edit/nuxt-starter-k7spa3r4?file=app.vue')
    expect(projectId).toBe('nuxt-starter-k7spa3r4')
  })

  it('handles URLs with hash fragments', () => {
    const projectId = parseUrl('https://stackblitz.com/edit/nuxt-starter-k7spa3r4#section')
    expect(projectId).toBe('nuxt-starter-k7spa3r4')
  })

  it('throws error for invalid URL format', () => {
    expect(() => parseUrl('https://example.com/invalid')).toThrow('Invalid StackBlitz URL')
  })

  it('throws error for malformed URL', () => {
    expect(() => parseUrl('not-a-url')).toThrow('Invalid StackBlitz URL')
  })
})

describe('downloadToBuffer', () => {
  it('downloads and returns ArrayBuffer', async () => {
    const buffer = await downloadToBuffer({
      projectId: 'nuxt-starter-k7spa3r4',
    })

    expect(buffer).toBeInstanceOf(ArrayBuffer)
    expect(buffer.byteLength).toBeGreaterThan(0)

    // Verify it's a valid zip
    const zip = await JSZip.loadAsync(buffer)
    const fileNames = Object.keys(zip.files)
    expect(fileNames.length).toBeGreaterThan(0)
    expect(fileNames).toContain('package.json')
  }, 30000)

  it('can be used with parseUrl', async () => {
    const projectId = parseUrl('https://stackblitz.com/edit/nuxt-starter-k7spa3r4')
    const buffer = await downloadToBuffer({ projectId })

    expect(buffer).toBeInstanceOf(ArrayBuffer)
    expect(buffer.byteLength).toBeGreaterThan(0)
  }, 30000)
})
