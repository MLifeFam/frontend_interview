# this

this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다.

this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

자바나 c++ 같은 클래스 기반 언어에서 this는 언제나 클래스가 생성하는 인스턴스를 가리키지만, 자바스크립트에서는 this가 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this 바인딩이 동적으로 결정된다.

## this 예제

```js
console.log(this); // window

function square(number) {
  console.log(this); // window
  return number * number;
}

const person = {
  name: 'Lee',
  getName() {
    console.log(this); // {name: "Lee", getName: f}
    return this.name;
  },
};

function Person(name) {
  this.name = name;
  console.log(this); // Person {name: "Lee"}
}

const me = new Person('Lee');
```

## 함수 호출 방식과 this 바인딩

this 바인딩은 함수 호출 시점에 결정되는데 자바스크립트에는 다양한 함수 호출 방식이 있다. 하나씩 살펴보자.

### 1. 일반 함수 호출

기본적으로 this에는 전역 객체가 바인딩 된다.

```js
function foo() {
  console.log("foo's this: ", this); // window

  function bar() {
    console.log("bar's this: ", this); // window
  }

  bar();
}
foo();
```

위 예제 처럼 전역 함수, 중첩 함수를 일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩된다.

this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.
따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩 된다.

```js
function foo() {
  'use strict';

  console.log("foo's this: ", this); // undefined

  function bar() {
    console.log("bar's this: ", this); // undefined
  }

  bar();
}
foo();
```

### 2. 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩 된다.

```js
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

### 3. 생성자 함수 호출

```js
생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

// 생성자 함수
function Circle(radius){
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  }
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

위의 예제에서 new 로 호출하지 않으면 일반 함수 호출이 되어 this가 원하는대로 동작하지 않는다.

### 4. apply/call/bind 메서드에 의한 간접 호출

apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

```js
function getThisBinding() {
  console.log(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this 바인딩한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3])); // {a: 1}
console.log(getThisBinding.call(thisArg, 1, 2, 3)); // {a: 1}
```

apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달하고 call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.

bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.

## 5. callback 함수 에서의 this

콜백함수의 내부에서의 this는 해당 콜백함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며, 정의하지 않은 경우에는 전역 객체를 참조한다.

```js
function getTHisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding.bind(thisArg)); // getThisBinding
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

```js
const person = {
  name: 'Lee',
  foo(callback) {
    setTimeout(callback, 100);
  },
};

person.foo(function() {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is .
});
```

person.foo의 콜백 함수가 호출되기 이전인 시점에서 this는 foo 메서드를 호출한 객체, 즉 person 객체를 가리킨다.
그러나 person.foo의 콜백 함수가 일반 함수로서 호출된 시점에서 this는 전역 객체 window를 가리킨다. 따라서 person.foo의 콜백 함수 내부에서 this.name은 window.name과 같다.

위와 같은 상황을 bind메서드로 해결이 가능하다.

```js
const person = {
  name: 'Lee',
  foo(callback) {
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function() {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee
});
```

## 6. 화살표 함수에서의 this

화살표 함수에서 this는 자신을 감싼 정적 범위이다. 전역 코드에서는 전역 객체를 가리킨다. 일종의 렉시컬 스코프와 유사하다고 볼 수 있다.

```js
const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true
```

## 참고

- [메서드와 this - ko.javascript.info](https://ko.javascript.info/object-methods)
- [this - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
- [모던 자바스크립트 deep dive](http://www.yes24.com/Product/Goods/92742567)
