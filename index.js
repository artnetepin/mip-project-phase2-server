var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 3000));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

// Simple hello world route
app.get('/', function(req, res) {
  res.send("Hello world");
});

var users = [{
  id: 1,
  username: "username",
  password: "password",
  fullName: "Donald Trump",
  profileImageSmall: "http://occupydemocrats.com/wp-content/uploads/trumphayes.png",
  postCount: 13,
  followers: 52,
  following: 2,
  activity: [{
      userId: 2,
      username: "POTUS",
      fullName: "President of United States",
      profileImageSmall: "http://occupydemocrats.com/wp-content/uploads/trumphayes.png",
      type: "commented",
      comment: "You're never going to make it don #losing",
      userRefs: [],
      tags: ["losing"]
    },
    {
      userId: 3,
      username: "HillaryC",
      fullName: "Hillary Clinton",
      profileImageSmall: "https://s-media-cache-ak0.pinimg.com/originals/03/e1/87/03e187b80b583013a49beee245baaf1b.jpg",
      type: "liked",
      comment: "",
      userRefs: [],
      tags: []
    }
  ]
}];

var posts = [{
  id: 0,
  user: {
    id: 1,
    username: "dtrump",
    profileImageSmall: "http://occupydemocrats.com/wp-content/uploads/trumphayes.png"
  },
  image: "http://en-volve.com/wp-content/uploads/2016/11/enVolve-TRUMP-wins-2016-Presidential-Election.jpg",
  imageThumbnail: "http://en-volve.com/wp-content/uploads/2016/11/enVolve-TRUMP-wins-2016-Presidential-Election.jpg",
  likes: 892,
  caption: "Always winning #elections",
  tags: ['elections'],
  comments: [{
      id: 0,
      user: {
        id: 2,
        username: "POTUS"
      },
      comment: "You're never going to make it don #losing",
      userRefs: [],
      tags: ["losing"]
    },
    {
      id: 1,
      user: {
        id: 3,
        username: "HillaryC"
      },
      comment: "Damn right @POTUS",
      userRefs: ["POTUS"],
      tags: []
    },
  ]

}]

app.post('/login', function(req, res) {
  console.log("test");
  console.log(req.body);
  var u = users.find(function(element) {
    return (element.username === req.body.username) && (element.password === req.body.password);
  });

  if (u !== undefined) {
    return res.json(u);
  } else {
    return res.sendStatus(401);
  }
});

// app.post('/addUser', function(req, res) {
//   var length = users.push({
//     id: "vbiwe",
//     username: req.body.username,
//     password: req.body.password,
//     fullName: "lorem",
//     profileImageSmall: "http://en-volve.com/wp-content/uploads/2016/11/enVolve-TRUMP-wins-2016-Presidential-Election.jpg"
//   });
//   if (users[length - 1].username == req.body.username) {
//     return res.json(res.json(users[length - 1]));
//   } else {
//     return res.sendStatus(401);
//   }
// });

app.get('/posts/relevant', function(req, res) {
  res.json(posts);
});

app.get('/posts/:id', function(req, res) {
  res.json(posts[req.params.id]);
});

// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
