var User = require('../lib/user');

module.exports.form = function(req,res){
  res.render('login', { title: 'Login' });
};

module.exports.submit = function(req,res, next){
   var data = req.body.user;
   User.authenticate(data.name, data.pass, function(err, user){
      if (err) {
         return next(err);
      }
      if(user){
         req.session.uid = user.id;
         res.redirect('/');
         
      } else {
         res.error("Sorry! Invalid credentials.");
         res.redirect('back');
      }
   });
};

module.exports.logout = function(req,res){
   req.session.destroy(function(err){
      if (err) {
         throw err;
      }
      res.redirect('/');
   });
   
};