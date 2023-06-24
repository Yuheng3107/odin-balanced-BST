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

  function Delete(val, node = root) {
    if (node === null) return node;
    if (node.data !== val) {
      node.left = Delete(val, node.left);
      node.right = Delete(val, node.right);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) return node.left;
      else {
        // get largest value of left subtree, or smallest value of right subtree, because that will always satisfy BST
        // if we choose largest value of left subtree, we keep moving to the right once we are in the left subtree
        let left = node.left;
        while (left !== null) {
          left = left.right;
        }
        // then we replace the value of node w the left subtree and delete the largest val recursively
        let temp = left.data;
        Delete(temp, node);
        node.data = temp;
        return node;
      }
    }
  }

  function levelOrder(func = null) {
    let queue = [root];
    if (func === null) {
      let ans = [];
    }
    while (queue.length !== 0) {
      let layer = queue.length;
      while (layer--) {
        let node = queue.shift();
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
        if (func === null) {
          ans.push(node.data);
        } else func(node);
      }
    }
    if (func === null) return ans;
  }

  function inorder(func = null, ans = [], node = root) {
    if (node === null) return;
    if (node.left !== null) inorder(func, ans, node.left);
    if (func !== null) func(node);
    else ans.push(node.data);
    if (node.right !== null) inorder(func, ans, node.right);
  }
  function preorder(func = null, ans = [], node = root) {
    if (node === null) return;
    if (func !== null) func(node);
    else ans.push(node.data);
    if (node.left !== null) inorder(func, ans, node.left);
    if (node.right !== null) inorder(func, ans, node.right);
  }

  function postorder(func = null, ans = [], node = root) {
    if (node === null) return;
    if (node.left !== null) inorder(func, ans, node.left);
    if (node.right !== null) inorder(func, ans, node.right);
    if (func !== null) func(node);
    else ans.push(node.data);
  }

  function height(node, length = 0) {
    if (node === null) return length - 1;
    if (node.left === null && node.right === null) return length;
    return Math.max(
      height(node.left, length + 1),
      height(node.right, length + 1)
    );
  }
  function depth(target, depth = 0, node = root) {
    // search for the node starting from root node
    // returns -1 if not found
    if (node === null) return -1;
    if (node === target) return depth;
    else {
      return Math.max(
        depth(target, depth + 1, root.left),
        depth(target, depth + 1, root.right)
      );
    }
  }

  function isBalanced() {
    if (Math.abs(height(root.left) - height(root.right)) <= 1) return true;
    return false;
  }

  function rebalance() {
    arr = levelOrder();
    buildTree(arr);
  }
  return Object.assign(
    {},
    {
      buildTree,
      root,
      prettyPrint,
      insert,
      levelOrder,
      inorder,
      preorder,
      postorder,
      height,
      depth,
      isBalanced,
    }
  );
}

const logData = (node) => console.log(node.data);

let tree = Tree([9, 6, 4, 2, 1]);
tree.insert(3);
tree.insert(11);
tree.prettyPrint(tree.root);
console.log(tree.depth(tree.root));
