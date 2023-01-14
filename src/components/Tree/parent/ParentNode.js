import {useState, useEffect, memo, useCallback} from "react"
import Collapse from "../../lib-ui/Collapse/Collapse"
import {TOGGLE_NESTED_CHILDRENS, REVIEW_IMMEDIATE_CHECKBOX} from "../shared/utils"
import Node from "../Node"

const ParentHeader = function ParentRenderComponent({node, handleParentCheckbox}) {
  return (
    <Node visible={node.enabled} node={node} changeNodeCheckbox={handleParentCheckbox} />
  )
}

function ParentNode ({ parentIdx, node, rootExpanded, onChangeParentNode }) {
  // collapse handler
  const [parentExpanded, setParentExpanded] = useState(rootExpanded)
  useEffect(() => setParentExpanded(rootExpanded), [rootExpanded])

  // parent checkbox handler
  const handleParentCheckbox = (_, __, enabled) => {
    onChangeParentNode({
      ...node,
      children: TOGGLE_NESTED_CHILDRENS(node.children, enabled),
      enabled
    }, parentIdx)
  }

  // children checkbox handler
  const handleChildrenCheckbox = useCallback((idx, childNode, enabled) => {
    node.children.splice(idx, 1, {...childNode, enabled})
    onChangeParentNode({
      ...node,
      enabled: REVIEW_IMMEDIATE_CHECKBOX(node) // updates parent checkbox
    }, parentIdx)
  }, []) 
  
  // scroll handler
  const handleScrollUp = (idx) => {
    if (idx === 0) return
    const children = node.children;
    [children[idx], children[idx - 1]] = [children[idx - 1], children[idx]]
    onChangeParentNode({
      ...node,
      children
    }, parentIdx)
  }
  const handleScrollDown = (idx) => {
    if (idx === node.length - 1) return
  }

  const hasChildNodes = () => node.children.length > 0

  return (
    <div key={node.id}>
      <Collapse header={<ParentHeader node={node} handleParentCheckbox={handleParentCheckbox} />} visible={parentExpanded}>
        <div className="ml-5">
          {
            hasChildNodes() ? 
              node.children.map((childNode, idx) => (
                <Node
                  key={childNode.id}
                  visible={childNode.enabled}
                  node={childNode}
                  nodeIdx={idx}
                  scrollUp={() => handleScrollUp(idx)}
                  scrollDown={() => handleScrollDown(idx)}
                  changeNodeCheckbox={handleChildrenCheckbox}
                />
              )) :
              ""
          }
        </div>
      </Collapse>
    </div>
  )
}

export default memo(ParentNode)