# 이벤트 버블링 & 이벤트 캡처링

이번 포스팅에서는 `이벤트 버블링` 과 `이벤트 캡처링` 에 대한 내용을 알아본다.

<br />

## 이벤트 버블링 (Event Bubbling)

이벤트 버블링은 특정 요소에서 이벤트 발생 시 상위의 화면 요소로 전달되어 가는 특성을 의미한다.

<br />

```html
<div class="first">
	first <br />
	<div class="second">
		second <br />
		<div class="third">third <br /></div>
	</div>
</div>
```

<br />

```js
let divs = document.querySelectorAll("div");
divs.forEach((div) => {
	div.addEventListener("click", clickEvent);
});

function clickEvent(event) {
	alert(event.currentTarget.className);
}
```

<br />

first, second, third 라는 부모-자식 관계의 요소를 만들고, 모든 div 요소에 해당 요소의 className을 alert하는 click event를 할당했다.

이 때 third를 클릭하게 되면 이벤트는 어떤 순서로 실행이 될까? codepen 예제를 보며 확인해보자.

<br />
<iframe
	height="300"
	style="width: 100%;"
	scrolling="no"
	title="Untitled"
	src="https://codepen.io/jongminfire/embed/LYzNZpM?default-tab=html%2Cresult"
	frameborder="no"
	loading="lazy"
	allowtransparency="true"
	allowfullscreen="true"
>
	See the Pen <a href="https://codepen.io/jongminfire/pen/LYzNZpM">Untitled</a> by Jongminfire (<a href="https://codepen.io/jongminfire">@jongminfire</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br />

third 요소를 클릭하게 되면 `third → second → first` 순으로 alert가 발생하는 것을 알 수 있다. 이와 같이 **자식 요소부터 상위 요소**로 이벤트가 전달되는 것을 이벤트 버블링이라고 한다.

<br />

---

<br />

## 이벤트 캡쳐링 (Event Capturing)

앞서 살펴봤던 예제를 `first → second → third` 순으로 alert를 발생시키려면 어떻게 구현해야 할까? <br/>

이벤트 버블링과 반대로 **부모 요소에서부터 자식 요소로 이벤트를 전달**하기 위해서 이벤트 캡처링이라는 특성을 사용 할 수 있다.

<br />

```js
let divs = document.querySelectorAll("div");
divs.forEach((div) => {
	div.addEventListener("click", clickEvent, true);
});

function clickEvent(event) {
	alert(event.currentTarget.className);
}
```

위는 이벤트 캡처링으로 이벤트를 등록한 코드이다. 버블링 때의 예제와 비교했을 때 `addEventListener` 함수에 `true` 인자가 추가된 것을 확인할 수 있다.

다음은[ MDN에 나온 addEventListener 사용법](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener)이다.

```
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, useCapture, wantsUntrusted ]); // Gecko/Mozilla only
```

이처럼 `addEventListener` 함수의 option 중 이벤트의 전송 방법을 다루는 `useCapture`의 옵션을 `true`로 등록함으로써 이벤트 캡처링을 활용 할 수 있다.

버블링과 마찬가지로 codepen 예제를 보며 확인해보자.

<br />
<iframe
	height="300"
	style="width: 100%;"
	scrolling="no"
	title="Untitled"
	src="https://codepen.io/jongminfire/embed/WNZwWGM?default-tab=html%2Cresult"
	frameborder="no"
	loading="lazy"
	allowtransparency="true"
	allowfullscreen="true"
>
	See the Pen <a href="https://codepen.io/jongminfire/pen/WNZwWGM">Untitled</a> by Jongminfire (<a href="https://codepen.io/jongminfire">@jongminfire</a>) on <a href="https://codepen.io">CodePen</a>
	.
</iframe>
<br />

`addEventListener`에 `true` 옵션을 넣어줌으로써 third 요소를 클릭했을 때 `first → second → third` 순으로 alert가 발생함을 알 수 있다.

<br />

---

<br />

## 이벤트 위임 (Event Delegation)

<br />

그렇다면 부모 요소에만 이벤트를 달고 하위 요소에서 이벤트를 발생시키면 어떻게 될까?

**상위 요소에서 하위 요소들의 이벤트를 제어하는 방식**을 이벤트 위임이라고 한다.

<br />

```html
<div class="first">
	first <br />
	<div class="second">
		second <br />
		<div class="third">third <br /></div>
	</div>
</div>
```

<br />

```js
let firstDiv = document.getElementsByClassName("first")[0];

firstDiv.addEventListener("click", clickEvent);

function clickEvent(event) {
	alert("clicked");
}
```

<br />

앞선 예제에서는 모든 div 요소에 이벤트 리스너를 등록했다.

이번에는 최상단 요소인 `first` div에만 클릭 이벤트를 등록하고 클릭 시 clicked라는 alert가 나오도록 구현한다.

<br />
<iframe
	height="300"
	style="width: 100%;"
	scrolling="no"
	title="Untitled"
	src="https://codepen.io/jongminfire/embed/rNGegNV?default-tab=html%2Cresult"
	frameborder="no"
	loading="lazy"
	allowtransparency="true"
	allowfullscreen="true"
>
	See the Pen <a href="https://codepen.io/jongminfire/pen/rNGegNV">Untitled</a> by Jongminfire (<a href="https://codepen.io/jongminfire">@jongminfire</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>
<br />

codepen 예제를 살펴보면 이벤트를 등록한 `first` 뿐만 아니라 `second`와 `third`를 클릭했을 때도 alert를 확인 할 수 있다. <br/>

모든 요소에 이벤트를 등록하는 방식은 하위 요소가 새롭게 추가 될 경우 이벤트가 등록되지 않을 수 있다는 문제가 있다. 이벤트 위임을 활용하면 하위 요소의 변동에 상관없이 상위 요소에서 이벤트를 한꺼번에 제어 할 수 있다는 장점이 있다.

<br />

#### 참고

-   [MDN - addEventListener](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener)
-   [PoiemaWeb - 이벤트](https://poiemaweb.com/js-event)
-   [캡틴판교님 블로그 - 이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84---event-delegation)
