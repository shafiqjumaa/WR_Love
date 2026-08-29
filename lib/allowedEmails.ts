export const ALLOWED_EMAILS = [
  process.env.ALLOWED_EMAIL_1?.toLowerCase().trim(),
  process.env.ALLOWED_EMAIL_2?.toLowerCase().trim(),
].filter(Boolean) as string[];

export function isAllowedEmail(email: string | null | undefined) {
  if (!email) return false;
  return ALLOWED_EMAILS.includes(email.toLowerCase().trim());
}
