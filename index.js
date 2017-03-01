var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
  res.send("Hello world");
});

var users = [{
  id: 1,
  username: "username",
  password: "password",
  fullName: "Lorem Ipsum",
  profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg",
  postCount: 13,
  followers: 52,
  following: 2,
  activity: [{
      userId: 2,
      username: "POTUS",
      fullName: "President of United States",
      profileImageSmall: "http://i.telegraph.co.uk/multimedia/archive/03541/Barack-Obama-gets-_3541878k.jpg",
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
}, {
  id: 2,
  username: "cat",
  password: "catword",
  fullName: "Cat Ipsum",
  profileImageSmall: "http://cdn.abclocal.go.com/content/creativeContent/images/cms/060314-cc-hamilton-hipster-cat-img.jpg",
  postCount: 13,
  followers: 3000,
  following: 41,
  activity: []
}];

var posts = [{
  id: 0,
  user: {
    id: 1,
    username: "dtrump",
    profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
  },
  image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
  imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
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

}, {
  id: 1,
  user: {
    id: 1,
    username: "dtrump",
    profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
  },
  image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
  imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
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

}, {
  id: 2,
  user: {
    id: 2,
    username: "cat",
    profileImageSmall: "http://cdn.abclocal.go.com/content/creativeContent/images/cms/060314-cc-hamilton-hipster-cat-img.jpg"
  },
  image: "https://pbs.twimg.com/profile_images/669537611132878848/fSUL6hVT_400x400.jpg",
  imageThumbnail: "https://pbs.twimg.com/profile_images/669537611132878848/fSUL6hVT_400x400.jpg",
  likes: 41015162342,
  caption: "Coala, man!",
  tags: ['#wut'],
  comments: []

}]

app.post('/login', function(req, res) {
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

app.post('/addUser', function(req, res) {
  var length = users.push({
    id: 4,
    username: req.body.username,
    password: req.body.password,
    fullName: "Cat Ipsum",
    profileImageSmall: "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png",
    postCount: 0,
    followers: 0,
    following: 0
  });
  if (users[length - 1].username == req.body.username) {
    return res.json(res.json(users[length - 1]));
  } else {
    return res.sendStatus(401);
  }
});

app.get('/users', function(req, res) {
  res.json(users);
});

app.get('/posts/relevant', function(req, res) {
  res.json(posts);
});

app.get('/posts/:id', function(req, res) {
  var items = [];
  posts.forEach(function(item, i) {
    if (item.user.id == req.params.id) {
      items.push(item);
    }
  });
  res.json(items);
});

// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
