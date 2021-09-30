
module.exports = {
    democracy : (arrDislikes,arrUsers) => {

       if(((arrDislikes.length*100)/arrUsers.length)>=75){
           return true;
       } 
       else{
           return false
       }
    }
}