export function getBackendImage(filename: string) {
  return `http://localhost:3001/upload/${filename}`;
}

export function getClassImage(className: string) {
  return `/img/classes/${className}.jpeg`;
}