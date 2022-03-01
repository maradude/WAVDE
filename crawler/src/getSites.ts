import fs from 'fs'

export function getSites(filePath: string) {
  try {
    const text = fs.readFileSync(filePath, 'utf8')
    const domains = text.split('\n')
    return domains.map((d) => `https://${d}`)
  } catch (err) {
    console.error(err)
  }
}
