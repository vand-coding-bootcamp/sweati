var db = require("../models");

module.exports = function(app) {
 
// =========================================================================================
// ----------------------------------DASHBOARD APIS-----------------------------------------
// =========================================================================================

  // Show user data in dashboard
  app.get("/api/dashboard/:id", function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Cardio
        },
        {
          model: db.Mind
        },
        {
          model: db.Friends
        },
        {
          model: db.Strength
        }
      ]
    }).then(function(dbUser) {
      res.json(dbUser); //When we switch over to handlebars, we need to change this line to res.render("dash", {dbUser:dbUser})
    });
  });

// =========================================================================================
// --------------------------------FRIENDS APIS---------------------------------------------
// =========================================================================================

  app.post("/api/friends", function(req, res) {
    db.Friends.create({
      // friend is pulling from front end - be sure to add "friend" as the variable
      friends: req.body.friends,
      image: req.body.image,
      // change from body to user - body is just for testing purposes in postman until front end is ready
      UserId: req.body.userId
    }).then(function(newFriend) {
      res.json(newFriend);
    });
  });

  // // get all friends for one user
  app.get("/api/friends/:id", function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [db.Friends],
    }).then(async function(data) {
      var friends = await db.User.findAll();
      var friendsData = friends.filter(
        (v, i, a) =>
          a.findIndex((t) => t.dataValues.username === v.dataValues.username) ===
          i
      );
      res.render("friends", { data: data, friends: friendsData });
    });
  });
  


// =========================================================================================
// --------------------------------WORKOUT APIS---------------------------------------------
// =========================================================================================

  app.post("/api/workout/:id", function(req, res) {
    console.log("we should save the body to the database", req.body);
    // Code for pushing data to specific tables
    if (req.body.workout_type === "cardio") {
      db.Cardio.create({
        // friend is pulling from front end - be sure to add "friend" as the variable
        cardio_act: req.body.activity,
        start: req.body.start,
        end: req.body.end,
        // change from body to user - body is just for testing purposes in postman until front end is ready
        UserId: req.body.userId,
      }).then(function(newWorkout) {
        res.json(newWorkout);
      });
    } else if (req.body.workout_type === "mind") {
      db.Mind.create({
        // friend is pulling from front end - be sure to add "friend" as the variable
        mind_act: req.body.activity,
        start: req.body.start,
        end: req.body.end,
        // change from body to user - body is just for testing purposes in postman until front end is ready
        UserId: req.body.userId,
      }).then(function(newWorkout) {
        res.json(newWorkout);
      });
    } else if (req.body.workout_type === "strength") {
      db.Strength.create({
        // friend is pulling from front end - be sure to add "friend" as the variable
        strength_act: req.body.activity,
        start: req.body.start,
        end: req.body.end,
        // change from body to user - body is just for testing purposes in postman until front end is ready
        UserId: req.body.userId,
      }).then(function(newWorkout) {
        res.json(newWorkout);
      });
    }
  });

  // Delete an workout by id
  app.delete("/api/workout/:id", function(req, res) {
    console.log(req.body.workout_type);
    if (req.body.workout_type === "cardio") {
      db.Cardio.destroy({ where: { id: req.params.id } }).then(function() {
        res.status(204);
      });
    } else if (req.body.workout_type === "mind") {
      db.Mind.destroy({ where: { id: req.params.id } }).then(function() {
        res.status(204);
      });
    } else if (req.body.workout_type === "strength") {
      db.Strength.destroy({ where: { id: req.params.id } }).then(function() {
        res.status(204);
      });
    }
  });
};
