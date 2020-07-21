class BinarySearchTree {
    constructor(key= null, value= null, parent= null) {
        this.key = key;
        this.value = key;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = value;
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
console.log(tree(BST.find(6)));