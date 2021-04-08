let prime=function(number){
    let isPrime=true;
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            isPrime = false;
            break;
        }
    }
    if(isPrime)
    {
        return true;
    }
    else{
        return false;
    }
}
module.exports.prime=prime;