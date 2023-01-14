import { useEffect, useRef } from "react";

export default function Checkbox ({enable, indeterminate, onChange}) {
  const toggleCheckbox = (e) => {
    e.stopPropagation();
    onChange(!enable)
  }

  const checkboxRef = useRef(null)
  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return <input
    className="w-5 h-5 cursor-pointer accent-[#2295f3]"
    ref={checkboxRef}
    type="checkbox"
    value=""
    checked={enable || false}
    onChange={toggleCheckbox}
  />
}