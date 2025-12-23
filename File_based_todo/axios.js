
const axios = {
    get:function(url){
    return new Promise(function(resolve){
        fetch(url,{
            method:"Get"
        })
    })
    }
}
const x= axios.get()


// map
let input = [1,2,3,4]
function transformation(i){
    return i*2
}
let ans = input.map(transformation)
console.log(ans)

// other ways to write
let arr = [2,3,4,5,6]
const asn = arr.map(function(i){
    return i * 2
})
console.log(asn)