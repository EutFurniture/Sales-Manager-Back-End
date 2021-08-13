const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'furniture',
});

app.post('/create', (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const address = req.body.address;
    const orders = req.body.orders;
    const loyalty = req.body.loyalty;  

    db.query('INSERT INTO customers (id, name, age, address, orders, loyalty) VALUES (?,?,?,?,?,?)', 
    [id, name, age, address, orders, loyalty], (err, result) => {
        if (err) {
            console.log(err)
        } else{
            res.send("Values Inserted")
        }
      }
    );
});

// add customers
app.get('/customers',(req,res) => {
    db.query('SELECT * FROM customers', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

//View deliverySchedule
app.get('/DeliverySchedule',(req,res) => {
    db.query('SELECT order_id, order_name, DATE_FORMAT(date,"%d-%m-%y") AS date, DATE_FORMAT(due_date,"%d-%m-%y") AS due_date FROM orders', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

//view payment
app.get('/pposts',(req,res)=>{
    db.query("SELECT * FROM payment;",
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});

//view orders
app.get('/OrdersUI',(req,res)=>{
    db.query("SELECT * FROM orders;",
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});

//view notification
app.get('/NotificationUI',(req,res)=>{
    db.query("SELECT * FROM notification;",
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});


app.put('/update', (req,res) => {
    const id=req.body.id;
    const loyalty = req.body.loyalty;
    db.query("UPDATE customers SET loyalty = ? WHERE id = ?", 
    [loyalty, id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
});

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    db.query("DELETE FROM customers WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.listen(3001,()=>{
    console.log("Yey, your server is running on port 3001");
});

//promotions
app.post('/create_pro', (req,res) => {
    const name = req.body.name;
    const price = req.body.price;
    const brand = req.body.brand;
    const description = req.body.description;

    db.query('INSERT INTO promotions (name, price, brand, description) VALUES (?,?,?,?)', 
    [name, price, brand, description], (err, result) => {
        if (err) {
            console.log(err)
        } else{
            res.send("Values Inserted")
        }
      }
    );
});

//log in

app.post('/login',(req,res)=>{
  
    const email = req.body.email;
    const password = req.body.password;
   
    db.query(
        "SELECT *FROM employee WHERE email=?;",
       email,
        (err,result)=>{
            console.log(result)
            
            
            if(err)
            { 
                res.send({err:err})
            } 
            if(result.length > 0){
                
             if(password==result[0].password) {
                      
                   res.send(result);
                  }
                  else{
                   
                   res.send({message:"Invalid Username or Password"});
                  
                  }
              }
           })
          
        });
 