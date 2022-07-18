import '@styles/Header.css';

class Header {
	constructor(props) {
		this.DOMElement = document.createElement('header');
		this.render();
	}

	template() {
		return `
      <a class="logo" is="custom-link" href="/"><h1>우아한 가계부</h1></a>
      <div class="month-controller">
        <button class="month-controller__prev-button"></button>
        <div>
          <div>7월</div>
          <div>2021</div>
        </div> 
        <button class="month-controller__next-button"></button>
      </div>
      <nav>
        <a class="moneybook" is="custom-link" href="/"></a> 
        <a class="calendar" is="custom-link" href="/calendar"></a>
        <a class="analytics" is="custom-link" href="/analytics"></a>
      </nav>`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default Header;

// store에서 데이터를 다 가지고 있음
// app에서 store 구독 중임
// app에서 자식 컴포넌트(Hedaer,,) 렌더 호출할 때 데이터를 전달해야함
