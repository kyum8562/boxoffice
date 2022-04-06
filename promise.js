// callback function
// 함수 내에서 함수를 호출하는 함수 => 콜백 함수
function callbackMain(){
    const words = ['asdfasdf', 'asdf' , 'asahah'];
    function myfilter(o, callback){
        let result = [];
        for(var i = 0 ; i < o.length ; i++){
            let curr = o[i];
            if(callback(curr)) result.push(curr);
        }
        return result;
    }
    let newWords = myfilter(words, (e)=> e.length >6);
    console.log(newWords);

    let a = words.filter((e) => e.length > 6);
    console.log(a);
}
// callbackMain();

// promise(then, catch)
//Synchronous(동기 - 순차적실행) vs Asynchronous(비동기 - 병렬적실행)
// 비동기 예시 - ajax 통신(리로드를 하지 않고 JS를 이용해서 통신하는 방식), setTimeout()
function Asynchronous(){
    console.log(1);
    console.log(2);
    setTimeout(() => {console.log(3)}, 0);
    console.log(4);
}
// Asynchronous();

/* 
fetch -> promise 데이터 타입을 리턴함, 성공시 response 객체 전달
fetch.then(function(res){}) : then은 fetch가 성공시 
결과값(Response 객체)이 있다면 첫번째 파라미터(promise 데이터 타입 리턴)로 받을 수 있다.
fetch.catch(function(reason){}) : fetch가 실패시 error 이유 반환
*/
// fetch('https://jsonplaceholder.typicode.com/posts')
// // 서버를 마련하는데 시간이 걸리는데 이 사이트를 사용하면 금방만들 수 있다
//   .then(function(response) {
//     return response.json();
//     // 리턴된 response.json() 또한 promise 데이터 타입이다.
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   })
//   .catch((err) => console.log(err));

function job1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job1 ok!')
        }, 0);
    });
}
function job2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job2 ok!')
        }, 0);
    });
}
    job1()
        .then(function(data1){
            console.log(data1); 
            return job2();
        })
        .catch(function(err){
            console.log(err);
            return Promise.reject(err);
        })
        .then(function(data2){
            console.log(data2);
                job2();
            })
        .catch(function(err){
            console.log(err);
            return Promise.reject(err);
        })
// ajax