// src/firebase.ts
// Firebase 초기화 + 문의(inquiries) 제출 함수
// consulate-survey 프로젝트 (survey-app과 동일 프로젝트 재사용)

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqU8cncK11rpZZ-05XM9-Jz7AhzWi49Bs",
  authDomain: "consulate-survey.firebaseapp.com",
  projectId: "consulate-survey",
  storageBucket: "consulate-survey.firebasestorage.app",
  messagingSenderId: "969402850832",
  appId: "1:969402850832:web:5e92d6df5076bb43a37495",
};

// 중복 초기화 방지
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── 문의 제출 ──────────────────────────────────────────────
// 반환값: 생성된 문서 ID (= 문의번호)
export async function submitInquiry(formData: {
  name: string;
  phone: string;
  email: string;
  title: string;
  content: string;   // 앱의 "질문 내용"
  category: string;  // 10개 한글 카테고리 중 하나
  lang?: string;     // "ko" | "en" (참고용)
}): Promise<string> {
  // 토론토 기준 날짜 (YYYY-MM-DD) — 관리자 대시보드 날짜 필터용
  const dateKey = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Toronto",
  });

  const docRef = await addDoc(collection(db, "inquiries"), {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    title: formData.title,
    content: formData.content,
    category: formData.category,
    lang: formData.lang ?? "ko",
    status: "pending",
    answer: null,
    createdAt: serverTimestamp(),
    answeredAt: null,
    dateKey,
  });

  return docRef.id; // 문의번호
}

// ── 문의번호(문서 ID)로 조회 ────────────────────────────────
// 보안 규칙: allow get: if true (개별 조회는 누구나 가능)
export async function lookupInquiry(inquiryId: string): Promise<{
  found: boolean;
  status?: "pending" | "answered";
  title?: string;
  category?: string;
  content?: string;
  answer?: string | null;
  createdAt?: any;
}> {
  const id = inquiryId.trim();
  if (!id) return { found: false };
  const snap = await getDoc(doc(db, "inquiries", id));
  if (!snap.exists()) return { found: false };
  const data: any = snap.data();
  return {
    found: true,
    status: data.status,
    title: data.title,
    category: data.category,
    content: data.content,
    answer: data.answer ?? null,
    createdAt: data.createdAt ?? null,
  };
}
