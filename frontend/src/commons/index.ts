// console.log("index")

export const index = {}

export const convertContent = (content: string) => {
    let newContent = content.replaceAll('<figure ', ' . <figure ')
    newContent = newContent.replaceAll('</figure>', '</figure>. ')
    newContent = newContent.replaceAll('. <img ', '<img ')
    newContent = newContent.replaceAll('<img ', ' . <img ')
    newContent = newContent.replaceAll('jpg">', 'jpg">. ')
    newContent = newContent.replaceAll('><', '>. <')
    newContent = newContent.replaceAll('&nbsp;', ' ')

    return newContent
}

export const isUrl = (url: string) => {
    const regexp = /(ftp|http|https|blog):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(url)
  }  