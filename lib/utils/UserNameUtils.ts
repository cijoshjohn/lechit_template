/**
 * Gets up to 2 characters representing a person's initials.
 * The result contains the capitalised first letter of the first and last words in a name if present.
 * If only 1 word exists, only 1 letter is returned.
 */
export function getInitials(fullName: string): string {
  fullName = fullName?.trim();
  if (!fullName || fullName.length === 0) return '';
  const names = fullName.split(' ');
  const initials = names.map((n) => n.substring(0, 1).toLocaleUpperCase());
  const first = initials[0];
  const last = initials.length > 1 ? initials[initials.length - 1] : '';
  return `${first}${last}`;
}
