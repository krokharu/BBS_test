const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDj0Q6-lFfLgbaXBsx3LUUo4iWV75u0fJk",
  authDomain: "csd-c1p41035.firebaseapp.com",
  projectId: "csd-c1p41035",
  storageBucket: "csd-c1p41035.firebasestorage.app",
  messagingSenderId: "747560087526",
  appId: "1:747560087526:web:ce743657010725697bf027"
});
const db = firebaseApp.firestore();
function sendData() {
  const inputEl = document.getElementById("message");
  const text = inputEl.value.trim();
  if (!text) return;

  db.collection("csd").add({
    message: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    inputEl.value = "";
    readData();
  })
  .catch(err => console.error("Error adding document:", err));
}

function readData() {
  db.collection("csd")
    .orderBy("timestamp", "asc")
    .get()
    .then(snapshot => {
      const ol = document.getElementById("list");
      ol.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");

        // --- 日付表示 ---
        let timeText = "";
        if (data.timestamp) {
          const date = data.timestamp.toDate();
          timeText = date.toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });
        }

        //本文
        const msgSpan = document.createElement("span");
        msgSpan.textContent = data.message + " ";

        // 日時
        const dateSpan = document.createElement("small");
        dateSpan.textContent = timeText;
        dateSpan.style.marginRight = "8px";
        dateSpan.style.color = "#666";

        // 削除
        const delBtn = document.createElement("button");
        delBtn.textContent = "削除";
        delBtn.style.marginLeft = "8px";
        delBtn.addEventListener("click", () => {
          deleteData(doc.id);
        });

        //追加
        li.appendChild(msgSpan);
        if (timeText) li.appendChild(dateSpan);
        li.appendChild(delBtn);

        ol.appendChild(li);
      });
    })
    .catch(err => console.error("Error reading documents:", err));
}

//削除処理
function deleteData(docId) {
  db.collection("csd").doc(docId).delete()
    .then(() => {
      readData();
    })
    .catch(err => console.error("Error deleting document:", err));
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sendButton")
          .addEventListener("click", sendData);
  readData();
});
