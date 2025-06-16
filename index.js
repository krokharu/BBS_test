// Firebase の初期化（既存コードそのまま）
const firebaseApp = firebase.initializeApp({
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
  if (!message) return;  // 空文字は無視

  db.collection("csd").add({
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById("message").value = "";  // 入力欄クリア
    readData();  // 成功したら一覧を再読み込み
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
};

// データを表示する処理
const readData = () => {
  db.collection("csd")
    .orderBy("timestamp", "asc")  // 任意：日時順にソート
    .get()
    .then((querySnapshot) => {
      const ol = document.getElementById("list");
      ol.innerHTML = "";  // リストをクリア
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = data.message;
        ol.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error reading documents: ", error);
    });
};

// ページ読み込み時に実行する処理
window.onload = () => {
  // 送信ボタンの取得
  const sendBtn = document.getElementById("sendButton");
  sendBtn.addEventListener("click", sendData);

  readData();
};
