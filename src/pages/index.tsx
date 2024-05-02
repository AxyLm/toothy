import items from '@/configs/items.json'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useVirtualizer } from '@tanstack/react-virtual'
import ogImage from '@/assets/img/image01.gif'

const columnCount = 12
const rowCount = Math.ceil(10000 / columnCount)

function ToothyItem({ index }: { index: number }) {
  if (index >= 10000) return null
  const e = items[index]
  const indexStr = `${index + 1}`.padStart(4, '0')
  return (
    <Card
      item={{
        image: `/toothy/${indexStr}.${e.data.args.main.split('.').pop()}`,
        title: `${indexStr}`,
        description: '',
      }}
      key={index}
    />
  )
}

function Card({
  item,
}: {
  item: {
    image: string
    title: string
    description: string
  }
}) {
  return (
    <div className="inline-block">
      <LazyLoadImage alt={item.title} height="167" src={item.image} width="167" />
      <h2>#{item.title}</h2>
    </div>
  )
}

const getIndex = (row: number, column: number) => {
  return row * columnCount + column
}

function GridVirtualizerFixed() {
  const parentRef = React.useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 190,
    overscan: 5,
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columnCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 167,
    overscan: 5,
  })

  return (
    <>
      <div ref={parentRef} className="List">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.key}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn, i) => (
                <div
                  key={virtualColumn.key}
                  className={
                    virtualColumn.index % 2
                      ? virtualRow.index % 2 === 0
                        ? 'ListItemOdd'
                        : 'ListItemEven'
                      : virtualRow.index % 2
                      ? 'ListItemOdd'
                      : 'ListItemEven'
                  }
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                  }}
                >
                  <ToothyItem index={getIndex(virtualRow.index, virtualColumn.index)} key={items[i].mainHash} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

function Main() {
  return (
    <>
      {/* <div className='text-center'>
        <img alt="Toothy" src={ogImage} className='inline-block'/>
      </div> */}
      <GridVirtualizerFixed />
    </>
  )
}
export default Main
