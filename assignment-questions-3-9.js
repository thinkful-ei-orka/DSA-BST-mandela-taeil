class BinarySearchTree {
    constructor(key = null, value = null, parent= null) {
        this.key = key;
        this.value = key;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = key;
        }

        else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            }

            else {
                this.left.insert(key, value);
            }
        }

        else {
            if (this.right === null) {
                this.right = new BinarySearchTree(key, value, this);
            }

            else{
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if (this.key === key) {
            return this;
        }

        else if (key < this.key && this.left) {
            return this.left.find(key);
        }

        else if (key > this.key && this.right) {
            return this.right.find(key);
        }

        else {
            throw new Error('Error: Key not found');
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }

        return this.left._findMin();
    }

    _findMax() {
        if (!this.right) {
            return this;
        }

        return this.right._findMax();
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            }
            else if (this === this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }

        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
        }
    }

    remove(key) {
        if (this.key === key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }

            else if (this.left) {
                this._replaceWith(this.left);
            }

            else if (this.right) {
                this._replaceWith(this.right);
            }

            else {
                this._replaceWith(null);
            }
        }

        else if (key < this.key && this.left) {
            this.left.remove(key);
        }

        else if (key < this.key && this.right) {
            this.right.remove(key);
        }

        else {
            throw new Error('Error: Key not found');
        }
    }
}

const BST = new BinarySearchTree();

BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);

// console.log(BST.find(6));

const BSTeasyQ = new BinarySearchTree();

BSTeasyQ.insert('E');
BSTeasyQ.insert('A');
BSTeasyQ.insert('S');
BSTeasyQ.insert('Y');
BSTeasyQ.insert('Q');
BSTeasyQ.insert('U');
BSTeasyQ.insert('E');
BSTeasyQ.insert('S');
BSTeasyQ.insert('T');
BSTeasyQ.insert('I');
BSTeasyQ.insert('O');
BSTeasyQ.insert('N');

// console.log(BSTeasyQ);

// Q4 The following function adds all values of a subtree
function tree(t) {
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}
// console.log(tree(BST.find(6)));

// function bstHeight(bst) {
//     let height = 0;
//     console.log(bstHeightNavigator(bst, height));
// }

function bstHeight(bst) {
    let maxHeights = [];

    bstHeightNavigator(bst);

    function bstHeightNavigator(bst, height = 0) {
        height += 1;
        if (bst.left !== null) {
            bstHeightNavigator(bst.left, height);
        }
        if (bst.right !== null) {
            bstHeightNavigator(bst.right, height);
        }
        if (bst.left === null && bst.right === null) {
            maxHeights.push(height);
        }
    }

    return Math.max(...maxHeights);
}

// console.log(bstHeight(BST));
// console.log(bstHeight(BSTeasyQ));


function isBst(bst) {
    let isABst = true;

    isBstNavigator(bst);

    function isBstNavigator(bst) {
        if (bst.left === null) {
            // do nothing if null
        } else {
            if (bst.left.value < bst.value) {
                // looks good, keep searching
                isBstNavigator(bst.left);
            } else {
                // is not a bst
                isABst = false;
                console.log(bst.left.value, bst.value);
            }
        }
        if (bst.right === null) {
            // do nothing if null
        } else {
            if (bst.right.value > bst.value) {
                // looks good, keep searching
                isBstNavigator(bst.right);
            } else {
                // is not a bst
                isABst = false;
            }
        }
    }

    return isABst;
}

// console.log(isBst(BST));
// console.log(isBst(BSTeasyQ));

function thirdLargestNode(bst) {
    let maxRight = bst._findMax(); // start with the max right
    let secondMax;
    let thirdMax;
    let secondNode;

    if (maxRight.left !== null) { // (L)
        secondNode = maxRight.left;
        if (secondNode.right !== null) { // (L, R+)
            secondMax = secondNode.right._findMax();
            if (secondMax.left !== null) { // (L, R+, L, R+)
                thirdMax = secondMax.left._findMax();
            } else { // (L, R+, U)
                thirdMax = secondMax.parent;
            }
        } else if (secondNode.left !== null) { // (L, L, R+)
            thirdMax = secondNode.left._findMax();
        } else { // (L, U, U)
            thirdMax = secondNode.parent.parent;
        }
    } else { // if we can't go left (U)
        secondNode = maxRight.parent;
        if (secondNode.left !== null) { // (U, L, R+)
            thirdMax = secondNode.left._findMax();
        } else { // (U, U)
            thirdMax = secondNode.parent;
        }
    }

    return thirdMax;
}

// console.log(thirdLargestNode(BST));
// console.log(thirdLargestNode(BSTeasyQ));

function balancedBst(bst) {
    let leafHeights = [];

    bstHeightNavigator(bst);

    function bstHeightNavigator(bst, height = 0) {
        height += 1;
        if (bst.left !== null) {
            bstHeightNavigator(bst.left, height);
        }
        if (bst.right !== null) {
            bstHeightNavigator(bst.right, height);
        }
        if (bst.left === null && bst.right === null) {
            leafHeights.push(height);
        }
    }

    let min = Math.min(...leafHeights);
    let max = Math.max(...leafHeights);

    // if there's one leaf, return true. if max - min is less than 2, return true
    if (leafHeights.length === 1 || max - min < 2) {
        return true;
    } else {
        return false;
    }
}

console.log(balancedBst(BST));
console.log(balancedBst(BSTeasyQ));
