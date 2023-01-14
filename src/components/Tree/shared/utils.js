export const TOGGLE_NESTED_CHILDRENS = (nodes, checked = true) => {
  if (!nodes && nodes.length === 0) return

  return nodes.map(node => {
    node.enabled = checked
    if (node.children?.length > 0) {
      node.children = TOGGLE_NESTED_CHILDRENS(node.children, checked)
    }
    return {...node}
  })
}

const SEARCH_X_IN_Y = (X, Y) => Y.toLowerCase().includes(X.toLowerCase())

export const SEARCH_NESTED_CHILDRENS = (nodes = [], searchText = "") => {
  if (nodes.length === 0 || searchText === "") return []

  return nodes.reduce((filteredNodes, node) => {
    if (SEARCH_X_IN_Y(searchText, node.label)) {
      filteredNodes.push(node)
    } else if (node.children) {
      // TODO: make this recursive
      const children = node.children.filter(cNode => SEARCH_X_IN_Y(searchText, cNode.label)) 
      if (children.length > 0) {
        filteredNodes.push({...node, children})
      }
    }
    return filteredNodes
  }, [])
}

export const REVIEW_IMMEDIATE_CHECKBOX = (nodes = {}) => {
  const allChecked = (nodes.children || []).every(childNode => childNode.enabled == true)
  const allUnChecked = (nodes.children || []).every(childNode => childNode.enabled == false)
  if (allChecked) return true
  else if (allUnChecked) return false
  else return -1
}
