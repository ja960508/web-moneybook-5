# 우아한 테크캠프 3,4 주차 미션(가계부 만들기)

## 🤗 5조(이우철, 이주암)

<div align="center">

### [데모 링크](http://54.180.132.89) | [위키](https://github.com/woowa-techcamp-2022/web-moneybook-5/wiki)
</div>
    
## 화면

### 메인 페이지

<div align="center">
  <img width="700" src="https://i.imgur.com/8cnbpg5.png">
</div>

### 달력 페이지

<div align="center">
  <img width="700" src="https://i.imgur.com/iIoX6v2.png">
</div>

### 통계 페이지

<div align="center">
  <img width="700" src="https://i.imgur.com/Nv3T1OR.gif">
</div>

### 로컬 실행법
```
git clone https://github.com/woowa-techcamp-2022/web-moneybook-5 [경로]

cd [경로] // 현재 디렉토리라면 이동할 필요 없음

// 환경변수 설정

cd client
npm install
npm run build
npm run start // 클라이언트 실행

cd ../server
npm install
npm run start // 서버 실행
```

#### 환경변수 세팅
.env 파일을 client와 server의 최상단 디렉토리에 각각 추가해줘야합니다.
``` 
// /client/.env
PORT = [clientPortNum]
API_ENDPOINT = http://localhost:[serverPortNum]/api
```
```
// /server/.env
PORT = [serverPortNum]
DB_HOST = 
DB_PORT = 
DB_USER = 
DB_PASSWORD = 
DB_NAME = 
```
