var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

/*Set EJS template Engine*/
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection = require('express-myconnection'),
  mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'invoice',
  debug: false
});

app.use(
  connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'invoice',
    debug: false
  }, 'request')
);

app.get('/', function(req, res) {
  res.send('Welcome');
});

//RESTful route
var router = express.Router();

/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

var curut = router.route('/user');

// GET
curut.get(function(req, res, next) {
  req.getConnection(function(err, conn) {
    console.log(err);
    if (err) return next("Cannot Connect");
    var query = conn.query('SELECT * FROM t_user', function(err, rows) {
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      }
      res.render('user', {
        title: "Invoice",
        data: rows
      });
    });
  });
});

//post data to DB | POST
curut.post(function(req, res, next) {

  //validation
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();
  req.assert('description', 'Description is required').notEmpty();
  req.assert('amount', 'Amount is required').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
    return;
  }

  //get data
  var data1 = {
    name: req.body.name,
    email: req.body.email,
    duedate: req.body.date
  };


var i=0;
  var data2 = {
    description: req.body.description[i],
    amount: req.body.amount[i],
    user_ID: 0
  };


  //inserting into mysql
  pool.getConnection(function(err, conn) {
    var existingUserId;
    var T_LINEITEMS_QUERY = "INSERT INTO T_LINEITEMS (user_ID, description, amount) VALUES (?, ?, ?)";
    if (err) return next("Cannot Connect");

    var selquery2 = conn.query("SELECT USER_ID FROM t_user WHERE email = ? ", [data1.email], function(err, rows, fields) {
      if (err) throw err;
      if (rows.length == 0) {
        var insertUserQuery = conn.query("INSERT INTO t_user set ? ", data1, function(err, result) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          } else {
            console.log("User inserted.");
          }
          var insertLineItem1 = conn.query(T_LINEITEMS_QUERY, [result.insertId, data2.description, data2.amount], function(err, rows) {
            if (err) {
              console.log(err);
              return next("Mysql error, check your query");
            }
          });
        }, function(err) {
          conn.end();
        }
      );
      } else {
        var insertLineItem2 = conn.query(T_LINEITEMS_QUERY, [rows[0].USER_ID, data2.description, data2.amount], function(err, rows) {
          if (err) {
            console.log(err);
            return next("Mysql error, check your query");
          }
        });
      }
});
    res.sendStatus(200);
  });
});
//});

//now for Single route (GET,DELETE,PUT)
var curut2 = router.route('/user/:user_id');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes.
------------------------------------------------------*/
curut2.all(function(req, res, next) {
  console.log(req.params);
  next();
});

//get data to update
curut2.get(function(req, res, next) {
  var user_id = req.params.user_id;
  req.getConnection(function(err, conn) {
    if (err) return next("Cannot Connect");
    var query = conn.query("SELECT * FROM t_user WHERE user_id = ? ", [user_id], function(err, rows) {
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      }
      //if user not found
      if (rows.length < 1)
        return res.send("User Not found");
      res.render('edit', {
        title: "Edit user",
        data: rows
      });
    });
  });
});

//update data
curut2.put(function(req, res, next) {
  var user_id = req.params.user_id;

  //validation
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();

  var errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
    return;
  }

  //get data
  var data = {
    name: req.body.name,
    email: req.body.email
  };

  //inserting into mysql
  req.getConnection(function(err, conn) {
    if (err) return next("Cannot Connect");
    var query = conn.query("UPDATE t_user set ? WHERE user_id = ? ", [data, user_id], function(err, rows) {
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      }
      res.sendStatus(200);
    });
  });
});

//delete data
curut2.delete(function(req, res, next) {
  var user_id = req.params.user_id;
  req.getConnection(function(err, conn) {
    if (err) return next("Cannot Connect");
    var query = conn.query("DELETE FROM t_user  WHERE user_id = ? ", [user_id], function(err, rows) {
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      }
      res.sendStatus(200);
    });
  });
});

//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(8080, function() {
  console.log("Listening to port %s", server.address().port);
});
