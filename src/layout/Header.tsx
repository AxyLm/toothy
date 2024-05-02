import { ReactNode } from 'react'
import './header.less'
export const Header = ({ action }: { action?: ReactNode }) => {
  return (
    <div className="header sticky inset-x-0 top-0 z-20 flex items-center justify-between border-b border-b-white/5 px-4 sm:h-20 sm:px-7.5 xl:px-10">
      <div className="flex items-center font-bold">
        <span className="text-xs ">
          <span>Toothy</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
          <a href="https://github.com/AxyLm/toothy" target="_blank" rel="noopener" title="github">
            <i className="nes-icon github"></i>
          </a>
      </div>
    </div>
  )
}
