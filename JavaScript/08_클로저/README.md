# 클로저란?

클로저는 <b><u>독립적인 자유 변수를 가리키는 함수</u></b>이다. 또한 클로저 내에서 정의 된 함수는 만들어진 환경을 기억한다. <br/>

클로저는 자바스크립트 고유의 개념이 아니라 함수형 프로그래밍 언어에서 사용되는 중요한 특징이다. 따라서 ECMAScript 명세에는 클로저의 정의가 적혀있지 않지만, MDN에서는 클로저를 다음과 같이 정의하고 있다.<br/>

> "클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경과의 조합이다"

<br/>

### 렉시컬 스코프

렉시컬 스코프는 <b><u>함수가 선언이 되는 위치에 따라 다른 스코프</u></b>를 가지는 것을 의미한다. <br/>

클로저는 만들어졌을 떄 환경을 기억하는데, 이 때 클로저가 기억하는 환경의 스코프가 렉시컬 스코프를 따르게 된다.

<br/>

## 코드로 알아보는 클로저

<br/>

```js
function globalFunc() {
	let text = "text";
	let localFunc = function() {
		console.log(text);
	};
	localFunc();
}

globalFunc(); // "text"
```

<br/>

위의 예제에서는 전역으로 선언된 `globalFunc` 안에 지역 변수 `text`와 `text`를 반환하는 지역함수 `localFunc`가 있다. <br/>

이떄 `localFunc`는 자신을 포함하는 `globalFunc`안에 선언 된 `text`를 접근 할 수 있다. 이것을 실행 컨텍스트 관점으로 보면 다음과 같다. <br/>

1. `localFunc` 함수 스코프 내에서 변수 `text`를 검색 -> 검색 실패
2. `localFunc` 함수를 포함하는 외부 함수인 `globalFunc`의 스코프에서 `text`를 검색 -> 검색 성공

<br/>

그렇다면 여기서 `globalFunc`가 `localFunc`를 반환하게 되면 어떤 일이 일어날까? <br/>

```js
function globalFunc() {
	let text = "text";
	let localFunc = function() {
		console.log(text);
	};
	return localFunc;
}

let local = globalFunc();
local(); // text
```

<br/>

마찬가지로 실행 컨텍스트 관점으로 봤을 때 `globalFunc`는 `localFunc`를 반환하고 실행 컨텍스트 스택에서 제거된다. <br/>

그렇다면 변수 `text` 또한 존재하지 않게되어 변수 `text`에 접근 할 방법이 없어보이지만 `globalFunc`를 전역에서 실행해보면 `text`를 반환 하는 것을 알 수 있다. <br/>

이처럼 <b>자신을 포함하는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데</b> 이러한 함수를 <b>클로저</b>라고 한다. <br/>

다시 실행 컨텍스트 관점으로 설명하면, 내부함수가 유효한 상태에서 외부함수가 종료되어 실행 컨텍스트가 반환되어도, 외부함수 실행 컨텍스트 내의 활성객체는 내부함수에 의해 참조되는 한 유효하여 스코프 체인을 통해 참조할 수 있게된다.

<br/>

## 클로저를 왜 사용할까?

클로저는 자신이 생성된 당시 환경을 기억해야 하므로 메모리 손해를 볼 수 있다. 하지만 그럼에도 불구하고 클로저를 사용해야 하는 이유에 대해서 알아본다. <br/>

### 상태 유지

<br/>

클로저를 사용하면 <b>현재 상태를 기억하고 변경된 최신 상태를 유지</b> 할 수 있다. <br/>

다음은 카운트 값을 저장해서 함수가 실행 될 때마다 값을 증가시키는 예제이다. <br/>

```js
const increase = (function() {
	let num = 0;
	return function() {
		return ++num;
	};
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

<br/>

`increase` 안에는 즉시 실행 함수가 선언되어 있는데, 즉시 실행 함수는 호출된 이후 소멸되지만 즉시 실행 함수가 반환한 클로저가 `increase` 변수에 할당되어 호출된다. <br/>

이때 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 `num`을 언제 어디서 호출하든지 참조하고 변경할 수 있다.

<br/>

### 캡슐화와 정보 은닉

<br/>

클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 <b>캡슐화와 정보 은닉의 특징</b>을 지니기도 한다. <br/>

<br/>

```js
const Person = (function() {
	let _age = 0; // private로 선언할 변수

	// 생성자
	function Person(name, age) {
		this.name = name; // public
		_age = age;
	}

	// 프로토타입 메서드 (여러 Person 객체가 생성될 때마다 중복 생성되지 않게 하기 위해 프로토타입 메서드로 선언)
	Person.prototype.sayHi = function() {
		console.log(`My name is ${this.name}. I'm ${_age}.`);
	};

	// 생성자 함수 반환
	return Person;
})();

