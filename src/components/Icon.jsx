const paths = {
  spark: '<path d="m12 3 1.5 5.2L19 10l-5.5 1.8L12 17l-1.5-5.2L5 10l5.5-1.8L12 3Z"/>',
  book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/>',
  health: '<path d="M20.8 5.8a5.5 5.5 0 0 0-8.8-1.3 5.5 5.5 0 0 0-8.8 6.6C4.8 14.8 12 20 12 20s7.2-5.2 8.8-8.9a5.5 5.5 0 0 0 0-5.3Z"/><path d="M8 12h2l1-3 2 6 1-3h2"/>',
  women: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0M12 17v5M9.5 20h5"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  leaf: '<path d="M11 20A8 8 0 0 1 4 9c5 0 8-2 10-6 5 3 7 8 4 12-1.7 2.4-4.2 3.8-7 5Z"/><path d="M4 21c3-5 7-8 13-10"/>',
  road: '<path d="M8 2 5 22M16 2l3 20M12 2v4M12 10v4M12 18v4"/>',
  tree: '<path d="m12 3-5 7h3l-5 7h14l-5-7h3l-5-7ZM12 17v5"/>',
  digital: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 9h.01M10 9h7M7 12h.01M10 12h5"/>',
  water: '<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/><path d="M9 16a3 3 0 0 0 3 3"/>',
  bolt: '<path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
  bus: '<rect x="4" y="3" width="16" height="17" rx="3"/><path d="M4 11h16M8 16h.01M16 16h.01M7 20v2M17 20v2"/>',
  clean: '<path d="m4 21 5-12 6 2-2 10H4ZM9 9l1-5 6 1-1 6M15 4l4-2"/>',
  services: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.1.4.3.7.6 1 .3.2.6.4 1 .4h.1v4H21a1.7 1.7 0 0 0-1.6.6Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4a2.5 2.5 0 0 1-3.6 3.6l-7.7-7.7a4 4 0 0 1-5-5L6 9.6 8.4 7.2 6.1 4.9"/>',
  sport: '<circle cx="12" cy="12" r="9"/><path d="m8.5 4.5 2 3.5-2.5 3-4-.5M15.5 4.5l-2 3.5 2.5 3 4-.5M8 11l1.5 4h5L16 11M7 19l2.5-4M17 19l-2.5-4"/>',
  rocket: '<path d="M14 4c3-3 6-2 6-2s1 3-2 6l-5 5-4-4 5-5ZM9 9l-4 1-3 3 6 1M13 13l-1 4-3 3-1-6M5 19c-1 1-3 1-3 1s0-2 1-3 3-1 3-1 0 2-1 3Z"/>',
  exam: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  ear: '<path d="M6 10a6 6 0 1 1 12 0c0 5-4 5-4 8a2 2 0 0 1-4 0M9 10a3 3 0 1 1 6 0c0 2-2 2.5-2 4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/>',
}

export default function Icon({ name, size = 24, className = '' }) {
  const content = paths[name] || paths.spark
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: content }} />
  )
}
