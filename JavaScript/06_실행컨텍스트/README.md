# 실행 컨텍스트란?

실행 컨텍스트 (execution context)는 자바스크립트의 동작 원리를 담고 있는 핵심 개념이다. <br/>

ECMAScript 스펙에 따르면 실행 컨텍스트는 <b><u>실행 가능한 코드를 형상화하고 구분하는 추상적인 개념</u></b>이라고 정의된다. 더 쉽게 말하면 실행 컨텍스트란 <b><u>실행 가능한 코드가 실행되기 위해 필요한 환경</u></b>이라고 할 수 있다. <br/>

여기서 실행 가능한 코드란 전역 코드, Eval 코드, 함수 코드의 종류가 있고, 코드를 실행하기 위해서는 변수, 함수 선언, 변수의 유효범위, this 등의 정보를 알고 있어야 한다. <br/>

이러한 정보를 형상화하고 구분하기 위해 자바스크립트 엔진은 실행 컨텍스트를 <b><u>스택</u></b>의 물리적 객체의 형태로 관리한다.<br/>

## 실행 컨텍스트 스택

<br/>

```js
var x = "xxx";

function foo() {
	var y = "yyy";

	function bar() {
		var z = "zzz";
		console.log(x + y + z);
	}

	bar();
}

foo();
```

위와 같이 전역 코드와 함수 코드가 주어졌을때, 실행 컨텍스트의 스택은 다음과 같이 생성되고 없어진다.

<div align="center">

<br/>

![stack](/img/javascript/execution_context/stack.png)

###### <small> 이미지 출처 : [https://poiemaweb.com/js-execution-context](https://poiemaweb.com/js-execution-context) </small>

<br/>

</div>

1. 컨트롤이 실행 가능한 코드로 이동하면, 논리적 스택 구조를 가지는 새로운 실행 컨텍스트 스택이 생성된다. 스택은 LIFO(후입선출) 구조의 자료구조이므로 나중에 들어온 실행 컨텍스트가 먼저 나가게 된다.

2. 전역 코드로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 쌓인다. 전역 실행 컨텍스트는 애플리케이션이 종료될 때 까지 유지된다.

3. 함수를 호출하면 해당 함수의 실행 컨텍스트가 생성되며 직전에 실행된 코드 블록의 실행 컨텍스트 위에 쌓인다.

4. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트를 파기하고 직전 실행 컨텍스트에 컨트롤을 반환한다.

<br/>

이처럼 <b><u>실행 컨텍스트 스택은 코드의 실행 순서를 관리</u></b>한다.

소스코드가 평가되면 실행 컨텍스트가 생성되고 실행 컨텍스트 스택의 최상위에 쌓이게 되며, 실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행 중인 코드의 실행 컨텍스트다.<br/>

## 실행 컨텍스트의 객체

<br/>

실행 컨텍스트는 실행 가능한 코드를 평가하고 구분하는 추상적인 개념이지만, 물리적으로 객체의 형태를 띄며 다음과 같은 3가지 속성을 가진다.

<div align="center">

<br/>

![structure](/img/javascript/execution_context/structure.png)

###### <small> 이미지 출처 : [https://poiemaweb.com/js-execution-context](https://poiemaweb.com/js-execution-context) </small>

<br/>

</div>

### 1. 변수 객체 (Variable Object)

<br/>

실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 여러 정보를 담을 객체를 생성하는데, 이것을 변수 객체라고 한다. 변수 객체에는 다음과 같은 정보를 담는다.<br/>

1. 변수
2. 매개변수와 인수 정보
3. 함수 선언 (<u>함수 표현식은 제외</u>)

<br/>

### 2. 스코프 체인 (Scope Chain, SC)

<br/>

스코프 체인은 일종의 리스트로써 전역 객체와 중첩된 함수의 스코프 레퍼런스를 차례로 저장한다.<br/>

현재 실행 컨텍스트의 활성 객체(AO)를 선두로 하여 순차적으로 상위 컨텍스트의 활성 객체(AO)를 가리키며 마지막 리스트는 전역 객체(GO)를 가리킨다.

<br/>

### 3. this 속성

<br/>

this 속성에는 this 값이 할당되며, this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.

## 코드로 보는 실행 컨텍스트

<br/>

실행 컨텍스트의 이해를 위해 코드를 보며 실행 컨텍스트의 순서가 어떻게 되는지 살펴본다

<!-- prettier-ignore-start -->

```js
var name = "world";                     // (1) 변수 선언    (6) 변수 대입

function first(word) {                  // (2) 변수 선언    (3) 변수 대입
	console.log(word + " " + name);     // (11)
}

function say() {                        // (4) 변수 선언    (5) 변수 대입
	var name = "jongmin";               // (8)
	console.log(name);                  // (9)
	first("hello");                     // (10)
}

say();                                  // (7)
```

<!-- prettier-ignore-end -->

-   먼저 전역 컨텍스트가 생성된 뒤, 함수 호출 시 마다 컨텍스트가 생성된다
-   컨텍스트에는 변수객체, 스코프 체인, this 속성이 생긴다
-   컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고 없다면 스코프 체인을 따라 올라가며 찾는다
-   함수 실행이 마무리 되면 컨텍스트가 사라지며 페이지가 종료되면 전역 컨텍스트가 사라진다

의 특징을 따라 주석에 쓰여진 순서대로 실행된다. <br/>

위 코드를 바탕으로 생성된 전역 컨텍스트는 다음과 같다. <br/>

```js
'전역 컨텍스트' : {
    변수객체: {
        arguments: null,
        variable:[{name:'world'},{first:Function},{say:Function}],   // 대입 되기전에는 variable: ['name','first','say']
    },
    스코프체인: ['전역 변수객체'],
    this: window,
}
```

여기서 함수 first와 say는 호이스팅 때문에 선언과 동시에 대입이된다. <br/>

다음으로는 코드를 바탕으로 생성된 함수 컨텍스트를 알아본다. <br/>

```js
'say 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{name:jongmin}], // 대입 되기전에는 variable: ['name']
  },
  scopeChain: ['say 변수객체', '전역 변수객체'],
  this: window,
}
```

<br/>

```js
'first 컨텍스트': {
  변수객체: {
    arguments: [{word:'hello'}],
    variable: null,
  },
  scopeChain: ['first 변수객체', '전역 변수객체'],
  this: window,
}
```

<br/>

### 참고 자료

-   [Poiemaweb - 실행 컨텍스트와 자바스크립트의 동작 원리](https://poiemaweb.com/js-execution-context)
-   [Zerocho - 실행 컨텍스트](https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0)
-   이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스