const jong = new Person("Jongmin", 26);
jong.sayHi(); // My name is Jongmin. I'm 26.
console.log(jong.name); // Jongmin
console.log(jong._age); // undefined

const kyun = new Person("Kyun", 27);
kyun.sayHi(); // My name is Kyun. I'm 27.
console.log(kyun.name); // Kyun
console.log(kyun._age); // undefined
```

<br/>

위의 예제는 `Person` 객체에 생성자 함수를 반환하는 즉시 실행 함수를 실행시키는 모습이다. <br/>

즉시 실행 함수가 반환하는 생성자인 `Person`과 `sayHi` 메서드에서는 `_age`를 참조 할 수 있지만, 즉시 실행 함수가 호출되어 사라진 이후에는 `_age`에 접근 할 수 없는 모습이다. <br/>

하지만 위 코드에는 `Person` 생성자 함수가 여러 개의 인스턴스를 생성할 경우 다음과 같이 `_age` 변수의 상태가 유지되지 않는다는 문제가 있다. <br/>

<br/>

```js
const jong = new Person("Jong", 26);
jong.sayHi(); // My name is Jongmin. I'm 26.

const kyun = new Person("Kyun", 27);
kyun.sayHi(); // My name is Kyun. I'm 27.

// _age 변수가 변경됨
jong.sayHi(); // My name is Jongmin. I'm 27.
```

<br/>

이는 `Person.prototype.sayHi` 메소드가 한 번 생성되는 클로저이기 때문에 발생하는 현상으로, 클로저가 public,private,protected 같은 접근 제한자를 완벽히 대체 할 수는 없음을 보인다.<br/>

대신 2021년 1월부터 TC39 프로세스의 stage 3에 클래스에 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있어서 변수 앞에 `#`를 붙여 정의하는 방법이 있다. <br/>

<br/>

### 자주 발생하는 실수

다음은 클로저를 사용할 때 자주 발생할 수 있는 실수이다. <br/>

<br/>

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
	funcs[i] = function() {
		return i;
	};
}

for (var j = 0; j < funcs.length; j++) {
	console.log(funcs[j]());
}
```

<br/>

위의 코드를 실행하면 <b>3,3,3</b>의 값이 출력된다. <br/>

그 이유는 for문의 변수 선언문에서 var 키워드로 선언한 i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수 취급을 받기 때문이다. <br/>

따라서 funcs 배열의 요소로 추가한 함수에서는 전역 변수 i의 값인 3을 참조하여 3을 출력하게 된다. <br/>

이를 클로저를 활용해서 바꾸면 다음과 같다. <br/>

<br/>

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
	funcs[i] = (function(id) {
		// (1)
		return function() {
			return id;
		};
	})(i);
}

for (var j = 0; j < funcs.length; j++) {
	console.log(funcs[j]());
}
```

<br/>

위처럼 코드를 바꾸게 되면 (1)의 즉시 실행함수가 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개변수 `id`에 할당하기 때문에, 자유 변수인 `id`는 값이 유지된다. <br/>

혹은 ES6의 let 키워드를 사용하는 방식으로 바꿀 수 있다. <br/>

```js
const funcs = [];

for (let i = 0; i < 3; i++) {
	funcs[i] = function() {
		return i;
	};
}

for (let i = 0; i < func.length; i++) {
	console.log(funcs[i]());
}
```

<br/>

let 키워드는 블록 레벨 키워드를 따르므로, for문이 반복될 때 마다 정의되는 함수는 새롭게 생성된 for문 코드 블록을 상위 스코프로 가지게된다. <br/>

따라서 각 함수는 코드 블록 스코프의 `i`값을 유지하게 된다. <br/>

<br/>

### 클로저의 메모리 관리

<br/>

앞서 말했듯이 클로저는 각자의 환경을 저장해서 메모리 손해를 볼 수 있다. <br/>

클로저를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 가비지 콜렉터가 회수하지 않으므로, 클로저 사용이 끝나면 참조를 제거하도록 하자. <br/>

```js
function globalFunc() {
	let text = "text";
	let localFunc = function() {
		console.log(text);
	};
	return localFunc;
}

let local = globalFunc();
local();

local = null; // 다 사용한 뒤에는 메모리를 해제한다
```

<br/>

### 참고 자료

-   [Poiemaweb - 클로저](https://poiemaweb.com/js-closure)
-   [hyunseob.github.io - JavaScript 클로저(Closure)](https://hyunseob.github.io/2016/08/30/javascript-closure/)
-   이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스
