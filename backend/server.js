const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

dburl = "mongodb+srv://demo:demo@cluster0.gkysd.mongodb.net/data?retryWrites=true&w=majority"  //database link

mongoose.connect(dburl).then(()=>{   //connect to database
    console.log("Database Connected")},error=>{
        console.log("Error Occured"+error)}
)

app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const dataschema = new mongoose.Schema({   //create a schema
    name : String,
    surname : String,
    age : Number
});

const datamodel = mongoose.model('data',dataschema);   // create a model for a schema and name the model

const port = 3000

app.get("/", (req, res) => {
    res.send("server running at port: " + port);
  });

app.post('/db',async (req, res)=>{   //
    const dataset = new datamodel({  //create a model object
        name : req.body.name,
        surname : req.body.surname,
        age : req.body.age
    });

    datamodel.find({name:req.body.name}).then((data)=>{   //check for unique id
        if(data.length==0){  //if data doesnot exist
          console.log("data added");
          console.log("Data Recieved in Server")

          dataset.save((error)=>{   //then add
              if(error){
                  console.log("Error:",error);
              }else{
                  console.log("Data Saved");
              }
          })
        }
        else{
          console.groupCollapsed("Data Duplicate");
        }
    })
    .catch((err) => {
      console.log(err);
    });
    
})

app.get("/getdata",(req, res)=>{
    
    datamodel.find().then((data)=>{   // find all data of type datamodel
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.get('/delete',(req,res)=>{

    datamodel.deleteOne({name:"suman"}).then((data)=>{ // delete one object of type datamodel, ps:replace field accordingly
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get('/update',(req,res)=>{
  datamodel.findOneAndUpdate({name:"suman"},{surname:"grg"}).then((data)=>{   // find and update one object of type datamodel, ps:change field accordingly
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    });
})


app.listen(port,function (){    // run express server i.e.:app
    console.log("App running on port:"+port);
})