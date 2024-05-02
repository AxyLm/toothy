import { readFileSync, writeFileSync } from 'fs'

const jsonMerge = Array.from({ length: 10000 }).map((e, i) => {
  const index = `${i + 1}`.padStart(4, '0')
  console.log(index);
  const string = readFileSync(`./public/json/item-${index}.json`, 'utf-8')
  const item = JSON.parse(string)
  return {
    mainHash: item.mainHash,
    targetHash: item.targethash,
    data: {
      args: {
        "request_dmitem": item.data.args.request_dmitem,
        "main": item.data.args.main,

      }
    }
  }
})
writeFileSync('./src/configs/items.json', JSON.stringify(jsonMerge))
