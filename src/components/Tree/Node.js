import { useEffect, useState, memo } from "react"
import Checkbox from "../lib-ui/Checkbox/Checkbox"
// import NorthIcon from "@mui/icons-material/North";
// import SouthIcon from "@mui/icons-material/South";

function Node ({ visible, node, nodeIdx, changeNodeCheckbox, scrollUp, scrollDown }) {
  const [isVisible, setIsVisible] = useState(visible)
  useEffect(() => setIsVisible(visible), [visible])

  const handleCheckboxChange = (enabled) => {
    setIsVisible(enabled)
    changeNodeCheckbox?.(nodeIdx, node, enabled)
  }

  return node.visible && (
    <div className="p-1 flex space-x-3 items-center">
      <Checkbox indeterminate={visible === -1} enable={isVisible} onChange={handleCheckboxChange} />
      <span className="cursor-pointer" onClick={() => handleCheckboxChange(!isVisible)}>{node.label}</span>
      {/* <span>
        <NorthIcon
          className="cursor-pointer w-2 mr-2 active:text-blue-400"
          style={{ fontSize: "14px" }}
          onClick={scrollUp}
        />
        <SouthIcon
          className="cursor-pointer w-2 mr-2 active:text-blue-400"
          style={{ fontSize: "14px" }}
          onClick={scrollDown}
        />
      </span> */}
    </div>
  )
}

export default memo(Node)