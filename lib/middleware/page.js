module.exports = function(fn, perpage){
   perpage = perpage || 5;
  
   return function(req,res,next){
      console.log('param page');
      console.log(req.param('page'));
      var parsedPage = parseInt(req.param('page')||'1');
      console.log('parsedPage: ' + parsedPage);
      var page = Math.max( parsedPage,1 ) - 1;
      console.log('page : ' + page);
      
      fn(function(err,total){
         
         if (err) {
            return next(err);
         }
         
         req.page = res.locals.page = {
            number: page,
            perpage: perpage,
            from: page*perpage,
            to: page*perpage + perpage - 1,
            total: total,
            count: Math.ceil(total/perpage)
         };
         
         next();
      });   
   };
};