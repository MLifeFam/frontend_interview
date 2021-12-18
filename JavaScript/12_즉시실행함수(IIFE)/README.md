# 즉시실행함수 (IIFE)

즉시실행함수 (IIFE, Immediately Invoked Function Expression)는 **정의되자마자 즉시 실행되는 함수**를 말한다.

<br />

즉시실행함수는 다음과 같이 소괄호(`()`)로 함수를 감싸서 실행하는 문법을 사용한다.

```js
(function() {
	console.log("IIFE");
})();

// 화살표 함수로도 사용 가능하다
(() => {
	console.log("IIFE");
})();
```

자바스크립트 콘솔에 위 함수를 찍어보면 선언과 동시에 `IIFE`를 출력함을 확인 할 수 있다.

<br />

> 즉시실행함수에 익명 함수를 사용해야 할까?

즉시실행함수에도 이름을 붙여 기명 즉시실행함수로 사용 할 수 있다. 하지만 즉시실행함수는 선언과 동시에 호출되어 반환되어 **재사용 할 수 없기 때문**에 이름을 지어주는 것이 의미가 없다.

하지만 즉시실행함수에 기명,익명 함수를 사용하는 것은 개발자들 사이에서도 의견이 갈린다.

<br />

## 즉시실행함수를 왜 사용할까?

<br />

#### 1. 필요없는 전역 변수의 생성을 줄일 수 있다.

함수를 생성하면 그 함수는 전역 변수로써 남아있게 되고, 많은 변수의 생성은 전역 스코프를 오염시킬 수 있다.

즉시실행함수를 선언하면 내부 변수가 전역으로 저장되지 않기 때문에 전역 스코프의 오염을 줄일 수 있다.

<br />

#### 2. private한 변수를 만들 수 있다.

즉시실행함수는 외부에서 접근 할 수 없는 자체적인 스코프를 가지게된다. 이는 클로저의 사용 목적과도 비슷하며 내부 변수를 외부로부터 private하게 보호 할 수 있다는 장점이 있다.

<br />

## 즉시실행함수를 어떻게 활용할까?

<br />

#### 1. 단 한 번의 사용이 필요한 함수

즉시실행함수는 한 번의 실행 이후 없어지기 때문에 단 한번의 사용한 필요한 함수에 사용된다. 대표적인 예시로는 **변수를 초기화 하는 함수**가 있다.

<br />

```js
let isAdult;

(function init(age) {
	let currentAge = age;
	if (age >= 20) {
		isAdult = true;
	} else {
		isAdult = false;
	}
})(20);

console.log(isAdult); //  true
console.log(currentAge); //  Uncaught ReferenceError: currentAge is not defined
```

위의 예제는 성인임을 나타내는 `isAdult` 변수를 즉시실행함수를 활용해 초기화하는 예제이다. `init` 함수에 입력되는 `age` 인자에 따라 다른 값을 할당하게 된다.

이후 `isAdult` 값을 콘솔로 찍어보면 `true`가 할당됨을 알 수 있고, 내부 변수인 `currentAge`는 전역으로 저장되지 않음을 확인 할 수 있다.

<br />

#### 2. 자바스크립트 모듈

자바스크립트 모듈을 만들때에도 즉시실행함수가 많이 활용된다. 숫자를 세기 위한 Counter 싱글톤 객체를 구현해보며 알아본다. <br/>

<br />

```js
const Counter = (function counterIIFE() {
	// 현재 counter 값을 저장하기 위한 변수
	let current = 0;

	return {
		// 즉시실행함수로써 반환되는 객체
	};
})();
```

1. 먼저 객체를 반환하는 형태의 즉시실행함수인 **counterIIFE**를 만든다.
2. 즉시실행함수 내부에는 현재 counter 값을 저장하기 위한 **current**라는 변수를 만든다.
3. 즉시실행함수의 반환 객체는 **Counter**라는 변수에 할당된다.

<br />

```js
const Counter = (function counterIIFE() {
	// 현재 counter 값을 저장하기 위한 변수
	let current = 0;

	return {
		getCurrentValue: function() {
			return current;
		},

		increaseValue: function() {
			current = current + 1;
			return current;
		},

		decreaseValue: function() {
			current = current - 1;
			return current;
		},
	};
})();

console.log(Counter.getCurrentValue()); // 0
console.log(Counter.increaseValue()); // 1
console.log(Counter.decreaseValue()); // 0
```

1. 즉시실행함수의 반환 객체에 현재 current 값을 출력하는 **getCurrentValue** 함수, 현재 current 값에 1을 더하는 **increaseValue** 함수 그리고 현재 current 값에 1을 빼는 **decreaseValue** 함수를 정의했다.
2. 전역에서 반환 객체의 함수를 통해 current 값을 얻거나 수정 할 수 있다.

위의 예제에서 current 변수는 private 하기 때문에 **클로저를 통한 접근 외에는 접근 및 수정이 불가능**하다.

<br />

---

<br />

#### 참고

-   [MDN - IIFE](https://developer.mozilla.org/ko/docs/Glossary/IIFE)
-   [Chandra Gundamaraju님 medium](https://vvkchandra.medium.com/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
-   [jakeseo_me님 velog - IIFE 마스터하기](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-8-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%84%EC%88%98%EC%9A%94%EC%86%8C-IIFE-%EB%A7%88%EC%8A%A4%ED%84%B0%ED%95%98%EA%B8%B0)
-   [beomy님 tistory - 즉시실행함수](https://beomy.tistory.com/9)
