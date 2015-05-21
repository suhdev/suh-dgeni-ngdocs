module.exports = {
  proxy:function(fn,ctx){
  	var c = ctx || this,
  		args = arguments.length>2?Array.prototype.slice.call(arguments,2):[];
  	return function(){
  		var a = Array.prototype.slice.call(arguments,0);
  		return fn.apply(c,[].concat(args,a));
  	}
  }
}