export function setStorageItem(key, value) {
  return window.localStorage.setItem(key, value);
}

export function getStorageItem(key, def = '') {
  return window.localStorage.getItem(key) || def;
}

export function clearStorage() {
  window.localStorage.clear();
}
