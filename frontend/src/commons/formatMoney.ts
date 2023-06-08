export function formatNumberDot(num: number | string = 0) {
    if (num) {
      // const money = Math.round(Number(num))
      return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
    }
    return ''
  }