# 클래스란?

자바스크립트는 프로토타입 기반의 객체지향 언어이다. ES6에서 도입된 클래스는 기존 프로토타입 기반의 객체지향 프로그래밍보다 자바나 C#같은 클래스 기반 객체지향 프로그래밍에 익숙한 프로그래머가 더욱 빠르게 학습할 수 있도록 클래스 기반 객체지향 프로그래밍을 등장시켰다.

## 클래스와 생성자 함수

그렇다면 클래스는 단순한 프로토타입 기반 객체 생성 패턴의 문법적 설탕일까?

그러기에는 클래스만이 제공하는 몇 가지 차이점이 존재한다.

1. 클래스는 new 연산자와 함께 호출해야한다.
2. 클래스는 상속을 지원하는 extends와 super 키워드를 제공한다.
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행된다. 이는 해제 불가능하다.
5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. 다시 말해 열거되지 않는다.

이러한 차이점으로 보았을 떄 클래스는 단순한 문법적 설탕이 아닌 새로운 객체 생성 메커니즘 이라고 보는 것이 합당하다.

## 클래스 정의

```js
// 클래스 선언문
class Person {}

// 익명 클래스 표현식
const Person = class {};

// 가명 클래스 표현식
const Person = class MyClass {};
```

### 클래스와 생성자 함수의 정의 방식 비교

```js
var Person = (function() {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function() {
    console.log('Hi! My name is ' + this.name);
  };

  // 정적 메서드
  Person.sayHello = function() {
    console.log('Hello!');
  };

  // 생성자 함수 반환
  return Person;
})();
```

```js
class Person {
  // 생성자
  constructor(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log('Hello!');
  }
}
```

## 인스턴스 생성

클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

```js
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

## 메서드

클래스 몸체에는 0개 이상의 메서드만 선언할 수 있고 정의 가능한 메서드는 constructor, 프로토타입 메서드, 정적 메서드 세가지가 존재한다.

### constructor

constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드이다. 오직 클래스에 하나만 존재 가능하다. 또한, constructor를 생략하면 암묵적으로 빈 constructor가 정의된다. 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this 인스턴스 프로퍼티를 추가한다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}
```

### 프로토타입 메서드

클래스 몸체에서 정의한 메서드는 기본적으로 프로토타입 메서드가 된다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi(); // my name is Lee
```

### 정적 메서드

정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 정적 메서드
  static sayHi() {
    console.log('Hi!');
  }
}

Person.sayHi(); // Hi!
```

정적 메서드와 프로토 타입 메서드의 차이는 크게 3가지가 있다.

1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 없다.

클래스에서 정의한 메서드의 특징은 다음과 같다.

1. function 키워드를 생략한 메서드의 축약 표현을 사용한다.
2. 객체 리터럴과 다르게 메서드를 정의할 때 콤마가 필요 없다.
3. 암묵적으로 strict mode로 실행된다.
4. for...in 문이나 Object.keys 메서드 등으로 열거할 수 없다.
5. 내부 메서드 [[Construct]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.

## 프로퍼티

인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person { name : "Lee" }
```

### 접근자 프로퍼티

접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장하는데 사용하는 접근자 함수로 구성된 프로퍼티이다.

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName() {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('Kyun', 'Heo');

me.fullName = 'Jongmin Lee';
console.log(me); // {firstName: 'Jongmin', lastName: 'Lee'};

console.log(me.fullName); // Joingmin Lee
```

## 더 읽어보기

- [private](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [extends를 통한 클래스 상속](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#extends%EB%A5%BC_%ED%86%B5%ED%95%9C_%ED%81%B4%EB%9E%98%EC%8A%A4_%EC%83%81%EC%86%8Dsub_classing)

## 참고

- [Class - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/class)
- [모던 자바스크립트 deep dive](http://www.yes24.com/Product/Goods/92742567)
