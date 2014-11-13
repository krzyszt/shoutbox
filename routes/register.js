var User = require('../lib/user');

module.exports.form = function(req,res){
	res.render('register', { title: 'Register'});
};


module.exports.submit = function(req,res, next){
	var data = req.body.user;
    
    User.getByName(data.name, function(err, user){
       if (err) { return next(err); }
       
       if (user.id){
          res.error('User already taken!');
          res.redirect('back');
       } else {
          user = new User({
             name: data.name,
             pass: data.pass
          });
          user.save(function(err){
             if (err) {
                return next(err);
             }
             req.session.uid = user.id;
             res.redirect('/');
          });
       }
       
    });
    
};