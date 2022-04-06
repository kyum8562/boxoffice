/*
callback 지옥을 막아주기 위해서는 promise를 사용한다.
promise를 문법적으로 더 간단하게 작성하기 위한 도구는 async, await 이다.
비동기적인 코드가 동기적인 코드처럼 똑같이 동작하게 도와줌

await는 항상 async가 붙은 함수가 감싸주고 있어야 한다.
async는 promise를 리턴한다.
async-await와 then을 같이 사용할 수 있다.
async가 리턴값을 갖는 경우 -> 
*/
function timer(time){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve(time);
    }, time);
  });
}
// async function run(){
//   console.log('start');
//   var time = await timer(1000);
//   console.log(time);
//   time = await timer(time + 1000);
//   console.log(time);
//   time = await timer(time + 1000);
//   console.log(time);
//   console.log('end');
//   return time;
// }
// async function run2(){
//   time = await run();
//   console.log(time);
// }
// run2();

// console.log(time);


// Promise.all()
console.time('Promise.all');
Promise.all([timer(1000), timer(2000), timer(3000)]).then(function(result){
  console.log(result);
  console.timeEnd('Promise.all');
});

// Promise.race()
console.time('Promise.race');
Promise.race([timer(1000), timer(2000), timer(3000)]).then(function(result){
  console.log(result);
  console.timeEnd('Promise.race');
});
