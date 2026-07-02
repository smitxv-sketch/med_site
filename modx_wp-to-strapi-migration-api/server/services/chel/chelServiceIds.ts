/** SSOT legacyId для синка услуг ЧЛБ */

export function chelCategoryLegacyId(termId: number): string {
  return `chel-dir:${termId}`;
}

export function chelServiceLegacyId(postId: number): string {
  return `chel-svc:${postId}`;
}
