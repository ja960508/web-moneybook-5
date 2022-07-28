export default function render404(main) {
	main.DOMElement.innerHTML = `<h1>페이지를 찾을 수 없습니다.(404 Not Found)</h1>
  <a class="logo" href="/"><h1 class="display-small">홈으로 가기</h1></a>`;
}
