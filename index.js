// Firebaseの初期化
const firebaseApp = firebase.initializeApp({
  // APIキーをコピー＆ペースト
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// 送信ボタンがクリックされたときの処理
const sendData = () => {

};

// データを表示する処理
const readData = () => {

};

// ページ読み込み時に実行する処理
window.onload = function(){
  readData();
};
