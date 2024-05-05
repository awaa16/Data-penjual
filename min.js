import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAbLsq27KJU9tD9pHC8GrPUB7LgEPEQbPU",
  authDomain: "insan-cemerlang-92ee0.firebaseapp.com",
  projectId: "insan-cemerlang-92ee0",
  storageBucket: "insan-cemerlang-92ee0.appspot.com",
  messagingSenderId: "332441427242",
  appId: "1:332441427242:web:73c31309147ef1dab15253",
  measurementId: "G-JW04DZL85R"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPenjual() {
  const refDokumen = collection(db, "penjual");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      gmail : dok.data().alamat,
      noTlpn: dok.data().noTlpn,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahPenjual(nama, alamat, gmail ,noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'penjual'), {
      nama: nama,
      alamat: alamat,
      gmail: gmail,
      noTlpn: noTlpn
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}

export async function hapusPembeli(docId) {
  await deleteDoc(doc(db, "penjual", docId));
}
export async function ubahPembeli(docId, nama, alamat, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    noTlpn: noTlpn
  });
}

export async function ambilPenjual(docId) {
  const docRef = await doc(db, "penjual", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}