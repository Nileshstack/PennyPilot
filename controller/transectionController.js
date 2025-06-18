const transactionModel = require("../models/transectionModel")
const moment = require('moment')

const getAllTransection = async (req, res) => {
  try {
    const { frequency, userid, selectedDate, type } = req.body;

    const dateFilter =
      frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "days").toDate(),
            },
          }
        : {
            date: {
              $gte: new Date(selectedDate[0]),
              $lte: new Date(selectedDate[1]),
            },
          };

    // Construct the query object
    const query = {
      userid,
      ...dateFilter,
    };

    // Add type filter if not 'all'
    if (type !== 'all') {
      query.type = type;
    }

    const transactions = await transactionModel.find(query);

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Error in fetching transactions",
      error,
    });
  }
};



const addTransection=async(req,res)=>{
    try {
        const newTransection =new transactionModel(req.body)
        await newTransection.save()
        res.status(201).json({
        success:true,
        message:'New Transaction Created Succesfully',
        newTransection
      })
    } catch (error) {
        
        res.status(400).json({
            success:false,
            message:'Error in addTransection controller',
            error
        })
    }
 }

 const editTransection= async(req,res)=>{
  try {
    await transactionModel.findOneAndUpdate({_id:req.body.trasactionId}, req.body.payload)
     res.status(201).json({
        success:true,
        message:' Transaction Updated Succesfully',
     })
  } catch (error) {
        res.status(400).json({
            success:false,
            message:'Error in editTransection controller',
            error
        })
  }
 }

 const  deleteTransection=async(req,res)=>{
  try {
    await transactionModel.findOneAndDelete({_id:req.body.trasactionId})
     res.status(201).json({
        success:true,
        message:' Transaction deleted Succesfully',
     })
  } catch (error) {
        res.status(400).json({
            success:false,
            message:'Error in deleteTransection controller',
            error
        })
  }
 }

module.exports={getAllTransection, addTransection,editTransection, deleteTransection}