var secrets = require('../config/secrets');
var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var bodyParser = require('body-parser');
var router = express.Router();

module.exports = function (router) {

    var homeRoute = router.route('/ho');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ message: 'My connection string is ' + connectionString });
    });

    var usersRoute = router.route('/users');

    usersRoute.get(function (req,res) {

        var uname = req.query.username
        var pass = req.query.password

        var query = User.find({u_name : uname});

        query.exec(function(err, users) {
            if(err) {
                res.status(404).json({
                    "message": "Server Error",
                    "data": {}
                });
            } else {
                if(users.length == 0) {
                    res.status(404).json({
                        "message": "User Not Found",
                        "data": {}
                    }); 
                } else {
                    if (users[0].pass === pass) {
                        res.json({
                            "message": "OK",
                            "data": users
                        });
                    } else {
                        res.status(404).json({
                            "message": "User Not Found",
                            "data": {}
                        }); 
                    }
                }
            }
        });

    })

    usersRoute.post(function(req, res) {

        var fname = req.body.fname
        var lname = req.body.lname
        var uname = req.body.uname
        var pass = req.body.password
        
        var newUser;
    
        if (!fname || !lname || !uname || !pass) {
            res.status(404).json({
                "message": "Data missing",
                "data": {}
            });

            return;
        }
    
        User.count({"u_name": uname}, function(err, count) {

            if(err) {
                res.status(500).json({
                    "message": "Error",
                    "data": {}
                });
                
                return;
            }
    
            if(count > 0) {
                res.status(404).json({
                    "message": "Dupliate username",
                    "data": {}
                });
            } else {
                newUser = new User({
                    "f_name": fname,
                    "l_name": lname,
                    "u_name": uname,
                    "pass" : pass,
                    "teams" : []
                });

                newUser.save();

                res.status(201).json({
                    "message": "User Created",
                    "data": newUser
                });
            }
        });
    })

    var unameModify = router.route('/unamemodify');

    unameModify.put(function (req, res){

        var old_uname = req.body.olduname
        var new_uname = req.body.newuname
        var pass = req.body.pass

        if (!old_uname || !new_uname || !pass) {
            res.status(404).json({
                "message": "Missing info",
                "data": {}
            });
            
            return;
        }

        User.count({"u_name": new_uname}, function(err, count) {

            if(err) {
                res.status(500).json({
                    "message": "Error",
                    "data": {}
                });

                return;
                
            } else if (count > 0) {

                co = count

                res.status(404).json({
                    "message": "Username not available",
                    "data": {}
                });

                return

            } else {
                var query = User.find({u_name : old_uname});

                query.exec(function(err, users) {
                    if(err) {

                        res.status(404).json({
                            "message": "Server Error",
                            "data": {}
                        });
                    } else {
                        if(users.length == 0) {
                            res.status(404).json({
                                "message": "User Not Found",
                                "data": {}
                            });  

                            return;

                        } else {
                            if (users[0].pass === pass) {
                                //actual change

                                users[0].u_name = new_uname
                                users[0].save()


                                res.status(200).json({
                                    "message": "Username changed",
                                    "data": users[0]
                                });

                                return;
                            
                            } else {
                                res.status(404).json({
                                    "message": "User Not Found",
                                    "data": {}
                                }); 
                            }
                        }
                    }
                });
            }

        });

    })

    var passModify = router.route('/passmodify');

    passModify.put(function (req, res){

        var uname = req.body.uname
        var new_pass = req.body.newpass
        var old_pass = req.body.oldpass

        if (!old_pass || !new_pass || !uname) {
            res.status(404).json({
                "message": "Missing info",
                "data": {}
            });
            
            return;
        }

        if (old_pass === new_pass) {
            res.status(404).json({
                "message": "Password should be different",
                "data": {}
            });

            return;
        }

        var query = User.find({u_name : uname});

        query.exec(function(err, users) {
            if(err) {
                res.status(404).json({
                    "message": "Server Error",
                    "data": {}
                });
            } else {
                if(users.length == 0) {
                    res.status(404).json({
                        "message": "User Not Found",
                        "data": {}
                    });  
                } else {
                    if (users[0].pass === old_pass) {
                        //actual change

                        users[0].pass = new_pass
                        users[0].save()

                        res.status(200).json({
                            "message": "Password changed",
                            "data": users[0]
                        });
                    
                    } else {
                        res.status(404).json({
                            "message": "Users Not Found",
                            "data": {}
                        }); 
                    }
                }
            }
        });

    })

    /*usersRoute.get(function (req,res) {
        var query = User.find({})

        if("where" in req.query) {
            query = query.where(JSON.parse(req.query.where));
        }

        if("sort" in req.query) {
            query = query.sort(JSON.parse(req.query.sort));
        }
    
        if("select" in req.query) {
            query = query.select(JSON.parse(req.query.select));
        }
    
        if("skip" in req.query) {
            query.skip(JSON.parse(req.query.skip));
        }
    
        if("limit" in req.query) {
            query.limit(req.query.limit);
        }
        
        if(("count" in req.query) && JSON.parse(req.query.count)) {
            query = query.count();
        }

        query.exec(function(err, users) {
            if(err) {
                res.status(500).json({
                    "message": "Error",
                    "data": {}
                });
                
    
            } else {
                if(!users) {
                    res.status(404).json({
                        "message": "Users Not Found",
                        "data": {}
                    });
                    
                } else {
                    res.status(200).json({
                        "message": "OK",
                        "data": users
                    });
                    
                }
    
            }
        });
        return
    })*/

    /*

    var tasksRoute = router.route('/tasks');

    tasksRoute.post(function(req, res) {
        var name = req.body.name
		var description = req.body.description
        var completed = req.body.completed
		var deadline = req.body.deadline
		var assignedUser = req.body.assignedUser
		var assignedUserName = req.body.assignedUserName
		var dateCreated = new Date()
		var newTask;
    
    if (!name) {
        res.status(404).json({
            "message": "No Name",
            "data": {}
        });
        
        return;
    }

    if (!deadline) {
        res.status(404).json({
            "message": "No Deadline",
            "data": {}
        });
        
        return;
    }

    if (!description) {
        description = ""
    }

    if (!completed) {
        description = false
    }

    if (!assignedUser) {
        assignedUser = ""
    }

    if (!assignedUserName) {
        assignedUserName = "unassigned"
    }    

	newTask = new Task({
		"name":             name, 
		"description":      description,
		"deadline":         Date(deadline),
		"completed":        completed,
		"assignedUser":     assignedUser,
		"assignedUserName": assignedUserName,
		"dateCreated":      dateCreated
	});

	if(assignedUser !== "") {
		User.findByIdAndUpdate(assignedUser, {$push: {pendingTasks: newTask._id}}, function(err){

        });
	}

	newTask.save();
	res.status(201).json({
		"message": "OK",
		"data": newTask
	});
    })

    tasksRoute.get(function(req, res) {

        var query = Task.find({})
    
        if("where" in req.query) {
            query = query.where(JSON.parse(req.query.where));
        } 
        
        if("sort" in req.query) {
            query = query.sort(JSON.parse(req.query.sort));
        }
    
        if("select" in req.query) {
            query = query.select(JSON.parse(req.query.select));
        }
    
        if("skip" in req.query) {
            query.skip(JSON.parse(req.query.skip));
        }
    
        if("limit" in req.query) {
            query.limit(JSON.parse(req.query.limit));
        }
    
        if(("count" in req.query) && JSON.parse(req.query.count)) {
            query = query.count();
        }
    
        query.exec(function(err, tasks) {
            if(err) {
                res.status(500).json({
                    "message": "Server Error",
                    "data": {}
                });
                
    
            } else {
                if(!tasks) {
                    res.status(404).json({
                        "message": "Tasks Not Found",
                        "data": {}
                    });
                    
                } else {
                    res.status(200).json({
                        "message": "OK",
                        "data": tasks
                    });
                    
                }
    
            }
        });
    
    
    })

    var userRoute = router.route('/users/:id');

    userRoute.put(function (req, res){
        var name = req.body.name
        var email = req.body.email
        var tasks = req.body.pendingTasks

        if (!name) {
            res.status(404).json({
                "message": "No Name",
                "data": {}
            });
            
            return;
        }

        if (!email) {
            res.status(404).json({
                "message": "No email",
                "data": {}
            });
            
            return;
        }
        
        User.findById(req.params.id, function (err,user) {
            //console.log(req.params.id)
            
            if (!user) {
                res.status(404).json({
                    "message": "Cannot Find User",
                    "data": {}
                });
                return;
            } else {

                var tas = user.pendingTasks
                
                if (tasks) {

                
                tas.forEach(function(item,index) {
                    Task.findById(item, function (err,task) {
                        task.assignedUser = ''
                        task.assignedUserName = 'unassigned'
                        task.save()
                    })
                })
            }

                user.name = name
                user.email = email

                if (tasks) {
                    if (typeof(tasks) === "string") {
                        user.pendingTasks = [tasks]
                    } else {
                        user.pendingTasks = tasks
                    }
                    console.log(tasks)
                }
                
                user.save()

                if (tasks) {

                if (typeof(tasks) === "string") {
                    var temp = [tasks]
                    temp.forEach(function(item,index) {

                        Task.findById(item, function (err,task) {
                            task.assignedUser = user._id
                            task.assignedUserName = user.name
                            task.save()
                        })
                    })
                } else {
                    tasks.forEach(function(item,index) {

                        Task.findById(item, function (err,task) {
                            task.assignedUser = user._id
                            task.assignedUserName = user.name
                            task.save()
                        })
                    })
                }
                }
                res.status(200).json({
                    "message": "Updated",
                    "data": {}
                });
            }
            
        })
        res.status(200).json({
            "message": "Updated",
            "data": {}
        });
    })

    userRoute.get(function (req,res) {

        var query = User.find({_id : req.params.id})

        if("select" in req.query) {
            query = query.select(JSON.parse(req.query.select));
        }

        query.exec(function(err, users) {
            if(err) {
                res.status(404).json({
                    "message": "Server Error",
                    "data": {}
                });
            } else {
                if(!users) {
                    res.status(404).json({
                        "message": "Users Not Found",
                        "data": {}
                    });  
                } else {
                    res.status(200).json({
                        "message": "OK",
                        "data": users
                    });
                    
                }
            }
        });

    })

    userRoute.delete(function (req,res) {
        User.findById(req.params.id, function (err,user) {
            //console.log(req.params.id)
            if (!user) {
                res.status(404).json({
                    "message": "Cannot Find User",
                    "data": {}
                });
                return;
            } else {

                var tas = user.pendingTasks

                tas.forEach(function(item,index) {
                    Task.findById(item, function (err,task) {
                        console.log(task)
                        task.assignedUser = ''
                        task.assignedUserName = 'unassigned'
                        task.save()
                        console.log(task)
                    })
                })

                user.remove()
            
                res.status(200).json({
                    "message": "Deleted",
                    "data": {}
                });
            }
            
        })
    })

    var taskRoute = router.route('/tasks/:id')

    taskRoute.get(function (req,res) {

        var query = Task.find({_id : req.params.id})

        if("select" in req.query) {
            query = query.select(JSON.parse(req.query.select));
        }

        query.exec(function(err, users) {
            if(err) {
                res.status(404).json({
                    "message": "Server Error",
                    "data": {}
                });
            } else {
                if(!users) {
                    res.status(404).json({
                        "message": "Task Not Found",
                        "data": {}
                    });  
                } else {
                    res.status(200).json({
                        "message": "OK",
                        "data": users
                    });
                    console.log(users)
                }
            }
        });

    })

    taskRoute.post(function (req, res) {

        var desc = req.body.description
        var completed = req.body.completed
        var user = req.body.assignedUser
        var username = req.body.assignedUserName
        var name = req.body.name
        var deadline = req.body.deadline
        var created = new Date()

        var editedTask = {
                    "name": req.body.name,
                    "description": req.body.description,
                    "deadline": Date(req.body.deadline),
                    "assignedUser": req.body.assignedUser,
                    "assignedUserName": req.body.assignedUserName,
                    "completed": req.body.completed
                  }

        if (!name) {
            res.status(404).json({
                "message": "No Name",
                "data": {}
            });
            
            return;
        }

        if (!deadline) {
            res.status(404).json({
                "message": "No Deadline",
                "data": {}
            });
            
            return;
        }

        Task.findById(req.params.id, function (err,task) {
            if (!task) {
                res.status(404).json({
                    "message": "Cannot Find User",
                    "data": {}
                });
                return;
            } else {

                var tas = task.assignedUser

                if (tas === "") {
                    User.findByIdAndUpdate(user, {$push: {pendingTasks: task._id}}, function(err){
            
                    });
                } else {
                    User.findByIdAndUpdate(tas, {$pull: {pendingTasks: task._id}}, function(err){
                
                    });
                    User.findByIdAndUpdate(user, {$push: {pendingTasks: task._id}}, function(err){
            
                    });
                }
                
                Task.findByIdAndUpdate(req.params.id, editedTask, function (err) {

                })

                res.status(200).json({
                    "message": "Updated",
                    "data": {}
                });
            }
            
        })
    })

    taskRoute.delete(function (req,res) {
        Task.findById(req.params.id, function (err,user) {
            //console.log(req.params.id)
            if (!user) {
                res.status(404).json({
                    "message": "Cannot Find Task",
                    "data": {}
                });
                return;
            } else {

                var tas = user.assignedUser

                User.findByIdAndUpdate(tas, {$pull: {pendingTasks: user._id}}, function(err){
                
                });

                user.remove()
            
                res.status(200).json({
                    "message": "Deleted",
                    "data": {}
                });
            }
            
        })
    })*/

    return router;
}
