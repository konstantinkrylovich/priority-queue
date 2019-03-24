const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if(maxSize){
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.size()<this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw new Error("Error!Limit of the size - "+this.maxSize);
		}
		
	}

	shift() {
		if(!this.isEmpty()){
			return this.heap.pop();
		} else {
			throw new Error("Error!Queue is empty!");
		}
		

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.size() == 0;
	}
}

module.exports = PriorityQueue;
