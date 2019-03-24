const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);

	}

	pop() {
		
		if (this.root) {

				let curRoot = this.detachRoot();
				this.restoreRootFromLastInsertedNode(curRoot);
				this.shiftNodeDown(this.root);
				return curRoot.data;
			 
			
		}
	}

	detachRoot() {
		let currRoot = this.root;
		if (this.parentNodes.includes(currRoot)) {
			this.parentNodes.splice(this.parentNodes.indexOf(currRoot), 1);
		}
		

		this.root = null;
		return currRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		//debugger;
		 if (this.parentNodes.length == 0) {
		 	this.root = detached;
		 } else {
		 	this.root = this.parentNodes.pop();
		 }
		if (this.root.parent) {

			if (detached.left == this.root) {
				this.root.left = null;
			} else if (detached.right == this.root) {
				this.root.left = detached.left;
				this.parentNodes.unshift(this.root)
			} else {
				this.root.left = detached.left;
				this.root.right = detached.right;
				if (this.root.parent.right == this.root) {
					this.parentNodes.unshift(this.root.parent)
				} else if (this.root.parent.left == this.root) {
					this.parentNodes.unshift(this.root.parent)
				}
			}
			//this.root.parent.removeChild(this.root);

			if (this.root.left) {
				this.root.left.parent = this.root;
			}
			if (this.root.right) {
				this.root.right.parent = this.root;
			}
			if (this.root.parent.left == this.root) {
				this.root.parent.left = null;
			} else {
				this.root.parent.right = null;
			}
			this.root.parent = null;
		
		} else {
			this.root = null;
		}
	}

	size() {
		let length = 0;

		function inOrder(node) {
			if (node == null) return;
			length++;
			inOrder(node.left);
			inOrder(node.right);
		}
		if (this.root) {
			inOrder(this.root);
		} else {
			return 0;
		}

		return length;
	}

	isEmpty() {
		if (this.root) {
			return false;
		}
		return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].left && this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.parent.priority < node.priority) {
				let indexNode = this.parentNodes.indexOf(node);
				let indexParent = this.parentNodes.indexOf(node.parent);
				if (indexNode != -1 && indexParent != -1) {
					let tmpNode = this.parentNodes[indexNode];
					this.parentNodes[indexNode] = this.parentNodes[indexParent];
					this.parentNodes[indexParent] = tmpNode;
				} else if (indexNode != -1) {
					this.parentNodes[indexNode] = node.parent;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			} else {
				return;
			}
		} else {
			this.root = node;
			return;
		}
	}

	shiftNodeDown(node) {
		if(node){
			if (node.left && node.right) {
				if (node.left.priority < node.right.priority) {

					if (node.right.priority > node.priority) {
						let indexNode = this.parentNodes.indexOf(node.right);
						if (indexNode != -1) {
							this.parentNodes[indexNode] = node;
						}
						if (this.root == node) {
							this.root = node.right;
						}
						node.right.swapWithParent();
						this.shiftNodeDown(node);
					} else {
						return;
					}

				} else {
					if (node.left.priority > node.priority) {
						let indexNode = this.parentNodes.indexOf(node.left);
						if (indexNode != -1) {
							this.parentNodes[indexNode] = node;
						}
						if (this.root == node) {
							this.root = node.left;
						}
						node.left.swapWithParent();
						this.shiftNodeDown(node);
					} else {
						return;
					}
				}
			} else if (node.left) {
				if (node.left.priority > node.priority) {
					let indexNode = this.parentNodes.indexOf(node.left);
					let indexParent = this.parentNodes.indexOf(node);
					if (indexNode != -1 && indexParent != -1) {
						let tmpNode = this.parentNodes[indexNode];
						this.parentNodes[indexNode] = this.parentNodes[indexParent];
						this.parentNodes[indexParent] = tmpNode;
					} else if (indexNode != -1) {
						this.parentNodes[indexNode] = node;
					}
					if (this.root == node) {
						this.root = node.left;
					}
					node.left.swapWithParent();
					this.shiftNodeDown(node);
				} else {
					return;
				}
			} else if (node.right) {
				if (node.right.priority > node.priority) {
					node.right.swapWithParent();
					this.shiftNodeDown(node.right);
				} else {
					return;
				}
			} else {
				return;
			}
		}
			
	}
}

module.exports = MaxHeap;
