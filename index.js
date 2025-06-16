// Firebaseの初期化
const firebaseApp = firebase.initializeApp({
  // APIキーをコピー＆ペースト
  apiKey: "AIzaSyDj0Q6-lFfLgbaXBsx3LUUo4iWV75u0fJk",
  authDomain: "csd-c1p41035.firebaseapp.com",
  projectId: "csd-c1p41035",
  storageBucket: "csd-c1p41035.firebasestorage.app",
  messagingSenderId: "747560087526",
  appId: "1:747560087526:web:ce743657010725697bf027"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// 送信ボタンがクリックされたときの処理
const sendData = () => {
  const message = document.getElementById("message").value;

  // コレクション "csd" にドキュメントを追加
  db.collection("csd").add({
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()  // 任意でタイムスタンプを追加
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    readData();  // 成功したらデータを再読み込み
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
};

// データを表示する処理
const readData = () => {
  db.collection("csd")
  .get()
  .than((data) => {
  var ol = document.getElementById("list")
  ol.innerHTML = "";  // リストをクリア
  for (var i = 0; i < data.docs.length; i++) {
    var id = data .docs[i].id;
    var message  data.docs[i].data().message;
    var li = document.createElement("li");
    li.innerHTML = message ;
    ol.appendChild(li);
  }
});
};

// ページ読み込み時に実行する処理
window.onload = function(){
  readData();
};
