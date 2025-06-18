const express = require('express')
const { addTransection, getAllTransection, editTransection, deleteTransection } = require('../controller/transectionController')


const router= express.Router()

//routes
router.post('/get-transection',getAllTransection)
router.post('/add-transection', addTransection)
router.post('/edit-transection', editTransection)
router.post('/delete-transection', deleteTransection)
module.exports=router