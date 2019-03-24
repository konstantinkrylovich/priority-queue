class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node;
			this.left.parent = this;
		} else if(!this.right){
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if(this.left.data === node.data) {
			this.left.parent = null;
			this.left = null;
		} else if(this.right.data === node.data) {
			this.left.parent = null;
			this.right = null;	
		} else {
			throw new Error('Error! No such child');
		}
	}

	remove() {
		if(this.parent!=null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		 if (this.parent != null) {

			 let curParent = this.parent;
			 if(curParent.parent) {
				 if(curParent.parent.left == curParent) {
					curParent.parent.left = this;
				 } else {
					 curParent.parent.right = this;
				 }
			 }
		 	if (this.parent.left == this) {
				this.parent = this.parent.parent;
		 		if (this.left) {
		 			this.left.parent = curParent;
		 		}
				curParent.left = this.left;
				if (curParent.left){
					curParent.left.parent = curParent;
				} 
		 		this.left = curParent;
		 		let right = curParent.right;
		 		if (this.right) {
		 			this.right.parent = curParent;
				 }
				 if(right) {
					right.parent = this;
				 }
		 		curParent.right = this.right;
		 		this.right = right;

		 	} else {
				 this.parent = this.parent.parent;
		 		let left = curParent.left;
		 		if (this.left) {
		 			this.left.parent = curParent;

				 }
				 if (left) {
				 	left.parent = this;
				 }
		 		curParent.left = this.left;
		 		this.left = left;
		 		if (this.right) {
		 			this.right.parent = curParent;

		 		}
		 		curParent.right = this.right;
		 		this.right = curParent;

		 	}
		 	curParent.parent = this;
		 }
		
	}
}

module.exports = Node;
