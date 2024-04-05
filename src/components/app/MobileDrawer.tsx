'use client'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import Drawer from '../react/components/Drawer'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  MAIN_SIDEBAR,
  REACT_SIDEBAR,
  SHADCN_SIDEBAR,
} from '@/data/sidebar-links'

export default function MobileDrawer() {
  const router = useRouter()
  const pathname = usePathname()

  const ACTIVE_SIDEBAR = pathname.includes('/docs')
    ? MAIN_SIDEBAR
    : pathname.includes('/react')
    ? REACT_SIDEBAR
    : pathname.includes('/shadcn')
    ? SHADCN_SIDEBAR
    : MAIN_SIDEBAR

  const [isDrawerActive, setIsDrawerActive] = useState(false)

  const handleLinkClick = (path: string) => {
    setIsDrawerActive(false)
    router.push(path)
  }

  return (
    <>
      <div className="hidden w-[108px] m700:block m500:w-[92px] m400:w-[unset]">
        <button
          onClick={() => setIsDrawerActive(true)}
          className="flex items-center justify-center rounded-base border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
        >
          <FaBars className="h-6 w-6 m500:h-4 m500:w-4" />
        </button>
      </div>

      <Drawer active={isDrawerActive} setActive={setIsDrawerActive}>
        <div className="scrollbar h-full w-full overflow-y-scroll bg-white">
          {ACTIVE_SIDEBAR.map((item, id) => {
            return typeof item === 'string' ? (
              <div
                key={id}
                className="sidebaritem block border-b-4 border-r-4 border-black p-4 text-xl font-bold m800:p-4 m800:text-base"
              >
                {item}
              </div>
            ) : (
              <button
                key={id}
                onClick={() => {
                  handleLinkClick(item.href)
                }}
                className="sidebaritem block w-full border-b-4 border-r-4 border-black p-4 pl-7 text-left text-lg font-semibold text-black/90 hover:bg-main m800:p-4 m800:pl-6 m800:text-base"
              >
                {item.text}
              </button>
            )
          })}
        </div>
      </Drawer>
    </>
  )
}
