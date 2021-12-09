export async function replaceLength(
  data: string,
  max: number,
  valueNumber: number
) {
  if (data.length > max) {
    return data.slice(0, valueNumber) + "...";
  }
  return data.toString();
}

export function haveAndReplace(text: string, have: string, replace?: string) {
  if (!replace) {
    if (text.includes(have)) return true
    else return false;
  } else {
    if (text.includes(have)) return text.replace(have, replace)
    else return false;
  }
}

export function HaveNumber(text: string) {
  const regex = /^[0-9]*$/;
  if (regex.test(text) === true) return true
  else return false
}