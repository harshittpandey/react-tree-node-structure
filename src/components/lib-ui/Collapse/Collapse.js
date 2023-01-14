import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";

export const COLLAPSE_ICON_UI = (isVisible, toggleCollapse) => isVisible ?
  <KeyboardArrowUpIcon className="cursor-pointer" onClick={toggleCollapse} /> :
  <KeyboardArrowDownIcon className="cursor-pointer" onClick={toggleCollapse} /> 

export default function Collapse ({ visible, header, children }) {
  const [isVisible, setIsVisible] = useState(visible)
  useEffect(() => setIsVisible(visible), [visible]) // update internal state
  // user action
  const toggleCollapse = () => setIsVisible(prev => !prev)

  const collapseIcon = () => COLLAPSE_ICON_UI(isVisible, toggleCollapse)

  return (<div className="px-2">
    <div className="flex items-center">
      {collapseIcon()}
      <span className="ml-2">{header}</span>
    </div>
    {
      isVisible ? <div className="ml-8">{children}</div> : ""
    }
  </div>)
}