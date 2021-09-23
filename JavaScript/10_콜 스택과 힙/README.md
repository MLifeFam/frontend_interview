# 콜스택과 힙

구글의 V8 자바스크립트 엔진을 비롯한 대부분의 자바스크립트 엔진은 크게 <u>콜스택(Call Stack)</u>과 <u>힙(Heap)</u>의 2개 영역으로 구분할 수 있다. <br/>

또한 자바스크립트 엔진이 구동되면서 코드를 읽고 실행하는 과정에서 다음과 같은 중요한 두 가지 단계가 있는데, <br/>

1. 정보(ex.변수, 함수 등)를 특정한 장소에 저장
2. 실제로 현재 실행되고 있는 코드를 트래킹

여기서 <b>정보를 저장하는 공간이 <u>메모리 힙</u></b>이고, <b>실행 중인 코드를 트래킹하는 공간이 <u>콜 스택</u></b>이다.

<br/>

## 콜스택 (Call Stack)

<div align="center">

<br/>

![callstack](/img/javascript/callstack_and_heap/callstack.png)

###### <small> 이미지 출처 : [https://soldonii.tistory.com/53](https://soldonii.tistory.com/53) </small>

<br/>

</div>

콜스택은 메모리에 존재하는 공간 중 하나로, 코드를 읽어내려가면서 <b><u>후행할 작업들을 밑에서부터 하나씩 쌓고, 메모리 힙에서 작업 수행에 필요한 것들을 찾아서 작업을 수행하는 공간</u></b>이다. <br/>

콜스택에는 숫자 등의 원시타입 데이터가 저장된다.

<br/>

## 메모리 힙 (Memory Heap)

<div align="center">

<br/>

![heap](/img/javascript/callstack_and_heap/heap.png)

###### <small> 이미지 출처 : [https://soldonii.tistory.com/53](https://soldonii.tistory.com/53) </small>

<br/>

</div>

메모리 힙은 <b><u>변수, 함수 저장, 호출 등의 작업이 발생하는 공간</u></b>이다. <br/>

메모리 힙에는 객체 등의 참조타입 데이터가 저장된다.

<br/>

## 스택 오버플로우 (Stack Overflow)

<br/>

콜스택에는 작업이 밑에서 부터 순차적으로 하나씩 쌓이게 되는데, 특정 작업을 수행하기 위해서 다른 작업이 필요한 경우 콜스택에서 작업이 제거되는 대신 다른 작업이 위에 추가로 쌓이게 된다. <br/>

```js
function inception() {
	inception();
}
```

위 코드와 같이 함수 내부에서 자기 자신을 호출하는 재귀 함수의 경우, 작업이 수행되지 않고 계속 콜스택 위로 쌓이게 된다. <br/>

작업이 콜스택에 쌓이다가 콜스택의 한정된 공간의 크기를 넘어서게 되는데, 그것을 <b><u>스택 오버플로우(Stack Overflow)</u></b>라고 한다.

<br/>

## 가비지 컬렉터(Garbage Collector)

<br/>

우리는 콜스택과 메모리 힙의 공간이 무한하지 않고 한정적임을 알 수 있다. <br/>

그렇기 때문에 콜스택과 메모리 힙의 공간은 효율적으로 관리할 필요가 있으며, 자바스크립트는 공간을 효율적으로 관리하기 위해서 더 이상 효용가치가 없다고 판단되는 벼수, 함수 등을 함수 실행 종료 후 메모리 힙에서 제거하는 동작을 수행한다. <br/>

이 역할을 수행해주는 도구를 <b><u>가비지 컬렉터(Garbage Collector)</u></b>라고 한다.

<br/>

## 메모리 누수 (Memory Leak)

메모리 힙은 제대로 관리되지 않을 경우 메모리 공간의 범위를 넘어서 정보들이 저장되는 경우가 생기는데, 이것을 <b><u>메모리 누수(Memory Leak)</u></b>이라고 한다. <br/>

다음은 메모리 누수를 유발하는 3가지 패턴이다. <br/>

### global scope에서 전역 변수 선언

```js
var a = 1;
```

global scope에서 전역 변수를 많이 만들 경우, 메모리 누수가 발생한다

### 이벤트 리스너

```js
var elem = document.getElementById("button");
elem.addEventListner("click", onClick);
```

이벤트 리스너의 경우 사용이 완료되면 제거되어야 하는데, 제거시키지 않을 경우 계속 이벤트 리스너가 추가되기 때문에 메모리 누수가 발생한다.

### setInterval 함수

```js
setinterval(() => {});
```

`setInterval()` 함수의 경우 일정 주기마다 특정 작업을 수행하도록 지시하기 때문에, 계속 사용 중인 것으로 간주되어 가비지 컬렉터에 의해서 제거되지 못하고 메모리 공간을 계속 차지하게 된다.

<br/>

### 참고 자료

-   [soldonii님 블로그 - 자바스크립트 런타임 : 콜스택과 메모리 힙](https://soldonii.tistory.com/53#recentEntries)
-   이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스
