var collection = require('../config/collection')
var db = require('../config/connection')
const bcrypt = require('bcrypt')
var Promise = require('promise')
const { reject } = require('promise')


let collect = collection.USER_COLLECTION

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password = await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
            })
        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if (status) {
                        console.log('login success')
                        response.user = user
                        response.status = true
                        resolve(response)
                    }else{
                        console.log('login failed')
                        resolve({status:false})
                    }
                })
            }else{
                console.log("User not exist")
                resolve({status:false})
            }
        })
    }

}