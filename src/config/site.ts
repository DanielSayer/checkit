type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'CheckItNotes',
  description: 'A ',
  url: 'https://checkit-omega.vercel.app/',
  links: {
    github: 'https://github.com/DanielSayer/checkit',
  },
}
