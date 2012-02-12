/**
 * Created by JetBrains WebStorm.
 * User: Khrystyna Skvarok
 * Date: 16.01.12
 * Time: 17:38
 */
function Observer(){
   this.subscribers = [];

   this.subscribe = function(type,fun) {
     if (this.subscribers[type] === undefined) this.subscribers[type] = [];
     this.subscribers[type].push(fun);
     return this;
   };

   this.unsubscribe = function(type,fun) {
     if (this.subscribers[type] === undefined) return;
     this.subscribers[type] = this.subscribers[type].filter(
         function(el){
           if ( el !== fn ){
             return el;
           }
         });
     return this;
   };

   this.fire = function(type,data) {
     if (this.subscribers[type] === undefined) return;
     this.subscribers[type].forEach(function(fun){fun(data);})
     return this;
   };
}
