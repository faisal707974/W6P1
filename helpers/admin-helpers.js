var db = require('../config/connection')
var collection = require('../config/collection')
const { reject } = require('promise')
var promise = require('promise')
const { response } = require('../app')
var objectId = require('mongodb').ObjectId




module.exports={

    doAdminLogin : (admindata)=>{
        return new promise((resolve,reject)=>{
            let loginStatus = false
            let response = {}
            let admin = {username: 'admin', password: 'admin'}
            if(admin.username===admindata.username && admin.password===admindata.password){
                response.admin = admin
                response.status = true
                resolve(response)
            }else{
                resolve({status:false})
            }
        })
    },

    addUser : (userdata,callback)=>{
        db.get().collection('user').insertOne(userdata).then((data)=>{
            console.log(data.insertedId)
            callback(true)
        })
    },

    getAllUsers:()=>{
        return new promise(async(resolve,reject)=>{
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },

    deleteUser:(id)=>{
        return new promise(async(resolve,reject)=>{
            console.log('id:'+id)
           let del =  await db.get().collection(collection.USER_COLLECTION).remove({_id:objectId(id)}).then((response)=>{
               resolve(response)
           })
           resolve(del)
        })
    }

}