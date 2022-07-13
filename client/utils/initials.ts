export function initials(name: string) {
  const names = name.split(' ');
  const initials = names.map((name) => name[0]).join('');
  return initials;
}
