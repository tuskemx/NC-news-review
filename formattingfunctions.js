const formatDate = (input) => {
    const timeMap = input.map((obj) => {
        const newDate = new Date(obj.created_at);
        const newObj = { ...obj, created_at: newDate.toISOString() };
        return newObj;
    })
    return timeMap;
}


const createRef = (data) => {
    const newObj = data.reduce((obj, item) => {
        obj[item.forename] = item.owner_id;
        return obj;
    }, {})

    return newObj

}

// const formatComments = (a, b) => {
//     (shops, valuePair) => {
//         const newShops = shops.map(function (shop) {
//             const newShop = { ...shop }
//             newShop.owner_id = valuePair[shop.owner]
//             delete newShop.owner
//             return newShop;
//         });

//         return newShops;

//     }
// }
//object keys
//ref object
//format comment obj


module.exports = {
    formatDate
}