# 호이스팅이란?

호이스팅은 ES2015 이전 명세에는 사용된 적이 없는 용어다. 호이스팅은 javascript에서 실행컨텍스트가 어떻게 동작하는가에 대한 생각으로 여겨진다.

하지만 이는 호이스팅의 대표적인 오해이다. 예를 들어, 호이스팅을 변수 및 함수 선언이 물리적으로 작성한 코드의 상단으로 옮겨지는 것이라고들 생각하지만, 실제로는 그렇지 않다.

변수 및 함수 선언은 컴파일 단계에서 메모리에 저장되지만, 코드에서 입력한 위치와 정확히 일치한 곳에 있다.

즉, 호이스팅은 선언문이 코드의 선두로 끌어 올려진 것**처럼** 동작하는 자바스크립트 고유의 특징이다.

## 함수 호이스팅

함수가 호이스팅 되는 것은 크게 두가지가 존재한다. 다음 예를 살펴보자

```js
// 함수 참조
console.dir(add); // add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function(x, y) {
  return x - y;
};
```

결론 부터 말하자면 함수 선언문으로 정의한 함수만 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르다.

반면, 함수 표현식으로 함수를 정의하면 함수의 변수 선언은 런타임 이전에 실행되어 undefined로 초기화 되지만 변수 할당문의 값은 할당문이 실행되는 시점, 즉 런타임에 평가되므로 함수 표현식의 함수 리터럴도 할당문이 실행되는 시점에 평가되어 함수 객체가 된다.

즉, 함수 표현식으로 만들고 함수를 위에서 호출하면 undefined를 호출하는 것과 마찬가지 이므로 타입 에러가 발생한다.

## 변수 호이스팅

var, let, const에 대한 호이스팅을 차례대로 알아보자.

var 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.

```js
// 이 시점에서는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다. (1. 선언단계)
// 변수 foo는 undefined로 초기화 된다. (2. 초기화 단계)
console.log(foo); // undefined

// 변수에 값을 할당(3. 할당 단계)
foo = 123;

console.log(foo); //123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;
```

반면, let과 const는 var와 달리 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
console.log(foo); // ReferenceError : foo is not defined
let foo;
```

위와 같이 변수 선언 이전에 참조하게 되면 참조 에러(ReferenceError)가 발생하게 된다.

이처럼 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 일시적 사각지대(TDZ)라고 부른다.

즉, 자바스크립트는 ES6에서 도입된 let,const를 포함해서 모든 선언을 호이스팅한다. 단, ES6에서 도입된 let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.

## 참고

- [mdn 호이스팅](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
- [mdn let tdz](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let#%EC%9E%84%EC%8B%9C%EC%A0%81%EC%9D%B8_%EC%82%AC%EA%B0%81_%EC%A7%80%EC%97%AD%EA%B3%BC_%EC%98%A4%EB%A5%98)
- [모던 자바스크립트 deep dive](http://www.yes24.com/Product/Goods/92742567)
