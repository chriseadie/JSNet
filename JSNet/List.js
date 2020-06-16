class List {
    constructor() {
        this.list = []
    }
    add(item) {
        this.list.push(item)
    }
    remove(index) {
        this.list.splice(index, 1)
    }
    replace(index, value) {
        this.list.splice(index, 1, value)
    }
    ToList() {
        return this.list;
    }
}
module.exports = List;