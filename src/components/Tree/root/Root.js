import ParentNode from "../parent/ParentNode";
import Checkbox from "../../lib-ui/Checkbox/Checkbox";
import {COLLAPSE_ICON_UI} from "../../lib-ui/Collapse/Collapse"
import {TOGGLE_NESTED_CHILDRENS, SEARCH_NESTED_CHILDRENS, REVIEW_IMMEDIATE_CHECKBOX} from "../shared/utils"
import { useCallback, useEffect, useState } from "react";

export default function Root ({nodes, onChangeSelectedNodes}) {
  // parentNode handlers
  const [parentNodes, setParentNodes] = useState(nodes)

  // root checkbox handlers
  const [rootChecked, setRootChecked] = useState(false)
  const handleRootCheckbox = (enabled) => {
    setRootChecked(enabled)
    setParentNodes(TOGGLE_NESTED_CHILDRENS(parentNodes, enabled))
  }

  // collapse handlers
  const [rootExanded, setRootExpanded] = useState(true)
  const handleCollapseAll = () => setRootExpanded(!rootExanded)

  // search handlers
  const [searchText, setSearchText] = useState("")
  const handleSearchNodes = (e) => setSearchText(e?.target?.value || "") // can add debouce
  useEffect(() => {
    setParentNodes(
      SEARCH_NESTED_CHILDRENS(parentNodes, searchText)
    )
  }, [searchText])
  
  // parentNode handlers
  useEffect(() => {
    setRootChecked(REVIEW_IMMEDIATE_CHECKBOX({children: parentNodes}))
    onChangeSelectedNodes(parentNodes)
  }, [parentNodes])
  
  const handleParentUpdate = useCallback((updatedParentNode, idx) => {
    setParentNodes(prevParentNodes => {
      prevParentNodes.splice(idx, 1, {...updatedParentNode})
      return [...prevParentNodes]
    })
    // setTimeout(() => setRootChecked(REVIEW_IMMEDIATE_CHECKBOX({children: parentNodes})), 0)
  }, [])

  return (
    <div className="border-1 border-gray-300 w-2/6 bg-gray-50">
      <div className="toolbar border-b-1 border-gray-300 py-3 px-2 mb-4 flex items-center space-x-3">
        <span>{COLLAPSE_ICON_UI(rootExanded, handleCollapseAll)}</span>
        <Checkbox indeterminate={rootChecked == -1} enable={rootChecked} onChange={handleRootCheckbox} />
        <input type="text" className="border-1 border-gray-300 rounded-sm flex-1 py-1 px-3 text-sm" placeholder="" value={searchText} onChange={handleSearchNodes} />
      </div>
      {
        parentNodes.map((parentNode, idx) => (
          <ParentNode
            key={parentNode.id}
            parentIdx={idx}
            node={parentNode}
            childNodes={parentNode.children}
            rootExpanded={rootExanded}
            onChangeParentNode={handleParentUpdate}
          />
        ))
      }
    </div>
  )
}