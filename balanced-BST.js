function Node(data = null, left = null, right = null) {
  return Object.assign({}, { data, left, right });
}

function Tree(arr) {
  let root = buildTree(arr);

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  function buildTree(arr) {
    // sort and remove duplicates
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);
    return createTree(arr, 0, arr.length - 1);
  }

  function createTree(arr, start, end) {
    // works
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = Node(arr[mid]);
    root.left = createTree(arr, start, mid - 1);
    root.right = createTree(arr, mid + 1, end);
    return root;
  }

  function insert(val, node = root) {
    if (node === null) return;
    if (val < node.data) {
      if (node.left === null) node.left = Node(val);
      else insert(val, node.left);
    } else if (val > node.data) {
      if (node.right === null) node.right = Node(val);
      else insert(val, node.right);
    }
  }
  return Object.assign({}, { buildTree, root, prettyPrint, insert });
}

let tree = Tree([9, 6, 4, 2, 1]);
tree.insert(3);
tree.insert(11);
tree.prettyPrint(tree.root);
console.log(tree.root);
