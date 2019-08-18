export const resolveSearchParams = (search) => {
  const target = Object.create(null)
  search
    .substring(1)
    .split('&')
    .forEach((item) => {
      const [key, value] = item.split('=')
      target[key] = value
    })
  return target
}

export default {
  resolveSearchParams
}