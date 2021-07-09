var express = require('express');
var router = express.Router();
var pool=require("./pool")

/* GET home page. */

router.get('/frontview', function(req, res, next) {
    res.render('dashboard');
  });

router.get('/bankentry', function(req, res, next) {
  res.render('bankentry', { status: ' ' });
});

router.post("/pools",function(req,res){
    
    pool.query("insert into entry(name,money,email,mobile)values(?,?,?,?)",[req.body.pname,req.body.price,req.body.ema,req.body.mobile],function(error,result){
        if(error)
        {
            console.log(error)
            res.render("bankentry",{status:"server error"})
    
        }
        else{
            console.log(result)
            res.render("bankentry",{status:"record submited"})
        }
    })
    
    
    })
router.get("/display",function(req,res){
    pool.query("select * from entry  ",function(error,result){
        if(error)
        {
            console.log(error)
            res.render("display",{data:" "})
        }
        else
        {
            res.render("display",{data:result})
        }
    })
})    

router.get("/trans",function(req,res){
    pool.query("select * from entry where id=?  ",[req.query.cid],function(error,result){
        if(error)
        {
            console.log(error)
            res.render("transaction",{data:" "})
        }
        else
        {
            res.render("transaction",{data:result[0],status:''})
        }
    })
})  

router.get("/fetching",function(req,res){
    pool.query("select * from entry where id <> ?  ",[req.query.cid],function(error,result){
        
        if(error)
        {
            console.log(error)
            res.status(500).json([])
        }
        else
        {
           
            res.status(200).json(result)
        }
    })
})

router.get('/fetchmoney',function(req,res){
    pool.query("select * from entry where id=? ",[req.query.sid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }

    })
})

router.get('/history',function(req,res){

    
    pool.query("select * from history ",function(error,result){
        if(error)
        {
            console.log("ERROR-: ",error)
            res.render("history",{data:[]})
        }
        else
        {
            res.render("history",{data:result})
        }
    })

})  

router.get("/deposit",function(req,res){
    // pool.query("select money from entry where id=?",[req.query.cid],function(error,result){
    //     if(error)
    //     {
    //         console.log(error)
    //         res.status(500).json([])
    //     }  
    //     else
    //     {  
        //var mon=result;
        var nm1=parseInt(req.query.nm1)
        var send=parseInt(req.query.send)
        var sen=nm1-parseInt(req.query.send)
        var crs=parseInt(req.query.crs)+send
        // var total=mon-send;

        if(nm1<send)
        {
            res.render("transaction",{status:"insufficient balance",data:""})
        }
        else
        {
            var qsql=("update entry set money=? where id=?;update entry set money=? where id=?;insert into history(sendername,toname,money)values(?,?,?)")
            pool.query(qsql,[sen,req.query.cid,crs,req.query.qid,req.query.pname,req.query.qnam,req.query.send],function(error,result){
                if(error)
                {
                    console.log(error)
                    res.render("transaction",{status:"transaction failed",data:""})
                }
                else
                {
                    res.render("transaction",{status:"succesfulluy initiated transfer",data:""})
                }
            })
        }

       
    //     }
        

      
    // })
})

module.exports = router;
