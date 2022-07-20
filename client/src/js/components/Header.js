import '@styles/Header.css';
import icons from '../constants/icons';

class Header {
	constructor(props) {
		this.DOMElement = document.createElement('header');
		this.DOMElement.classList.add('header');
		this.render();
	}

	template() {
		return `
      <div class="wrapper"> 
        <a class="logo" is="custom-link" href="/"><h1 class="display-small">우아한 가계부</h1></a>
        <div class="month-controller">
          <button class="month-controller__prev-button">${icons.arrow}</button>
          <div>
            <div class="display-large">7월</div>
            <div class="display-small">2021</div>
          </div> 
          <button class="month-controller__next-button">${icons.arrow}</button>
        </div>
        <nav>
          <a class="moneybook active" is="custom-link" href="/">
          ${icons.document}
          </a> 
          <a class="calendar" is="custom-link" href="/calendar">
            ${icons.calendar}
          </a>
          <a class="analytics" is="custom-link" href="/analytics">
          ${icons.chart}</a>
        </nav>
      </div>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default Header;

// store에서 데이터를 다 가지고 있음
// app에서 store 구독 중임
// app에서 자식 컴포넌트(Hedaer,,) 렌더 호출할 때 데이터를 전달해야함
