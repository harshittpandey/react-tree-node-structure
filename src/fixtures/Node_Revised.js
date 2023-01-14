/**
 * In future, we can use this format.
 * This should be optimal if we have multiple level of nodes. and
 * this should be optimal if our app contains addition, deletion, updation of node.
 * 
 * View Tree - Should be similar to nested structure, because traversal will happen from Root.
 * Select/ Unselect Node - This structure should be optimal.
 * Search - Should be optimal but it depends on the tree representation and traversal. 
 * Add node - This structure should be optimal.
 * Remove node - This structure should be optimal.
 * Reorder node - This structure should be optimal.
 */
export default {
  "participant": {
    data: {
      id: "participant",
      label: "Participant",
      enabled: true // to keep a track of selected nodes.
    },
    meta: {
      parents: null,
      children: ["name", "langugage", "country"]
    }
  },
  "name": {
    data: {
      id: "name",
      label: "Name",
      enabled: true
    },
    meta: {
      parents: "participant",
      children: []
    }
  },
  "langugage": {
    data: {
      id: "langugage",
      label: "Langugage",
      enabled: true
    },
    meta: {
      parents: "participant",
      children: []
    }
  },
  "country": {
    data: {
      id: "country",
      label: "Country",
      enabled: true
    },
    meta: {
      parents: "participant",
      children: []
    }
  },
  "gameOfChoice": {
    data: {
      id: "gameOfChoice",
      label: "Game of choice",
      enabled: true
    },
    meta: {
      parents: null,
      children: ["gameName", "bought"]
    }
  },
  "gameName": {
    data: {
      id: "gameName",
      label: "Game Name",
      enabled: true
    },
    meta: {
      parents: "gameOfChoice",
      children: []
    }
  },
  "bought": {
    data: {
      id: "bought",
      label: "Bought",
      enabled: true
    },
    meta: {
      parents: "gameOfChoice",
      children: []
    }
  }
}