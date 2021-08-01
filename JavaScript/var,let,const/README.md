# var, let, const의 차이

var와 let, const의 차이에 대해서 살펴보자

## var, let, const란 무엇인가?

var와 let, const는 모두 자바스크립트에서 변수를 선언 할 때 사용한다.

```js
var a = 1;
let b = 2;
const c = 3;
```

let과 const는 es6에서 도입이 되었는데 그 전까지는 var만으로 변수를 선언할 수 있었다.

또 다른 기본적인 차이점은 var와 let은 변수 재할당이 가능한 반면, const는 한번 선언한 이후에는 값을 바꿀 수 없는 상수 값이다.

그렇다면 왜 var가 있음에도 let과 const가 나오게 되었을까?

이를 알아보기 위하여, 이러한 기본적인 차이 이외에도 내부 상에서 어떤 동작의 차이가 있는지 알아보도록 하자.

## 스코프

간단하게 차이점만 말해보자면 var는 `함수 레벨 스코프`, let과 const는 `블록 레벨 스코프`를 따른다. 이 부분은 나중에 뒤에서 스코프 챕터에서 자세하게 다룰 내용이기 때문에 간략하게 결과만 보고 넘어가도록 하겠다.

::: details var의 함수 스코프

```js
var foo = 1; // 전역 변수

console.log(foo); // 1

{
  var foo = 2; // 전역 변수
}
console.log(foo); // 2
```

:::

::: details let과 const의 블록스코프

```js
let foo = 1; // 전역 변수

{
  let foo = 2; // 지역 변수
  let bar = 2; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

:::

## 호이스팅

사실 이 부분은 차이라고 할 수는 없지만 많은 사람들이 차이라고 알고 있기에 작성해 보았다.

먼저 호이스팅이라는 것은 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트의 고유의 특징을 말한다.

대부분의 사람들이 var는 호이스팅이 일어나고 let과 const는 호이스팅이 일어나지 않는다고 생각하지만 이는 사실이 아니다.

```js
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // Uncaught ReferenceError: Cannot access 'foo' before initialization
  var bar = 1;
  let foo = 2;
}
```

mdn에 나와있는 위의 코드를 보면 이해하기 쉬운데 var로 선언한 코드를 위에서 로그를 찍으면 undefined가 나오는 반면,

let으로 선언한 코드는 ReferenceError가 나오는 것을 볼 수 있다. 이는 즉 프로그램이 foo의 위치를 이미 log를 찍었을 때 알고 있다는 뜻이 되기도 한다.

즉, 호이스팅은 되지만 강제로 변수를 선언하지 않게 했다고 볼 수 있다. 이것을 `임시적인 사각 지역(TDZ)`라고 한다.

## 정리

::: details var

- 함수 스코프
- 변수 선언이 함수 블록의 최상단으로 끌어 올려짐
- 변수 재할당 가능
  :::

::: details let

- 블록 스코프
- 변수 선언이 끌어 올려지지 않는다.
- 변수 재할당 가능
- es6에 등장
  :::

::: details const

- 블록 스코프
- 변수 선언이 끌어 올려지지 않는다.
- 변수 재할당 불가능
- es6에 등장
  :::

### 참고 자료

- [var - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var)
- [let - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
- [const - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const)
- [자바스크립트 Deep Dive](http://www.yes24.com/Product/Goods/92742567)
