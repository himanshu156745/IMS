import { useEffect, useRef, useState } from 'react'

/**
 * Small hook to manage a single open/closed dropdown, closing on outside click.
 * Returns [isOpen, toggle, ref] — attach ref to the dropdown's outer wrapper.
 */
export function useDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const toggle = () => setOpen((v) => !v)

  return [open, toggle, ref]
}
