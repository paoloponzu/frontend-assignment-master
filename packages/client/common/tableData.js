//function for the TableCustom component 

export const getColumn = (data) => {
    var newData = []
    if (data) {
        data.map(obj => newData.push(obj.node))
    }
    return newData;

}