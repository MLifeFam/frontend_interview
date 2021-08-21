# 프로토타입이란?

자바스크립트는 기존의 객체를 복사해서 새로운 객체를 생성하는 <b><u>프로토타입</u></b> 기반의 언어이다.

## 프로토타입 vs 클래스

클래스는 C++,Java,Python 등 객체지향 프로그래밍 언어에서 사용되는 개념이다. 클래스 기반 객체지향 프로그래밍 언어에서는 객체 생성 이전에 클래스를 정의하고 이를 통해 객체를 생성한다. <br/>

자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있다. 그리고 이것은 객체 지향의 상속 개념과 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 <b><u>프로토타입</u></b>이라고 한다. <br/>

클래스와 프로토타입은 모두 객체지향 프로그래밍의 중요한 개념인 상속을 위해 사용된다는 공통점이 있다. <br/>

::: details 자바스크립트에서의 클래스 문법

자바스크립트에도 ES6에 클래스 문법이 추가되었으나, 문법이 새로 추가된 것이지 자바스크립트가 클래스 기반의 언어가 된 것은 아니다.

:::

## 프로토타입 객체 (Prototype Object)

위에서 설명한 것처럼 프로토타입 객체는 객체지향 프로그래밍의 근간을 이루는 <b><u>객체 간 상속을 구현하기 위해 사용</u></b>된다. <br/><br/>

```JavaScript
var student = {
  name: 'Lee',
  score: 90
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작한다.
console.log(student.hasOwnProperty('name')); // true
```

<br/>

위의 예시에서 student에 hasOwnProperty 메소드가 없음에도 구문이 동작하는 이유는 student라는 객체가 Object 프로토타입을 가지게되어 Object.hasOwnProperty 메소드를 실행했기 떄문이다. <br/><br/>

이처럼 자바스크립트에서는 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 해당 프로토타입은 <b>`[[Prototype]]`</b> 이라는 내부 슬롯에 저장된다.

또한 <b>`__proto__`</b> 라는 접근자 프로퍼티를 통해 자신의 프로토타입인 <b>`[[Prototype]]`</b> 내부 슬롯에 간접적으로 접근할 수 있다.

## 객체 생성법

자바스크립트에는 프로토타입을 기반으로 다음과 같은 객체 생성이 가능하다.

1. 객체 리터럴

```JavaScript
let student = {};
student.age = "26";
```

2. Object() 생성자 함수

```JavaScript
let student = new Object();
student.age = "26";
```

3. 사용자 정의 생성자 함수

```JavaScript
function Student(age) {
	this.age = age;
}

let student = new Student(26);
```

<br/>

객체 리터럴 방식의 경우는 <b><u>내장 생성자 함수인 Object 생성자 함수로 객체를 생성하는 것을 단순화시킨 축약 표현</u></b>이기 때문에 Object() 생성자 함수와 같은 내용의 객체를 생성하게 된다. <br/>

또한 사용자 정의 생성자의 경우 내장 생성자 함수 없이 직접 생성자 함수(Constructor function)을 정의한 방식이다. <br/>

위 세가지 방식을 표로 정리해보면 다음과 같다. <br/><br/>

|    객체 생성 방식    |   엔진의 객체 생성   | 인스턴스의 prototype 객체  |
| :------------------: | :------------------: | :------------------------: |
|     객체 리터럴      | Object() 생성자 함수 |      Object.prototype      |
| Object() 생성자 함수 | Object() 생성자 함수 |      Object.prototype      |
|     생성자 함수      |     생성자 함수      | 생성자 함수 이름.prototype |

<br/>

## 프로토타입 체이닝 (Prototype chain)

자바스크립트에서 특정 객체의 속성이나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 속성 또는 메소드가 없다면 `[[Prototype]]`이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다. <br/>

이것을 <b><u>프로토타입 체인</u></b>이라고 한다.

<br/>

```JavaScript
var student = {
  name: 'Lee',
  score: 90
}


console.log(student.hasOwnProperty('name')); // true
console.log(student.__proto__ === Object.prototype); // true
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true
```

<br/>

앞서 프로토타입 객체의 예시로, student 객체의 `[[Prototype]]`이 가리키는 링크를 따라가서 student 객체의 부모 역할을 하는 프로토타입 객체(Object.prototype)의 메소드 hasOwnProperty를 호출하였기 때문에 가능한 것이다.

<br/>

### 참고 자료

-   [Poiemaweb - 프로토타입](https://poiemaweb.com/js-prototype)
-   [자바스크립트 관점에서 정리한 클래스(Class)와 프로토타입(Prototype)에 대하여](https://blog.naver.com/www8565/221860938789)
-   이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스
