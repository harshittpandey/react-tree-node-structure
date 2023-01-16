export const TOGGLE_NESTED_CHILDRENS = (nodes, checked = true) => {
  if (!nodes && nodes.length === 0) return

  return nodes.map(node => {
    node.enabled = node.visible ? checked : false
    if (node.children?.length > 0) {
      node.children = TOGGLE_NESTED_CHILDRENS(node.children, checked)
    }
    return {...node}
  })
}

const SEARCH_X_IN_Y = (X, Y) => Y.toLowerCase().includes(X.toLowerCase())

export const SEARCH_NESTED_CHILDRENS = (nodes = [], searchText = "") => {
  return nodes.map((node) => {
    if ((node?.children || []).length > 0) {
      node.children = SEARCH_NESTED_CHILDRENS(node.children, searchText);
    }
    if (
      (node?.children || []).some((cNode) => cNode.visible) ||
      SEARCH_X_IN_Y(searchText, node.label)
    ) {
      node.visible = true;
    } else node.visible = false;
    return node;
  });
};

export const REVIEW_IMMEDIATE_CHECKBOX = (nodes = {}) => {
  if (!Array.isArray(nodes.children) || nodes.children.length == 0) return false

  const allChecked = nodes.children.every(childNode => childNode.enabled == true)
  const allUnChecked = nodes.children.every(childNode => childNode.enabled == false)
  if (allChecked) return true
  else if (allUnChecked) return false
  else return -1
}
