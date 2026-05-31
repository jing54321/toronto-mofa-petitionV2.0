//import { useState, Component } from "react";
import React, { useState, ReactNode } from "react";
// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
// Navy: #003478  Red: #CD2E3A  Light blue: #E8EEF7  Gray: #F5F6F8

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────

// 1. Props 인터페이스에 children의 타입을 반드시 명시해 줍니다.
interface ErrorBoundaryProps {
  children?: ReactNode; // 하위 컴포넌트들이 들어올 수 있도록 설정
}

// 2. State 인터페이스 선언 (이전 에러 해결용)
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// 3. Component 뒤에 정의한 두 개의 인터페이스를 차례대로 주입합니다.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  } // 👈 메서드가 끝나고 클래스는 계속 유지됩니다.

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "sans-serif", background: "#F5F6F8" }}>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚠️</div>
          <h2 style={{ color: "#003478", marginBottom: "#8px" }}>오류가 발생했습니다</h2>
          <p style={{ color: "#667", fontSize: "14px", marginBottom: "24px", textAlign: "center" }}>
            Something went wrong. Please try refreshing the page.
          </p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            style={{ background: "#003478", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 28px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}
          >
            🏠 홈으로 / Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
} // 👈 클래스가 여기서 완벽하게 닫힙니다.

const LAST_UPDATED = "2026년 5월";  // ← 업데이트 시 이 값만 수정

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans KR', 'Inter', sans-serif; background: #F5F6F8; color: #1a1a2e; -webkit-font-smoothing: antialiased; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── Header ─────────────────────────────────────────── */
  .header {
    background: linear-gradient(135deg, #003478 0%, #004ba0 100%);
    padding: 0 1.25rem;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 12px rgba(0,0,0,0.22);
  }
  .header-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .header-flag { font-size: 22px; }
  .header-title { color: #fff; font-size: 13.5px; font-weight: 700; line-height: 1.25; }
  .header-title span { display: block; font-size: 11px; font-weight: 400; opacity: 0.75; margin-top: 1px; }
  .header-tel { color: rgba(255,255,255,0.8); font-size: 12px; display: flex; align-items: center; gap: 4px; }

  /* ── Progress / Breadcrumb ───────────────────────────── */
  .progress-wrap {
    background: #fff;
    border-bottom: 1px solid #e4eaf6;
    padding: 10px 1.25rem 0;
  }
  .progress-steps {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .progress-steps::-webkit-scrollbar { display: none; }
  .p-step {
    display: flex;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
  }
  .p-dot {
    width: 24px; height: 24px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    transition: all 0.2s;
    border: 2px solid #c8d3e8;
    background: #fff;
    color: #8899bb;
    flex-shrink: 0;
  }
  .p-dot.active { background: #003478; border-color: #003478; color: #fff; box-shadow: 0 0 0 3px rgba(0,52,120,0.15); }
  .p-dot.done { background: #003478; border-color: #003478; color: #fff; opacity: 0.45; }
  .p-label {
    font-size: 11px; color: #8899bb; margin-left: 5px;
    white-space: nowrap; max-width: 90px; overflow: hidden; text-overflow: ellipsis;
  }
  .p-label.active { color: #003478; font-weight: 700; }
  .p-label.clickable { cursor: pointer; text-decoration: underline dotted; text-underline-offset: 2px; }
  .p-label.clickable:hover { color: #CD2E3A; }
  .p-line {
    width: 20px; height: 2px;
    background: #c8d3e8;
    margin: 0 3px;
    flex-shrink: 0;
  }
  .p-line.done { background: #003478; opacity: 0.35; }
  .progress-bar-track {
    height: 3px; background: #e8eef7; border-radius: 2px;
    margin-bottom: 0; margin-top: 4px;
  }
  .progress-bar-fill {
    height: 100%; background: linear-gradient(90deg, #CD2E3A, #e85d6a); border-radius: 2px;
    transition: width 0.4s cubic-bezier(.4,0,.2,1);
  }

  /* ── Main ────────────────────────────────────────────── */
  .main { flex: 1; padding: 1.25rem 1.25rem 2.5rem; max-width: 680px; margin: 0 auto; width: 100%; }

  /* ── Home ────────────────────────────────────────────── */
  .page-title { margin-bottom: 1.25rem; }
  .page-title h1 { font-size: 20px; font-weight: 700; color: #003478; }
  .page-title p { font-size: 13.5px; color: #556; margin-top: 5px; line-height: 1.55; }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (max-width: 400px) { .service-grid { grid-template-columns: 1fr; } }

  /* ── 서비스 카드 — 왼쪽 컬러 바 + 아이콘 박스 ── */
  .service-card {
    background: #fff;
    border: 1px solid #e4eaf6;
    border-radius: 14px;
    padding: 14px 14px 12px 16px;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.12s;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .service-card::after {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: #c8d3e8;
    border-radius: 14px 0 0 14px;
    transition: background 0.15s;
  }
  .service-card:hover { border-color: #003478; box-shadow: 0 4px 16px rgba(0,52,120,0.10); transform: translateY(-2px); }
  .service-card:hover::after { background: var(--sc-accent, #003478); }
  .service-card:active { transform: scale(0.98); box-shadow: none; }
  .sc-header { display: flex; align-items: center; gap: 9px; }
  .sc-icon-box {
    width: 36px; height: 36px; border-radius: 10px;
    background: #eef2f9;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
    transition: background 0.15s;
  }
  .service-card:hover .sc-icon-box { background: #dce6f7; }
  .sc-title { font-size: 14.5px; font-weight: 700; color: #003478; line-height: 1.25; }
  .sc-desc { font-size: 11px; color: #889; line-height: 1.45; padding-left: 1px; margin-top: 7px; }
  .sc-arrow { font-size: 13px; color: #c8d3e8; margin-top: auto; text-align: right; padding-top: 4px; }

  .info-banner {
    margin-top: 1.1rem;
    background: #fff;
    border: 1px solid #e0e7f3;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 13px;
    color: #556;
    line-height: 1.65;
  }
  .info-banner strong { color: #003478; }
  .updated-note {
    margin-top: 10px;
    font-size: 11px;
    color: #99aabb;
    text-align: right;
  }

  /* ── Question page ───────────────────────────────────── */
  .question-section { margin-bottom: 1rem; }
  .service-chip {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11.5px; font-weight: 700; color: #fff;
    background: var(--chip-color, #003478);
    padding: 4px 12px 4px 8px;
    border-radius: 20px;
    margin-bottom: 12px;
    letter-spacing: 0.02em;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }
  .q-title { font-size: 19px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; line-height: 1.35; }
  .q-sub { font-size: 13px; color: #667; margin-bottom: 1.1rem; line-height: 1.55; background: #f7f9fd; border-left: 3px solid #c8d3e8; padding: 8px 10px; border-radius: 0 8px 8px 0; }

  /* ── 옵션 카드 — 이모지 박스 통일 ── */
  .option-list { display: flex; flex-direction: column; gap: 8px; }
  .option-card {
    background: #fff;
    border: 1px solid #e4eaf6;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: border-color 0.14s, background 0.14s, box-shadow 0.14s;
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .option-card:hover { border-color: #003478; background: #f4f7ff; box-shadow: 0 2px 10px rgba(0,52,120,0.09); }
  .option-card:active { transform: scale(0.99); }
  .oc-icon-box {
    width: 40px; height: 40px; border-radius: 10px;
    background: #f0f4fb;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
    transition: background 0.13s;
  }
  .option-card:hover .oc-icon-box { background: #dce6f7; }
  .oc-content { flex: 1; min-width: 0; }
  .oc-title { font-size: 14px; font-weight: 600; color: #1a1a2e; line-height: 1.3; }
  .oc-desc { font-size: 11.5px; color: #889; margin-top: 2px; line-height: 1.4; }
  .oc-chev { color: #c8d3e8; font-size: 18px; flex-shrink: 0; }

  /* ── Result page ─────────────────────────────────────── */
  .result-badge {
    display: inline-flex; align-items: center; gap: 6px;
    color: #fff;
    padding: 5px 12px; border-radius: 20px;
    font-size: 12px; font-weight: 600;
    margin-bottom: 0.9rem;
    letter-spacing: 0.02em;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  }
  .result-title { font-size: 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; line-height: 1.3; }
  .result-sub { font-size: 12.5px; color: #889; margin-bottom: 1.2rem; }

  .info-card {
    background: #fff;
    border: 1px solid #e4eaf6;
    border-radius: 12px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .info-card-header {
    padding: 9px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f5f7fc;
    border-bottom: 1px solid #eef1f8;
  }
  .info-card-icon { font-size: 15px; }
  .info-card-title { font-size: 12.5px; font-weight: 700; color: #003478; letter-spacing: 0.01em; flex: 1; }
  .info-card-count { font-size: 11px; color: #99a; background: #eef1f8; padding: 2px 7px; border-radius: 10px; font-weight: 600; }
  .info-card-body { padding: 10px 14px; }

  /* ── 서류 항목 — 순번 번호 ── */
  .doc-item {
    display: flex; align-items: flex-start; gap: 9px;
    padding: 6px 0;
    border-bottom: 1px solid #f2f4f9;
    font-size: 13px; line-height: 1.55; color: #334;
  }
  .doc-item:last-child { border-bottom: none; }
  .doc-num {
    width: 20px; height: 20px; border-radius: 50%;
    background: #e6eef8; color: #1a5fa5;
    font-size: 10.5px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 2px;
  }
  .doc-bullet { font-weight: 700; flex-shrink: 0; margin-top: 2px; }

  .cost-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #f2f4f9; font-size: 13px; }
  .cost-row:last-child { border-bottom: none; }
  .cost-label { color: #556; }
  .cost-value { font-weight: 700; color: #003478; }

  /* ── 주의사항 — ⚠️ 강조 배경 ── */
  .notice-item {
    display: flex; align-items: flex-start; gap: 8px;
    padding: 5px 0;
    font-size: 12.5px; line-height: 1.55; color: #445;
  }
  .notice-item.warn {
    background: #fffbee;
    border-radius: 7px;
    padding: 6px 8px;
    margin: 2px -4px;
    color: #5a3d00;
  }
  .notice-icon { flex-shrink: 0; margin-top: 1px; }

  /* ── 예약 버튼 — sticky 고정 ── */
  .booking-sticky {
    position: sticky;
    bottom: 0;
    background: linear-gradient(to top, #F5F6F8 70%, transparent);
    padding: 12px 0 4px;
    margin-top: 8px;
    z-index: 10;
  }
  .booking-btn {
    display: block; width: 100%;
    background: linear-gradient(135deg, #CD2E3A 0%, #b0222d 100%);
    color: #fff;
    border: none; border-radius: 12px;
    padding: 14px;
    font-size: 15px; font-weight: 700;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.1s;
    letter-spacing: 0.01em;
    box-shadow: 0 3px 12px rgba(205,46,58,0.30);
  }
  .booking-btn:hover { opacity: 0.92; transform: translateY(-1px); }
  .booking-btn:active { transform: scale(0.99); }

  .booking-secondary {
    display: block; width: 100%;
    background: #fff;
    color: #003478;
    border: 1.5px solid #003478;
    border-radius: 12px;
    padding: 12px;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    margin-top: 8px;
    transition: background 0.15s;
  }
  .booking-secondary:hover { background: #eef3fb; }

  /* ── Nav buttons ─────────────────────────────────────── */
  .nav-row {
    display: flex; gap: 8px;
    margin-bottom: 1.1rem;
  }
  .nav-btn {
    display: flex; align-items: center; gap: 5px;
    background: #fff; color: #445;
    border: 1px solid #dde3ef; border-radius: 8px;
    padding: 7px 13px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.13s;
  }
  .nav-btn:hover { background: #eef3fb; border-color: #003478; color: #003478; }
  .nav-btn.home { margin-left: auto; }

  /* ── Footer ──────────────────────────────────────────── */
  .footer {
    background: #002a5e;
    color: rgba(255,255,255,0.65);
    text-align: center;
    padding: 1.1rem 1rem;
    font-size: 11px;
    line-height: 1.75;
  }
  .footer a { color: rgba(255,255,255,0.8); text-decoration: none; }
  .footer a:hover { text-decoration: underline; }

  /* ── Language toggle ─────────────────────────────────── */
  .lang-btn {
    background: rgba(255,255,255,0.12);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.13s;
    letter-spacing: 0.03em;
    flex-shrink: 0;
  }
  .lang-btn:hover { background: rgba(255,255,255,0.25); }

  /* ── Utility boxes ───────────────────────────────────── */
  .highlight-box {
    background: #fffbee;
    border: 1.5px solid #ffc107;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 13px;
    color: #4a3800;
    line-height: 1.5;
    margin-bottom: 11px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .info-box {
    background: #f0f5ff;
    border: 1px solid #c0d0ef;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 13px;
    color: #223;
    line-height: 1.5;
    margin-bottom: 11px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  /* ── Print ───────────────────────────────────────────── */
  @media print {
    .header, .progress-wrap, .nav-row, .footer,
    .booking-btn, .booking-secondary, .highlight-box,
    .lang-btn, .updated-note { display: none !important; }
    .main { padding: 0; max-width: 100%; }
    .info-card { break-inside: avoid; box-shadow: none; border: 1px solid #ccc; }
    .result-badge { background: #003478 !important; -webkit-print-color-adjust: exact; }
  }

  /* ── Search ──────────────────────────────────────────── */
  .search-wrap {
    position: relative;
    margin-bottom: 1rem;
  }
  .search-input {
    width: 100%;
    padding: 11px 42px 11px 40px;
    border: 1.5px solid #dde3ef;
    border-radius: 12px;
    font-size: 14px;
    font-family: inherit;
    background: #fff;
    color: #1a1a2e;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .search-input:focus {
    border-color: #003478;
    box-shadow: 0 0 0 3px rgba(0,52,120,0.1);
  }
  .search-input::placeholder { color: #aab; }
  .search-icon {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 16px; pointer-events: none;
  }
  .search-clear {
    position: absolute; right: 10px; top: 50%;
    transform: translateY(-50%);
    background: #e8eef7; border: none; border-radius: 50%;
    width: 22px; height: 22px; font-size: 12px;
    cursor: pointer; color: #667;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.12s;
  }
  .search-clear:hover { background: #c8d3e8; }

  .search-results { display: flex; flex-direction: column; gap: 9px; }
  .search-result-card {
    background: #fff;
    border: 1.5px solid #dde3ef;
    border-radius: 12px;
    padding: 12px 14px;
    cursor: pointer;
    transition: border-color 0.14s, box-shadow 0.14s;
    text-align: left;
    width: 100%;
  }
  .search-result-card:hover { border-color: #003478; box-shadow: 0 2px 10px rgba(0,52,120,0.09); }
  .search-result-title { font-size: 14.5px; font-weight: 700; color: #003478; margin-bottom: 3px; }
  .search-result-path { font-size: 11.5px; color: #99a; line-height: 1.4; }
  .search-result-snippet { font-size: 12px; color: #667; margin-top: 5px; line-height: 1.45; }
  .search-result-snippet mark { background: #fff3b0; color: #333; border-radius: 2px; padding: 0 1px; font-style: normal; }
  .search-empty { text-align: center; padding: 2rem 1rem; color: #889; font-size: 14px; }
  .search-count { font-size: 12px; color: #889; margin-bottom: 10px; }

  /* ── FAQ ────────────────────────────────────────────── */
  .faq-btn {
    background: none; border: none; cursor: pointer;
    font-size: 20px; padding: 2px 4px; line-height: 1;
    opacity: 0.55; transition: opacity 0.15s, transform 0.15s;
    flex-shrink: 0;
  }
  .faq-btn:hover { opacity: 1; transform: scale(1.15); }

  .faq-item {
    background: #fff;
    border: 1.5px solid #e4eaf6;
    border-radius: 12px;
    margin-bottom: 9px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .faq-question {
    width: 100%; text-align: left;
    background: none; border: none; cursor: pointer;
    padding: 13px 14px;
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    font-size: 14px; font-weight: 600; color: #1a1a2e;
    font-family: inherit;
    transition: background 0.13s;
    line-height: 1.4;
  }
  .faq-question:hover { background: #f7f9fd; }
  .faq-question.open { background: #f0f5ff; color: #003478; border-bottom: 1px solid #e4eaf6; }
  .faq-chevron { font-size: 14px; color: #99a; flex-shrink: 0; transition: transform 0.2s; }
  .faq-chevron.open { transform: rotate(180deg); color: #003478; }
  .faq-answer {
    padding: 11px 14px 13px;
    font-size: 13px; color: #445; line-height: 1.65;
    white-space: pre-line;
    background: #fafbfd;
  }

  /* ── Booking Modal ───────────────────────────────────── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex; align-items: flex-end; justify-content: center;
    z-index: 200;
    animation: fadeIn 0.18s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .modal-sheet {
    background: #fff;
    border-radius: 20px 20px 0 0;
    padding: 0 0 env(safe-area-inset-bottom, 0);
    width: 100%; max-width: 680px;
    animation: slideUp 0.22s cubic-bezier(.4,0,.2,1);
    max-height: 85vh; overflow-y: auto;
  }
  @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
  .modal-handle {
    width: 36px; height: 4px; border-radius: 2px;
    background: #dde3ef; margin: 12px auto 0;
  }
  .modal-header {
    padding: 16px 20px 12px;
    border-bottom: 1px solid #f0f2f7;
  }
  .modal-title { font-size: 17px; font-weight: 700; color: #0a1929; }
  .modal-sub { font-size: 12.5px; color: #778; margin-top: 3px; }
  .modal-body { padding: 14px 20px; }
  .modal-checklist { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .modal-check-item {
    display: flex; align-items: flex-start; gap: 10px;
    background: #f7f9fd; border-radius: 10px;
    padding: 10px 12px; font-size: 13px; color: #334;
    line-height: 1.45;
  }
  .modal-check-num {
    width: 22px; height: 22px; border-radius: 50%;
    background: #ddeaf8; color: #185fa5;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .modal-notice {
    background: #fffbee; border-radius: 8px;
    padding: 10px 12px; font-size: 12.5px; color: #5a3d00;
    margin-bottom: 16px; line-height: 1.55;
  }
  .modal-footer { padding: 0 20px 20px; display: flex; flex-direction: column; gap: 8px; }
  .modal-confirm-btn {
    display: block; width: 100%;
    background: #b8192a; color: #fff;
    border: none; border-radius: 12px;
    padding: 15px; font-size: 15px; font-weight: 700;
    cursor: pointer; text-align: center; text-decoration: none;
    letter-spacing: .01em;
    box-shadow: 0 3px 12px rgba(184,25,42,0.28);
    transition: opacity .15s;
  }
  .modal-confirm-btn:hover { opacity: .92; }
  .modal-cancel-btn {
    display: block; width: 100%;
    background: none; color: #778;
    border: 1px solid #dde3ef; border-radius: 12px;
    padding: 12px; font-size: 14px; font-weight: 500;
    cursor: pointer; text-align: center;
    transition: background .13s;
  }
  .modal-cancel-btn:hover { background: #f5f6f8; }

  /* ── Focus (accessibility) ───────────────────────────── */
  button:focus-visible, a:focus-visible {
    outline: 2px solid #CD2E3A;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

// ─── DATA: Decision tree ───────────────────────────────────────────────────

const TREE = {
  home: { type: "home" },

  passport_start: {
    type: "question",
    service: "passport",
    stepLabel: "여권",
    breadcrumb: ["홈", "여권"],
    question: "여권이 언제까지 필요하신가요?",
    sub: "긴급 여부에 따라 발급 방법과 절차가 완전히 달라집니다.",
    options: [
      { id: "passport_urgent_age", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권(사진부착식) 당일 발급 — 긴급 귀국·출국 사유 필요" },
      { id: "passport_normal_age", icon: "📅", title: "여유 있음 (1주일 이상)", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" },
    ],
  },

  passport_urgent_age: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "긴급"],
    question: "신청자의 연령은?",
    sub: "만 18세 기준으로 필요 서류가 달라집니다.",
    options: [
      { id: "passport_urgent_status", icon: "👤", title: "만 18세 이상 (성인)", desc: "본인 직접 신청" },
      { id: "passport_minor_urgent_who", icon: "👶", title: "만 18세 미만 (미성년자)", desc: "법정대리인 동반 또는 서류 필요" },
    ],
  },

  passport_urgent_status: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "긴급", "성인"],
    question: "현재 여권 상태는?",
    sub: "여권 유무에 따라 준비 서류가 다릅니다.",
    options: [
      { id: "passport_urgent_who", icon: "✅", title: "여권 있음 (재발급)", desc: "만료 임박·만료·훼손 등" },
      { id: "passport_urgent_lost_who", icon: "❌", title: "여권 분실", desc: "경찰 분실 신고(Police Report) 먼저 필수" },
      { id: "passport_urgent_who_new", icon: "🆕", title: "여권 없음 (신규)", desc: "한국 여권이 한 번도 없었던 경우" },
    ],
  },

  passport_normal_age: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반"],
    question: "신청자의 연령은?",
    sub: "만 18세 기준으로 필요 서류가 달라집니다.",
    options: [
      { id: "passport_adult", icon: "👤", title: "만 18세 이상 (성인)", desc: "본인 직접 신청" },
      { id: "passport_minor", icon: "👶", title: "만 18세 미만 (미성년자)", desc: "법정대리인 동반 또는 서류 필요" },
    ],
  },

  passport_adult: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인"],
    question: "현재 여권 상태는?",
    sub: "여권 유무에 따라 준비 서류가 다릅니다.",
    options: [
      { id: "passport_adult_have", icon: "✅", title: "재발급 (여권 있음)", desc: "만료 임박 또는 만료된 여권" },
      { id: "passport_adult_lost", icon: "❌", title: "분실 재발급", desc: "경찰 신고 후 재발급" },
      { id: "passport_adult_new", icon: "🆕", title: "신규 발급 (여권 없음)", desc: "최초 여권 발급 — 반드시 방문 신청" },
    ],
  },

  passport_adult_have: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인", "재발급"],
    question: "재발급 사유가 무엇인가요?",
    sub: "사유에 따라 수수료와 준비 서류가 달라집니다.",
    options: [
      { id: "passport_adult_have_normal", icon: "📅", title: "만료 또는 만료 임박", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" },
      { id: "passport_residual", icon: "⏳", title: "훼손 · 성명변경 · 정보정정", desc: "유효기간이 남아있는 여권 재발급 — 잔여기간 수수료 적용" },
    ],
  },

  passport_adult_new: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인", "신규"],
    question: "신규 발급 유형은?",
    sub: "신규 발급은 기존 여권이 없으므로 온라인 신청 불가, 반드시 방문 신청입니다.",
    options: [
      { id: "passport_new_normal", icon: "🆕", title: "일반 신규 발급", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" },
    ],
  },

  passport_adult_lost: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인", "분실"],
    question: "분실 후 재발급",
    sub: "⚠️ 방문 전 반드시 경찰 분실 신고(Police Report)를 먼저 완료하세요.",
    options: [
      { id: "passport_lost_normal", icon: "📅", title: "일반 발급 (여유 있음)", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" },
    ],
  },

  // ── 성인 긴급 — 체류신분 분기 (재발급/분실용 — eTA 포함) ──
  passport_urgent_who: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "긴급", "체류신분"],
    question: "캐나다 체류 신분은?",
    sub: "체류신분에 따라 지참해야 하는 서류가 달라집니다.",
    options: [
      { id: "passport_urgent_pr", icon: "🟢", title: "영주권자 (PR Card)", desc: "Permanent Resident" },
      { id: "passport_urgent_citizen", icon: "🍁", title: "시민권자", desc: "Canadian Citizen — 국적상실신고 관련 주의사항 있음" },
      { id: "passport_urgent_visa", icon: "📋", title: "비자 소지자", desc: "학생·취업·방문 비자 등" },
      { id: "passport_urgent_eta", icon: "✈️", title: "단기 방문자 (eTA)", desc: "한국에서 캐나다로 관광·방문 중인 경우" },
    ],
  },

  // ── 성인 긴급 — 신규 전용 (eTA 제외) ──
  passport_urgent_who_new: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "긴급", "신청 사유"],
    question: "어떤 이유로 처음 여권을 발급받으시나요?",
    sub: "긴급 단수여권도 신규 사유에 따라 지참 서류가 다릅니다.",
    options: [
      { id: "passport_urgent_new_dual", icon: "🧬", title: "선천적 복수국적자 — 한국 여권 미발급", desc: "캐나다 출생, 성인 전 한국 여권 발급 없이 성인이 된 경우" },
      { id: "passport_urgent_new_recovery", icon: "🇰🇷", title: "국적 회복 후 첫 여권 신청", desc: "국적회복 허가를 받은 후 처음 여권 신청" },
    ],
  },

  passport_urgent_new_dual: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "긴급", "선천적 복수국적자"],
    title: "⚡ 긴급 단수여권 — 신규 · 선천적 복수국적자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "기본증명서 (상세) — 한국 발급, 3개월 이내 (부/모 한국인 표기 확인)",
      "가족관계증명서 (상세) — 한국 발급, 3개월 이내",
      "캐나다 출생증명서 (Birth Certificate) 원본 + 사본",
      "캐나다 여권 또는 시민권증서 원본 + 사본",
      "부 또는 모의 한국 여권 또는 신분증 사본",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 등)",
      "  ▸ 만 18~37세 남성: 병역 관련 서류 — 방문 전 반드시 전화 상담 (416-920-3809)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 한국 출생신고(가족관계등록부 등재)가 완료되어 있어야 합니다. 미등록 시 당일 발급 불가 — 사전 전화 필수 (416-920-3809).",
      "⚠️ 만 18~37세 남성 복수국적자: 병역 서류 미비 시 발급 거부될 수 있음 — 방문 전 반드시 전화 상담.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "단수여권은 1회용 — 귀국 후 반드시 정식 전자여권 별도 신청.",
      "수령: 방문 당일 직접 수령만 가능 (우편·DHL 불가).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_new_recovery: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "긴급", "국적 회복"],
    title: "⚡ 긴급 단수여권 — 신규 · 국적 회복 후",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "국적회복 허가서 원본 + 사본 (법무부 발급)",
      "기본증명서 (상세) — 3개월 이내",
      "가족관계증명서 (상세) — 3개월 이내",
      "캐나다 여권 또는 PR Card 원본 + 사본",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 등)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 국적회복 허가서 없이는 발급 불가 — 사전 준비 필수.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "단수여권은 1회용 — 귀국 후 반드시 정식 전자여권 별도 신청.",
      "수령: 방문 당일 직접 수령만 가능 (우편·DHL 불가).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_lost_who: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "긴급", "체류신분"],
    question: "캐나다 체류 신분은?",
    sub: "⚠️ 분실 시 경찰 신고(Police Report)를 먼저 완료하세요. 체류신분에 따라 서류가 달라집니다.",
    options: [
      { id: "passport_urgent_lost_pr", icon: "🟢", title: "영주권자 (PR Card)", desc: "PR카드 분실 여부에 따라 서류 다름" },
      { id: "passport_urgent_lost_citizen", icon: "🍁", title: "시민권자", desc: "시민권증서 지참 필요" },
      { id: "passport_urgent_lost_visa", icon: "📋", title: "비자 소지자", desc: "비자 사본·기본증명서 등으로 신분 확인" },
      { id: "passport_urgent_lost_eta", icon: "✈️", title: "단기 방문자 (eTA)", desc: "항공권 + eTA 승인서류 필수" },
    ],
  },

  // ── 성인 긴급 — 체류신분별 결과 ──
  passport_urgent_pr: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "긴급", "영주권자"],
    title: "⚡ 긴급 단수여권 — 영주권자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "현재 여권 원본 + 흑백 사본 1부",
      "PR Card 원본 + 흑백 사본 (앞뒷면)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류:",
      "  ▸ 친족 사망·위독: 사망증명서 / 진단서",
      "  ▸ 사업상 긴급: 계약서 / 초청장 / 회사 공문",
      "  ▸ 긴급 귀국: 항공권 사본 + 귀국 사유 설명서",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 단수여권은 1회용 — 귀국 후 반드시 정식 전자여권 재발급 신청.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "캐나다 재입국 시: 단수여권만으로는 불가 — PR카드 반드시 함께 지참.",
      "긴급사유 수수료 감면: 증빙서류를 방문 당일 제출하지 못해도 6개월 이내 사후 제출로 차액 환급 신청 가능 (신청한 공관에서만 가능).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_citizen: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "긴급", "시민권자"],
    title: "⚡ 긴급 단수여권 — 시민권자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "현재 여권 원본 + 흑백 사본 1부",
      "캐나다 여권 원본 + 흑백 사본 1부",
      "캐나다 시민권증서 원본 + 흑백 사본 1부",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 / 계약서 등)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 시민권 취득 시 한국 국적이 자동 상실됩니다 — 국적상실신고가 기본증명서에 아직 반영되지 않은 경우 별도 처리가 필요할 수 있습니다. 방문 전 전화 문의 권장 (416-920-3809).",
      "⚠️ 단수여권은 1회용 — 귀국 후 정식 전자여권 재발급 및 국적상실신고 처리 필요.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "캐나다 재입국 시: 캐나다 여권 + 시민권증서 지참.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_visa: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "긴급", "비자 소지자"],
    title: "⚡ 긴급 단수여권 — 비자 소지자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "현재 여권 원본 + 흑백 사본 1부",
      "캐나다 비자 원본 + 흑백 사본 (학생·취업·방문 비자 등)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 / 계약서 등)",
      "  ▸ 만 25~37세 남성 병역의무자: 병역 증빙서류 (해당 시)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 단수여권은 1회용 — 귀국 후 반드시 정식 전자여권 재발급 신청.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "캐나다 재입국 시: 단수여권만으로는 불가 — 기존 캐나다 비자 + 새 여권 지참.",
      "새 여권 발급 후 비자 이전(IRCC 온라인 신청) 또는 새 비자 신청이 필요할 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_eta: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "긴급", "단기방문(eTA)"],
    title: "⚡ 긴급 단수여권 — 단기 방문자 (eTA)",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "현재 여권 원본 + 흑백 사본 1부",
      "왕복 항공권 (e-ticket) 출력본 — 귀국 일정 확인 필수",
      "eTA 승인서류 출력본",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권으로 대체 가능한 경우도 있음)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 단기 방문 중 여권 만료가 임박한 경우, 귀국 일정이 촉박할 수 있으니 항공권을 반드시 지참하세요.",
      "⚠️ 단수여권은 1회용 — 귀국 후 한국에서 정식 전자여권 발급 필요.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "캐나다 재입국 시: 단수여권만으로는 불가 — 기존 여권의 유효한 eTA로 재입국 가능 여부 IRCC에 확인.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  // ── 분실 긴급 — 체류신분별 결과 ──
  passport_urgent_lost_pr: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "긴급", "영주권자"],
    title: "⚡ 긴급 단수여권 — 여권 분실 · 영주권자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 현지 경찰서 발급 필수",
      "PR Card 원본 + 흑백 사본 (앞뒷면)",
      "  ▸ PR카드도 분실 시: 방문 전 반드시 전화 상담 필수 (416-920-3809)",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 등)",
      "  ▸ 신분 확인용: 기본증명서 (상세) — 여권·신분증 모두 없는 경우",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가 — 반드시 방문 전 경찰 신고 완료.",
      "⚠️ PR카드도 분실한 경우: 신분 확인이 어려워 발급이 제한될 수 있음 — 사전 전화 상담 필수.",
      "단수여권 1회용 — 귀국 후 정식 전자여권 재발급 필요.",
      "PR카드 분실은 IRCC에 별도 신고 및 재발급 신청 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_lost_citizen: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "긴급", "시민권자"],
    title: "⚡ 긴급 단수여권 — 여권 분실 · 시민권자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 현지 경찰서 발급 필수",
      "캐나다 여권 원본 + 흑백 사본",
      "캐나다 시민권증서 원본 + 흑백 사본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
      "  ▸ 기본증명서 (상세) — 신분 추가 확인 필요 시",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 시민권 취득시 한국 국적 자동 상실 — 국적상실신고 미완료 시 긴급여권 발급이 제한될 수 있습니다. 방문 전 반드시 전화 상담 필수 (416-920-3809).",
      "단수여권 1회용 — 귀국 후 정식 전자여권 재발급 및 국적상실신고 처리 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_lost_visa: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "긴급", "비자 소지자"],
    title: "⚡ 긴급 단수여권 — 여권 분실 · 비자 소지자",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 현지 경찰서 발급 필수",
      "캐나다 비자 사본 (분실하지 않은 경우) 또는 IRCC 체류자격 확인서류",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
      "  ▸ 기본증명서 (상세) — 여권 없어 신분 확인 불가 시 필수",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 비자도 함께 분실한 경우: 신분 확인이 어려울 수 있음 — 사전 전화 상담 권장 (416-920-3809).",
      "단수여권 1회용 — 귀국 후 정식 전자여권 재발급 필요.",
      "여행증명서가 필요한 경우: 영사관에 사전 전화 문의 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_lost_eta: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "긴급", "단기방문(eTA)"],
    title: "⚡ 긴급 단수여권 — 여권 분실 · 단기 방문자 (eTA)",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 현지 경찰서 발급 필수",
      "왕복 항공권 (e-ticket) 출력본",
      "eTA 승인서류 출력본 (이메일 조회 가능)",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "  ▸ 기본증명서 (상세) — 신분 확인 추가 필요 시",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 단기 방문 중 여권 분실은 귀국이 최우선 — 항공권을 반드시 지참하세요.",
      "단수여권 1회용 — 귀국 후 한국에서 정식 전자여권 발급 필요.",
      "eTA는 여권번호에 연동되므로 단수여권으로 캐나다 재입국 불가 — 귀국 전용 서류입니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  // ── 미성년자 긴급 — 친권 분기 ──
  passport_minor_urgent_who: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "친권 상황"],
    question: "부모 친권 상황은?",
    sub: "긴급 상황이라도 친권 상황에 따라 지참 서류가 달라집니다. 방문 전 미리 확인하세요.",
    options: [
      { id: "passport_urgent_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "부·모 여권 사본 모두 필요" },
      { id: "passport_urgent_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "단독친권자만 방문·서명" },
      { id: "passport_urgent_minor_joint", icon: "⚖️", title: "이혼 — 공동친권 (두 분 모두 친권)", desc: "양쪽 동의 필요" },
      { id: "passport_urgent_minor_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 방문" },
      { id: "passport_urgent_minor_korea", icon: "🇰🇷", title: "법정대리인이 한국에 거주", desc: "인감도장 + 인감증명서 필요 — 긴급 시 사전 전화 필수" },
    ],
  },

  passport_urgent_minor_married: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "공동친권"],
    title: "⚡ 미성년자 긴급 단수여권 — 부모 혼인 중 (공동친권)",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "자녀 여권 원본 + 흑백 사본 (있는 경우) / 없으면 기본증명서 또는 가족관계증명서",
      "법정대리인 동의서 — 부모 2인 인적사항 기재, 방문하는 1인이 서명",
      "방문하는 법정대리인(부 또는 모) 여권 원본",
      "비방문 법정대리인(부 또는 모) 여권 사본 1부",
      "자녀 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 등)",
    ],
    costs: [
      { label: "긴급여권 수수료 (만 8세 이상)", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급여권 수수료 (만 8세 미만)", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 법정대리인 반드시 동반 방문 — 자녀 단독 방문 불가.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "단수여권 1회용 — 여행 목적 달성 후 정식 전자여권 별도 신청.",
      "캐나다 재입국 시: 단수여권만으로는 불가 — 자녀 PR카드·비자·캐나다 여권 지참.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_minor_sole: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "단독친권"],
    title: "⚡ 미성년자 긴급 단수여권 — 이혼 후 단독친권",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "자녀 여권 원본 + 흑백 사본 (있는 경우)",
      "법정대리인 동의서 — 단독친권자만 인적사항 기재 및 서명",
      "단독친권자 여권 원본",
      "단독친권 확인 서류: 자녀 기본증명서 (상세, 친권자 1인 명시) — 3개월 이내",
      "자녀 체류자격 증빙서류 원본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 단독친권자만 방문·서명 — 비친권자 동의 불필요.",
      "기본증명서(상세)에 단독친권자가 명확히 표기되어야 합니다.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_minor_joint: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "이혼·공동친권"],
    title: "⚡ 미성년자 긴급 단수여권 — 이혼 후 공동친권",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드 — 여행국가명 또는 출발예정일 기재)",
      "자녀 여권 원본 + 흑백 사본 (있는 경우) / 없으면 기본증명서 또는 가족관계증명서",
      "법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기재, 방문하는 친권자가 서명",
      "방문하는 공동친권자 여권 원본",
      "비방문 공동친권자 여권 사본 1부",
      "공동친권 확인: 이혼 판결문 또는 협의이혼 확인서 (공동친권 명시)",
      "자녀 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 등)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 공동친권: 양쪽 친권자 모두의 동의가 필요합니다 — 한 쪽이 반대하면 발급 제한.",
      "⚠️ 비방문 친권자 여권 사본 반드시 지참.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "단수여권 1회용 — 여행 목적 달성 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_minor_single: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "한부모"],
    title: "⚡ 미성년자 긴급 단수여권 — 한부모 (사별 / 미혼)",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "자녀 여권 원본 + 흑백 사본 (있는 경우) / 없으면 기본증명서 또는 가족관계증명서",
      "법정대리인 동의서 — 생존 친권자만 인적사항 기재 및 서명",
      "생존 친권자 여권 원본",
      "자녀 체류자격 증빙서류 원본",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류",
      "  ▸ 사별의 경우: 사망한 배우자의 사망증명서",
      "  ▸ 기본증명서 (상세) — 단독친권 또는 사망 사실 표기된 것",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 생존 친권자만 방문·서명 가능.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "기본증명서(상세)에 단독친권 또는 사망 사실이 표기되어야 합니다.",
      "단수여권 1회용 — 여행 목적 달성 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

    passport_urgent_minor_korea: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "법정대리인 한국 거주"],
    title: "⚡ 미성년자 긴급 단수여권 — 법정대리인이 한국에 거주",
    docs: [
      "여권발급신청서 (자녀 명의, 캐나다 측 성인이 대리 작성)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "자녀 여권 원본 + 흑백 사본 (있는 경우)",
      "법정대리인 동의서 — 한국 거주 부 또는 모가 서명, 서명란에 반드시 인감도장 날인",
      "법정대리인 인감증명서 — 6개월 이내 발급본",
      "법정대리인 신분증 사본 (여권 / 주민등록증)",
      "자녀 체류자격 증빙서류 원본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 긴급 상황에서 인감도장·인감증명서를 준비하기 어려울 수 있습니다 — 반드시 방문 전 전화 상담 필수 (416-920-3809).",
      "법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만으로는 접수 불가.",
      "인감증명서는 6개월 이내 발급본만 인정.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_minor: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "긴급", "단수여권"],
    title: "⚡ 긴급 단수여권 (비전자식) — 당일 발급",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드 — 여행국가명 또는 출발예정일 반드시 기재)",
      "현재 여권 원본 + 흑백 사본 1부 (여권이 있는 경우)",
      "  ▸ 여권 없는 경우: 한국 공공기관 발급 신분증 원본 + 사본 (사진·생년월일 기재)",
      "캐나다 체류자격 증빙서류 원본 + 흑백 사본 (PR카드 / 비자 / 시민권증서)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 지참 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (아래 중 해당하는 것):",
      "  ▸ 친족 사망·위독: 사망증명서 / 진단서 / 병원 확인서",
      "  ▸ 사업상 긴급 출국: 계약서 / 초청장 / 회사 공문",
      "  ▸ 인도적 사유: 해당 사유 증빙서류",
      "  ▸ 긴급 귀국: 항공권 사본 + 귀국 사유 설명서",
    ],
    costs: [
      { label: "일반 긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
      { label: "감면 조건", value: "사전 또는 방문 후 6개월 이내 증빙서류 제출 시 적용" },
    ],
    time: "당일 발급 (방문 즉시) — 영사 심사 후 발급 결정",
    notices: [
      "⚠️ 단수여권은 1회용입니다 — 여행 목적 달성 시 효력 소멸. 귀국 후 반드시 정식 전자여권을 별도 신청하세요.",
      "⚠️ 사진은 반드시 사진관에서 대한민국 여권 규격으로 촬영 — 영사관 무료촬영 불가.",
      "긴급 발급 여부는 영사 심사 후 결정됩니다 — 사유가 충분하지 않으면 발급이 거부될 수 있습니다.",
      "수령: 방문 당일 직접 수령만 가능 (우편·DHL 불가).",
      "캐나다 재입국 시: 단수여권만으로는 재입국 불가 — PR카드·비자·시민권증서를 반드시 함께 지참.",
      "긴급사유 수수료 감면: 증빙서류를 방문 당일 제출하지 못해도 6개월 이내 사후 제출로 차액 환급 신청 가능 (신청한 공관에서만 가능).",
      "신분 확인이 불가능한 경우(여권 분실 + 신분증 없음): 반드시 방문 전 전화 상담 필수 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_lost: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "긴급", "단수여권"],
    title: "⚡ 긴급 단수여권 — 여권 분실 후 긴급 출국",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 필수)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드 — 여행국가명 또는 출발예정일 기재)",
      "여권 분실 신고서 (Police Report) — 방문 전 현지 경찰서에서 반드시 발급",
      "캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
      "  ▸ PR카드도 분실 시: 여권과 사전 전화 상담 필수 (416-920-3809)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 지참 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류:",
      "  ▸ 친족 사망·위독: 사망증명서 / 진단서",
      "  ▸ 기타 긴급 사유: 항공권 / 초청장 / 계약서 등",
      "  ▸ 신분 확인용 추가서류: 기본증명서 (상세) — 여권 없어 가족관계 확인 불가 시",
    ],
    costs: [
      { label: "일반 긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
      { label: "감면 조건", value: "사전 또는 방문 후 6개월 이내 증빙서류 제출 시 적용" },
    ],
    time: "당일 발급 (영사 심사 후 결정)",
    notices: [
      "⚠️ 반드시 경찰 분실 신고(Police Report) 완료 후 방문하세요.",
      "⚠️ 사진은 반드시 사진관 촬영본 — 영사관 무료촬영 불가.",
      "⚠️ PR카드·비자 등 체류자격 증빙이 전혀 없는 경우: 단수여권 발급이 어려울 수 있습니다 — 반드시 사전 전화 문의 (416-920-3809).",
      "단수여권은 1회용 — 귀국 후 한국에서 정식 전자여권 재발급 신청 필요.",
      "신분 확인 불가 시: 방문 전 반드시 전화 상담 필수 (416-920-3809).",
      "캐나다 재입국 시: 단수여권만으로는 재입국 불가 — PR카드·비자 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_minor_2: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "긴급", "단수여권"],
    title: "⚡ 미성년자 긴급 단수여권 — 당일 발급",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 신청인은 자녀 기준으로 작성)",
      "  ▸ 하단 서명: 신청인(자녀) + 법정대리인(부 또는 모) 각각 이름 기재, 서명은 법정대리인",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드 — 여행국가명 또는 출발예정일 기재)",
      "자녀의 기존 여권 원본 + 흑백 사본 1부 (여권이 있는 경우)",
      "  ▸ 여권 없는 경우: 자녀 기본증명서 또는 가족관계증명서",
      "법정대리인(부 또는 모) 여권 원본 + 흑백 사본 1부",
      "법정대리인 동의서 (영사관 홈페이지 다운로드 — 동반하지 않는 부 또는 모 서명 필수)",
      "캐나다 체류자격 증빙서류 원본 (자녀 + 신청 법정대리인)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 지참 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 / 초청장 등)",
    ],
    costs: [
      { label: "만 8~17세 긴급여권", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "만 8세 미만 긴급여권", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 (영사 심사 후 결정)",
    notices: [
      "⚠️ 법정대리인(부 또는 모) 반드시 동반 방문 — 자녀 단독 방문 불가.",
      "⚠️ 사진은 반드시 사진관 촬영본 — 영사관 무료촬영 불가.",
      "동반하지 않는 부 또는 모의 법정대리인 동의서가 반드시 필요합니다.",
      "단수여권은 1회용 — 여행 목적 달성 후 정식 전자여권을 별도 신청하세요.",
      "캐나다 재입국 시: 단수여권만으로는 재입국 불가 — 캐나다 여권 또는 PR카드 등 필요.",
      "긴급 발급 여부는 영사 심사 후 결정 — 사유가 충분하지 않으면 거부될 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },


  passport_residual: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "성인", "재발급", "훼손·성명변경·정보정정"], title: "여권 재발급 — 훼손 · 성명변경 · 정보정정 (잔여기간)", docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 여권 원본 + 흑백 사본 1부","체류자격 증빙서류 원본 + 사본 (PR카드 / 비자 / 시민권증서)","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","  ▸ 흰색 또는 연한 색 상의 착용 금지","성명변경의 경우: 법원 개명 허가서 또는 공증된 성명변경 증빙서류","정보정정의 경우: 기본증명서 (상세) 등 정정 사유 증빙서류"], costs: [{ label: "잔여기간 재발급", value: "CAD $36.45 (현금, Debit, 신용카드)" }], time: "약 3~4주 (DHL 특급 선택 시 약 2주)", notices: ["유효기간이 남아있는 여권을 훼손·분실·성명변경 등으로 재발급하는 경우 잔여기간 수수료 $36.45가 적용됩니다.","재발급된 여권의 유효기간은 기존 여권과 동일하게 유지됩니다.","여권 사진: 흰색 또는 연한 색 상의 착용 금지.","카카오톡 알림: 신청서에 카카오톡 연결 전화번호 기재 시 발급 진행상황 알림 수신 가능.","방문 전 사유에 맞는 증빙서류를 반드시 준비하세요 — 미비 시 접수 불가."], booking: "https://www.torbooking.com/book" },

  passport_adult_have_normal: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "재발급", "일반"],
    question: "캐나다 체류 신분은?",
    sub: "체류 신분에 따라 준비할 증빙서류가 달라집니다.",
    options: [
      { id: "passport_have_pr", icon: "🟢", title: "영주권자 (PR Card 소지)", desc: "Permanent Resident" },
      { id: "passport_have_citizen", icon: "🍁", title: "시민권자", desc: "Canadian Citizen" },
      { id: "passport_have_visa", icon: "📋", title: "비자 소지자", desc: "학생/취업/방문 비자 등" },
      { id: "passport_have_visitor", icon: "✈️", title: "단기 방문자 (eTA)", desc: "관광·단기 방문으로 입국한 여행자" },
    ],
  },

  passport_new_normal: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "일반"],
    question: "어떤 이유로 처음 여권을 발급받으시나요?",
    sub: "성인이 캐나다에서 한국 여권을 처음 발급받는 경우는 상황이 한정되어 있습니다. 해당하는 경우를 선택하세요.",
    options: [
      { id: "passport_new_dual", icon: "🧬", title: "선천적 복수국적자 — 한국 여권 미발급", desc: "캐나다 출생 또는 성인 전 한국 여권 발급 없이 성인이 된 경우" },
      { id: "passport_new_recovery", icon: "🇰🇷", title: "국적 회복 후 첫 여권 신청", desc: "국적회복 허가를 받은 후 처음 여권 신청" },
    ],
  },

  // ── 신규 — 선천적 복수국적자 ──
  passport_new_dual: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "선천적 복수국적자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "신규 발급은 반드시 방문 신청입니다. 수령 방법을 선택하세요.",
    options: [
      { id: "passport_new_dual_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_new_dual_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
    ],
  },

  passport_new_dual_visit: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "복수국적자", "방문수령"],
    title: "여권 신규 발급 — 선천적 복수국적자 · 방문 수령",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 반드시 컬러 출력)",
      "기본증명서 (상세, 주민번호 전부 공개) — 한국 발급, 3개월 이내",
      "  ▸ 기본증명서에 부 또는 모가 한국인임이 표기되어야 합니다",
      "가족관계증명서 (상세, 주민번호 전부 공개) — 한국 발급, 3개월 이내",
      "캐나다 출생증명서 (Birth Certificate) 원본 + 사본",
      "캐나다 여권 또는 시민권증서 원본 + 사본",
      "부 또는 모의 한국 여권 또는 신분증 사본 (한국 국적 확인용)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 가능)",
      "  ▸ 한국 출생신고가 안 된 경우: 출생신고 먼저 완료 후 신청 (가족관계등록 메뉴 참조)",
      "  ▸ 만 18~37세 남성: 병역 관련 서류 추가 필요 — 방문 전 전화 상담 권장 (416-920-3809)",
    ],
    costs: [
      { label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },
      { label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },
    ],
    time: "약 3~4주 후 방문 수령",
    notices: [
      "⚠️ 한국 출생신고(가족관계등록부 등재)가 완료되어 있어야 여권 신청 가능합니다. 미등록 시 가족관계등록 메뉴에서 출생신고를 먼저 진행하세요.",
      "⚠️ 만 18~37세 남성 복수국적자: 재외국민2세 국외여행허가 또는 병역 관련 서류가 필요할 수 있습니다. 방문 전 전화 상담 필수 (416-920-3809).",
      "기본증명서·가족관계증명서는 정부24(gov.kr) 온라인 발급 또는 한국 주민센터에서 발급하세요.",
      "신규 발급은 반드시 방문 신청 — 온라인 신청 불가.",
      "영문 이름은 신청서에 반드시 대문자로 정확히 기재.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (여권 → 신규 발급) →",
  },

  passport_new_dual_xpress: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "복수국적자", "우편수령"],
    title: "여권 신규 발급 — 선천적 복수국적자 · 우편 수령",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 반드시 컬러 출력)",
      "기본증명서 (상세, 주민번호 전부 공개) — 한국 발급, 3개월 이내",
      "  ▸ 기본증명서에 부 또는 모가 한국인임이 표기되어야 합니다",
      "가족관계증명서 (상세, 주민번호 전부 공개) — 한국 발급, 3개월 이내",
      "캐나다 출생증명서 (Birth Certificate) 원본 + 사본",
      "캐나다 여권 또는 시민권증서 원본 + 사본",
      "부 또는 모의 한국 여권 또는 신분증 사본",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 가능)",
      "Canada Post Xpresspost 등기 봉투 (별도 구매, 수취인 주소·Tracking 기재)",
      "우편수령 신청서",
      "  ▸ 만 18~37세 남성: 병역 관련 서류 — 방문 전 전화 상담 필수 (416-920-3809)",
    ],
    costs: [
      { label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },
      { label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },
    ],
    time: "약 3~4주 + 우편 배송 기간",
    notices: [
      "⚠️ 한국 출생신고가 완료되어 있어야 여권 신청 가능합니다.",
      "⚠️ 만 18~37세 남성 복수국적자: 병역 관련 서류 필요 — 방문 전 전화 상담 필수 (416-920-3809).",
      "신규 발급은 반드시 방문 신청 — 온라인 신청 불가.",
      "우편 분실에 대해 영사관은 책임지지 않습니다 — Xpresspost 등기 봉투 사용 권장.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (여권 → 신규 발급) →",
  },

  // ── 신규 — 국적 회복 ──
  passport_new_recovery: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규", "국적 회복"],
    title: "여권 신규 발급 — 국적 회복 후 첫 여권 신청",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성 — 반드시 컬러 출력)",
      "국적회복 허가서 원본 + 사본 (법무부 발급)",
      "기본증명서 (상세, 주민번호 전부 공개) — 3개월 이내",
      "가족관계증명서 (상세) — 3개월 이내",
      "캐나다 여권 또는 PR Card 원본 + 사본",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 가능)",
      "  ▸ 우편 수령 희망 시: Canada Post Xpresspost 등기 봉투 + 우편수령 신청서",
    ],
    costs: [
      { label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },
      { label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },
    ],
    time: "약 3~4주",
    notices: [
      "⚠️ 국적회복 허가서는 법무부에서 발급 — 영사관에서 발급 불가.",
      "국적 회복 절차는 홈 → 국적 → 한국 국적 회복 메뉴를 참조하세요.",
      "신규 발급은 반드시 방문 신청 — 온라인 신청 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (여권 → 신규 발급) →",
  },

  passport_lost_normal: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "일반"],
    question: "캐나다 체류 신분은?",
    sub: "분실 신고(Police Report)를 먼저 완료한 후 방문하세요. 체류신분에 따라 지참 서류가 달라집니다.",
    options: [
      { id: "passport_lost_pr", icon: "🟢", title: "영주권자 (PR Card)", desc: "Permanent Resident" },
      { id: "passport_lost_citizen", icon: "🍁", title: "시민권자", desc: "Canadian Citizen" },
      { id: "passport_lost_visa", icon: "📋", title: "비자 소지자", desc: "학생·취업·방문 비자 등" },
      { id: "passport_lost_eta", icon: "✈️", title: "단기 방문자 (eTA)", desc: "한국에서 캐나다로 관광·방문 중인 경우" },
    ],
  },

  passport_have_pr: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "재발급", "영주권자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "수령 방법에 따라 추가 준비물이 다릅니다.",
    options: [
      { id: "passport_have_pr_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_have_pr_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_have_pr_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },

  passport_have_citizen: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "재발급", "시민권자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "수령 방법에 따라 추가 준비물이 다릅니다.",
    options: [
      { id: "passport_have_citizen_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_have_citizen_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_have_citizen_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },

  passport_have_visa: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "재발급", "비자소지자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "수령 방법에 따라 추가 준비물이 다릅니다.",
    options: [
      { id: "passport_have_visa_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_have_visa_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_have_visa_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },

  passport_have_visitor: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "재발급", "단기방문자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "단기 방문자는 귀국 일정이 촉박할 수 있습니다. 확인 후 선택하세요.",
    options: [
      { id: "passport_have_visitor_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_have_visitor_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_have_visitor_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },




  passport_lost_pr: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "영주권자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "분실 재발급 후 수령 방법을 선택하세요.",
    options: [
      { id: "passport_lost_pr_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_lost_pr_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_lost_pr_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },

  passport_lost_citizen: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "시민권자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "분실 재발급 후 수령 방법을 선택하세요.",
    options: [
      { id: "passport_lost_citizen_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_lost_citizen_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_lost_citizen_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },

  passport_lost_visa: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "비자소지자"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "분실 재발급 후 수령 방법을 선택하세요.",
    options: [
      { id: "passport_lost_visa_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_lost_visa_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
      { id: "passport_lost_visa_dhl", icon: "🚀", title: "DHL 특급 (약 2주, 비용 별도)", desc: "사전 DHL 결제 후 영수증 지참" },
    ],
  },

  passport_have_pr_visit: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "재발급", "영주권자", "방문수령"],
    title: "여권 재발급 — 영주권자 · 방문 수령",
    docs: ["여권발급신청서 (영사관 비치, 자필 작성 — 컬러 출력 후 작성 가능)","현재 여권 원본 + 흑백 사본 1부 (어둡거나 컬러 복사 불가)","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능, 진한색 상의)"],
    costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" }],
    time: "약 3~4주 후 방문 수령",
    notices: ["여권 수령 시 별도 예약 없이 접수증 지참 후 픽업 가능 (오후 픽업 시간 확인 권장).","PR Card 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","여권 사진: 흰색 또는 연한 색 상의 착용 금지 — 배경과 구분이 안 되는 경우 재촬영 필요.","카카오톡 알림: 신청서에 카카오톡 연결 전화번호 기재 시 발급 진행상황을 카카오톡으로 받을 수 있어요.","온라인 재발급도 가능합니다 (기존 전자여권 소지자 + 공동인증서 보유 시)."],
    booking: "https://www.torbooking.com/book",
    onlineRenewal: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5389/view.do?seq=1344521",
  },

  passport_have_pr_xpress: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "재발급", "영주권자", "Xpresspost"],
    title: "여권 재발급 — 영주권자 · Xpresspost 우편 수령",
    docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 여권 원본 + 흑백 사본 1부","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","우편수령신청서 (영사관 홈페이지 다운로드, 자필 작성)","Canada Post Xpresspost 봉투 — Canada Post에서 구매 후 수취인 주소·이름 기재하여 지참 (1인: 소형, 2인 이상: 대형)"],
    costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "Xpresspost 봉투 (Canada Post)", value: "별도 구매" }],
    time: "약 3~4주 발급 + 우편 배송 기간 (3~5일)",
    notices: ["Xpresspost 봉투는 Canada Post(우체국)에서 미리 구매하여 수취인 정보를 기재해 오세요.","우편 분실·파손에 대해 영사관은 책임지지 않습니다.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","여권 사진: 흰색 또는 연한 색 상의 착용 금지 — 배경과 구분이 안 되는 경우 재촬영 필요.","카카오톡 알림: 신청서에 카카오톡 연결 전화번호 기재 시 발급 진행상황을 카카오톡으로 받을 수 있어요.","PR Card 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수."],
    booking: "https://www.torbooking.com/book",
  },

  passport_have_pr_dhl: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "재발급", "영주권자", "DHL특급"],
    title: "여권 재발급 — 영주권자 · DHL 특급 (약 2주)",
    docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 여권 원본 + 흑백 사본 1부","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","DHL 긴급여권 서비스 결제 영수증 출력본 — 방문 전 온라인 결제 필수"],
    costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }],
    time: "약 2주 (DHL 특급 배송 기준)",
    notices: ["방문 전 반드시 DHL 긴급여권 서비스를 온라인으로 결제하고 영수증을 출력해 오세요.","DHL 서비스는 한국→영사관 배송 단축 서비스이며, 자택 직접 배송이 아닙니다.","여권 완성 후 영사관에서 방문 수령하거나 Xpresspost로 별도 우편 수령 가능.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가."],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.dhl.com/kr-ko/home/our-divisions/ecommerce/sending-parcels.html",
  },

  passport_have_citizen_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "시민권자", "방문수령"], title: "여권 재발급 — 시민권자 · 방문 수령", docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 한국 여권 원본 + 흑백 사본 1부","캐나다 여권 원본 + 흑백 사본 1부","캐나다 시민권증서 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" }], time: "약 3~4주 후 방문 수령", notices: ["시민권 취득 시 한국 국적이 법적으로 상실됩니다 — 국적상실신고를 별도로 진행하세요.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","여권 사진: 흰색 또는 연한 색 상의 착용 금지 — 배경과 구분이 안 되는 경우 재촬영 필요.","카카오톡 알림: 신청서에 카카오톡 연결 전화번호 기재 시 발급 진행상황을 카카오톡으로 받을 수 있어요.","온라인 재발급도 가능합니다 (기존 전자여권 소지자 + 공동인증서 보유 시)."], booking: "https://www.torbooking.com/book", onlineRenewal: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5389/view.do?seq=1344521" },
  passport_have_citizen_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "시민권자", "Xpresspost"], title: "여권 재발급 — 시민권자 · Xpresspost 우편 수령", docs: ["여권발급신청서","현재 한국 여권 원본 + 흑백 사본 1부","캐나다 여권 원본 + 흑백 사본 1부","캐나다 시민권증서 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","우편수령신청서 (홈페이지 다운로드, 자필 작성)","Canada Post Xpresspost 봉투 — 수취인 주소·이름 기재 후 지참"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 발급 + 우편 배송 기간", notices: ["시민권 취득 시 한국 국적 상실 — 국적상실신고 별도 진행 필요.","우편 분실·파손에 대해 영사관은 책임지지 않습니다.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가."], booking: "https://www.torbooking.com/book" },
  passport_have_citizen_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "시민권자", "DHL특급"], title: "여권 재발급 — 시민권자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","현재 한국 여권 원본 + 흑백 사본 1부","캐나다 여권 원본 + 흑백 사본 1부","캐나다 시민권증서 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }], time: "약 2주", notices: ["시민권 취득 시 한국 국적 상실 — 국적상실신고 별도 진행 필요.","방문 전 DHL 긴급여권 서비스 온라인 결제 후 영수증 출력 필수.","DHL은 한국→영사관 배송 단축 서비스 (자택 배송 아님)."], booking: "https://www.torbooking.com/book" },

  passport_have_visa_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "비자소지자", "방문수령"], title: "여권 재발급 — 비자 소지자 · 방문 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","캐나다 비자 원본 + 흑백 사본 1부 (비자 분실 시 재학·재직증명서 등 대체)","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","병역 증빙서류 (만 25~37세 병역의무자, 전산 확인 불가 시만 해당)"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" },{ label: "병역미필자 알뜰 (24면)", value: "CAD $41.00 (현금)" }], time: "약 3~4주 후 방문 수령", notices: ["사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","여권 사진: 흰색 또는 연한 색 상의 착용 금지 — 배경과 구분이 안 되는 경우 재촬영 필요.","카카오톡 알림: 신청서에 카카오톡 연결 전화번호 기재 시 발급 진행상황을 카카오톡으로 받을 수 있어요.","비자 분실 시 여권과(416-920-3809)에 사전 전화 상담 권장.","만 25~37세 남성 병역의무자는 병역 증빙서류 필요할 수 있습니다."], booking: "https://www.torbooking.com/book" },
  passport_have_visa_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "비자소지자", "Xpresspost"], title: "여권 재발급 — 비자 소지자 · Xpresspost 우편 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","캐나다 비자 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (만 25~37세, 해당자만)","우편수령신청서 (홈페이지 다운로드)","Canada Post Xpresspost 봉투 — 수취인 정보 기재 후 지참"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 발급 + 우편 배송 기간", notices: ["우편 분실·파손에 대해 영사관은 책임지지 않습니다.","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },
  passport_have_visa_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "비자소지자", "DHL특급"], title: "여권 재발급 — 비자 소지자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","캐나다 비자 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (만 25~37세, 해당자만)","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }], time: "약 2주", notices: ["방문 전 DHL 긴급여권 서비스 온라인 결제 후 영수증 출력 필수.","DHL은 한국→영사관 배송 단축 서비스 (자택 배송 아님).","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },

  passport_have_visitor_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "단기방문자", "방문수령"], title: "여권 재발급 — 단기 방문자 (eTA) · 방문 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","왕복 항공권 (e-ticket) 출력본","eTA 승인서류 출력본","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" }], time: "약 3~4주 (귀국 일정과 비교 후 DHL 특급 고려 권장)", notices: ["귀국 일정이 촉박한 경우 DHL 특급(약 2주) 또는 단수여권(당일)을 고려하세요.","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },
  passport_have_visitor_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "단기방문자", "Xpresspost"], title: "여권 재발급 — 단기 방문자 (eTA) · Xpresspost 우편 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","왕복 항공권 (e-ticket) 출력본","eTA 승인서류 출력본","최근 6개월 이내 여권용 사진 2매","우편수령신청서 (홈페이지 다운로드)","Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간 (귀국 일정 확인 필수)", notices: ["귀국 일정과 발급 소요시간을 꼭 비교해 DHL 또는 단수여권 대안을 검토하세요.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_have_visitor_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "단기방문자", "DHL특급"], title: "여권 재발급 — 단기 방문자 (eTA) · DHL 특급 (약 2주)", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","왕복 항공권 (e-ticket) 출력본","eTA 승인서류 출력본","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }], time: "약 2주 (단기 방문자에게 권장 옵션)", notices: ["방문 전 DHL 긴급여권 서비스 온라인 결제 후 영수증 출력 필수.","DHL은 한국→영사관 배송 단축 서비스 (자택 배송 아님)."], booking: "https://www.torbooking.com/book" },




  passport_lost_pr_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "영주권자", "방문수령"], title: "여권 분실 재발급 — 영주권자 · 방문 수령", docs: ["여권발급신청서","여권 분실 신고서 (현지 경찰서 발급 Police Report) — 방문 전 필수","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","기본증명서 (상세) — 분실 여권으로 가족관계 확인 불가 시 추가"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" }], time: "약 3~4주 후 방문 수령", notices: ["여권 분실 재발급은 온라인(정부24) 신청 불가 — 반드시 영사관 방문 신청만 가능합니다.","반드시 현지 경찰서에서 분실 신고(Police Report)를 먼저 완료 후 방문하세요.","PR Card도 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수.","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },
  passport_lost_pr_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "영주권자", "Xpresspost"], title: "여권 분실 재발급 — 영주권자 · Xpresspost 우편 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","기본증명서 (상세) — 해당 시","우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간", notices: ["경찰 분실 신고 먼저 완료 후 방문.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_pr_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "영주권자", "DHL특급"], title: "여권 분실 재발급 — 영주권자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "DHL 특급 배송비", value: "별도" }], time: "약 2주", notices: ["경찰 분실 신고 먼저 완료 후 방문.","방문 전 DHL 온라인 결제 후 영수증 출력 필수."], booking: "https://www.torbooking.com/book" },

  passport_lost_citizen_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "시민권자", "방문수령"], title: "여권 분실 재발급 — 시민권자 · 방문 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 여권 원본 또는 시민권증서 원본","최근 6개월 이내 여권용 사진 2매"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["시민권 취득시 한국 국적이 자동 상실됩니다 — 국적상실신고가 기본증명서에 반영되지 않은 경우 여권 재발급이 제한될 수 있습니다. 방문 전 반드시 전화 상담 (416-920-3809).","합법적 복수국적자(외국국적불행사서약 완료, 만 65세 이상 국적회복자)는 정상 재발급 가능합니다.","경찰 분실 신고 먼저 완료 후 방문.","긴급 귀국 필요시 영사관에 사전 전화 문의 (416-920-3809)."], booking: "https://www.torbooking.com/book" },
  passport_lost_citizen_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "시민권자", "Xpresspost"], title: "여권 분실 재발급 — 시민권자 · Xpresspost 우편 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 여권 원본 또는 시민권증서 원본","최근 6개월 이내 여권용 사진 2매","우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간", notices: ["시민권 취득시 한국 국적이 자동 상실됩니다 — 국적상실신고가 기본증명서에 반영되지 않은 경우 여권 재발급이 제한될 수 있습니다. 방문 전 반드시 전화 상담 (416-920-3809).","합법적 복수국적자(외국국적불행사서약 완료, 만 65세 이상 국적회복자)는 정상 재발급 가능합니다.","경찰 분실 신고 먼저 완료 후 방문.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_citizen_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "시민권자", "DHL특급"], title: "여권 분실 재발급 — 시민권자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 여권 원본 또는 시민권증서 원본","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "DHL 특급 배송비", value: "별도" }], time: "약 2주", notices: ["시민권 취득시 한국 국적이 자동 상실됩니다 — 국적상실신고가 기본증명서에 반영되지 않은 경우 여권 재발급이 제한될 수 있습니다. 방문 전 반드시 전화 상담 (416-920-3809).","합법적 복수국적자(외국국적불행사서약 완료, 만 65세 이상 국적회복자)는 정상 재발급 가능합니다.","경찰 분실 신고 먼저 완료 후 방문.","방문 전 DHL 온라인 결제 후 영수증 출력 필수."], booking: "https://www.torbooking.com/book" },

  passport_lost_visa_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "비자소지자", "방문수령"], title: "여권 분실 재발급 — 비자 소지자 · 방문 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 비자 원본 (비자도 분실 시 재학·재직증명서 등 대체)","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","병역 증빙서류 (만 25~37세, 해당자만)"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" }], time: "약 3~4주 후 방문 수령", notices: ["경찰 분실 신고 먼저 완료 후 방문.","비자도 함께 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수."], booking: "https://www.torbooking.com/book" },
  passport_lost_visa_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "비자소지자", "Xpresspost"], title: "여권 분실 재발급 — 비자 소지자 · Xpresspost 우편 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 비자 원본 (분실 시 대체 서류)","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (해당자만)","우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간", notices: ["경찰 분실 신고 먼저 완료 후 방문.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_visa_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "비자소지자", "DHL특급"], title: "여권 분실 재발급 — 비자 소지자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 비자 원본 (분실 시 대체 서류)","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (해당자만)","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },{ label: "DHL 특급 배송비", value: "별도" }], time: "약 2주", notices: ["경찰 분실 신고 먼저 완료 후 방문.","방문 전 DHL 온라인 결제 후 영수증 출력 필수."], booking: "https://www.torbooking.com/book" },

  // ── 분실 일반 — eTA 단기방문자 수령방법 분기 ──
  passport_lost_eta: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "일반", "단기방문(eTA)"],
    question: "발급된 여권을 어떻게 받으시겠어요?",
    sub: "단기 방문 중 여권을 분실한 경우, 수령 방법을 선택하세요.",
    options: [
      { id: "passport_lost_eta_visit", icon: "🏛️", title: "영사관 직접 방문 수령", desc: "접수증 지참 후 예약 없이 픽업 가능" },
      { id: "passport_lost_eta_xpress", icon: "📮", title: "우편 수령 (Canada Post Xpresspost)", desc: "등기 봉투 별도 구매 후 지참" },
    ],
  },

  passport_lost_eta_visit: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "일반", "단기방문(eTA)", "방문수령"],
    title: "여권 분실 재발급 — 단기방문(eTA) · 영사관 방문 수령",
    docs: [
      "여권발급신청서 (컬러 출력, 자필 작성)",
      "여권 분실 신고서 (Police Report) — 방문 전 경찰서 발급 필수",
      "왕복 항공권 (e-ticket) 출력본 — 귀국 일정 확인용",
      "eTA 승인서류 출력본 (이메일 조회 가능)",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "  ▸ 기본증명서 (상세) — 신분 추가 확인 필요 시",
    ],
    costs: [
      { label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },
      { label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },
    ],
    time: "접수 후 약 3~4주 — 단기 방문 중이라면 귀국 일정 감안 필요",
    notices: [
      "⚠️ 단기 방문 중 여권 분실 시 귀국 일정이 촉박할 수 있습니다 — 항공권을 반드시 지참하세요.",
      "⚠️ 처리 기간(3~4주)이 귀국 일정보다 긴 경우 긴급 단수여권 발급을 검토하세요 (뒤로 가서 '긴급' 선택).",
      "⚠️ 경찰 분실 신고(Police Report) 없이는 접수 불가 — 방문 전 반드시 완료.",
      "eTA는 여권번호에 연동되므로 새 여권 발급 후 캐나다 재입국 시 eTA 재신청 필요.",
      "여권 수령 후 접수증 지참하여 예약 없이 영사관 방문해 수령.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (여권 분실 재발급) →",
  },

  passport_lost_eta_xpress: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실", "일반", "단기방문(eTA)", "우편수령"],
    title: "여권 분실 재발급 — 단기방문(eTA) · 우편 수령",
    docs: [
      "여권발급신청서 (컬러 출력, 자필 작성)",
      "여권 분실 신고서 (Police Report) — 방문 전 경찰서 발급 필수",
      "왕복 항공권 (e-ticket) 출력본",
      "eTA 승인서류 출력본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "Canada Post Xpresspost 등기 봉투 (별도 구매, 수취인 주소·Tracking 기재)",
      "  ▸ 기본증명서 (상세) — 신분 추가 확인 필요 시",
    ],
    costs: [
      { label: "일반여권 (58면)", value: "CAD $70.20 (현금, Debit, 신용카드)" },
      { label: "알뜰여권 (26면)", value: "CAD $66.15 (현금, Debit, 신용카드)" },
    ],
    time: "접수 후 약 3~4주 + 우편 배송 기간",
    notices: [
      "⚠️ 단기 방문 중 귀국 일정이 촉박하다면 우편보다 방문 수령 또는 긴급 단수여권을 선택하세요.",
      "⚠️ 경찰 분실 신고(Police Report) 없이는 접수 불가.",
      "eTA는 여권번호 연동 — 새 여권 발급 후 캐나다 재입국 시 eTA 재신청 필요.",
      "우편 분실에 대해 영사관은 책임지지 않습니다 — Xpresspost 등기 봉투 사용 권장.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (여권 분실 재발급) →",
  },

  passport_minor: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "일반", "미성년자"], question: "자녀의 현재 여권 상태는?", sub: "여권 유무와 분실 여부에 따라 준비 서류가 달라집니다.", options: [{ id: "passport_minor_have", icon: "✅", title: "재발급 (여권 있음)", desc: "만료 임박 또는 만료된 여권" },{ id: "passport_minor_lost", icon: "❌", title: "분실 재발급", desc: "경찰 분실 신고 후 재발급" },{ id: "passport_minor_new", icon: "🆕", title: "신규 발급 (여권 없음)", desc: "최초 여권 발급" }] },
  passport_minor_have: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "일반", "미성년자", "재발급"], question: "부모님의 혼인·친권 상황은?", sub: "친권자가 누구인지에 따라 필요한 서류와 절차가 달라집니다.", options: [{ id: "passport_minor_married", icon: "👫", title: "부모님이 혼인 중 (공동친권)", desc: "부모 중 1인이 방문 신청 가능" },{ id: "passport_minor_divorced_sole", icon: "👤", title: "이혼 — 단독친권자 있음", desc: "단독친권자만 신청 가능" },{ id: "passport_minor_divorced_joint", icon: "⚖️", title: "이혼 — 공동친권 (두 분 모두 친권)", desc: "양쪽 동의 필요" },{ id: "passport_minor_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 신청" },{ id: "passport_minor_korea_parent", icon: "🇰🇷", title: "법정대리인이 한국에 계심", desc: "인감도장·증명서 필요" }] },
  passport_minor_new: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "일반", "미성년자", "신규"], question: "부모님의 혼인·친권 상황은?", sub: "신규 발급 시에도 친권자 확인이 필요합니다. 한국 출생신고가 완료된 경우에만 신청 가능합니다.", options: [{ id: "passport_minor_new_married", icon: "👫", title: "부모님이 혼인 중 (공동친권)", desc: "부모 중 1인이 방문 신청 가능" },{ id: "passport_minor_new_divorced_sole", icon: "👤", title: "이혼 — 단독친권자 있음", desc: "단독친권자만 신청 가능" },{ id: "passport_minor_new_divorced_joint", icon: "⚖️", title: "이혼 — 공동친권 (두 분 모두 친권)", desc: "양쪽 동의 필요" },{ id: "passport_minor_new_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 신청" },{ id: "passport_minor_new_korea_parent", icon: "🇰🇷", title: "법정대리인이 한국에 계심", desc: "인감도장·증명서 필요" }] },
  passport_minor_lost: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "일반", "미성년자", "분실"], question: "부모님의 혼인·친권 상황은?", sub: "⚠️ 방문 전 반드시 경찰 분실 신고(Police Report)를 먼저 완료하세요.", options: [{ id: "passport_minor_lost_married", icon: "👫", title: "부모님이 혼인 중 (공동친권)", desc: "부모 중 1인이 방문 신청 가능" },{ id: "passport_minor_lost_divorced_sole", icon: "👤", title: "이혼 — 단독친권자 있음", desc: "단독친권자만 신청 가능" },{ id: "passport_minor_lost_divorced_joint", icon: "⚖️", title: "이혼 — 공동친권", desc: "양쪽 동의 필요" },{ id: "passport_minor_lost_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 신청" },{ id: "passport_minor_lost_korea_parent", icon: "🇰🇷", title: "법정대리인이 한국에 계심", desc: "인감도장·증명서 필요" }] },

  passport_minor_urgent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "긴급", "단수여권"], title: "⚡ 미성년자 긴급 단수여권 — 당일 발급", docs: ["여권발급신청서 (영사관 비치, 법정대리인 서명)","자녀 여권 원본 + 흑백 사본 (기존 여권 있는 경우)","자녀 체류자격 증빙서류 (PR카드 / 비자 / 시민권증서)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 (전산 확인 불가 시)","법정대리인 동의서 (방문하는 부 또는 모 서명)","방문하는 법정대리인(부 또는 모) 여권 원본","여권용 사진 2매 — 반드시 사진관 촬영본 지참 (만 5세 이하 포함, 영사관 촬영 불가)","긴급 출국 사유 증빙서류 (항공권, 진단서, 사망증명서 등)"], costs: [{ label: "단수여권 수수료", value: "CAD $67.50" },{ label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (긴급사유 인정 시)" }], time: "당일 발급 (방문 즉시)", notices: ["⚠️ 미국은 비전자여권(긴급여권)으로 입국·경유 불가 — 미국 경유로 한국 입국 시 DHL 전자여권(약 1주일) 또는 직항편 이용.","⚠️ 5년 이내 3회 이상 여권 분실자는 긴급여권 발급 불가.","단수여권은 1회용 — 사용 목적 달성 시 효력 소멸, 이후 정식 전자여권을 별도 신청하세요.","사진은 반드시 사진관에서 촬영해 오세요 — 영사관 무료촬영 불가.","긴급 출국 사유 증빙서류 반드시 지참.","이혼·단독친권의 경우에도 동일하게 적용 — 친권자 확인 서류 지참."], booking: "https://www.torbooking.com/book", bookingLabel: "사전 예약하기 (당일 방문) →" },
  passport_minor_urgent_lost_who: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "친권 상황"],
    question: "부모 친권 상황은?",
    sub: "⚠️ 경찰 분실 신고(Police Report)를 먼저 완료하세요. 친권 상황에 따라 지참 서류가 달라집니다.",
    options: [
      { id: "passport_minor_urgent_lost_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "부·모 여권 사본 모두 필요" },
      { id: "passport_minor_urgent_lost_sole", icon: "👤", title: "이혼 — 단독친권", desc: "단독친권자만 방문·서명" },
      { id: "passport_minor_urgent_lost_joint", icon: "⚖️", title: "이혼 — 공동친권 (두 분 모두 친권)", desc: "양쪽 동의 필요" },
      { id: "passport_minor_urgent_lost_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 방문" },
      { id: "passport_minor_urgent_lost_korea", icon: "🇰🇷", title: "법정대리인이 한국에 거주", desc: "인감도장 + 인감증명서 — 긴급 시 사전 전화 필수" },
    ],
  },

  passport_minor_urgent_lost_married: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "공동친권"],
    title: "⚡ 미성년자 긴급 단수여권 — 분실 · 부모 혼인 중",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 경찰서 발급 필수",
      "법정대리인 동의서 — 부모 2인 인적사항 기재, 방문하는 1인 서명",
      "방문하는 부 또는 모의 여권 원본",
      "비방문 부 또는 모의 여권 사본 1부",
      "자녀 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
      "자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "여권용 사진 1매 — 반드시 사진관 촬영본 (영사관 무료촬영 불가)",
      "긴급 출국 사유 증빙서류 (항공권 / 사망증명서 / 진단서 등)",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가 — 반드시 방문 전 경찰 신고 완료.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_minor_urgent_lost_sole: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "단독친권"],
    title: "⚡ 미성년자 긴급 단수여권 — 분실 · 이혼 단독친권",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 필수",
      "법정대리인 동의서 — 단독친권자만 인적사항 기재 및 서명",
      "단독친권자 여권 원본",
      "단독친권 확인: 자녀 기본증명서 (상세) — 친권자 1인 명시, 3개월 이내",
      "자녀 체류자격 증빙서류 원본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "기본증명서(상세)에 단독친권자가 명시되어야 합니다.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_minor_urgent_lost_joint: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "공동친권(이혼)"],
    title: "⚡ 미성년자 긴급 단수여권 — 분실 · 이혼 공동친권",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 필수",
      "법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기재, 방문 친권자 서명",
      "방문하는 공동친권자 여권 원본",
      "비방문 공동친권자 여권 사본 1부",
      "공동친권 확인: 이혼 판결문 또는 협의이혼 확인서 (공동친권 명시)",
      "자녀 체류자격 증빙서류 원본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 공동친권: 양쪽 모두 동의 필요 — 한 쪽이 반대하면 발급 제한.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_minor_urgent_lost_single: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "한부모"],
    title: "⚡ 미성년자 긴급 단수여권 — 분실 · 한부모",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 필수",
      "법정대리인 동의서 — 생존 친권자만 인적사항 기재 및 서명",
      "생존 친권자 여권 원본",
      "자녀 기본증명서 (상세) — 단독친권 또는 사망 사실 표기, 3개월 이내",
      "자녀 체류자격 증빙서류 원본",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
      "  ▸ 사별의 경우: 사망한 배우자의 사망증명서",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "기본증명서(상세)에 단독친권 또는 사망 사실이 표기되어야 합니다.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_minor_urgent_lost_korea: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "법정대리인 한국"],
    title: "⚡ 미성년자 긴급 단수여권 — 분실 · 법정대리인 한국 거주",
    docs: [
      "여권발급신청서 (자녀 명의, 자필 작성 — 컬러 출력)",
      "긴급여권 발급신청 사유서 (영사관 홈페이지 다운로드)",
      "여권 분실 신고서 (Police Report) — 방문 전 필수",
      "법정대리인 동의서 — 한국 거주 부 또는 모가 서명, 서명란에 반드시 인감도장 날인",
      "법정대리인 인감증명서 — 6개월 이내 발급본",
      "법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)",
      "자녀 체류자격 증빙서류 원본",
      "자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "여권용 사진 1매 — 반드시 사진관 촬영본",
      "긴급 출국 사유 증빙서류",
    ],
    costs: [
      { label: "긴급여권 수수료", value: "CAD $67.50 (현금, Debit, 신용카드)" },
      { label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (현금, Debit, 신용카드)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 긴급 상황에서 인감도장·인감증명서 준비가 어려울 수 있습니다 — 반드시 사전 전화 필수 (416-920-3809).",
      "⚠️ 사진은 사진관 촬영본 필수.",
      "법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만으로는 접수 불가.",
      "단수여권 1회용 — 여행 후 정식 전자여권 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

    passport_minor_urgent_lost: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "단수여권"], title: "⚡ 미성년자 긴급 단수여권 — 분실 시", docs: ["여권발급신청서 (영사관 비치, 법정대리인 서명)","여권 분실 신고서 (현지 경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","법정대리인 동의서 + 방문하는 법정대리인 여권 원본","여권용 사진 2매 — 반드시 사진관 촬영본 지참 (영사관 촬영 불가)","긴급 출국 사유 증빙서류 (항공권, 진단서 등)"], costs: [{ label: "단수여권 수수료", value: "CAD $67.50" },{ label: "긴급사유 인정 시 (감면)", value: "CAD $22.95 (긴급사유 인정 시)" }], time: "당일 발급 (방문 즉시)", notices: ["⚠️ 미국은 비전자여권(긴급여권)으로 입국·경유 불가 — 미국 경유로 한국 입국 시 DHL 전자여권(약 1주일) 또는 직항편 이용.","⚠️ 5년 이내 3회 이상 여권 분실자는 긴급여권 발급 불가.","반드시 경찰서 분실 신고(Police Report) 먼저 완료 후 방문하세요.","단수여권은 1회용 — 귀국 후 정식 전자여권 별도 신청 필요.","사진은 반드시 사진관에서 촬영해 오세요."], booking: "https://www.torbooking.com/book", bookingLabel: "사전 예약하기 (당일 방문) →" },


  passport_minor_married: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "혼인중·공동친권"], title: "미성년자 여권 재발급 — 부모 혼인 중 (공동친권)", docs: ["여권발급신청서 (자녀 명의, 영사관 비치, 법정대리인 자필 작성)","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본 (PR카드 / 비자 / 시민권증서)","법정대리인 동의서 — 부모 2인 모두 인적사항 기입, 부모 중 1인 서명","방문하는 부 또는 모의 여권 원본","부·모 여권 사본 각 1부 (방문하지 않는 부 또는 모 포함)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 (전산 확인 불가 시)","만 5세 미만: 여권용 사진 2매 — 사진관 촬영본 지참 필수 (영사관 무료촬영 불가)","만 5세 이상: 영사관 무료촬영 가능 (사진 미지참 시 자녀 동반 필요)","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" },{ label: "DHL 특급 (선택)", value: "별도 DHL 요금" }], time: "약 3~4주 (DHL 특급 선택 시 약 2주)", notices: ["공동친권: 동의서에 부모 2인 모두 인적사항 기재 — 방문은 1인만 해도 됩니다.","1인 1예약 = 업무건수 기준 — 자녀 2명 신청 시 예약 2자리 필요.","캐나다 출생 자녀는 반드시 한국 출생신고 완료 후에만 여권 신청 가능.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 사본 접수 불가."], booking: "https://www.torbooking.com/book" },
  passport_minor_divorced_sole: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "이혼·단독친권"], title: "미성년자 여권 재발급 — 이혼 후 단독친권", docs: ["여권발급신청서 (자녀 명의, 영사관 비치, 단독친권자 자필 작성)","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 단독친권자만 인적사항 기입 및 서명","단독친권자 여권 원본","단독친권 확인 서류: 자녀 기본증명서(상세) — 친권자가 1인으로 명시된 것 (3개월 이내)","자녀 가족관계증명서 (상세) — 3개월 이내","이혼판결문 또는 협의이혼 확인서 사본 (친권자 지정 내용 포함, 영문 판결문은 번역 필요)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" },{ label: "DHL 특급 (선택)", value: "별도 DHL 요금" }], time: "약 3~4주 (DHL 특급 시 약 2주)", notices: ["단독친권자만 방문 신청 가능 — 비친권자(다른 부모)의 동의 불필요.","기본증명서(상세)에 단독친권자가 명확히 표기되어야 합니다.","이혼 판결문이 영문인 경우 자필 번역 가능 (번역자 성명·서명·날짜 기재).","캐나다 법원 공동양육 협정이 있더라도 한국 법상 단독친권자 기준으로 처리됩니다 — 불명확 시 사전 전화 상담 권장 (416-920-3809)."], booking: "https://www.torbooking.com/book" },
  passport_minor_divorced_joint: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "이혼·공동친권"], title: "미성년자 여권 재발급 — 이혼 후 공동친권", docs: ["여권발급신청서","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기입, 방문 친권자가 서명","방문하는 공동친권자 여권 원본","비방문 공동친권자 여권 사본 1부","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","공동친권 확인 서류: 이혼 판결문 또는 협의이혼 확인서 (공동친권 명시)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["공동친권: 양쪽 친권자 모두의 동의가 필요합니다 — 동의서에 2인 모두 기재.","한 쪽 친권자가 여권 발급에 반대(부동의 의사 표시)한 경우 발급이 제한될 수 있습니다.","비방문 친권자가 한국에 있는 경우 인감도장이 날인된 동의서 + 인감증명서 필요 — 사전 전화 상담 권장.","이혼 판결문 영문본은 자필 번역 가능 (번역자 성명·날짜 기재)."], booking: "https://www.torbooking.com/book" },
  passport_minor_single: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "한부모(사별·미혼)"], title: "미성년자 여권 재발급 — 한부모 (사별 또는 미혼)", docs: ["여권발급신청서","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 생존 친권자만 인적사항 기입 및 서명","생존 친권자 여권 원본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","사별의 경우: 사망한 부 또는 모의 사망증명서 (번역 필요 시 자필 번역)","미혼의 경우: 자녀 기본증명서에 친권자가 1인으로 표기된 것으로 확인 가능","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["사망증명서가 영문인 경우 자필 번역 가능 (번역자 성명·서명·날짜 기재).","기본증명서(상세)에 사망 또는 단독친권이 표기되어야 합니다.","불명확한 경우 방문 전 전화 상담 권장 (416-920-3809)."], booking: "https://www.torbooking.com/book" },
  passport_minor_korea_parent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "법정대리인 한국"], title: "미성년자 여권 재발급 — 법정대리인이 한국에 거주", docs: ["여권발급신청서 (자녀 명의, 영사관 비치, 캐나다 측 성인이 대리 작성)","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 한국의 부 또는 모가 서명, 서명란에 반드시 인감도장 날인 (서명만 불가)","법정대리인 인감증명서 — 발급일로부터 6개월 이내","법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)","부·모 여권 사본 각 1부 (공동친권의 경우 두 분 모두)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만으로는 접수 불가.","인감증명서는 발급일로부터 6개월 이내 서류만 인정.","공동친권의 경우 두 분 모두의 인감도장·인감증명서 필요.","한국 서류는 방문 전 미리 준비해 오세요."], booking: "https://www.torbooking.com/book" },

  passport_minor_lost_korea_parent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "법정대리인 한국"], title: "미성년자 여권 분실 재발급 — 법정대리인이 한국에 거주", docs: ["여권발급신청서 (자녀 명의, 자필 작성)","여권 분실 신고서 (Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 한국의 부 또는 모가 서명, 서명란에 반드시 인감도장 날인","법정대리인 인감증명서 — 발급일로부터 6개월 이내","법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["⚠️ 경찰 분실 신고(Police Report) 먼저 완료 후 방문.","⚠️ 법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만으로는 접수 불가.","인감증명서는 발급일로부터 6개월 이내 서류만 인정.","공동친권의 경우 두 분 모두의 인감도장·인감증명서 필요."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_married: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "혼인중·공동친권"], title: "미성년자 여권 신규 발급 — 부모 혼인 중 (공동친권)", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 한국 발급본 (신규 발급 필수)","자녀 체류자격 증빙서류 원본 + 사본 (PR카드 / 비자 / 시민권증서 / 캐나다 출생증명서)","법정대리인 동의서 — 부모 2인 모두 인적사항 기입, 부모 중 1인 서명","방문하는 부 또는 모의 여권 원본","부·모 여권 사본 각 1부 (방문하지 않는 부 또는 모 포함)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 반드시 한국 출생신고 완료 후에만 여권 신청 가능.","기본증명서·가족관계증명서는 한국에서 발급해 오세요 (정부24 온라인 또는 주민센터).","신규 발급은 온라인 신청 불가 — 반드시 방문 신청.","공동친권: 동의서에 부모 2인 모두 기재, 방문은 1인으로 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_divorced_sole: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "이혼·단독친권"], title: "미성년자 여권 신규 발급 — 이혼 후 단독친권", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 (친권자 1인 명시)","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 단독친권자만 기입 및 서명","단독친권자 여권 원본","이혼판결문 또는 협의이혼 확인서 (단독친권 명시, 영문본은 자필 번역)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","기본증명서에 단독친권자가 명시되어야 합니다.","신규 발급은 반드시 방문 신청."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_divorced_joint: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "이혼·공동친권"], title: "미성년자 여권 신규 발급 — 이혼 후 공동친권", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기입, 방문 친권자 서명","방문하는 공동친권자 여권 원본 + 비방문 공동친권자 여권 사본","공동친권 확인: 이혼 판결문 또는 협의이혼 확인서 (공동친권 명시)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["공동친권: 양쪽 모두 동의 필요 — 한 쪽이 반대하면 발급 제한.","캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","신규 발급은 반드시 방문 신청."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_single: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "한부모"], title: "미성년자 여권 신규 발급 — 한부모 (사별 또는 미혼)", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 생존 친권자 기입 및 서명","생존 친권자 여권 원본","사별의 경우: 사망한 배우자의 사망증명서 (영문본은 자필 번역)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","기본증명서에 단독친권 또는 사망 사실이 표기되어야 합니다.","신규 발급은 반드시 방문 신청."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_korea_parent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "법정대리인 한국"], title: "미성년자 여권 신규 발급 — 법정대리인이 한국에 거주", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 한국 발급본","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 서명란에 반드시 인감도장 날인 (서명만 불가)","법정대리인 인감증명서 — 발급일로부터 6개월 이내","법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)","부·모 여권 사본 각 1부 (공동친권의 경우 두 분 모두)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만 접수 불가.","인감증명서는 발급일로부터 6개월 이내.","공동친권의 경우 두 분 모두의 인감도장·인감증명서 필요."], booking: "https://www.torbooking.com/book" },

  passport_minor_lost_married: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "혼인중·공동친권"], title: "미성년자 여권 분실 재발급 — 부모 혼인 중", docs: ["여권발급신청서","여권 분실 신고서 (현지 경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 부모 2인 인적사항 기입, 1인 서명","방문하는 부 또는 모의 여권 원본 + 부·모 여권 사본 각 1부","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["반드시 경찰서 분실 신고(Police Report) 완료 후 방문하세요.","공동친권: 동의서에 부모 2인 모두 기재, 방문은 1인으로 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_lost_divorced_sole: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "이혼·단독친권"], title: "미성년자 여권 분실 재발급 — 이혼 후 단독친권", docs: ["여권발급신청서","여권 분실 신고서 (경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 단독친권자만 기입 및 서명","단독친권자 여권 원본","자녀 기본증명서 (상세) — 단독친권자 표기 확인 (3개월 이내)","자녀 가족관계증명서 (상세) — 3개월 이내","이혼판결문 또는 협의이혼 확인서 (단독친권 명시)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["경찰 분실 신고(Police Report) 먼저 완료 후 방문.","단독친권자만 방문 신청 가능.","이혼 판결문 영문본은 자필 번역 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_lost_divorced_joint: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "이혼·공동친권"], title: "미성년자 여권 분실 재발급 — 이혼 후 공동친권", docs: ["여권발급신청서","여권 분실 신고서 (경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기입, 방문 친권자 서명","방문 친권자 여권 원본 + 비방문 친권자 여권 사본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","공동친권 확인: 이혼 판결문 또는 협의이혼 확인서","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["경찰 분실 신고(Police Report) 먼저 완료 후 방문.","공동친권: 양쪽 모두 동의 필요.","한 쪽이 여권 발급 반대 의사 표시를 한 경우 발급 제한 — 법원 명령이 있어야 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_lost_single: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "한부모"], title: "미성년자 여권 분실 재발급 — 한부모 (사별 또는 미혼)", docs: ["여권발급신청서","여권 분실 신고서 (경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 생존 친권자 기입 및 서명","생존 친권자 여권 원본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","사별의 경우: 사망한 배우자의 사망증명서","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "만 8세 이상 (58면 · 5년)", value: "CAD $59.40 (현금, Debit, 신용카드)" },{ label: "만 8세 이상 (26면 · 5년)", value: "CAD $55.35 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (58면 · 5년)", value: "CAD $47.25 (현금, Debit, 신용카드)" },{ label: "만 8세 미만 (26면 · 5년)", value: "CAD $43.20 (현금, Debit, 신용카드)" }], time: "약 3~4주", notices: ["경찰 분실 신고(Police Report) 먼저 완료 후 방문.","기본증명서에 단독친권 또는 사망 사실이 표기되어야 합니다."], booking: "https://www.torbooking.com/book" },

  // ══ FAMILY REGISTER (가족관계등록) ══

  family_start: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록"],
    question: "어떤 업무가 필요하신가요?",
    sub: "가족관계등록 업무는 크게 증명서 발급, 신고, 기록 정정으로 나뉩니다.",
    options: [
      { id: "family_cert", icon: "📄", title: "증명서 발급", desc: "가족관계·기본·혼인관계·영문증명서 등" },
      { id: "family_report", icon: "📝", title: "신고", desc: "출생·혼인·이혼·사망·인지신고" },
      { id: "family_fix", icon: "✏️", title: "기록 정정", desc: "외국인 가족 등록사항 직권정정" },
    ],
  },

  // ── 증명서 발급 ──
  family_cert: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급"],
    question: "어떤 증명서가 필요하신가요?",
    sub: "공동인증서가 있으면 온라인으로 즉시 무료 발급 가능합니다 — 영사관 방문 불필요.",
    options: [
      { id: "family_cert_korean", icon: "🇰🇷", title: "국문 증명서", desc: "가족관계·기본·혼인관계·입양관계·제적등본 등" },
      { id: "family_cert_english", icon: "🌐", title: "영문 증명서", desc: "본인·부모·배우자 정보를 담은 영문 증명서" },
    ],
  },

  family_cert_korean: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "국문 증명서"],
    question: "어떻게 발급받으시겠어요?",
    sub: "공동인증서가 있으면 온라인으로 즉시 무료 발급 가능합니다.",
    options: [
      { id: "family_cert_online", icon: "💻", title: "온라인 발급 (공동인증서)", desc: "즉시·무료·영사관 방문 불필요" },
      { id: "family_cert_family_kr", icon: "👨‍👩‍👧", title: "한국 직계가족 통해 발급", desc: "한국 거주 직계가족이 주민센터에서 즉시 발급" },
      { id: "family_cert_proxy", icon: "📋", title: "위임장 공증 후 대리인 발급", desc: "영사관에서 위임장 공증 → 한국 대리인이 발급" },
      { id: "family_cert_visit", icon: "🏛️", title: "영사관 방문 또는 우편", desc: "공동인증서 없는 경우 — 약 2주, 수수료 $1.30/통" },
    ],
  },

  family_cert_online: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "온라인"],
    title: "국문 증명서 온라인 발급",
    docs: [
      "공동인증서로 로그인 후 발급:",
      "  ▸ 전자가족관계등록시스템: efamily.scourt.go.kr",
      "  ▸ 정부24: gov.kr",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "한국 국적 보유자만 발급 가능 — 시민권 취득 후 국적상실신고를 하지 않아도 국적이 없으면 발급 불가.",
      "공동인증서가 없는 경우 영사관 방문 신청 가능 (공동인증서 발급 메뉴 참조).",
      "2008년 이전 국적상실신고 완료자: 가족관계증명서·기본증명서 발급 불가 — 제적등본만 가능.",
    ],
    booking: null,
    onlineLink: "https://efamily.scourt.go.kr",
  },

  family_cert_family_kr: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "한국 직계가족 통해"],
    title: "한국 직계가족을 통한 국문 증명서 발급",
    docs: [
      "위임장 불필요 — 한국 거주 직계가족이 가까운 주민센터·구청·읍면동 사무소 방문",
      "직계가족 범위: 조부모·부모·자녀·손자·배우자",
      "  ▸ 형제자매·며느리는 직계가족 해당 없음",
    ],
    costs: [{ label: "수수료", value: "현지 주민센터 기준" }],
    time: "즉시",
    notices: [
      "가장 빠른 방법입니다 — 한국에 직계가족이 있다면 이 방법을 우선 이용하세요.",
      "신청대상자가 혼인 전 외국국적 취득으로 국적상실한 경우: 가족관계등록부에 배우자·자녀가 표시되지 않을 수 있어 추가 서류 필요 (예: 캐나다 혼인증명서 원본 + 한글 번역문).",
      "2008년 이전 국적상실신고 완료자: 제적등본만 발급 가능.",
    ],
    booking: null,
  },

  family_cert_proxy: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "위임장 공증 후 대리인"],
    title: "위임장 공증 후 대리인 발급",
    docs: [
      "영사관 방문하여 위임장 공증 (공증 메뉴 → 사서증서 인증 → 일반 위임장)",
      "공증된 위임장을 한국 대리인에게 송부",
      "대리인이 신분증 + 위임장 지참 후 전국 구청·주민센터 방문 신청",
      "  ▸ 위임인의 등록기준지와 성명을 알아야 합니다",
    ],
    costs: [{ label: "위임장 공증 수수료", value: "CAD $2.70" }],
    time: "즉시 (대리인 방문 시)",
    notices: [
      "공증 예약 필수: torbooking.com",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 위임장) →",
  },

  family_cert_visit: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "영사관 방문·우편"],
    question: "수령 방법을 선택하세요",
    options: [
      { id: "family_cert_visit_direct", icon: "🏛️", title: "영사관 방문 신청·수령", desc: "약 2주 후 방문 수령 (예약 필수)" },
      { id: "family_cert_visit_mail", icon: "📮", title: "우편 신청·수령", desc: "약 2주 + 배송기간 (XpressPost 봉투 필요)" },
    ],
  },

  family_cert_visit_direct: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "영사관 방문"],
    title: "국문 증명서 발급 — 영사관 방문",
    docs: [
      "가족관계 등록사항별 증명서 교부 등 신청서 (영사관 비치 양식)",
      "  ▸ 주민등록번호 반드시 기재 (모르는 경우 등록기준지 기재)",
      "신청자 신분증 원본 + 사본 (여권·영주권카드·운전면허 등)",
      "동일인확인서 (해당자만) — 한국 등록 성명과 캐나다 신분증 성명이 다른 경우",
      "  ▸ 가족 4촌 이내 2명 서명 필요",
      "Marriage Certificate 원본+사본 — 한국에 혼인신고 안 된 상태에서 남편 성을 따른 경우",
    ],
    costs: [{ label: "통당 수수료", value: "CAD $1.30 (현금, Debit, 신용카드)" }],
    time: "약 2주 (발급 완료 후 별도 안내 전화 없음 — 예정일에 방문 수령)",
    notices: [
      "방문 예약 필수: torbooking.com — 직계가족(조부모·부모·자녀·손자·배우자)은 위임장 없이 신청 가능, 단 각각 별도 예약 필요.",
      "형제자매·며느리는 직계가족 해당 없음.",
      "2008년 이전 국적상실신고 완료자: 가족관계증명서·기본증명서 발급 불가 → 제적등본만 신청 (신청서에 등록기준지·호주 이름·관계 기재 필수).",
      "국적상실신고 여부 불분명한 경우: 기본증명서·가족관계증명서·제적등본 모두 신청.",
      "수령은 예약 없이 방문 가능하나, 예약자 우선 처리로 대기 시간이 길 수 있습니다.",
      "💡 캐나다 연금(CPP/OAS) 신청용 혼인관계증명서가 필요한 경우: 발급 후 공증 → 번역 공증 메뉴에서 추가 절차 안내를 확인하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계증명서 발급) →",
  },

  family_cert_visit_mail: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "우편 신청"],
    title: "국문 증명서 발급 — 우편 신청",
    docs: [
      "가족관계 등록사항별 증명서 교부 등 신청서 (양식)",
      "신청자 신분증 사본",
      "발급대상자 신분증 사본 (신청자와 다른 경우)",
      "동일인확인서 (해당자만) — 한국 등록 성명과 캐나다 신분증 성명이 다른 경우",
      "수수료: CAD $1.30/통 — 현금 또는 Money Order",
      "반송용 XpressPost 등기봉투 (Canada Post 구매) — 보내는 주소·받는 주소 모두 본인 주소 기재",
    ],
    costs: [{ label: "통당 수수료", value: "CAD $1.30 (현금 또는 Money Order)" }],
    time: "약 2주 + 우편 배송기간",
    notices: [
      "2008년 이전 국적상실신고 완료자: 제적등본만 신청 가능.",
      "반송봉투 미동봉 시 서류를 받을 수 없습니다.",
    ],
    booking: null,
  },

  family_cert_english: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "영문 증명서"],
    question: "어떻게 발급받으시겠어요?",
    sub: "영문증명서는 본인·부모·배우자 정보를 하나의 증명서에 담은 서류입니다. 자녀 정보는 포함되지 않습니다.",
    options: [
      { id: "family_cert_english_online", icon: "💻", title: "온라인 발급 (공동인증서)", desc: "전자가족관계등록시스템에서 즉시 무료 발급" },
      { id: "family_cert_english_visit", icon: "🏛️", title: "영사관 방문", desc: "약 10일 처리 — 등록기준지 정확히 기재 필수" },
    ],
  },

  family_cert_english_online: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "영문 증명서", "온라인"],
    title: "영문 증명서 온라인 발급",
    docs: [
      "공동인증서로 로그인 후 발급:",
      "  ▸ 전자가족관계등록시스템: efamily.scourt.go.kr → 본인·부모·배우자·자녀 영문증명서 무료 발급",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "영문증명서 포함 정보: 본인(성명·성별·생년월일·주민번호·출생장소), 부모(성명·성별·생년월일·주민번호), 배우자(성명·성별·생년월일·주민번호·혼인일) — 자녀 정보 미포함.",
      "사망·국적상실 등으로 가족관계등록부가 폐쇄된 경우 발급 불가.",
      "외국인 가족이 있는 경우: 해당 가족 여권 지참 후 영문 성명 등록 신청 필요.",
      "상세 정보(이름 변경·과거 혼인이혼·자녀 등)가 필요한 경우: 국문 기본증명서(상세)·가족관계증명서(상세)·혼인관계증명서(상세) 발급 후 번역 공증.",
      "⚠️ 캐나다 이민국(IRCC) 제출용은 영사관 번역 공증 불인정 — 전문 번역사 필요 (공증 → 번역 공증 메뉴 참조).",
    ],
    booking: null,
    onlineLink: "https://efamily.scourt.go.kr",
  },

  family_cert_english_visit: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "영문 증명서", "영사관 방문"],
    title: "영문 증명서 발급 — 영사관 방문",
    docs: [
      "가족관계 등록사항별 증명서 교부 등 신청서 (영사관 비치)",
      "  ▸ 등록기준지(본적) 정확히 기재 필수 — 미기재 또는 오기재 시 발급 불가",
      "신청자 신분증 원본 + 사본",
    ],
    costs: [{ label: "수수료", value: "CAD $1.30 (현금, Debit, 신용카드)" }],
    time: "약 10일",
    notices: [
      "영문증명서 포함 정보: 본인·부모·배우자 — 자녀 정보 미포함.",
      "상세 정보가 필요한 경우 국문 증명서 + 번역 공증을 이용하세요.",
      "외국인 가족이 있는 경우: 해당 가족 여권 지참 필수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계증명서 발급) →",
  },

  // ── 신고 ──
  family_report: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고"],
    question: "어떤 신고가 필요하신가요?",
    options: [
      { id: "family_birth", icon: "👶", title: "출생신고", desc: "캐나다 출생 자녀의 한국 등록부 등재" },
      { id: "family_marriage", icon: "💍", title: "혼인신고", desc: "캐나다에서 혼인 후 한국 등록부 반영" },
      { id: "family_divorce", icon: "📋", title: "이혼신고", desc: "협의이혼의사확인 또는 캐나다 법원 이혼 후 신고" },
      { id: "family_death", icon: "🕊️", title: "사망신고", desc: "캐나다에서 사망한 한국 국민" },
      { id: "family_recognition", icon: "👤", title: "인지신고", desc: "혼외자를 법적 자녀로 인정하는 절차" },
    ],
  },

  // ── 출생신고 ──
  family_birth: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "출생신고"],
    question: "부모의 국적 상황은?",
    sub: "부모 국적 조합에 따라 필요 서류가 달라집니다.",
    options: [
      { id: "family_birth_both_korean", icon: "🇰🇷", title: "부모 모두 한국 국적", desc: "혼인신고 완료 후 신청 가능" },
      { id: "family_birth_father_korean", icon: "👨", title: "부(아버지)만 한국인 + 모(어머니)는 외국인", desc: "Long-form 출생증명서 필수 — 혼외자는 인지신고 별도" },
      { id: "family_birth_mother_korean", icon: "👩", title: "모(어머니)만 한국인 + 부(아버지)는 외국인", desc: "Long-form 출생증명서 필수" },
      { id: "family_birth_unmarried", icon: "👤", title: "미혼 한국인 (혼외자)", desc: "부를 모르는 경우 모의 성·본을 따름" },
    ],
  },

  family_birth_both_korean: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "출생신고", "부모 모두 한국인"],
    title: "출생신고 — 부모 모두 한국인",
    docs: [
      "전자적송부신청서 (양식) — 카카오톡 연결 전화번호 기재 시 처리결과 알림 수신 가능",
      "출생신고서 (양식) — 반드시 샘플 참고, 한글·아라비아숫자만 기재",
      "  ▸ 주소: 한글로 소리나는 대로 기재 (예: 캐나다 온타리오주 토론토시 애비뉴로드 555번지)",
      "  ▸ 출생장소: 병원명 + 소재지 기재 (예: 캐나다 온타리오주 토론토시 세인트마이클 종합병원)",
      "  ▸ 자녀 등록기준지: 부 또는 모의 등록기준지를 따르거나 새 한국 주소 기재 ('캐나다' 기재 불가)",
      "  ▸ 기타란: '외국성명: 스미스제임스길동' 형식으로 캐나다 출생증명서상 이름 한글로 기재",
      "출생증명서 원본 1부 (반환 불가)",
      "  ▸ 부모 이름이 표시된 증명서라면 종류 무관",
      "  ▸ 혼인 후 200일 이내 출생 시: Long-form 출생증명서 + Long-form 혼인증명서 사본",
      "출생증명서 한글 번역문 (본인 직접 번역 가능, 공증 불필요, 하단에 번역일자·번역자 이름·서명)",
      "동일인확인서 (해당자만) — 한국 등록 이름과 캐나다 등록 이름이 다른 경우",
      "부·모 여권 원본 + 사본 각 1부",
      "  ▸ 복수국적자: 모든 국가 유효 여권 사본 제출",
      "부·모 캐나다 체류자격 증명서류 사본 각 1부",
      "  ▸ 방문자: 체류비자 / 영주권자: PR카드 앞면 / 시민권자: 시민권증서 (카드형 불가, 선서일 년월일 표시 필수) / 캐나다 출생 시민권자: Birth Certificate",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주 (3개월 이내 신고 권장 — 초과 시 한국 입국 후 주민센터에서 과태료 최대 5만원)",
    notices: [
      "⚠️ 출생신고를 해도 주민등록번호는 생기지 않습니다 — 본인이 한국 입국 후 주민센터에서 주민등록 신고 별도 필요.",
      "⚠️ 혼인신고가 완료되지 않은 경우 혼인신고 처리 완료(약 4주) 후 출생신고 접수.",
      "한자 이름 사용 시: 반드시 대법원 인명용 한자 사용 (비인명용 한자 등록 불가).",
      "자녀 이름은 원칙적으로 최대 5자 이내.",
      "부 또는 모가 복수국적자인 경우: 모든 국가 유효 여권 사본 제출.",
      "출생증명서 원본은 한국으로 송부되며 반환되지 않습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 출생신고) →",
  },

  family_birth_father_korean: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "출생신고", "부 한국인 + 모 외국인"],
    title: "출생신고 — 부(아버지) 한국인 + 모(어머니) 외국인",
    docs: [
      "전자적송부신청서 (양식)",
      "출생신고서 (양식) — 한글·아라비아숫자만 기재",
      "  ▸ 부의 등록기준지(본적) 정확히 기재 / 모의 등록기준지란에 '캐나다' 기재",
      "  ▸ 자녀 등록기준지: 부의 등록기준지를 따르거나 새 한국 주소 기재",
      "  ▸ 기타란: 외국성명 한글로 기재",
      "Birth Certificate Long-form (Certified copy of birth registration) 원본 (반환 불가)",
      "출생증명서 한글 번역문 (공증 불필요, 하단에 번역일자·이름·서명)",
      "동일인확인서 (해당자만)",
      "부·모 여권 원본 + 사본 각 1부",
      "부·모 캐나다 체류자격 증명서류 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "⚠️ 혼인 중 자녀: 부의 인지 없이도 친자관계 인정.",
      "⚠️ 혼외자(혼인 외 출생)인 경우: 부의 출생신고만으로 가족관계등록부 작성 불가 — 인지신고 후 국적취득 절차 별도 필요 (인지신고 메뉴 참조).",
      "외국인 모의 성을 따르는 경우: 성은 한자 기재 불가, 이름은 한자 기재 가능.",
      "출생증명서 원본은 반환되지 않습니다.",
      "⚠️ 출생신고 후 주민등록번호는 한국 입국 후 주민센터에서 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 출생신고) →",
  },

  family_birth_mother_korean: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "출생신고", "모 한국인 + 부 외국인"],
    title: "출생신고 — 모(어머니) 한국인 + 부(아버지) 외국인",
    docs: [
      "전자적송부신청서 (양식)",
      "출생신고서 (양식) — 한글·아라비아숫자만 기재",
      "  ▸ 모의 등록기준지(본적) 정확히 기재 / 부의 등록기준지란에 '캐나다' 기재",
      "  ▸ 자녀 등록기준지: 모의 등록기준지를 따르거나 새 한국 주소 기재",
      "  ▸ 기타란: 외국성명 한글로 기재",
      "Birth Certificate Long-form 원본 (반환 불가)",
      "출생증명서 한글 번역문 (공증 불필요)",
      "동일인확인서 (해당자만)",
      "부·모 여권 원본 + 사본 각 1부",
      "부·모 캐나다 체류자격 증명서류 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "외국인 부의 성을 따르는 경우: 캐나다 출생증명서상 이름 그대로 또는 한국식 이름 등록 가능.",
      "  ▸ 예) Smith James Gildong → 스미스제임스길동(✅) / 스미스길동(✅) / 스미스제임스(❌)",
      "한국인 모의 성을 따르는 경우: 외국식 이름 등록 불가.",
      "  ▸ 예) 모가 김씨인 경우 → 김길동(✅) / 김제임스길동(❌)",
      "모가 혼외자를 신고하는 경우: 모의 성·본을 따릅니다.",
      "출생증명서 원본은 반환되지 않습니다.",
      "⚠️ 출생신고 후 주민등록번호는 한국 입국 후 주민센터에서 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 출생신고) →",
  },

  family_birth_unmarried: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "출생신고", "미혼 한국인 (혼외자)"],
    title: "출생신고 — 미혼 한국인 (혼외자)",
    docs: [
      "전자적송부신청서 (양식)",
      "출생신고서 (양식)",
      "  ▸ 부를 알 수 없는 경우: 모의 성·본을 따름",
      "  ▸ 한국인 부의 성·본을 따르는 경우: 부의 성·본에 따라 신고 가능 (단, 가족관계등록부에 부 기록 불가)",
      "Birth Certificate 원본 (부모 이름 표시된 것)",
      "출생증명서 한글 번역문",
      "신고인(부 또는 모) 여권 원본 + 사본",
      "신고인 캐나다 체류자격 증명서류 사본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "외국인 부의 성을 따르고자 하는 경우: 외국인 부가 직접 출생신고해야 합니다.",
      "한국인 부와 외국인 모 사이의 혼외자: 부의 출생신고만으로 가족관계등록부 작성 불가 — 인지신고 + 국적취득 절차 필요 (인지신고 메뉴 참조).",
      "출생증명서 원본은 반환되지 않습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 출생신고) →",
  },

  // ── 혼인신고 ──
  family_marriage: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "혼인신고"],
    question: "혼인 당사자의 국적 상황은?",
    options: [
      { id: "family_marriage_korean", icon: "🇰🇷", title: "쌍방 모두 한국인", desc: "두 분 모두 한국 국적인 경우" },
      { id: "family_marriage_mixed", icon: "🌏", title: "일방이 외국인", desc: "한국인 + 외국인 조합" },
    ],
  },

  family_marriage_korean: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "혼인신고", "쌍방 한국인"],
    title: "혼인신고 — 쌍방 모두 한국인",
    docs: [
      "전자적송부신청서 (양식) — 카카오톡 연결 전화번호 기재 시 알림 수신",
      "혼인신고서 (양식) — 한글·아라비아숫자만 기재, 증인란 공란",
      "  ▸ 등록기준지(본적) 정확히 기재 — 가족관계증명서 상단에 표시",
      "  ▸ 혼인 당사자 쌍방 서명",
      "  ▸ 주소: 한글로 소리나는 대로 기재",
      "Marriage Certificate 원본 1부 (반환 불가)",
      "  ▸ 쌍방 한국인: Short-form 또는 Long-form 무관",
      "  ▸ 혼인 후 200일 이내 출생 자녀 있는 경우: Long-form 필수",
      "혼인증명서 한글 번역문 (공증 불필요, 하단에 번역일자·이름·서명)",
      "혼인 당사자 두 사람의 여권 원본 + 사본 각 1부",
      "  ▸ 복수국적자: 모든 국가 유효 여권 사본",
      "혼인 당사자 두 사람의 캐나다 체류자격 증명서류 사본 각 1부",
      "동일인확인서 (해당자만) — 혼인증명서상 성명과 현재 여권 성명이 다른 경우",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주 (혼인신고 처리 완료 후 출생신고 접수 가능)",
    notices: [
      "⚠️ 혼인신고 장소: 혼인이 성립한 재외공관 관할 지역에 신고 (토론토 관할: 온타리오·마니토바주).",
      "혼인증명서 원본은 반환되지 않습니다.",
      "본(本): 한자로 반드시 기재 (예: 김해 김씨 → 金海).",
      "등록기준지 오기재 시 서류 반송 — 기본증명서 또는 가족관계증명서 상단 확인.",
      "자녀의 성본 협의 (모의 성·본을 따르는 경우) 협의서 별도 제출 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 혼인신고) →",
  },

  family_marriage_mixed: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "혼인신고", "한국인 + 외국인"],
    title: "혼인신고 — 한국인 + 외국인",
    docs: [
      "전자적송부신청서 (양식)",
      "혼인신고서 (양식) — 한글·아라비아숫자만 기재, 증인란 공란",
      "  ▸ 한국인의 등록기준지(본적) 정확히 기재",
      "  ▸ 외국인 배우자 이름: 성·이름 순, 미들네임 포함, 끝에 기재 (예: Last First Middle 한글)",
      "  ▸ 혼인당시 한국국적자가 아닌 경우 등록기준지란에 해당 국적 기재 (예: '캐나다')",
      "Marriage Certificate Long-form 원본 1부 (반환 불가)",
      "  ▸ 혼인 당사자 중 일방이 외국인인 경우 Long-form 필수",
      "혼인증명서 한글 번역문 (공증 불필요)",
      "혼인 당사자 두 사람의 여권 원본 + 사본 각 1부",
      "  ▸ 시민권자: 시민권증서 (카드형·Search of Citizenship Record 불가, 선서일 년월일 표시 필수)",
      "  ▸ 캐나다 출생 시민권자: Birth Certificate (Short/Long form 무관)",
      "  ▸ 복수국적자: 모든 국가 유효 여권 사본 + 출생증명서 또는 시민권증서",
      "동일인확인서 (해당자만)",
      "  ▸ 이름 변경한 경우 Name Change Certificate도 함께 제출",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "⚠️ 혼인신고 장소: 혼인이 성립한 재외공관 관할 지역에 신고.",
      "혼인증명서·혼인판결문 원본은 반환되지 않습니다.",
      "본(本): 한국인의 본을 한자로 기재, 외국인은 공란.",
      "등록기준지 오기재 시 서류 반송.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 혼인신고) →",
  },

  // ── 이혼신고 ──
  family_divorce: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "이혼신고"],
    question: "이혼 방식은?",
    sub: "이혼 방식에 따라 절차와 서류가 완전히 달라집니다.",
    options: [
      { id: "family_divorce_agreement", icon: "🤝", title: "협의이혼 (쌍방 합의)", desc: "쌍방 모두 한국 국적 필수 — 약 6개월 소요" },
      { id: "family_divorce_court", icon: "⚖️", title: "재판이혼 (캐나다 법원 판결)", desc: "캐나다 법원 이혼 후 한국에 신고 — 약 3주" },
    ],
  },

  family_divorce_agreement: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "이혼신고", "협의이혼"],
    title: "협의이혼의사확인 신청",
    docs: [
      "협의이혼의사확인 신청서 (양식) — 한글로 작성",
      "이혼신고서 3부 — 한글·아라비아숫자만 기재",
      "  ▸ 등록기준지(본적) 정확히 기재",
      "  ▸ 양육비 지급일: 29·30·31일 불가 → '말일'로 기재",
      "자녀양육과 친권자 결정에 관한 협의서 3부 (미성년 자녀 있는 경우만)",
      "  ▸ 특별한 사유 없이 공동친권 기재 시 반송",
      "이혼 당사자들의 가족관계증명서(상세) + 혼인관계증명서(상세) 각 1부",
      "  ▸ 상세증명서·주민번호 전부공개, 이혼당사자 각각 발급",
      "재외국민등록부 등본 각 1부 (외국 거주자)",
      "주민등록등본 각 1부 (한국 거주자)",
      "이혼 당사자 여권 사본 각 1부",
      "체류자격 증명서류 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월 (영사 면담 → 한국 가정법원 심사 → 이혼확인서 교부 → 이혼신고)",
    notices: [
      "⚠️ 쌍방 모두 대한민국 국적 보유자여야 합니다 — 일방이 외국인이면 캐나다 법원에서 이혼 후 신고.",
      "이혼 당사자 쌍방이 영사관을 방문하여 면담해야 합니다.",
      "다른 관할 지역 거주 시 (예: 남편-밴쿠버, 아내-토론토): 한 곳 선택 접수 후 쌍방 그 영사관 방문.",
      "일방이 한국 거주: 영사관 또는 한국 가정법원 선택 가능 — 한국 가정법원 접수가 더 빠를 수 있음.",
      "면접교섭권을 지나치게 제약하는 경우 반송.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 협의이혼) →",
  },

  family_divorce_court: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "이혼신고", "재판이혼"],
    title: "재판이혼 신고 — 캐나다 법원 이혼 후 한국 신고",
    docs: [
      "전자적송부신청서 (양식)",
      "이혼신고서 (양식) — 한글·아라비아숫자만 기재",
      "  ▸ 등록기준지(본적) 정확히 기재",
      "  ▸ 재판확정일자: 판결일이 아닌 효력발생일 기재 (일반적으로 판결일로부터 한달 뒤)",
      "  ▸ 친권: 판결문에 Custody 미기재 시 친권란 공란",
      "이혼증명서 (Certificate of Divorce) 원본 등본 (반환 불가)",
      "이혼증명서 한글 번역문 (공증 불필요, 하단에 번역일자·이름·서명)",
      "이혼판결문 (Certificate of Judgement 또는 Divorce Order) 원본 등본 (반환 불가)",
      "이혼판결문 한글 번역문",
      "Separation Agreement 원본 등본 + 번역문 (미성년 자녀 있는 경우, 판결문에 상세 양육권 기재 시 불필요)",
      "이혼 당사자 여권 사본 각 1부",
      "신고 당사자 체류자격 증명서류 사본 1부",
      "동일인확인서 (해당자만) — 성명 변경된 경우",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 3주",
    notices: [
      "⚠️ 신고인은 이혼판결일 기준 반드시 한국 국적 보유자여야 합니다 — 판결 당시 이미 캐나다 시민권자인 경우 신고 불가.",
      "⚠️ 온타리오·마니토바주 법원 발행 서류만 제출 가능.",
      "이혼증명서·판결문 원본은 반환되지 않습니다.",
      "본(本): 이혼 당사자의 본을 한자로 기재 (외국인은 공란).",
      "우편 접수 가능 — 신고서 서명은 신고인이 직접 해야 함.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 이혼신고) →",
  },

  // ── 사망신고 ──
  family_death: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "사망신고"],
    title: "사망신고",
    docs: [
      "전자적송부신청서 (양식) — 카카오톡 연결 전화번호 기재 시 알림 수신",
      "사망신고서 (양식)",
      "  ▸ 주소: 한글로 소리나는 대로 기재",
      "  ▸ 등록기준지(본적) 정확히 기재 — 사망자의 등록기준지",
      "사망증명서 원본 등본 (반환 불가)",
      "  ▸ 반드시 캐나다 주정부 발행 증명서 — 장의사 발행 불가",
      "  ▸ 가급적 Long-form (Certified Copy of Death Registration, Form 15) 제출",
      "  ▸ 성명·생년월일·사망일자 정확해야 함 — 오류 시 주정부에 정정 후 제출",
      "사망증명서 한글 번역문 (공증 불필요, 하단에 번역일자·이름·서명)",
      "신고자 여권 원본 + 사본 (유효한 여권)",
      "신고자 체류자격 증명서류 원본 + 사본",
      "동일인확인서 (해당자만) — 신고자 또는 사망자 성명 변경된 경우",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "신고인 자격: 호주·친족·동거자.",
      "⚠️ 사망자가 사망 전 외국 국적을 취득한 경우 사망신고 불가.",
      "사망증명서 원본은 한국으로 송부되며 반환되지 않습니다.",
      "우편 접수 가능 — 신고서 작성 시 예제 반드시 확인 (등록기준지 오기재로 반송 사례 다수).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 사망신고) →",
  },

  // ── 인지신고 ──
  family_recognition: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "신고", "인지신고"],
    title: "인지신고 — 혼외자를 법적 자녀로 인정",
    docs: [
      "전자적송부신청서 (양식) — 신고자(부) 인적사항만 작성, 카카오톡 연결 전화번호 기재",
      "인지신고서 (양식)",
      "  ▸ 주소: 한글로 소리나는 대로 기재",
      "  ▸ '부모가 정한 등록기준지(본적)' 반드시 기재",
      "  ▸ 이름 한자 사용 시: 대법원 인명용 한자만 사용",
      "출생증명서 원본 (부모 이름 표시된 것, 반환 불가)",
      "  ▸ 심사 후 필요시 Long-form 추가 요청될 수 있음",
      "출생증명서 한글 번역문 (번역예시 참고, 공증 불필요)",
      "동일인확인서 (해당자만) — 한국 등록 이름과 캐나다 이름이 다른 경우",
      "부·모 여권 원본 + 사본 각 1부",
      "부·모 캐나다 체류자격 증명서류 원본 + 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 3주",
    notices: [
      "인지신고는 생부 또는 생모가 혼인 외의 자를 자기의 자로 승인하여 법률상 친자관계를 발생시키는 행위입니다.",
      "한국인 모의 혼외자: 출생으로 한국 국적 취득 → 출생신고만 하면 됩니다.",
      "한국인 부 + 외국인 모의 혼외자: 부의 인지 후 별도 국적취득 절차 필요.",
      "  ▸ 피인지자가 미성년자: 법무부장관에게 국적취득신고로 한국 국적 취득.",
      "  ▸ 피인지자가 성년자: 특별귀화 요건 충족 후 귀화허가 필요.",
      "⚠️ 우편 접수 불가 — 부가 반드시 영사관 방문 신청.",
      "출생증명서 원본은 반환되지 않습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 인지신고) →",
  },

  // ── 기록 정정 ──
  family_fix: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기록 정정"],
    question: "어떤 정정이 필요하신가요?",
    sub: "외국인 가족의 가족관계등록부 기재사항을 정정하는 절차입니다. 반드시 혼인신고 등 등록이 완료된 상태여야 합니다.",
    options: [
      { id: "family_fix_death", icon: "🕊️", title: "외국인 가족 사망기록 추가", desc: "외국국적 가족이 사망한 경우 기록 정정" },
      { id: "family_fix_info", icon: "✏️", title: "외국인 가족 국적·성별·생년월일·번호 정정", desc: "기재 누락 또는 오류 정정" },
    ],
  },

  family_fix_death: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기록 정정", "외국인 가족 사망기록"],
    title: "외국인 가족 사망기록 직권정정",
    docs: [
      "전자적송부신청서 (양식)",
      "가족관계등록부 직권정정신청서 (양식)",
      "외국인 가족 사망증명서 (주재국 사망증명서)",
      "사망증명서 한글 번역문 — 전체 내용 번역 (전문번역가 또는 본인 직접, 하단에 이름·서명·번역일자)",
      "외국인 가족의 여권",
      "신청인의 대한민국 여권 원본",
      "가족관계증명서 + 혼인관계증명서 각 1부 (대상자가 배우자인 경우)",
      "  ▸ 상세증명서, 주민번호 전부공개",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 3~4주",
    notices: [
      "대상: 외국국적 가족 (한국 가족관계등록부에 등재된 외국인).",
      "사망신고가 아닌 직권정정 신청입니다 — 외국국적자는 사망신고 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 직권정정) →",
  },

  family_fix_info: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기록 정정", "외국인 가족 정보 정정"],
    title: "외국인 가족 국적·성별·생년월일·외국인등록번호 정정",
    docs: [
      "전자적송부신청서 (양식)",
      "가족관계등록부 직권정정신청서 (양식)",
      "외국인 가족의 출생증명서 사본",
      "출생증명서 한글 번역문 (전문번역가 또는 본인 직접, 하단에 이름·서명·번역일자)",
      "외국인 가족의 시민권증서 사본 (후천적 캐나다 시민권 취득자)",
      "외국인 가족의 여권 사본",
      "신청인(한국 국민) 대한민국 여권 원본 + 사본",
      "신청인의 재외국민등록부 등본",
      "가족관계증명서 (상세, 주민번호 전부공개)",
      "혼인관계증명서 (정정 대상이 외국인 배우자인 경우)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 3~4주",
    notices: [
      "대상: 가족관계등록부상 출생연월일·외국인등록번호·국적·성별이 기록되지 않았거나 오류가 있는 외국인 가족.",
      "반드시 혼인신고 등 등록이 이미 완료된 상태여야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 직권정정) →",
  },

  // ══ NATIONALITY (국적) ══

  nationality_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적"],
    question: "해당하는 상황을 선택하세요",
    sub: "국적 업무는 상황에 따라 완전히 달라집니다.",
    options: [
      { id: "nationality_citizen_start", icon: "🍁", title: "나 또는 가족이 캐나다 시민권을 취득했어요", desc: "국적상실·이탈·보유·선택신고 — 내 상황에 맞게 안내" },
      { id: "nationality_renounce_exception", icon: "⚠️", title: "이탈 신고 기간을 놓쳤어요 (병역미필 남성)", desc: "만 18세 3월 31일 이후 기간을 넘긴 경우 — 예외적 국적이탈 허가 · CAD $121.50" },
      { id: "nationality_acquire", icon: "👶", title: "한국인 아버지와 외국인 어머니 사이의 혼외자 국적취득 (인지)", desc: "혼인 외 출생자 — 한국인 부의 인지 후 국적취득 절차 · CAD $24.30" },
      { id: "nationality_recover", icon: "🇰🇷", title: "한국 국적을 되찾고 싶어요 (65세 이상)", desc: "복수국적 회복 — 한국 출입국사무소에서만 신청 가능" },
    ],
  },

  // ── 시민권 취득 → 출생지 확인 ──
  nationality_citizen_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "시민권 취득"],
    question: "본인은 어디서 태어났나요?",
    sub: "출생지에 따라 국적 업무 종류가 달라집니다.",
    options: [
      { id: "nationality_loss", icon: "🇰🇷", title: "한국에서 태어났어요", desc: "후천적 시민권 취득 → 국적상실신고 · 무료" },
      { id: "nationality_born_abroad", icon: "🌏", title: "해외에서 태어났어요 (선천적 복수국적)", desc: "태어날 때부터 두 국적 → 포기 또는 유지 선택" },
    ],
  },

  // ── 해외 출생 → 포기 or 유지 ──
  nationality_born_abroad: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "시민권 취득", "해외 출생"],
    question: "한국 국적을 어떻게 하고 싶으세요?",
    sub: "선천적 복수국적자는 한국 국적을 포기하거나 유지할 수 있습니다.",
    options: [
      { id: "nationality_renounce_start", icon: "🚫", title: "한국 국적을 포기할게요", desc: "국적이탈신고 · CAD $24.30 · 남성 만 18세 3월 31일까지" },
      { id: "nationality_keep_start", icon: "✅", title: "한국 국적을 유지하고 싶어요", desc: "국적보유신고 또는 국적선택신고" },
    ],
  },

  // ── 유지 → 보유신고 or 선택신고 ──
  nationality_keep_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "시민권 취득", "해외 출생", "한국 국적 유지"],
    question: "시민권 취득일로부터 6개월이 지났나요?",
    sub: "6개월 이내라면 국적보유신고, 이후라면 국적선택신고(외국국적불행사 서약)를 진행합니다.",
    options: [
      { id: "nationality_retain", icon: "✅", title: "6개월 이내예요 — 국적보유신고", desc: "수반취득자 · CAD $24.30 · 6개월 이내 신청 필수" },
      { id: "nationality_choice", icon: "✍️", title: "6개월 초과예요 — 국적선택신고", desc: "외국국적불행사 서약 · 무료 · 여자 만 22세 전" },
    ],
  },

  nationality_retain_expired: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적보유신고 기한 초과"],
    title: "⚠️ 국적보유신고 기한 초과",
    docs: [],
    costs: [{ label: "수수료", value: "무료" }],
    time: "해당없음",
    notices: [
      "외국국적 취득일로부터 6개월 초과 시 국적보유신고 불가 — 소급하여 대한민국 국적 상실.",
      "이 경우 국적상실신고 후 상황에 따라 국적이탈 또는 국적선택 절차 진행.",
      "정확한 안내를 위해 방문 전 전화 상담 권장 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 →",
  },

  // ── 국적상실신고 ──
  nationality_loss: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적상실신고"],
    title: "국적상실신고 — 후천적 시민권 취득자",
    docs: [
      "국적상실신고서 (양식) — 작성예시 참고, 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인(부 또는 모) 서명",
      "증명사진 1매 (3.5×4.5cm, 흰색배경, 6개월 이내, 사진관 촬영 필수)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가 — 반드시 사진관에서 촬영해 오세요",
      "캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "시민권증서 원본 + 사본",
      "  ▸ 시민권 취득일자(선서일) 년월일 표시 필수",
      "  ▸ 시민권 카드·Search of Citizenship Record 제출 불가",
      "  ▸ e-Certificate: 출력하여 제출 가능",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내) — 신청대상자 이름으로 발급",
      "  ▸ 영사관 신청 시 2주 소요 — 미리 발급받아 제출",
      "가족관계증명서 (상세, 주민번호 전부공개)",
      "동일인증명서 (해당자만) — 이름 변경된 경우 (4촌이내 가족 2명 서명)",
      "Marriage Certificate 사본 (해당자만) — 한국에 혼인신고 없이 남편 성을 따른 경우",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월 (카카오톡 또는 이메일로 결과 통보)",
    notices: [
      "⚠️ 시민권 선서일에 한국 국적이 자동 상실됩니다 — 그 이후 한국 여권 사용 시 처벌 대상.",
      "⚠️ 가족관계등록부 폐쇄 여부와 관계없이 시민권 선서일에 국적 상실.",
      "사망자의 국적상실신고: 사망증명서(주정부 발행 Long-form 권장) + 시민권증서 + 기본/가족관계증명서 추가 제출.",
      "개명한 경우에도 가족관계등록부에 기록된 이름을 신고서에 기재.",
      "병역 관련: 시민권 취득일에 한국 국적 상실 → 병역의무 없음.",
      "우편 접수 가능 (토론토 반경 2시간 이상 거리) — 시민권증서는 사본만 송부 가능.",
      "국적상실신고는 출입국관리사무소 국적계에서도 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적상실신고) →",
  },

  // ── 국적이탈신고 ──
  nationality_renounce_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈신고"],
    question: "신청자의 성별은?",
    sub: "남성과 여성은 국적이탈 신고 기간이 다릅니다.",
    options: [
      { id: "nationality_renounce_male", icon: "👨", title: "남성", desc: "만 18세 되는 해 3월 31일까지 신고 필수 — 기간을 넘기면 병역 해소 후 가능" },
      { id: "nationality_renounce_female", icon: "👩", title: "여성", desc: "만 22세 되는 해 생일 전까지 신고 가능" },
    ],
  },

  nationality_renounce_male: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈신고", "남성"],
    question: "현재 상황은?",
    options: [
      { id: "nationality_renounce_male_intime", icon: "✅", title: "만 18세 되는 해 3월 31일 이전 (기간 내)", desc: "정상 국적이탈 신고 가능" },
      { id: "nationality_renounce_male_over", icon: "⚠️", title: "만 18세 3월 31일 이후 — 병역 미해소", desc: "예외적 국적이탈 허가 필요 (별도 메뉴 참조)" },
      { id: "nationality_renounce_male_done", icon: "🎖️", title: "병역의무 해소 완료 (전역·면제 등)", desc: "병역 해소 후 2년 이내 신고 가능" },
    ],
  },

  nationality_renounce_male_over: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈신고", "남성", "기간 초과"],
    title: "⚠️ 국적이탈 신고 기간을 넘겼어요 — 예외적 허가 신청 필요",
    docs: [],
    costs: [{ label: "수수료", value: "CAD $121.50" }],
    time: "약 6~12개월",
    notices: [
      "만 18세 되는 해 3월 31일을 지난 경우 일반 국적이탈신고 불가합니다.",
      "예외적 국적이탈 허가 (국적법 제14조의2) 신청이 필요합니다.",
      "국적 메뉴 → '예외적 국적이탈 허가' 메뉴를 이용하세요.",
      "⚠️ 2026년 기준 2008년생은 2026년 3월 31일이 마감입니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 →",
  },

  nationality_renounce_male_intime: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈신고", "남성", "기간 내"],
    title: "국적이탈신고 — 남성 (기간 내)",
    docs: [
      "국적이탈신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "국적이탈 안내문 확인서 (양식)",
      "외국거주사실증명서 (양식)",
      "증명사진 1매 (3.5×4.5cm, 흰색배경, 6개월 이내, 사진관 촬영 필수)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가",
      "캐나다 출생증명서 원본 + 사본 (캐나다 출생자)",
      "  ▸ 부모 이름 모두 표시된 것 / 형식 무관",
      "  ▸ 한국 출생자: 시민권증서 (생일이 취득일자로 된 것) 대신 제출",
      "출생증명서 한글 번역문 (본인·가족 직접 번역 가능, 공증 불필요)",
      "캐나다 시민권증서 (해당자 — 한국 출생으로 출생증명서 없는 경우)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "  ▸ 시민권자: 시민권증서 / 캐나다 출생: Birth Certificate / 영주권자: PR카드(앞뒷면)",
      "당사자 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "당사자 가족관계증명서",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (해당자만) — 이름 변경된 경우 (4촌이내 가족 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월 (카카오톡·이메일로 결과 통보, 5일 이내 알림서비스 동의 필수)",
    notices: [
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "⚠️ 신고기한: 만 18세 되는 해 3월 31일까지",
      "  ▸ 2008년생 → 2026.3.31 / 2009년생 → 2027.3.31",
      "부 또는 모가 시민권 취득 후 국적상실신고를 하지 않은 경우: 국적이탈신고와 함께 부/모의 국적상실신고도 동시 접수.",
      "처리결과 문서 확인: 완료 메시지 수신 후 15~30일 뒤 기본증명서 발급 시 표시됨.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈신고) →",
  },

  nationality_renounce_male_done: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈신고", "남성", "병역 해소 후"],
    title: "국적이탈신고 — 남성 (병역 해소 후)",
    docs: [
      "국적이탈신고서 (양식)",
      "국적이탈 안내문 확인서 (양식)",
      "외국거주사실증명서 (양식)",
      "증명사진 1매 (사진관 촬영 필수)",
      "병적증명서 (병역필·면제 사실 포함)",
      "캐나다 출생증명서 원본 + 사본 + 한글 번역문",
      "당사자 캐나다 여권 원본 + 사본",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서",
      "부·모 기본증명서 각 1부",
      "동일인증명서 (해당자만)",
      "XpressPost 등기봉투",
      "통보 및 송달 동의서",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월",
    notices: [
      "병역 해소 후 2년 이내에 신고해야 합니다.",
      "병역 해소: 현역·보충역 복무 완료 / 전시근로역 편입 / 병역면제 처분.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈신고) →",
  },

  nationality_renounce_female: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈신고", "여성"],
    title: "국적이탈신고 — 여성",
    docs: [
      "국적이탈신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "국적이탈 안내문 확인서 (양식)",
      "외국거주사실증명서 (양식)",
      "증명사진 1매 (사진관 촬영 필수, 영사관 장비 사용 불가)",
      "캐나다 출생증명서 원본 + 사본 (캐나다 출생자)",
      "출생증명서 한글 번역문 (공증 불필요)",
      "캐나다 시민권증서 (한국 출생자 — 출생증명서 대신)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (해당자만)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월",
    notices: [
      "⚠️ 신고기한: 만 22세 되는 해 생일 전까지 (이후에는 국적이탈신고만 가능).",
      "  ▸ 만 20세 전 복수국적자: 만 22세 생일 전까지",
      "  ▸ 만 20세 후 복수국적자가 된 경우: 그 때부터 2년 이내",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 하지 않은 경우: 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈신고) →",
  },

  // ── 예외적 국적이탈 허가 ──
  nationality_renounce_exception: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "예외적 국적이탈 허가"],
    title: "예외적 국적이탈 허가 — 신고 기간을 넘긴 병역미필 남성 (국적법 제14조의2)",
    docs: [
      "국적이탈허가 신청서 (양식)",
      "증명사진 1매 (3.5×4.5cm, 흰색배경, 6개월 이내, 사진관 촬영)",
      "캐나다 출생증명서 원본 + 사본 (부모 이름 모두 표시된 것)",
      "  ▸ 한국 출생자: 캐나다 시민권증서 대신 제출",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (해당자만)",
      "병적증명서",
      "출생 이후 계속 외국 주거 사실 증명서류 (부동산 소유증명·임대차계약서·공공요금 납입증명·세금납부증명·출입국기록 등)",
      "3개월 이내 국적이탈 신고 못 한 것에 책임 묻기 어려운 사정 입증 자료",
      "  ▸ 부모 해외 이주 상황 확인 서류, 거주지 확인 서류, 재직·사업자증명, 재학·졸업증명서 등",
      "복수국적으로 인한 외국에서의 직업 선택 상당한 제한 입증 자료",
      "  ▸ 관련 법령·규정, 재직증명서, 입사지원서, 확인서 등",
      "외국어 서류 한글 번역본 (번역자 성명·연락처 기재, 공증 불필요)",
      "XpressPost 등기봉투 또는 우표 부착 봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $121.50 (현금, Debit, 신용카드)" }],
    time: "약 6~12개월 (신속심사: 3개월 이내)",
    notices: [
      "⚠️ 우편 접수 불가 — 본인이 반드시 영사관 방문.",
      "신청 요건: 외국 출생 또는 6세 미만 이주 후 계속 외국 거주 + 기간을 넘긴 것에 책임 묻기 어려운 사정.",
      "신속심사제 (2024.8.19 시행): ①불허 결정 후 1년 미경과자로 직업 불이익 임박 / ②외국 외교·안보·군 장교 현역 복무 중.",
      "허가 고려사항: 출생지·복수국적 취득 경위·주소·입국 횟수·목적·기간·한국 국민 권리 행사 여부·직업 제한 불이익 여부.",
      "부 또는 모가 시민권 취득 후 국적상실신고 안 한 경우: 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 예외적 국적이탈 허가) →",
    onlineLink: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5400/view.do?seq=1338937",
  },

  // ── 국적보유신고 ──
  nationality_retain: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적보유신고"],
    title: "국적보유신고 — 부모와 함께 시민권 수반취득",
    docs: [
      "국적보유신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "증명사진 1매 (사진관 촬영 필수, 영사관 장비 사용 불가)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "당사자 한국 여권 원본 + 사본 (보유 시)",
      "부·모 여권 사본 각 1부",
      "당사자 시민권증서 원본 + 사본",
      "  ▸ 시민권 카드·Search of Citizenship Record 제출 불가",
      "  ▸ e-Certificate: 출력 제출 가능",
      "부·모 체류자격 증명서류 사본 각 1부",
      "  ▸ 시민권자: 시민권증서 / 캐나다 출생: Birth Certificate / 영주권자: PR카드(앞뒷면)",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "동일인증명서 (해당자만)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "영사관 접수 후 법무부 심사",
    notices: [
      "⚠️ 시민권 취득일(선서일)로부터 6개월 이내 신청 필수 — 초과 시 신청 불가.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "신청자와 부모의 시민권 취득일자가 같아야 수반취득으로 인정.",
      "시민권을 함께 취득한 부/모의 이전 국적이 반드시 대한민국이어야 합니다.",
      "  ▸ 예) 한국인 부와 중국인 모 → 중국인 모와 함께 시민권 취득 → 국적보유신고 불가",
      "국적보유 신고 후: 국적선택제도 적용 대상 → 여자는 만 22세 전, 남자는 만 22세 전 또는 병역 해소 후 2년 이내 국적선택신고(외국국적불행사서약) 필요.",
      "부 또는 모가 시민권 취득 후 국적상실신고 안 한 경우: 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적보유신고) →",
  },

  // ── 국적선택신고 ──
  nationality_choice: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적선택신고"],
    title: "국적선택신고 — 외국국적불행사 서약 (복수국적 유지)",
    docs: [
      "국적선택신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "외국국적불행사서약서 (양식)",
      "증명사진 2매 (사진관 촬영 필수, 영사관 장비 사용 불가)",
      "캐나다 출생증명서 원본 + 사본 (해외 출생자)",
      "  ▸ 한국 출생자: 시민권증서 대신 제출",
      "  ▸ 캐나다 시민권 수반취득 후 6개월 내 국적보유신고 완료자: 출생증명서 생략 가능",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (해당자만)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월",
    notices: [
      "외국국적불행사 서약 = 한국 국적을 선택하되 외국 국적은 포기하지 않고, 한국에서는 외국 국적을 행사하지 않겠다는 서약.",
      "신고 마감일:",
      "  ▸ 여자: 만 22세 되는 해 생일 전 (이후 국적이탈신고만 가능)",
      "  ▸ 남자: 만 22세 되는 해 생일 전 / 또는 병역 복무 후 2년 이내",
      "⚠️ '원정출산' 자녀는 서약 불가 — 단, 출생 전후 2년 이상 외국 체류·영주권·국적취득·정규대학 6개월 이상 수학·파견 근무 등 예외 있음.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "부 또는 모가 시민권 취득 후 국적상실신고 안 한 경우: 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택신고) →",
  },

  // ── 국적회복 (65세 이상) ──
  nationality_recover: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적회복"],
    title: "국적회복 — 65세 이상 복수국적 취득 (영사관 업무 아님)",
    docs: [
      "⚠️ 국적회복 신청은 한국 내 출입국사무소에서만 가능 — 영사관 접수 불가",
      "절차 안내 (한국 방문 시):",
      "  ① 국적상실신고 (출입국사무소 또는 영사관)",
      "  ② 재외동포비자(F-4) 신청",
      "  ③ 거소증 신청 (출입국사무소만 가능, 약 3주)",
      "  ④ 국적회복허가 신청 (출입국사무소, 약 7~8개월)",
      "  ⑤ 국적회복허가 통지서 수령 후 1년 이내 외국국적불행사 서약 제출",
      "  ⑥ 주민등록증·한국여권 발급 신청",
    ],
    costs: [{ label: "수수료", value: "출입국사무소 안내 참조" }],
    time: "약 7~8개월 (출입국사무소 처리)",
    notices: [
      "2011년 1월 1일부터 만 65세 이상 외국국적동포가 복수국적 취득 가능.",
      "국적회복허가 통지서 수령 후 1년 이내 외국국적불행사 서약 미제출 시 회복된 국적 자동 상실.",
      "한국 출입국 시 한국 여권, 캐나다 출입국 시 캐나다 여권 사용.",
      "출입국사무소 홈페이지: hikorea.go.kr",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 (사전 문의) →",
    onlineLink: "https://www.hikorea.go.kr",
  },

  // ── 인지에 의한 국적취득 ──
  nationality_acquire: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "인지에 의한 국적취득"],
    title: "인지에 의한 국적취득 — 한국인 부의 혼외자",
    docs: [
      "국적취득신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "증명사진 1매 (사진관 촬영 필수)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "당사자 출생증명서 사본 (부모 이름 모두 표시된 것)",
      "부·모 체류자격 증명서류 사본 각 1부",
      "  ▸ 시민권자: 시민권증서 / 캐나다 출생: Birth Certificate / 영주권자: PR카드(앞뒷면)",
      "부의 기본증명서 + 가족관계증명서 + 혼인관계증명서 각 1부 (상세, 3개월 이내)",
      "가족관계통보서 (양식)",
      "인지경위서",
      "XpressPost 등기봉투 (통지서 수령용)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "영사관 접수 후 법무부 심사",
    notices: [
      "💡 한국인 어머니와 외국인 아버지 사이의 혼외자: 인지신고 불필요 — 가족관계 → 출생신고 메뉴를 이용하세요.",
      "💡 혼인 중 출생자 (부모가 결혼한 상태): 국적과 무관하게 출생신고만 하면 됩니다 — 가족관계 → 출생신고 메뉴 이용.",
      "대상: 한국인 부와 외국인 모 사이의 혼외자 (미성년, 만 19세 이하).",
      "한국인 모의 혼외자: 출생신고만으로 한국 국적 취득 — 인지신고 불필요.",
      "한국인 부 + 외국인 모의 혼외자: 부의 인지 후 별도 국적취득 절차 필요.",
      "  ▸ 미성년자: 법무부장관에게 국적취득신고로 한국 국적 취득.",
      "  ▸ 성년자: 특별귀화 요건 충족 후 귀화허가 필요.",
      "국적취득 후: 외국 국적 포기 또는 외국국적불행사 서약 + 관련 서류 제출.",
      "⚠️ 우편 접수 불가 — 부(아버지)가 반드시 영사관 방문.",
      "부 또는 모가 시민권 취득 후 국적상실신고 안 한 경우: 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적취득신고) →",
  },

  // ══ CERTIFICATE (공동/금융/간편 인증서) ══

  cert_start: {
    type: "question",
    service: "cert",
    breadcrumb: ["홈", "인증서"],
    question: "어떤 인증서가 필요하신가요?",
    sub: "__CERT_COMPARISON__",
    comparisonCard: [
      {
        icon: "📱",
        title: "간편인증서",
        visit: false,
        visitLabel: "영사관 방문 불필요",
        features: [
          { ok: true, text: "앱에서 비대면 발급" },
          { ok: true, text: "공공서비스 190개" },
          { ok: false, text: "인터넷뱅킹 불가" },
          { ok: null, text: "앱별 유효기간" },
          { ok: null, text: "앱 내 저장" },
        ],
      },
      {
        icon: "🔐",
        title: "공동인증서",
        visit: true,
        visitLabel: "영사관 방문 1회",
        features: [
          { ok: true, text: "행정+금융+전자상거래" },
          { ok: true, text: "사용처 가장 넓음" },
          { ok: true, text: "인터넷뱅킹 가능" },
          { ok: null, text: "1년마다 직접 갱신" },
          { ok: null, text: "PC/USB 저장" },
        ],
      },
      {
        icon: "🏦",
        title: "금융인증서",
        visit: true,
        visitLabel: "영사관 방문 1회",
        features: [
          { ok: true, text: "금융+공공서비스" },
          { ok: true, text: "인터넷뱅킹 가능" },
          { ok: true, text: "3년 자동갱신" },
          { ok: null, text: "클라우드 저장" },
          { ok: null, text: "기기 이동 자유" },
        ],
      },
    ],
    options: [
      { id: "cert_nonface", icon: "📱", title: "재외국민 간편인증서 (영사관 방문 불필요)", desc: "앱에서 비대면 발급 · 공공서비스 190개 · 인터넷뱅킹 불가" },
      { id: "cert_joint_who", icon: "🔐", title: "공동인증서 (영사관 방문)", desc: "행정·금융·전자상거래 폭넓게 사용 · PC/USB 저장 · 1년 갱신" },
      { id: "cert_financial_who", icon: "🏦", title: "금융인증서 (영사관 방문)", desc: "금융·공공서비스 · 클라우드 저장 · 3년 자동갱신" },
    ],
  },

  // ── 공동인증서 ──
  cert_joint_who: {
    type: "question",
    service: "cert",
    breadcrumb: ["홈", "인증서", "공동인증서"],
    question: "신청자의 연령은?",
    sub: "19세 미만 미성년자는 본인과 법정대리인(대한민국 국적자)이 함께 방문해야 합니다.",
    options: [
      { id: "cert_joint_adult", icon: "👤", title: "만 19세 이상 (성인)", desc: "본인 직접 방문" },
      { id: "cert_joint_minor", icon: "👶", title: "만 19세 미만 (미성년자)", desc: "본인 + 법정대리인 함께 방문 필수" },
    ],
  },

  cert_joint_adult: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "인증서", "공동인증서", "성인"],
    title: "공동인증서 발급 — 성인",
    docs: [
      "공동인증서 발급 신청서 (양식) — 서명은 여권 서명과 동일하게",
      "공동인증서비스 이용약관 (양식)",
      "여권 원본 + 사본 1부",
      "캐나다 체류자격 증명서류 원본 + 사본",
      "  ▸ 단기방문자: ETA 확인증",
      "  ▸ 장기체류자: 캐나다 체류비자",
      "  ▸ 영주권자: PR카드",
      "  ▸ 복수국적자: 국적회복 또는 복수국적 보유 사실이 표시된 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "  ▸ 시민권자: 발급 불가",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 방문 신청 → 이메일로 안내 수신 → 집/사무실에서 7일 이내 다운로드",
    notices: [
      "⚠️ 반드시 본인이 직접 방문 — 대리인 신청 불가.",
      "⚠️ 유효한 한국 여권 원본 + 체류자격 증명 원본 미지참 시 발급 불가.",
      "⚠️ 주민등록번호 없는 경우 발급 불가.",
      "⚠️ 캐나다 시민권자(한국 국적 상실자) 발급 불가.",
      "발급 후 7일 이내 컴퓨터에서 다운로드 필수 — 기간 내 미발급 시 영사관 재방문 필요.",
      "공동인증서 유효기간 1년 — 만료 전 인증기관 홈페이지에서 직접 갱신 가능.",
      "이메일 주소 정확히 기재 (대소문자 구별).",
      "인터넷뱅킹 등 일부 서비스는 해당 기관의 고객 등록 후 이용 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 공동인증서) →",
  },

  cert_joint_minor: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "인증서", "공동인증서", "미성년자"],
    title: "공동인증서 발급 — 만 19세 미만 미성년자",
    docs: [
      "공동인증서 발급 신청서 (양식) — 미성년자 본인이 직접 서명",
      "공동인증서비스 이용약관 (양식)",
      "미성년자 여권 원본 + 사본",
      "미성년자 캐나다 체류자격 증명서류 (ETA·비자·영주권 등)",
      "  ▸ 시민권자: 발급 불가",
      "가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내) — 신청대상자 이름으로 발급, 열람용 불가",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내) — 신청대상자 이름으로 발급, 열람용 불가",
      "  ▸ 미성년자 2인 이상 신청 시 신청자별 각각 별도 원본 제출",
      "  ▸ 영사관 신청 시 2주 소요 — 미리 발급받아 제출",
      "법정대리인 동의서 (양식)",
      "법정대리인의 대한민국 여권 원본 + 사본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 방문 신청 → 이메일로 안내 수신 → 집/사무실에서 7일 이내 다운로드",
    notices: [
      "⚠️ 미성년자 본인과 법정대리인(대한민국 국적자)이 반드시 함께 방문.",
      "⚠️ 신청서 서명은 미성년자 본인이 직접 서명 — 법정대리인 대리 서명 불가.",
      "⚠️ 주민등록번호 없는 경우 발급 불가.",
      "⚠️ 캐나다 시민권자 발급 불가.",
      "발급 후 7일 이내 다운로드 필수.",
      "이메일 주소 정확히 기재 (대소문자 구별).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 공동인증서) →",
  },

  // ── 금융인증서 ──
  cert_financial_who: {
    type: "question",
    service: "cert",
    breadcrumb: ["홈", "인증서", "금융인증서"],
    question: "신청자의 연령은?",
    sub: "19세 미만 미성년자는 본인과 법정대리인(대한민국 국적자)이 함께 방문해야 합니다.",
    options: [
      { id: "cert_financial_adult", icon: "👤", title: "만 19세 이상 (성인)", desc: "본인 직접 방문" },
      { id: "cert_financial_minor", icon: "👶", title: "만 19세 미만 (미성년자)", desc: "본인 + 법정대리인 함께 방문 필수" },
    ],
  },

  cert_financial_adult: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "인증서", "금융인증서", "성인"],
    title: "금융인증서 발급 — 성인",
    docs: [
      "금융인증서 발급 신청서 + 금융인증서비스 이용약관 (양식) — 서명은 여권 서명과 동일하게",
      "여권 원본 + 사본 1부",
      "캐나다 체류자격 증명서류 원본 + 사본",
      "  ▸ 단기방문자: ETA 확인증",
      "  ▸ 장기체류자: 캐나다 체류비자",
      "  ▸ 영주권자: PR카드",
      "  ▸ 복수국적자: 국적회복 또는 복수국적 보유 사실이 표시된 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "  ▸ 시민권자: 발급 불가",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 방문 신청 → 이메일로 안내 수신 → 집/사무실에서 14일 이내 다운로드",
    notices: [
      "⚠️ 반드시 본인이 직접 방문 — 대리인 신청 불가.",
      "⚠️ 유효한 한국 여권 원본 + 체류자격 증명 원본 미지참 시 발급 불가.",
      "⚠️ 주민등록번호 없는 경우 발급 불가.",
      "⚠️ 캐나다 시민권자(한국 국적 상실자) 발급 불가.",
      "금융인증서는 금융결제원 클라우드에 저장 — USB·PC 저장 불필요, 어디서든 접근 가능.",
      "유효기간 3년, 자동 갱신.",
      "발급 후 14일 이내 앱/웹에서 다운로드 필수.",
      "이메일 주소 정확히 기재 (대소문자 구별).",
      "인터넷뱅킹 등 일부 서비스는 해당 기관의 고객 등록 후 이용 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 금융인증서) →",
  },

  cert_financial_minor: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "인증서", "금융인증서", "미성년자"],
    title: "금융인증서 발급 — 만 19세 미만 미성년자",
    docs: [
      "금융인증서 발급 신청서 + 이용약관 (양식) — 미성년자 본인이 직접 서명",
      "미성년자 여권 원본 + 사본",
      "미성년자 캐나다 체류자격 증명서류 (ETA·비자·영주권 등)",
      "  ▸ 시민권자: 발급 불가",
      "가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내) — 열람용 불가",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내) — 열람용 불가",
      "  ▸ 미성년자 2인 이상 신청 시 신청자별 각각 별도 원본 제출",
      "법정대리인 동의서 (양식)",
      "법정대리인의 대한민국 여권 원본 + 사본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 방문 신청 → 이메일로 안내 수신 → 집/사무실에서 14일 이내 다운로드",
    notices: [
      "⚠️ 미성년자 본인과 법정대리인이 반드시 함께 방문.",
      "⚠️ 신청서 서명은 미성년자 본인이 직접 서명 — 법정대리인 대리 서명 불가.",
      "⚠️ 주민등록번호 없는 경우 발급 불가.",
      "⚠️ 캐나다 시민권자 발급 불가.",
      "발급 후 14일 이내 다운로드 필수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 금융인증서) →",
  },

  // ── 재외국민 간편인증서 ──
  cert_nonface: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "인증서", "재외국민 간편인증서"],
    title: "재외국민 간편인증서 — 앱에서 비대면 발급",
    docs: [
      "스마트폰 (iOS 또는 Android)",
      "2008년 8월 25일 이후 발급된 유효한 전자여권",
      "  ▸ 여권 앞표지 하단 IC칩 마크(⊕) 있는 것만 가능",
      "  ▸ 구형 여권 (IC칩 마크 없는 것) → 이용 불가, 영사관 방문 신청 필요",
      "주민등록번호",
      "재외국민 등록 완료",
      "아래 앱 중 하나 설치 후 신청:",
      "  ▸ KB스타뱅킹 / 신한SOL뱅크 / 우리WON뱅킹 / 하나원큐 / 토스",
      "  ▸ 앱 설치 → '재외국민 인증서 신청' 선택 → 개인정보 입력 → 전자여권 + 얼굴 촬영",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시 (영사관 방문 불필요)",
    notices: [
      "2026년 4월말부터 정부24·국민연금·국민신문고·인터넷 우체국 등 약 190개 공공서비스 이용 가능.",
      "⚠️ 인터넷뱅킹은 불가 — 인터넷뱅킹이 필요한 경우 공동인증서 또는 금융인증서를 이용하세요.",
      "⚠️ 주민등록번호 없는 경우 발급 불가.",
      "⚠️ 재외국민 등록이 되어 있지 않은 경우 발급 불가 — 재외국민등록 메뉴 참조.",
      "⚠️ 시민권자(한국 국적 상실자) 발급 불가.",
      "앱 신청 관련 문의: 각 발급처 또는 재외동포서비스지원센터.",
    ],
    booking: null,
    onlineLink: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_27012/view.do?seq=3",
  },

  // ══ VARIOUS CERTIFICATES (각종 증명서 발급) — 재설계된 트리 ══
  various_cert_start: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급"],
    question: "어떤 증명서가 필요하신가요?",
    sub: "공동인증서가 있으면 정부24(gov.kr)에서 대부분의 서류를 온라인으로 즉시 무료 발급할 수 있습니다.",
    options: [
      { id: "vcert_immigration", icon: "🛬", title: "출입국사실증명서", desc: "한국 입출국 기록 확인 — 방문 또는 온라인" },
      { id: "vcert_criminal", icon: "🔍", title: "신원조사(범죄경력)증명서", desc: "비자·시민권 신청·신원확인 용도 — 경찰청 처리 7일" },
      { id: "vcert_driving", icon: "🚗", title: "영문 운전경력증명서", desc: "캐나다 운전면허 교환 시 필요 — 방문 또는 온라인" },
      { id: "vcert_driving_license", icon: "🪪", title: "한국 운전면허 갱신·재발급", desc: "재외공관 신청 — 2종 갱신·분실 재발급 · CAD $13.50" },
      { id: "vcert_military_c", icon: "🪖", title: "병적증명서", desc: "병역 이행 여부 확인" },
      { id: "vcert_overseas_reg", icon: "🌏", title: "재외국민등록부 등본", desc: "해외 거주사실 증명 — 부동산·상속·금융 등" },
      { id: "vcert_resident", icon: "🏠", title: "주민등록 등본·초본", desc: "주민등록 현황 확인 — 방문 또는 온라인" },
      { id: "vcert_tax", icon: "💰", title: "납세·소득 증명서", desc: "납세증명(국세·지방세·관세)·소득금액증명 — 해외이주신고 등에 필요" },
      { id: "vcert_passport_info", icon: "📋", title: "여권정보증명서", desc: "2020.12.20 이후 발급 여권 소지자 — 주민번호 대체 서류" },
    ],
  },

  // ── 온라인 발급 목록 ──
  // ── 출입국사실증명서 ──
  vcert_immigration: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "출입국사실증명서"],
    question: "신청 방법을 선택하세요",
    sub: "공동인증서가 있으면 정부24에서 무료 즉시 발급 가능합니다 — 영사관 방문 불필요.",
    options: [
      { id: "vcert_immigration_online", icon: "💻", title: "온라인 발급 (공동인증서)", desc: "정부24에서 무료 즉시 발급" },
      { id: "vcert_immigration_self", icon: "👤", title: "본인 영사관 방문", desc: "즉시 발급 — CAD $2.70" },
      { id: "vcert_immigration_minor", icon: "👶", title: "미성년자 법정대리인 신청", desc: "직계가족이 대리 신청 — CAD $2.70" },
      { id: "vcert_immigration_mail", icon: "📮", title: "우편 신청", desc: "변호사 공증 사본 — CAD $2.70" },
    ],
  },

  vcert_immigration_online: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "출입국사실증명서", "온라인"],
    title: "출입국사실증명서 — 온라인 발급",
    docs: ["정부24(www.gov.kr) 접속 → 공동인증서 로그인 → 출입국사실증명서 신청"],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "대한민국 국적자만 발급 가능.",
      "출입국 기록이 없는 경우에도 '기록없음'으로 발급 가능.",
    ],
    booking: null,
    onlineLink: "https://www.gov.kr",
  },

  vcert_immigration_self: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "출입국사실증명서", "본인 방문"],
    title: "출입국사실증명서 — 본인 영사관 방문",
    docs: [
      "출입국사실증명서 발급 신청서 (소정 양식)",
      "유효한 한국 여권 원본",
      "체류자격 증빙서류 원본 (PR카드·비자·ETA 등)",
      "  ▸ 복수국적자: 국적회복 표기된 기본증명서 또는 국적회복증서",
    ],
    costs: [{ label: "수수료", value: "CAD $2.70 (현금, Debit, 신용카드)" }],
    time: "즉시",
    notices: [
      "대한민국 국적자만 발급 가능 — 외국국적자 발급 불가.",
      "  ▸ 외국국적자는 위임장 공증 후 한국 대리인이 관계기관에서 발급.",
      "출입국 기록이 없어도 '기록없음'으로 발급 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 출입국사실증명서) →",
  },

  vcert_immigration_minor: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "출입국사실증명서", "미성년자 대리"],
    title: "출입국사실증명서 — 미성년자 법정대리인 신청",
    docs: [
      "출입국사실증명서 발급 신청서 (소정 양식)",
      "발급 대상자(미성년자)의 여권 원본",
      "대리인(직계가족)의 여권 원본",
      "발급 대상자의 체류자격 증빙서류 원본 (PR카드·비자 등)",
      "발급 대상자의 기본증명서 + 가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내)",
    ],
    costs: [{ label: "수수료", value: "CAD $2.70 (현금, Debit, 신용카드)" }],
    time: "즉시",
    notices: ["법정대리인(직계가족)이 대리 신청 가능합니다."],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 출입국사실증명서) →",
  },

  vcert_immigration_mail: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "출입국사실증명서", "우편 신청"],
    title: "출입국사실증명서 — 우편 신청",
    docs: [
      "출입국사실증명서 발급 신청서 (소정 양식)",
      "변호사(공증인) 공증받은 여권 사본",
      "변호사(공증인) 공증받은 체류자격 증빙서류 사본 (PR카드·비자)",
      "수수료: CAD $2.70 (현금 또는 Money Order)",
      "반송봉투: Canada Post Xpresspost 등기봉투 (보내는 곳·받는 곳 모두 본인 주소)",
    ],
    costs: [{ label: "수수료", value: "CAD $2.70 (현금 또는 Money Order)" }],
    time: "우편 배송기간 포함 약 1~2주",
    notices: ["원본 대신 반드시 변호사 공증 사본 제출."],
    booking: null,
  },

  // ── 신원조사(범죄경력)증명서 — 용도별 분기 ──
  vcert_criminal: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "신원조사(범죄경력)증명서"],
    question: "어떤 용도로 필요하신가요?",
    sub: "2015년 4월부터 '신원조사(범죄경력)증명서'로 명칭이 변경되었습니다. 용도에 따라 신청서 서식(별지 1-1·1-2·1-3호)이 다릅니다.",
    options: [
      { id: "vcert_criminal_visa", icon: "✈️", title: "외국 비자·영주권 신청용", desc: "캐나다 이민·비자 신청 시 한국 범죄경력 확인 — 별지 1-1호" },
      { id: "vcert_criminal_citizenship", icon: "🍁", title: "캐나다 시민권 신청용", desc: "시민권 신청 시 제출 — 별지 1-2호" },
      { id: "vcert_criminal_identity", icon: "🔍", title: "신원확인용", desc: "영주권·시민권 소지자 신원 확인 — 별지 1-3호" },
    ],
  },

  vcert_criminal_visa: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "신원조사 증명서", "비자·영주권 신청용"],
    title: "신원조사(범죄경력)증명서 — 외국 비자·영주권 신청용 (별지 1-1호)",
    docs: [
      "신청서 별지 1-1호 (양식 — 영사관 홈페이지 다운로드)",
      "최근 6개월 이내 컬러사진 1매 — 3cm×4cm 흰색배경 (사진관 촬영 필수)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가 / 여권사진 규격(3.5×4.5cm)과 다르니 주의",
      "유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본 (PR카드·비자 등)",
      "대한민국 국적자 중 여권에 주민번호 미표시 시: 주민등록증·운전면허증 또는 기본증명서",
      "외국인: 외국인등록번호가 표기된 외국인등록증 또는 외국인등록사실증명원",
      "만 14~18세: 부 또는 모가 대리 신청",
      "  ▸ 3개월 이내 기본증명서 + 가족관계증명서 (상세, 주민번호 전부공개)",
      "우편 수령 희망 시: Canada Post Xpresspost 봉투 동봉",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 2주 (처리 완료 시 전화 연락 — 신청서에 보이스메일 가능 번호 기재 필수)",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 본인이 영사관 방문.",
      "⚠️ 사진 규격 3cm×4cm — 여권사진(3.5×4.5cm)과 다름. 규격 불일치 시 반려.",
      "⚠️ 영사관 사진장비 사용 불가 — 반드시 사진관에서 촬영.",
      "대한민국 국적자·대한민국 체류기록 있는 외국인 신청 가능.",
      "경찰청 외사기획과 신원반 문의: +82-2-3150-2676",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 신원조사) →",
  },

  vcert_criminal_citizenship: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "신원조사 증명서", "시민권 신청용"],
    title: "신원조사(범죄경력)증명서 — 캐나다 시민권 신청용 (별지 1-2호)",
    docs: [
      "신청서 별지 1-2호 (양식 — 영사관 홈페이지 다운로드)",
      "최근 6개월 이내 컬러사진 1매 — 3cm×4cm 흰색배경 (사진관 촬영 필수)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가 / 여권사진 규격과 다름 주의",
      "유효한 한국 여권 원본",
      "캐나다 영주권 카드 원본 (앞뒷면)",
      "우편 수령 희망 시: Canada Post Xpresspost 봉투 동봉",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 2주 (처리 완료 시 전화 연락 — 신청서에 보이스메일 가능 번호 기재 필수)",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 본인이 영사관 방문.",
      "⚠️ 사진 규격 3cm×4cm — 여권사진과 다름.",
      "RCMP 범죄경력증명서(지문 기반)와는 다른 서류 — RCMP 증명서는 별도 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 신원조사) →",
  },

  vcert_criminal_identity: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "신원조사 증명서", "신원확인용"],
    title: "신원조사(범죄경력)증명서 — 신원확인용 (별지 1-3호)",
    docs: [
      "신청서 별지 1-3호 (양식 — 영사관 홈페이지 다운로드)",
      "최근 6개월 이내 컬러사진 1매 — 3cm×4cm 흰색배경 (사진관 촬영 필수)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가 / 여권사진 규격과 다름 주의",
      "유효한 한국 여권 원본",
      "캐나다 영주권 카드 또는 시민권증서 원본",
      "우편 수령 희망 시: Canada Post Xpresspost 봉투 동봉",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 2주 (처리 완료 시 전화 연락 — 신청서에 보이스메일 가능 번호 기재 필수)",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 본인이 영사관 방문.",
      "⚠️ 사진 규격 3cm×4cm — 여권사진과 다름.",
      "영주권자 및 시민권자의 신원확인 목적으로 사용됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 신원조사) →",
  },

  // ── 영문 운전경력증명서 ──
  vcert_driving: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "영문 운전경력증명서"],
    question: "신청 방법을 선택하세요",
    sub: "공동인증서가 있으면 온라인으로 즉시 무료 발급 가능합니다 — 영사관 방문 불필요.",
    options: [
      { id: "vcert_driving_online", icon: "💻", title: "온라인 발급 (공동인증서)", desc: "정부24 또는 경찰청 교통민원24 — 즉시 무료" },
      { id: "vcert_driving_self", icon: "👤", title: "본인 영사관 방문", desc: "즉시 발급 — 무료" },
      { id: "vcert_driving_proxy", icon: "📋", title: "대리인 신청", desc: "위임장 필요 — 무료" },
    ],
  },

  vcert_driving_online: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "영문 운전경력증명서", "온라인"],
    title: "영문 운전경력증명서 — 온라인 발급",
    docs: [
      "정부24(www.gov.kr) 또는 경찰청 교통민원24(efine.go.kr) 접속",
      "공동인증서로 로그인 → 영문 운전경력증명서 신청",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "⚠️ 온라인 발급본이 현지 제출기관에서 원본으로 인정되지 않는 사례가 있으니 제출 전 확인하세요.",
    ],
    booking: null,
    onlineLink: "https://www.gov.kr",
  },

  vcert_driving_self: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "영문 운전경력증명서", "본인 방문"],
    title: "영문 운전경력증명서 — 본인 영사관 방문",
    docs: [
      "영문 운전경력증명서 발급 신청서 (소정 양식)",
      "유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본",
      "  ▸ 단기방문자: ETA 확인증 / 장기체류자: 체류비자 / 영주권자: PR카드",
      "  ▸ 복수국적자: 국적회복 표기된 기본증명서 또는 국적회복증서",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시",
    notices: [
      "⚠️ 방문 예약 필수: torbooking.com (공증 → 운전면허증 번역 공증 및 영문운전경력증명서 발급)",
      "⚠️ 온라인 발급본이 원본으로 인정되지 않는 경우 영사관 방문 발급 이용하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 운전면허 관련) →",
  },

  vcert_driving_proxy: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "영문 운전경력증명서", "대리인 신청"],
    title: "영문 운전경력증명서 — 대리인 신청",
    docs: [
      "영문 운전경력증명서 발급 신청서 (소정 양식)",
      "위임인(발급대상자)이 자필 서명한 위임장 (자율 형식 가능)",
      "위임인의 유효한 한국 여권 원본 + 사본",
      "위임인의 유효한 캐나다 체류자격 증빙서류 원본 (PR카드·비자 등)",
      "대리인(방문자)의 유효한 한국 여권",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시",
    notices: [
      "⚠️ 방문 예약 필수: torbooking.com (공증 → 운전면허증 번역 공증 및 영문운전경력증명서 발급)",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 운전면허 관련) →",
  },

  // ── 한국 운전면허 갱신·재발급 ──
  vcert_driving_license: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "한국 운전면허 갱신·재발급"],
    title: "한국 운전면허 갱신·재발급",
    docs: [
      "운전면허 갱신 등 재발급 신청서 + 개인정보 동의서 (양식)",
      "컬러 사진 1매 — 최근 6개월 이내, 사진관 촬영, 뒷면에 날짜",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가",
      "  ▸ ⚠️ 운전면허증 사진 규격 준수 필수 (규격 불일치 시 반려 빈번)",
      "유효한 여권 원본 + 사본",
      "캐나다 체류비자 또는 유효한 영주권 카드 원본 + 사본",
      "  ▸ 복수국적자: 외국국적불행사서약 일자 표시된 기본증명서 제출",
      "한국 운전면허증 원본 (갱신 신청자에 한함 — 신청 시 반납)",
    ],
    costs: [{ label: "수수료", value: "CAD $13.50 (현금만 가능)" }],
    time: "약 4~5주",
    notices: [
      "⚠️ 한국 국적자만 신청 가능.",
      "⚠️ 우편 접수 불가 — 반드시 본인이 영사관 방문.",
      "⚠️ 현금만 가능 — Debit·신용카드 불가.",
      "신청 가능 여부:",
      "  ▸ 1종 면허: 재발급만 가능 (70세 미만, 적성검사 기간 내)",
      "  ▸ 2종 면허: 갱신·재발급 모두 가능 (69세 이하 / 70~74세는 재발급만)",
      "  ▸ 75세 이상이고 갱신기간 시작된 경우: 재발급 불가 — 한국에서 적성검사 필요",
      "  ▸ 면허 정지·취소자: 신청 불가",
      "1종 면허 적성검사 기간 연장: 한국도로교통공단(safedriving.or.kr)에서 본인 인증 후 온라인 신청 가능.",
      "국제운전면허증 발급 및 적성검사 연기 신청 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 운전면허 갱신·재발급) →",
    onlineLink: "https://www.safedriving.or.kr",
  },

  // ── 병적증명서 (병무 메뉴로 연결) ──
  vcert_military_c: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "병적증명서"],
    question: "신청자는 누구인가요?",
    sub: "공동인증서가 있으면 정부24에서 온라인으로 즉시 발급 가능합니다 — 영사관 방문 불필요.",
    options: [
      { id: "military_cert_online", icon: "💻", title: "온라인 발급 (공동인증서)", desc: "정부24에서 즉시 발급 — 영사관 방문 불필요" },
      { id: "military_cert_self", icon: "👤", title: "본인이 영사관 방문 신청", desc: "약 10일 소요" },
      { id: "military_cert_family", icon: "👨‍👩‍👧", title: "가족이 대리 신청", desc: "직계존·비속, 형제자매, 배우자 — 약 10일" },
      { id: "military_cert_proxy", icon: "📋", title: "대리인이 신청", desc: "위임장 필요 — 약 10일" },
    ],
  },

  // ── 주민등록 등본·초본 ──
  vcert_resident: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "주민등록 등본·초본"],
    title: "주민등록 등본·초본",
    docs: [
      "주민등록 등·초본 발급 신청서 (소정 양식)",
      "본인 유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본",
      "  ▸ 공동인증서 보유 시: 정부24(gov.kr)에서 온라인 즉시 무료 발급 — 영사관 방문 불필요",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "공동인증서가 있으면 정부24에서 즉시 무료 발급 가능.",
      "⚠️ 주민등록이 말소된 경우(국내 거주지 없는 재외국민): 주민등록 등·초본 발급 불가 — 재외국민등록부 등본으로 대체 가능.",
      "해외이주신고 시 필요한 주민등록등본: 주민번호 전부 공개 버전으로 발급받아야 합니다.",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  // ── 납세·소득 증명서 ──
  vcert_tax: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "납세·소득 증명서"],
    title: "납세증명서·소득금액증명서",
    docs: [
      "납세·소득 증명서 발급 신청서 (소정 양식)",
      "본인 유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본",
      "발급 목적 명시 (예: 해외이주용·금융기관제출용 등)",
      "  ▸ 온라인 발급 희망 시: 공동인증서로 홈택스(hometax.go.kr) 즉시 발급 가능",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "📌 해외이주신고 시 납세증명서 3종이 모두 필요합니다:",
      "  ① 국세 납세증명서 — 홈택스(hometax.go.kr) 발급 (목적: 해외이주용, 주민번호 전부 공개)",
      "  ② 지방세 납세증명서 — 정부24(gov.kr) 발급 (목적: 해외이주용)",
      "  ③ 관세 납세증명서 — 관세청 전자통관시스템(unipass.customs.go.kr) 발급",
      "⚠️ 납세증명서에는 유효기간이 있습니다 — 방문 직전에 발급하세요.",
      "공동인증서가 있으면 모두 온라인 발급 가능 — 영사관 방문 불필요.",
      "소득금액증명서: 홈택스 → 민원증명 → 소득금액증명 발급.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.hometax.go.kr",
  },

  // ── 여권정보증명서 ──
  vcert_passport_info: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "여권정보증명서"],
    title: "여권정보증명서",
    docs: [
      "여권정보증명서 발급 신청서 (소정 양식)",
      "본인 유효한 한국 여권 원본 (2020.12.20 이후 발급된 여권)",
      "캐나다 체류자격 증빙서류 원본",
      "  ▸ 공동인증서 보유 시: 정부24(gov.kr)에서 온라인 즉시 발급 가능",
    ],
    costs: [{ label: "수수료", value: "CAD $1.00 (현금)" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "2020년 12월 20일 이후 발급된 여권은 주민등록번호가 삭제되어 있습니다.",
      "여권정보증명서는 주민등록번호가 표기된 여권 정보를 증명하는 서류로, 각종 민원·공증 시 주민번호 확인 용도로 사용됩니다.",
      "공동인증서가 있으면 정부24에서 무료 온라인 발급 가능 (방문 시 CAD $1.00).",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  vcert_overseas_reg: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "재외국민등록부 등본"],
    question: "어떻게 발급받으시겠어요?",
    sub: "공동인증서가 있으면 영사민원24에서 온라인으로 즉시 발급 가능합니다.",
    options: [
      { id: "registration_copy_online", icon: "💻", title: "온라인 발급 (영사민원24)", desc: "공동인증서 필요 — 즉시 발급" },
      { id: "registration_copy_visit", icon: "🏛️", title: "영사관 방문 발급", desc: "당일 즉시 — CAD $0.65/부" },
      { id: "registration_copy_mail", icon: "📮", title: "우편 신청", desc: "변호사 공증 사본 필요" },
    ],
  },

  // ══ VISA (비자) — 한국어 ══

  visa_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)"], question: "한국 혈통이 있으신가요?", sub: "한국법상 부모 중 한 명이라도 한국 국적이었던 적이 있으면, 지금은 캐나다인이 되셨어도 본인이 선천적으로 한국 국적을 보유할 수 있습니다. 비자 신청 전 반드시 확인이 필요합니다.", options: [{ id: "visa_ko_heritage_yes", icon: "🧬", title: "네 — 부모 또는 조부모가 한국인이었던 적 있어요", desc: "현재 캐나다인이 되셨더라도 해당됩니다" }, { id: "visa_ko_heritage_unsure", icon: "🤔", title: "잘 모르겠어요", desc: "부모님 중 한 분이 한국인이었을 수도 있어요" }, { id: "visa_ko_heritage_no", icon: "🌐", title: "전혀 없어요", desc: "부모·조부모 모두 한국 국적인 적 없음" }] },

  visa_ko_heritage_yes: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)", "한국 혈통"], question: "어떤 상황이신가요?", sub: "한국 혈통이 있으시면 비자 신청 전 국적 상태를 먼저 확인해야 합니다.", options: [{ id: "visa_dual_check", icon: "⚠️", title: "국적 상태를 아직 확인하지 않았어요", desc: "선천적 한국 국적 보유 여부 — 먼저 확인 필수" }, { id: "visa_f4_family", icon: "👨‍👩‍👧", title: "배우자 또는 자녀가 F-4 재외동포 비자 소지자예요", desc: "동반 비자 (F-3) 신청" }, { id: "visa_f4_ko", icon: "🇰🇷", title: "국적상실 확인 완료 — F-4 비자 신청하러 왔어요", desc: "해당 케이스 선택" }] },

  visa_ko_heritage_unsure: { type: "result", service: "visa", breadcrumb: ["홈", "비자 (사증)", "혈통 불확실"], title: "⚠️ 비자 신청 전 부모님께 먼저 확인하세요", docs: ["부모님 중 한 분이라도 한국 국적이었던 적이 있는지 확인하세요", "  ▸ 현재 캐나다 시민권자이더라도, 본인 출생 당시 한국인이었다면 해당됩니다", "  ▸ 출생신고를 한 적 없어도, 출생 당시 부모 중 한 명이 한국인이었으면 본인도 한국 국적입니다", "확인 결과에 따라:", "  ▸ 한국 혈통 있음 → 뒤로 가서 '네' 선택", "  ▸ 한국 혈통 없음 → 뒤로 가서 '전혀 없어요' 선택"], costs: [{ label: "수수료", value: "해당 없음 — 상담 안내" }], time: "부모님께 확인 후 다시 방문", notices: ["⚠️ 한국 국적을 보유한 상태에서 비자를 신청하면 접수가 거부됩니다.", "⚠️ 만 18~37세 남성이고 한국 국적이라면 병역 의무가 있을 수 있습니다.", "여전히 불확실하다면 영사관(416-920-3809) 또는 국적과 상담 예약을 이용하세요."], booking: "https://www.torbooking.com/book", bookingLabel: "국적 상담 예약하기 →" },

  visa_dual_check: { type: "result", service: "visa", breadcrumb: ["홈", "비자 (사증)", "국적 확인"], title: "⚠️ 비자 신청 전 국적 확인 필수", docs: ["📌 한국 「국적법」에 따르면:", "  ▸ 1998년 6월 14일 이후 출생자: 부모 중 한 명이 한국인이면 출생신고 여부와 관계없이 자동으로 한국 국적 보유", "  ▸ 1998년 6월 13일 이전 출생자: 부(父)가 한국인이면 부계혈통 원칙에 따라 한국 국적 보유", "⚠️ 한국 국적자는 F-4 비자 신청 불가 — 비자가 아닌 한국 여권을 신청해야 합니다"], costs: [{ label: "수수료", value: "해당 없음 (비자 아님)" }], time: "확인 후 적절한 서비스로 안내", notices: ["출생신고를 한 번도 하지 않았다면 → 가족관계 → 출생신고 메뉴 이용", "국적선택을 하지 않았다면 → 국적 → 국적선택신고 메뉴 이용 (만 22세 이전)", "이미 국적상실 처리가 완료됐다면 → 기본증명서(상세) 확인 후 F-4 비자 신청 가능", "병역의무자(남성 만 18~37세)의 경우 국적이탈 전 병역 문제 해결 필수", "정확한 확인을 위해 방문 전 영사관(416-920-3809) 국적과 전화 상담 권장"], booking: "https://www.torbooking.com/book", bookingLabel: "가족관계 / 국적 상담 예약 →" },

  // ── F-4 재외동포 비자 (한국어) ──
  visa_f4_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "F-4 재외동포"],
    question: "본인의 케이스는?",
    sub: "F-4 재외동포 비자: 체류기간 최대 2년 · 유효기간 5년 · 복수 입국 · 수수료 CAD $121.50 · 처리기간 5~10 영업일",
    options: [
      { id: "visa_f4_case1_ko", icon: "👨", title: "케이스 1 — 한국 국적을 직접 보유했던 만 41세 미만 남성", desc: "국적상실·이탈 완료 · 병역 관련 추가 서류 필요" },
      { id: "visa_f4_case2_ko", icon: "🌏", title: "케이스 2 — 출생 시 복수국적자 (부모가 출생 당시 캐나다인)", desc: "국적이탈 완료 · 한국어 능력에 따라 체류기간 다름" },
      { id: "visa_f4_case3_ko", icon: "🍁", title: "케이스 3 — 후천적 시민권 취득자 (가장 일반적)", desc: "한국 출생 후 캐나다 이민·귀화 · 국적상실 완료" },
    ],
  },

  visa_f4_case1_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "F-4 재외동포", "케이스 1 — 41세 미만 남성"],
    title: "재외동포 비자 (F-4) — 케이스 1: 만 41세 미만 남성",
    docs: [
      "사증발급신청서 — visa.go.kr에서 다운로드, 모든 항목 빠짐없이 기재",
      "여권용 사진 1매 — 3.5×4.5cm, 흰색 배경, 6개월 이내 촬영, 뒷면 날짜 스탬프",
      "  ▸ ⚠️ 영사관 사진 장비 사용 불가 — 반드시 사진관에서 촬영",
      "캐나다 여권 원본 + 사본",
      "  ▸ 여권 유효기간까지 비자 유효 — 유효기간 얼마 안 남은 경우 여권 갱신 후 신청",
      "부모 여권 사본 각 1부",
      "  ▸ 사망한 경우: 사망증명서로 대체",
      "캐나다 시민권증서 원본 + 사본",
      "  ▸ 시민권 카드·Search of Citizenship Record 제출 불가",
      "  ▸ 취득일자(선서일) 년월일 반드시 표시",
      "  ▸ e-Certificate: 출력 후 제출 가능",
      "본인 출생증명서 원본 + 사본 (캐나다 또는 해외 출생자)",
      "  ▸ 한국 출생자: 시민권증서로 대체",
      "  ▸ 부모 이름 반드시 포함된 것",
      "본인 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "본인 가족관계증명서 (상세, 3개월 이내)",
      "부모 기본증명서 + 가족관계증명서 각 1부 (상세, 3개월 이내)",
      "국적상실신고 접수증 (기본증명서에 국적상실 미표시 시 추가 제출)",
      "부모 체류자격 증명서류 사본",
      "  ▸ 시민권자(한국 출생): 시민권증서 / 시민권자(캐나다 출생): Birth Certificate",
      "  ▸ 영주권자: 유효한 PR카드 앞뒷면",
      "RCMP 범죄경력증명서 원본 — 지문 기반, 6개월 이내 발급",
      "  ▸ ⚠️ 반드시 지문(fingerprint) 기반 — 이름 기반·지역경찰 발급 불가",
      "  ▸ 문의: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "제3국 범죄경력증명서 (최근 5년 내 한국·캐나다 외 타국에서 1년 이상 체류 시)",
    ],
    costs: [{ label: "수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "⚠️ 비자 신청 전 반드시 국적상실신고 먼저 완료 — 처리기간 약 6개월.",
      "  ▸ Step 1: 기본증명서·가족관계증명서 신청 (영사관 신청 시 2주 소요 — 미리 신청)",
      "  ▸ Step 2: 국적상실신고 (국적과 예약)",
      "  ▸ Step 3: 비자 신청 (비자과 예약)",
      "⚠️ 신청 가능한 경우:",
      "  ▸ 부모와 함께 2018년 5월 1일 이전에 시민권 취득 후 국적상실·이탈 완료",
      "  ▸ 병역 의무 이행 완료 (병적증명서 제출 필수)",
      "  ▸ 병역 면제 처분",
      "⚠️ 신청 불가: 2018년 5월 1일 이후 병역 미이행 상태로 국적 상실·이탈한 경우 → 만 41세까지 F-4 제한.",
      "비자 유효기간: 발급일로부터 최대 5년, 1회 입국 시 최대 2년 체류.",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국해야 유효 — 미입국 시 비자 무효.",
      "비자 조회: visa.go.kr → '재외공관' 선택 → 여권번호·이름 입력.",
      "우편 신청 가능 (토론토 반경 2시간 이상 거주자) — Xpresspost 반송봉투 + Certified Cheque 동봉.",
      "거소증: 90일 이상 체류 예정이거나 5년 내 여러 번 방문 예정이면 입국 후 90일 이내 출입국사무소에서 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_case2_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "F-4 재외동포", "케이스 2 — 출생 복수국적자"],
    question: "신청자의 성별과 나이는?",
    sub: "만 18~59세 남성은 RCMP 범죄경력증명서가 추가로 필요합니다. 한국어 능력 입증 서류 제출 시 최대 2년 체류, 미제출 시 1년.",
    options: [
      { id: "visa_f4_case2_general_ko", icon: "👩", title: "여성 · 만 18세 미만 · 만 60세 이상", desc: "RCMP 범죄경력증명서 불필요" },
      { id: "visa_f4_case2_male_ko", icon: "👨", title: "만 18~59세 남성", desc: "RCMP 범죄경력증명서 필요" },
    ],
  },

  visa_f4_case2_general_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "F-4 재외동포", "케이스 2 — 출생 복수국적자"],
    title: "재외동포 비자 (F-4) — 케이스 2: 출생 복수국적자",
    docs: [
      "사증발급신청서 — visa.go.kr에서 다운로드, 모든 항목 기재",
      "여권용 사진 1매 — 3.5×4.5cm, 흰색 배경, 6개월 이내, 뒷면 날짜",
      "  ▸ ⚠️ 영사관 사진 장비 사용 불가",
      "캐나다 여권 원본 + 사본",
      "부모 여권 사본 각 1부",
      "  ▸ 사망한 경우: 사망증명서로 대체",
      "본인 출생증명서 원본 + 사본 (부모 이름 반드시 포함)",
      "  ▸ 캐나다 외 출생: 해당 국가 출생증명서",
      "한국 국적이었던 부 또는 모의 기본증명서 (상세, 3개월 이내)",
      "한국 국적이었던 부 또는 모의 가족관계증명서 (상세, 3개월 이내)",
      "  ▸ 2008년 이전 국적상실 완료: 제적등본으로 대체",
      "  ▸ ⚠️ 부 또는 모가 영사관에 직접 방문하여 신청해야 함 (자녀 대신 신청 불가)",
      "부모 국적상실신고 접수증 (기본증명서에 국적상실 미표시 시)",
      "부모 체류자격 증명서류 사본",
      "[선택] 한국어 능력 입증 서류 (2년 체류 원하는 경우)",
      "  ▸ TOPIK 1급 이상 / 사회통합프로그램 사전평가 21점 이상 또는 1단계 이수 / 세종학당 초급 1B 이상",
      "  ▸ 면제: 만 60세 이상 · 한국 초등학교 이상 졸업 · 만 13세 이하 · 기존 F-4로 3년 이상 체류",
    ],
    costs: [{ label: "수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "신청 자격: 출생 당시 부 또는 모가 이미 캐나다 시민권자였던 경우 (선천적 복수국적) + 국적이탈 완료.",
      "⚠️ 한국어 능력 입증 서류 미제출 시 체류기간 최대 1년, 제출 시 최대 2년.",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 필수.",
      "비자 유효기간: 5년 · 1회 입국 시 최대 2년 체류 (한국어 능력 서류 없으면 1년).",
      "우편 신청 가능 — Xpresspost 반송봉투 + Certified Cheque 동봉.",
      "거소증: 입국 후 90일 이내 출입국사무소에서 신청 (90일 이상 체류 예정 시).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_case2_male_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "F-4 재외동포", "케이스 2 — 출생 복수국적자 (18~59세 남성)"],
    title: "재외동포 비자 (F-4) — 케이스 2: 출생 복수국적자 (만 18~59세 남성)",
    docs: [
      "사증발급신청서 — 모든 항목 기재",
      "여권용 사진 1매 (사진관 촬영 필수)",
      "캐나다 여권 원본 + 사본",
      "부모 여권 사본 각 1부",
      "본인 출생증명서 원본 + 사본 (부모 이름 포함)",
      "한국 국적이었던 부 또는 모의 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부모 국적상실신고 접수증 (기본증명서에 미표시 시)",
      "부모 체류자격 증명서류 사본",
      "RCMP 범죄경력증명서 원본 — 지문 기반, 6개월 이내",
      "  ▸ ⚠️ 지문 기반 필수 — 이름 기반·지역경찰 발급 불가",
      "제3국 범죄경력증명서 (최근 5년 내 타국에서 1년 이상 체류 시)",
      "[선택] 한국어 능력 입증 서류 (2년 체류 원하는 경우)",
    ],
    costs: [{ label: "수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "⚠️ RCMP 범죄경력증명서: 반드시 지문 기반 — 이름 기반 불가. 문의: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "⚠️ 한국어 능력 서류 미제출 시 체류기간 최대 1년.",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수.",
      "우편 신청 가능 — Xpresspost 반송봉투 + Certified Cheque 동봉.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_case3_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "F-4 재외동포", "케이스 3 — 후천적 시민권 취득자"],
    title: "재외동포 비자 (F-4) — 케이스 3: 후천적 시민권 취득자 (F-4-11)",
    docs: [
      "사증발급신청서 — visa.go.kr에서 다운로드, 모든 항목 빠짐없이 기재",
      "  ▸ 8.4항(한국 내 체류 예정지): 반드시 도로명 주소로 기재",
      "여권용 사진 1매 — 3.5×4.5cm, 흰색 배경, 6개월 이내, 뒷면 날짜 스탬프",
      "  ▸ ⚠️ 영사관 사진 장비 사용 불가 — 사진관에서 촬영",
      "캐나다 여권 원본 + 사본",
      "캐나다 시민권증서 원본 + 사본",
      "  ▸ 시민권 카드·Search of Citizenship Record 제출 불가",
      "  ▸ 취득일자(선서일) 년월일 반드시 표시",
      "  ▸ e-Certificate: 출력 후 제출 가능",
      "본인 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "  ▸ 국적상실·이탈 날짜 표시 필수",
      "  ▸ 미표시 시: 국적상실신고 접수증 추가 제출",
      "  ▸ 2008년 1월 1일 이전 국적상실 완료: 제적등본으로 대체",
      "본인 가족관계증명서 (상세, 3개월 이내)",
      "RCMP 범죄경력증명서 원본 — 지문 기반, 6개월 이내 (만 18~59세)",
      "  ▸ 만 17세 이하·만 60세 이상: 면제",
      "  ▸ ⚠️ 지문 기반 필수 — 이름 기반·지역경찰 불가",
      "  ▸ 제3국 범죄경력증명서 (최근 5년 내 타국 1년 이상 체류 시 추가)",
    ],
    costs: [{ label: "수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "⚠️ 비자 신청 전 반드시 국적상실신고 먼저 완료 — 처리기간 약 6개월.",
      "  ▸ 기본증명서·가족관계증명서 영사관 신청 시 2주 소요 — 미리 신청",
      "가장 일반적인 케이스: 한국 출생 → 캐나다 이민 → 캐나다 시민권 취득 → 국적상실신고.",
      "비자 유효기간: 5년 · 1회 입국 시 최대 2년 체류 · 복수 입국.",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수 — 미입국 시 비자 무효.",
      "비자 조회: visa.go.kr → '재외공관' 선택 → 여권번호 입력.",
      "우편 신청 가능 (토론토 반경 2시간 이상 거주자) — Xpresspost 반송봉투 + Certified Cheque 동봉.",
      "거소증: 90일 이상 체류 예정 시 입국 후 90일 이내 출입국사무소 신청.",
      "콜센터 없음 — 문의: torvisa@mofa.go.kr",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── F-3 동반 비자 (한국어) ──
  visa_f4_family: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)", "동반(F-3)"], question: "F-4 소지자와의 관계는?", sub: "F-4 재외동포 비자 소지자의 배우자 또는 만 18세 이하 미성년 자녀가 F-3 동반비자를 신청할 수 있습니다.", options: [{ id: "visa_f3_spouse", icon: "💑", title: "배우자 (F-4 소지자의 배우자)", desc: "최대 1년 체류 가능" }, { id: "visa_f3_child", icon: "👶", title: "미성년 자녀 (만 18세 이하)", desc: "최대 1년 체류 가능" }] },

  visa_f3_spouse: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "동반(F-3)", "배우자"],
    title: "동반 비자 (F-3) — F-4 소지자의 배우자",
    docs: [
      "사증발급신청서 1부",
      "여권용 사진 1매 (3.5×4.5cm, 흰색 배경, 6개월 이내)",
      "캐나다 여권 원본 + 사본",
      "캐나다 장기 체류비자 원본 + 사본 (캐나다 국적자가 아닌 경우)",
      "F-4 소지자의 여권 사본",
      "F-4 소지자의 유효한 F-4 비자 사본 또는 국내거소신고증(앞뒷면) 사본",
      "혼인관계 증명서류 — 해당하는 것 제출:",
      "  ▸ 한국에 혼인신고 된 경우: 혼인관계증명서 (상세, 3개월 이내)",
      "  ▸ 캐나다에만 혼인신고 된 경우: Certified Copy of Marriage Registration 또는 Certified Copy of Marriage License 원본 + 사본 (Legal 사이즈)",
      "  ▸ ⚠️ Certificate of Marriage (약식) 불가 — 반드시 Certified Copy",
      "재외동포인 경우 추가: 기본증명서 (상세, 3개월 이내) — 국적상실·이탈 날짜 표시된 것",
      "  ▸ 2008년 이전 국적상실: 제적등본으로 대체",
    ],
    costs: [{ label: "수수료", value: "CAD $81 (현금, Debit, 신용카드) / 우편: Certified Cheque $81" }],
    time: "약 1~2주",
    notices: [
      "체류기간: 최대 1년 (F-4 소지자의 비자 유효기간 이내).",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수 — 미입국 시 비자 무효.",
      "우편 신청 가능 — Prepaid Xpresspost 반송봉투 동봉 필수.",
      "⚠️ 본인이 한국 혈통이 있다면 직접 F-4 신청 자격이 될 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_f3_child: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "동반(F-3)", "미성년 자녀"],
    title: "동반 비자 (F-3) — F-4 소지자의 미성년 자녀 (만 18세 이하)",
    docs: [
      "사증발급신청서 1부",
      "여권용 사진 1매",
      "자녀 여권 원본 + 사본",
      "캐나다 장기 체류비자 원본 + 사본 (캐나다 국적자가 아닌 경우)",
      "F-4 소지자(부모)의 여권 사본",
      "F-4 소지자의 유효한 F-4 비자 사본 또는 국내거소신고증 앞뒷면 사본",
      "가족관계 입증 서류:",
      "  ▸ 자녀가 한국 국적이었던 경우: 기본증명서 (상세) + 가족관계증명서 (상세, 3개월 이내)",
      "  ▸ 출생 당시 부모 모두 캐나다 국적인 경우: Certified copy of birth registration 원본 + 사본 (부모 이름·생년월일·출생지 모두 표시된 것) + 부모 여권 사본 + 부모 시민권증서 원본 + 사본",
    ],
    costs: [{ label: "수수료", value: "CAD $81 (현금, Debit, 신용카드) / 우편: Certified Cheque $81" }],
    time: "약 1~2주",
    notices: [
      "미성년 자녀: 만 18세 이하 (0~18세).",
      "체류기간: 최대 1년 (F-4 소지자의 비자 유효기간 이내).",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수.",
      "우편 신청 가능 — Prepaid Xpresspost 반송봉투 동봉 필수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
  },

  // ── 한국 혈통 없음 (한국어) ──
  visa_ko_heritage_no: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음"],
    question: "방문 목적은 무엇인가요?",
    sub: "🇨🇦 캐나다 국적자는 한국 무비자 입국 가능 (최대 6개월). K-ETA는 2026년 12월 31일까지 면제.",
    options: [
      { id: "visa_visit_ko", icon: "🇨🇦", title: "관광·단기 체류 — 캐나다 시민권자", desc: "무비자 입국 가능 — 영사관 방문 불필요" },
      { id: "visa_c39_tourist_ko", icon: "🌏", title: "관광·단기 체류 — 비캐나다 국적자 (캐나다 PR 소지)", desc: "C-3-9 관광 비자 필요 — 수수료 국적별 상이" },
      { id: "visa_transit_ko", icon: "🔄", title: "한국 경유 (무비자 환승 TWOV)", desc: "다른 나라로 가는 길에 한국 경유 — 최대 30일" },
      { id: "visa_short_term_ko", icon: "🤝", title: "단기 방문 (비자 필요)", desc: "C-3-4 출장, C-3-1 행사참석, C-3-3 의료관광" },
      { id: "visa_work_ko", icon: "💼", title: "취업", desc: "E-2 원어민교사, H-1 워킹홀리데이, F-1-D 디지털노마드 등" },
      { id: "visa_study_ko", icon: "🎓", title: "유학·어학연수", desc: "D-2 유학, D-4 어학연수" },
      { id: "visa_marriage_ko", icon: "💍", title: "결혼이민 (F-6-1)", desc: "한국 국민의 배우자 — 90일 단수 입국, 한국 내 연장 가능" },
    ],
  },

  visa_visit_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "캐나다 시민권자 관광"],
    title: "캐나다 시민권자 — 한국 무비자 입국",
    docs: [],
    costs: [{ label: "비자 수수료", value: "없음 (무비자)" }],
    time: "비자 신청 불필요",
    notices: [
      "🇨🇦 캐나다 여권으로 한국 입국 시 최대 6개월 무비자 체류 가능.",
      "K-ETA: 2026년 12월 31일까지 캐나다 국적자 면제.",
      "캐나다 여권만 지참하면 됩니다 — 영사관 방문 불필요.",
    ],
    booking: null,
  },

  visa_c39_tourist_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "관광 비자 (C-3-9)"],
    title: "C-3-9 관광 비자 — 비캐나다 국적자",
    docs: [
      "사증발급신청서 — visa.go.kr에서 작성·출력",
      "유효한 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매 (3.5×4.5cm, 흰색 배경, 6개월 이내)",
      "캐나다 PR카드 또는 장기 체류비자 원본 + 사본",
      "왕복 항공권 예약 확인서",
      "숙소 예약 확인서",
      "재정 능력 증빙 (최근 3~6개월 은행 잔고증명서)",
      "  ▸ 한국 지인 방문 시: 초청장 + 초청인의 한국 신분증 또는 외국인등록증 사본",
    ],
    costs: [
      { label: "일반 수수료", value: "CAD $26 (단수) / CAD $52 (복수)" },
      { label: "이란", value: "USD $90 상당" },
      { label: "우즈베키스탄·키르기스스탄", value: "USD $80 상당" },
      { label: "참고", value: "수수료는 국적별로 상이 — 정확한 금액은 torvisa@mofa.go.kr 확인" },
    ],
    time: "약 5~10 영업일",
    notices: [
      "⚠️ C-3-9는 완전 온라인 비자가 아닙니다 — visa.go.kr에서 신청서 작성 후 출력하여 영사관 방문 또는 우편 제출.",
      "체류기간: 최대 90일.",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수 — 미입국 시 비자 무효.",
      "⚠️ C 계열 비자로 입국 후 다른 비자로 전환 불가.",
      "우편 신청 가능 (토론토 반경 2시간 이상 거주자) — Certified Cheque + Xpresspost 반송봉투.",
      "수수료는 국적별로 다릅니다 — 신청 전 반드시 확인하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── TWOV 한국어 ──
  visa_transit_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "한국 경유 (TWOV)"],
    question: "1단계 — 국적은?",
    sub: "TWOV(무비자 환승)는 조건을 충족하는 특정 국적자만 가능합니다. 최대 30일 체류.",
    options: [
      { id: "visa_transit_canadian_ko", icon: "🇨🇦", title: "캐나다 시민권자", desc: "무비자 입국 가능 — TWOV 불필요" },
      { id: "visa_transit_ineligible_ko", icon: "🚫", title: "제한 국적 (이란·파키스탄·방글라데시·나이지리아 등)", desc: "비자 필요 — TWOV 이용 불가" },
      { id: "visa_transit_step2_ko", icon: "🌏", title: "기타 국적 (중국·인도·필리핀·베트남 등)", desc: "캐나다 PR·비자 소지 여부 확인 필요" },
    ],
  },

  visa_transit_canadian_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "캐나다 시민권자"],
    title: "✅ 캐나다 시민권자 — 무비자 입국 (TWOV 불필요)",
    docs: [],
    costs: [{ label: "비자 수수료", value: "없음" }],
    time: "사전 신청 불필요",
    notices: [
      "캐나다 시민권자는 한국 최대 6개월 무비자 입국 가능.",
      "TWOV는 한국을 경유하는 비캐나다 국적자를 위한 제도 — 해당 없음.",
    ],
    booking: null,
  },

  visa_transit_ineligible_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "제한 국적"],
    title: "❌ TWOV 불가 — 비자 필요",
    docs: [],
    costs: [{ label: "비자 필요", value: "C-3 단기방문 비자 신청" }],
    time: "약 5~7 영업일",
    notices: [
      "해당 국적자는 캐나다 PR카드 또는 비자를 소지하더라도 TWOV 이용 불가.",
      "한국 단기방문 비자 (C-3) 신청 필요.",
      "문의: 법무부 외국인 출입국 정책본부 +82-2-2100-1345",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_transit_step2_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "2단계 — 캐나다 체류자격"],
    question: "2단계 — 유효한 캐나다 PR카드 또는 비자 스티커가 있나요?",
    sub: "여권에 부착된 스티커 형태의 비자 또는 PR카드여야 합니다 — 전자비자(e-visa) 불가 (호주 VEVO 제외).",
    options: [
      { id: "visa_transit_no_status_ko", icon: "❌", title: "없음", desc: "TWOV 불가 — 비자 필요" },
      { id: "visa_transit_step3_ko", icon: "✅", title: "있음 (유효한 PR카드 또는 비자 스티커)", desc: "여정 확인으로 이동" },
    ],
  },

  visa_transit_no_status_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "캐나다 체류자격 없음"],
    title: "❌ TWOV 불가 — 비자 필요",
    docs: [],
    costs: [{ label: "비자 필요", value: "C-3 단기방문 비자 신청" }],
    time: "약 5~7 영업일",
    notices: [
      "유효한 캐나다 PR카드 또는 여권 스티커 비자가 있어야 TWOV 가능.",
      "전자비자(e-visa) 또는 전자 체류증명은 인정되지 않습니다 (호주 VEVO 제외).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_transit_step3_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "3단계 — 여정"],
    question: "3단계 — 여정은?",
    sub: "TWOV는 한국이 최종 목적지가 아닌 경유지인 경우에만 적용됩니다.",
    options: [
      { id: "visa_transit_ok_ko", icon: "✅", title: "타국 출발 → 한국 경유 → 자국 또는 제3국", desc: "예: 중국 → 한국 → 캐나다 / 캐나다 → 한국 → 중국" },
      { id: "visa_transit_roundtrip_ko", icon: "❌", title: "캐나다 → 한국 → 캐나다 (한국만 방문 후 귀국)", desc: "다른 최종 목적지 없이 한국만 방문" },
      { id: "visa_transit_complex_ko", icon: "✅", title: "복잡한 경유 여정 (한국 전 경유지 3일 이내)", desc: "예: 출발국 → 경유 (3일 이내) → 한국 → 자국" },
    ],
  },

  visa_transit_ok_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "적합"],
    title: "✅ TWOV 이용 가능 (조건 충족 시)",
    docs: [
      "사전 신청 불필요 — 입국 시 확인:",
      "  ▸ 유효한 캐나다 PR카드 또는 여권 스티커 비자",
      "  ▸ 한국 출발 30일 이내 확정 항공권",
      "  ▸ 최근 3년 내 한국 입국 거부 이력 없음",
      "  ▸ 한국 불법체류 또는 범칙금(500만원 이상) 전력 없음",
      "  ▸ 한국 입국 전 타국 경유 시 3일 이내 체류",
    ],
    costs: [{ label: "비용", value: "없음 (조건 충족 시)" }],
    time: "입국 시 심사 — 사전 신청 없음",
    notices: [
      "체류기간: 최대 30일 (B-2 관광통과).",
      "⚠️ TWOV 조건은 변경될 수 있습니다 — 출발 전 항공사 및 한국 출입국사무소에 확인하세요.",
      "⚠️ TWOV로 입국 후 다른 비자로 전환 불가.",
      "문의: 법무부 외국인 출입국 정책본부 +82-2-2100-1345",
    ],
    booking: null,
    onlineLink: "https://www.immigration.go.kr",
  },

  visa_transit_roundtrip_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "불가 — 왕복"],
    title: "❌ TWOV 불가 — 비자 필요",
    docs: [],
    costs: [{ label: "비자 필요", value: "C-3-9 관광 비자 신청" }],
    time: "약 5~10 영업일",
    notices: [
      "TWOV는 한국을 '경유'하는 여정에만 해당됩니다.",
      "캐나다 → 한국 → 캐나다 (한국만 방문 후 귀국)는 TWOV 해당 없음.",
      "한국 관광 목적이라면 C-3-9 관광 비자를 신청하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_transit_complex_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 경유 (TWOV)", "복잡한 여정"],
    title: "✅ TWOV 이용 가능 — 복잡한 여정 (조건 충족 시)",
    docs: [
      "사전 신청 불필요 — 입국 시 확인:",
      "  ▸ 유효한 캐나다 PR카드 또는 여권 스티커 비자",
      "  ▸ 한국 출발 30일 이내 확정 항공권",
      "  ▸ ⚠️ 한국 입국 전 경유지 체류는 반드시 3일 이내",
    ],
    costs: [{ label: "비용", value: "없음 (조건 충족 시)" }],
    time: "입국 시 심사 — 사전 신청 없음",
    notices: [
      "허용 예시: 캐나다 → 한국 → 제3국 → 자국 ✅ / 자국 → 경유 (3일 이내) → 한국 → 캐나다 ✅",
      "⚠️ 한국 입국 전 경유지에서 3일 초과 체류 시 TWOV 불가.",
      "체류기간: 최대 30일.",
      "문의: 법무부 외국인 출입국 정책본부 +82-2-2100-1345",
    ],
    booking: null,
    onlineLink: "https://www.immigration.go.kr",
  },

  // ── 단기 방문 비자 한국어 ──
  visa_short_term_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문"],
    question: "방문 목적은?",
    sub: "🇨🇦 캐나다 시민권자는 한국 무비자 입국 가능 (최대 6개월) — 아래 비자는 주로 비캐나다 국적자를 위한 안내입니다.",
    options: [
      { id: "visa_c34_ko", icon: "🤝", title: "출장 (C-3-4)", desc: "시장조사·상담·계약·기계 설치·점검 등" },
      { id: "visa_c31_event_ko", icon: "🎤", title: "행사·대회 참석 (C-3-1)", desc: "친선경기·행사·대규모 회의·음악 콩쿠르 등" },
      { id: "visa_c33_ko", icon: "🏥", title: "의료관광 (C-3-3)", desc: "한국 병원 방문 — 최대 90일" },
    ],
  },

  visa_c34_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "출장 (C-3-4)"],
    title: "일반상용 비자 (C-3-4) — 단기 출장",
    docs: [
      "사증발급신청서 — visa.go.kr에서 작성·출력, SIN 번호 기재",
      "유효한 여권 원본 + 사본",
      "여권용 사진 1매",
      "캐나다 장기 체류비자 원본 + 사본 (캐나다 국적자가 아닌 경우)",
      "은행 잔고증명서 (은행 직인 날인)",
      "한국 초청회사의 초청장",
      "출장 목적 입증서류",
      "한국 초청회사 사업자등록증 또는 등기부등본",
      "신청인 캐나다 회사의 재직증명서",
      "  ▸ 재외동포인 경우: 기본증명서 (상세, 국적상실 날짜 표시, 3개월 이내) 추가",
    ],
    costs: [
      { label: "단수 입국", value: "CAD $54 (현금, Debit, 신용카드)" },
      { label: "우편 신청", value: "CAD $54 Certified Cheque" },
    ],
    time: "약 12~15 영업일",
    notices: [
      "🇨🇦 캐나다 시민권자는 한국 무비자 입국 가능 — 비자 필요 여부 먼저 확인하세요.",
      "신청인은 캐나다 회사로부터 급여를 받아야 합니다 — 한국 회사로부터 보수 수령 시 불가.",
      "체류: 최대 90일. C 계열 비자로 입국 후 다른 비자로 전환 불가.",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_c31_event_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "행사·대회 참석 (C-3-1)"],
    title: "단기방문 비자 (C-3-1) — 행사·대회 참석",
    docs: [
      "사증발급신청서 — 작성·출력",
      "유효한 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매",
      "캐나다 체류 신분 증빙서류 원본 + 사본",
      "주최측 초청장 — 행사 목적·일정·주최자 정보 포함 (경기인 경우 상금 확인 가능한 서류)",
      "주최측 사업자등록증",
      "캐나다 회사 재직증명서 또는 재학증명서",
      "  ▸ 재외동포인 경우: 기본증명서 (상세, 국적상실 날짜, 3개월 이내) 추가",
    ],
    costs: [{ label: "수수료", value: "CAD $54 (현금, Debit, 신용카드)" }],
    time: "약 12~15 영업일",
    notices: [
      "🇨🇦 캐나다 시민권자는 한국 무비자 입국 가능 — 비자 필요 여부 먼저 확인하세요.",
      "대상: 친선경기·행사·대규모 회의·방송·음악 콩쿠르 등 참가",
      "  ▸ 주최측이 항공·체재비 지원하는 경우 포함",
      "  ▸ 체재비를 초과하는 보수를 받기로 한 경우: C-4 단기취업 비자 신청",
      "체류: 최대 90일. C 계열 비자로 입국 후 다른 비자로 전환 불가.",
      "⚠️ 항공 일정·회의 일정 등 개인 사유는 신속 발급 사유 해당 없음 — 충분한 여유를 두고 신청하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_c33_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "의료관광 (C-3-3)"],
    title: "의료관광 비자 (C-3-3)",
    docs: [
      "사증발급신청서 — 작성·출력",
      "유효한 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매 — 사진관 촬영 필수",
      "캐나다 체류 신분 증빙서류 원본 + 사본",
      "의료목적 입증서류 (3개월 이내 발급) — 한국 병원 초청장 또는 진료예약 확인서",
      "한국 병원 사업자등록증",
      "의료관광 유치기관 등록증 (병원에서 발급)",
      "재정 능력 증빙: 재직증명서 + 최근 2개월 급여명세서 또는 최근 2개월 잔고증명서",
    ],
    costs: [{ label: "수수료", value: "CAD $54 (현금, Debit, 신용카드)" }],
    time: "약 2주",
    notices: [
      "🇨🇦 캐나다 시민권자는 한국 무비자로 의료관광 가능 — 비자 불필요.",
      "체류: 최대 90일. 이 비자로 입국 후 다른 비자로 전환 불가.",
      "모든 의료 서류는 신청일로부터 3개월 이내 발급된 것이어야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── 취업 비자 한국어 ──
  visa_work_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업"],
    question: "어떤 취업 비자가 필요하신가요?",
    sub: "E-1~E-7 비자는 한국 고용주가 먼저 visa.go.kr에서 사증발급인정서(CVI)를 발급받아야 합니다.",
    options: [
      { id: "visa_e2_1_ko", icon: "📚", title: "E-2-1 — 원어민 외국어 교사 (CVI 있음)", desc: "사립학원·공립학교·기업 어학 강사" },
      { id: "visa_e2_2_ko", icon: "🏫", title: "E-2-2 — EPIK / TALK 영어보조교사", desc: "정부 초청 영어보조교사 프로그램" },
      { id: "visa_e1_e7_ko", icon: "💼", title: "E-1~E-7 — 기타 취업 비자 (CVI 있음)", desc: "교수·연구·기술지도·전문직·예술·특정활동" },
      { id: "visa_c45_ko", icon: "🎤", title: "C-4-5 — 단기취업 (90일 이하)", desc: "영어캠프 강사·모델·기업 파견 등" },
      { id: "visa_h1_ko", icon: "🏖️", title: "H-1 — 워킹홀리데이", desc: "만 18~35세 · 한국에서 일하며 여행 · 최대 2년" },
      { id: "visa_f1d_ko", icon: "💻", title: "F-1-D — 디지털 노마드 (워케이션)", desc: "외국 회사 재직 중 한국 원격근무 · 최대 1년" },
    ],
  },

  visa_e2_1_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "E-2-1 원어민 교사"],
    title: "E-2-1 — 원어민 외국어 교사 비자",
    docs: [
      "사증발급신청서 (CVI 소지자용) — 작성·출력·서명",
      "유효한 캐나다 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매",
      "서명된 고용계약서 (신청인·기관 쌍방 서명)",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 단수 입국, 발급일로부터 90일 이내 유효. 최대 2년 체류.",
    notices: [
      "⚠️ 한국 고용주가 먼저 visa.go.kr에서 사증발급인정서(CVI) 발급 필수 — 신청인 단독 처리 불가.",
      "⚠️ 신청 가능 국적: 캐나다·미국·영국·호주·뉴질랜드·아일랜드·남아공만 해당.",
      "⚠️ 이중국적자(한국+외국): 비자 신청 불가 — 한국 여권 발급 필요.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 기본증명서·가족관계증명서 (상세, 3개월 이내) 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_e2_2_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "E-2-2 EPIK/TALK"],
    title: "E-2-2 — EPIK / TALK 영어보조교사 비자",
    docs: [
      "사증발급신청서 — 작성·출력",
      "유효한 캐나다 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매",
      "EPIK 또는 TALK 프로그램 임용통지서 (Notice of Appointment)",
      "서명된 고용계약서",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주.",
    notices: [
      "⚠️ E-2-2는 정부 초청 EPIK·TALK 프로그램 전용 — E-2-1과 달리 CVI 불필요 (임용통지서로 대체).",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_e1_e7_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "E-1~E-7"],
    title: "E-1~E-7 — 기타 취업 비자 (CVI 소지자)",
    docs: [
      "사증발급신청서 (CVI 소지자용) — 작성·출력·하단 서명",
      "유효한 캐나다 여권 원본 + 사본 (유효기간 6개월 이상)",
      "  ▸ 비캐나다 국적자: PR카드 또는 유효한 캐나다 취업·학업허가증 사본 추가",
      "여권용 사진 1매",
      "서명된 고용계약서",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주.",
    notices: [
      "포함 비자 종류: E-1 교수 / E-3 연구 / E-4 기술지도 / E-5 전문직 / E-6 예술·연예 / E-7 특정활동",
      "⚠️ 한국 고용주·초청기관이 먼저 visa.go.kr에서 CVI 발급 필수.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_h1_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "H-1 워킹홀리데이"],
    title: "H-1 — 워킹홀리데이 비자",
    docs: [
      "사증발급신청서 — 작성·출력",
      "유효한 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매",
      "워킹홀리데이 계획서 — 여행·활동 일정, 날짜, 하단 서명",
      "이력서 (CV) — 경력 기재",
      "최종 학력 졸업증명서 — 캐나다 관할 외 학교는 변호사·공증인 공증 필요",
      "RCMP 지문 기반 범죄경력증명서 — 6개월 이내",
      "  ▸ 이중국적자: 다른 국적 범죄경력증명서 + 아포스티유 추가",
      "  ▸ 최근 5년 내 타국 1년 이상 체류: 해당국 범죄경력증명서 + 아포스티유",
      "신체검사서 — 3개월 이내 (흉부X선·소변검사·혈액검사·HIV 포함)",
      "의료보험 증명서 — 체류 전 기간 유효 (최소 KRW 40,000,000 보장, 귀국 항공 포함)",
      "은행 잔고증명서 (은행 직인 날인) — 최소 3개월 생활비 증명",
      "왕복 항공 일정",
      "여행 일정표",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $121.50 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 복수 입국, 최대 2년 유효.",
    notices: [
      "신청 자격: 캐나다 시민권자, 비자 발급 시점 만 18~35세, 캐나다 거주 중.",
      "⚠️ 한국 워킹홀리데이 프로그램은 평생 1회만 참여 가능.",
      "⚠️ 동반 가족 동행 불가.",
      "⚠️ 이중국적자(한국+외국): 비자 신청 불가 — 한국 여권 발급 필요.",
      "비자 승인 전 항공권 구매 금지.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 기본증명서·가족관계증명서 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f1d_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "F-1-D 디지털 노마드"],
    title: "F-1-D — 디지털 노마드 비자 (워케이션)",
    docs: [
      "사증발급신청서 — 작성·출력",
      "유효한 여권 원본 + 사본 (유효기간 6개월 이상)",
      "여권용 사진 1매",
      "재직증명서 또는 고용계약서 — 1년 이상 재직 확인, 신청일로부터 2주 이내 발급",
      "소득 증빙서류 (3가지 모두 필요):",
      "  ▸ 최근 3개월 급여명세서",
      "  ▸ 최근 3개월 잔고증명서",
      "  ▸ 최근 2년 세금신고서 (Notice of Assessment)",
      "아포스티유 RCMP 범죄경력증명서 — 지문 기반, 3개월 이내",
      "의료보험 증명서 — 의료비 약 CAD $130,000 + 귀국 항공 포함, 체류 전 기간 유효",
      "  ▸ 동반 가족: 각각 별도 보험 가입 + 여권·가족관계 증명서류",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $121.50 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 복수 입국, 발급일로부터 최대 1년.",
    notices: [
      "신청 자격: 외국(비한국) 회사에 1년 이상 재직 중인 원격근무자 (자영업자 포함).",
      "소득 기준: 연 약 KRW 99,900,000 이상 (세전) — 매년 업데이트, 신청 전 확인 필요.",
      "⚠️ 한국 기업 취업 또는 한국 내 영리활동 불가.",
      "⚠️ 전과 없어야 합니다.",
      "체류: 최대 1년, 1회 연장 가능 (최대 2년).",
      "90일 이상 체류 시 입국 후 90일 이내 출입국사무소 외국인 등록.",
      "동반 가족 동행 가능 — 각각 별도 신청 필요.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_c45_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "C-4-5 단기취업"],
    question: "단기취업 목적은?",
    sub: "C-4-5는 90일 이하 단기 유급활동 비자입니다.",
    options: [
      { id: "visa_c45_camp_ko", icon: "🏕️", title: "영어캠프 강사", desc: "한국 캠프·평생교육시설 영어 강의" },
      { id: "visa_c45_model_ko", icon: "📸", title: "모델·공연자·연예인", desc: "패션 모델·광고·공연·방송 출연" },
      { id: "visa_c45_dispatch_ko", icon: "🏢", title: "기업 파견", desc: "용역계약에 의한 한국 파견 — 캐나다 회사 급여" },
    ],
  },

  visa_c45_camp_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "C-4-5", "영어캠프 강사"],
    title: "C-4-5 — 영어캠프 강사",
    docs: [
      "사증발급신청서 — 작성·출력",
      "유효한 여권 원본 + 사본",
      "  ▸ 비캐나다 국적자: PR카드 또는 유효한 체류비자 사본 추가",
      "여권용 사진 1매",
      "한국 초청기관 사업자등록증 또는 등기부등본",
      "고용계약서 + 초청장 (신청인 정보·활동 내용·기간·한국 담당자 연락처 포함)",
      "평생교육시설등록증 및 신고수리증",
      "대학교 학위증명서 원본",
      "  ▸ 캐나다 외 학교: 영사관 관할 변호사 공증 또는 아포스티유",
      "RCMP 지문 기반 범죄경력증명서 — 6개월 이내 + 영사관 공증 필요",
      "대학교 성적증명서 (봉인된 것)",
      "영어캠프 운영일정표 및 강의시간표",
    ],
    costs: [{ label: "수수료", value: "CAD $54 (현금, Debit)" }],
    time: "약 2주. 단수 입국, 발급일로부터 3개월 이내 유효. 최대 90일 체류.",
    notices: [
      "⚠️ RCMP 범죄경력증명서는 지문 기반 필수 + 영사관 공증 필요.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_c45_model_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "C-4-5", "모델·공연자"],
    title: "C-4-5 — 모델·공연자·연예인",
    docs: [
      "사증발급신청서",
      "유효한 여권 원본 + 사본",
      "여권용 사진 1매",
      "한국 초청기관 사업자등록증 또는 등기부등본",
      "공연 개요서",
      "고용계약서 및 공연 개요서 (보수·인센티브 명시)",
      "관련 장관 추천서:",
      "  ▸ 연예·오락: 영상물등급위원회 추천서 + 활동 개요",
      "  ▸ 광고·패션모델: 문화체육관광부 장관 추천서",
      "한국콘텐츠진흥원 대중문화예술기획업 등록증",
      "부가가치세 과세표준증명 / 납세증명서",
      "개인 추천서 및 포트폴리오",
    ],
    costs: [{ label: "수수료", value: "CAD $54 (현금, Debit)" }],
    time: "약 2주. 최대 90일 체류.",
    notices: [
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_c45_dispatch_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "취업", "C-4-5", "기업 파견"],
    title: "C-4-5 — 기업 파견",
    docs: [
      "사증발급신청서",
      "유효한 여권 원본 + 사본",
      "여권용 사진 1매",
      "한국 초청기관 사업자등록증 또는 등기부등본",
      "캐나다 회사 재직증명서 (신청인 정보·한국 활동 내용·기간·캐나다 담당자 연락처·캐나다 회사가 비용 부담 확인 명시)",
      "양사 간 계약서 (용역·파견 계약)",
      "비즈니스 관계 증빙서류 (무역 기록·계약서 등)",
      "항공 일정 및 체류 계획",
    ],
    costs: [{ label: "수수료", value: "CAD $54 (현금, Debit)" }],
    time: "약 2주. 최대 90일 체류.",
    notices: [
      "⚠️ 캐나다 회사로부터 급여를 받아야 합니다 — 한국 회사로부터 보수 수령 불가.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── 유학 비자 한국어 ──
  visa_study_ko: {
    type: "question",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "유학·어학연수"],
    question: "어떤 유학 비자가 필요하신가요?",
    options: [
      { id: "visa_d2_6_ko", icon: "🎓", title: "D-2-6 — 교환학생", desc: "대학 교환학생 프로그램" },
      { id: "visa_d2_8_ko", icon: "📖", title: "D-2-8 — 단기 대학 과정 (1년 이하)", desc: "정규 대학 단기 수학" },
      { id: "visa_d4_1_ko", icon: "🗣️", title: "D-4-1 — 한국어 어학연수", desc: "대학 부설 어학원·어학연수" },
      { id: "visa_d4_3_ko", icon: "🏫", title: "D-4-3 — 초·중·고 재학", desc: "한국 초·중·고등학교 재학" },
    ],
  },

  visa_d2_6_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "유학", "D-2-6 교환학생"],
    title: "D-2-6 — 교환학생 비자",
    docs: [
      "사증발급신청서",
      "유효한 캐나다 여권 원본 + 사본 (유효기간 6개월 이상)",
      "  ▸ 비캐나다 국적자: PR카드 또는 유효한 캐나다 체류비자 사본",
      "여권용 사진 1매",
      "한국 대학교 발급 표준입학허가서 (학적 정보·재정 상태 포함)",
      "한국 기관 사업자등록증",
      "교환학생 관련 서류 (호스트 대학 공문·양교 교환학생 협정서)",
      "현재 캐나다 학교 재학증명서 (최소 1학기 이상 이수 확인 — 공식 서한, 영수증 불가)",
      "재정 능력 증빙 (1년 학비+생활비) — 은행 잔고증명서 (은행 직인)",
      "  ▸ 부모 계좌 사용 시: 부모 서명 동의서 + Certified Copy of Birth Registration",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 단수 입국, 최대 1년 체류.",
    notices: [
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 기본증명서·가족관계증명서 (상세, 3개월 이내) 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_d2_8_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "유학", "D-2-8 단기 대학 과정"],
    title: "D-2-8 — 단기 대학 과정 비자 (1년 이하)",
    docs: [
      "사증발급신청서",
      "  ▸ 8.4항(한국 내 체류 예정지): 반드시 도로명 주소 기재",
      "유효한 캐나다 여권 원본 + 사본",
      "  ▸ 비캐나다 국적자: PR카드 또는 유효한 캐나다 체류비자 사본",
      "여권용 사진 1매",
      "한국 대학교 발급 표준입학허가서",
      "한국 기관 사업자등록증",
      "현재 캐나다 대학교·전문대학 재학증명서 (공식 서한 — 영수증·수강신청 화면 불가)",
      "재정 능력 증빙 (학비+생활비) — 은행 잔고증명서 (은행 직인)",
    ],
    costs: [
      { label: "90일 미만 과정", value: "CAD $54 (현금, Debit, 신용카드)" },
      { label: "90일 이상 과정", value: "CAD $81 (현금, Debit, 신용카드)" },
    ],
    time: "약 2주. 단수 입국, 최대 1년 체류.",
    notices: [
      "⚠️ 한국어 어학 과정이 목적이라면 D-2-8이 아닌 D-4-1 비자 신청.",
      "⚠️ D-2-8 소지자는 아르바이트 등 유급 활동 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_d4_1_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "유학", "D-4-1 한국어 어학연수"],
    title: "D-4-1 — 한국어 어학연수 비자",
    docs: [
      "사증발급신청서",
      "유효한 캐나다 여권 원본 + 사본",
      "여권용 사진 1매",
      "어학원 발급 입학허가서",
      "어학원 사업자등록증",
      "연수 계획서 (강의 일정·강사 프로필·시설 정보 등)",
      "최종 학력 졸업(재학)증명서",
      "  ▸ OECD 비회원국 학교: 아포스티유 또는 영사 확인 필요",
      "재정 능력 증빙 (1년 학비+생활비) — 은행 잔고증명서",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 단수 입국, 최대 1년 체류.",
    notices: [
      "신청 자격: 고등학교 졸업 이상.",
      "이전에 한국 국적을 보유했던 경우: 국적상실신고 완료 후 관련 서류 제출.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_d4_3_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "유학", "D-4-3 초·중·고"],
    title: "D-4-3 — 초·중·고등학교 재학 비자",
    docs: [
      "사증발급신청서 + 보호자 동의서",
      "유효한 캐나다 여권 원본 + 사본 (유효기간 6개월 이상)",
      "  ▸ 이중국적자: 보유한 여권 모두 제출",
      "캐나다 체류 신분 증빙서류 원본 + 사본",
      "여권용 사진 1매 (사진관 촬영 필수)",
      "한국 학교장 발급 입학허가서 (학교장 직인 포함)",
      "한국 학교 사업자등록증",
      "최종 학력 졸업(재학)증명서",
      "  ▸ 영어가 아닌 경우: 영어 번역 + 변호사 공증",
      "학비 납입 영수증 (학비·기숙사·입학금 포함)",
      "  ▸ 전액 장학생: 장학 증빙서류",
      "가족관계 증명서류 (정부 발급 출생증명서)",
      "은행 잔고증명서 (최근 3개월)",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 단수 입국, 최대 1년 체류.",
    notices: [
      "의무교육(무상) 학교는 일반적으로 D-4-3 비자 발급 불가.",
      "한국 혈통 신청자: 이중국적 관련 추가 서류 필요 — 개인 상황에 따라 상이.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── 결혼이민 비자 한국어 ──
  visa_marriage_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "결혼이민 (F-6-1)"],
    title: "결혼이민 비자 (F-6-1)",
    docs: [
      "사증발급신청서 — 작성·출력",
      "혼인증명서 원본 + 사본 — 반드시 상세 증명서 제출:",
      "  ▸ 캐나다에서 혼인: Certified Copy of Marriage Registration 또는 Certified Copy of Marriage License (Legal 사이즈)",
      "  ▸ ⚠️ Certificate of Marriage (약식) 불가 — 반드시 Certified Copy",
      "  ▸ 캐나다 외 국가에서 혼인: 해당 국가에서 가장 상세한 혼인증명서 원본 + 사본",
      "  ▸   영어가 아닌 경우: 온타리오(또는 마니토바) 공인번역사의 영어 번역공증 또는 변호사 공증",
      "  ▸ 한국에만 혼인신고 된 경우: 온타리오(또는 마니토바) 변호사를 통한 Affidavit 제출 (유효기간 3개월)",
      "한국인 배우자(초청인)의 여권 사본",
      "초청인 이혼경력 있는 경우: 캐나다 정부 발급 이혼확인서류",
      "신청인 이혼경력 있는 경우: 캐나다 정부 발급 이혼확인서류",
      "  ▸ 전 배우자가 한국인 또는 재외동포인 경우: 신청인 명의 혼인관계증명서 (상세) 추가",
      "범죄경력증명서 (신청인 + 초청인 모두 제출 — 면제 요건 확인 필요)",
      "건강진단서 (신청인 + 초청인 모두 제출 — 면제 요건 확인 필요)",
      "재외동포인 경우 추가: 기본증명서 (상세, 국적상실 날짜, 3개월 이내)",
      "  ▸ 출생 당시 부모 모두 캐나다 국적인 경우: Certified copy of birth registration 원본 + 부모 여권 사본 + 부모 시민권증서 원본 + 사본",
      "임신 20주 이상으로 심사 면제 요청 시: 의사 진단서 (출산예정일 명시) + 심사면제 요청서",
    ],
    costs: [{ label: "수수료 (캐나다 국적자)", value: "CAD $54 (현금 또는 Debit — TAP 원칙, 정액 현금 가능)" }],
    time: "약 12~15 영업일 (서류 조회·추가 요청·인터뷰 등으로 지연 가능)",
    notices: [
      "⚠️ 신청인(외국인 배우자)이 반드시 직접 영사관 방문 — 우편 신청 불가.",
      "⚠️ 한국 혼인신고가 반드시 완료되어 있어야 합니다.",
      "체류: 단수 입국, 최대 90일 — 한국 입국 후 체류기간 연장 가능.",
      "⚠️ 비자 발급일로부터 3개월 이내 입국 필수.",
      "초청인 소득 요건 (2021년 기준): 2인 가구 18,528,474원 이상 (세전, 1년간) — 동거 직계가족 수에 따라 증가.",
      "의사소통이 어려운 경우 초청인 또는 통역자 동행 필수.",
      "비자 조회: visa.go.kr",
      "문의: torvisa@mofa.go.kr (제목 예: 결혼이민(F-6-1) 비자 문의 — 초청인 성명 & 신청인 여권명)",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── 우편신청·비자 조회 안내 (한국어) ──
  visa_mail_ko: {
    type: "result",
    service: "visa",
    breadcrumb: ["홈", "비자 (사증)", "우편 신청·비자 조회"],
    title: "비자 우편 신청 안내 및 비자 조회 방법",
    docs: [
      "해당 비자 구비서류 일체",
      "여권 원본 — 반드시 동봉",
      "Prepaid Xpresspost 반송봉투 (Canada Post 구매) — 여권 반송용",
      "  ▸ 보내는 사람·받는 사람 모두 본인 주소 기재",
      "  ▸ 봉투 크기 무관",
      "Certified Cheque (Money Order) — 비자 수수료 해당 금액",
      "  ▸ PAY TO: KOREAN CONSULATE TORONTO",
      "  ▸ 개인 수표 불가",
      "운전면허증 앞면 복사본 (거주지 주소 확인용)",
    ],
    costs: [{ label: "우편 수수료", value: "방문 신청과 동일 — Certified Cheque만 가능" }],
    time: "방문 신청과 동일 처리기간 + 우편 배송기간",
    notices: [
      "우편 주소: Korean Consulate in Toronto (비자), 555 Avenue Road, Toronto, ON M4V 2J7",
      "전화: 416-920-3809 / 이메일: torvisa@mofa.go.kr",
      "⚠️ 우편 신청은 토론토 반경 차량 2시간 이상 거주자만 가능 (런던·윈저·킹스턴 등).",
      "⚠️ F-6-1 결혼이민 비자는 우편 신청 불가 — 반드시 본인 방문.",
      "서류 심사 중 인터뷰 요청될 수 있음 (대부분의 경우 불필요).",
      "비자 조회 방법: visa.go.kr → '재외공관' 선택 → 여권번호와 영문 성명 입력",
      "  ▸ 성명 입력 형식: HONG GILDONG (맞음) / HONG, GILDONG (틀림) / HONG GIL-DONG (틀림)",
      "비자(VISA GRANT NOTICE) 출력: 흑백·컬러 무관, 'fit to page' 설정으로 잘림 없이 출력",
      "  ▸ 출력된 종이가 비자 — 항공기 탑승 및 한국 입국 시 반드시 제시",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (비자과) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_other_portal: { type: "result", service: "visa", breadcrumb: ["홈", "비자 (사증)", "기타 비자"], title: "기타 비자 — 비자포털 확인 필요", docs: ["사증발급신청서 (visa.go.kr 양식 출력)", "캐나다 여권 원본 + 사본", "여권용 사진 1매", "비자 종류별 추가 서류 (비자포털에서 확인 필수)"], costs: [{ label: "수수료", value: "비자 종류별 상이" }], time: "단기비자 약 12~15 영업일 / 장기비자 약 5~10 영업일", notices: ["총영사관 비자과는 콜센터가 없습니다 — 전화 상담 불가, 홈페이지 및 비자포털 확인 필수.", "비자 진행 상황 조회: 대한민국 비자포털 (visa.go.kr)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },

  // ══ NOTARIZATION (공증) ══
  // ══ NOTARIZATION (공증) — 재설계된 트리 ══
  notarization_start: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증"],
    question: "어떤 공증 업무가 필요하신가요?",
    sub: "⚠️ 모든 서명은 반드시 영사 앞에서 직접 해야 합니다. 사전 서명 서류는 접수 불가합니다. 대리인 신청도 불가합니다.",
    options: [
      { id: "notarization_apostille_guide", icon: "❓", title: "아포스티유 vs 영사관 공증 — 구분 안내", desc: "어떤 방식을 선택해야 하는지 먼저 확인하세요" },
      { id: "notarization_saseo", icon: "📜", title: "사서증서 인증 (서명 인증)", desc: "위임장·진술서·상속포기서·계약서 등 서명·날인 인증" },
      { id: "notarization_ingam", icon: "🔏", title: "인감 관련 공증", desc: "인감증명서 발급 위임장·인감신고서·인감변경신고서" },
      { id: "notarization_translation", icon: "🌐", title: "번역 공증", desc: "가족관계증명서 등 한국 서류 영문 번역 인증·운전면허증 번역" },
      { id: "notarization_school", icon: "🏫", title: "초·중·고 학적서류 공증", desc: "졸업증명서·재학증명서·성적증명서 — 방문·우편 모두 가능" },
    ],
  },

  // ── 아포스티유 vs 영사관 공증 안내 ──
  notarization_apostille_guide: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "아포스티유 vs 영사관 공증"],
    title: "아포스티유 vs 영사관 공증 — 어떤 것이 필요한가요?",
    docs: [
      "📌 핵심 질문: 한국 제출 기관에서 '아포스티유'를 요구하는지, '영사관 공증'을 요구하는지 먼저 확인하세요",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "🔵 아포스티유 (Apostille) — 캐나다 공문서를 한국에 제출할 때",
      "  ▸ 캐나다는 헤이그 협약(아포스티유) 가입국 — 영사관 방문 없이 처리 가능",
      "  ▸ 연방 서류 (시민권증서·여권·FBI에 해당하는 RCMP 범죄경력증명서 등): Global Affairs Canada에서 아포스티유 발급",
      "  ▸ 주(Province) 서류 (출생증명서·혼인증명서·이혼판결문 등): 온타리오주의 경우 ServiceOntario에서 아포스티유 발급",
      "  ▸ 영사관 공증과 아포스티유를 동일 서류에 동시 적용 불가",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "🔴 영사관 공증 — 개인이 작성한 사문서의 서명을 인증할 때",
      "  ▸ 위임장·진술서·상속포기서 등 본인이 작성한 서류의 서명 인증",
      "  ▸ 인감증명서 발급 위임장·인감신고서 등 인감 관련 서류",
      "  ▸ 한국 서류(가족관계증명서 등)의 영문 번역 인증",
      "  ▸ 캐나다 공문서는 아포스티유 권장 — 영사관에서는 캐나다 공문서 자체의 진위 확인 불가",
    ],
    costs: [{ label: "상담", value: "무료" }],
    time: "확인 후 해당 서비스로 진행",
    notices: [
      "확인이 어렵다면 한국 내 제출 기관(법무사·등기소·은행·관공서)에 먼저 문의하세요.",
      "아포스티유 신청: Global Affairs Canada (연방서류) / ServiceOntario (주 서류)",
      "영사관 공증이 필요한 것으로 확인되면 뒤로 돌아가서 해당 메뉴를 선택하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.international.gc.ca/country-pays/apostille.aspx?lang=eng",
  },

  // ── 사서증서 인증 분기 ──
  notarization_saseo: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사서증서 인증"],
    question: "어떤 종류의 서류인가요?",
    sub: "사서증서 인증은 영사가 서명·날인이 본인 의사에 의한 것임을 확인해 주는 업무입니다. 서류 내용의 진위를 확인하는 것이 아닙니다.",
    options: [
      { id: "notarization_pow", icon: "📜", title: "위임장", desc: "부동산 매매·등기·은행·상속·증명서 발급 등 한국 업무 대리 위임" },
      { id: "notarization_legal_act", icon: "⚖️", title: "법률행위 증서", desc: "상속재산분할협의서·매매계약서·은행대출약정서·상속포기서 등" },
      { id: "notarization_sign", icon: "✍️", title: "사실행위 증서", desc: "서명진술서·동일인진술서·거주사실진술서·재직증명서 등" },
    ],
  },

  // ── 위임장 ──
  notarization_pow: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사서증서 인증", "위임장"],
    title: "위임장 공증 (사서증서 인증)",
    docs: [
      "위임장 — 사전에 작성, 단 서명란은 반드시 공백으로 (영사 앞에서 서명)",
      "  ▸ 피위임자 성명·주민등록번호·주소·연락처·위임 목적(용도)·발급 통수 기재 필수",
      "  ▸ 용도 예시: 부동산 매매용·근저당설정용·자동차매매용·은행업무용·일반용 등",
      "  ▸ 양식: 영사관 홈페이지 다운로드 또는 직접 작성 (타이핑 후 출력 가능, 서명은 현장에서)",
      "공증촉탁서 (소정 양식 — 자필 작성 필수, 타이핑 불가)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가 (CAD $1.00)",
      "캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
    ],
    costs: [
      { label: "위임장 1부당", value: "CAD $2.70 (현금, Debit, 신용카드)" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급 (약 30분~1시간)",
    notices: [
      "⚠️ 서명은 반드시 영사 앞에서 — 사전 서명 또는 타인 대리 서명 불가.",
      "동일 위임장에 여러 명이 서명하는 경우 각 서명마다 수수료 발생.",
      "인감증명서 발급 위임장은 별도 메뉴(인감 관련 공증)를 이용하세요.",
      "한국 부동산 등기 목적: 캐나다 공증인(Notary Public) + 아포스티유로 대체 가능한 경우도 있으니 제출 기관에 먼저 확인하세요.",
      "시민권자: 한국 여권이 없는 경우 방문 전 전화 문의 필수 (416-920-3809).",
      "법인 신청 시: 법인 대표자가 직접 방문 — 법인등기부등본 + 사업자등록증 지참 필수.",
      "해외 거주사실 증명이 필요한 경우: 재외국민등록 후 재외국민등록부등본으로 대체 가능 (별도 메뉴 참조).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 위임장) →",
  },

  // ── 법률행위 증서 ──
  notarization_legal_act: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사서증서 인증", "법률행위 증서"],
    title: "법률행위 증서 공증 — 상속포기서·매매계약서·은행약정서 등",
    docs: [
      "공증받을 서류 — 서명란 공백으로 준비 (영사 앞에서 서명)",
      "  ▸ 상속재산분할협의서, 상속포기서",
      "  ▸ 매매계약서·임대차계약서·도급계약서 등 각종 계약서",
      "  ▸ 은행대출 거래약정서·신용보증 약정서",
      "  ▸ 기타 법률행위 관련 사문서",
      "공증촉탁서 (소정 양식 — 자필 작성 필수, 타이핑 불가)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가",
      "캐나다 체류자격 증빙서류 원본",
    ],
    costs: [
      { label: "목적가액 없는 서류 1부당", value: "CAD $5.40 (현금, Debit, 신용카드)" },
      { label: "목적가액 있는 서류 (계약서 등)", value: "CAD $1,000당 약 CAD $3.00 별도 산정" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급 (목적가액 있는 서류는 검토 시간 추가 소요)",
    notices: [
      "⚠️ 서명은 반드시 영사 앞에서 직접 — 사전 서명 불가.",
      "목적가액(계약금액)이 있는 서류는 금액에 따라 수수료가 달라집니다 — 방문 전 확인 권장.",
      "서류 내용의 진위·법적 효력을 영사가 보증하는 것이 아닙니다 — 서명이 본인 의사임을 확인하는 것입니다.",
      "시민권자: 한국 여권이 없는 경우 방문 전 전화 문의 필수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 법률행위 증서) →",
  },

  // ── 사실행위 증서 ──
  notarization_sign: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사서증서 인증", "사실행위 증서"],
    title: "사실행위 증서 공증 — 진술서·동일인진술서·거주사실진술서 등",
    docs: [
      "공증받을 서류 — 서명란 공백으로 준비 (영사 앞에서 서명)",
      "  ▸ 서명진술서 (Signature Statement)",
      "  ▸ 동일인진술서 (Identity Statement — 이름이 다를 때)",
      "  ▸ 거주사실진술서",
      "  ▸ 재직증명서·재학증명서 등 각종 진술 서류",
      "  ▸ 영사관 홈페이지에 소정 양식 있는 경우 해당 양식 사용",
      "공증촉탁서 (소정 양식 — 자필 작성 필수, 타이핑 불가)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가",
      "캐나다 체류자격 증빙서류 원본",
    ],
    costs: [
      { label: "서류 1부당", value: "CAD $5.40 (현금, Debit, 신용카드)" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급 (약 30분~1시간)",
    notices: [
      "⚠️ 모든 서명은 반드시 영사 앞에서 직접 — 대리인 신청 불가.",
      "서류 내용의 진위를 영사가 확인하는 것이 아닙니다 — 서명이 본인 의사임을 인증하는 것입니다.",
      "시민권자: 한국 여권이 없는 경우 방문 전 전화 문의 필수 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 사실행위 증서) →",
  },

  // ── 인감 관련 공증 ──
  notarization_ingam: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련"],
    question: "어떤 인감 업무가 필요하신가요?",
    sub: "인감 관련 서류는 반드시 본인이 영사 앞에서 직접 작성해야 합니다. 대리인 신청 절대 불가.",
    options: [
      { id: "notarization_ingam_eligible", icon: "✅", title: "신청 가능 여부 먼저 확인", desc: "시민권자·거소증 없는 경우 신청 불가 — 먼저 확인하세요" },
      { id: "notarization_ingam_pow", icon: "🔏", title: "인감증명서 발급 위임장", desc: "한국에서 대리인이 인감증명서를 발급받도록 위임" },
      { id: "notarization_ingam_change", icon: "✏️", title: "인감(변경)신고서", desc: "인감 신규 등록 또는 기존 인감 변경" },
      { id: "notarization_ingam_protect", icon: "🛡️", title: "인감보호(해제)신청서", desc: "인감 도용 방지 보호 신청 또는 해제" },
    ],
  },

  notarization_ingam_eligible: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "신청 가능 여부 확인"],
    question: "본인의 상황은?",
    sub: "인감 관련 업무는 대한민국 국적 보유자 또는 유효한 거소증을 가진 시민권자만 신청 가능합니다.",
    options: [
      { id: "notarization_ingam_ok_passport", icon: "🛂", title: "한국 여권 보유 (국적 보유자)", desc: "유효한 대한민국 여권이 있는 경우 → 신청 가능" },
      { id: "notarization_ingam_ok_sojourn", icon: "🪪", title: "캐나다 시민권자 + 유효한 거소증 보유", desc: "외국국적동포 국내거소신고증이 있는 경우 → 신청 가능" },
      { id: "notarization_ingam_no", icon: "❌", title: "캐나다 시민권자 + 거소증 없음", desc: "국적회복 없이 시민권만 있는 경우 → 신청 불가" },
    ],
  },

  notarization_ingam_ok_passport: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "신청 가능 확인"],
    title: "✅ 인감 업무 신청 가능 — 메뉴로 이동하세요",
    docs: [
      "신청 가능 대상입니다 — 아래 해당 업무를 선택하여 진행하세요:",
      "  ▸ 인감증명서 발급 위임장 → 한국 대리인이 인감증명서를 대신 발급받도록 위임",
      "  ▸ 인감(변경)신고서 → 인감 신규 등록 또는 기존 인감 변경",
      "  ▸ 인감보호(해제)신청서 → 인감 도용 방지 보호 신청·해제",
    ],
    costs: [{ label: "참고", value: "각 업무별 수수료 상이 — 해당 메뉴 참조" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 반드시 본인이 영사 앞에서 직접 작성 — 대리인 신청 절대 불가.",
      "우편 신청 불가 — 직접 방문 필수.",
    ],
    booking: "https://www.torbooking.com/book",
  },

  notarization_ingam_ok_sojourn: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "신청 가능 확인 (거소증)"],
    title: "✅ 인감 업무 신청 가능 — 거소증 소지 시민권자",
    docs: [
      "유효한 외국국적동포 국내거소신고증 보유 시 신청 가능합니다.",
      "  ▸ 거소증 원본 지참 필수",
      "신청 가능 업무:",
      "  ▸ 인감증명서 발급 위임장",
      "  ▸ 인감(변경)신고서",
      "  ▸ 인감보호(해제)신청서",
    ],
    costs: [{ label: "참고", value: "각 업무별 수수료 상이 — 해당 메뉴 참조" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 거소증이 만료된 경우 신청 불가 — 반드시 유효한 거소증 지참.",
      "⚠️ 반드시 본인 직접 방문 — 대리인 신청 절대 불가.",
    ],
    booking: "https://www.torbooking.com/book",
  },

  notarization_ingam_no: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "신청 불가 안내"],
    title: "❌ 인감 업무 신청 불가",
    docs: [
      "캐나다 시민권 취득과 동시에 한국 국적은 법적으로 상실됩니다.",
      "  ▸ 국적상실신고를 하지 않았더라도 시민권 선서 시점에 자동으로 한국 국적 상실",
      "  ▸ 따라서 유효한 거소증이 없는 시민권자는 인감 업무 신청 불가",
      "신청 가능하려면 아래 중 하나가 필요합니다:",
      "  ▸ 한국 국적 회복 → 국적회복 허가 후 거소신고 또는 여권 발급",
      "  ▸ 재외국민 거소신고 → 외국국적동포 국내거소신고증 발급",
    ],
    costs: [{ label: "해당없음", value: "신청 불가" }],
    time: "신청 불가",
    notices: [
      "국적 회복 또는 거소신고 관련 문의: 영사관 전화 상담 (416-920-3809).",
      "국적 회복 절차는 국적 메뉴를 참조하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 →",
  },

  notarization_ingam_pow: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "인감증명서 발급 위임장"],
    question: "위임자(신청인)의 연령은?",
    sub: "만 19세 미만 미성년자는 본인과 법정대리인이 함께 방문해야 합니다.",
    options: [
      { id: "notarization_ingam_pow_adult", icon: "👤", title: "만 19세 이상 (성인)", desc: "본인 직접 방문" },
      { id: "notarization_ingam_pow_minor", icon: "👶", title: "만 19세 미만 (미성년자)", desc: "본인 + 법정대리인 함께 방문 필수" },
    ],
  },

  notarization_ingam_pow_adult: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "인감증명서 발급 위임장", "성인"],
    title: "인감증명서 발급 위임장 — 성인",
    docs: [
      "인감증명서 발급 위임장 양식 — 다운로드 후 작성 (서명란은 공백, 영사 앞에서 자필 서명)",
      "  ▸ 한국 내 대리인 성명·주민등록번호·주소·전화번호 반드시 기재",
      "  ▸ 인감 용도 기재 (예: 부동산 매매용·은행업무용·일반용 등)",
      "유효한 대한민국 여권 원본",
      "체류자격 증명서류 원본:",
      "  ▸ 단기방문자: ETA 허가서",
      "  ▸ 장기체류자: 캐나다 체류비자 원본 (Work/Study Permit 등)",
      "  ▸ 영주권자: PR Card 원본 (유효기간 내)",
      "  ▸ 복수국적자: 국적회복이 표시된 기본증명서 또는 국적회복증서",
      "  ▸ 거소증 소지 시민권자: 유효한 외국국적동포 국내거소신고증 원본",
    ],
    costs: [{ label: "1부당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 반드시 본인이 영사 앞에서 자필 서명 — 대리인 신청 절대 불가, 우편 신청 불가.",
      "⚠️ 타이핑 입력 후 출력한 위임장·복사한 위임장 접수 불가 — 반드시 손으로 직접 작성.",
      "한국 내 대리인이 인감증명서 발급 시 이 위임장과 인감도장을 함께 지참해야 합니다.",
      "인감이 아직 한국에 등록되어 있지 않다면 인감(변경)신고서를 먼저 처리하세요.",
      "유효한 체류자격 증명이 없는 경우 발급 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 인감증명 위임장) →",
  },

  notarization_ingam_pow_minor: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "인감증명서 발급 위임장", "미성년자"],
    title: "인감증명서 발급 위임장 — 만 19세 미만 미성년자",
    docs: [
      "인감증명서 발급 위임장 양식 — 미성년자 본인과 법정대리인이 함께 방문, 자필 작성",
      "  ▸ 한국 내 대리인 성명·주민등록번호·주소·전화번호 반드시 기재",
      "미성년자 본인의 유효한 대한민국 여권 원본",
      "미성년자 본인의 캐나다 체류비자 원본 또는 유효한 PR Card 원본",
      "  ▸ 이중국적자인 경우: 기본증명서 + 캐나다 여권 원본 추가",
      "법정대리인(부 또는 모)의 유효한 여권 원본",
      "미성년자의 기본증명서 + 가족관계증명서 — 3개월 이내 발급",
      "  ▸ 상세증명서, 주민등록번호 전부공개 버전",
    ],
    costs: [{ label: "1부당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 미성년자 본인과 법정대리인이 반드시 함께 직접 방문 — 둘 중 한 명만 방문 불가.",
      "⚠️ 우편 신청 불가.",
      "유효한 체류자격 증명이 없는 경우 발급 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 인감증명 위임장) →",
  },

  notarization_ingam_change: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "인감(변경)신고서"],
    title: "인감(변경)신고서 — 인감 신규 등록 또는 변경",
    docs: [
      "인감(변경)신고서 — 영사관 비치 또는 홈페이지 다운로드",
      "  ▸ 영사 앞에서 자필 작성 및 서명 필수",
      "  ▸ 보증인 성명·주민등록번호·한국 주소·인감 날인 필수 (보증인 ≠ 대리인)",
      "공증촉탁서 (소정 양식 — 자필 작성 필수)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가",
      "캐나다 체류자격 증빙서류 원본",
      "  ▸ 인감도장을 한국에서 제작하고 싶다면: 서명으로 대리 가능 (대리인이 한국에서 도장 지참)",
    ],
    costs: [
      { label: "인감(변경)신고서 1부당", value: "CAD $5.40 (현금, Debit, 신용카드)" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 신고인(본인)은 반드시 직접 방문 — 대리인 신청 불가.",
      "보증인의 인감은 서류 제출 기관에 제출하기 전에 반드시 날인되어 있어야 합니다.",
      "신고인의 주민등록번호가 있어야 합니다 (주민등록번호 말소자 불가).",
      "보증인과 대리인은 반드시 다른 사람이어야 합니다.",
      "인감도장을 한국에서 새로 만들고 싶은 경우: 서명으로 대체 가능 — 대리인이 한국에서 도장을 만들어 업무 처리 시 도장 지참.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 인감신고서) →",
  },

  notarization_ingam_protect: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "인감보호(해제)신청서"],
    title: "인감보호(해제)신청서",
    docs: [
      "인감보호(해제)신청서 — 영사관 비치 또는 홈페이지 다운로드",
      "  ▸ 영사 앞에서 자필 작성 및 서명 필수",
      "공증촉탁서 (소정 양식 — 자필 작성 필수)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가",
      "캐나다 체류자격 증빙서류 원본",
    ],
    costs: [
      { label: "1부당", value: "CAD $5.40 (현금, Debit, 신용카드)" },
    ],
    time: "방문 당일 즉시 발급",
    notices: [
      "인감보호 신청 시 한국 내에서 인감증명서 발급이 차단됩니다 — 도용 방지 목적.",
      "인감보호 해제 시 다시 인감증명서 발급이 가능해집니다.",
      "반드시 본인 직접 방문 — 대리인 신청 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 인감보호) →",
  },

  // ── 번역 공증 ──
  notarization_translation: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증"],
    question: "번역 공증한 서류를 어디에 제출할 예정인가요?",
    sub: "제출 기관에 따라 영사관 번역 공증이 인정되지 않는 경우가 있습니다. 먼저 확인하세요.",
    options: [
      { id: "notarization_translation_ircc_no", icon: "🇨🇦", title: "캐나다 이민국 (IRCC) 제출", desc: "비자·영주권·시민권 신청 관련 서류" },
      { id: "notarization_translation_namechange_no", icon: "📋", title: "ServiceOntario — 성명변경 제출", desc: "Name Change 신청 관련 출생증명서 번역" },
      { id: "notarization_translation_type", icon: "✅", title: "그 외 기관 제출 (한국 기관·학교·회사 등)", desc: "영사관 번역 공증 가능" },
      { id: "notarization_translation_license_start", icon: "🚗", title: "운전면허 관련", desc: "영문번역 인증서·영문 운전경력증명서·면허 교환 안내" },
    ],
  },

  notarization_translation_ircc_no: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "캐나다 이민국 제출 불가"],
    title: "❌ 캐나다 이민국(IRCC) 제출 — 영사관 번역 공증 불인정",
    docs: [
      "캐나다 이민국은 영사관을 통한 '제3자 번역문 인증' 방식을 인정하지 않습니다.",
      "비자·영주권·시민권 신청 시 한국어 서류(출생/혼인/가족관계/성적표 등)를 번역하여 제출하려면:",
      "  ▸ 캐나다에서 번역 자격증을 소지한 전문 번역사 번역 공증 필요",
      "  ▸ 또는 변호사를 통한 번역 공증 필요",
      "  ▸ 영사관 번역 공증으로는 제출 시 반려됩니다.",
    ],
    costs: [{ label: "해당없음", value: "영사관에서 처리 불가" }],
    time: "해당없음",
    notices: [
      "전문 번역사 또는 이민 전문 변호사에게 문의하세요.",
      "IRCC 공식 안내: ircc.canada.ca",
    ],
    booking: null,
  },

  notarization_translation_namechange_no: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "ServiceOntario 성명변경 불가"],
    title: "❌ ServiceOntario 성명변경 — 영사관 번역 공증 불인정",
    docs: [
      "ServiceOntario에 성명변경(Name Change) 신청 시 제출하는 출생증명서(Birth Certificate) 번역의 경우에도 영사관 '제3자 번역문 인증' 방식은 인정되지 않습니다.",
      "성명변경 관련 번역 서류는 ServiceOntario에 직접 문의하여 인정되는 번역 방식을 확인하세요.",
    ],
    costs: [{ label: "해당없음", value: "영사관에서 처리 불가" }],
    time: "해당없음",
    notices: [
      "ServiceOntario 문의: ontario.ca/page/change-your-name",
      "이민국·성명변경 외 기관 제출은 해당 기관에서 정하므로 제출 기관에 먼저 확인하세요.",
    ],
    booking: null,
  },

  notarization_translation_type: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "서류 유형 선택"],
    question: "어떤 서류의 번역 공증이 필요하신가요?",
    sub: "서류 종류에 따라 필요한 양식과 구비서류가 다릅니다.",
    options: [
      { id: "notarization_translation_family", icon: "📄", title: "가족관계·기본·혼인관계증명서 등 전체 번역", desc: "본인이 직접 번역한 영문 번역본 지참 필수" },
      { id: "notarization_translation_cert", icon: "📋", title: "출생·혼인·이혼·사망 증명서 (영사관 양식)", desc: "영사관 제공 양식에 작성 — 별도 번역본 불필요" },
    ],
  },

  notarization_translation_family: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "전체 번역문 인증"],
    title: "번역문 인증 — 가족관계·기본·혼인관계증명서 등",
    docs: [
      "한국 원본 서류 (국문) — 원본",
      "  ▸ 가족관계증명서, 기본증명서, 혼인관계증명서, 제적등본 등",
      "전체 영문 번역본 — 본인이 직접 작성",
      "  ▸ 영사관 홈페이지 샘플 양식 참고하여 사전 작성",
      "  ▸ 원본 내용을 빠짐없이 번역 — 누락·추가 시 공증 불가",
      "여권 원본",
      "수수료 납부",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급 (10부 이상 시 익일 수령)",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 방문 접수.",
      "전문 번역사 불필요 — 본인이 직접 번역 가능.",
      "번역 내용의 책임은 번역인 본인에게 있으며 영사관은 번역 내용의 정확성을 검토하지 않습니다.",
      "⚠️ 캐나다 이민국(IRCC) 제출 서류는 영사관 번역 공증이 인정되지 않습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 번역 공증) →",
  },

  notarization_translation_cert: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "출생·혼인·이혼·사망 증명서"],
    question: "어떤 증명서가 필요하신가요?",
    sub: "영사관 비치 양식을 사용합니다. 캐나다 연금(CPP/OAS) 신청용 혼인증명이 필요하신 경우 별도 안내를 확인하세요.",
    options: [
      { id: "notarization_translation_birth", icon: "👶", title: "출생증명서 (Birth Certificate)", desc: "가족관계증명서 + 기본증명서 지참" },
      { id: "notarization_translation_marriage", icon: "💍", title: "혼인증명서 (Marriage Certificate)", desc: "혼인관계증명서 (3개월 이내) 지참" },
      { id: "notarization_translation_divorce", icon: "📝", title: "이혼증명서 (Divorce Certificate)", desc: "혼인관계증명서 (3개월 이내) 지참" },
      { id: "notarization_translation_death", icon: "🕊️", title: "사망증명서 (Death Certificate)", desc: "당사자 기본증명서 지참" },
      { id: "notarization_translation_pension", icon: "🏦", title: "캐나다 연금(CPP/OAS) 신청용 혼인증명", desc: "혼인관계증명서 발급(2주) + 번역 공증 2단계 절차" },
    ],
  },

  notarization_translation_birth: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "출생증명서"],
    title: "출생증명서 (Birth Certificate) 번역 공증",
    docs: [
      "영사관 비치 양식 (출생증명서 영문 양식) — 영사관 방문 시 작성",
      "가족관계증명서 (국문) 원본",
      "기본증명서 (국문) 원본",
      "여권 원본",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 방문 접수.",
      "⚠️ 캐나다 이민국(IRCC) 제출 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 번역 공증) →",
  },

  notarization_translation_marriage: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "혼인증명서"],
    title: "혼인증명서 (Marriage Certificate) 번역 공증",
    docs: [
      "영사관 비치 양식 (혼인증명서 영문 양식) — 영사관 방문 시 작성",
      "혼인관계증명서 (국문) 원본 — 3개월 이내 발급본",
      "여권 원본",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 방문 접수.",
      "⚠️ 캐나다 이민국(IRCC) 제출 불가.",
      "캐나다 연금(CPP/OAS) 신청용이라면 2단계 절차가 필요합니다 — '캐나다 연금 신청용 혼인증명' 메뉴를 이용하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 번역 공증) →",
  },

  notarization_translation_divorce: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "이혼증명서"],
    title: "이혼증명서 (Divorce Certificate) 번역 공증",
    docs: [
      "영사관 비치 양식 (이혼증명서 영문 양식) — 영사관 방문 시 작성",
      "혼인관계증명서 (국문) 원본 — 3개월 이내 발급본",
      "여권 원본",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 방문 접수.",
      "⚠️ 캐나다 이민국(IRCC) 제출 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 번역 공증) →",
  },

  notarization_translation_death: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "사망증명서"],
    title: "사망증명서 (Death Certificate) 번역 공증",
    docs: [
      "영사관 비치 양식 (사망증명서 영문 양식) — 영사관 방문 시 작성",
      "당사자 기본증명서 (국문) 원본",
      "여권 원본",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 우편 접수 불가 — 반드시 방문 접수.",
      "⚠️ 캐나다 이민국(IRCC) 제출 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 번역 공증) →",
  },

  notarization_translation_pension: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "캐나다 연금 신청용 혼인증명"],
    title: "캐나다 연금(CPP/OAS) 신청용 혼인증명 — 2단계 절차",
    docs: [
      "📌 혼인관계증명서는 한글로만 발급되므로 아래 2단계 절차가 필요합니다.",
      "① 1차 방문 예약 — 가족관계증명서 발급 (예약 업무: 가족관계증명서 발급)",
      "  ▸ 예약: torbooking.com",
      "  ▸ 혼인관계증명서 신청 서류 안내는 가족관계 메뉴 참조",
      "  ▸ 처리기간: 약 2주",
      "② 2차 방문 예약 — 번역 공증 (예약 업무: 공증)",
      "  ▸ 1차 방문일로부터 2주 후 날짜로 예약",
      "  ▸ 예약: torbooking.com",
      "  ▸ 구비서류: 발급된 혼인관계증명서 원본 + 여권 원본",
      "  ▸ 처리기간: 즉시",
    ],
    costs: [
      { label: "가족관계증명서 발급", value: "별도 (가족관계 메뉴 참조)" },
      { label: "번역 공증 1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" },
    ],
    time: "총 약 2주 이상 소요 (1차 방문 후 혼인관계증명서 발급 2주 + 2차 방문)",
    notices: [
      "⚠️ 두 번 방문이 필요합니다 — 1차(가족관계증명서 신청), 2차(번역 공증).",
      "⚠️ 2차 예약은 1차 방문일로부터 2주 후 날짜로 잡으세요.",
      "연금 신청 일정이 촉박한 경우 미리 여유 있게 준비하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "1차 예약하기 (가족관계증명서 발급) →",
  },

  notarization_translation_license_start: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허 관련"],
    question: "어떤 운전면허 업무가 필요하신가요?",
    sub: "온타리오주-한국 간 면허 상호교환 약정이 있습니다. 필요한 업무를 선택하세요.",
    options: [
      { id: "notarization_translation_license", icon: "📄", title: "운전면허 영문번역 인증서", desc: "한국 면허증을 캐나다 면허로 교환 시 필요 — 영사관 방문" },
      { id: "notarization_translation_driving_record", icon: "📋", title: "영문 운전경력증명서", desc: "공동인증서 있으면 온라인 발급 가능" },
      { id: "notarization_translation_license_exchange", icon: "🔄", title: "면허 교환 절차 안내", desc: "한국 ↔ 온타리오주 면허 교환 — ServiceOntario 안내" },
    ],
  },

  notarization_translation_license: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허", "영문번역 인증서"],
    title: "운전면허 영문번역 인증서",
    docs: [
      "신청서 1부 (영사관 홈페이지 양식 다운로드 또는 영사관 비치)",
      "유효한 한국 운전면허증 원본",
      "한국 운전면허증 복사본 (앞면·뒷면 각 1부)",
      "여권 원본 + 복사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "본인이 직접 영사관 방문 필수 — 예약: torbooking.com (공증 → 운전면허증 번역 공증 및 영문운전경력증명서 발급)",
      "면허 교환 절차·수수료 등 자세한 사항은 ServiceOntario 문의: ontario.ca/page/exchange-out-province-drivers-licence",
      "영사관 방문 전 ServiceOntario에서 추가 서류 요청 여부를 먼저 확인하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 운전면허 번역) →",
    onlineLink: "https://www.ontario.ca/page/exchange-out-province-drivers-licence",
  },

  notarization_translation_driving_record: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허", "영문 운전경력증명서"],
    question: "공동인증서(공인인증서)가 있으신가요?",
    sub: "공동인증서 보유 여부에 따라 발급 방법이 달라집니다.",
    options: [
      { id: "notarization_translation_driving_online", icon: "💻", title: "있음 — 온라인 직접 발급", desc: "정부24 또는 경찰청 교통민원24에서 직접 발급" },
      { id: "notarization_translation_driving_visit", icon: "🏛️", title: "없음 — 영사관 방문 신청", desc: "여권 + 체류비자(또는 영주권카드) 지참" },
    ],
  },

  notarization_translation_driving_online: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허", "영문 운전경력증명서 (온라인)"],
    title: "영문 운전경력증명서 — 온라인 직접 발급",
    docs: [
      "공동인증서(공인인증서) 로그인 후 아래 사이트에서 직접 발급:",
      "  ▸ 정부24: gov.kr",
      "  ▸ 경찰청 교통민원24: efine.go.kr",
    ],
    costs: [{ label: "수수료", value: "해당 사이트 안내 참조" }],
    time: "즉시 발급",
    notices: [
      "영사관 방문 불필요 — 온라인으로 직접 발급 가능합니다.",
    ],
    booking: null,
    onlineLink: "https://www.gov.kr",
  },

  notarization_translation_driving_visit: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허", "영문 운전경력증명서 (방문)"],
    title: "영문 운전경력증명서 — 영사관 방문 신청",
    docs: [
      "여권 원본",
      "캐나다 체류비자 원본 또는 영주권카드(PR Card)",
    ],
    costs: [{ label: "수수료", value: "영사관 안내 참조" }],
    time: "방문 당일 처리",
    notices: [
      "방문 예약 필수: torbooking.com (공증 → 운전면허증 번역 공증 및 영문운전경력증명서 발급)",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 →",
  },

  notarization_translation_license_exchange: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허", "면허 교환 안내"],
    title: "한국 ↔ 온타리오주 운전면허 교환 안내",
    docs: [
      "📌 한국·온타리오주 간 운전면허 상호교환 약정 (1998.12.17 시행):",
      "  ▸ 한국 면허 → 온타리오 G면허: 면허 소지기간 2년 이상",
      "  ▸ 한국 면허 → 온타리오 G2면허: 면허 소지기간 2년 미만",
      "  ▸ 온타리오 A·B·C·D·E·F·G2·G면허 → 한국 2종 보통면허 교환 가능",
      "교환 절차·수수료·구비서류는 ServiceOntario에서 안내:",
      "  ▸ ontario.ca/page/exchange-out-province-drivers-licence",
    ],
    costs: [{ label: "해당없음", value: "ServiceOntario에서 처리" }],
    time: "ServiceOntario 문의",
    notices: [
      "면허 교환은 영사관 업무가 아닙니다 — ServiceOntario로 문의하세요.",
      "교환 시 운전면허 영문번역 인증서 또는 영문 운전경력증명서가 필요할 수 있습니다 — ServiceOntario에 먼저 확인하세요.",
      "개인별로 추가 서류가 요청될 수 있습니다.",
    ],
    booking: null,
    onlineLink: "https://www.ontario.ca/page/exchange-out-province-drivers-licence",
  },

  // ── 원본대조필 확인 ──
  notarization_school: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "학적서류 공증"],
    question: "어떻게 신청하시겠어요?",
    sub: "⚠️ 온타리오주·마니토바주 정규 교육기관 발행 서류만 공증 가능합니다. 공증 가능 서류 여부를 먼저 확인하세요.",
    options: [
      { id: "notarization_school_visit", icon: "🏛️", title: "직접 방문", desc: "대리인 접수도 가능" },
      { id: "notarization_school_mail", icon: "📮", title: "우편 접수", desc: "원거리 거주자에 한함 — Money Order 필수" },
    ],
  },

  notarization_school_visit: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "학적서류 공증", "방문 접수"],
    title: "초·중·고 학적서류 공증 — 방문 접수",
    docs: [
      "학적 서류 원본:",
      "  ▸ 졸업증명서 / 재학증명서 / 성적증명서",
      "  ▸ 사본 공증 시: 학교 확인 도장·압인 또는 학교장 서명 있는 경우만 가능",
      "  ▸ 인터넷 발급 서류: 학교 서명 또는 도장 받은 경우에만 원본으로 인정",
      "해당 학생의 여권 사본 + 비자 사본 각 1부",
      "대리인 접수 시: 대리인 신분증 원본",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 온타리오주·마니토바주 교육청에 정규 교육기관으로 등록된 학교 발행 서류만 가능.",
      "공증 가능 서류인지 방문 전 반드시 확인하세요 — 불가 서류 지참 시 처리 불가.",
      "대리인 접수 가능 — 학생 본인이 방문하지 않아도 됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 학적서류) →",
  },

  notarization_school_mail: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "학적서류 공증", "우편 접수"],
    title: "초·중·고 학적서류 공증 — 우편 접수",
    docs: [
      "공증촉탁서 — 신청자당 1부, 자필 작성·서명",
      "  ▸ 대리인 신청 시: 대리인이 촉탁서 작성·서명 후 대리인 신분증 사본 동봉",
      "학적 서류 원본 + 복사본",
      "  ▸ 원본·복사본 동봉 시 희망 공증 건수 및 내용 메모 필수",
      "해당 학생의 여권 사본 + 비자 사본 각 1부",
      "대리인 신청 시: 대리인 신분증 사본 1부",
      "수수료 — Money Order (payable to 'Korean Consulate')",
      "  ▸ 개인수표 불가 / 한국에서 신청 시 KEB 하나은행 송금 수표만 가능",
      "반송용 봉투 (필수):",
      "  ▸ 캐나다 내: Canada Post Xpresspost 봉투 (수취인 정보 기재)",
      "  ▸ 한국으로: Prepaid DHL 반송봉투 + 국제우편 배송 송장 동봉",
      "발송 주소: 공증과 (Notarization Dept.) Consulate General of the Republic of Korea in Toronto, 555 Avenue Road, Toronto, ON M4V 2J7",
    ],
    costs: [{ label: "1건당", value: "CAD $5.40 — Money Order만 가능" }],
    time: "우편 배송 기간 제외 최소 3일 이상 (서류 미비 시 연장)",
    notices: [
      "⚠️ 온타리오주·마니토바주 정규 교육기관 발행 서류만 공증 가능.",
      "⚠️ 우편 접수는 원거리 거주자에 한합니다.",
      "⚠️ 우편 분실·사고에 대해 영사관은 책임지지 않습니다.",
      "수수료는 Money Order 원칙 — 현금 동봉 시 반드시 Xpresspost 이용, 개인수표 불가.",
      "반송봉투 미동봉 시 처리된 서류를 받을 수 없습니다 — 반드시 동봉.",
      "Xpresspost Tracking Number를 따로 보관하고 canadapost.ca에서 배송 상태 확인 가능.",
    ],
    booking: null,
  },

  // ══ MILITARY SERVICE (병무) — 재설계된 트리 ══
  military_start: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병역"],
    question: "어떤 병역 업무가 필요하신가요?",
    sub: "병역의무는 대한민국 국적 남성에게 해당됩니다.",
    options: [
      { id: "military_permit_start", icon: "✈️", title: "국외여행허가 신청·연장", desc: "캐나다 체류 중 병역 연기 허가 신청" },
      { id: "military_cert_start", icon: "📄", title: "병적증명서 발급", desc: "비자·취업·국적이탈 등에 필요한 병역사항 증명서" },
    ],
  },

  // ── 국외여행허가 — 유형 선택 ──
  military_permit_start: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병역", "국외여행허가"],
    question: "본인의 상황은?",
    sub: "상황에 따라 허가 기간·구비서류·신청 경로가 완전히 달라집니다. 정확한 유형을 선택하세요.",
    options: [
      { id: "military_permit_pr", icon: "🟢", title: "영주권자 (본인 또는 부모)", desc: "PR카드 보유 — 37세까지 또는 3년 범위" },
      { id: "military_permit_dual", icon: "🇨🇦", title: "복수국적자 (캐나다 시민권 보유)", desc: "부모와 거주 or 10년 이상 국외 거주 — 37세까지" },
      { id: "military_permit_family5", icon: "👨‍👩‍👦", title: "부모와 5년 이상 국외 거주 (기타)", desc: "영주권·시민권 없이 부모와 장기 거주" },
      { id: "military_permit_2ndgen", icon: "👶", title: "재외국민 2세", desc: "외국 출생 or 어릴 때 이민 + 17세까지 국외 거주" },
      { id: "military_permit_short", icon: "✈️", title: "단기 여행 허가", desc: "일시 출국·단기 체재 — 27세 이내, 병무청 온라인 신청 원칙" },
    ],
  },

  // ── 영주권자 ──
  military_permit_pr: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "국외여행허가", "영주권자"],
    title: "국외여행허가 — 영주권자",
    docs: [
      "국외여행허가 신청서 (볼펜·잉크펜 작성 필수)",
      "  ▸ 국내주소(주민등록주소)·국내 가족·전화번호·이메일 정확히 기재",
      "가족 거주사실 확인서 (소정 양식)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "PR카드 원본 + 사본 1부",
      "  ▸ 랜딩 후 아직 PR카드 미수령 시: 발급 후 신청 (또는 관할 병무청 문의)",
      "대한민국 → 캐나다 경유 입국한 경우: 모든 일정 포함된 항공권 또는 캐나다 출입국 증명",
      "  ▸ 직항 입국 시 제출 불필요",
      "본인이 직접 방문 신청",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주 (처리 결과: 병무청 홈페이지 www.mma.go.kr → 실시간 국외여행허가 조회)",
    notices: [
      "⚠️ 허가 기간 만료 최소 3개월 전에 신청하세요.",
      "⚠️ 2026.5.3부터: 허가기간 만료 후 15일 이내 미귀국 시 고발 (기존 30일에서 단축).",
      "허가 기간 기준:",
      "  ▸ 영주권 취득 후 3년 이상 계속 거주 → 37세까지",
      "  ▸ 영주권 취득 후 거주기간 3년 미만 → 3년 범위에서 1회",
      "  ▸ 조건부·임시 영주권자 → 영주권 유효기간 초과 6개월 범위 내",
      "25세 이전 영주권 취득 + 계속 거주 중인 경우 별도 신청 없이 37세까지 허가로 간주될 수 있습니다 (병역법 시행령 제149조) — 병무청에 확인하세요.",
      "허가 취소 주의: 귀국 후 3개월 이상 계속 국내 체재 시 허가 취소 및 병역의무 부과.",
      "국내 영리활동 주의: 1년 중 60일 이상 취업·사업·공연 수입 활동 시 허가 취소.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 국외여행허가) →",
    onlineLink: "https://www.mma.go.kr",
  },

  // ── 복수국적자 ──
  military_permit_dual: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "국외여행허가", "복수국적자"],
    title: "국외여행허가 — 복수국적자",
    docs: [
      "국외여행허가 신청서 (볼펜·잉크펜 작성 필수)",
      "  ▸ 국내주소·국내 가족·전화번호·이메일 정확히 기재",
      "가족 거주사실 확인서 (부모의 직업·거주기간 상세 기재)",
      "개인정보제공동의서 — 부·모·본인 각각 서명",
      "본인 출생증명서 (Birth Certificate Longform)",
      "본인의 기본증명서 + 가족관계증명서 각 1부",
      "  ▸ 공동인증서 있으면 민원24에서 온라인 발급 가능",
      "  ▸ 한국 직계가족 거주 시: 주민센터·구청 발급 원본 (스캔·사진 불가)",
      "  ▸ 본인 또는 직계가족이 영사관 방문 신청 가능 (주민번호·등록기준지 필수)",
      "본인 및 부모의 여권 원본 + 사본 각 1부",
      "본인 및 부모의 체류비자 원본 + 사본 각 1부 (시민권증서·PR카드 등)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "허가 기간 (37세까지) 해당 유형:",
      "  ▸ 영주권·시민권을 가진 부모와 함께 국외 거주",
      "  ▸ 부모와 함께 24세 이전부터 국외 거주",
      "  ▸ 국외에서 10년 이상 계속 거주",
      "⚠️ 신청 시기: 만 24세가 되는 해 1월 1일 ~ 만 25세 되는 해 1월 15일까지",
      "  ▸ 2001년생: 2025.1.1 ~ 2026.1.15 / 2002년생: 2026.1.1 ~ 2027.1.15",
      "⚠️ 2026.5.3부터: 허가기간 만료 후 15일 이내 미귀국 시 고발.",
      "허가 취소 주의: 1년 중 6개월 이상 국내 체재 또는 영리활동 시 허가 취소 및 병역의무 부과.",
      "부 또는 모가 영주귀국 신고를 하거나 1년 중 6개월 이상 국내 체재 시 허가 취소.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 국외여행허가) →",
    onlineLink: "https://www.mma.go.kr",
  },

  // ── 부모와 5년 이상 국외 거주 ──
  military_permit_family5: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "국외여행허가", "부모와 5년 이상 거주"],
    title: "국외여행허가 — 부모와 5년 이상 국외 거주",
    docs: [
      "국외여행허가 신청서 (볼펜·잉크펜 작성 필수)",
      "  ▸ 주민등록주소·국내 가족·전화번호·이메일 정확히 기재",
      "가족 거주사실 확인서 (부모의 직업·거주기간 상세 기재, 거주기간 예: 1991.1.15~현재까지)",
      "개인정보제공동의서 — 부·모·본인 각각 서명",
      "본인 및 부모의 여권 원본 + 사본 각 1부",
      "본인 및 부모의 유효한 캐나다 비자 원본 + 사본 각 1부",
      "기본증명서 + 가족관계증명서 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 1~2개월",
    notices: [
      "허가 기간: 37세까지 (부모와 함께 5년 이상 계속 국외 거주 시)",
      "⚠️ 부 또는 모가 국외파견 공무원·주재원인 경우 이 유형 허가 대상에서 제외됩니다.",
      "⚠️ 신청 시기: 만 24세가 되는 해 1월 1일 ~ 만 25세 되는 해 1월 15일까지",
      "  ▸ 2001년생: 2025.1.1 ~ 2026.1.15 / 2002년생: 2026.1.1 ~ 2027.1.15",
      "⚠️ 2026.5.3부터: 허가기간 만료 후 15일 이내 미귀국 시 고발.",
      "허가 결과 확인: 신청 2주 후 병무청 홈페이지(www.mma.go.kr) 실시간 국외여행허가 조회.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 국외여행허가) →",
    onlineLink: "https://www.mma.go.kr",
  },

  // ── 재외국민 2세 ──
  military_permit_2ndgen: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "국외여행허가", "재외국민 2세"],
    title: "재외국민 2세 확인 신청",
    docs: [
      "재외국민 2세 확인신청서 (소정 양식)",
      "  ▸ 17세 이전 국내 초·중·고 재학 시 학교명·수학기간 기재",
      "가족 거주사실 확인서 (소정 양식)",
      "개인정보제공동의서 — 신청자·부·모 모두 서명",
      "본인 체류자격 증명서 원본 + 사본 (영주권자: PR카드 / 시민권자: 캐나다 여권)",
      "본인 출생증명서 (Birth Certificate) 원본 + 사본",
      "본인의 여권 (한국·캐나다 모두 보유 시 전부) 원본 + 사본",
      "부모의 여권 (한국·캐나다 모두 보유 시 전부) 원본 + 사본",
      "부모의 체류자격 증명서 원본 + 사본 (PR카드 또는 캐나다 시민권증서)",
      "본인의 기본증명서(상세, 주민번호 전부공개) + 가족관계증명서(상세, 주민번호 전부공개)",
      "17세 이전 부모 이혼 시: 부모 혼인관계증명서 추가 (한국 미신고 시 캐나다 이혼판결문 원본 + 한글번역문)",
      "부 또는 모 사망 시: 사망증명서 (가족관계등록부에 사망 기재 시 불필요)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 4주",
    notices: [
      "만 18세 이상부터 신청 가능 (병역의무 발생 시점).",
      "재외국민 2세 해당 요건:",
      "  ▸ 국외 출생(6세 이전 출국 포함) + 17세까지 계속 국외 거주",
      "  ▸ 부모 및 본인이 외국 국적·시민권 또는 영주권 보유",
      "  ▸ 17세 이전 1년 중 국내 체재 90일 이내여야 '계속 거주'로 인정",
      "⚠️ 중요: 구비서류 제출 후에도 병무청 심사 결과 불허될 수 있습니다 — 신청 전 병무청(1588-9090) 문의 강력 권장.",
      "확인 후: 병역의무자 여권에 '출국확인제외대상(재외국민2세)' 인장 날인.",
      "허가 취소 조건: 기준일 이후 국내 체재 기간이 통틀어 3년 초과 또는 부·모 영주귀국 신고 시.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 재외국민2세) →",
    onlineLink: "https://www.mma.go.kr",
  },

  // ── 단기 여행 허가 ──
  military_permit_short: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "국외여행허가", "단기 여행 허가"],
    title: "단기 여행 허가",
    docs: [
      "⚠️ 단기 여행 허가는 병무청 홈페이지 온라인 신청이 원칙입니다.",
      "온라인 신청: 병무청 홈페이지(www.mma.go.kr) → 병무민원 → 국외여행/체재 → 국외여행허가 신청",
      "영사관 방문 신청 시 구비서류:",
      "국외여행(기간연장)허가 신청서 (소정 양식)",
      "허가의무 위반 시 제재사항 확인서",
      "여권 원본 + 신원정보면 복사본 1부",
      "캐나다 체류사증(비자) 원본 + 복사본 1부",
      "  ▸ 원본은 확인 후 즉시 반환",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "병무청 심사 후 허가서 온라인 출력 가능",
    notices: [
      "허가 대상: 징병검사대상·현역입영대상·공익근무소집대상 (만 25세 이상 미필자)",
      "허가 기간: 27세를 초과하지 않는 범위에서",
      "  ▸ 2026.5.2까지: 1회 6개월 이내 (연장 횟수 제한 없음)",
      "  ▸ 2026.5.3부터: 1회 1개월 이내, 출국 후 2회까지만 연장 가능 (통틀어 2년 이내)",
      "⚠️ 2026.5.3부터: 허가기간 만료 후 15일 이내 미귀국 시 고발 (기존 30일).",
      "입영일 결정 시: 입영일 5일 전까지만 허가.",
      "허가의무 위반 제재: 3년 이하 징역·여권발급 제한·40세까지 취업·관허업 제한·병무청 홈페이지 신상공개.",
      "신청 시기: 국내 체재자는 출국 예정일 2일 전까지 / 기간연장은 만료일 15일 전까지.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 단기 여행 허가) →",
    onlineLink: "https://www.mma.go.kr/contents.do?mc=usr0000186",
  },

  // ── 병적증명서 ──
  military_cert_start: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병역", "병적증명서 발급"],
    question: "신청자는 누구인가요?",
    sub: "공동인증서가 있으면 정부24에서 온라인으로 직접 발급 가능합니다 — 영사관 방문 불필요.",
    options: [
      { id: "military_cert_online", icon: "💻", title: "온라인 발급 (공동인증서)", desc: "정부24에서 즉시 발급 — 영사관 방문 불필요" },
      { id: "military_cert_self", icon: "👤", title: "본인이 영사관 방문 신청", desc: "약 10일 소요" },
      { id: "military_cert_family", icon: "👨‍👩‍👧", title: "가족이 대리 신청", desc: "직계존·비속, 형제자매, 배우자 — 약 10일" },
      { id: "military_cert_proxy", icon: "📋", title: "대리인이 신청", desc: "위임장 필요 — 약 10일" },
    ],
  },

  military_cert_online: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "병적증명서 발급", "온라인"],
    title: "병적증명서 온라인 발급",
    docs: [
      "공동인증서로 정부24 접속 후 발급:",
      "  ▸ 정부24(www.gov.kr) → '병적증명서' 검색 → 발급 신청",
      "  ▸ 영문 병적증명서도 정부24에서 발급 가능",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "공동인증서가 없는 경우 영사관 방문 신청 또는 인증서 메뉴에서 공동인증서 발급 후 이용.",
      "병역증·전역증은 발급 불가 — 병적증명서만 발급 가능.",
      "영문 병적증명서 신청 시 영문 성명이 표기된 여권 등 신분증 필요.",
    ],
    booking: null,
    onlineLink: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=&CappBizCD=13000000016",
  },

  military_cert_self: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "병적증명서 발급", "본인 방문"],
    title: "병적증명서 발급 — 본인 영사관 방문",
    docs: [
      "신청서 + 개인정보 수집·이용 동의서 (영사관 비치)",
      "주민등록증·여권 등 신분증",
      "  ▸ 영문 병적증명서 신청 시: 영문 성명이 표기된 여권 등 신분증 제출",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 10일",
    notices: [
      "병역증·전역증은 발급 불가 — 병적증명서만 가능.",
      "공동인증서가 있으면 정부24에서 즉시 온라인 발급 가능합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 병적증명서) →",
  },

  military_cert_family: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "병적증명서 발급", "가족 대리 신청"],
    title: "병적증명서 발급 — 가족 대리 신청",
    docs: [
      "신청서 + 개인정보 수집·이용 동의서 (영사관 비치)",
      "대리인(가족)의 신분증",
      "신청 대상자의 신분증 사본",
      "본인과의 관계를 증명할 수 있는 서류",
      "  ▸ 가족관계증명서 또는 제적등본 등",
      "  ▸ 관계 확인 불가 시: 위임장(별지 제3호서식) + 위임자 신분증 + 대리인 신분증",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 10일",
    notices: [
      "신청 가능 가족: 직계존·비속(부모·자녀·조부모·손자), 형제자매, 배우자.",
      "병역증·전역증은 발급 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 병적증명서) →",
  },

  military_cert_proxy: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "병적증명서 발급", "대리인 신청"],
    title: "병적증명서 발급 — 대리인 신청",
    docs: [
      "신청서 + 개인정보 수집·이용 동의서 (영사관 비치)",
      "신청 대상자(위임자) 신분증(주민등록증 또는 여권) 사본",
      "대리인 신분증 원본 + 사본",
      "위임장 (별지 제3호서식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 10일",
    notices: [
      "병역증·전역증은 발급 불가.",
      "공동인증서가 있으면 정부24에서 즉시 온라인 발급 가능합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 병적증명서) →",
  },

  // ══ ENGLISH NODES: Military Service ══
  military_start_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service"],
    question: "What do you need help with?",
    sub: "Korean military service obligations apply to male Korean nationals. Select what applies to you.",
    options: [
      { id: "military_cert_start_en", icon: "📄", title: "Military Record Certificate (병적증명서)", desc: "Needed for visa applications, employment, nationality renunciation, etc." },
      { id: "military_need_check_en", icon: "❓", title: "I'm not sure if I need an Overseas Travel Permit", desc: "Check whether a permit applies to your situation first" },
      { id: "military_permit_who_en", icon: "✈️", title: "I need to apply for / extend an Overseas Travel Permit", desc: "I already know I need a permit" },
      { id: "military_cancel_return_en", icon: "🏠", title: "I'm returning to Korea or need to cancel my permit", desc: "Early return, permit cancellation, end of obligation" },
    ],
  },

  military_cert_start_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Military Record Certificate"],
    question: "Who is making the request?",
    sub: "The certificate can be requested by the person themselves, or by an immediate family member acting as proxy.",
    options: [
      { id: "military_cert_self_en", icon: "👤", title: "I am applying for myself", desc: "In person at the Consulate, or online with a Gong-dong Certificate" },
      { id: "military_cert_proxy_en", icon: "👨‍👩‍👧", title: "A family member is applying on my behalf", desc: "Spouse, parent, child, sibling — proxy application" },
    ],
  },

  military_cert_self_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Military Record Certificate", "Self"],
    title: "Military Record Certificate (병적증명서) — Self Application",
    docs: [
      "Your valid Korean passport — original",
      "Valid Canadian immigration status document — original (PR Card / visa / citizenship certificate)",
      "  ▸ Online option: if you have a Gong-dong Certificate, issue instantly and free at gov.kr",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same-day (in person) / Instant (online)",
    notices: [
      "⚠️ Currently serving in active duty: cannot obtain a standard military record certificate — only an 'Induction Confirmation Certificate' is available.",
      "Online issuance available at gov.kr with a Gong-dong Certificate — no Consulate visit needed.",
      "Eligible applicants: those in service reserve, supplemental reserve, active duty completed, wartime labor service, exempted, discharged, or retired.",
      "The certificate is issued in Korean only. For submission to a foreign institution, a translation notarization (공증) is required separately.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  military_cert_proxy_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Military Record Certificate", "Proxy"],
    title: "Military Record Certificate (병적증명서) — Family Proxy Application",
    docs: [
      "Proxy (family member)'s ID — original",
      "Family Relationship Certificate proving relationship to the service member",
      "Signed proxy authorization (위임장) from the service member — handwritten signature",
      "Service member's passport copy or ID copy",
      "  ▸ Note: if the service member has a Gong-dong Certificate, they can issue it themselves online at gov.kr",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same-day",
    notices: [
      "Eligible proxies: spouse, direct lineal relatives (parents, children, grandparents, grandchildren), siblings.",
      "⚠️ Currently serving in active duty: cannot obtain a standard certificate.",
      "Korean-language certificate only — translation notarization required for foreign submission.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  military_need_check_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Do I Need a Permit?"],
    question: "What is your current age and military status?",
    sub: "Whether you need a permit depends on your age and current military status.",
    options: [
      { id: "military_age_under24_en", icon: "🟢", title: "Age 24 or under", desc: "Generally no permit needed — exceptions apply for supplemental service" },
      { id: "military_age_over25_general_en", icon: "🟡", title: "Age 25 or over — not yet completed military service", desc: "General service-pending status (waiting for physical exam or induction)" },
      { id: "military_age_supplemental_en", icon: "🟠", title: "Currently in supplemental service (any age)", desc: "Social service worker, research personnel, industrial technical personnel, etc." },
      { id: "military_age_done_en", icon: "✅", title: "Already completed or exempt from military service", desc: "Discharged, exempted, or transferred to second-class service" },
    ],
  },

  military_age_under24_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Do I Need a Permit?", "Age 24 or Under"],
    title: "Age 24 or Under — Generally No Permit Required",
    docs: [],
    costs: [{ label: "Fee", value: "N/A" }],
    time: "N/A",
    notices: [
      "✅ If you are age 24 or under, you generally do NOT need an Overseas Travel Permit to stay in Canada.",
      "⚠️ Exception: if you are currently serving in supplemental service (social service worker, research personnel, etc.), you DO need a permit regardless of age.",
      "⚠️ Important: In the year you turn 24, you must apply for an Overseas Travel Permit by January 15 of the following year (the year you turn 25).",
      "Check your military status: MMAS portal (mwpt.mma.go.kr) → 'My Military Service Status'.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_age_over25_general_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Do I Need a Permit?", "Age 25+ General"],
    title: "Age 25 or Over, Service Pending — Permit Required",
    docs: [],
    costs: [{ label: "Fee", value: "Free" }],
    time: "N/A",
    notices: [
      "✅ You need an Overseas Travel Permit. Go back and select 'Apply for / Extend a Permit'.",
      "Your specific permit type depends on your status: general residence, PR/citizenship holder, or congenital dual national.",
      "Check your military status: MMAS portal (mwpt.mma.go.kr) → 'My Military Service Status'.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_age_supplemental_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Do I Need a Permit?", "Supplemental Service"],
    title: "Currently in Supplemental Service — Permit Required (Any Age)",
    docs: [],
    costs: [{ label: "Fee", value: "Free" }],
    time: "N/A",
    notices: [
      "✅ If you are currently in supplemental service, you need a permit regardless of age.",
      "This applies to: social service workers (사회복무요원), research personnel (전문연구요원), industrial technical personnel (산업기능요원), public health doctors (공중보건의사), public legal service officers (공익법무관), and others.",
      "⚠️ Social service workers applying for an overseas work permit MUST apply through the Consulate — online applications are NOT accepted for this category.",
      "Go back and select 'Apply for / Extend a Permit' → 'Currently in Supplemental Service'.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_age_done_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Do I Need a Permit?", "Completed / Exempt"],
    title: "Service Completed or Exempted — No Permit Required",
    docs: [],
    costs: [{ label: "Fee", value: "N/A" }],
    time: "N/A",
    notices: [
      "✅ If you have completed active duty, social service, or received an exemption / second-class service transfer, you do NOT need an Overseas Travel Permit.",
      "Verify your status: MMAS portal (mwpt.mma.go.kr) → 'My Military Service Status'.",
      "Age 37 or older: military obligation ends automatically on January 1 of the year you turn 37 — no action needed.",
      "If you need a Military Record Certificate, go back to the main military service menu.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_permit_who_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Apply for Permit"],
    question: "What is your current military / residency status?",
    sub: "The type of permit, required documents, and permit duration differ significantly depending on your status. Select the one that applies to you.",
    options: [
      { id: "military_travel_permit_en", icon: "🎓", title: "General service-pending — studying, working, or living in Canada", desc: "Waiting for physical exam or induction (not PR/citizenship holder, not dual national)" },
      { id: "military_supplemental_abroad_en", icon: "🏢", title: "Currently in supplemental service (any age)", desc: "Social service worker, research personnel, industrial technical personnel, etc." },
      { id: "military_immigrant_en", icon: "🟢", title: "Canadian PR card or citizenship holder", desc: "Overseas immigration reason — permit valid until age 37" },
      { id: "military_dual_en", icon: "🧬", title: "Congenital dual national (born with Korean + Canadian citizenship)", desc: "Born in Canada or parent is Korean — 'Overseas Korean 2nd Generation' permit until age 37" },
    ],
  },

  military_travel_permit_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "General Service-Pending"],
    question: "What is your primary reason for staying in Canada?",
    sub: "The supporting documents required differ by purpose of stay.",
    options: [
      { id: "military_permit_study_en", icon: "📚", title: "Study (currently enrolled in school)", desc: "Enrollment certificate or Letter of Acceptance required" },
      { id: "military_permit_work_en", icon: "💼", title: "Work (currently employed)", desc: "Employment contract or employer letter required" },
      { id: "military_permit_general_en", icon: "🏠", title: "General residence (living with parents, etc.)", desc: "Parents' immigration status documents required" },
    ],
  },

  military_permit_study_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "General", "Study"],
    title: "Overseas Travel Permit (Extension) — Study",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only, no typing)",
      "  ▸ Sign on page 1 (bottom) and page 2 (centre)",
      "  ▸ Include resident registration address, domestic family contact info, email",
      "Confirmation of Penalty for Violation of Permit Obligation (소정 양식)",
      "Your valid Korean passport — original + photocopy",
      "Canadian immigration status document — original + photocopy (PR Card / student visa, etc.)",
      "Enrollment certificate or Letter of Acceptance (school name + enrollment period clearly stated)",
      "  ▸ Basic Certificate + Family Relationship Certificate — photocopies (or write registration address accurately on form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission. Result notified by email.",
    notices: [
      "⚠️ Apply at least 15 days before permit expires — recommended 1–2 months in advance.",
      "Under age 25: no permit yet needed, but must apply by January 15 of the year you turn 25.",
      "Permit duration: valid until the age limit set per school type (e.g. medical/dental/veterinary/pharmacy graduate programs → age 28; PhD programs → age 30 years 6 months).",
      "If graduation within the age limit is unlikely: one additional year of extension is allowed.",
      "Postal submissions accepted. MMAS online portal (mwpt.mma.go.kr) also available.",
      "Proxy application: service member's handwritten proxy authorization + proxy's ID + family relationship document.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Study Permit) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_permit_work_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "General", "Work"],
    title: "Overseas Travel Permit (Extension) — Work",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "  ▸ Include resident registration address, domestic family contact info, email",
      "Confirmation of Penalty for Violation of Permit Obligation",
      "Your valid Korean passport — original + photocopy",
      "Canadian immigration status document — original + photocopy (PR Card / work permit, etc.)",
      "Employment contract or letter of employment (company name, position, employment period clearly stated)",
      "  ▸ Basic Certificate + Family Relationship Certificate — photocopies",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "⚠️ Apply at least 15 days before permit expires — recommended 1–2 months in advance.",
      "Postal submissions accepted. MMAS online portal also available.",
      "Proxy application: service member's handwritten proxy authorization + proxy's ID.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Work Permit) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_permit_general_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "General", "General Residence"],
    title: "Overseas Travel Permit (Extension) — General Residence",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "  ▸ Include resident registration address, domestic family contact info, email",
      "Confirmation of Penalty for Violation of Permit Obligation",
      "Your valid Korean passport — original + photocopy",
      "Canadian immigration status document — original + photocopy",
      "Parents' PR Card or immigration status documents (both parents)",
      "  ▸ Basic Certificate + Family Relationship Certificate — photocopies",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "⚠️ Apply at least 15 days before permit expires.",
      "General residence permits may be issued for a shorter duration than study or work permits.",
      "Postal submissions accepted. MMAS online portal also available.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → General Permit) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_supplemental_abroad_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "Supplemental Service"],
    question: "What is the purpose of your overseas activity?",
    sub: "The application route differs depending on the purpose.",
    options: [
      { id: "military_supp_business_en", icon: "✈️", title: "Overseas business trip / dispatch by employer", desc: "Official dispatch order or business trip certificate from employer" },
      { id: "military_supp_work_en", icon: "💼", title: "Overseas employment", desc: "Social service workers MUST apply through the Consulate" },
      { id: "military_supp_study_en", icon: "📚", title: "Overseas study", desc: "Enrollment certificate required" },
    ],
  },

  military_supp_business_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "Supplemental", "Business Trip"],
    title: "Supplemental Service — Overseas Business Trip / Dispatch",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "Confirmation of Penalty for Violation of Permit Obligation",
      "Your valid Korean passport — original + photocopy",
      "Dispatch order or business trip certificate from your supervising institution / designated employer",
      "Canadian immigration status document",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "An official document from your employer (dispatch order or trip certificate) is required.",
      "Apply 1–2 months before permit expiry.",
      "MMAS online portal available for most categories.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Supplemental Business) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_supp_work_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "Supplemental", "Work"],
    title: "Supplemental Service — Overseas Employment Permit",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "Confirmation of Penalty for Violation of Permit Obligation",
      "Your valid Korean passport — original + photocopy",
      "Employment verification certificate confirmed by the Consulate (영사관의 장이 확인한 취업증명서 — confirmed during your Consulate visit)",
      "Employment contract or offer letter",
      "Canadian immigration status document",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "⚠️ Social service workers (사회복무요원) and alternative service workers (대체복무요원) applying for overseas employment MUST apply through the Consulate — MMAS online application is NOT accepted for this category.",
      "The employment verification certificate is confirmed by the Consulate during your visit — bring your employment documents.",
      "Apply before permit expiry.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Supplemental Work) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_supp_study_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "Supplemental", "Study"],
    title: "Supplemental Service — Overseas Study Permit",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "Confirmation of Penalty for Violation of Permit Obligation",
      "Your valid Korean passport — original + photocopy",
      "Enrollment certificate or Letter of Acceptance",
      "Canadian immigration status document",
      "  ▸ Research personnel: may also need joint research agreement or cooperation agreement",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "Apply 1–2 months before permit expiry.",
      "Research personnel (전문연구요원) and industrial technical personnel (산업기능요원) may have specific study permit conditions — contact MMAS (1588-9090) in advance.",
      "MMAS online portal available.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Supplemental Study) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_immigrant_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "PR / Citizenship Holder"],
    title: "Overseas Immigration Permit — PR / Citizenship Holder (until age 37)",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "Family Residency Confirmation Form (소정 양식 — must include both parents' and applicant's details)",
      "Personal Information Consent Form (소정 양식 — all parties must sign)",
      "Your valid Korean passport — original + photocopy",
      "Canadian PR Card or Citizenship Certificate — original + photocopy",
      "Parents' PR Card or Citizenship Certificate — both parents",
      "Basic Certificate + Family Relationship Certificate — photocopies",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "Eligibility (one of the following must apply):",
      "  ① Living abroad with a parent who holds Canadian PR or citizenship",
      "  ② Living abroad with parents continuously since before age 24",
      "  ③ Living abroad continuously for 10+ years",
      "⚠️ Must apply between age 24 and January 15 of the year you turn 25.",
      "If PR/citizenship obtained less than 3 years ago: permit issued for up to 3 years (one-time).",
      "⚠️ Permit revoked if you or your parents reside in Korea for 6+ months/year OR engage in paid work there.",
      "Postal and MMAS online submissions accepted.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Immigration Permit) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_dual_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Permit", "Congenital Dual National"],
    title: "Congenital Dual National Permit — Overseas Korean 2nd Generation (until age 37)",
    docs: [
      "Application for Permission for Overseas Travel (Extension) — MMAS Form (pen/ink only)",
      "Family Residency Confirmation Form (소정 양식 — parents' and applicant's details)",
      "Personal Information Consent Form (소정 양식 — all parties sign)",
      "Your valid Korean passport — original + photocopy (if unavailable, Basic Certificate may substitute — confirm by phone first)",
      "Canadian passport or Citizenship Certificate — original + photocopy",
      "Parents' PR Card or Citizenship Certificate",
      "Basic Certificate + Family Relationship Certificate — photocopies",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Approx. 1–2 months after Consulate submission",
    notices: [
      "Who qualifies: males born with both Korean and Canadian citizenship (parent is/was a Korean national).",
      "⚠️ Must apply by January 15 of the year you turn 25.",
      "⚠️ Disqualification: if you stayed in Korea for 90+ days/year before age 25, you do NOT qualify as Overseas Korean 2nd Generation — contact the Consulate.",
      "⚠️ Permit revoked if you or your parents reside in Korea for 6+ months/year or engage in paid work.",
      "Exception: attending a Korean university (academic study, not paid work) is permitted.",
      "Postal and MMAS online submissions accepted.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Dual National Permit) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_cancel_return_en: {
    type: "question",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Return / Cancel"],
    question: "What is your situation?",
    sub: "The action required depends on your circumstances.",
    options: [
      { id: "military_permit_cancel_en", icon: "✈️", title: "Returning early — within my current permit period", desc: "Cancel the existing Overseas Travel Permit" },
      { id: "military_return_permanent_en", icon: "🏠", title: "Returning to Korea permanently or for a long stay", desc: "Military duty may be reactivated — consult before returning" },
      { id: "military_return_exempt_en", icon: "✅", title: "I've turned 37 or received an exemption", desc: "Verify end of military obligation" },
    ],
  },

  military_permit_cancel_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Return / Cancel", "Early Return"],
    title: "Overseas Travel Permit Cancellation — Early Return",
    docs: [
      "Application for Permission for Overseas Travel (Cancellation) — MMAS Form (pen/ink only)",
      "  ▸ State the reason for cancellation",
      "Your valid Korean passport — original + photocopy",
      "Canadian immigration status document",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Processing after Consulate submission",
    notices: [
      "If you return to Korea while your permit is still valid, you should cancel the permit.",
      "Failing to cancel may negatively affect future permit applications.",
      "MMAS online portal cancellation also available.",
      "Returning to Korea and residing / working there for 6+ months reactivates military duty.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Military → Cancel Permit) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_return_permanent_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Return / Cancel", "Permanent Return"],
    title: "Permanent Return to Korea — Military Duty May Be Reactivated",
    docs: [
      "Overseas Travel Permit cancellation form (if applicable)",
      "Your valid Korean passport — original + photocopy",
      "Canadian PR Card or Citizenship Certificate (if applicable)",
      "Basic Certificate + Family Relationship Certificate (if applicable)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Consult before returning",
    notices: [
      "⚠️ If you are on an overseas immigration permit and return permanently to Korea, or reside / work there for 6+ months in any year, military duty is automatically reactivated.",
      "Consult with the Consulate or MMAS (1588-9090) BEFORE returning to Korea to understand your obligations.",
      "Check your military status: MMAS portal (mwpt.mma.go.kr) → 'My Military Service Status'.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Consultation Appointment →",
    onlineLink: "https://www.mma.go.kr",
  },

  military_return_exempt_en: {
    type: "result",
    service: "military",
    breadcrumb: ["Home", "Military Service", "Return / Cancel", "Obligation Ended"],
    title: "Military Obligation Ended — Age 37 or Exempted",
    docs: [],
    costs: [{ label: "Fee", value: "N/A" }],
    time: "N/A",
    notices: [
      "✅ Military obligation ends automatically on January 1 of the year you turn 37 — no action required.",
      "✅ If you received an exemption, wartime labor service transfer (전시근로역 편입), or second-class service transfer (제2국민역 편입), no permit is needed.",
      "Verify your status: MMAS portal (mwpt.mma.go.kr) → 'My Military Service Status'.",
      "If you need a Military Record Certificate, go back to the main Military Service menu.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ══ OVERSEAS KOREAN REGISTRATION (재외국민 등록) ══
  registration_start: {
    type: "question",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록"],
    question: "어떤 재외국민 등록 업무가 필요하신가요?",
    sub: "재외국민 등록은 외국에 90일 이상 거주·체류하는 대한민국 국민의 법적 의무입니다 (재외국민등록법 제2조). 시민권자(한국 국적 상실자)는 해당 없습니다.",
    options: [
      { id: "registration_new", icon: "📋", title: "신규 등록", desc: "캐나다 입국 후 90일 이내 최초 등록" },
      { id: "registration_change", icon: "✏️", title: "변경·이동 신고", desc: "주소·연락처·체류신분 변경 또는 귀국·이사 시" },
      { id: "registration_copy", icon: "📄", title: "재외국민등록부 등본 발급", desc: "부동산·금융·상속 등 해외거주 증명 시" },
    ],
  },

  registration_new: {
    type: "question",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "신규 등록·변경"],
    question: "어떻게 신청하시겠어요?",
    sub: "공동인증서가 있으면 온라인으로 신청 가능합니다. 신청서 하단 '본인정보 제공요구 및 공동이용 동의서' 동의 시 기본증명서 제출 불필요.",
    options: [
      { id: "registration_new_online", icon: "💻", title: "온라인 신청", desc: "재외동포365민원포털(g4k.go.kr) — 공동인증서 필요" },
      { id: "registration_new_visit", icon: "🏛️", title: "영사관 방문 신청", desc: "예약 후 방문 — 당일 즉시 처리" },
      { id: "registration_new_mail", icon: "📮", title: "우편 신청", desc: "원본 사본에 변호사 공증 후 송부" },
    ],
  },

  registration_new_online: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "신규 등록", "온라인"],
    title: "재외국민 등록 — 온라인 신청",
    docs: [
      "재외동포365민원포털(g4k.go.kr) 접속 → 공동인증서 로그인 → 재외국민등록 신청",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "공동인증서 없는 경우 인증서 메뉴에서 먼저 발급 후 이용.",
      "⚠️ 캐나다 입국 후 90일 이내 등록 권장.",
      "시민권자(한국 국적 상실자) 등록 불가.",
    ],
    booking: null,
    onlineLink: "https://www.g4k.go.kr",
  },

  registration_new_visit: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "신규 등록", "방문 신청"],
    title: "재외국민 등록 — 방문 신청",
    docs: [
      "신규등록 신청서 (별지1호) 또는 이동·변경 신청서 (별지5호)",
      "  ▸ '체류국 최초 입국일' 기재:",
      "  ▸   영주권자: PR카드 뒷면 'PR since...' landing 날짜",
      "  ▸   비자 소지자: 해당 비자로 최초 입국한 날짜",
      "  ▸ '등록공관': 주토론토총영사관 기재 (온타리오·마니토바 거주자)",
      "  ▸ '등록기준지': 기본증명서 상단 주소 그대로 기재",
      "여권 원본 + 사본",
      "체류자격 증명서류 원본 + 사본",
      "  ▸ 영주권자: PR카드 앞뒷면 / 장기체류자: 유효한 체류비자",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "  ▸ 신청서 하단 공동이용 동의 시 기본증명서 제출 불필요 (처리시간 추가 소요)",
      "최초 입국일 확인 서류 (캐나다 입국 스탬프·출입국사실증명서·비행기 티켓 등)",
      "직계가족 대리 신청 시 추가:",
      "  ▸ 위 서류 일체 (발급대상자) + 가족관계증명서 (상세, 3개월 이내) + 대리인 여권",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 처리",
    notices: [
      "⚠️ 캐나다 입국 후 90일 이내 등록 권장 — 미등록 시 과태료 부과 가능.",
      "시민권자(한국 국적 상실자) 등록 불가.",
      "소급등록 불가 — 현재 캐나다 체류 중인 경우만 신청 가능.",
      "등록말소 사유: 귀국신고·183일 초과 미거주·183일 이상 국내 거주·국적상실·사망.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (재외국민 등록) →",
  },

  registration_new_mail: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "신규 등록", "우편 신청"],
    title: "재외국민 등록 — 우편 신청",
    docs: [
      "신규등록 신청서 (별지1호) 또는 이동·변경 신청서 (별지5호)",
      "여권 사본 — 변호사 공증 후 송부 (원본 불가)",
      "체류자격 증명서류 사본 — 변호사 공증 후 송부 (원본 불가)",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "최초 입국일 확인 서류 사본",
      "송부 주소: Korean Consulate in Toronto (재외국민등록), 555 Avenue Road, Toronto, Ontario M4V 2J7",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "우편 배송기간 포함 약 1~2주",
    notices: [
      "원본(여권·영주권카드·비자)은 송부하지 않고 반드시 변호사 공증 사본 제출.",
      "소급등록 불가 — 현재 캐나다 체류 중인 경우만 신청 가능.",
    ],
    booking: null,
  },

  registration_change: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "변경·이동 신고"],
    title: "재외국민 등록 변경·이동 신고",
    docs: [
      "이동·변경 신청서 (별지5호)",
      "유효한 한국 여권 원본",
      "변경 사항 증빙서류:",
      "  ▸ 주소 변경: 새 주소 확인 서류",
      "  ▸ 체류신분 변경: 새 PR카드 또는 비자 원본 + 사본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 처리",
    notices: [
      "온라인 변경 가능: 재외동포365민원포털(g4k.go.kr).",
      "주소·체류신분 변경 시 지체 없이 신고 권장.",
      "한국 귀국 또는 다른 나라 이동 시에도 이동 신고 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  registration_copy: {
    type: "question",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "등록부 등본 발급"],
    question: "어떻게 발급받으시겠어요?",
    sub: "공동인증서가 있으면 영사민원24에서 온라인으로 즉시 발급 가능합니다.",
    options: [
      { id: "registration_copy_online", icon: "💻", title: "온라인 발급 (영사민원24)", desc: "공동인증서 필요 — 즉시 발급" },
      { id: "registration_copy_visit", icon: "🏛️", title: "영사관 방문 발급", desc: "당일 즉시 — CAD $0.65/부" },
      { id: "registration_copy_mail", icon: "📮", title: "우편 신청", desc: "변호사 공증 사본 필요" },
    ],
  },

  registration_copy_online: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "등록부 등본", "온라인"],
    title: "재외국민등록부 등본 — 온라인 발급",
    docs: [
      "영사민원24 접속 → 재외국민등록부 등본 신청",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "재외국민등록이 완료된 경우에만 발급 가능.",
      "재외국민등록부 등본은 해외 체류기간을 직접 증명하는 서류로는 활용 불가.",
    ],
    booking: null,
    onlineLink: "https://consul.mofa.go.kr",
  },

  registration_copy_visit: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "등록부 등본", "방문 발급"],
    title: "재외국민등록부 등본 — 방문 발급",
    docs: [
      "재외국민등록부등본 교부신청서 (양식)",
      "유효한 한국 여권 원본 + 사본",
      "체류자격 증명서류 원본 + 사본",
      "  ▸ 영주권자: PR카드 앞뒷면 / 장기체류자: 체류비자",
      "  ▸ 복수국적자: 국적회복·복수국적 표시된 기본증명서 (상세, 3개월 이내) + 캐나다 여권",
      "대리인(가족) 신청 시 추가:",
      "  ▸ 위 서류 일체 (발급대상자) + 가족관계증명서 (상세, 3개월 이내) + 대리인 여권",
      "  ▸ 대리 가능 범위: 배우자·배우자의 직계혈족·직계혈족·직계혈족의 배우자",
    ],
    costs: [{ label: "1부당 수수료", value: "CAD $0.65 (현금, Debit, 신용카드)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "재외국민등록이 완료된 경우에만 발급 가능.",
      "재외국민등록부 등본은 해외 체류기간을 직접 증명하는 서류로는 활용 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (재외국민 등록부 등본) →",
  },

  registration_copy_mail: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "등록부 등본", "우편 신청"],
    title: "재외국민등록부 등본 — 우편 신청",
    docs: [
      "재외국민등록부등본 교부신청서 (양식)",
      "여권 사본 — 변호사 공증 후 송부",
      "체류자격 증명서류 사본 — 변호사 공증 후 송부",
      "수수료: Money Order 또는 Certified Cheque (현금 분실 위험)",
      "송부 주소: Korean Consulate in Toronto (재외국민등록), 555 Avenue Road, Toronto, Ontario M4V 2J7",
    ],
    costs: [{ label: "1부당 수수료", value: "CAD $0.65 (Money Order 권장)" }],
    time: "우편 배송기간 포함 약 1~2주",
    notices: [
      "원본(여권·영주권카드·비자)은 송부하지 않고 반드시 변호사 공증 사본 제출.",
      "현금 송부 시 분실 위험 — Money Order 또는 Certified Cheque 사용 권장.",
    ],
    booking: null,
  },

  // ══ OVERSEAS EMIGRATION REPORT (해외이주 신고) ══
  emigration_start: {
    type: "question",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고"],
    question: "어떤 해외이주 신고 업무가 필요하신가요?",
    sub: "⚠️ 해외이주신고 ≠ 재외국민등록\n해외이주신고: 주민등록을 재외국민으로 정리 (건강보험 정지·국민연금 반환 가능) — 영주권자만 가능\n재외국민등록: 해외 거주사실 증명 (부동산·상속·금융 등) — 별도 메뉴 이용",
    options: [
      { id: "emigration_who", icon: "🛫", title: "해외이주 신고 (신규)", desc: "영주권 취득 후 한국 주민등록 정리 — 영주권자만 가능" },
      { id: "emigration_cert", icon: "📄", title: "해외이주신고확인서 발급", desc: "이미 신고 완료한 분 — 국민연금 반환일시금 신청 등에 사용" },
    ],
  },

  emigration_who: {
    type: "question",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "신규 신고"],
    question: "신청자의 연령은?",
    sub: "만 18세 이상은 본인이 반드시 직접 방문해야 합니다. 만 18세 미만 미성년자는 부모가 대리 신청 가능합니다.",
    options: [
      { id: "emigration_adult", icon: "👤", title: "만 18세 이상 (성인)", desc: "본인 직접 방문 필수 — 대리 신청 절대 불가" },
      { id: "emigration_minor", icon: "👶", title: "만 18세 미만 (미성년자)", desc: "부모 대리 신청 가능 — 자녀 동행 불필요" },
    ],
  },

  emigration_adult: {
    type: "question",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "신규 신고", "성인"],
    question: "서류 준비 방법을 선택하세요",
    sub: "공동인증서가 있으면 서류를 직접 준비해서 당일 즉시 발급받을 수 있어요.",
    options: [
      { id: "emigration_new_direct", icon: "⚡", title: "서류 직접 준비 (공동인증서 필요) — 당일 즉시 발급", desc: "주민등록등본·납세증명서 3종 등 직접 발급해서 방문" },
      { id: "emigration_new_consent", icon: "📋", title: "행정정보공동이용 동의 — 약 10일 소요", desc: "서류 최소화, 영사관이 직접 조회 후 확인서 발급" },
    ],
  },

  emigration_new_direct: {
    type: "result",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "신규 신고", "성인", "서류 직접 준비"],
    title: "해외이주 신고 — 서류 직접 준비 (당일 즉시 발급)",
    docs: [
      "해외이주신고서 (양식) — '이주종류'란에 '현지이주' 기재",
      "여권 원본 + 사본 1부",
      "영주권 카드 원본 + 사본 (앞뒷면)",
      "  ▸ PR카드 미수령 시: CoPR(Confirmation of Permanent Residence)로 대체",
      "주민등록표 등본 — 1개월 이내 발급 (정부24)",
      "국세 납세증명서 — 해외이주용, 주민번호+한국주소 전부 공개 (홈택스)",
      "지방세 납세증명서 — 해외이주용 (정부24)",
      "관세 납세증명서 — 해외이주용 (관세청 전자통관시스템 유니패스)",
      "  ▸ 납세증명서는 방문 직전 발급 — 유효기간 1개월",
      "만 18~37세 남성 추가 서류:",
      "  ▸ 병역필: 병역사항 기재 주민등록초본 또는 병적증명서",
      "  ▸ 미필자: 병적증명서 필수",
    ],
    costs: [{ label: "해외이주신고확인서 1통", value: "CAD $0.65 (현금)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 반드시 본인 직접 방문 — 대리 신청 절대 불가.",
      "⚠️ 해외이주신고 완료 시 국민건강보험 즉시 정지, 주민등록 재외국민으로 변경.",
      "⚠️ 영주권자만 신청 가능.",
      "납세증명서 3종 모두 해외이주용으로 발급 — 일반용 불가.",
      "공동인증서 없으면 인증서 메뉴에서 먼저 발급 후 이용.",
      "동반 가족도 서류 각각 개인별로 준비 후 함께 방문.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (해외이주 신고) →",
  },

  emigration_new_consent: {
    type: "result",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "신규 신고", "성인", "행정정보공동이용 동의"],
    title: "해외이주 신고 — 행정정보공동이용 동의 (약 10일 소요)",
    docs: [
      "해외이주신고서 (양식)",
      "  ▸ 하단 '본인정보 제공요구 및 공동이용 동의서' + '행정정보 공동이용 동의서' 서명 필수",
      "  ▸ '이주종류'란에 '현지이주' 기재",
      "여권 원본 + 사본 1부",
      "영주권 카드 원본 + 사본 (앞뒷면)",
      "  ▸ PR카드 미수령 시: CoPR로 대체",
      "수령 방법 (방문 시 선택):",
      "  ▸ 직접 수령: 처리 완료 후 영사관 방문",
      "  ▸ 우편 수령: Canada Post Xpresspost 등기봉투 지참",
      "만 18~37세 남성 추가 서류:",
      "  ▸ 병역필: 병역사항 기재 주민등록초본 또는 병적증명서",
      "  ▸ 미필자: 병적증명서 필수",
    ],
    costs: [{ label: "해외이주신고확인서 1통", value: "CAD $0.65 (현금)" }],
    time: "약 10일 (국세납세증명 조회에 약 10일 소요)",
    notices: [
      "⚠️ 반드시 본인 직접 방문 — 대리 신청 절대 불가.",
      "⚠️ 해외이주신고 완료 시 국민건강보험 즉시 정지.",
      "⚠️ 영주권자만 신청 가능.",
      "동의 시 주민등록등본·납세증명서 3종을 직접 발급하지 않아도 됩니다.",
      "동반 가족도 신청서 제외 모든 서류 각각 개인별로 준비.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (해외이주 신고) →",
  },

  emigration_minor: {
    type: "result",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "신규 신고", "미성년자"],
    title: "해외이주 신고 — 만 18세 미만 미성년자",
    docs: [
      "해외이주신고서 (양식) — 부모와 함께 신고 시 한 장에 작성 가능",
      "미성년자 여권 원본 + 사본",
      "미성년자 영주권 카드 원본 + 사본",
      "미성년자 기본증명서 + 가족관계증명서 — 상세, 주민번호 전부 공개, 3개월 이내",
      "미성년자 납세증명서 3종 (국세·지방세·관세) — 미성년자도 개별 발급 필수",
      "부모 여권 원본 + 사본",
      "  ▸ 부모 중 한 명만 방문 시: 방문 안 하는 부/모 여권 사본만 제출",
      "부모 중 한 명만 방문하는 경우 추가 서류:",
      "  ▸ 친권자의 인감증명서 (3개월 이내 발급)",
      "  ▸ 친권자의 해외이주 동의서 (양식)",
    ],
    costs: [{ label: "해외이주신고확인서 1통", value: "CAD $0.65 (현금)" }],
    time: "서류 직접 준비 시 당일 즉시 / 행정정보공동이용 동의 시 약 10일",
    notices: [
      "미성년자 본인은 방문하지 않아도 됩니다 — 부모가 대리 신청 가능.",
      "⚠️ 미성년자도 납세증명서 3종 개인별 각각 발급 필수.",
      "부모 모두 함께 방문하는 경우 친권자 인감증명서·동의서 불필요.",
      "⚠️ 해외이주신고 완료 시 미성년자도 국민건강보험 정지.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (해외이주 신고) →",
  },

  emigration_cert: {
    type: "result",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "확인서 발급"],
    title: "해외이주신고확인서 발급",
    docs: [
      "유효한 한국 여권 원본",
    ],
    costs: [
      { label: "원본 1부 (기관제출용)", value: "CAD $0.65 (현금)" },
      { label: "2부 (기관제출용 + 금융기관제출용)", value: "CAD $1.30 (현금)" },
    ],
    time: "방문 당일 즉시 발급",
    notices: [
      "해외이주신고확인서는 국민연금 반환일시금 신청, 금융기관 제출 등에 사용됩니다.",
      "공동인증서가 있는 경우 재외동포365민원포털(g4k.go.kr)에서 온라인 재발급 가능 (기 신고자만 해당).",
      "아직 해외이주신고를 하지 않은 경우 먼저 신규 신고를 진행해야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  // ══ ENGLISH NODES: Registration & Emigration ══
  registration_start_en: {
    type: "question",
    service: "registration",
    breadcrumb: ["Home", "Overseas Korean Registration"],
    question: "What do you need for Overseas Korean Registration?",
    sub: "Registration is a legal obligation for Korean nationals residing abroad for more than 90 days (Overseas Koreans Act, Article 2). Does not apply to those who have lost Korean citizenship.",
    options: [
      { id: "registration_new_en", icon: "📋", title: "New Registration", desc: "Must register within 90 days of arriving in Canada" },
      { id: "registration_change_en", icon: "✏️", title: "Update / Change / Move Notification", desc: "Address, immigration status, or relocation change" },
      { id: "registration_copy_en", icon: "📄", title: "Registration Certificate (등록부 등본)", desc: "For real estate, financial, or inheritance matters" },
    ],
  },

  registration_new_en: {
    type: "result",
    service: "registration",
    breadcrumb: ["Home", "Overseas Korean Registration", "New Registration"],
    title: "Overseas Korean Registration — New",
    docs: [
      "Overseas Korean Registration Form (소정 양식)",
      "  ▸ Registration base (등록기준지): enter from top of your Basic Certificate",
      "  ▸ Military service status (males): select completed / pending / exempt; females: N/A",
      "  ▸ Canadian address: full address including city and postal code",
      "  ▸ Sign at the bottom if consenting to administrative data sharing",
      "Valid Korean passport — original",
      "Canadian immigration status document — original + photocopy (PR Card front & back / visa / study permit)",
      "  ▸ If consenting to administrative data sharing: immigration status document NOT required",
      "  ▸ If no valid visa or PR Card: submit proof of long-term stay (rental agreement, utility bill, etc.)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same-day processing",
    notices: [
      "⚠️ You must register within 90 days of arriving in Canada — failure to do so may result in a fine.",
      "Online registration available: Overseas Koreans 365 Portal (g4k.go.kr) — requires a Gong-dong Certificate.",
      "Korean nationals only — those who have lost Korean citizenship are NOT eligible.",
      "After completing an Overseas Emigration Report, you must also register here for Korean administrative services.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  registration_change_en: {
    type: "result",
    service: "registration",
    breadcrumb: ["Home", "Overseas Korean Registration", "Update / Change / Move"],
    title: "Overseas Korean Registration — Update / Change / Move Notification",
    docs: [
      "Overseas Korean Registration Change Form (소정 양식)",
      "Valid Korean passport — original",
      "Supporting documents for the change:",
      "  ▸ Address change: rental agreement, utility bill, or other address proof",
      "  ▸ Immigration status change: new PR Card / visa — original + photocopy",
      "  ▸ Relocation (move within Canada or return to Korea): relevant travel/departure documents",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same-day processing",
    notices: [
      "Online update available at the Overseas Koreans 365 Portal (g4k.go.kr) with a Gong-dong Certificate.",
      "Please report changes promptly when your address or immigration status changes.",
      "Moving within Canada also requires a change notification.",
      "Returning to Korea or moving to another country requires a relocation (이동) notification.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  registration_copy_en: {
    type: "result",
    service: "registration",
    breadcrumb: ["Home", "Overseas Korean Registration", "Registration Certificate"],
    title: "Overseas Korean Registration Certificate (등록부 등본)",
    docs: [
      "Valid Korean passport — original",
      "Fee (cash)",
    ],
    costs: [{ label: "Fee per copy", value: "CAD $1.00 (cash)" }],
    time: "Same-day issuance",
    notices: [
      "Free online issuance available at Overseas Koreans 365 Portal (g4k.go.kr) if you have a Gong-dong Certificate.",
      "Used as proof of overseas residency for real estate transactions, inheritance, and financial matters in Korea.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  emigration_start_en: {
    type: "question",
    service: "emigration",
    breadcrumb: ["Home", "Overseas Emigration Report"],
    question: "What do you need for the Overseas Emigration Report?",
    sub: "The Overseas Emigration Report (해외이주신고) formally updates your Korean resident registration from 'domestic resident' to 'overseas Korean.' Required after obtaining Canadian PR.",
    options: [
      { id: "emigration_new_en", icon: "🛫", title: "File Overseas Emigration Report (New)", desc: "After obtaining Canadian PR — deregister from Korean domestic residency" },
      { id: "emigration_cert_en", icon: "📄", title: "Overseas Emigration Confirmation Certificate", desc: "For National Pension refund claim and other official uses" },
    ],
  },

  emigration_new_en: {
    type: "result",
    service: "emigration",
    breadcrumb: ["Home", "Overseas Emigration Report", "New Report"],
    title: "Overseas Emigration Report — New Filing",
    docs: [
      "Overseas Emigration Report Application Form (소정 양식, 1 copy)",
      "Administrative Information Sharing Pre-Consent Form (소정 양식, 1 copy)",
      "  ▸ ✅ If you consent: Resident Registration Certificate, all 3 tax certificates, and military record are NOT required — the Consulate retrieves them directly",
      "  ▸ ❌ If you do NOT consent: submit all documents below yourself",
      "Valid Korean passport — original + photocopy",
      "Canadian Permanent Resident Card — original + photocopy (front and back)",
      "Basic Certificate / 기본증명서 (Detailed, all numbers visible) — within 3 months",
      "Family Relationship Certificate / 가족관계증명서 (Detailed) — within 3 months",
      "  ▸ If NOT consenting, also submit:",
      "  ▸ Resident Registration Certificate (주민등록등본, all numbers visible) — from gov.kr",
      "  ▸ Males aged 18–37: military service record (초본 with military info, or 병적증명서; pending → 병적증명서 required)",
      "  ▸ National Tax Certificate (해외이주용, all numbers visible) — from Hometax (hometax.go.kr)",
      "  ▸ Local Tax Certificate (해외이주용) — from gov.kr",
      "  ▸ Customs Tax Certificate (해외이주용) — from unipass.customs.go.kr",
      "  ▸ Adult family members filing together: each must bring their own full set of documents and appear in person",
      "  ▸ Minor children filing together: child's passport + PR card + Basic & Family Certificates + all 3 tax certificates (child's)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same-day processing",
    notices: [
      "⚠️ Personal visit required — no proxy applications. All adults aged 18+ must appear in person.",
      "⚠️ Korean National Health Insurance (건강보험) is immediately suspended upon completion.",
      "💡 Consenting to administrative data sharing eliminates the need to bring most documents — bring the consent form pre-filled.",
      "All tax certificates have an expiry date — obtain them just before your visit if not using the consent option.",
      "After filing, complete Overseas Korean Registration (재외국민 등록) to retain access to Korean administrative services.",
      "International marriage: additionally submit marriage certificates from both countries + translation (with Apostille or consular confirmation) + spouse's passport copy.",
      "Existing holders of the old-style residence passport (거주여권) do not need to file this report.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Overseas Emigration Report) →",
  },

  emigration_cert_en: {
    type: "result",
    service: "emigration",
    breadcrumb: ["Home", "Overseas Emigration Report", "Confirmation Certificate"],
    title: "Overseas Emigration Confirmation Certificate (해외이주신고확인서)",
    docs: [
      "Valid Korean passport — original",
    ],
    costs: [
      { label: "1 copy (institutional submission)", value: "CAD $0.65 (cash)" },
      { label: "2 copies (institutional + financial institution)", value: "CAD $1.30 (cash)" },
    ],
    time: "Same-day issuance",
    notices: [
      "Used for National Pension (국민연금) lump-sum refund claims and financial institution submissions.",
      "If you have a Gong-dong Certificate, you can reissue this online at the Overseas Koreans 365 Portal (g4k.go.kr) — only if the original report has already been filed.",
      "If you have not yet filed the Overseas Emigration Report, you must complete that first.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  // ══ FAQ ══
  faq_start: {
    type: "faq",
    breadcrumb: ["홈", "자주 묻는 질문"],
    title: "자주 묻는 질문",
    title_en: "Frequently Asked Questions",
    items: [
      {
        q: "예약은 어떻게 하나요?",
        q_en: "How do I book an appointment?",
        a: "torbooking.com에서 온라인 예약 후 방문하세요. 예약 없이 방문하면 접수가 불가합니다.\n\n⚠️ 1인 1예약은 방문자 수가 아닌 처리 업무건수 기준입니다.\n예) 엄마 본인 + 자녀 2명 여권 신청 → 3자리 예약 필요\n\n예약시간 15분 전 도착을 권장합니다 (주차 필요 시 30분 전). 예약 시간이 지나면 다음 방문자에게 차례가 돌아갑니다.",
        a_en: "Book online at torbooking.com before visiting. Walk-ins are not accepted.\n\n⚠️ Each booking slot = 1 service transaction, not 1 person.\nExample: Mom applying for her own passport + 2 children = 3 booking slots required.\n\nArrive 15 minutes before your appointment time (30 minutes if parking). If you are late, your slot may be given to the next visitor.",
      },
      {
        q: "여권 사진 규격이 어떻게 되나요?",
        q_en: "What are the passport photo requirements?",
        a: "가로 3.5cm × 세로 4.5cm / 6개월 이내 촬영 / 흰 배경 / 무표정·정면 / 안경 착용 불가 / 반드시 사진관 촬영본 (셀카·프린터 출력 불가). 영사관 내 무료 촬영 서비스 없음.",
        a_en: "3.5cm × 4.5cm / taken within 6 months / white background / neutral expression, facing forward / no glasses. Must be taken at a photo studio — selfies or home prints not accepted. No free photo service at the Consulate.",
      },
      {
        q: "수수료는 현금만 되나요?",
        q_en: "Is cash the only payment method?",
        a: "여권·공증 등 대부분은 현금만 가능합니다. 비자(사증)는 현금·직불카드·신용카드 모두 가능합니다. 수표·이체는 불가합니다.",
        a_en: "Most services (passport, notarization, etc.) require cash only. Visa fees accept cash, debit, and credit cards. No cheques or bank transfers.",
      },
      {
        q: "우편으로 신청할 수 있는 업무는 무엇인가요?",
        q_en: "Which services can be submitted by mail?",
        a: "가족관계등록(출생·혼인·이혼·사망신고), 국적상실신고, 재외국민등록 변경, 일부 증명서 발급은 우편 접수 가능합니다. 우편 시 온타리오·마니토바주 변호사 공증 사본 허용, Canada Post Xpresspost 반송 봉투 동봉 필수.",
        a_en: "Family register reports (birth, marriage, divorce, death), nationality loss reports, and some certificate applications can be submitted by mail. Ontario/Manitoba lawyer-notarized copies are accepted. Must include a Canada Post Xpresspost return envelope.",
      },
      {
        q: "민원실 운영 시간이 어떻게 되나요?",
        q_en: "What are the Consulate's business hours?",
        a: "오전 09:00 ~ 12:00 / 오후 13:00 ~ 16:30 (월요일 ~ 금요일). 한국 및 캐나다 공휴일 휴무.",
        a_en: "09:00–12:00 / 13:00–16:30 (Monday–Friday). Closed on Korean and Canadian public holidays.",
      },
      {
        q: "주차는 어디에 할 수 있나요?",
        q_en: "Where can I park?",
        a: "영사관 전용 주차장이 없습니다. 인근 유료 주차장 또는 주변 도로 주차를 이용하세요. 대중교통(지하철 St. Clair역 도보 10분) 이용을 권장합니다.",
        a_en: "There is no dedicated parking at the Consulate. Use nearby paid lots or street parking. Public transit is recommended — 10-min walk from St. Clair subway station.",
      },
      {
        q: "처리 결과는 어떻게 확인하나요?",
        q_en: "How can I check the status of my application?",
        a: "병무청 허가: 병무민원포털(mwpt.mma.go.kr). 비자 진행 상황: 비자포털(visa.go.kr). 가족관계·국적 등록부 반영: 정부24(gov.kr)에서 증명서 발급 후 확인. 영사관에는 콜센터가 없어 전화 진행 상황 조회가 어렵습니다.",
        a_en: "Military permit: MMAS portal (mwpt.mma.go.kr). Visa status: Korea Visa Portal (visa.go.kr). Family register updates: check via gov.kr certificate issuance. Note: the Consulate has no call centre — status inquiries by phone are generally not available.",
      },
      {
        q: "대리인이 방문할 수 있는 업무는 무엇인가요?",
        q_en: "Which services allow a proxy (대리인) to apply on my behalf?",
        a: "우편 또는 대리인 방문이 가능한 업무: 가족관계 신고(일부), 국적상실신고(우편), 병무 국외여행허가(위임장 필요), 병적증명서 발급(가족 대리), 일부 증명서 발급. 반드시 본인이 방문해야 하는 업무: 공증(서명인증), 여권 신규/재발급, 인감 관련, 해외이주신고.",
        a_en: "Proxy or mail allowed: family register reports (some), nationality loss (mail), military travel permit (proxy authorization required), military record certificate (immediate family), some certificate issuances. Must appear in person: all notarization (signature certification), passport applications, seal (인감) documents, overseas emigration report.",
      },
      {
        q: "영사관 전화번호는 무엇인가요?",
        q_en: "What is the Consulate's phone number?",
        a: "대표: 416-920-3809\n비자과 내선: ext. 221\n여권/국적과 내선: ext. 225\n긴급 (업무시간 외): 647-999-2113 (영사콜센터 1+82-2-3210-0404)",
        a_en: "Main: 416-920-3809\nVisa: ext. 221\nPassport/Nationality: ext. 225\nAfter-hours emergency: 647-999-2113 (or overseas: +82-2-3210-0404)",
      },
      {
        q: "영사관 주소는 어디인가요?",
        q_en: "What is the Consulate's address?",
        a: "555 Avenue Road, Toronto, ON M4V 2J7\n지하철: St. Clair역 도보 약 10분\n버스: 5 Avenue Road 버스 이용",
        a_en: "555 Avenue Road, Toronto, ON M4V 2J7\nSubway: ~10-min walk from St. Clair station\nBus: Route 5 Avenue Road",
      },
    ],
  },
};

// ─── SEARCH INDEX ─────────────────────────────────────────────────────────────
// result 노드 전체를 미리 인덱싱 (title + breadcrumb + docs + notices)
const SEARCH_INDEX = Object.entries(TREE)
  .filter(([, node]) => node.type === "result")
  .map(([id, node]: [any, any])  => {
    const text = [
      node.title ?? "",
      ...(Array.isArray(node.breadcrumb) ? node.breadcrumb : []),
      ...(Array.isArray(node.docs)    ? node.docs    : []),
      ...(Array.isArray(node.notices) ? node.notices : []),
    ].join(" ").toLowerCase();
    return { id, node, text };
  });

const SERVICE_COLORS = {
  passport: "#003478", family: "#1a6b3c", nationality: "#7b2d2d",
  cert: "#1a4d7a", various_cert: "#2d5a8a", visa: "#4a2d7a",
  notarization: "#5a3d8a", military: "#7a5500", registration: "#0f5c6b", emigration: "#3d5a2d",
};

// ─── SERVICE CARD DATA — Separated by language ───────────────────────────

const KO_SERVICES = [
  { id: "passport_start", icon: "🛂", title: "여권", desc: "발급 · 재발급 · 분실 · 긴급" },
  { id: "visa_start", icon: "✈️", title: "비자 (사증)", desc: "재외동포(F-4) · 방문 · 취업 · 유학" },
  { id: "notarization_start", icon: "📝", title: "공증", desc: "서류 · 서명 · 번역 공증" },
  { id: "military_start", icon: "🪖", title: "병역", desc: "국외여행허가 · 귀국 신고" },
  { id: "family_start", icon: "👨‍👩‍👧", title: "가족관계등록", desc: "증명서 · 출생 · 혼인 · 이혼 · 사망" },
  { id: "nationality_start", icon: "🇰🇷", title: "국적", desc: "상실 · 이탈 · 선택 · 보유 신고" },
  { id: "cert_start", icon: "🔐", title: "공동/금융 인증서", desc: "공동인증서 · 금융인증서" },
  { id: "various_cert_start", icon: "📄", title: "각종 증명서 발급", desc: "출입국 · 운전경력 · 병적증명서" },
  { id: "registration_start", icon: "🏠", title: "재외국민 등록", desc: "등록 · 주소 변경" },
  { id: "emigration_start", icon: "🛫", title: "해외이주 신고", desc: "해외이주 · 귀국 신고" },
];

const EN_SERVICES = [
  { id: "passport_start", icon: "🛂", title: "Passport", desc: "Issue · Renewal · Lost · Urgent" },
  { id: "visa_start", icon: "✈️", title: "Visa", desc: "Overseas Korean (F-4) · Visitor · Work · Study" },
  { id: "notarization_start", icon: "📝", title: "Notarization", desc: "Document · Signature · Translation" },
  { id: "military_start", icon: "🪖", title: "Military Service", desc: "Overseas Travel Permit · Return Report" },
  { id: "family_start", icon: "👨‍👩‍👧", title: "Family Register", desc: "Certificates · Birth · Marriage · Divorce · Death" },
  { id: "nationality_start", icon: "🇰🇷", title: "Nationality", desc: "Loss · Renunciation · Choice · Retention" },
  { id: "cert_start", icon: "🔐", title: "Digital Certificate", desc: "Certificate · Financial Certificate" },
  { id: "various_cert_start", icon: "📄", title: "Various Certificates", desc: "Entry/Exit · Driving History · Military Record" },
  { id: "registration_start", icon: "🏠", title: "Overseas Korean Reg.", desc: "Registration · Address Change" },
  { id: "emigration_start", icon: "🛫", title: "Emigration Report", desc: "Emigration · Return Report" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}

function AppInner() {
   const [pageId, setPageId] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [lang, setLang] = useState(() => {
    // ⭕ navigator를 'as any'로 형변환하여 TypeScript 에러를 방지합니다.
    const nav = navigator.language || (navigator as any).userLanguage || "";
    const langs = Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [nav];
    const isKorean = langs.some((l: any) => l.toLowerCase().startsWith("ko"));
    return isKorean ? "ko" : "en";
  });


  // ⭕ 5554행을 이 코드로 교체하세요.
const page = (TREE as any)[pageId] ?? { type: "home" };


  // 타입 안전 헬퍼 — 배열 필드 보장
  const pageDocs    = Array.isArray(page.docs)    ? page.docs    : [];
  const pageCosts   = Array.isArray(page.costs)   ? page.costs   : [];
  const pageNotices = Array.isArray(page.notices) ? page.notices : [];
  const pageOptions = Array.isArray(page.options) ? page.options : [];

  // 영어 모드에서 특정 서비스는 영문 전용 노드로 라우팅
  const EN_ROUTE_MAP = {
    visa_start: "visa_start_en",
    visa_heritage_yes: "visa_heritage_yes_en",
    visa_heritage_unsure: "visa_heritage_unsure_en",
    visa_heritage_no: "visa_heritage_no_en",
    visa_f4_start: "visa_f4_en",
    visa_f4_family: "visa_f4_family_en",
    visa_c3_start: "visa_c3_start_en",
    visa_other_start: "visa_work_en",
    visa_keta_en: "visa_keta_en",
    visa_f1d_en: "visa_f1d_en",
    visa_d4_en: "visa_d4_1_en",
    visa_visit_transit_en: "visa_visit_transit_en",
    visa_c33_en: "visa_c33_en",
    visa_c34_en: "visa_c34_en",
    visa_c31_en: "visa_c31_en",
    visa_c39_en: "visa_c39_en",
    visa_no_heritage_en: "visa_no_heritage_en",
    visa_visit_en: "visa_visit_en",
    visa_transit_en: "visa_transit_en",
    visa_c45_en: "visa_c45_en",
    visa_c45_camp_en: "visa_c45_camp_en",
    visa_c45_model_en: "visa_c45_model_en",
    visa_c45_dispatch_en: "visa_c45_dispatch_en",
    visa_work_en: "visa_work_en",
    visa_study_en: "visa_study_en",
    visa_others_en: "visa_others_en",
    visa_e2_1_en: "visa_e2_1_en",
    visa_e2_2_en: "visa_e2_2_en",
    visa_e1_e7_en: "visa_e1_e7_en",
    visa_h1_en: "visa_h1_en",
    visa_d2_6_en: "visa_d2_6_en",
    visa_d2_8_en: "visa_d2_8_en",
    visa_d4_1_en: "visa_d4_1_en",
    visa_d4_3_en: "visa_d4_3_en",
    visa_short_term_en: "visa_short_term_en",
    notarization_start: "notarization_start_en",
    notarization_saseo: "notarization_saseo_en",
    notarization_ingam: "notarization_ingam_en",
    notarization_ingam_eligible: "notarization_ingam_eligible",
    notarization_ingam_ok_passport: "notarization_ingam_ok_passport",
    notarization_ingam_ok_sojourn: "notarization_ingam_ok_sojourn",
    notarization_ingam_no: "notarization_ingam_no",
    notarization_ingam_pow: "notarization_ingam_pow_en",
    notarization_ingam_pow_adult: "notarization_ingam_pow_adult",
    notarization_ingam_pow_minor: "notarization_ingam_pow_minor",
    notarization_ingam_change: "notarization_ingam_change_en",
    notarization_ingam_protect: "notarization_ingam_protect_en",
    notarization_apostille_guide: "notarization_apostille_guide_en",
    notarization_legal_act: "notarization_legal_act_en",
    notarization_translation: "notarization_translation_en",
    notarization_translation_ircc_no: "notarization_translation_ircc_no",
    notarization_translation_namechange_no: "notarization_translation_namechange_no",
    notarization_translation_type: "notarization_translation_type",
    notarization_translation_family: "notarization_translation_family",
    notarization_translation_cert: "notarization_translation_cert",
    notarization_translation_birth: "notarization_translation_birth",
    notarization_translation_marriage: "notarization_translation_marriage",
    notarization_translation_divorce: "notarization_translation_divorce",
    notarization_translation_death: "notarization_translation_death",
    notarization_translation_pension: "notarization_translation_pension",
    notarization_translation_license_start: "notarization_translation_license_start",
    notarization_translation_license: "notarization_translation_license",
    notarization_translation_driving_record: "notarization_translation_driving_record",
    notarization_translation_driving_online: "notarization_translation_driving_online",
    notarization_translation_driving_visit: "notarization_translation_driving_visit",
    notarization_translation_license_exchange: "notarization_translation_license_exchange",
    notarization_school: "notarization_school",
    notarization_school_visit: "notarization_school_visit",
    notarization_school_mail: "notarization_school_mail",
    military_start: "military_start_en",
    military_cert_start: "military_cert_start_en",
    military_cert_self: "military_cert_self_en",
    military_cert_proxy: "military_cert_proxy_en",
    military_need_check: "military_need_check_en",
    military_age_under24: "military_age_under24_en",
    military_age_over25_general: "military_age_over25_general_en",
    military_age_supplemental: "military_age_supplemental_en",
    military_age_done: "military_age_done_en",
    military_permit_who: "military_permit_who_en",
    military_permit_start: "military_permit_start_en",
    military_permit_pr: "military_permit_pr_en",
    military_permit_dual: "military_permit_dual_en",
    military_permit_family5: "military_permit_family5_en",
    military_permit_2ndgen: "military_permit_2ndgen_en",
    military_permit_short: "military_permit_short_en",
    military_cert_online: "military_cert_online_en",
    military_cert_visit: "military_cert_visit_en",
    military_supplemental_abroad: "military_supplemental_abroad_en",
    military_supp_business: "military_supp_business_en",
    military_supp_work: "military_supp_work_en",
    military_supp_study: "military_supp_study_en",
    military_cancel_return: "military_cancel_return_en",
    military_permit_cancel: "military_permit_cancel_en",
    military_return_permanent: "military_return_permanent_en",
    military_return_exempt: "military_return_exempt_en",
    registration_start: "registration_start_en",
    registration_new: "registration_new_en",
    registration_change: "registration_change_en",
    registration_copy: "registration_copy_en",
    emigration_start: "emigration_start_en",
    emigration_new: "emigration_new_en",
    emigration_cert: "emigration_cert_en",
  };

  const goTo = (id: any) => {
    if (!id || typeof id !== "string") return;
    const resolved = lang === "en" && (EN_ROUTE_MAP as any)[id] ? (EN_ROUTE_MAP as any)[id] : id;
    if (!(TREE as any)[resolved] && resolved !== "home") {
      console.warn(`[goTo] 노드 없음: ${resolved}`);
      return;
    }
    setShowBookingModal(false);
    setHistory((h: any) => [...h, resolved]);
    setPageId(resolved);
    window.scrollTo(0, 0);
  };

  const goBack = (): void => {
    if (history.length <= 1) return;
    const newH = history.slice(0, -1);
    setHistory(newH);
    setPageId(newH[newH.length - 1] ?? "home");
    window.scrollTo(0, 0);
  };

  const goHome = (): void => {
    setHistory(["home"]);
    setPageId("home");
    setSearchQuery("");
    window.scrollTo(0, 0);
  };

  const toggleLang = (): void => {
    setLang((l: any) => (l === "ko" ? "en" : "ko"));
    setHistory(["home"]);
    setPageId("home");
    setSearchQuery("");
    window.scrollTo(0, 0);
  };

  const breadcrumb = Array.isArray(page.breadcrumb) ? page.breadcrumb : [];
  const progressPct = pageId === "home" ? 0 : Math.min(100, (breadcrumb.length / 5) * 100);
  const serviceColor = (page.service && (SERVICE_COLORS as any)[page.service]) ? (SERVICE_COLORS as any)[page.service] : "#003478";

  // 언어에 따라 서비스 카드 배열 선택
  const services = lang === "ko" ? KO_SERVICES : EN_SERVICES;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* HEADER */}
        <header className="header">
          <button onClick={goHome} className="header-logo" style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span className="header-flag">🇰🇷</span>
            <div className="header-title">
              {lang === "ko" ? "주토론토 대한민국 총영사관" : "Consulate General of the Republic of Korea in Toronto"}
              <span>{lang === "ko" ? "민원 안내 서비스" : "Consular Services Guide"}</span>
            </div>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button className="lang-btn" onClick={toggleLang}>
              {lang === "ko" ? "EN" : "한국어"}
            </button>
            <a href="tel:+14169203809" className="header-tel" style={{textDecoration:"none"}}>📞 416-920-3809</a>
          </div>
        </header>

        {/* PROGRESS BAR */}
        {pageId !== "home" && (
          <div className="progress-wrap">
            <div className="progress-steps">
              {breadcrumb.map((label: any, i: number) => {
                const isActive = i === breadcrumb.length - 1;
                const historyTarget = history[i] ?? "home";
                return (
                  <div key={i} className="p-step">
                    {i > 0 && <div className={`p-line ${i <= breadcrumb.length - 1 ? "done" : ""}`} />}
                    <div className={`p-dot ${isActive ? "active" : "done"}`}>
                      {isActive ? i + 1 : "✓"}
                    </div>
                    <span
                      className={`p-label ${isActive ? "active" : "clickable"}`}
                      onClick={!isActive ? () => {
                        setHistory(history.slice(0, i + 1));
                        setPageId(historyTarget);
                        window.scrollTo(0, 0);
                      } : undefined}
                      title={!isActive ? (lang === "ko" ? "이 단계로 돌아가기" : "Go back to this step") : undefined}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* MAIN */}
        <main className="main">
          {/* NAV BUTTONS */}
          {pageId !== "home" && (
            <div className="nav-row">
              <button className="nav-btn" onClick={goBack}>{lang === "ko" ? "← 이전" : "← Back"}</button>
              <button className="nav-btn home" onClick={goHome}>{lang === "ko" ? "🏠 홈으로" : "🏠 Home"}</button>
            </div>
          )}

          {/* HOME */}
          {page.type === "home" && (() => {
            // 검색 로직
            const q = searchQuery.trim().toLowerCase();
            const searchResults = q.length >= 1
              ? SEARCH_INDEX.filter(({ text }: any) => {
                  // 방법 1: 띄어쓰기로 분리 후 AND 검색 ("여권 분실" → 둘 다 포함)
                  const words = q.split(/\s+/).filter(Boolean);
                  const andMatch = words.every((w: any) => text.includes(w));
                  // 방법 2: 공백 제거 후 통째로 검색 ("여권분실" → 공백 제거한 텍스트에서 검색)
                  const qNoSpace = q.replace(/\s+/g, "");
                  const textNoSpace = text.replace(/\s+/g, "");
                  const noSpaceMatch = qNoSpace.length >= 2 && textNoSpace.includes(qNoSpace);
                  return andMatch || noSpaceMatch;
                }).slice(0, 12)
              : [];

            // 결과에서 스니펫 추출 (매칭 텍스트 앞뒤 40자)
            const getSnippet = (node:any) => {
              const candidates = [
                ...(Array.isArray(node.docs) ? node.docs.filter((d:any) => !d.trim().startsWith("▸")) : []),
                ...(Array.isArray(node.notices) ? node.notices.slice(0, 2) : []),
              ];
              const matched = candidates.find((t: any) => t.toLowerCase().includes(q));
              if (!matched) return null;
              const idx = matched.toLowerCase().indexOf(q);
              const start = Math.max(0, idx - 30);
              const end = Math.min(matched.length, idx + q.length + 30);
              const snippet = (start > 0 ? "…" : "") + matched.slice(start, end) + (end < matched.length ? "…" : "");
              // highlight
              const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
              return snippet.replace(re, "<mark>$1</mark>");
            };

            return (
              <>
                <div className="page-title" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                  <div>
                    <h1>{lang === "ko" ? "어떤 서비스가 필요하신가요?" : "What service do you need?"}</h1>
                    <p>{lang === "ko" ? "업무를 선택하거나 검색해 보세요." : "Select a service or search below."}</p>
                  </div>
                  <button
                    className="faq-btn"
                    onClick={() => { setOpenFaq(null); goTo("faq_start"); }}
                    title={lang === "ko" ? "자주 묻는 질문" : "FAQ"}
                    aria-label={lang === "ko" ? "자주 묻는 질문" : "FAQ"}
                  >
                    ❓
                  </button>
                </div>

                {/* 검색창 */}
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    className="search-input"
                    type="text"
                    placeholder={lang === "ko" ? "위임장, 여권, 공증, 병적증명서…" : "POA, passport, notarization…"}
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
                  )}
                </div>

                {/* 검색 결과 */}
                {q.length >= 1 ? (
                  <div>
                    {searchResults.length > 0 ? (
                      <>
                        <div className="search-count">
                          {lang === "ko"
                            ? `"${searchQuery}" 검색 결과 ${searchResults.length}건`
                            : `${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for "${searchQuery}"`}
                        </div>
                        <div className="search-results">
                          {searchResults.map(({ id, node }: any) => {
                            const snippet = getSnippet(node);
                            const path = (Array.isArray(node.breadcrumb) ? node.breadcrumb : []).join(" › ");
                            return (
                              <button
                                key={id}
                                className="search-result-card"
                                onClick={() => { setSearchQuery(""); goTo(id); }}
                              >
                                <div className="search-result-title">{node.title ?? ""}</div>
                                <div className="search-result-path">{path}</div>
                                {snippet && (
                                  <div
                                    className="search-result-snippet"
                                    dangerouslySetInnerHTML={{ __html: snippet }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="search-empty">
                        <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                        <div>
                          {lang === "ko"
                            ? `"${searchQuery}"에 대한 결과가 없어요.`
                            : `No results for "${searchQuery}".`}
                        </div>
                        <div style={{ fontSize: "12px", marginTop: "6px", color: "#aab" }}>
                          {lang === "ko" ? "다른 키워드로 검색하거나 아래 메뉴를 이용하세요." : "Try a different keyword or browse the menu below."}
                        </div>
                      </div>
                    )}
                    {/* 결과 없거나 있어도 아래 카드 그리드 유지 */}
                    <div style={{ marginTop: "1.25rem", borderTop: "1px solid #e4eaf6", paddingTop: "1rem" }}>
                      <div style={{ fontSize: "12px", color: "#99a", marginBottom: "10px" }}>
                        {lang === "ko" ? "또는 메뉴에서 선택하세요" : "Or browse by category"}
                      </div>
                      <div className="service-grid">
                        {services.map((s: any) => (
                          <button
                              key={s.id}
                              className="service-card"
                              style={{
                                "--sc-accent": (SERVICE_COLORS as any)[
                                  s.id.replace("_start", "").replace("_en", "")
                                ] ?? "#003478",
                              } as React.CSSProperties}
                              onClick={() => {
                                setSearchQuery("");
                                goTo(s.id);
                              }}>
                            <div className="sc-header">
                              <div className="sc-icon-box">{s.icon}</div>
                              <div className="sc-title">{s.title}</div>
                            </div>
                            <div className="sc-desc">{s.desc}</div>
                            <div className="sc-arrow">›</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 검색어 없을 때 기본 카드 그리드 */
                  <div className="service-grid">
                    {services.map((s: any) => (
                      <button
                        key={s.id}
                        className="service-card"
                        style={{
                          "--sc-accent": (SERVICE_COLORS as any)[
                            s.id.replace("_start", "").replace("_en", "")
                          ] ?? "#003478",
                        } as React.CSSProperties}
                        onClick={() => goTo(s.id)}>
                        <div className="sc-header">
                          <div className="sc-icon-box">{s.icon}</div>
                          <div className="sc-title">{s.title}</div>
                        </div>
                        <div className="sc-desc">{s.desc}</div>
                        <div className="sc-arrow">›</div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="info-banner">
                  <strong>
                    {lang === "ko" ? "📍 주토론토 대한민국 총영사관" : "📍 Consulate General of the Republic of Korea in Toronto"}
                  </strong>
                  <br />
                  555 Avenue Road, Toronto, ON M4V 2J7
                  <br />
                  {lang === "ko" ? "민원실: 09:00–12:00 / 13:00–16:30 (월–금)" : "Consular Hours: 9:00–12:00 / 13:00–16:30 (Mon–Fri)"}
                  <div className="updated-note">
                    {lang === "ko" ? `※ 정보 기준: ${LAST_UPDATED}` : `※ Information as of ${LAST_UPDATED}`}
                  </div>
                </div>
              </>
            );
          })()}

          {/* FAQ */}
          {page.type === "faq" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "28px" }}>❓</div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e" }}>
                    {lang === "ko" ? page.title : page.title_en}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#889", marginTop: "2px" }}>
                    {lang === "ko" ? "클릭하면 답변이 펼쳐집니다." : "Click a question to see the answer."}
                  </div>
                </div>
              </div>
              {(page.items ?? []).map((item: any, i: number) => (
                <div key={i} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === i ? "open" : ""}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{lang === "ko" ? item.q : item.q_en}</span>
                    <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>▼</span>
                  </button>
                  {openFaq === i && (
                    <div className="faq-answer">
                      {lang === "ko" ? item.a : item.a_en}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ marginTop: "1rem", fontSize: "12px", color: "#99a", textAlign: "center" }}>
                {lang === "ko"
                  ? "더 궁금한 사항은 영사관(416-920-3809)으로 문의하세요."
                  : "For further inquiries, contact the Consulate at 416-920-3809."}
              </div>
            </div>
          )}

          {/* QUESTION */}
          {page.type === "question" && (
            <div className="question-section">
              {page.service && (
                <div className="service-chip" style={{ "--chip-color": serviceColor } as React.CSSProperties}>
                  {services.find(s => s.id === page.service + "_start")?.icon ?? services.find(s => s.id.startsWith(page.service))?.icon ?? "🔹"}
                  {" "}
                  {services.find(s => s.id === page.service + "_start")?.title ?? services.find(s => s.id.startsWith(page.service))?.title ?? page.service}
                </div>
              )}
              <div className="q-title">{page.question ?? ""}</div>
              {page.sub === "__CERT_COMPARISON__" ? (
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px", marginBottom: "10px" }}>
                    {[
                      { icon: "📱", title: "간편인증서", visit: false, visitLabel: "영사관 방문 불필요", features: [{ ok: true, text: "앱에서 비대면 발급" }, { ok: true, text: "공공서비스 190개" }, { ok: false, text: "인터넷뱅킹 불가" }, { ok: null, text: "앱별 유효기간" }, { ok: null, text: "앱 내 저장" }] },
                      { icon: "🔐", title: "공동인증서", visit: true, visitLabel: "영사관 방문 1회", features: [{ ok: true, text: "행정+금융+전자상거래" }, { ok: true, text: "사용처 가장 넓음" }, { ok: true, text: "인터넷뱅킹 가능" }, { ok: null, text: "1년마다 직접 갱신" }, { ok: null, text: "PC/USB 저장" }] },
                      { icon: "🏦", title: "금융인증서", visit: true, visitLabel: "영사관 방문 1회", features: [{ ok: true, text: "금융+공공서비스" }, { ok: true, text: "인터넷뱅킹 가능" }, { ok: true, text: "3년 자동갱신" }, { ok: null, text: "클라우드 저장" }, { ok: null, text: "기기 이동 자유" }] },
                    ].map((item) => (
                      <div key={item.title} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "0.875rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "18px" }}>{item.icon}</span>
                          <span style={{ fontWeight: 500, fontSize: "13px", color: "var(--color-text-primary)" }}>{item.title}</span>
                        </div>
                        <div style={{ display: "inline-block", background: item.visit ? "var(--color-background-warning)" : "var(--color-background-success)", color: item.visit ? "var(--color-text-warning)" : "var(--color-text-success)", fontSize: "11px", padding: "2px 8px", borderRadius: "var(--border-radius-md)", marginBottom: "10px" }}>{item.visitLabel}</div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "12px", color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "5px" }}>
                          {item.features.map((f, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <span style={{ color: f.ok === true ? "var(--color-text-success)" : f.ok === false ? "var(--color-text-danger)" : "var(--color-text-secondary)", fontSize: "12px" }}>{f.ok === true ? "✓" : f.ok === false ? "✕" : "·"}</span>
                              <span>{f.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "7px 12px", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                    📵 세 가지 모두 한국 전화번호 불필요
                  </div>
                  <div style={{ background: "var(--color-background-danger)", borderRadius: "var(--border-radius-md)", padding: "8px 12px", fontSize: "12px", color: "var(--color-text-danger)", display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span>⚠️ 세 가지 모두 캐나다 시민권자(한국 국적 상실자)는 발급 불가</span>
                    <span>⚠️ 세 가지 모두 주민등록번호 필수</span>
                  </div>
                </div>
              ) : page.sub ? (
                <div className="q-sub">{page.sub}</div>
              ) : null}
              <div className="option-list">
                {pageOptions.map((opt: any) => (
                  <button key={opt.id} className="option-card" onClick={() => goTo(opt.id)}>
                    <div className="oc-icon-box">{opt.icon ?? ""}</div>
                    <div className="oc-content">
                      <div className="oc-title">{opt.title ?? ""}</div>
                      {opt.desc && <div className="oc-desc">{opt.desc}</div>}
                    </div>
                    <div className="oc-chev">›</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {page.type === "result" && (() => {
            const svcIcon = services.find(s => s.id === (page.service + "_start") || s.id.startsWith(page.service ?? ""))?.icon ?? "";
            const mainDocs = pageDocs.filter((d: any) => typeof d === "string" && !d.trim().startsWith("▸"));
            const extraDocs = pageDocs.filter((d: any) => typeof d === "string" && d.trim().startsWith("▸"));
            return (
            <div>
              <div className="result-badge" style={{ background: serviceColor, marginBottom: "10px" }}>
                {lang === "ko" ? "✓ 안내 결과" : "✓ Result"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                {svcIcon && <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{svcIcon}</span>}
                <div className="result-title" style={{ fontSize: "21px", marginBottom: 0 }}>{page.title ?? ""}</div>
              </div>

              <div className="result-sub">
                {lang === "ko" ? "방문 전 아래 서류를 준비해 주세요." : "Prepare the following documents before your visit."}
              </div>

              <div className="info-card">
                <div className="info-card-header">
                  <span className="info-card-icon">📂</span>
                  <span className="info-card-title">{lang === "ko" ? "필요 서류" : "Required Documents"}</span>
                  {mainDocs.length > 0 && <span className="info-card-count">{mainDocs.length}{lang === "ko" ? "개" : ""}</span>}
                </div>
                <div className="info-card-body">
                  {mainDocs.map((doc: any, i: number) => (
                    <div key={i} className="doc-item">
                      <div className="doc-num">{i + 1}</div>
                      <span style={{ fontWeight: 500 }}>{doc}</span>
                    </div>
                  ))}
                  {extraDocs.length > 0 && (
                    <>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#889", textTransform: "uppercase", letterSpacing: "0.05em", margin: "10px 0 4px", paddingTop: "8px", borderTop: "1px solid #f0f2f7" }}>
                        {lang === "ko" ? "해당자 추가 서류" : "Additional (if applicable)"}
                      </div>
                      {extraDocs.map((doc: any, i: number) => (
                        <div key={i} className="doc-item" style={{ opacity: 0.75 }}>
                          <span className="doc-bullet" style={{ color: "#aab" }}>▸</span>
                          <span style={{ fontSize: "12px" }}>{doc.replace(/^\s*▸\s*/, "")}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div className="info-card" style={{ marginBottom: 0 }}>
                  <div className="info-card-header">
                    <span className="info-card-icon">💰</span>
                    <span className="info-card-title">{lang === "ko" ? "수수료" : "Fee"}</span>
                  </div>
                  <div className="info-card-body">
                    {pageCosts.map((c: any, i: number) => (
                      <div key={i} className="cost-row">
                        <span className="cost-label" style={{ fontSize: "12px" }}>{c.label ?? ""}</span>
                        <span className="cost-value">{c.value ?? ""}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="info-card" style={{ marginBottom: 0 }}>
                  <div className="info-card-header">
                    <span className="info-card-icon">⏱️</span>
                    <span className="info-card-title">{lang === "ko" ? "소요 시간" : "Processing Time"}</span>
                  </div>
                  <div className="info-card-body">
                    <div style={{ fontSize: "13px", color: "#003478", fontWeight: 600, lineHeight: "1.5" }}>{page.time ?? ""}</div>
                  </div>
                </div>
              </div>

              {pageNotices.length > 0 && (
                <>
                  {page.service === "military" && (() => {
                    const currentYear = new Date().getFullYear();
                    const birthYear37 = currentYear - 37;
                    const birthYear25 = currentYear - 25;
                    const birthYear24 = currentYear - 24;
                    return (
                      <div style={{ background: "#f0f4ff", border: "1px solid #c8d3e8", borderRadius: "10px", padding: "10px 14px", marginBottom: "10px", fontSize: "12px", color: "#334" }}>
                        <div style={{ fontWeight: 700, marginBottom: "4px", color: "#003478" }}>📅 {currentYear}년 기준 병역 연령 참고</div>
                        <div>• 만 37세 이상 (병역의무 자동 종료): <strong>{birthYear37}년생 이전</strong></div>
                        <div>• 만 25세 (국외여행허가 신청 시작): <strong>{birthYear25}년생</strong> (늦어도 {currentYear + 1}.1.15까지)</div>
                        <div>• 만 24세 (허가 불필요 마지막 해): <strong>{birthYear24}년생</strong></div>
                      </div>
                    );
                  })()}
                <div className="info-card">
                  <div className="info-card-header">
                    <span className="info-card-icon">⚠️</span>
                    <span className="info-card-title">{lang === "ko" ? "주의사항" : "Important Notes"}</span>
                  </div>
                  <div className="info-card-body">
                    {pageNotices.map((n: any, i: number) => {
                      const text = typeof n === "string" ? n : "";
                      const isWarn = text.startsWith("⚠️");
                      return (
                        <div key={i} className={`notice-item${isWarn ? " warn" : ""}`}>
                          <span className="notice-icon">{isWarn ? "" : "•"}</span>
                          <span>{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                </>
              )}

              {page.postalInfo && (
                <div className="info-box">
                  <span>📮</span>
                  <div>
                    <strong>{lang === "ko" ? "우편 신청 주소" : "Postal Address"}</strong><br />
                    {(page.postalInfo ?? "").split("\n").map((l: any, i: number) => <span key={i}>{l}<br /></span>)}
                  </div>
                </div>
              )}

              {page.emailContact && (
                <div className="info-box">
                  <span>📧</span>
                  <div>
                    {lang === "ko" ? "이메일 신청:" : "Email Application:"}{" "}
                    <a href={`mailto:${page.emailContact}`} style={{ color: "#003478", fontWeight: 600 }}>{page.emailContact}</a>
                  </div>
                </div>
              )}

              {page.onlineRenewal && (
                <div className="highlight-box">
                  <span>💡</span>
                  <div>
                    <strong>{lang === "ko" ? "온라인 재발급도 가능합니다" : "Online Renewal Available"}</strong><br />
                    {lang === "ko" ? "기존 전자여권 소지자는 공동인증서로 온라인 신청 가능." : "Existing e-passport holders can apply online with a Gong-dong Certificate."}{" "}
                    <a href={page.onlineRenewal} target="_blank" rel="noreferrer" style={{ color: "#7a5000" }}>
                      {lang === "ko" ? "자세히 보기 →" : "Learn more →"}
                    </a>
                  </div>
                </div>
              )}

              {page.onlineLink && (
                <div className="highlight-box">
                  <span>💡</span>
                  <div>
                    <strong>{lang === "ko" ? "온라인 신청 / 바로가기" : "Online Application / Link"}</strong><br />
                    <a href={page.onlineLink} target="_blank" rel="noreferrer" style={{ color: "#7a5000" }}>
                      {lang === "ko" ? "바로가기 →" : "Go →"}
                    </a>
                  </div>
                </div>
              )}

              <div className="booking-sticky">
              {page.booking ? (
                <>
                  <button className="booking-btn" onClick={() => setShowBookingModal(true)}>
                    📅 {page.bookingLabel ?? (lang === "ko" ? "사전 예약하기 (torbooking.com) →" : "Book Appointment (torbooking.com) →")}
                  </button>
                  <a href="https://overseas.mofa.go.kr/ca-toronto-ko/index.do" target="_blank" rel="noreferrer" className="booking-secondary">
                    {lang === "ko" ? "총영사관 홈페이지 →" : "Official Consulate Website →"}
                  </a>
                </>
              ) : (
                <div style={{ background: "#e8eef7", border: "1px solid #b8caea", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "#223", marginTop: "4px" }}>
                  {lang === "ko" ? "📧 이메일 신청 가능: 방문 예약 불필요" : "📧 Email application available — no appointment needed"}
                </div>
              )}
              </div>

              {/* 예약 모달 */}
              {showBookingModal && page.booking && (() => {
                const checkDocs = pageDocs.filter((d: any) => typeof d === "string" && !d.trim().startsWith("▸"));
                return (
                  <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowBookingModal(false); }}>
                    <div className="modal-sheet">
                      <div className="modal-handle" />
                      <div className="modal-header">
                        <div className="modal-title">
                          {lang === "ko" ? "✅ 예약 전 서류 확인" : "✅ Check Before Booking"}
                        </div>
                        <div className="modal-sub">
                          {lang === "ko"
                            ? "아래 서류를 모두 준비하셨나요? 확인 후 예약 페이지로 이동합니다."
                            : "Please confirm you have all the required documents before proceeding."}
                        </div>
                      </div>
                      <div className="modal-body">
                        {checkDocs.length > 0 && (
                          <div className="modal-checklist">
                            {checkDocs.slice(0, 6).map((doc: any, i: number) => (
                              <div key={i} className="modal-check-item">
                                <div className="modal-check-num">{i + 1}</div>
                                <span>{doc}</span>
                              </div>
                            ))}
                            {checkDocs.length > 6 && (
                              <div style={{ fontSize: "12px", color: "#889", textAlign: "center", padding: "4px" }}>
                                {lang === "ko" ? `외 ${checkDocs.length - 6}개 서류 — 위 결과 페이지에서 전체 확인` : `+ ${checkDocs.length - 6} more — see full list above`}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="modal-notice">
                          ⚠️ {lang === "ko"
                            ? "예약 1건 = 업무 1건 기준입니다. 예) 엄마 + 자녀 2명 여권 신청 → 3자리 예약 필요. 예약 시간 15분 전 도착 권장."
                            : "1 booking slot = 1 service. E.g. mother + 2 children's passports = 3 slots. Arrive 15 min before your appointment."}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <a
                          href={page.booking}
                          target="_blank"
                          rel="noreferrer"
                          className="modal-confirm-btn"
                          onClick={() => setShowBookingModal(false)}
                        >
                          {lang === "ko" ? "준비 완료 — 예약 페이지로 이동 →" : "Ready — Go to Booking Page →"}
                        </a>
                        <button className="modal-cancel-btn" onClick={() => setShowBookingModal(false)}>
                          {lang === "ko" ? "닫기 (서류 다시 확인)" : "Close (check documents again)"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div style={{ marginTop: "16px", fontSize: "12px", color: "#889", textAlign: "center", lineHeight: "1.6" }}>
                {lang === "ko"
                  ? "※ 안내 내용은 참고용입니다. 중요한 사항은 반드시 총영사관(416-920-3809)에 확인하세요."
                  : "※ This is for reference only. Please confirm important matters with the Consulate (416-920-3809)."}
              </div>

              {/* 양식 다운로드 + 인쇄 버튼 */}
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <a
                  href="https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5396/list.do"
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "#fff", border: "1px solid #dde3ef", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#445", textDecoration: "none", fontWeight: 500 }}
                >
                  📥 {lang === "ko" ? "양식 다운로드" : "Download Forms"}
                </a>
                <button
                  onClick={() => window.print()}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "#fff", border: "1px solid #dde3ef", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#445", cursor: "pointer", fontWeight: 500 }}
                >
                  🖨️ {lang === "ko" ? "인쇄하기" : "Print"}
                </button>
              </div>
            </div>
            );
          })()}
        </main>

        {/* FOOTER */}
        <footer className="footer">
          {lang === "ko"
            ? "주토론토 대한민국 총영사관 · 555 Avenue Road, Toronto, ON M4V 2J7"
            : "Consulate General of the Republic of Korea in Toronto · 555 Avenue Road, Toronto, ON M4V 2J7"}
          <br />
          Tel: 416-920-3809 · {lang === "ko" ? "긴급: 416-994-4490" : "Emergency: 416-994-4490"}
          <br />
          <a href="https://overseas.mofa.go.kr/ca-toronto-ko/index.do" target="_blank" rel="noreferrer">
            {lang === "ko" ? "공식 홈페이지" : "Official Website"}
          </a>{" "}·{" "}
          <a href="https://www.torbooking.com" target="_blank" rel="noreferrer">
            {lang === "ko" ? "사전 예약" : "Book Appointment"}
          </a>
        </footer>
      </div>
    </>
  );
}
