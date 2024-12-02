export function getBackendImage(filename: string) {
  return `http://localhost:3001/upload/${filename}`;
}

export function getClassImage(className: string) {
  return `/img/classes/${className}.jpeg`;
}

export function getItemImage(type: string) {
  return `/img/items/${type}.png`;
}
