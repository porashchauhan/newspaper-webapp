const express=require("express");
const request=require("request");
const https=require("https");
const app=express();

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const firstName=req.body.firstname;
    const lastName=req.body.lastname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME:lastName
                }
            }
        ]

    }

    const jsondata=JSON.stringify(data);
    const url= "https://us6.api.mailchimp.com/3.0/lists/20a067849f"
   
    const option={
        method:"POST",
        auth: "porash:b13bce24a501c65697dccd3c5e4f9ff0-us6" 
    }


   const request= https.request(url,option,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else  res.sendFile(__dirname+"/failure.html");

       response.on("data",function(data){

           console.log(JSON.parse(data));

       }) 

    })

    request.write(jsondata);
    request.end();

})


app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000,function(){
    console.log("server running.");
})


// api key b13bce24a501c65697dccd3c5e4f9ff0-us6
// audience id 20a067849f