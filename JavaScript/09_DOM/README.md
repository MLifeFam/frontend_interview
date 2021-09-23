# DOM

DOM(Document Object Model)은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조이다.

웹 페이지는 일종의 문서(document)다. 이 문서는 웹 브라우저를 통해 그 내용이 해석되어 웹 브라우저 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다. 동일한 문서를 사용하여 다른 형태로 나타낼 수 있다는 점에 주목할 필요가 있다. DOM은 문서를 표현하고, 저장하고, 조작하는 방법을 제공한다. DOM 은 웹 페이지의 객체 지향 표현이며, 자바스크립트와 같은 스크립팅 언어를 이용해 DOM 을 수정할 수 있다.

DOM은 일반적으로 노드 객체들로 구성된 트리 자료구조로 이루어져 있다. 트리구조로 이루어져있기 때문에 DOM을 **DOM 트리**라고 부르기도 한다.

## DOM에 접근하기

DOM은 일반적으로 자바스크립트와 같은 스크립팅 언어를 통해 접근하고 조작이 가능하다. 초기에는 자바스크립트와 DOM이 밀접하게 연결되어 있었지만, 나중에는 각각 분리되어 발전해왔다.

DOM은 프로그래밍 언어와 독립적으로 발전되었기 때문에 문서의 구조적인 표현은 단일 API를 통해 이용가능하다. 또한 DOM의 구현은 어떠한 언어에서도 가능하다는 장점이 있다.

## DOM 트리

DOM에서 모든 요소, 어트리뷰트, 텍스트는 하나의 객체이며 Document 객체의 자식이다. 요소의 중첩관계는 객체의 트리로 구조화하여 부자관계를 표현한다. DOM tree의 진입점(Entry point)는 document 객체이며 최종점은 요소의 텍스트를 나타내는 객체이다.

DOM tree는 네 종류의 노드로 구성된다.

- 문서 노드(Document Node)

  트리의 최상위에 존재하며 각각 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 한다. 즉, DOM tree에 접근하기 위한 시작점(entry point)이다.

- 요소 노드(Element Node)

  요소 노드는 HTML 요소를 표현한다. HTML 요소는 중첩에 의해 부자 관계를 가지며 이 부자 관계를 통해 정보를 구조화한다. 따라서 요소 노드는 문서의 구조를 서술한다고 말 할 수 있다. 어트리뷰트, 텍스트 노드에 접근하려면 먼저 요소 노드를 찾아 접근해야 한다. 모든 요소 노드는 요소별 특성을 표현하기 위해 HTMLElement 객체를 상속한 객체로 구성된다. (그림: DOM tree의 객체 구성 참고)

- 어트리뷰트 노드(Attribute Node)

  어트리뷰트 노드는 HTML 요소의 어트리뷰트를 표현한다. 어트리뷰트 노드는 해당 어트리뷰트가 지정된 요소의 자식이 아니라 해당 요소의 일부로 표현된다. 따라서 해당 요소 노드를 찾아 접근하면 어트리뷰트를 참조, 수정할 수 있다.

- 텍스트 노드(Text Node)

  텍스트 노드는 HTML 요소의 텍스트를 표현한다. 텍스트 노드는 요소 노드의 자식이며 자신의 자식 노드를 가질 수 없다. 즉, 텍스트 노드는 DOM tree의 최종단이다.

![DOM TREE](./images/DOMTREE.png)

## 노드의 상속 구조

DOM을 구성하는 노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체다. 하지만 노드 객체도 자바스크립트 객체이므로 **프로토타입**에 의한 상속 구조를 갖는다.

노드 객체는 공통된 기능일수록 프로토타입 체인의 상위에, 개별적인 고유 기능일수록 프로토타입 체인을 구축하여 노드 객체에 필요한 기능, 즉 프로퍼티와 메서드를 제공하는 상속구조를 갖는다.

이처럼 DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다. 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일등을 동적으로 조작할 수 있다.

## DOM 제어하기

DOM API를 통해 DOM을 제어하는 다양한 메서드가 존재한다. 하나씩 알아보도록 하자.

### DOM 접근

- Document.prototype.getElementById('아이디명') : 노드의 아이디값으로 노드에 접근한다.
- Document.prototype.getElementByTagName('태그이름') : 노드의 태그이름으로 노드에 접근한다. ex) li
- Document.prototype.getElementByClassName('클래스명') : 노드의 클래스이름으로 노드에 접근한다.
- Document.prototype.querySelector('쿼리명') : 노드의 쿼리(css 선택자)에 해당하는 첫번째 노드에 접근한다. ex) ul > li
- Document.prototype.querySelectorAll('쿼리명') : 노드의 쿼리에 해당하는 모든 노드에 접근한다.

### DOM 탐색

- Node.prototype.childNodes : 자식노드를 노드리스트에 담아 반환한다. 요소 노드 뿐만 아니라 텍스트 노드도 포함되어 있을 수 있다.
- Element.prototype.children : 자식 노드 중에서 요소노드만 담아 반환한다.
- Node.prototype.firstChild : 첫 번째 자식 노드를 반환한다. 요소 노드뿐 아니라 텍스트 노드도 포함될 수 있다.
- Node.prototype.lastChild : 마지막 자식 노드를 반환한다. 요소 노드뿐 아니라 텍스트 노드도 포함될 수 있다.
- Element.prototype.firstElementChild : 첫 번째 자식 노드를 반환한다. 요소노드만 반환한다.
- Element.prototype.lastElementChild : 마지막 자식 노드를 반환한다. 요소노드만 반환한다.
- Node.prototype.previousSibling : 자신의 이전 형제노드를 반환한다. 요소 노드뿐 아니라 텍스트 노드도 포함될 수 있다.
- Node.prototype.nextSibling : 자신의 다음 형제노드를 반환한다. 요소 노드뿐 아니라 텍스트 노드도 포함될 수 있다.
- Element.prototype.previousElementSibling : 자신의 이전형제 노드를 반환한다. 요소노드만 반환한다.
- Element.prototype.nextElementSibling : 자신의 다음형제 노드를 반환한다. 요소노드만 반환한다.

### DOM 조작

- Element.prototype.innerHTML : 요소노드의 마크업을 취득하거나 변경한다. 요소 노드의 innerHTML 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역내에 포함된 모든 HTML 마크업을 문자열로 반환한다.
- Element.prototype.insertAdjacentHTML : 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다. [참고](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)

이외에도 요소 노드를 생성하는 createElement, 자식 노드로 추가하는 appendChild, 지정한 위치에 노드를 삽입하는 insertBefore, 노드를 복사하는 cloneNode, 노드를 교체하는 replaceChild, 노드를 삭제하는 removeChild등등이 존재한다.

## 마치며

이처럼 DOM은 최근에도 WHATWG에서 단일 표준으로 계속적으로 업데이트 되고 있다. [최신 버전](https://dom.spec.whatwg.org/) 만약 더 많은 DOM API를 찾고 싶다면 MDN이나 WHATWG의 공식 문서를 보는 것 또한 좋을 것 같다.

## 참고

- [DOM 소개 - MDN](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction)
- [브라우저 환경과 다양한 명세서](https://ko.javascript.info/browser-environment)
- [DOM 트리 - ko.javascript.info](https://ko.javascript.info/dom-nodes)
- [모던 자바스크립트 deep dive](http://www.yes24.com/Product/Goods/92742567)
- [DOM - poiemaweb](https://poiemaweb.com/js-dom)
