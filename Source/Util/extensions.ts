import { Tips } from "../Tips.json";

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

export function tip() {
  let i = Math.floor(Math.random() * 20) + 1
  if (i === 2) {
    const random = Math.floor(Math.random() * Tips.length)
    return true && `<:Tip:865027701002076170> ${Tips[random]}`
  } else if (i === 4) {
    const random = Math.floor(Math.random() * Tips.length)
    return true && `<:Tip:865027701002076170> ${Tips[random]}`
  } if (i === 6) {
    const random = Math.floor(Math.random() * Tips.length)
    return true && `<:Tip:865027701002076170> ${Tips[random]}`
  } if (i === 8) {
    const random = Math.floor(Math.random() * Tips.length)
    return true && `<:Tip:865027701002076170> ${Tips[random]}`
  } if (i === 10) {
    const random = Math.floor(Math.random() * Tips.length)
    return true && `<:Tip:865027701002076170> ${Tips[random]}`
  }
}