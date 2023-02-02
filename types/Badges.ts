export interface BadgesProps {
  coverage_badge_url: string
  coverage_badge_href: string
  issues_badge_url: string
  issues_badge_href: string
  templates: {
    html: {
      coverage: string
      issues: string
    }
    markdown: {
      coverage: string
      issues: string
    }
    textile: {
      coverage: string
      issues: string
    }
    rdoc: {
      coverage: string
      issues: string
    }
    restructured: {
      coverage: string
      issues: string
    }
  }
}

export interface BadgesResponseProps extends BadgesProps {
  code?: number
}

export type TemplateProps =
  | 'html'
  | 'markdown'
  | 'textile'
  | 'rdoc'
  | 'restructured'
