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
    question: "신청자의 연령은?",
    sub: "만 18세를 기준으로 서류 및 절차가 달라집니다.",
    options: [
      { id: "passport_adult", icon: "👤", title: "만 18세 이상 (성인)", desc: "본인 직접 신청" },
      { id: "passport_minor", icon: "👶", title: "만 18세 미만 (미성년자)", desc: "법정대리인 동반 또는 서류 필요" },
      { id: "passport_travel_doc", icon: "📋", title: "여행증명서", desc: "여권 분실 + 신분확인 불가 시 긴급 귀국 전용 서류" },
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
    breadcrumb: ["홈", "여권", "성인", "재발급"],
    question: "⚡ 일주일 이내에 긴급하게 필요하신가요?",
    sub: "긴급 여부에 따라 발급 방법이 달라집니다. 단수여권은 1회용이며 당일 발급됩니다.",
    options: [
      { id: "passport_urgent_who", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권(사진부착식) 당일 발급 — 긴급 귀국·출국 사유 필요" },
      { id: "passport_adult_have_normal", icon: "📅", title: "일반 발급 (여유 있음)", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" },
    ],
  },

  passport_adult_new: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "신규"],
    question: "⚡ 일주일 이내에 긴급하게 필요하신가요?",
    sub: "신규 발급은 기존 여권이 없으므로 온라인 신청 불가, 반드시 방문 신청입니다.",
    options: [
      { id: "passport_urgent_who_new", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권(사진부착식) 당일 발급 — 긴급 귀국·출국 사유 필요" },
      { id: "passport_new_normal", icon: "📅", title: "일반 발급 (여유 있음)", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" },
    ],
  },

  passport_adult_lost: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "성인", "분실"],
    question: "⚡ 일주일 이내에 긴급하게 필요하신가요?",
    sub: "분실 시에도 긴급 단수여권 발급이 가능합니다. 먼저 경찰 분실 신고를 완료하세요.",
    options: [
      { id: "passport_urgent_lost_who", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권 당일 발급 또는 여행증명서 (신분확인 불가 시)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ 단수여권은 1회용 — 귀국 후 반드시 정식 전자여권 재발급 신청.",
      "⚠️ 사진은 사진관 촬영본 필수 — 영사관 무료촬영 불가.",
      "캐나다 재입국 시: 단수여권만으로는 불가 — PR카드 반드시 함께 지참.",
      "수수료 감면: 증빙서류를 당일 못 내도 6개월 이내 사후 제출로 감면 신청 가능.",
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 시민권자는 국적상실신고 미완료 시 별도 처리 필요 — 방문 전 전화 상담 권장 (416-920-3809).",
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
    ],
    time: "당일 발급 — 영사 심사 후 결정",
    notices: [
      "⚠️ Police Report 없이는 접수 불가.",
      "⚠️ 비자도 함께 분실한 경우: 신분 확인이 어려울 수 있음 — 사전 전화 상담 권장 (416-920-3809).",
      "단수여권 1회용 — 귀국 후 정식 전자여권 재발급 필요.",
      "여행증명서가 필요한 경우: 홈 → 여권 → 여행증명서 메뉴 참조.",
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료 (만 8세 이상)", value: "CAD $48.00 (현금)" },
      { label: "긴급여권 수수료 (만 8세 미만)", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "일반 긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 등 인도적 사유 (감면)", value: "CAD $15.00 (현금)" },
      { label: "감면 조건", value: "사전 또는 방문 후 6개월 이내 증빙서류 제출 시 적용" },
    ],
    time: "당일 발급 (방문 즉시) — 영사 심사 후 발급 결정",
    notices: [
      "⚠️ 단수여권은 1회용입니다 — 여행 목적 달성 시 효력 소멸. 귀국 후 반드시 정식 전자여권을 별도 신청하세요.",
      "⚠️ 사진은 반드시 사진관에서 대한민국 여권 규격으로 촬영 — 영사관 무료촬영 불가.",
      "긴급 발급 여부는 영사 심사 후 결정됩니다 — 사유가 충분하지 않으면 발급이 거부될 수 있습니다.",
      "수령: 방문 당일 직접 수령만 가능 (우편·DHL 불가).",
      "캐나다 재입국 시: 단수여권만으로는 재입국 불가 — PR카드·비자·시민권증서를 반드시 함께 지참.",
      "친족 사망·위독 수수료 감면: 증빙서류를 방문 당일 제출 못 해도 6개월 이내 사후 제출로 감면 신청 가능.",
      "신분 확인이 불가능한 경우(여권 분실 + 신분증 없음): 단수여권 대신 여행증명서 발급이 가능합니다 — 사전 전화 문의 (416-920-3809).",
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
      { label: "일반 긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 등 인도적 사유 (감면)", value: "CAD $15.00 (현금)" },
      { label: "감면 조건", value: "사전 또는 방문 후 6개월 이내 증빙서류 제출 시 적용" },
    ],
    time: "당일 발급 (영사 심사 후 결정)",
    notices: [
      "⚠️ 반드시 경찰 분실 신고(Police Report) 완료 후 방문하세요.",
      "⚠️ 사진은 반드시 사진관 촬영본 — 영사관 무료촬영 불가.",
      "⚠️ PR카드·비자 등 체류자격 증빙이 전혀 없는 경우: 단수여권 발급이 어려울 수 있습니다 — 반드시 사전 전화 문의 (416-920-3809).",
      "단수여권은 1회용 — 귀국 후 한국에서 정식 전자여권 재발급 신청 필요.",
      "신분 확인 불가 시: 단수여권 대신 여행증명서 발급이 가능 — 사전 문의 필수 (416-920-3809). 여행증명서 안내는 홈 → 여권 → 여행증명서 메뉴 참조.",
      "캐나다 재입국 시: 단수여권만으로는 재입국 불가 — PR카드·비자 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

  passport_urgent_minor: {
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
      { label: "만 8~17세 긴급여권", value: "CAD $48.00 (현금)" },
      { label: "만 8세 미만 긴급여권", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 등 인도적 사유 (감면)", value: "CAD $15.00 (현금)" },
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

  passport_travel_doc: {
    type: "result",
    service: "passport",
    breadcrumb: ["홈", "여권", "여행증명서"],
    title: "여행증명서 (Travel Document) — 신분확인 불가 시 긴급 귀국용",
    docs: [
      "여권발급신청서 (영사관 비치, 자필 작성)",
      "여행증명서 발급 사유서 (자필 작성 — 긴급 귀국 사유 및 귀국 예정일 기재)",
      "신분 확인 가능 서류 (아래 중 하나라도):",
      "  ▸ 캐나다 여권 / 운전면허증 / 시민권증서 / PR카드",
      "  ▸ 한국 신분증 사본",
      "  ▸ 기본증명서 (상세) 또는 가족관계증명서 (상세)",
      "  ▸ 현지 경찰서 발급 Police Report (여권 분실 시)",
      "여권용 사진 1매 — 사진관 촬영본 지참",
      "긴급 귀국 사유 증빙서류 (항공권 / 진단서 / 사망증명서 등)",
    ],
    costs: [
      { label: "여행증명서 수수료", value: "CAD $15.00 (현금)" },
    ],
    time: "당일 발급 (영사 심사 후 결정)",
    notices: [
      "여행증명서는 한국 귀국만을 위한 1회용 긴급서류입니다 — 다른 국가 방문에는 사용 불가.",
      "여행증명서로 귀국 후 한국에서 정식 전자여권을 발급받아야 합니다.",
      "단수여권(긴급여권) 발급이 불가한 경우(신분확인 곤란 등)에 한해 발급됩니다.",
      "⚠️ 반드시 방문 전 전화 상담 필수 (416-920-3809) — 발급 가능 여부를 먼저 확인하세요.",
      "캐나다 재입국 불가 — 귀국 전용 서류입니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (당일 방문) →",
  },

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
      { label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },
      { label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },
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
      { label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },
      { label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },
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
      { label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },
      { label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },
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
    costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }],
    time: "약 3~4주 후 방문 수령",
    notices: ["여권 수령 시 별도 예약 없이 접수증 지참 후 픽업 가능 (오후 픽업 시간 확인 권장).","PR Card 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","온라인 재발급도 가능합니다 (기존 전자여권 소지자 + 공동인증서 보유 시)."],
    booking: "https://www.torbooking.com/book",
    onlineRenewal: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5389/view.do?seq=1344521",
  },

  passport_have_pr_xpress: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "재발급", "영주권자", "Xpresspost"],
    title: "여권 재발급 — 영주권자 · Xpresspost 우편 수령",
    docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 여권 원본 + 흑백 사본 1부","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","우편수령신청서 (영사관 홈페이지 다운로드, 자필 작성)","Canada Post Xpresspost 봉투 — Canada Post에서 구매 후 수취인 주소·이름 기재하여 지참 (1인: 소형, 2인 이상: 대형)"],
    costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "Xpresspost 봉투 (Canada Post)", value: "별도 구매" }],
    time: "약 3~4주 발급 + 우편 배송 기간 (3~5일)",
    notices: ["Xpresspost 봉투는 Canada Post(우체국)에서 미리 구매하여 수취인 정보를 기재해 오세요.","우편 분실·파손에 대해 영사관은 책임지지 않습니다.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","PR Card 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수."],
    booking: "https://www.torbooking.com/book",
  },

  passport_have_pr_dhl: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "재발급", "영주권자", "DHL특급"],
    title: "여권 재발급 — 영주권자 · DHL 특급 (약 2주)",
    docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 여권 원본 + 흑백 사본 1부","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","DHL 긴급여권 서비스 결제 영수증 출력본 — 방문 전 온라인 결제 필수"],
    costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }],
    time: "약 2주 (DHL 특급 배송 기준)",
    notices: ["방문 전 반드시 DHL 긴급여권 서비스를 온라인으로 결제하고 영수증을 출력해 오세요.","DHL 서비스는 한국→영사관 배송 단축 서비스이며, 자택 직접 배송이 아닙니다.","여권 완성 후 영사관에서 방문 수령하거나 Xpresspost로 별도 우편 수령 가능.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가."],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.dhl.com/kr-ko/home/our-divisions/ecommerce/sending-parcels.html",
  },

  passport_have_citizen_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "시민권자", "방문수령"], title: "여권 재발급 — 시민권자 · 방문 수령", docs: ["여권발급신청서 (영사관 비치, 자필 작성)","현재 한국 여권 원본 + 흑백 사본 1부","캐나다 여권 원본 + 흑백 사본 1부","캐나다 시민권증서 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주 후 방문 수령", notices: ["시민권 취득 시 한국 국적이 법적으로 상실됩니다 — 국적상실신고를 별도로 진행하세요.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","온라인 재발급도 가능합니다 (기존 전자여권 소지자 + 공동인증서 보유 시)."], booking: "https://www.torbooking.com/book", onlineRenewal: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5389/view.do?seq=1344521" },
  passport_have_citizen_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "시민권자", "Xpresspost"], title: "여권 재발급 — 시민권자 · Xpresspost 우편 수령", docs: ["여권발급신청서","현재 한국 여권 원본 + 흑백 사본 1부","캐나다 여권 원본 + 흑백 사본 1부","캐나다 시민권증서 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","우편수령신청서 (홈페이지 다운로드, 자필 작성)","Canada Post Xpresspost 봉투 — 수취인 주소·이름 기재 후 지참"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 발급 + 우편 배송 기간", notices: ["시민권 취득 시 한국 국적 상실 — 국적상실신고 별도 진행 필요.","우편 분실·파손에 대해 영사관은 책임지지 않습니다.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가."], booking: "https://www.torbooking.com/book" },
  passport_have_citizen_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "시민권자", "DHL특급"], title: "여권 재발급 — 시민권자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","현재 한국 여권 원본 + 흑백 사본 1부","캐나다 여권 원본 + 흑백 사본 1부","캐나다 시민권증서 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }], time: "약 2주", notices: ["시민권 취득 시 한국 국적 상실 — 국적상실신고 별도 진행 필요.","방문 전 DHL 긴급여권 서비스 온라인 결제 후 영수증 출력 필수.","DHL은 한국→영사관 배송 단축 서비스 (자택 배송 아님)."], booking: "https://www.torbooking.com/book" },

  passport_have_visa_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "비자소지자", "방문수령"], title: "여권 재발급 — 비자 소지자 · 방문 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","캐나다 비자 원본 + 흑백 사본 1부 (비자 분실 시 재학·재직증명서 등 대체)","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","병역 증빙서류 (만 25~37세 병역의무자, 전산 확인 불가 시만 해당)"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" },{ label: "병역미필자 알뜰 (24면)", value: "CAD $41.00 (현금)" }], time: "약 3~4주 후 방문 수령", notices: ["사본은 흑백으로 밝게 복사 — 어둡거나 컬러 복사본 접수 불가.","비자 분실 시 여권과(416-920-3809)에 사전 전화 상담 권장.","만 25~37세 남성 병역의무자는 병역 증빙서류 필요할 수 있습니다."], booking: "https://www.torbooking.com/book" },
  passport_have_visa_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "비자소지자", "Xpresspost"], title: "여권 재발급 — 비자 소지자 · Xpresspost 우편 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","캐나다 비자 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (만 25~37세, 해당자만)","우편수령신청서 (홈페이지 다운로드)","Canada Post Xpresspost 봉투 — 수취인 정보 기재 후 지참"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 발급 + 우편 배송 기간", notices: ["우편 분실·파손에 대해 영사관은 책임지지 않습니다.","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },
  passport_have_visa_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "비자소지자", "DHL특급"], title: "여권 재발급 — 비자 소지자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","캐나다 비자 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (만 25~37세, 해당자만)","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }], time: "약 2주", notices: ["방문 전 DHL 긴급여권 서비스 온라인 결제 후 영수증 출력 필수.","DHL은 한국→영사관 배송 단축 서비스 (자택 배송 아님).","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },

  passport_have_visitor_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "단기방문자", "방문수령"], title: "여권 재발급 — 단기 방문자 (eTA) · 방문 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","왕복 항공권 (e-ticket) 출력본","eTA 승인서류 출력본","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주 (귀국 일정과 비교 후 DHL 특급 고려 권장)", notices: ["귀국 일정이 촉박한 경우 DHL 특급(약 2주) 또는 단수여권(당일)을 고려하세요.","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },
  passport_have_visitor_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "단기방문자", "Xpresspost"], title: "여권 재발급 — 단기 방문자 (eTA) · Xpresspost 우편 수령", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","왕복 항공권 (e-ticket) 출력본","eTA 승인서류 출력본","최근 6개월 이내 여권용 사진 2매","우편수령신청서 (홈페이지 다운로드)","Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간 (귀국 일정 확인 필수)", notices: ["귀국 일정과 발급 소요시간을 꼭 비교해 DHL 또는 단수여권 대안을 검토하세요.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_have_visitor_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "재발급", "단기방문자", "DHL특급"], title: "여권 재발급 — 단기 방문자 (eTA) · DHL 특급 (약 2주)", docs: ["여권발급신청서","현재 여권 원본 + 흑백 사본 1부","왕복 항공권 (e-ticket) 출력본","eTA 승인서류 출력본","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도 (온라인 결제)" }], time: "약 2주 (단기 방문자에게 권장 옵션)", notices: ["방문 전 DHL 긴급여권 서비스 온라인 결제 후 영수증 출력 필수.","DHL은 한국→영사관 배송 단축 서비스 (자택 배송 아님)."], booking: "https://www.torbooking.com/book" },




  passport_lost_pr_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "영주권자", "방문수령"], title: "여권 분실 재발급 — 영주권자 · 방문 수령", docs: ["여권발급신청서","여권 분실 신고서 (현지 경찰서 발급 Police Report) — 방문 전 필수","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","기본증명서 (상세) — 분실 여권으로 가족관계 확인 불가 시 추가"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주 후 방문 수령", notices: ["반드시 현지 경찰서에서 분실 신고(Police Report)를 먼저 완료 후 방문하세요.","PR Card도 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수.","사본은 흑백으로 밝게 복사."], booking: "https://www.torbooking.com/book" },
  passport_lost_pr_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "영주권자", "Xpresspost"], title: "여권 분실 재발급 — 영주권자 · Xpresspost 우편 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","기본증명서 (상세) — 해당 시","우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간", notices: ["경찰 분실 신고 먼저 완료 후 방문.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_pr_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "영주권자", "DHL특급"], title: "여권 분실 재발급 — 영주권자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","유효한 PR Card 원본 + 흑백 사본 1부","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도" }], time: "약 2주", notices: ["경찰 분실 신고 먼저 완료 후 방문.","방문 전 DHL 온라인 결제 후 영수증 출력 필수."], booking: "https://www.torbooking.com/book" },

  passport_lost_citizen_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "시민권자", "방문수령"], title: "여권 분실 재발급 — 시민권자 · 방문 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 여권 원본 또는 시민권증서 원본","최근 6개월 이내 여권용 사진 2매"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["경찰 분실 신고 먼저 완료 후 방문.","한국 국적은 시민권 취득 시 이미 상실된 상태입니다.","긴급 귀국 필요 시 여행증명서 발급도 가능합니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_citizen_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "시민권자", "Xpresspost"], title: "여권 분실 재발급 — 시민권자 · Xpresspost 우편 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 여권 원본 또는 시민권증서 원본","최근 6개월 이내 여권용 사진 2매","우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간", notices: ["경찰 분실 신고 먼저 완료 후 방문.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_citizen_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "시민권자", "DHL특급"], title: "여권 분실 재발급 — 시민권자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 여권 원본 또는 시민권증서 원본","최근 6개월 이내 여권용 사진 2매","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도" }], time: "약 2주", notices: ["경찰 분실 신고 먼저 완료 후 방문.","방문 전 DHL 온라인 결제 후 영수증 출력 필수."], booking: "https://www.torbooking.com/book" },

  passport_lost_visa_visit: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "비자소지자", "방문수령"], title: "여권 분실 재발급 — 비자 소지자 · 방문 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 비자 원본 (비자도 분실 시 재학·재직증명서 등 대체)","최근 6개월 이내 여권용 사진 2매 (영사관 무료촬영 가능)","병역 증빙서류 (만 25~37세, 해당자만)"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "병역미필자 일반 (58면)", value: "CAD $44.00 (현금)" }], time: "약 3~4주 후 방문 수령", notices: ["경찰 분실 신고 먼저 완료 후 방문.","비자도 함께 분실 시 여권과(416-920-3809)에 사전 전화 상담 필수."], booking: "https://www.torbooking.com/book" },
  passport_lost_visa_xpress: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "비자소지자", "Xpresspost"], title: "여권 분실 재발급 — 비자 소지자 · Xpresspost 우편 수령", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 비자 원본 (분실 시 대체 서류)","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (해당자만)","우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "Xpresspost 봉투", value: "별도 구매" }], time: "약 3~4주 + 우편 배송 기간", notices: ["경찰 분실 신고 먼저 완료 후 방문.","우편 분실에 대해 영사관은 책임지지 않습니다."], booking: "https://www.torbooking.com/book" },
  passport_lost_visa_dhl: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "분실", "비자소지자", "DHL특급"], title: "여권 분실 재발급 — 비자 소지자 · DHL 특급 (약 2주)", docs: ["여권발급신청서","여권 분실 신고서 (Police Report) — 방문 전 필수","캐나다 비자 원본 (분실 시 대체 서류)","최근 6개월 이내 여권용 사진 2매","병역 증빙서류 (해당자만)","DHL 긴급여권 서비스 결제 영수증 출력본"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "DHL 특급 배송비", value: "별도" }], time: "약 2주", notices: ["경찰 분실 신고 먼저 완료 후 방문.","방문 전 DHL 온라인 결제 후 영수증 출력 필수."], booking: "https://www.torbooking.com/book" },

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
      { label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },
      { label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },
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
      { label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },
      { label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },
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

  passport_minor: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자"], question: "자녀의 현재 여권 상태는?", sub: "여권 유무와 분실 여부에 따라 준비 서류가 달라집니다.", options: [{ id: "passport_minor_have", icon: "✅", title: "재발급 (여권 있음)", desc: "만료 임박 또는 만료된 여권" },{ id: "passport_minor_lost", icon: "❌", title: "분실 재발급", desc: "경찰 분실 신고 후 재발급" },{ id: "passport_minor_new", icon: "🆕", title: "신규 발급 (여권 없음)", desc: "최초 여권 발급" }] },
  passport_minor_have: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급"], question: "⚡ 일주일 이내에 긴급하게 필요하신가요?", sub: "긴급 시 단수여권(사진부착식) 당일 발급 가능합니다. 단, 사진관 촬영 사진 지참 필수.", options: [{ id: "passport_minor_urgent_who", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권 당일 발급 — 법정대리인 동반 + 긴급 사유 증빙서류 필요" },{ id: "passport_minor_have_normal", icon: "📅", title: "일반 발급 (여유 있음)", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" }] },
  passport_minor_new: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규"], question: "⚡ 일주일 이내에 긴급하게 필요하신가요?", sub: "신규 발급 시에도 긴급 단수여권 당일 발급이 가능합니다.", options: [{ id: "passport_minor_urgent_who", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권 당일 발급 — 법정대리인 동반 + 긴급 사유 증빙서류 필요" },{ id: "passport_minor_new_normal", icon: "📅", title: "일반 발급 (여유 있음)", desc: "일반 전자여권 3~4주 / DHL 특급 약 2주" }] },
  passport_minor_lost: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실"], question: "⚡ 일주일 이내에 긴급하게 필요하신가요?", sub: "분실 시에도 단수여권 당일 발급 가능합니다. 경찰 분실 신고(Police Report) 먼저 완료하세요.", options: [{ id: "passport_minor_urgent_lost_who", icon: "🚨", title: "긴급 — 1주일 이내 필요", desc: "단수여권 당일 발급 — 친권 상황에 따라 서류 다름" },{ id: "passport_minor_lost_normal", icon: "📅", title: "일반 발급 (여유 있음)", desc: "일반 전자여권 3~4주" }] },

  passport_minor_urgent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "긴급", "단수여권"], title: "⚡ 미성년자 긴급 단수여권 — 당일 발급", docs: ["여권발급신청서 (영사관 비치, 법정대리인 서명)","자녀 여권 원본 + 흑백 사본 (기존 여권 있는 경우)","자녀 체류자격 증빙서류 (PR카드 / 비자 / 시민권증서)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 (전산 확인 불가 시)","법정대리인 동의서 (방문하는 부 또는 모 서명)","방문하는 법정대리인(부 또는 모) 여권 원본","여권용 사진 2매 — 반드시 사진관 촬영본 지참 (만 5세 이하 포함, 영사관 촬영 불가)","긴급 출국 사유 증빙서류 (항공권, 진단서, 사망증명서 등)"], costs: [{ label: "단수여권 수수료", value: "CAD $48.00" },{ label: "친족 사망·위독 등 인도적 사유", value: "CAD $15.00 (할인)" }], time: "당일 발급 (방문 즉시)", notices: ["단수여권은 1회용 — 사용 목적 달성 시 효력 소멸, 이후 정식 전자여권을 별도 신청하세요.","사진은 반드시 사진관에서 촬영해 오세요 — 영사관 무료촬영 불가.","긴급 출국 사유 증빙서류 반드시 지참.","이혼·단독친권의 경우에도 동일하게 적용 — 친권자 확인 서류 지참."], booking: "https://www.torbooking.com/book", bookingLabel: "사전 예약하기 (당일 방문) →" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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
      { label: "긴급여권 수수료", value: "CAD $48.00 (현금)" },
      { label: "친족 사망·위독 인도적 사유 감면", value: "CAD $15.00 (현금)" },
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

    passport_minor_urgent_lost: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "긴급", "단수여권"], title: "⚡ 미성년자 긴급 단수여권 — 분실 시", docs: ["여권발급신청서 (영사관 비치, 법정대리인 서명)","여권 분실 신고서 (현지 경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","법정대리인 동의서 + 방문하는 법정대리인 여권 원본","여권용 사진 2매 — 반드시 사진관 촬영본 지참 (영사관 촬영 불가)","긴급 출국 사유 증빙서류 (항공권, 진단서 등)"], costs: [{ label: "단수여권 수수료", value: "CAD $48.00" },{ label: "친족 사망·위독 등 인도적 사유", value: "CAD $15.00 (할인)" }], time: "당일 발급 (방문 즉시)", notices: ["반드시 경찰서 분실 신고(Police Report) 먼저 완료 후 방문하세요.","단수여권은 1회용 — 귀국 후 정식 전자여권 별도 신청 필요.","사진은 반드시 사진관에서 촬영해 오세요."], booking: "https://www.torbooking.com/book", bookingLabel: "사전 예약하기 (당일 방문) →" },

  passport_minor_have_normal: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "일반"], question: "부모님의 혼인·친권 상황은?", sub: "친권자가 누구인지에 따라 필요한 서류와 절차가 달라집니다.", options: [{ id: "passport_minor_married", icon: "👫", title: "부모님이 혼인 중 (공동친권)", desc: "부모 중 1인이 방문 신청 가능" },{ id: "passport_minor_divorced_sole", icon: "👤", title: "이혼 — 단독친권자 있음", desc: "단독친권자만 신청 가능" },{ id: "passport_minor_divorced_joint", icon: "⚖️", title: "이혼 — 공동친권 (두 분 모두 친권)", desc: "양쪽 동의 필요" },{ id: "passport_minor_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 신청" },{ id: "passport_minor_korea_parent", icon: "🇰🇷", title: "법정대리인이 한국에 계심", desc: "인감도장·증명서 필요" }] },
  passport_minor_new_normal: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "일반"], question: "부모님의 혼인·친권 상황은?", sub: "신규 발급 시에도 친권자 확인이 필요합니다. 한국 출생신고가 완료된 경우에만 신청 가능합니다.", options: [{ id: "passport_minor_new_married", icon: "👫", title: "부모님이 혼인 중 (공동친권)", desc: "부모 중 1인이 방문 신청 가능" },{ id: "passport_minor_new_divorced_sole", icon: "👤", title: "이혼 — 단독친권자 있음", desc: "단독친권자만 신청 가능" },{ id: "passport_minor_new_divorced_joint", icon: "⚖️", title: "이혼 — 공동친권 (두 분 모두 친권)", desc: "양쪽 동의 필요" },{ id: "passport_minor_new_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 신청" },{ id: "passport_minor_new_korea_parent", icon: "🇰🇷", title: "법정대리인이 한국에 계심", desc: "인감도장·증명서 필요" }] },
  passport_minor_lost_normal: { type: "question", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "일반"], question: "부모님의 혼인·친권 상황은?", sub: "분실 신고(Police Report) 완료 후 아래 해당 케이스를 선택하세요.", options: [{ id: "passport_minor_lost_married", icon: "👫", title: "부모님이 혼인 중 (공동친권)", desc: "부모 중 1인이 방문 신청 가능" },{ id: "passport_minor_lost_divorced_sole", icon: "👤", title: "이혼 — 단독친권자 있음", desc: "단독친권자만 신청 가능" },{ id: "passport_minor_lost_divorced_joint", icon: "⚖️", title: "이혼 — 공동친권", desc: "양쪽 동의 필요" },{ id: "passport_minor_lost_single", icon: "🙋", title: "한부모 (사별 / 미혼)", desc: "생존 친권자 단독 신청" },{ id: "passport_minor_lost_korea_parent", icon: "🇰🇷", title: "법정대리인이 한국에 계심", desc: "인감도장·증명서 필요" }] },

  passport_minor_married: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "혼인중·공동친권"], title: "미성년자 여권 재발급 — 부모 혼인 중 (공동친권)", docs: ["여권발급신청서 (자녀 명의, 영사관 비치, 법정대리인 자필 작성)","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본 (PR카드 / 비자 / 시민권증서)","법정대리인 동의서 — 부모 2인 모두 인적사항 기입, 부모 중 1인 서명","방문하는 부 또는 모의 여권 원본","부·모 여권 사본 각 1부 (방문하지 않는 부 또는 모 포함)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 (전산 확인 불가 시)","만 5세 미만: 여권용 사진 2매 — 사진관 촬영본 지참 필수 (영사관 무료촬영 불가)","만 5세 이상: 영사관 무료촬영 가능 (사진 미지참 시 자녀 동반 필요)","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "DHL 특급 (선택)", value: "별도 DHL 요금" }], time: "약 3~4주 (DHL 특급 선택 시 약 2주)", notices: ["공동친권: 동의서에 부모 2인 모두 인적사항 기재 — 방문은 1인만 해도 됩니다.","1인 1예약 = 업무건수 기준 — 자녀 2명 신청 시 예약 2자리 필요.","캐나다 출생 자녀는 반드시 한국 출생신고 완료 후에만 여권 신청 가능.","사본은 흑백으로 밝게 복사 — 어둡거나 컬러 사본 접수 불가."], booking: "https://www.torbooking.com/book" },
  passport_minor_divorced_sole: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "이혼·단독친권"], title: "미성년자 여권 재발급 — 이혼 후 단독친권", docs: ["여권발급신청서 (자녀 명의, 영사관 비치, 단독친권자 자필 작성)","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 단독친권자만 인적사항 기입 및 서명","단독친권자 여권 원본","단독친권 확인 서류: 자녀 기본증명서(상세) — 친권자가 1인으로 명시된 것 (3개월 이내)","자녀 가족관계증명서 (상세) — 3개월 이내","이혼판결문 또는 협의이혼 확인서 사본 (친권자 지정 내용 포함, 영문 판결문은 번역 필요)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" },{ label: "DHL 특급 (선택)", value: "별도 DHL 요금" }], time: "약 3~4주 (DHL 특급 시 약 2주)", notices: ["단독친권자만 방문 신청 가능 — 비친권자(다른 부모)의 동의 불필요.","기본증명서(상세)에 단독친권자가 명확히 표기되어야 합니다.","이혼 판결문이 영문인 경우 자필 번역 가능 (번역자 성명·서명·날짜 기재).","캐나다 법원 공동양육 협정이 있더라도 한국 법상 단독친권자 기준으로 처리됩니다 — 불명확 시 사전 전화 상담 권장 (416-920-3809)."], booking: "https://www.torbooking.com/book" },
  passport_minor_divorced_joint: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "이혼·공동친권"], title: "미성년자 여권 재발급 — 이혼 후 공동친권", docs: ["여권발급신청서","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기입, 방문 친권자가 서명","방문하는 공동친권자 여권 원본","비방문 공동친권자 여권 사본 1부","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","공동친권 확인 서류: 이혼 판결문 또는 협의이혼 확인서 (공동친권 명시)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["공동친권: 양쪽 친권자 모두의 동의가 필요합니다 — 동의서에 2인 모두 기재.","한 쪽 친권자가 여권 발급에 반대(부동의 의사 표시)한 경우 발급이 제한될 수 있습니다.","비방문 친권자가 한국에 있는 경우 인감도장이 날인된 동의서 + 인감증명서 필요 — 사전 전화 상담 권장.","이혼 판결문 영문본은 자필 번역 가능 (번역자 성명·날짜 기재)."], booking: "https://www.torbooking.com/book" },
  passport_minor_single: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "한부모(사별·미혼)"], title: "미성년자 여권 재발급 — 한부모 (사별 또는 미혼)", docs: ["여권발급신청서","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 생존 친권자만 인적사항 기입 및 서명","생존 친권자 여권 원본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","사별의 경우: 사망한 부 또는 모의 사망증명서 (번역 필요 시 자필 번역)","미혼의 경우: 자녀 기본증명서에 친권자가 1인으로 표기된 것으로 확인 가능","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["사망증명서가 영문인 경우 자필 번역 가능 (번역자 성명·서명·날짜 기재).","기본증명서(상세)에 사망 또는 단독친권이 표기되어야 합니다.","불명확한 경우 방문 전 전화 상담 권장 (416-920-3809)."], booking: "https://www.torbooking.com/book" },
  passport_minor_korea_parent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "재발급", "법정대리인 한국"], title: "미성년자 여권 재발급 — 법정대리인이 한국에 거주", docs: ["여권발급신청서 (자녀 명의, 영사관 비치, 캐나다 측 성인이 대리 작성)","자녀 여권 원본 + 흑백 사본 1부","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 한국의 부 또는 모가 서명, 서명란에 반드시 인감도장 날인 (서명만 불가)","법정대리인 인감증명서 — 발급일로부터 6개월 이내","법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)","부·모 여권 사본 각 1부 (공동친권의 경우 두 분 모두)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만으로는 접수 불가.","인감증명서는 발급일로부터 6개월 이내 서류만 인정.","공동친권의 경우 두 분 모두의 인감도장·인감증명서 필요.","한국 서류는 방문 전 미리 준비해 오세요."], booking: "https://www.torbooking.com/book" },

  passport_minor_lost_korea_parent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "법정대리인 한국"], title: "미성년자 여권 분실 재발급 — 법정대리인이 한국에 거주", docs: ["여권발급신청서 (자녀 명의, 자필 작성)","여권 분실 신고서 (Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 한국의 부 또는 모가 서명, 서명란에 반드시 인감도장 날인","법정대리인 인감증명서 — 발급일로부터 6개월 이내","법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["⚠️ 경찰 분실 신고(Police Report) 먼저 완료 후 방문.","⚠️ 법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만으로는 접수 불가.","인감증명서는 발급일로부터 6개월 이내 서류만 인정.","공동친권의 경우 두 분 모두의 인감도장·인감증명서 필요."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_married: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "혼인중·공동친권"], title: "미성년자 여권 신규 발급 — 부모 혼인 중 (공동친권)", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 한국 발급본 (신규 발급 필수)","자녀 체류자격 증빙서류 원본 + 사본 (PR카드 / 비자 / 시민권증서 / 캐나다 출생증명서)","법정대리인 동의서 — 부모 2인 모두 인적사항 기입, 부모 중 1인 서명","방문하는 부 또는 모의 여권 원본","부·모 여권 사본 각 1부 (방문하지 않는 부 또는 모 포함)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 반드시 한국 출생신고 완료 후에만 여권 신청 가능.","기본증명서·가족관계증명서는 한국에서 발급해 오세요 (정부24 온라인 또는 주민센터).","신규 발급은 온라인 신청 불가 — 반드시 방문 신청.","공동친권: 동의서에 부모 2인 모두 기재, 방문은 1인으로 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_divorced_sole: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "이혼·단독친권"], title: "미성년자 여권 신규 발급 — 이혼 후 단독친권", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 (친권자 1인 명시)","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 단독친권자만 기입 및 서명","단독친권자 여권 원본","이혼판결문 또는 협의이혼 확인서 (단독친권 명시, 영문본은 자필 번역)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","기본증명서에 단독친권자가 명시되어야 합니다.","신규 발급은 반드시 방문 신청."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_divorced_joint: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "이혼·공동친권"], title: "미성년자 여권 신규 발급 — 이혼 후 공동친권", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기입, 방문 친권자 서명","방문하는 공동친권자 여권 원본 + 비방문 공동친권자 여권 사본","공동친권 확인: 이혼 판결문 또는 협의이혼 확인서 (공동친권 명시)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능","우편 수령 희망 시: 우편수령신청서 + Canada Post Xpresspost 봉투"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["공동친권: 양쪽 모두 동의 필요 — 한 쪽이 반대하면 발급 제한.","캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","신규 발급은 반드시 방문 신청."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_single: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "한부모"], title: "미성년자 여권 신규 발급 — 한부모 (사별 또는 미혼)", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 생존 친권자 기입 및 서명","생존 친권자 여권 원본","사별의 경우: 사망한 배우자의 사망증명서 (영문본은 자필 번역)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","기본증명서에 단독친권 또는 사망 사실이 표기되어야 합니다.","신규 발급은 반드시 방문 신청."], booking: "https://www.torbooking.com/book" },
  passport_minor_new_korea_parent: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "신규", "법정대리인 한국"], title: "미성년자 여권 신규 발급 — 법정대리인이 한국에 거주", docs: ["여권발급신청서","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내 한국 발급본","자녀 체류자격 증빙서류 원본 + 사본","법정대리인 동의서 — 서명란에 반드시 인감도장 날인 (서명만 불가)","법정대리인 인감증명서 — 발급일로부터 6개월 이내","법정대리인 신분증 사본 (한국 여권 / 운전면허증 / 주민등록증)","부·모 여권 사본 각 1부 (공동친권의 경우 두 분 모두)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["캐나다 출생 자녀는 한국 출생신고 완료 후 신청 가능.","법정대리인 동의서 서명란에 반드시 인감도장 날인 — 서명만 접수 불가.","인감증명서는 발급일로부터 6개월 이내.","공동친권의 경우 두 분 모두의 인감도장·인감증명서 필요."], booking: "https://www.torbooking.com/book" },

  passport_minor_lost_married: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "혼인중·공동친권"], title: "미성년자 여권 분실 재발급 — 부모 혼인 중", docs: ["여권발급신청서","여권 분실 신고서 (현지 경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 부모 2인 인적사항 기입, 1인 서명","방문하는 부 또는 모의 여권 원본 + 부·모 여권 사본 각 1부","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["반드시 경찰서 분실 신고(Police Report) 완료 후 방문하세요.","공동친권: 동의서에 부모 2인 모두 기재, 방문은 1인으로 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_lost_divorced_sole: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "이혼·단독친권"], title: "미성년자 여권 분실 재발급 — 이혼 후 단독친권", docs: ["여권발급신청서","여권 분실 신고서 (경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 단독친권자만 기입 및 서명","단독친권자 여권 원본","자녀 기본증명서 (상세) — 단독친권자 표기 확인 (3개월 이내)","자녀 가족관계증명서 (상세) — 3개월 이내","이혼판결문 또는 협의이혼 확인서 (단독친권 명시)","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["경찰 분실 신고(Police Report) 먼저 완료 후 방문.","단독친권자만 방문 신청 가능.","이혼 판결문 영문본은 자필 번역 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_lost_divorced_joint: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "이혼·공동친권"], title: "미성년자 여권 분실 재발급 — 이혼 후 공동친권", docs: ["여권발급신청서","여권 분실 신고서 (경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 공동친권자 2인 모두 인적사항 기입, 방문 친권자 서명","방문 친권자 여권 원본 + 비방문 친권자 여권 사본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","공동친권 확인: 이혼 판결문 또는 협의이혼 확인서","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["경찰 분실 신고(Police Report) 먼저 완료 후 방문.","공동친권: 양쪽 모두 동의 필요.","한 쪽이 여권 발급 반대 의사 표시를 한 경우 발급 제한 — 법원 명령이 있어야 가능."], booking: "https://www.torbooking.com/book" },
  passport_minor_lost_single: { type: "result", service: "passport", breadcrumb: ["홈", "여권", "미성년자", "분실", "한부모"], title: "미성년자 여권 분실 재발급 — 한부모 (사별 또는 미혼)", docs: ["여권발급신청서","여권 분실 신고서 (경찰서 발급 Police Report) — 방문 전 필수","자녀 체류자격 증빙서류 원본 + 흑백 사본","법정대리인 동의서 — 생존 친권자 기입 및 서명","생존 친권자 여권 원본","자녀 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","사별의 경우: 사망한 배우자의 사망증명서","만 5세 미만: 여권용 사진 2매 (사진관 촬영본), 만 5세 이상: 영사관 무료촬영 가능"], costs: [{ label: "일반여권 (58면)", value: "CAD $52.00 (현금)" },{ label: "알뜰여권 (26면)", value: "CAD $49.00 (현금)" }], time: "약 3~4주", notices: ["경찰 분실 신고(Police Report) 먼저 완료 후 방문.","기본증명서에 단독친권 또는 사망 사실이 표기되어야 합니다."], booking: "https://www.torbooking.com/book" },

  // ══ FAMILY REGISTER (가족관계등록) — 재설계된 트리 ══
  family_start: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록"],
    question: "어떤 업무가 필요하신가요?",
    sub: "신고 업무는 우편 접수도 가능합니다. 증명서 발급은 공동인증서가 있으면 정부24에서 온라인 무료 발급 가능합니다.",
    options: [
      { id: "family_cert", icon: "📄", title: "증명서 발급", desc: "기본증명서·가족관계증명서·혼인관계증명서 등 — 온라인/방문/우편" },
      { id: "family_birth", icon: "👶", title: "출생신고", desc: "캐나다 출생 자녀의 한국 등록부 등재" },
      { id: "family_marriage", icon: "💍", title: "혼인신고", desc: "캐나다에서 혼인한 경우 한국 등록부 반영" },
      { id: "family_divorce", icon: "📝", title: "이혼신고", desc: "캐나다 이혼 후 한국 등록부 반영" },
      { id: "family_death", icon: "🕊️", title: "사망신고", desc: "캐나다에서 사망한 한국 국민" },
      { id: "family_recognition", icon: "👨", title: "인지신고", desc: "혼인 외 출생 자녀를 부가 법적으로 인정" },
      { id: "family_adoption", icon: "🤝", title: "입양·파양신고", desc: "캐나다에서 진행된 입양 또는 파양" },
      { id: "family_other", icon: "📋", title: "기타 등록부 정정·변경", desc: "개명·등록기준지 변경·등록부 정정 등" },
    ],
  },

  // ── 증명서 발급 ──
  family_cert: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급"],
    question: "어떤 방법으로 발급받으시겠어요?",
    sub: "공동인증서가 있으면 정부24에서 즉시 무료 발급 가능합니다. 없으면 방문 또는 우편으로 신청하세요.",
    options: [
      { id: "family_cert_online", icon: "💻", title: "온라인 발급 (정부24)", desc: "공동인증서 필요 — 즉시·무료·영사관 방문 불필요" },
      { id: "family_cert_visit", icon: "🏛️", title: "방문 또는 우편 신청", desc: "공동인증서 없는 경우 — 수수료 현금 납부" },
    ],
  },

  family_cert_online: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "온라인"],
    title: "가족관계 증명서 온라인 발급 (정부24)",
    docs: [
      "공동인증서 (구 공인인증서) — 없으면 영사관에서 먼저 발급",
      "정부24 접속: www.gov.kr → 로그인 → 증명서 발급",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시 발급 (24시간)",
    notices: [
      "발급 가능 증명서: 기본증명서·가족관계증명서·혼인관계증명서·입양관계증명서·친양자입양관계증명서.",
      "일반용(주민번호 뒷자리 마스킹) / 상세용(주민번호 전부 공개) 선택 가능.",
      "공동인증서가 없다면 영사관 방문 1회로 발급받을 수 있습니다 (공동/금융 인증서 메뉴 참조).",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  family_cert_visit: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "증명서 발급", "방문·우편"],
    title: "가족관계 증명서 발급 — 방문 또는 우편 신청",
    docs: [
      "가족관계등록부 증명서 발급 신청서 (소정 양식)",
      "신청인 여권 원본 (방문 시) 또는 변호사 공증 사본 (우편 시)",
      "캐나다 체류자격 증빙서류 원본 또는 변호사 공증 사본",
      "수수료 현금 (우편 시 현금 동봉 — 카드·이체 불가)",
      "  ▸ 우편 수령 시: Canada Post Xpresspost 봉투 동봉 필수",
    ],
    costs: [
      { label: "증명서 1통당", value: "CAD $1.00~(종류별 상이, 현금만 가능)" },
    ],
    time: "방문: 3~4일 후 수령 / 우편: 7~10일 소요",
    notices: [
      "발급 가능 증명서: 기본증명서·가족관계증명서·혼인관계증명서·입양관계증명서·친양자입양관계증명서.",
      "일반용(주민번호 일부 마스킹) / 상세용(주민번호 전부 공개) 신청 시 구분하여 요청하세요.",
      "⚠️ 수수료는 반드시 현금으로만 납부 — 카드·이체 불가.",
      "⚠️ 우편 신청 시: 온타리오·마니토바주 변호사 공증 사본만 인정. 우편 분실에 대해 영사관은 책임지지 않습니다.",
      "수령 후 6개월 이내 픽업 — 이후 개인정보 보호 목적으로 파쇄됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  // ── 출생신고 ──
  family_birth: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "출생신고"],
    question: "부모의 국적 구성은?",
    sub: "부모 국적에 따라 필요 서류와 절차가 달라집니다. 혼인신고가 아직 안 된 경우 혼인신고를 먼저 완료해야 합니다.",
    options: [
      { id: "family_birth_korean", icon: "🇰🇷", title: "부모 모두 한국인", desc: "혼인신고 완료 필수" },
      { id: "family_birth_mixed", icon: "🌏", title: "한국인 + 외국인 부모", desc: "외국인 배우자 서류 추가 필요" },
      { id: "family_birth_unmarried", icon: "👤", title: "미혼 한국인 부 또는 모", desc: "혼인신고 없이 출생신고 — 인지신고 병행 가능" },
    ],
  },

  family_birth_korean: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "출생신고", "부모 모두 한국인"],
    title: "출생신고 — 부모 모두 한국인",
    docs: [
      "출생신고서 (소정 양식 — 예제 반드시 확인 후 작성, 오기재 시 반송됨)",
      "자녀의 캐나다 출생증명서 (Birth Certificate 또는 Statement of Live Birth) 원본 + 사본",
      "부모 여권 원본 + 사본 (각 1부)",
      "부모 혼인관계증명서 (상세) — 3개월 이내 (한국 혼인신고 완료 후 발급)",
      "부모 체류자격 증빙서류 원본 + 사본",
      "  ▸ 자녀 동반 불필요 — 부 또는 모 단독 방문 신청 가능",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록 완료까지 약 4주",
    notices: [
      "⚠️ 한국 혼인신고가 완료된 경우에만 출생신고 가능합니다.",
      "혼인신고 후 출생신고는 혼인신고 처리 완료(약 4주) 이후 접수 가능합니다.",
      "출생신고 완료 후 여권 신청이 가능합니다.",
      "신고서 작성 오류(미기재·오기재)로 반송되는 사례가 많으니 예제를 반드시 확인하세요.",
      "우편 접수 가능 (온타리오·마니토바주 변호사 공증 사본 허용).",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  family_birth_mixed: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "출생신고", "한국인+외국인 부모"],
    title: "출생신고 — 한국인 + 외국인 부모",
    docs: [
      "출생신고서 (소정 양식 — 예제 반드시 확인 후 작성)",
      "자녀의 캐나다 출생증명서 원본 + 사본",
      "한국인 부모 여권 원본 + 사본",
      "외국인 부모 여권 원본 + 사본",
      "  ▸ 외국인 부모 성명·생년월일·국적 정확히 기재",
      "한국인 부모 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "혼인관계증명서 (상세) — 3개월 이내 (한국 혼인신고 완료 시)",
      "한국인 부모 체류자격 증빙서류",
      "  ▸ 캐나다 혼인증명서 (Marriage Certificate) 원본 + 번역본 (한국 혼인신고 미완료 시)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록 완료까지 약 4주",
    notices: [
      "한국 혼인신고가 아직 안 된 경우: 캐나다 혼인증명서 + 번역본으로 출생신고와 동시에 접수 가능.",
      "외국인 배우자의 국적·성명·생년월일은 여권 기준으로 정확하게 기재하세요.",
      "자녀 동반 불필요 — 한국인 부 또는 모 단독 방문 신청 가능.",
      "출생신고 완료 후 자녀 여권 신청 가능.",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  family_birth_unmarried: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "출생신고", "미혼 부 또는 모"],
    title: "출생신고 — 미혼 부 또는 모 (혼인 외 출생)",
    docs: [
      "출생신고서 (소정 양식)",
      "자녀의 캐나다 출생증명서 원본 + 사본",
      "신고인(부 또는 모) 여권 원본 + 사본",
      "신고인 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "신고인 체류자격 증빙서류",
      "  ▸ 부가 신고하는 경우: 모의 동의서 또는 재판 확정 판결문 필요 (해당 시)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록 완료까지 약 4주",
    notices: [
      "혼인 외 출생 자녀는 모의 등록부에 우선 등재됩니다.",
      "부가 자녀를 법적으로 인정하려면 인지신고를 별도로 진행해야 합니다 (인지신고 메뉴 참조).",
      "출생신고 완료 후 자녀 여권 신청 가능.",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
  },

  // ── 혼인신고 ──
  family_marriage: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "혼인신고"],
    question: "배우자 국적은?",
    sub: "혼인한 지역의 관할 영사관에 신고해야 합니다. 온타리오·마니토바주 혼인 → 주토론토 총영사관.",
    options: [
      { id: "family_marriage_korean", icon: "🇰🇷", title: "한국인 + 한국인", desc: "양쪽 모두 한국 국적인 경우" },
      { id: "family_marriage_mixed", icon: "🌏", title: "한국인 + 외국인", desc: "배우자 중 한 명이 외국 국적인 경우" },
    ],
  },

  family_marriage_korean: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "혼인신고", "한국인+한국인"],
    title: "혼인신고 — 한국인 + 한국인",
    docs: [
      "혼인신고서 (소정 양식 — 예제 반드시 확인 후 작성)",
      "당사자 각자의 여권 원본 + 사본",
      "캐나다 혼인증명서 (Marriage Certificate) 원본",
      "혼인증명서 번역본 (자필 번역 가능 — 번역자 성명·서명·연락처·날짜 필수)",
      "당사자 각자의 체류자격 증빙서류",
      "  ▸ 자녀의 성을 모의 성으로 할 경우: '자녀의 성본 협의서' 추가 (영사관 홈페이지 다운로드)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 약 4주",
    notices: [
      "⚠️ 신고서 오기재·미기재로 반송되는 사례가 많습니다 — 예제를 반드시 먼저 확인하세요.",
      "혼인이 성립한 지역 관할 영사관에 신고해야 합니다:",
      "  ▸ 온타리오·마니토바주 → 주토론토 총영사관",
      "  ▸ 노바스코시아주 → 주몬트리올 총영사관",
      "  ▸ 타 지역 거주자는 재외국민 가족관계등록사무소(한국 법원)에도 신고 가능.",
      "혼인신고 완료 후 출생신고가 필요한 경우, 혼인신고 처리 완료(약 4주) 이후 접수 가능.",
      "우편 접수 가능 (온타리오·마니토바주 변호사 공증 사본 허용).",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  family_marriage_mixed: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "혼인신고", "한국인+외국인"],
    title: "혼인신고 — 한국인 + 외국인",
    docs: [
      "혼인신고서 (소정 양식 — 예제 반드시 확인 후 작성)",
      "한국인 당사자 여권 원본 + 사본",
      "외국인 배우자 여권 원본 + 사본",
      "캐나다 혼인증명서 (Marriage Certificate) 원본",
      "혼인증명서 번역본 (자필 번역 가능 — 번역자 성명·서명·연락처·날짜 필수)",
      "한국인 당사자 체류자격 증빙서류",
      "외국인 배우자 체류자격 증빙서류",
      "  ▸ 외국인 배우자의 성명·생년월일·국적은 여권 기준으로 정확히 기재",
      "  ▸ 자녀의 성을 모의 성으로 할 경우: '자녀의 성본 협의서' 추가",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 약 4주",
    notices: [
      "⚠️ 신고서 오기재·미기재로 반송되는 사례가 많습니다 — 예제를 반드시 먼저 확인하세요.",
      "혼인지 관할 영사관에 신고 — 온타리오·마니토바주 혼인 → 주토론토 총영사관.",
      "외국인 배우자의 정보(이름·생년월일·국적)는 여권 원문 기준으로 기재하세요.",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  // ── 이혼신고 ──
  family_divorce: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "이혼신고"],
    title: "이혼신고",
    docs: [
      "이혼신고서 (소정 양식)",
      "당사자 여권 원본 + 사본",
      "캐나다 이혼판결문 (Certificate of Divorce 또는 Final Divorce Order) 원본",
      "이혼판결문 번역본 (자필 번역 가능 — 번역자 성명·서명·연락처·날짜 필수)",
      "당사자 체류자격 증빙서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 수 주",
    notices: [
      "이혼 성립 지역의 관할 영사관에 신고하는 것을 권장합니다.",
      "번역은 전문 번역사 불필요 — 자필 번역 가능 (번역자 성명·서명·연락처·날짜 기재 필수).",
      "우편 접수 가능 (온타리오·마니토바주 변호사 공증 사본 허용).",
      "이혼 후 미성년 자녀의 친권·양육권 내용도 이혼판결문에 포함되어 있어야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  // ── 사망신고 ──
  family_death: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "사망신고"],
    title: "사망신고",
    docs: [
      "사망신고서 (소정 양식)",
      "고인의 한국 여권 사본 (없는 경우 기본증명서)",
      "캐나다 사망진단서 (Death Certificate) 원본",
      "사망진단서 번역본 (자필 번역 가능 — 번역자 성명·서명·연락처·날짜 필수)",
      "신고인 여권 원본 + 사본",
      "신고인 체류자격 증빙서류",
      "신고인과 고인의 가족관계 증명서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 수 주",
    notices: [
      "신고인은 고인의 가족(배우자·직계존비속·형제자매 등)이어야 합니다.",
      "번역은 자필 번역 가능 (번역자 성명·서명·연락처·날짜 기재 필수).",
      "우편 접수 가능.",
      "사망신고 완료 후 상속·국적 관련 업무 처리 시 기본증명서에 사망 사실이 반영됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  // ── 인지신고 (신규) ──
  family_recognition: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "인지신고"],
    title: "인지신고 — 혼인 외 출생 자녀의 법적 부자관계 설정",
    docs: [
      "인지신고서 (소정 양식)",
      "신고인(부) 여권 원본 + 사본",
      "신고인(부) 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "자녀의 캐나다 출생증명서 원본 + 사본",
      "자녀 기본증명서 (출생신고 완료 후)",
      "신고인(부) 체류자격 증빙서류",
      "  ▸ 피인지자(자녀)가 성년인 경우: 자녀의 동의서 추가 필요",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 수 주",
    notices: [
      "인지신고는 혼인 외 출생 자녀를 법적으로 부가 인정하는 신고입니다.",
      "인지신고 전에 자녀의 출생신고가 먼저 완료되어 있어야 합니다.",
      "피인지자(자녀)가 미성년자인 경우: 인지신고 완료 후 법무부장관에게 국적취득신고를 해서 한국 국적 취득 가능.",
      "피인지자(자녀)가 성년자인 경우: 특별귀화 요건 충족 후 법무부에 귀화허가 신청.",
      "방문 신청 권장 — 서류 구성이 복잡하므로 방문 전 전화 상담 권장 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 인지신고) →",
  },

  // ── 입양·파양신고 (신규) ──
  family_adoption: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "입양·파양신고"],
    question: "입양인가요, 파양인가요?",
    sub: "캐나다에서 진행된 입양·파양을 한국 가족관계등록부에 반영하는 신고입니다.",
    options: [
      { id: "family_adoption_new", icon: "🤝", title: "입양신고", desc: "캐나다 법원 입양 결정을 한국 등록부에 반영" },
      { id: "family_adoption_cancel", icon: "📝", title: "파양신고", desc: "입양 관계 해소를 한국 등록부에 반영" },
    ],
  },

  family_adoption_new: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "입양·파양신고", "입양신고"],
    title: "입양신고",
    docs: [
      "입양신고서 (소정 양식)",
      "양부모 여권 원본 + 사본",
      "양부모 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "양부모 체류자격 증빙서류",
      "캐나다 법원 입양 결정문 (Adoption Order) 원본",
      "입양 결정문 번역본 (자필 번역 가능 — 번역자 성명·서명·연락처·날짜 필수)",
      "자녀의 캐나다 출생증명서 원본 + 사본",
      "  ▸ 자녀가 한국 국적인 경우: 자녀 기본증명서·가족관계증명서 추가",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 수 주",
    notices: [
      "입양 전 자녀가 한국 국적자인 경우: 입양신고 완료 후 등록부에 양부모 정보가 반영됩니다.",
      "입양 전 자녀가 외국 국적자인 경우: 입양신고와 별도로 국적취득 절차가 필요합니다.",
      "서류 구성이 복잡하므로 방문 전 전화 상담 권장 (416-920-3809).",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 입양신고) →",
  },

  family_adoption_cancel: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "입양·파양신고", "파양신고"],
    title: "파양신고",
    docs: [
      "파양신고서 (소정 양식)",
      "당사자(양부모 또는 양자녀) 여권 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "캐나다 법원 파양 결정문 원본",
      "파양 결정문 번역본 (자필 번역 가능)",
      "체류자격 증빙서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 수 주",
    notices: [
      "서류 구성이 복잡하므로 방문 전 전화 상담 권장 (416-920-3809).",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 파양신고) →",
  },

  // ── 기타 등록부 정정·변경 (신규) ──
  family_other: {
    type: "question",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기타"],
    question: "어떤 업무인가요?",
    sub: "아래 업무들은 모두 법원 허가 또는 별도 절차가 필요합니다. 방문 전 전화 상담을 권장합니다.",
    options: [
      { id: "family_name_change", icon: "✏️", title: "개명 허가 신청", desc: "이름 변경 — 법원 허가 필요" },
      { id: "family_register_fix", icon: "🔧", title: "가족관계등록부 정정 허가 신청", desc: "등록부 오류 수정 — 법원 허가 필요" },
      { id: "family_base_change", icon: "📍", title: "등록기준지(구 본적) 변경 신고", desc: "등록기준지를 다른 주소로 변경" },
    ],
  },

  family_name_change: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기타", "개명 허가 신청"],
    title: "개명 허가 신청",
    docs: [
      "개명 허가 신청서 (소정 양식)",
      "본인 여권 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "체류자격 증빙서류",
      "개명 사유서 (자필 작성)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "법원 심사 후 결정 (수 주~수 개월)",
    notices: [
      "개명은 영사관이 최종 결정하지 않고 한국 법원의 허가가 필요합니다.",
      "영사관은 서류를 접수·송부하는 역할을 합니다.",
      "허가 후 개명 신고를 별도로 진행해야 등록부에 반영됩니다.",
      "방문 전 전화 상담 권장 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 개명) →",
  },

  family_register_fix: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기타", "등록부 정정"],
    title: "가족관계등록부 정정 허가 신청",
    docs: [
      "가족관계등록부 정정 허가 신청서 (소정 양식)",
      "본인 여권 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "체류자격 증빙서류",
      "정정 사유 및 정정 내용 증빙서류 (오류임을 증명하는 서류)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "법원 심사 후 결정",
    notices: [
      "등록부 오류(이름 오기재·생년월일 오류 등) 수정을 위해 법원 허가가 필요합니다.",
      "영사관은 서류 접수·송부 역할을 합니다.",
      "방문 전 전화 상담 권장 (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 등록부 정정) →",
  },

  family_base_change: {
    type: "result",
    service: "family",
    breadcrumb: ["홈", "가족관계등록", "기타", "등록기준지 변경"],
    title: "등록기준지(구 본적) 변경 신고",
    docs: [
      "등록기준지 변경 신고서 (소정 양식)",
      "본인 여권 원본 + 사본",
      "기본증명서 (상세) — 3개월 이내",
      "체류자격 증빙서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 후 등록부 반영까지 수 주",
    notices: [
      "등록기준지는 한국 내 행정구역 주소로 변경 가능합니다.",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (가족관계 → 등록기준지 변경) →",
  },

  // ══ NATIONALITY (국적) — 재설계된 트리 ══
  nationality_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적"],
    question: "국적 관련해서 어떤 상황이신가요?",
    sub: "정확한 안내를 위해 본인 상황에 가장 가까운 것을 선택해 주세요.",
    options: [
      { id: "nationality_want_give_up", icon: "🍁", title: "한국 국적 포기", desc: "캐나다 시민권 취득 후 국적 정리, 또는 선천적 복수국적자 국적 이탈" },
      { id: "nationality_want_keep", icon: "🇰🇷", title: "한국 국적 유지", desc: "복수국적 유지 신고, 또는 국적선택 (한국 선택)" },
      { id: "nationality_want_recover", icon: "🔄", title: "한국 국적 회복", desc: "과거 시민권 취득으로 국적 상실 후 다시 한국 국적 취득" },
    ],
  },

  // ── 포기 분기 ──
  nationality_want_give_up: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적 포기"],
    question: "어떤 경우에 해당하시나요?",
    sub: "취득 경위에 따라 신고 종류가 달라집니다.",
    options: [
      { id: "nationality_loss", icon: "🍁", title: "내가 직접 캐나다 시민권을 취득했어요 (후천적)", desc: "한국에서 태어나 이민 후 시민권 취득 → 국적상실 신고" },
      { id: "nationality_renounce_check", icon: "👶", title: "태어날 때부터 한국+캐나다 이중국적이었어요 (선천적)", desc: "캐나다에서 출생 또는 부모 중 한 명이 한국인 → 국적이탈 신고" },
    ],
  },

  // ── 국적이탈 성별/나이 분기 ──
  nationality_renounce_check: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적 포기", "국적이탈 (선천적 복수국적)"],
    question: "성별과 현재 나이는?",
    sub: "성별과 나이에 따라 국적이탈 신청 가능 여부와 절차가 달라집니다.",
    options: [
      { id: "nationality_renounce_female", icon: "👩", title: "여성 — 만 22세 생일 이전", desc: "국적이탈 신고 가능 기간" },
      { id: "nationality_renounce_female_over22", icon: "👩", title: "여성 — 만 22세 생일 이후", desc: "국적선택명령 대상 — 특수 절차 안내" },
      { id: "nationality_renounce_male_under18", icon: "👨", title: "남성 — 만 18세가 되는 해 3월 31일 이전", desc: "국적이탈 신고 가능 기간" },
      { id: "nationality_renounce_male_over18", icon: "👨", title: "남성 — 만 18세가 되는 해 3월 31일 이후", desc: "병역 해소 여부에 따라 달라짐" },
    ],
  },

  // ── 국적이탈: 여성 만 22세 이전 ──
  nationality_renounce_female: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈", "여성·22세 이전"],
    title: "국적이탈 신고 — 선천적 복수국적 여성 (만 22세 생일 이전)",
    docs: [
      "국적이탈신고서 (소정 양식)",
      "본인 한국 여권 원본 + 사본 (없는 경우 기본증명서로 대체 가능 — 사전 문의)",
      "캐나다 여권 원본 + 사본",
      "캐나다 출생증명서 (Certified Copy of Birth Registration) 원본 + 사본",
      "기본증명서 (상세, 주민번호 전부 공개) — 3개월 이내",
      "가족관계증명서 (상세) — 3개월 이내",
      "부모 기본증명서 + 가족관계증명서 (상세) 각 1부 — 3개월 이내",
      "  ▸ 부 또는 모가 캐나다 시민권 취득 후 국적상실신고 미완료 시 → 부모 국적상실신고 동시 접수 필요",
      "  ▸ 만 15세 미만: 법정대리인(부 또는 모) 동반 방문 필수",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 완료까지 약 3~6개월 (법무부 심사)",
    notices: [
      "⚠️ 신청 기한: 만 22세 생일 이전까지 — 이 기간을 초과하면 국적선택명령 대상이 됩니다.",
      "반드시 본인 직접 방문 신청 (우편 불가). 만 15세 이상은 본인 서명 필수.",
      "부모 중 한 명이 시민권 취득 후 국적상실신고를 하지 않은 경우, 자녀 국적이탈 신고 전에 부모 국적상실신고를 먼저 또는 동시에 처리해야 합니다.",
      "국적이탈 완료 후 한국 여권은 즉시 사용 불가 — 반납 또는 폐기 필요.",
      "처리 결과는 기본증명서에 반영되며, 이후 비자(F-4 등) 신청 시 활용 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈) →",
  },

  // ── 국적이탈: 여성 만 22세 이후 ──
  nationality_renounce_female_over22: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈", "여성·22세 이후"],
    title: "국적이탈 신고 — 여성, 만 22세 생일 이후 (국적선택명령 대상)",
    docs: [
      "방문 전 반드시 전화 상담 필수 — 개인 상황에 따라 절차가 다릅니다",
      "  ▸ 국적과 직통: 416-920-3809",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "개인 상황에 따라 상이",
    notices: [
      "⚠️ 만 22세 생일을 지나면 법무부로부터 국적선택명령을 받는 대상이 됩니다.",
      "국적선택명령을 받은 후 1년 이내에는 국적이탈 또는 국적선택(한국 유지)을 해야 합니다.",
      "국적선택명령을 이행하지 않으면 그 기간 종료 시 한국 국적이 자동 상실됩니다.",
      "이미 국적선택명령을 받은 경우에도 명령 이행 기간 내에는 국적이탈 신고가 가능합니다 — 사전 전화 상담 후 방문하세요.",
      "22세 이후에도 아직 국적선택명령을 받지 않은 경우: 곧 받을 예정이므로 조속히 영사관에 문의하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 상담) →",
  },

  // ── 국적이탈: 남성 만 18세 3월31일 이전 ──
  nationality_renounce_male_under18: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈", "남성·18세 이전"],
    title: "국적이탈 신고 — 선천적 복수국적 남성 (만 18세 되는 해 3월 31일 이전)",
    docs: [
      "국적이탈신고서 (소정 양식)",
      "본인 한국 여권 원본 + 사본 (없는 경우 기본증명서로 대체 가능 — 사전 문의)",
      "캐나다 여권 원본 + 사본",
      "캐나다 출생증명서 (Certified Copy of Birth Registration) 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "부모 기본증명서 + 가족관계증명서 (상세) — 3개월 이내",
      "  ▸ 부 또는 모가 캐나다 시민권 취득 후 국적상실신고 미완료 시 → 동시 접수 필요",
      "  ▸ 만 15세 미만: 법정대리인(부 또는 모) 동반 방문 필수",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 완료까지 약 3~6개월 (법무부 심사)",
    notices: [
      "⚠️ 신청 기한: 만 18세가 되는 해의 3월 31일까지 — 이 기간 초과 시 병역 해소 전까지 국적이탈 불가.",
      "단, '직계존속이 영주 목적 없이 체류 중 출생한 복수국적자'가 병역 기피 목적으로 허위 서류를 제출하는 경우 접수 거부 가능.",
      "반드시 본인 직접 방문 (우편 불가). 만 15세 이상 본인 서명 필수.",
      "부모 중 한 명이 국적상실신고 미완료 시, 자녀 국적이탈과 동시에 부모 국적상실도 처리해야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈) →",
  },

  // ── 국적이탈: 남성 만 18세 이후 ──
  nationality_renounce_male_over18: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈", "남성·18세 이후"],
    question: "병역 상황은 어떻게 되시나요?",
    sub: "만 18세가 되는 해 3월 31일 이후에는 병역 해소 여부에 따라 처리 방법이 달라집니다.",
    options: [
      { id: "nationality_renounce_male_discharged", icon: "✅", title: "병역을 마쳤거나 면제받았어요", desc: "현역·상근·보충역 복무 완료 또는 면제·제2국민역 편입" },
      { id: "nationality_renounce_male_pending", icon: "⚠️", title: "아직 병역을 마치지 않았어요", desc: "현재 병역 미필 상태" },
    ],
  },

  nationality_renounce_male_discharged: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈", "남성·병역완료"],
    title: "국적이탈 신고 — 남성, 병역 해소 후 (2년 이내 신청 필수)",
    docs: [
      "국적이탈신고서 (소정 양식)",
      "본인 한국 여권 원본 + 사본",
      "캐나다 여권 원본 + 사본",
      "캐나다 출생증명서 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "부모 기본증명서 + 가족관계증명서 (상세) — 3개월 이내",
      "병역 해소 증빙서류 (병적증명서 또는 전역증 사본)",
      "  ▸ 부 또는 모 국적상실신고 미완료 시 → 동시 접수 필요",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 완료까지 약 3~6개월",
    notices: [
      "⚠️ 병역 사유 소멸일(전역일·면제처분일·제2국민역 편입일)로부터 2년 이내에 신청해야 합니다.",
      "2년을 초과하면 국적이탈이 불가하며, 국적선택(한국 유지) 신고만 가능합니다.",
      "반드시 본인 직접 방문.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈) →",
  },

  nationality_renounce_male_pending: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적이탈", "남성·병역미필"],
    title: "국적이탈 불가 — 병역 미필 남성 (만 18세 이후)",
    docs: [],
    costs: [{ label: "수수료", value: "해당 없음" }],
    time: "병역 해소 후 2년 이내 신청 가능",
    notices: [
      "⚠️ 만 18세가 되는 해 3월 31일 이후 병역을 마치지 않은 경우, 국적이탈 신고가 불가합니다.",
      "병역을 마치거나 면제·제2국민역 편입 처분을 받은 날로부터 2년 이내에 국적이탈 신고를 할 수 있습니다.",
      "현재 선택 가능한 옵션: ① 병역 이행 후 국적이탈 ② 국적선택 신고(한국 국적 유지).",
      "재외국민2세 국외여행허가(병무 메뉴 참고)를 통해 병역을 만 37세까지 연기할 수 있습니다.",
      "개인 상황에 따라 다를 수 있으니 방문 전 영사관 국적과(416-920-3809)에 전화 상담을 권장합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 →",
  },

  // ── 국적상실 신고 (후천적) ──
  nationality_loss: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적 포기", "국적상실 신고"],
    title: "국적상실 신고 — 캐나다 시민권 취득 후",
    docs: [
      "국적상실신고서 (소정 양식)",
      "캐나다 여권 원본 + 사본",
      "캐나다 시민권증서 원본 + 사본",
      "한국 여권 원본 + 사본 (없는 경우 기본증명서로 대체)",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "캐나다 체류자격 증빙서류",
      "  ▸ 우편 신청 시: 원본 대신 온타리오/마니토바 변호사 공증 사본 제출 가능",
      "  ▸ 우편 발송 시: 반송용 Canada Post Xpresspost 봉투 동봉 필수",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "신고 처리 후 가족관계등록부 반영까지 수 주",
    notices: [
      "캐나다 시민권 취득일로부터 1개월 이내 신고 권고 (미신고 시 벌금 없음).",
      "⚠️ 시민권 취득 후 한국 여권 사용은 법적으로 불가합니다.",
      "미성년 자녀가 함께 캐나다 시민권을 취득한 경우, 부모 국적상실신고 시 자녀도 함께 신고해야 합니다.",
      "국적상실신고 완료 후 F-4 재외동포 비자 신청이 가능합니다.",
      "우편 신청 가능 (온타리오/마니토바 변호사 공증 사본 허용).",
    ],
    booking: "https://www.torbooking.com/book",
    postalInfo: "가족관계/국적과\nConsulate General of the Republic of Korea\n555 Avenue Road, Toronto, ON M4V 2J7",
  },

  // ── 유지 분기 ──
  nationality_want_keep: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "한국 국적 유지"],
    question: "어떤 상황이신가요?",
    sub: "복수국적을 유지하는 방법은 상황에 따라 다릅니다.",
    options: [
      { id: "nationality_retain", icon: "✅", title: "국적보유 신고 (복수국적 유지)", desc: "국적보유 신고 또는 국적선택(한국 선택)" },
      { id: "nationality_choice", icon: "🔄", title: "국적선택 신고 (한국 선택)", desc: "외국국적불행사서약으로 한국 국적 유지" },
    ],
  },

  nationality_retain: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "한국 국적 유지", "국적보유 신고"],
    title: "국적보유 신고 — 복수국적 유지",
    docs: [
      "국적보유신고서 (소정 양식)",
      "한국 여권 원본 + 사본",
      "캐나다 여권 + 시민권증서 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
      "캐나다 체류자격 증빙서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 완료까지 수 주",
    notices: [
      "국적보유신고는 '본인의 의지와 관계없이' 외국 국적을 취득했으나 시한 내에 신고하지 않은 경우 해당합니다.",
      "국적보유 신고 완료 후 여권 신청 시 국적보유 통지서를 지참하세요.",
      "반드시 직접 방문 신청 (우편 불가).",
      "복수국적 허용 대상: 만 65세 이상 영주귀국자, 우수인재, 결혼이민자 등 — 해당 여부는 방문 전 국적과에 문의.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적보유) →",
  },

  nationality_choice: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "한국 국적 유지", "국적선택 (한국 선택)"],
    title: "국적선택 신고 — 한국 국적 선택 (외국국적불행사서약)",
    docs: [
      "국적선택신고서 (소정 양식)",
      "한국 여권 원본 + 사본",
      "캐나다 여권 + 시민권증서 원본 + 사본",
      "기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "처리 완료까지 약 3~6개월",
    notices: [
      "국적선택(한국 선택) 완료 후 대한민국 국내에서는 외국 국적을 행사할 수 없습니다 (외국국적불행사서약).",
      "즉, 캐나다 국적은 유지되지만 한국 내에서는 한국 국민으로만 행동해야 합니다.",
      "반드시 직접 방문 신청 (우편 불가). 만 15세 이상은 본인 서명 필수.",
      "처리 완료 후 기본증명서에 국적선택이 표기됩니다.",
      "⚠️ 국적선택명령을 받은 경우 명령 이행 기간 내에 신청해야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택) →",
  },

  // ── 국적회복 분기 ──
  nationality_want_recover: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "한국 국적 회복"],
    question: "현재 나이가 만 65세 이상이신가요?",
    sub: "나이에 따라 국적회복 절차와 복수국적 허용 여부가 달라집니다.",
    options: [
      { id: "nationality_recover_65", icon: "🏠", title: "만 65세 이상 — 복수국적 허용", desc: "한국 영주귀국 목적 — 복수국적 허용 (캐나다 국적 유지 가능)" },
      { id: "nationality_recover_under65", icon: "📋", title: "만 65세 미만 — 외국 국적 포기 원칙", desc: "원칙적으로 외국 국적 포기 후 국적회복 가능 — 예외 케이스 있음" },
    ],
  },

  nationality_recover_65: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "한국 국적 회복", "만 65세 이상"],
    title: "국적회복 — 만 65세 이상 영주귀국 희망자 (복수국적 허용)",
    docs: [
      "⚠️ 국적회복 신청은 반드시 한국 내 출입국사무소에서만 가능 — 영사관 접수 불가",
      "  ▸ 한국 방문 후 아래 절차 진행",
      "1단계: 국적상실신고 (미완료 시) — 한국 출입국사무소 또는 총영사관",
      "2단계: 한국 입국 후 외국국적동포 거소신고 — 체류지 관할 출입국사무소",
      "3단계: 국적회복허가 신청 — 체류지 관할 출입국사무소",
      "  ▸ 국적회복허가신청서 (컬러사진 4×5cm 부착)",
      "  ▸ 본인 기본증명서 + 가족관계증명서",
      "  ▸ 캐나다 여권 + 시민권증서",
      "  ▸ RCMP 범죄경력증명서 (지문 기반, 아포스티유 필요) — 6개월 이내",
      "  ▸ 주민등록 말소자등본",
      "4단계: 국적회복 허가 통지서 수령 후 외국국적불행사서약서 제출",
      "5단계: 국적 회복 완료 → 주민등록 신청 및 한국 여권 발급",
    ],
    costs: [{ label: "수수료", value: "무료 (한국 출입국사무소 처리)" }],
    time: "전체 약 7~8개월 소요",
    notices: [
      "⚠️ 영사관에서는 국적회복 신청을 접수하지 않습니다 — 반드시 한국 방문 후 현지 출입국사무소에서 신청.",
      "2011년 1월 1일부터 만 65세 이상 영주귀국 희망자는 캐나다 국적을 포기하지 않고도 한국 국적 회복이 가능합니다 (복수국적 허용).",
      "국적상실신고가 가족관계등록부에 반영되지 않은 경우, 국적상실신고와 국적회복 신청을 동시에 접수할 수 있습니다.",
      "국적회복 완료 후 한국 여권과 캐나다 여권 모두 소지 필요 — 한국 입출국 시 한국 여권, 캐나다 입출국 시 캐나다 여권 사용.",
      "사전 상담: 영사관 국적과 416-920-3809 또는 법무부 국적과 (한국 내).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 상담 예약하기 →",
  },

  nationality_recover_under65: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "한국 국적 회복", "만 65세 미만"],
    title: "국적회복 — 만 65세 미만 (원칙: 외국 국적 포기 필요)",
    docs: [
      "⚠️ 국적회복 신청은 반드시 한국 내 출입국사무소에서만 가능 — 영사관 접수 불가",
    ],
    costs: [{ label: "수수료", value: "무료 (한국 출입국사무소 처리)" }],
    time: "개인 상황에 따라 상이",
    notices: [
      "만 65세 미만의 경우 원칙적으로 캐나다 국적을 포기해야 한국 국적 회복이 가능합니다.",
      "단, 아래 예외 케이스는 복수국적(외국국적불행사서약) 방식으로 국적 회복 가능합니다:",
      "  ① 우수 외국인 인재 또는 대한민국에 특별한 공로가 있는 자",
      "  ② 대한민국 민법상 성년 전 외국인에게 입양된 후 외국에서 계속 거주한 자 (해외 기관 입양)",
      "위 예외에 해당하지 않는 경우, 한국 국적 회복 = 캐나다 국적 포기를 의미합니다.",
      "본인 상황에 맞는 정확한 안내를 위해 방문 전 영사관 국적과(416-920-3809) 또는 법무부 국적과에 먼저 상담하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 상담 예약하기 →",
  },

  // ══ CERTIFICATE (공동/금융 인증서) — 재설계된 트리 ══
  cert_start: {
    type: "question",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서"],
    question: "어떤 인증서가 필요하신가요?",
    sub: "공동인증서와 금융인증서 모두 영사관 방문 1회로 신청합니다. 방문 후 이메일로 안내를 받아 집/사무실 컴퓨터에서 다운로드합니다.",
    options: [
      { id: "cert_joint_who", icon: "🔐", title: "공동인증서 (구 공인인증서)", desc: "전자민원·가족관계증명서 온라인 발급·인터넷뱅킹·연말정산 등" },
      { id: "cert_financial_who", icon: "🏦", title: "금융인증서", desc: "인터넷뱅킹 전용 — 2024.5.1부터 영사관 신청 가능" },
      { id: "cert_nonface", icon: "📱", title: "비대면 앱 신청", desc: "영사관 방문 없이 스마트폰 앱으로 발급 — 전자여권 필수" },
    ],
  },

  // ── 공동인증서 성인/미성년 분기 ──
  cert_joint_who: {
    type: "question",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "공동인증서"],
    question: "신청자가 성인인가요, 미성년자인가요?",
    sub: "미성년자(만 19세 미만)는 법정대리인(대한민국 국적자)이 반드시 함께 방문해야 합니다.",
    options: [
      { id: "cert_joint_adult", icon: "👤", title: "성인 (만 19세 이상)", desc: "본인 단독 방문 신청" },
      { id: "cert_joint_minor", icon: "👦", title: "미성년자 (만 19세 미만)", desc: "미성년자 + 법정대리인 동반 방문 필수" },
    ],
  },

  cert_joint_adult: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "공동인증서", "성인"],
    title: "공동인증서 발급 — 성인",
    docs: [
      "공동인증서 인증서비스 신청서 (별지 제1호 서식) — 영사관 비치 또는 홈페이지 다운로드, 서명 필수",
      "이용약관 및 개인정보 수집·이용 동의서 (별지 제3-1, 3-2호 서식) — 서명 필수",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "유효한 캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 / 학생허가증 등)",
      "본인 이메일 주소 (신청서에 기재 — 발급 안내 수신용)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 접수 후 이메일로 발급 안내 수신 → 집/사무실 컴퓨터에서 다운로드",
    notices: [
      "⚠️ 2024.1.1부터 재외공관에서는 한국전자인증(주) 업체의 공동인증서만 발급합니다.",
      "반드시 본인 직접 방문 — 대리인 신청 불가.",
      "시민권자(한국 국적 상실자) 신청 불가 — 대한민국 국적자만 가능.",
      "주민등록번호가 없는 경우 발급 불가 — 한국 입국 후 주민등록신고 필요.",
      "발급 후 이용 가능: 정부24 전자민원, 인터넷뱅킹, 가족관계증명서 온라인 발급, 여권 온라인 재발급, 홈택스 연말정산 등.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 공동인증서) →",
  },

  cert_joint_minor: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "공동인증서", "미성년자"],
    title: "공동인증서 발급 — 미성년자 (만 19세 미만)",
    docs: [
      "공동인증서 인증서비스 신청서 (별지 제1호 서식) — 서명 필수",
      "이용약관 및 개인정보 수집·이용 동의서 (별지 제3-1, 3-2호 서식) — 서명 필수",
      "인증서 발급 법정대리인 동의서 (별지 제2호 서식) — 법정대리인 서명 필수",
      "미성년자 본인 유효한 한국 여권 원본 + 사본 1부",
      "법정대리인(부 또는 모) 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 부·모 모두의 여권 원본 지참 필요 (방문하지 않는 부 또는 모 포함)",
      "가족관계증명서 (상세, 주민번호 전부 공개) — 신청일 기준 3개월 이내 발급본",
      "유효한 캐나다 체류자격 증빙서류 원본",
      "본인 이메일 주소 (신청서에 기재)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 접수 후 이메일로 발급 안내 수신 → 집/사무실 컴퓨터에서 다운로드",
    notices: [
      "⚠️ 미성년자 본인 + 법정대리인(대한민국 국적자) 반드시 함께 방문 — 미성년자 단독 또는 법정대리인 단독 방문 불가.",
      "⚠️ 2024.1.1부터 한국전자인증(주) 업체의 공동인증서만 발급.",
      "법정대리인은 반드시 대한민국 국적자여야 합니다.",
      "시민권자 자녀 신청 불가 — 대한민국 국적 보유자만 가능.",
      "주민등록번호가 없는 경우 발급 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 공동인증서 미성년) →",
  },

  // ── 금융인증서 성인/미성년 분기 ──
  cert_financial_who: {
    type: "question",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "금융인증서"],
    question: "신청자가 성인인가요, 미성년자인가요?",
    sub: "미성년자(만 19세 미만)는 법정대리인(대한민국 국적자)이 반드시 함께 방문해야 합니다.",
    options: [
      { id: "cert_financial_adult", icon: "👤", title: "성인 (만 19세 이상)", desc: "본인 단독 방문 신청" },
      { id: "cert_financial_minor", icon: "👦", title: "미성년자 (만 19세 미만)", desc: "미성년자 + 법정대리인 동반 방문 필수" },
    ],
  },

  cert_financial_adult: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "금융인증서", "성인"],
    title: "금융인증서 발급 — 성인",
    docs: [
      "금융인증서 발급 신청서 (별지 제1호 서식) — 영사관 비치 또는 홈페이지 다운로드, 서명 필수",
      "개인정보 수집·이용 및 제3자 제공 동의서 (별지 제2호 서식) — 서명 필수",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "유효한 캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 등)",
      "가족관계증명서 (상세, 주민번호 전부 공개) — 신청일 기준 3개월 이내 발급본",
      "본인 이메일 주소 (신청서에 기재 — 발급 안내 수신용)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 접수 후 이메일로 발급 안내 수신 → 집/사무실 컴퓨터에서 다운로드",
    notices: [
      "2024년 5월 1일부터 재외공관에서 금융인증서 신청 가능.",
      "반드시 본인 직접 방문 — 대리인 신청 불가.",
      "시민권자(한국 국적 상실자) 신청 불가.",
      "주민등록번호가 없는 경우 발급 불가.",
      "금융인증서는 인터넷뱅킹 등 금융 서비스 전용입니다.",
      "⚠️ 인터넷뱅킹 이용 전 해당 은행의 고객 등록이 먼저 되어 있어야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 금융인증서) →",
  },

  cert_financial_minor: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "금융인증서", "미성년자"],
    title: "금융인증서 발급 — 미성년자 (만 19세 미만)",
    docs: [
      "금융인증서 발급 신청서 (별지 제1호 서식) — 서명 필수",
      "개인정보 수집·이용 및 제3자 제공 동의서 (별지 제2호 서식) — 서명 필수",
      "인증서 발급 법정대리인 동의서 (별지 제2호 서식) — 법정대리인 서명 필수",
      "미성년자 본인 유효한 한국 여권 원본 + 사본 1부",
      "법정대리인(부 또는 모) 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 부·모 모두의 여권 원본 지참 필요",
      "가족관계증명서 (상세, 주민번호 전부 공개) — 3개월 이내 발급본",
      "유효한 캐나다 체류자격 증빙서류 원본",
      "본인 이메일 주소",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 접수 후 이메일로 발급 안내 수신 → 집/사무실 컴퓨터에서 다운로드",
    notices: [
      "⚠️ 미성년자 본인 + 법정대리인(대한민국 국적자) 반드시 함께 방문.",
      "법정대리인은 반드시 대한민국 국적자여야 합니다.",
      "시민권자 자녀 신청 불가.",
      "주민등록번호가 없는 경우 발급 불가.",
      "인터넷뱅킹 이용 전 해당 은행 고객 등록 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (인증서 → 금융인증서 미성년) →",
  },

  // ── 비대면 앱 신청 ──
  cert_nonface: {
    type: "result",
    service: "cert",
    breadcrumb: ["홈", "공동/금융 인증서", "비대면 앱 신청"],
    title: "비대면 재외국민 인증서 — 스마트폰 앱 신청",
    docs: [
      "스마트폰 (iOS 또는 Android)",
      "2008년 8월 25일 이후 발급된 전자여권 (앞표지 하단 IC칩 마크 있는 것)",
      "  ▸ 구형 여권 (IC칩 마크 없는 것) → 이용 불가, 영사관 방문 신청 필요",
      "주민등록번호",
      "아래 은행 앱 중 하나 설치:",
      "  ▸ KB스타뱅킹 / 신한SOL뱅크 / 우리WON뱅킹 / 하나원큐 / 토스",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "앱에서 즉시 처리 (영사관 방문 불필요)",
    notices: [
      "⚠️ 2008.8.25 이후 발급된 전자여권(IC칩 마크)만 사용 가능 — 구형 여권은 이용 불가.",
      "주민등록번호가 없는 경우 이용 불가.",
      "시민권자(한국 국적 상실자) 이용 불가.",
      "앱 설치 후: '재외국민 인증서 신청' 선택 → 개인정보 입력 → 전자여권 + 얼굴 촬영.",
      "앱 신청이 어려운 경우 영사관 방문 신청(공동인증서 또는 금융인증서)을 이용하세요.",
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
      { id: "vcert_online", icon: "💻", title: "온라인 발급 가능 서류 목록", desc: "공동인증서로 정부24에서 즉시·무료·영사관 방문 불필요" },
      { id: "vcert_immigration", icon: "🛬", title: "출입국사실증명서", desc: "한국 입출국 기록 확인 — 방문 또는 온라인" },
      { id: "vcert_criminal", icon: "🔍", title: "신원조사(범죄경력)증명서", desc: "비자·시민권 신청·신원확인 용도 — 경찰청 처리 7일" },
      { id: "vcert_driving", icon: "🚗", title: "영문 운전경력증명서", desc: "캐나다 운전면허 교환 시 필요 — 방문 또는 온라인" },
      { id: "vcert_military_c", icon: "🪖", title: "병적증명서", desc: "병역 이행 여부 확인 → 병무 메뉴에서 안내" },
      { id: "vcert_resident", icon: "🏠", title: "주민등록 등본·초본", desc: "주민등록 현황 확인 — 방문 또는 온라인" },
      { id: "vcert_tax", icon: "💰", title: "납세·소득 증명서", desc: "납세증명(국세·지방세·관세)·소득금액증명 — 해외이주신고 등에 필요" },
      { id: "vcert_passport_info", icon: "📋", title: "여권정보증명서", desc: "2020.12.20 이후 발급 여권 소지자 — 주민번호 대체 서류" },
    ],
  },

  // ── 온라인 발급 목록 ──
  vcert_online: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "온라인 발급 목록"],
    title: "공동인증서로 온라인 발급 가능한 서류 (정부24)",
    docs: [
      "💻 정부24(gov.kr) 로그인 후 즉시 발급 가능한 서류:",
      "  ▸ 가족관계증명서 / 기본증명서 / 혼인관계증명서",
      "  ▸ 주민등록 등본 / 초본",
      "  ▸ 출입국사실증명서",
      "  ▸ 재외국민등록부 등본",
      "  ▸ 영문 운전경력증명서 (경찰청 교통민원24)",
      "  ▸ 병적증명서 (병무청 병무민원포털)",
      "  ▸ 납세증명서 (홈택스 hometax.go.kr)",
      "  ▸ 소득금액증명서 (홈택스)",
      "  ▸ 여권정보증명서",
      "  ▸ 해외이주신고확인서",
    ],
    costs: [{ label: "수수료", value: "무료 (정부24)" }],
    time: "즉시 발급 (24시간 이용 가능)",
    notices: [
      "공동인증서가 없으면 영사관 방문 1회로 발급받을 수 있습니다 (공동/금융 인증서 메뉴 참조).",
      "정부24 접속 후 공동인증서 로그인 → 원하는 서류 검색 → 즉시 출력 가능.",
      "일부 서류(납세증명 등)는 홈택스(hometax.go.kr) 또는 해당 기관 사이트에서 발급.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  // ── 출입국사실증명서 ──
  vcert_immigration: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "출입국사실증명서"],
    title: "출입국사실증명서",
    docs: [
      "출입국사실증명서 발급 신청서 (소정 양식)",
      "본인 유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본",
      "  ▸ 공동인증서 보유 시: 정부24(gov.kr)에서 온라인 즉시 무료 발급 가능 — 영사관 방문 불필요",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "공동인증서가 있으면 정부24에서 즉시 무료 발급 가능 — 영사관 방문 불필요.",
      "우편 접수 가능 (온타리오·마니토바주 변호사 공증 사본 허용).",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
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
      "신청서 별지 1-1호 (소정 양식 — 영사관 홈페이지 다운로드)",
      "최근 6개월 이내 탈모상반신 컬러사진 1매 (3×4cm)",
      "본인 유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 등)",
      "  ▸ 영주권 소지자: PR카드 앞뒷면",
      "  ▸ 비자 소지자: 캐나다 비자 원본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "접수 후 경찰청 처리 약 7 영업일 → 이메일 또는 우편 수령",
    notices: [
      "⚠️ 처리 기간이 약 7 영업일이므로 여유 있게 신청하세요.",
      "만 14세 미만은 형사 미성년자로 범죄 기록 없음 — 해당 연령 미만은 발급 불필요.",
      "신청서는 접수 공무원이 여권으로 본인 확인 후 접수합니다.",
      "우편 수령 희망 시: Canada Post Xpresspost 봉투 동봉 필수.",
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
      "신청서 별지 1-2호 (소정 양식 — 영사관 홈페이지 다운로드)",
      "최근 6개월 이내 탈모상반신 컬러사진 1매 (3×4cm)",
      "본인 유효한 한국 여권 원본",
      "캐나다 영주권 카드 원본 (앞뒷면)",
      "캐나다 체류자격 증빙서류 원본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "접수 후 경찰청 처리 약 7 영업일",
    notices: [
      "⚠️ 처리 기간 약 7 영업일 — 시민권 신청 일정을 감안하여 여유 있게 신청하세요.",
      "RCMP 범죄경력증명서(지문 기반)와는 다른 서류입니다 — RCMP 증명서는 별도로 신청해야 합니다.",
      "우편 수령 희망 시: Canada Post Xpresspost 봉투 동봉.",
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
      "신청서 별지 1-3호 (소정 양식 — 영사관 홈페이지 다운로드)",
      "최근 6개월 이내 탈모상반신 컬러사진 1매 (3×4cm)",
      "본인 유효한 한국 여권 원본",
      "캐나다 영주권 카드 또는 시민권증서 원본",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "접수 후 경찰청 처리 약 7 영업일",
    notices: [
      "영주권자 및 시민권자의 신원확인 목적으로 사용됩니다.",
      "⚠️ 처리 기간 약 7 영업일.",
      "우편 수령 희망 시: Canada Post Xpresspost 봉투 동봉.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (각종 증명서 → 신원조사) →",
  },

  // ── 영문 운전경력증명서 ──
  vcert_driving: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "영문 운전경력증명서"],
    title: "영문 운전경력증명서",
    docs: [
      "영문 운전경력증명서 발급 신청서 (소정 양식)",
      "본인 유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본",
      "한국 운전면허증 원본 (있는 경우)",
      "  ▸ 공동인증서 보유 시: 경찰청 교통민원24(efine.go.kr) 또는 정부24에서 온라인 즉시 무료 발급 가능",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "공동인증서가 있으면 경찰청 교통민원24(efine.go.kr) 또는 정부24에서 즉시 무료 발급 — 영사관 방문 불필요.",
      "캐나다 운전면허 교환 절차는 ServiceOntario에 문의하세요.",
      "운전면허 번역 공증이 별도로 필요한 경우 공증 메뉴를 이용하세요.",
      "우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.efine.go.kr",
  },

  // ── 병적증명서 (병무 메뉴로 연결) ──
  vcert_military_c: {
    type: "result",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "병적증명서"],
    title: "병적증명서 — 병무 메뉴에서 신청",
    docs: [],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 / 공동인증서로 온라인 즉시",
    notices: [
      "병적증명서는 홈 → 병무 → 병적증명서 발급 메뉴에서 상세 안내를 확인하세요.",
      "본인 직접 신청 또는 가족(배우자·직계존비속·형제자매) 대리 신청 가능.",
      "공동인증서가 있으면 정부24(gov.kr) 또는 병무청 병무민원포털(mwpt.mma.go.kr)에서 온라인 즉시 무료 발급 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
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

  visa_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)"], question: "한국 혈통이 있으신가요?", sub: "한국법상 부모 중 한 명이라도 한국 국적이었던 적이 있으면, 지금은 캐나다인이 되셨어도 본인이 선천적으로 한국 국적을 보유할 수 있습니다. 비자 신청 전 반드시 확인이 필요합니다.", options: [{ id: "visa_ko_heritage_yes", icon: "🧬", title: "네 — 부모 또는 조부모가 한국인이었던 적 있어요", desc: "현재 캐나다인이 되셨더라도 해당됩니다" },{ id: "visa_ko_heritage_unsure", icon: "🤔", title: "잘 모르겠어요", desc: "부모님 중 한 분이 한국인이었을 수도 있어요" },{ id: "visa_ko_heritage_no", icon: "🌐", title: "전혀 없어요", desc: "부모·조부모 모두 한국 국적인 적 없음" }] },

  visa_ko_heritage_yes: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)", "한국 혈통"], question: "어떤 상황이신가요?", sub: "한국 혈통이 있으시면 비자 신청 전 국적 상태를 먼저 확인해야 합니다.", options: [{ id: "visa_f4_start", icon: "⚠️", title: "국적 상태를 아직 확인하지 않았어요", desc: "선천적 한국 국적 보유 여부 — 먼저 확인 필수" },{ id: "visa_f4_family", icon: "👨‍👩‍👧", title: "배우자 또는 자녀가 F-4 재외동포 비자 소지자예요", desc: "동반 비자 (F-3) 신청" },{ id: "visa_f4_confirmed", icon: "✅", title: "국적상실 확인 완료 — F-4 비자 신청하러 왔어요", desc: "기본증명서에 국적상실 표기된 경우" }] },

  visa_ko_heritage_unsure: { type: "result", service: "visa", breadcrumb: ["홈", "비자 (사증)", "혈통 불확실"], title: "⚠️ 비자 신청 전 부모님께 먼저 확인하세요", docs: ["부모님 중 한 분이라도 한국 국적이었던 적이 있는지 확인하세요", "  ▸ 현재 캐나다 시민권자이더라도, 본인 출생 당시 한국인이었다면 해당됩니다", "  ▸ 출생신고를 한 적 없어도, 출생 당시 부모 중 한 명이 한국인이었으면 본인도 한국 국적입니다", "확인 결과에 따라:", "  ▸ 한국 혈통 있음 → 뒤로 가서 '네' 선택", "  ▸ 한국 혈통 없음 → 뒤로 가서 '전혀 없어요' 선택"], costs: [{ label: "수수료", value: "해당 없음 — 상담 안내" }], time: "부모님께 확인 후 다시 방문", notices: ["⚠️ 한국 국적을 보유한 상태에서 비자를 신청하면 접수가 거부됩니다.", "⚠️ 만 18~37세 남성이고 한국 국적이라면 병역 의무가 있을 수 있습니다.", "여전히 불확실하다면 영사관(416-920-3809) 또는 국적과 상담 예약을 이용하세요."], booking: "https://www.torbooking.com/book", bookingLabel: "국적 상담 예약하기 →" },

  visa_ko_heritage_no: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음"], question: "방문 목적은 무엇인가요?", sub: "한국 혈통이 없는 외국인의 비자 종류를 선택해 주세요.", options: [{ id: "visa_c3_start", icon: "🏠", title: "한국 국민의 가족 / 긴급 방문", desc: "배우자·자녀·장례식·임종 등 → C-3-1" },{ id: "visa_other_start", icon: "📋", title: "취업·유학·출장·기타 목적", desc: "E-2 원어민교사, E-7 취업, F-1-D 디지털노마드, D-2/D-4 유학 등" }] },
  visa_start_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa"], question: "Do you have Korean heritage?", sub: "Under Korean law, if either of your parents is/was EVER a Korean national — even if they later became Canadian — you may hold Korean citizenship automatically. This affects whether you need a visa at all.", options: [
    { id: "visa_heritage_yes_en", icon: "🧬", title: "Yes — a parent or grandparent was Korean", desc: "Includes cases where they later gave up Korean citizenship" },
    { id: "visa_heritage_unsure_en", icon: "🤔", title: "Not sure — one of my parents may have been Korean", desc: "Best to confirm before applying for any visa" },
    { id: "visa_heritage_no_en", icon: "🌐", title: "No Korean heritage at all", desc: "Neither parent nor grandparent was ever Korean" },
  ] },

  visa_heritage_yes_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Korean Heritage"],
    question: "What is your situation?",
    sub: "Since you have Korean heritage, you need to check your citizenship status before applying for any visa. Select the option that best describes you.",
    options: [
      { id: "visa_dual_check_en", icon: "⚠️", title: "I haven't checked my Korean citizenship status yet", desc: "You may hold Korean nationality — check this first before anything else" },
      { id: "visa_f4_family_en", icon: "👨‍👩‍👧", title: "My spouse/child holds an F-4 Overseas Korean Visa", desc: "Accompanying family → F-3 Dependent Visa" },
      { id: "visa_f4_en", icon: "🇰🇷", title: "I confirmed I hold / held Korean nationality — F-4 Visa", desc: "Overseas Korean (재외동포) visa for those with Korean heritage" },
    ],
  },

  visa_heritage_unsure_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Not Sure About Heritage"],
    title: "⚠️ Please Confirm Your Heritage Before Applying",
    docs: [
      "You need to check whether a parent or grandparent was EVER a Korean national",
      "  ▸ Even if they later naturalised as Canadian, you may still hold Korean citizenship",
      "  ▸ Even if you were born in Canada and never visited Korea, you may hold Korean citizenship",
      "  ▸ Even if you were never registered in Korea, you may hold Korean citizenship",
      "How to check:",
      "  ▸ Ask your parent(s): were either of them born in Korea or ever a Korean national?",
      "  ▸ If yes → go back and select 'Yes — a parent or grandparent was Korean'",
      "  ▸ If genuinely no Korean heritage → go back and select 'No Korean heritage at all'",
    ],
    costs: [{ label: "Fee", value: "Free — consultation only" }],
    time: "Confirm with family first, then return to the app",
    notices: [
      "⚠️ Applying for a visa when you actually hold Korean citizenship is not possible — your application will be refused at the Consulate.",
      "⚠️ If you are male aged 18–37 and hold Korean citizenship, military service obligations may apply.",
      "If you are still unsure after checking: call the Consulate (416-920-3809) or book a consultation with the Nationality Department.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Nationality Consultation →",
  },

  visa_heritage_no_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage"],
    question: "What brings you to Korea?",
    sub: "Since you have no Korean heritage, select your purpose of visit. Canadian citizens can enter Korea visa-free for up to 6 months.",
    options: [
      { id: "visa_c3_start_en", icon: "🏠", title: "Family of a Korean national / Emergency visit", desc: "Spouse, child, funeral, critical illness → C-3-1 Short-Term Visa" },
      { id: "visa_other_start_en", icon: "📋", title: "Work, Study, Business or Other Purpose", desc: "E-2 English teacher, E-7 work, F-1-D Digital Nomad, D-2 student, etc." },
      { id: "visa_no_heritage_en", icon: "🌐", title: "Visiting or Transiting Korea", desc: "Canadian citizens: visa-free · Tourist / Short-Stay / Transit (TWOV)" },
      { id: "visa_keta_en", icon: "📱", title: "K-ETA — Do I need one?", desc: "Canadian passport holders: K-ETA currently exempted until Dec 31, 2026" },
    ],
  },

  visa_f4_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)"], question: "⚠️ 먼저 확인하세요 — 선천적 이중국적 여부", sub: "한국법상 부모 중 한 명이라도 한국 국민이면, 출생신고를 하지 않았어도 자동으로 한국 국적을 보유합니다.", options: [{ id: "visa_dual_check", icon: "🧬", title: "부모 또는 조부모 중 한 명이 한국 국적이었음", desc: "⚠️ 이 경우 본인도 한국 국적일 수 있습니다 — 먼저 확인 필요" },{ id: "visa_f4_confirmed", icon: "✅", title: "이미 한국 국적상실 신고 완료 — F-4 신청하러 왔습니다", desc: "국적상실이 기본증명서에 표기된 경우" }] },
  visa_dual_check: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "이중국적 확인"], title: "⚠️ 비자 신청 전 국적 확인 필수", docs: ["📌 한국 「국적법」에 따르면 (1998.6.14 이후 출생자) — 1998년 6월 14일 이후 출생자: 부모 중 한 명이 한국인이면 출생신고 여부와 관계없이 자동으로 한국 국적 보유 (선천적 이중국적자)","📌 1998년 6월 13일 이전 출생자: 부(父)가 한국인이면 부계혈통 원칙에 따라 한국 국적 보유","⚠️ 이 경우 한국 국적자이므로 F-4 비자 신청 불가 — 비자가 아닌 여권을 신청해야 합니다"], costs: [{ label: "수수료", value: "해당 없음 (비자 아님)" }], time: "확인 후 적절한 서비스로 안내", notices: ["출생신고를 한 번도 하지 않았다면 → 출생신고 후 한국 여권 신청","출생신고는 했으나 국적선택을 하지 않았다면 → 국적선택신고 또는 국적이탈신고 필요 (만 22세 이전)","이미 국적상실 처리가 완료됐다면 → 기본증명서(상세) 확인 후 F-4 비자 신청 가능","병역의무자(남성 만 18~37세)의 경우 국적이탈 전 병역 문제 해결 필수","정확한 확인을 위해 방문 전 여권과 또는 국적과에 전화 상담 권장 (416-920-3809)"], booking: "https://www.torbooking.com/book", bookingLabel: "가족관계 / 국적 상담 예약 →" },
  visa_dual_check_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Korean Heritage Check"], title: "⚠️ Check Your Korean Citizenship Status First", docs: [
    "📌 Under Korean Nationality Law (born on or after June 14, 1998):",
    "  ▸ You automatically hold Korean citizenship if EITHER parent is/was a Korean national at the time of your birth",
    "  ▸ This applies even if: you were born in Canada · you never visited Korea · you were never registered in Korea",
    "  ▸ This applies even if: your parent LATER became Canadian — what matters is their nationality AT YOUR BIRTH",
    "📌 Example — this case applies to you if:",
    "  ▸ Your mother was Korean when you were born, and later naturalised as Canadian → you may hold Korean citizenship",
    "  ▸ Your father was Korean when you were born, even if he later gave up Korean citizenship → you may hold Korean citizenship",
    "📌 If born before June 13, 1998: Korean citizenship passed through the father (paternal line only).",
    "⚠️ If this applies to you: you are a Korean national — you CANNOT apply for a visa. You must apply for a Korean passport.",
  ], costs: [{ label: "Fee", value: "N/A — Confirm status first" }], time: "Confirm your status, then proceed to the correct service", notices: [
    "⚠️ If your parent was Korean at the time of your birth: you likely hold Korean citizenship regardless of what they hold now.",
    "⚠️ Male aged 18–37 with Korean citizenship: military service obligations may apply — resolve this before renouncing.",
    "Never registered your birth in Korea → File a birth registration (출생신고) at this Consulate first, then apply for a Korean passport.",
    "Registered but never chose nationality → File a nationality selection (국적선택) or renunciation (국적이탈) — generally before age 22 for males, 22 for females.",
    "Nationality loss already confirmed on your Basic Certificate (기본증명서) → You are now eligible to apply for an F-4 Overseas Korean Visa or a regular visa.",
    "Unsure? Call the Consulate before visiting: 416-920-3809",
  ], booking: "https://www.torbooking.com/book", bookingLabel: "Book Appointment (Nationality Dept.) →" },

  visa_f4_confirmed: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "신청"], question: "본인의 한국 혈통 유형은?", sub: "국적상실이 기본증명서에 표기된 것을 먼저 확인하세요.", options: [{ id: "visa_f4_former_sex", icon: "📜", title: "본인이 직접 한국 국적을 보유했던 분", desc: "시민권 취득으로 한국 국적 상실·이탈한 분" },{ id: "visa_f4_child", icon: "👶", title: "한국계 부모·조부모에게서 태어난 2세", desc: "부 또는 모(조부모)가 한국 국적이었던 외국 국적자" }] },
  visa_f4_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean"], question: "Which category applies to you?", sub: "You must have already completed Korean nationality renunciation/loss (국적상실 신고) before applying.", options: [{ id: "visa_f4_former_en", icon: "📜", title: "I previously held Korean citizenship (personally)", desc: "You lost/renounced Korean citizenship after acquiring Canadian citizenship" },{ id: "visa_f4_child_en", icon: "👶", title: "My parent(s) or grandparent(s) held Korean citizenship", desc: "You were born a foreign national with Korean heritage" }] },
  visa_f4_former_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Former Korean National"], question: "What is your gender and age?", sub: "Males under 41 require additional documents related to military service history.", options: [{ id: "visa_f4_former_female_en", icon: "👩", title: "Female — or Male aged 41 or older", desc: "No additional military service documents required" },{ id: "visa_f4_former_male41_en", icon: "👨", title: "Male under 41 years old", desc: "RCMP Criminal Record Check + additional military-related docs required" }] },
  visa_f4_former_female_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Former Korean National"], title: "F-4 Overseas Korean Visa — Former Korean National", docs: ["Visa Application Form (printed from Korea Visa Portal: visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy (min. 6 months validity)","Canadian Citizenship Certificate — original + photocopy, front and back (if born Canadian: 'Certified Copy of Birth Registration' or 'Statement of Live Birth' — original + copy)","Basic Certificate / 기본증명서 (Detailed, all resident numbers visible) — issued within 3 months, showing nationality loss/renunciation date","Family Relationship Certificate / 가족관계증명서 (Detailed) — issued within 3 months (if loss reported before 2008, submit 제적등본 instead)","1 passport-type photo (3.5×4.5cm, white background, taken within 6 months, date-stamped on back)"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["You MUST complete Korean nationality renunciation/loss (국적상실 신고) BEFORE applying.","Visa validity: up to 5 years; each entry allows up to 2 years of stay.","Mail applications accepted: include a certified cheque (CAD $117) and a prepaid return envelope.","Visa status check: Korea Visa Portal (visa.go.kr)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_former_male41_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Former Korean National (Male under 41)"], title: "F-4 Overseas Korean Visa — Male Under 41 (Former Korean National)", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","Canadian Citizenship Certificate — original + photocopy","Basic Certificate / 기본증명서 (Detailed) — issued within 3 months, showing nationality loss date","Family Relationship Certificate / 가족관계증명서 (Detailed) — issued within 3 months","Both parents' Basic Certificate + Family Relationship Certificate (Detailed) — issued within 3 months","RCMP Criminal Record Check — fingerprint-based (NOT name-based), issued within 6 months","1 passport-type photo"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["⚠️ RCMP Criminal Record Check must be fingerprint-based (not name-based search).","Males who gave up Korean nationality without fulfilling military duty AFTER May 1, 2018 cannot apply for F-4 until the year they turn 41.","Visa validity: up to 5 years; each entry allows up to 2 years of stay."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_child_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Korean Heritage (2nd Gen+)"], question: "What is your gender and age?", sub: "Males aged 18–59 must submit an RCMP Criminal Record Check.", options: [{ id: "visa_f4_child_general_en", icon: "👩", title: "Female — or under 18 — or 60 and over", desc: "RCMP Criminal Record Check not required" },{ id: "visa_f4_child_male_en", icon: "👨", title: "Male aged 18–59", desc: "RCMP Criminal Record Check required" }] },
  visa_f4_child_general_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Korean Heritage"], title: "F-4 Overseas Korean Visa — Korean Heritage (2nd Generation+)", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","Canadian Citizenship Certificate — original + photocopy","Your birth certificate — Certified Copy of Birth Registration (must list both parents' names)","Korean parent's or grandparent's Basic Certificate + Family Relationship Certificate (Detailed) — issued within 3 months","1 passport-type photo"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["If you submit proof of Korean language proficiency, you may receive up to 2 years stay per entry.","Visa validity: up to 5 years.","Mail applications accepted (certified cheque CAD $117 + prepaid return envelope)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_child_male_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Korean Heritage (Male 18–59)"], title: "F-4 Overseas Korean Visa — Korean Heritage, Male aged 18–59", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","Canadian Citizenship Certificate — original + photocopy","Your birth certificate — Certified Copy of Birth Registration","Korean parent's or grandparent's Basic Certificate + Family Relationship Certificate (Detailed) — issued within 3 months","RCMP Criminal Record Check — fingerprint-based, issued within 6 months","1 passport-type photo"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["⚠️ RCMP Criminal Record Check must be fingerprint-based — name-based checks are NOT accepted.","Visa validity: up to 5 years."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },

  visa_f4_family_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "F-3 Dependent Visa"], question: "What is your relationship to the F-4 visa holder?", sub: "Spouse or minor children (under 18) of an F-4 Overseas Korean visa holder may apply for an F-3 Dependent Visa.", options: [{ id: "visa_f3_spouse_en", icon: "💑", title: "Spouse of an F-4 visa holder", desc: "Up to 1 year stay" },{ id: "visa_f3_child_en", icon: "👶", title: "Minor child (under 18) of an F-4 visa holder", desc: "Up to 1 year stay" }] },
  visa_f3_spouse_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-3 Dependent Visa", "Spouse"], title: "F-3 Dependent Visa — Spouse of F-4 Holder", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","1 passport-type photo","Copy of the F-4 visa holder's visa or Overseas Korean Resident Card (거소증) — front & back","Marriage certificate — Korean marriage registration (혼인관계증명서, Detailed, within 3 months), OR Canadian marriage registration","Family Relationship Certificate of both spouses (Detailed) — within 3 months"], costs: [{ label: "Visa Fee", value: "CAD $78 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["Stay period: up to 1 year (within the F-4 holder's visa validity).","⚠️ Visa validity: issued for a maximum of 3 months from the date of issuance. You must enter Korea within 3 months — unused visas are cancelled.","⚠️ If you are of Korean heritage yourself, you may be eligible to apply for F-4 directly."], booking: "https://www.torbooking.com/book" },
  visa_f3_child_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-3 Dependent Visa", "Minor Child"], title: "F-3 Dependent Visa — Minor Child (Under 18) of F-4 Holder", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid passport — original + photocopy","1 passport-type photo","Copy of the F-4 visa holder's visa or Overseas Korean Resident Card (거소증) — front & back","Child's birth certificate — Certified Copy of Birth Registration","Parent's Family Relationship Certificate or Marriage Certificate (Detailed) — within 3 months"], costs: [{ label: "Visa Fee", value: "CAD $78 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["Minor children are defined as 0–18 years old.","Stay period: up to 1 year (within F-4 holder's visa validity).","⚠️ Visa validity: issued for a maximum of 3 months from the date of issuance. You must enter Korea within 3 months — unused visas are cancelled."], booking: "https://www.torbooking.com/book" },

  visa_c3_start_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)"], question: "What is the purpose of your visit?", sub: "Canadian citizens can visit Korea visa-free for up to 6 months. Only apply if you require a visa for your nationality.", options: [{ id: "visa_c3_family_en", icon: "👨‍👩‍👧", title: "Visiting a Korean national family member", desc: "Spouse or child is a Korean national" },{ id: "visa_c3_emergency_en", icon: "🚨", title: "Emergency / Humanitarian visit", desc: "Funeral, critical illness, emergency surgery" },{ id: "visa_c3_other_en", icon: "📋", title: "Other short-term visit (wedding, adoption, etc.)", desc: "Your own wedding, court appearance for adoption, etc." }] },
  visa_c3_family_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)", "Family of Korean National"], title: "C-3-1 Short-Term Visa — Family of a Korean National", docs: ["Visa Application Form (printed from visa.go.kr — include SIN number, fill in all details)","Valid passport — original + photocopy","1 passport-type photo","Proof of family relationship with Korean national","If of Korean heritage: Basic Certificate showing nationality loss date — within 3 months"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, or Credit Card)" }], time: "Approx. 12–15 business days", notices: ["⚠️ If you are of Korean heritage, you must complete Korean nationality renunciation BEFORE applying.","C-series visas CANNOT be converted to another visa type inside Korea."], booking: "https://www.torbooking.com/book" },
  visa_c3_emergency_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)", "Emergency / Humanitarian"], title: "C-3-1 Short-Term Visa — Emergency / Humanitarian Visit", docs: ["Visa Application Form (printed from visa.go.kr)","Valid passport — original + photocopy","1 passport-type photo","Family relationship proof","Urgency evidence: Funeral → death certificate; Critical illness → doctor's letter; Emergency surgery → surgical documents","If of Korean heritage: Basic Certificate showing nationality loss date"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, or Credit Card)" }], time: "Emergency processing: 5–7 business days (when humanitarian urgency is recognized)", notices: ["🚨 For funeral attendance or critical illness: call the Visa Dept. immediately: 416-920-3809 ext. 221 to request an urgent appointment slot.","⚠️ IMPORTANT: If you previously held Korean citizenship (e.g. naturalized Canadian), you MUST submit the Nationality Loss Report (국적상실신고) documentation without exception — even for emergency visits.","C-series visas cannot be converted to another visa type inside Korea."], booking: "https://www.torbooking.com/book" },
  visa_c3_other_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)", "Other"], title: "C-3-1 Short-Term Visa — Other Purpose (Wedding, Adoption, etc.)", docs: ["Visa Application Form (printed from visa.go.kr)","Valid passport — original + photocopy","1 passport-type photo","Supporting documents for purpose of visit","If of Korean heritage: Basic Certificate showing nationality loss date"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, or Credit Card)" }], time: "Approx. 12–15 business days", notices: ["⚠️ Canadian citizens can visit Korea visa-free for up to 6 months — confirm whether you actually need a visa.","C-series visas cannot be converted to F-4, F-6 or other visa types inside Korea."], booking: "https://www.torbooking.com/book" },

  visa_no_heritage_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage"],
    question: "What brings you to Korea?",
    sub: "Canadian passport holders can visit Korea visa-free for up to 6 months. Select your purpose below.",
    options: [
      { id: "visa_visit_en", icon: "🌏", title: "Visiting / Tourism / Short-Term Stay", desc: "Canadian citizens: visa-free up to 6 months · Other nationalities: short-term visitor visa required" },
      { id: "visa_transit_en", icon: "🔄", title: "Transiting Through Korea (TWOV)", desc: "Passing through Korea on the way to another country — up to 30 days visa-free" },
    ],
  },

  visa_visit_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "Visiting Korea"],
    title: "Visiting Korea — Tourist / Short-Term Stay",
    docs: [
      "🇨🇦 Canadian passport holders: NO VISA REQUIRED",
      "  ▸ Simply enter Korea with your Canadian passport — no Consulate visit needed",
      "  ▸ Visa-free stay: up to 6 months per entry",
      "  ▸ K-ETA currently exempted for Canadians until December 31, 2026",
      "Non-Canadian nationals residing in Canada — Short-Term Visitor Visa required:",
      "  ▸ Visa Application Form — printed from Korea Visa Portal (visa.go.kr), photo attached",
      "  ▸ Valid passport — original + photocopy (min. 6 months validity remaining)",
      "  ▸ 1 passport-type photo (3.5×4.5cm, white background, within 6 months)",
      "  ▸ Proof of financial means (recent bank statement)",
      "  ▸ Return flight itinerary",
      "  ▸ Proof of accommodation (hotel booking or invitation letter)",
      "  ▸ Canadian PR Card or long-term visa — original + photocopy",
    ],
    costs: [
      { label: "Canadian citizens", value: "No visa needed" },
      { label: "Single-entry (other nationalities)", value: "CAD $26 (Cash, Debit, or Credit Card)" },
      { label: "Multiple-entry (other nationalities)", value: "CAD $52 (Cash, Debit, or Credit Card)" },
    ],
    time: "Approx. 5–7 business days (visa applicants only)",
    notices: [
      "🇨🇦 Canadian passport holders: entry is visa-free — no Consulate visit needed.",
      "Visa-free stay is subject to immigration officer's discretion at port of entry.",
      "Short-term visitor visas cannot be extended or converted to another visa type inside Korea.",
      "If you have Korean heritage (parent or grandparent was Korean): you may qualify for the F-4 Overseas Korean Visa — go back and select the Korean heritage option.",
      "For transit through Korea, go back and select 'Transiting Through Korea'.",
      "Check your country's specific requirements at the Korea Visa Portal (visa.go.kr) before applying.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_transit_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "Transit (TWOV)"],
    title: "Transit Without Visa (TWOV) — Passing Through Korea",
    docs: [
      "No visa application needed — enter Korea visa-free for up to 30 days IF all conditions are met:",
      "✅ Condition 1: You hold a valid Canadian PR Card or Canadian visa (physical sticker in passport)",
      "  ▸ e-visa or digital status NOT accepted (except Australian visas verified via VEVO system)",
      "✅ Condition 2: Your routing goes FROM Canada → Korea → home country or 3rd country (or reverse)",
      "  ▸ ❌ NOT allowed: Canada → Korea → Canada (round trip back to Canada only)",
      "✅ Condition 3: You have a confirmed onward flight departing Korea within 30 days",
      "✅ Condition 4: No prior immigration violations in Korea",
      "✅ Condition 5: Your layover in any intermediate country does NOT exceed 3 days before entering Korea",
    ],
    costs: [{ label: "Transit entry fee", value: "No visa required (if conditions met)" }],
    time: "Entry at port of arrival — no advance application needed",
    notices: [
      "⚠️ TWOV is only available to nationals of eligible countries — see below.",
      "🌏 ELIGIBLE NATIONALITIES (examples — with valid Canadian PR/visa):",
      "  ▸ ✅ China 🇨🇳 · India 🇮🇳 · Vietnam 🇻🇳 · Philippines 🇵🇭 · Indonesia 🇮🇩",
      "  ▸ ✅ Mongolia 🇲🇳 · Cambodia 🇰🇭 · Laos 🇱🇦 · Thailand 🇹🇭",
      "  ▸ ✅ Mexico 🇲🇽 · Colombia 🇨🇴 · Brazil 🇧🇷 · Peru 🇵🇪 · Turkey 🇹🇷",
      "🚫 NOT ELIGIBLE (visa required regardless of Canadian PR/visa):",
      "  ▸ ❌ Pakistan 🇵🇰 · Bangladesh 🇧🇩 · Nepal 🇳🇵 · Sri Lanka 🇱🇰 · Myanmar 🇲🇲",
      "  ▸ ❌ Nigeria 🇳🇬 · Ghana 🇬🇭 · Egypt 🇪🇬 · Cameroon · Senegal · Gambia",
      "  ▸ ❌ Uzbekistan · Kyrgyzstan · Afghanistan · Iraq · Syria · Sudan · Cuba · Yemen · Somalia",
      "⚠️ Canadian PR Card or visa must be a physical sticker — digital or e-visa NOT accepted (except VEVO).",
      "⚠️ TWOV conditions are subject to change — verify with your airline or Korean immigration before travel.",
      "If TWOV conditions are NOT met for your nationality: a regular short-term visa (C-3) is required.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_keta_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "K-ETA"],
    title: "K-ETA — Korea Electronic Travel Authorization",
    docs: [
      "📱 K-ETA is applied online — no Consulate visit needed",
      "  ▸ Apply at: k-eta.go.kr or via the K-ETA mobile app",
      "  ▸ Valid passport (same one used at entry)",
      "  ▸ Photo (digital, taken within 6 months)",
      "  ▸ Credit/debit card for the USD $10 fee",
      "  ▸ Accommodation address in Korea",
    ],
    costs: [{ label: "K-ETA fee", value: "USD $10 (online)" }],
    time: "Usually within 72 hours (apply at least 72 hours before departure)",
    notices: [
      "🇨🇦 CANADIAN PASSPORT HOLDERS: K-ETA is currently EXEMPTED until December 31, 2026.",
      "  ▸ You may enter Korea visa-free without a K-ETA until that date.",
      "  ▸ Check k-eta.go.kr for the latest exemption status before travel — the exemption may be extended or ended.",
      "Who normally needs K-ETA: citizens of K-ETA eligible countries (112 countries including Canada) visiting Korea for tourism, transit, or short-term business — when the exemption period ends.",
      "K-ETA is valid for 2 years from approval, allowing multiple entries of up to 90 days each.",
      "K-ETA does NOT apply to: those requiring a regular visa (e.g. non-eligible nationalities, work/study purposes).",
      "⚠️ Even with K-ETA or visa-free entry, final admission is at the discretion of the immigration officer at the port of entry.",
      "If you hold a non-Canadian passport (e.g. Indian, Filipino) but live in Canada: check your nationality's visa/K-ETA requirements separately at visa.go.kr.",
    ],
    booking: null,
    onlineLink: "https://www.k-eta.go.kr",
  },

  visa_f1d_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study", "F-1-D Digital Nomad"], title: "F-1-D — Digital Nomad (Workation) Visa", docs: ["Visa Application Form (from visa.go.kr, with photo attached)", "Valid Canadian passport — original + photocopy", "1 passport-type photo (3.5×4.5cm, white background, within 6 months)", "Employment letter proving current employment and at least 1 year of employment history — issued within 2 weeks", "Proof of income: documents showing annual income above the threshold (approx. CAD $110,000/year after tax)", "  ▸ Recent tax returns, pay stubs, or employment contract showing salary", "Medical / travel insurance certificate covering at least CAD $130,000 for medical treatment and repatriation flight", "  ▸ Insurance must be valid for the entire intended stay in Korea", "  ▸ If accompanying family: separate insurance for each family member", "  ▸ Family members: passport + proof of relationship (marriage certificate / birth certificate)"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $117 (Cash, Debit, or Credit Card)" }], time: "Approx. 7–14 business days", notices: ["Who can apply: remote workers employed by a foreign company (or self-employed) for 1+ year, able to work remotely from Korea.", "Income requirement: must earn more than 2× Korean GNI per capita after tax (approx. CAD $110,000/year — check visa.go.kr for the current figure as it updates annually).", "⚠️ You may NOT work for a Korean company or conduct profit-making activities in Korea while on this visa.", "Stay: up to 1 year from date of issue, extendable by 1 additional year (max 2 years total).", "For stays over 90 days in Korea: register with the local immigration office within 90 days of entry.", "If you previously held Korean nationality: complete the 국적상실신고 (nationality loss report) before applying.", "This is a permanent program as of 2025 — the pilot period has ended.", "Dependents (spouse and minor children) may accompany you on the same visa category."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d4_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study", "D-4 Language Study"], title: "D-4 — Language Study / Training Visa", docs: ["Visa Application Form (from visa.go.kr, with photo attached)", "Valid Canadian passport — original + photocopy", "1 passport-type photo", "Certificate of Admission or enrollment from a Korean language institute, vocational school, or training institution", "Proof of financial ability (bank statement within 30 days — sufficient funds for tuition and living expenses)", "Most recent graduation certificate or transcript"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["D-4 is for Korean language institutes (어학원), vocational training, or preparatory programs — NOT for regular university degree programs (use D-2 for those).", "Canadian citizens can enter Korea visa-free for up to 6 months. If your program is under 6 months, you may not need a D-4 visa — confirm with your institution first.", "Part-time work is NOT permitted on a D-4 visa (unlike D-2).", "For programs over 90 days in Korea: register with the local immigration office within 90 days of entry."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_other_start_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study / Other"], question: "What is the purpose of your visit to Korea?", sub: "Select the visa type that matches your purpose.", options: [{ id: "visa_e2_en", icon: "📚", title: "E-2 — Native English Teacher", desc: "Teaching English at Korean schools or academies" },{ id: "visa_e7_en", icon: "💼", title: "E-7 — Specific Activities (Work Permit)", desc: "Employer-sponsored work visa" },{ id: "visa_f1d_en", icon: "💻", title: "F-1-D — Digital Nomad (Workation)", desc: "Remote worker employed by a foreign company — stay up to 1 year" },{ id: "visa_d2_en", icon: "🎓", title: "D-2 — Student (University)", desc: "Enrolled at a Korean university" },{ id: "visa_d4_en", icon: "🏫", title: "D-4 — Language Study / Training", desc: "Korean language institute, vocational training, etc." },{ id: "visa_c34_en", icon: "🤝", title: "C-3-4 — Business Visitor", desc: "Short-term business trip" },{ id: "visa_other_portal_en", icon: "🌐", title: "Other visa types", desc: "F-6 marriage, working holiday, etc." }] },
  visa_e2_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study", "E-2 English Teacher"], title: "E-2 — Native English Teacher Visa", docs: ["Visa Application Form (from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","1 passport-type photo","Employment contract — signed by Korean employer","Degree certificate (Bachelor's or higher) + apostilled copy","RCMP Criminal Record Check — fingerprint-based, issued within 6 months + Apostille","Medical certificate"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["Degree certificate AND RCMP Criminal Record Check must both have an Apostille.","Obtain Apostille for Canadian federal documents from Global Affairs Canada."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_e7_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study", "E-7 Work Permit"], title: "E-7 — Specific Activities Visa (Employer-Sponsored)", docs: ["Visa Application Form (from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","1 passport-type photo","Invitation letter and employment contract from Korean employer","Degree certificate or career certificate","Korean employer's Business Registration Certificate"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["E-7 visa requirements vary greatly by occupation — check visa.go.kr for your specific job category."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d2_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study", "D-2 Student"], title: "D-2 — Student Visa (University)", docs: ["Visa Application Form (from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","1 passport-type photo","Letter of Acceptance from a Korean university","Proof of financial ability (bank statement within 30 days)","Most recent graduation certificate"], costs: [{ label: "Visa Fee", value: "CAD $117 (Cash or Debit Card)" }], time: "Approx. 7–10 business days", notices: ["Canadian citizens can enter Korea visa-free and apply for a student visa change of status inside Korea."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_c34_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Work / Study", "C-3-4 Business Visitor"], title: "C-3-4 — Business Visitor Visa", docs: ["Visa Application Form (from visa.go.kr)","Valid Canadian passport — original + photocopy","1 passport-type photo","Employment letter from your Canadian company","Invitation letter from the Korean organization","Business Registration Certificate of the Korean organization","Flight itinerary (plan at least 15 business days after submission)"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, or Credit Card)" }], time: "Approx. 12–15 business days", notices: ["You must be paid by your Canadian employer — NOT by the Korean organization.","Canadian citizens can enter Korea visa-free for up to 90 days for business purposes."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_other_portal_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Other Visa Types"], title: "Other Visa Types — Check Korea Visa Portal", docs: ["Visa Application Form (from visa.go.kr for your specific visa type)","Valid passport — original + photocopy","1 passport-type photo","Additional documents vary by visa type — check Korea Visa Portal"], costs: [{ label: "Fee", value: "CAD $52–$117 depending on visa type" }], time: "Short-term: approx. 12–15 business days / Long-term: approx. 7–10 business days", notices: ["The Consulate has NO call centre — check the website before calling.","All required documents must be submitted — missing even one document means your application will not be accepted.","Book your appointment at torbooking.com — walk-ins are not accepted."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },

  visa_f4_former_sex: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "전 한국 국적자"], question: "신청자의 성별과 나이는?", sub: "만 41세 미만 남성은 병역 관련 추가 서류가 필요합니다.", options: [{ id: "visa_f4_former_female", icon: "👩", title: "여성 또는 만 41세 이상 남성", desc: "병역 관련 추가 서류 불필요" },{ id: "visa_f4_former_male41", icon: "👨", title: "만 41세 미만 남성", desc: "병역 관련 추가 서류 필요 (RCMP 범죄경력증명서 등)" }] },
  visa_f4_former_female: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "전 한국 국적자", "여성/41세 이상"], title: "재외동포 비자 (F-4) — 전 한국 국적자", docs: ["사증발급신청서 1부 (비자포털 양식 출력, 사진 부착)","캐나다 여권 원본 + 사본 (유효기간 6개월 이상)","캐나다 시민권증서 원본 + 사본 — 앞뒷면 모두 복사","본인 명의 기본증명서 (상세, 주민번호 전부공개) — 3개월 이내 발급","본인 명의 가족관계증명서 (상세) — 3개월 이내 발급","여권용 사진 1매 (6개월 이내 촬영, 3.5×4.5cm, 흰 배경)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["국적상실 신고가 기본증명서에 표기되어 있어야 합니다.","비자 유효기간: 발급일로부터 최대 5년, 1회 입국 시 최대 2년 체류 가능.","우편 접수 가능 (캐나다 달러 공인 수표 동봉 — 개인 수표 불가)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_former_male41: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "전 한국 국적자", "41세 미만 남성"], title: "재외동포 비자 (F-4) — 전 한국 국적자 (만 41세 미만 남성)", docs: ["사증발급신청서 1부 (비자포털 양식 출력, 사진 부착)","캐나다 여권 원본 + 사본","캐나다 시민권증서 원본 + 사본","본인 명의 기본증명서 (상세) — 3개월 이내","본인 명의 가족관계증명서 (상세) — 3개월 이내","여권용 사진 1매","부모 명의 기본증명서 + 가족관계증명서 (상세) 각 1부 — 3개월 이내","RCMP 캐나다 연방경찰 범죄경력증명서 원본 — 6개월 이내 (지문 기반)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["RCMP 범죄경력증명서는 반드시 지문(fingerprint) 기반으로 발급받아야 합니다.","부모 중 돌아가신 분이 있는 경우 사망증명서로 대체 가능.","비자 유효기간: 발급일로부터 최대 5년."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_child: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "한국계 2세"], question: "신청자의 성별과 나이는?", sub: "만 18~59세 남성은 RCMP 범죄경력증명서가 추가로 필요합니다.", options: [{ id: "visa_f4_child_general", icon: "👩", title: "여성 / 만 18세 미만 / 만 60세 이상", desc: "RCMP 범죄경력증명서 불필요" },{ id: "visa_f4_child_male", icon: "👨", title: "만 18~59세 남성", desc: "RCMP 범죄경력증명서 필요" }] },
  visa_f4_child_general: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "한국계 2세", "일반"], title: "재외동포 비자 (F-4) — 한국계 2세", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","캐나다 시민권증서 원본 + 사본","한국 혈통 부 또는 모의 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","본인 출생증명서 (Certified copy of birth registration) 원본 + 사본","여권용 사진 1매"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["한국어 능력 입증서류 미제출 시 최대 체류 1년, 제출 시 최대 2년.","비자 유효기간: 발급일로부터 최대 5년."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_child_male: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "한국계 2세", "18~59세 남성"], title: "재외동포 비자 (F-4) — 한국계 2세 (만 18~59세 남성)", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","캐나다 시민권증서 원본 + 사본","한국 혈통 부 또는 모의 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","본인 출생증명서 (Certified copy of birth registration) 원본 + 사본","여권용 사진 1매","RCMP 캐나다 연방경찰 범죄경력증명서 원본 — 6개월 이내 (지문 기반)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["RCMP 범죄경력증명서는 반드시 지문(fingerprint) 기반.","비자 유효기간: 발급일로부터 최대 5년."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_family: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "동반(F-3)"], question: "가족 중 누가 F-4 재외동포 비자를 소지하고 있나요?", sub: "F-4 소지자의 배우자 또는 만 18세 이하 미성년 자녀가 F-3 동반비자를 신청할 수 있습니다.", options: [{ id: "visa_f3_spouse", icon: "💑", title: "배우자 (F-4 소지자의 배우자)", desc: "최대 1년 체류 가능" },{ id: "visa_f3_child", icon: "👶", title: "미성년 자녀 (만 18세 이하)", desc: "최대 1년 체류 가능" }] },
  visa_f3_spouse: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "동반(F-3)", "배우자"], title: "동반 비자 (F-3) — F-4 소지자의 배우자", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","유효한 F-4 비자 소지자의 비자 사본 또는 국내거소신고증 앞뒷면 사본","혼인관계증명서 (상세) — 3개월 이내","F-4 소지자 및 배우자의 가족관계증명서 (상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $78 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["체류기간: 최대 1년 (F-4 소지자의 비자 유효기간 이내)."], booking: "https://www.torbooking.com/book" },
  visa_f3_child: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "동반(F-3)", "미성년 자녀"], title: "동반 비자 (F-3) — F-4 소지자의 미성년 자녀 (만 18세 이하)", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","유효한 F-4 비자 소지자(부모)의 비자 사본","자녀 출생증명서 (Certified copy of birth registration) 원본 + 사본","부모의 가족관계증명서 또는 혼인관계증명서 (상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $78 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["미성년 자녀는 만 18세 이하 (0~18세)로 규정됩니다.","체류기간: 최대 1년."], booking: "https://www.torbooking.com/book" },
  visa_c3_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)"], question: "방문 목적은 무엇인가요?", sub: "캐나다 국적자는 한국 무비자 입국 가능 (최대 6개월). 비자가 필요한 경우만 신청하세요.", options: [{ id: "visa_c3_family", icon: "👨‍👩‍👧", title: "한국 국민의 가족 방문", desc: "배우자·자녀가 한국 국민인 경우" },{ id: "visa_c3_emergency", icon: "🚨", title: "긴급 인도적 사유", desc: "장례식·임종·긴급 수술 참석 등" },{ id: "visa_c3_other", icon: "📋", title: "기타 단기 방문", desc: "결혼식 참석, 입양 등 기타 사유" }] },
  visa_c3_family: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)", "가족 방문"], title: "단기방문 비자 (C-3-1) — 한국 국민 가족", docs: ["사증발급신청서 1부 (비자포털 양식, SIN 번호 기재)","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","한국 국민 가족관계 증명서류","재외동포인 경우: 국적상실·이탈 명시된 기본증명서(상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $52 (현금·직불카드·신용카드 가능)" }], time: "약 12~15 영업일", notices: ["국적상실 신고가 완료되지 않은 경우 비자 신청 불가.","C 계열 비자로 입국 후 다른 비자(F-4, F-6 등)로 전환 불가."], booking: "https://www.torbooking.com/book" },
  visa_c3_emergency: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)", "긴급 인도적 사유"], title: "단기방문 비자 (C-3-1) — 긴급 인도적 사유", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","가족관계 증명서류","긴급성 소명자료 — 장례: 사망진단서, 임종: 의사 소견서, 수술: 수술 예정 증빙서류","재외동포인 경우: 국적상실 명시 기본증명서(상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $52 (현금·직불카드·신용카드 가능)" }], time: "긴급: 5~7 영업일 이내", notices: ["장례식 목적 긴급 입국: 비자과 전화(416-920-3809 ext. 221) 문의.","C 계열 비자로 입국 후 다른 비자로 전환 불가."], booking: "https://www.torbooking.com/book" },
  visa_c3_other: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)", "기타"], title: "단기방문 비자 (C-3-1) — 기타 사유", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","방문 목적 증빙서류","재외동포인 경우: 국적상실 명시 기본증명서(상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $52 (현금·직불카드·신용카드 가능)" }], time: "약 12~15 영업일", notices: ["캐나다 국적자는 한국 무비자 입국 가능(최대 6개월) — 비자 필요 여부 먼저 확인하세요.","C 계열 비자로 입국 후 다른 비자(F-4, F-6 등)로 전환 불가."], booking: "https://www.torbooking.com/book" },
  visa_other_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "취업·유학·기타"], question: "방문 목적은 무엇인가요?", sub: "해당 비자 종류를 선택하세요.", options: [{ id: "visa_e2", icon: "📚", title: "E-2 — 원어민 영어 교사", desc: "한국 학교·학원 영어 강사" },{ id: "visa_e7", icon: "💼", title: "E-7 — 특정 활동 (취업)", desc: "회사 초청 취업 비자" },{ id: "visa_f1d", icon: "💻", title: "F-1-D — 디지털 노마드 (워케이션)", desc: "외국 회사 재직 중 한국에서 원격근무 — 최대 1년" },{ id: "visa_d2", icon: "🎓", title: "D-2 — 유학 (대학)", desc: "한국 대학교 유학" },{ id: "visa_d4", icon: "🏫", title: "D-4 — 어학연수", desc: "한국어 어학원·직업훈련 등" },{ id: "visa_other_portal", icon: "🌐", title: "그 외 모든 비자", desc: "C-3-4 출장, F-6 결혼이민 등" }] },
  visa_f1d: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "취업·유학·기타", "F-1-D 디지털노마드"], title: "F-1-D — 디지털 노마드 비자 (워케이션)", docs: ["비자신청서 (visa.go.kr 출력, 사진 부착)","유효한 여권 원본 + 사본","여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)","재직증명서 또는 고용계약서 (1년 이상 재직 확인)","소득 증빙서류 (세후 연 약 CAD $110,000 이상 — 최신 세금신고서·급여명세서 등)","의료·여행보험 증명서 (의료비 최소 CAD $130,000 + 본국 송환 항공권 포함, 체류 전 기간 유효)","  ▸ 동반 가족: 가족 각각 별도 보험 가입 필요","  ▸ 동반 가족 서류: 여권 + 가족관계 증명서류 (혼인증명서/출생증명서)"], costs: [{ label: "수수료", value: "CAD $117 (현금·직불카드·신용카드)" }], time: "약 7~14 영업일", notices: ["대상: 외국 회사에 1년 이상 재직 중인 원격근무자 (자영업자 포함).","⚠️ 한국 기업 취업 또는 한국 내 영리활동 불가.","체류: 비자 발급일로부터 최대 1년, 1회 연장 가능 (최대 2년).","90일 이상 체류 시 입국일로부터 90일 이내 출입국사무소 외국인 등록 필요.","이전에 한국 국적을 보유했던 분: 신청 전 국적상실신고 완료 필수."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d4: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "취업·유학·기타", "D-4 어학연수"], title: "D-4 — 어학연수 비자", docs: ["비자신청서 (visa.go.kr 출력, 사진 부착)","유효한 여권 원본 + 사본","여권용 사진 1매","입학허가서 또는 수강등록증 (한국 어학원·직업훈련기관 발급)","재정능력 증빙 (최근 30일 이내 은행 잔고증명서)","최종 학력 증명서"], costs: [{ label: "수수료", value: "CAD $117 (현금·직불카드·신용카드)" }], time: "약 7~10 영업일", notices: ["D-4는 어학원·어학연수·직업훈련 목적 비자입니다. 정규 대학 학위 과정은 D-2 비자를 이용하세요.","캐나다 시민권자는 6개월 이내 무비자 입국 가능 — 6개월 미만 과정이라면 비자 불필요 (기관에 사전 확인 권장).","D-4 비자로는 아르바이트 등 취업 불가.","90일 이상 체류 시 외국인 등록 필요."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_e2: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "기타 비자", "E-2 원어민교사"], title: "E-2 원어민 영어 교사 비자", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","여권용 사진 1매","고용계약서 원본 (한국 고용주 서명)","학사 이상 학위증명서 + 아포스티유 공증","범죄경력증명서 (RCMP 지문 기반) — 6개월 이내 + 아포스티유 필요","건강진단서"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["학위증명서는 반드시 아포스티유(공증) 처리 후 제출.","범죄경력증명서도 아포스티유 필요 (RCMP 지문 기반)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_e7: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "기타 비자", "E-7 취업"], title: "E-7 특정 활동 비자", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","여권용 사진 1매","한국 고용주 초청장 및 고용계약서","학위증명서 또는 경력증명서","한국 고용주의 사업자등록증 사본","기타 직종별 추가 서류 (비자포털 확인 필수)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["E-7 비자는 직종에 따라 요건이 크게 다릅니다 — 비자포털(visa.go.kr)에서 직종별 서류 목록 반드시 확인."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d2: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "기타 비자", "D-2 유학"], title: "D-2 유학 비자", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","여권용 사진 1매","한국 대학교 입학허가서","재정능력 증명서류 (잔액증명서 등)","최종 학력 졸업증명서"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["캐나다 국적자는 한국 무비자로 입국 후 한국에서 비자 신청도 가능."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_other_portal: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "기타 비자", "그 외"], title: "기타 비자 — 비자포털 확인 필요", docs: ["사증발급신청서 (비자포털 양식 출력)","캐나다 여권 원본 + 사본","여권용 사진 1매","비자 종류별 추가 서류 (비자포털에서 확인 필수)"], costs: [{ label: "수수료", value: "비자 종류별 상이 (CAD $52~$117)" }], time: "단기비자 약 12~15 영업일 / 장기비자 약 7~10 영업일", notices: ["총영사관 비자과는 콜센터가 없습니다 — 전화 상담 불가, 홈페이지 및 비자포털 확인 필수.","비자 진행 상황 조회: 대한민국 비자포털 (visa.go.kr)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },

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
      { id: "notarization_copy", icon: "📋", title: "원본대조필 확인", desc: "캐나다 발급 서류의 영사 확인" },
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
      { label: "위임장 1부당", value: "CAD $2.60 (현금)" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급 (약 30분~1시간)",
    notices: [
      "⚠️ 서명은 반드시 영사 앞에서 — 사전 서명 또는 타인 대리 서명 불가.",
      "동일 위임장에 여러 명이 서명하는 경우 각 서명마다 수수료 발생.",
      "인감증명서 발급 위임장은 별도 메뉴(인감 관련 공증)를 이용하세요.",
      "한국 부동산 등기 목적: 캐나다 공증인(Notary Public) + 아포스티유로 대체 가능한 경우도 있으니 제출 기관에 먼저 확인하세요.",
      "시민권자: 한국 여권이 없는 경우 방문 전 전화 문의 필수 (416-920-3809).",
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
      { label: "목적가액 없는 서류 1부당", value: "CAD $5.20 (현금)" },
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
      { label: "서류 1부당", value: "CAD $5.20 (현금)" },
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
    sub: "인감 관련 서류는 한국 부동산·금융 거래 시 재산권과 직결되므로 반드시 본인이 영사 앞에서 직접 작성해야 합니다. 대리인 신청 절대 불가.",
    options: [
      { id: "notarization_ingam_pow", icon: "🔏", title: "인감증명서 발급 위임장", desc: "한국에서 대리인이 인감증명서를 발급받도록 위임" },
      { id: "notarization_ingam_change", icon: "✏️", title: "인감(변경)신고서", desc: "인감 신규 등록 또는 기존 인감 변경" },
      { id: "notarization_ingam_protect", icon: "🛡️", title: "인감보호(해제)신청서", desc: "인감 도용 방지 보호 신청 또는 해제" },
    ],
  },

  notarization_ingam_pow: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "인감 관련", "인감증명서 발급 위임장"],
    title: "인감증명서 발급 위임장",
    docs: [
      "인감증명서 발급 위임장 — 영사관 비치 또는 홈페이지 다운로드",
      "  ▸ 서명란 공백으로 — 영사 앞에서 자필 작성 및 서명 필수 (타이핑 입력 후 출력 불가)",
      "  ▸ 대리인 성명·주민등록번호·주소·연락처 기재",
      "  ▸ 인감 용도 기재 (예: 부동산 매매용, 은행업무용, 일반용 등)",
      "공증촉탁서 (소정 양식 — 자필 작성 필수)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가",
      "캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
    ],
    costs: [
      { label: "인감증명서 발급 위임장 1부당", value: "CAD $5.20 (현금)" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급 (약 30분~1시간)",
    notices: [
      "⚠️ 반드시 본인이 영사 앞에서 자필 작성 — 대리인 신청 절대 불가.",
      "⚠️ 다운로드 양식에 문자를 타이핑하여 출력한 위임장은 접수 불가 — 손으로 직접 작성.",
      "복사한 위임장도 접수 불가 — 반드시 원본만 제출.",
      "한국 내 대리인이 인감증명서를 발급받을 때 이 위임장과 인감 도장을 함께 지참해야 합니다.",
      "인감이 아직 한국에 등록되어 있지 않다면 인감신고서를 먼저 처리해야 합니다.",
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
      { label: "인감(변경)신고서 1부당", value: "CAD $5.20 (현금)" },
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
      { label: "1부당", value: "CAD $5.20 (현금)" },
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
    question: "어떤 서류의 번역 공증이 필요하신가요?",
    sub: "번역은 본인이 직접 작성해 와야 합니다. 영사관은 번역 내용의 정확성을 검토하지 않으며, 번역인이 직접 방문해야 합니다.",
    options: [
      { id: "notarization_translation_family", icon: "👨‍👩‍👧", title: "가족관계증명서·기본증명서·혼인관계증명서 등", desc: "한국 서류의 한→영 번역 후 영사 확인" },
      { id: "notarization_translation_license", icon: "🚗", title: "운전면허증 번역 인증", desc: "캐나다 면허증 취득(교환) 시 필요" },
    ],
  },

  notarization_translation_family: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "가족관계증명서 등"],
    title: "번역 공증 — 가족관계증명서·기본증명서 등 한국 서류",
    docs: [
      "한국 원본 서류 — 원본 + 사본 1부",
      "  ▸ 가족관계증명서, 기본증명서, 혼인관계증명서, 제적등본 등",
      "영문 번역본 — 번역인이 직접 작성 (영사관 홈페이지 샘플 양식 참고)",
      "  ▸ 없는 내용 추가하거나 있는 내용 누락 시 공증 불가",
      "  ▸ 번역 능력 확인이 필요한 경우 영사가 구두 확인 가능",
      "공증촉탁서 (소정 양식 — 자필 작성 필수)",
      "번역인의 유효한 한국 여권 원본 + 사본 1부",
      "  ▸ 2020년 12월 20일 이후 발급 여권(주민번호 삭제) → 여권정보증명서 추가",
      "캐나다 체류자격 증빙서류 원본",
    ],
    costs: [
      { label: "서류 1통당", value: "CAD $5.20 (현금)" },
    ],
    time: "방문 당일 즉시 발급 (10부 이상 시 익일 수령)",
    notices: [
      "번역인이 반드시 직접 방문해야 합니다 — 대리인 제출 불가.",
      "전문 번역사 불필요 — 본인이 직접 번역 가능.",
      "번역 내용의 책임은 번역인 본인에게 있습니다.",
      "서류 10부 이상 시 당일 수령 불가.",
      "영사관 홈페이지 샘플 양식을 참고하여 번역본을 미리 작성해 오세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 번역 공증) →",
  },

  notarization_translation_license: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "번역 공증", "운전면허증 번역"],
    title: "운전면허증 번역 인증 (캐나다 면허 교환용)",
    docs: [
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "캐나다 체류자격 증빙서류 원본 (PR카드 / 비자)",
      "한국 운전면허증 원본",
      "  ▸ 면허증이 없는 경우: 영문 운전경력증명서 발급 후 번역 진행 가능 (공동인증서 있으면 정부24 온라인 발급)",
    ],
    costs: [
      { label: "번역 인증 수수료", value: "CAD $5.20 (현금)" },
    ],
    time: "방문 당일 즉시 발급",
    notices: [
      "운전면허 교환 절차·수수료 등은 ServiceOntario에 문의.",
      "공동인증서가 있는 경우 정부24 또는 경찰청 교통민원24에서 영문 운전경력증명서 온라인 발급 가능 (영사관 방문 불필요).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 운전면허 번역) →",
    onlineLink: "https://www.ontario.ca/page/exchange-out-province-drivers-licence",
  },

  // ── 원본대조필 확인 ──
  notarization_copy: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "원본대조필 확인"],
    title: "원본대조필 확인 (영사확인)",
    docs: [
      "원본 서류 — 원본 + 사본 1부",
      "  ▸ 캐나다 발급 공문서 또는 공증인(Notary Public)이 인증한 사문서",
      "공증촉탁서 (소정 양식 — 자필 작성 필수)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "캐나다 체류자격 증빙서류 원본",
    ],
    costs: [
      { label: "서류 1통당", value: "CAD $5.20 (현금)" },
    ],
    time: "방문 당일 즉시 발급 (약 30분~1시간)",
    notices: [
      "⚠️ 캐나다는 아포스티유 협약 가입국입니다 — 캐나다 공문서(출생증명서·혼인증명서 등)는 영사관 확인보다 아포스티유가 더 적합한 경우가 많습니다.",
      "연방 서류: Global Affairs Canada에서 아포스티유 발급.",
      "온타리오주 서류: ServiceOntario에서 아포스티유 발급.",
      "아포스티유와 영사관 확인을 동일 서류에 동시 적용 불가.",
      "어떤 방식이 맞는지 불확실하다면 방문 전 영사관(416-920-3809) 또는 한국 제출 기관에 먼저 확인하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 원본대조필) →",
  },

  // ══ MILITARY SERVICE (병무) — 재설계된 트리 ══
  military_start: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무"],
    question: "어떤 병무 업무가 필요하신가요?",
    sub: "병역의무는 대한민국 국적 남성에게 해당됩니다. 정확한 안내를 위해 본인 상황을 선택해 주세요.",
    options: [
      { id: "military_cert_start", icon: "📄", title: "병적증명서 발급", desc: "비자·취업·국적이탈 등에 필요한 병역사항 증명서" },
      { id: "military_need_check", icon: "❓", title: "허가 대상 여부 확인", desc: "내가 허가 대상인지 먼저 확인하고 싶어요" },
      { id: "military_permit_who", icon: "✈️", title: "국외여행허가 신청·연장", desc: "이미 허가 대상인 걸 알고 있어요" },
      { id: "military_cancel_return", icon: "🏠", title: "귀국·허가 취소", desc: "조기 귀국·허가취소·병역면제 확인·의무 종료" },
    ],
  },

  // ── 병적증명서 ──
  military_cert_start: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무", "병적증명서 발급"],
    question: "신청자는 누구인가요?",
    sub: "병적증명서는 본인 외 가족(배우자·직계존비속·형제자매)도 대리 신청할 수 있습니다.",
    options: [
      { id: "military_cert_self", icon: "👤", title: "본인 직접 신청", desc: "본인 방문 또는 공동인증서로 온라인 발급" },
      { id: "military_cert_proxy", icon: "👨‍👩‍👧", title: "가족 대리 신청", desc: "배우자·직계존비속·형제자매 대리 가능" },
    ],
  },

  military_cert_self: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "병적증명서", "본인 신청"],
    title: "병적증명서 발급 — 본인 신청",
    docs: [
      "본인 유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본 (PR카드 / 비자 / 시민권증서)",
      "  ▸ 온라인 발급 희망 시: 공동인증서만 있으면 정부24(gov.kr)에서 즉시 무료 발급 가능",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "⚠️ 현역 복무 중인 경우 병적증명서 발급 불가 — '입영사실확인용도' 병적증명서만 발급 가능.",
      "공동인증서가 있으면 정부24(gov.kr)에서 온라인으로 즉시 무료 발급 가능 — 영사관 방문 불필요.",
      "발급 대상: 병역준비역·보충역·예비역·전시근로역·면제자·면역자·퇴역자 및 현역 복무를 마친 여성.",
      "국문 병적증명서만 발급되므로, 외국 제출용으로는 번역공증(공증 메뉴)이 별도로 필요합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  military_cert_proxy: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "병적증명서", "가족 대리 신청"],
    title: "병적증명서 발급 — 가족 대리 신청",
    docs: [
      "대리인(가족)의 신분증 원본",
      "대리인과 병역의무자의 가족관계를 증명하는 서류 (가족관계증명서 등)",
      "병역의무자 본인의 위임장 (자필 서명)",
      "병역의무자 본인의 여권 사본 또는 신분증 사본",
      "  ▸ 병역의무자 본인이 영사관에 올 수 없는 이유를 위임장에 기재",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시",
    notices: [
      "대리 신청 가능한 가족: 배우자·직계존비속(부모·자녀·조부모·손자)·형제자매.",
      "⚠️ 현역 복무 중인 경우 병적증명서 발급 불가.",
      "공동인증서가 있으면 정부24에서 본인이 온라인 발급 가능 — 가족이 굳이 방문하지 않아도 됩니다.",
      "국문 병적증명서만 발급 — 외국 제출용은 번역공증 별도 필요.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  // ── 허가 필요 여부 확인 ──
  military_need_check: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무", "허가 필요 여부 확인"],
    question: "현재 나이와 병역 상황은?",
    sub: "허가 필요 여부는 나이와 현재 병역 신분에 따라 결정됩니다.",
    options: [
      { id: "military_age_under24", icon: "🟢", title: "만 24세 이하", desc: "원칙적으로 허가 불필요 — 단, 보충역 복무 중이면 예외" },
      { id: "military_age_over25_general", icon: "🟡", title: "만 25세 이상 — 병역 미필", desc: "일반 병역준비역 (병역판정검사 대상 또는 현역 입영 대기)" },
      { id: "military_age_supplemental", icon: "🟠", title: "보충역 복무 중 (나이 무관)", desc: "사회복무요원·전문연구요원·산업기능요원 등" },
      { id: "military_age_done", icon: "✅", title: "병역 완료·면제", desc: "현역 전역·면제·제2국민역 편입 등" },
    ],
  },

  military_age_under24: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "허가 여부 확인", "만 24세 이하"],
    title: "만 24세 이하 — 원칙적으로 국외여행허가 불필요",
    docs: [],
    costs: [{ label: "수수료", value: "해당 없음" }],
    time: "해당 없음",
    notices: [
      "✅ 만 24세 이하는 별도 국외여행허가 없이 캐나다 체류 가능합니다.",
      "⚠️ 단, 아래 경우는 나이와 무관하게 허가가 필요합니다:",
      "  ① 보충역으로 복무 중인 경우 (사회복무요원·전문연구요원·산업기능요원 등) → '보충역 복무 중' 메뉴 선택",
      "  ② 승선근무예비역으로 복무 중인 경우",
      "⚠️ 중요: 만 24세가 되는 해에는 반드시 그 다음 해(만 25세 되는 해) 1월 15일까지 국외여행허가를 신청해야 합니다.",
      "  → 허가 신청은 영사관 방문 또는 병무청 병무민원포털(mwpt.mma.go.kr) 온라인으로 가능.",
      "병역 현황 확인: 병무청 병무민원포털(mwpt.mma.go.kr) → '나의 병역사항' 조회.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_age_done: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "허가 여부 확인", "병역 완료·면제"],
    title: "병역 완료·면제 — 국외여행허가 불필요",
    docs: [],
    costs: [{ label: "수수료", value: "해당 없음" }],
    time: "해당 없음",
    notices: [
      "✅ 현역 전역·사회복무 완료·면제·제2국민역 편입 처분을 받은 경우 국외여행허가 불필요합니다.",
      "병역 완료 여부 확인: 병무청 병무민원포털(mwpt.mma.go.kr) → '나의 병역사항' 조회.",
      "병적증명서가 필요하다면 이 메뉴에서 뒤로 가서 '병적증명서 발급'을 선택하세요.",
      "만 37세 이상의 경우: 병역의무가 자동으로 종료됩니다 (별도 신고 불필요).",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_age_over25_general: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "허가 여부 확인", "만 25세 이상 일반"],
    title: "만 25세 이상 일반 병역준비역 — 국외여행허가 필요",
    docs: [],
    costs: [{ label: "수수료", value: "무료" }],
    time: "해당 없음",
    notices: [
      "✅ 국외여행허가가 필요합니다. 뒤로 가서 '국외여행허가 신청·연장' 메뉴를 선택하세요.",
      "본인의 정확한 병역 신분(영주권자/복수국적자/일반 체재)에 따라 신청 유형이 다릅니다.",
      "병역 현황 확인: 병무청 병무민원포털(mwpt.mma.go.kr) → '나의 병역사항' 조회.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_age_supplemental: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "허가 여부 확인", "보충역 복무 중"],
    title: "보충역 복무 중 — 나이 무관, 국외여행허가 필요",
    docs: [],
    costs: [{ label: "수수료", value: "무료" }],
    time: "해당 없음",
    notices: [
      "✅ 보충역으로 복무 중인 경우 나이와 무관하게 국외여행허가가 필요합니다.",
      "해당 직종: 사회복무요원·전문연구요원·산업기능요원·공중보건의사·공익법무관·공중방역수의사·승선근무예비역 등.",
      "⚠️ 사회복무요원 국외취업 사유 허가신청은 반드시 재외공관을 통해서만 가능합니다.",
      "뒤로 가서 '국외여행허가 신청·연장' → '보충역 복무 중' 메뉴를 선택하세요.",
      "허가 기간 만료 1~2개월 전에 미리 신청하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ── 국외여행허가 신청 — 신분 선택 ──
  military_permit_who: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가 신청"],
    question: "본인의 병역 신분은?",
    sub: "신분에 따라 신청 유형·서류·허가 기간이 완전히 다릅니다. 정확한 신분을 선택하세요.",
    options: [
      { id: "military_travel_permit", icon: "🎓", title: "일반 병역준비역 — 유학·취업·일반 체재", desc: "병역판정검사 대상 또는 현역 입영 대기 중 (캐나다 체재 연장)" },
      { id: "military_supplemental_abroad", icon: "🏢", title: "보충역 복무 중 (사회복무요원·전문연구요원 등)", desc: "복무 중 국외 출장·파견·취업·유학 등" },
      { id: "military_immigrant", icon: "🟢", title: "영주권·시민권 취득자 (국외이주 사유)", desc: "영주권 또는 시민권 취득 후 만 37세까지 연기" },
      { id: "military_dual", icon: "🧬", title: "선천적 복수국적자 (재외국민2세)", desc: "캐나다 출생 또는 부모 중 한 명이 한국인 — 만 37세까지 연기" },
    ],
  },

  // ── 일반 병역준비역 체재 목적 분기 ──
  military_travel_permit: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "일반 병역준비역"],
    question: "캐나다 체재 목적은?",
    sub: "목적에 따라 제출해야 하는 증빙서류가 달라집니다.",
    options: [
      { id: "military_permit_study", icon: "📚", title: "유학 (학교 재학 중)", desc: "학교별 제한 연령까지 허가 가능" },
      { id: "military_permit_work", icon: "💼", title: "취업 (직장 재직 중)", desc: "고용계약서 또는 재직증명서 필요" },
      { id: "military_permit_general", icon: "🏠", title: "일반 체재 (부모와 함께 거주 등)", desc: "부모의 체류자격 증빙 필요" },
    ],
  },

  military_permit_study: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "일반 병역준비역", "유학"],
    title: "국외여행허가 (기간연장) — 유학",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜·잉크펜 작성 필수)",
      "  ▸ 신청서 1면 하단 및 2면 중앙 서명 필수",
      "  ▸ 등록기준지(구 본적)·주민등록주소·국내 가족·전화번호·이메일 정확히 기재",
      "허가의무 위반 시 제재사항 확인서 (소정 양식)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "캐나다 체류자격 증빙서류 원본 + 사본 (PR카드 / 학생비자 등)",
      "재학증명서 또는 입학허가서 (학교명·재학기간 명시)",
      "  ▸ 기본증명서 + 가족관계증명서 사본 각 1부 (미제출 시 신청서에 등록기준지·주소 정확 기재)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월 (결과는 이메일로 통보)",
    notices: [
      "⚠️ 허가 기간 만료 최소 15일 전 (권장 1~2개월 전)에 신청하세요 — 만료 후 신청 불가.",
      "만 24세 이하는 별도 신청 없이 체재 가능하나, 만 25세 되는 해 1월 15일까지 반드시 신청.",
      "유학 허가 기간: 학교별 제한 연령까지 (예: 일반대학원 의학·치의학·한의학·수의학과 → 28세, 박사과정 → 30세 6개월 등).",
      "제한 연령 내 졸업이 어려운 경우: 제한 연령 + 1년까지 추가 연장 가능.",
      "우편 접수 또는 병무청 병무민원포털(mwpt.mma.go.kr) 온라인 신청 가능.",
      "대리인 신청 시: 병역의무자가 직접 작성·서명한 위임장 + 대리인 신분증 + 가족관계 증명서류.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 국외여행허가 유학) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_permit_work: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "일반 병역준비역", "취업"],
    title: "국외여행허가 (기간연장) — 취업",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜·잉크펜 작성 필수)",
      "  ▸ 등록기준지·주민등록주소·국내 가족·전화번호·이메일 정확히 기재",
      "허가의무 위반 시 제재사항 확인서 (소정 양식)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "캐나다 체류자격 증빙서류 원본 + 사본 (PR카드 / 취업비자 등)",
      "고용계약서 또는 재직증명서 (회사명·직위·고용기간 명시)",
      "  ▸ 기본증명서 + 가족관계증명서 사본 각 1부 (미제출 시 신청서에 등록기준지·주소 정확 기재)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "⚠️ 허가 기간 만료 최소 15일 전 신청 — 권장 1~2개월 전.",
      "우편 접수 또는 병무청 병무민원포털 온라인 신청 가능.",
      "대리인 신청 시: 위임장 + 대리인 신분증 + 가족관계 증명서류.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 국외여행허가 취업) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_permit_general: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "일반 병역준비역", "일반 체재"],
    title: "국외여행허가 (기간연장) — 일반 체재 (부모 동거 등)",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜·잉크펜 작성 필수)",
      "  ▸ 등록기준지·주민등록주소·국내 가족·전화번호·이메일 정확히 기재",
      "허가의무 위반 시 제재사항 확인서 (소정 양식)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "캐나다 체류자격 증빙서류 원본 + 사본",
      "부모의 영주권 또는 체류자격 증빙서류 (부·모 모두)",
      "  ▸ 기본증명서 + 가족관계증명서 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "⚠️ 허가 기간 만료 최소 15일 전 신청.",
      "일반 체재 목적은 허가 기간이 유학·취업에 비해 짧게 부여될 수 있습니다.",
      "우편 접수 또는 병무청 병무민원포털 온라인 신청 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 국외여행허가 일반) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ── 보충역 복무 중 국외여행허가 ──
  military_supplemental_abroad: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "보충역 복무 중"],
    question: "국외 활동 목적은?",
    sub: "보충역 복무 중 국외 활동은 목적에 따라 허가 신청 경로가 다릅니다.",
    options: [
      { id: "military_supp_business", icon: "✈️", title: "소속 기관의 국외출장·파견", desc: "소속기관장의 출장증명서 또는 파견명령서 필요" },
      { id: "military_supp_work", icon: "💼", title: "국외 취업", desc: "사회복무요원은 반드시 재외공관 통해 신청" },
      { id: "military_supp_study", icon: "📚", title: "국외 유학", desc: "전문연구요원·산업기능요원 등 유학 허가" },
    ],
  },

  military_supp_business: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "보충역 복무", "국외출장·파견"],
    title: "보충역 복무 중 — 국외출장·파견 허가",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜 작성)",
      "허가의무 위반 시 제재사항 확인서",
      "본인 유효한 한국 여권 원본 + 사본",
      "소속기관·병역지정업체 장의 국외출장증명서 또는 파견명령서",
      "캐나다 체류자격 증빙서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "소속 기관에서 발급한 공문서(출장증명서·파견명령서)가 반드시 필요합니다.",
      "허가 기간 만료 1~2개월 전 신청 권장.",
      "병무청 병무민원포털 온라인 신청도 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 보충역 출장허가) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_supp_work: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "보충역 복무", "국외취업"],
    title: "보충역 복무 중 — 국외취업 허가",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜 작성)",
      "허가의무 위반 시 제재사항 확인서",
      "본인 유효한 한국 여권 원본 + 사본",
      "재외공관의 장이 확인한 취업증명서 (영사관 방문 시 확인 가능)",
      "캐나다 체류자격 증빙서류",
      "고용계약서 또는 취업 확인 서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "⚠️ 사회복무요원·대체복무요원의 국외취업 사유 허가신청은 반드시 재외공관(영사관)을 통해서만 가능합니다 — 온라인 신청 불가.",
      "영사관 방문 시 취업증명서 확인을 함께 진행합니다.",
      "허가 기간 만료 전 반드시 연장 신청.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 보충역 취업허가) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_supp_study: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "보충역 복무", "국외유학"],
    title: "보충역 복무 중 — 국외유학 허가",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜 작성)",
      "허가의무 위반 시 제재사항 확인서",
      "본인 유효한 한국 여권 원본 + 사본",
      "재학증명서 또는 입학허가서",
      "캐나다 체류자격 증빙서류",
      "  ▸ 전문연구요원: 공동연구계약서·공동연구협약서 등 해당 서류 추가 가능",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "허가 기간 만료 1~2개월 전 신청 권장.",
      "전문연구요원·산업기능요원은 복무 중 유학 허가 조건이 다를 수 있으니 병무청(1588-9090)에 사전 문의 권장.",
      "병무청 병무민원포털 온라인 신청 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 보충역 유학허가) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ── 영주권·시민권자 국외이주 사유 허가 ──
  military_immigrant: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "영주권·시민권 취득자"],
    title: "국외이주 사유 국외여행허가 — 영주권·시민권 취득자 (만 37세까지)",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜 작성)",
      "가족 거주사실 확인서 (소정 양식 — 부모 및 본인 내용 모두 기재)",
      "개인정보제공동의서 (소정 양식 — 부모·본인 모두 서명 필수)",
      "본인 유효한 한국 여권 원본 + 사본 1부",
      "캐나다 영주권 카드 또는 시민권증서 원본 + 사본",
      "부모의 영주권 또는 시민권 증빙서류 (부·모 모두)",
      "기본증명서 + 가족관계증명서 사본 각 1부",
      "  ▸ 미제출 시 신청서에 등록기준지·주민등록주소 정확히 기재",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "신청 자격 (아래 중 하나 해당):",
      "  ① 영주권·시민권을 가진 부 또는 모와 함께 국외 거주",
      "  ② 부모와 함께 만 24세 이전부터 계속 국외 거주",
      "  ③ 본인이 국외에서 10년 이상 계속 거주",
      "⚠️ 신청 기간: 만 24세가 되는 해 ~ 만 25세 되는 해 1월 15일까지 반드시 신청.",
      "영주권 취득 후 해당국 3년 미만 거주 시: 3년 이내 범위에서 1회에 한해 허가.",
      "⚠️ 허가 후에도 본인 또는 부모가 국내에서 1년 중 6개월 이상 거주하거나 영리활동 시 허가 자동 취소.",
      "우편 접수 또는 병무청 병무민원포털 온라인 신청 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 국외이주 허가) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ── 선천적 복수국적자 (재외국민2세) ──
  military_dual: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "국외여행허가", "선천적 복수국적자"],
    title: "선천적 복수국적자 국외여행허가 — 재외국민2세 (만 37세까지)",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜 작성)",
      "가족 거주사실 확인서 (소정 양식 — 부모 및 본인 내용 모두 기재)",
      "개인정보제공동의서 (소정 양식 — 부모·본인 모두 서명)",
      "본인 유효한 한국 여권 원본 + 사본 (없으면 기본증명서로 대체 가능 — 사전 문의)",
      "캐나다 여권 또는 시민권증서 원본 + 사본",
      "부모의 영주권 또는 시민권 증빙서류 (부·모 모두)",
      "기본증명서 + 가족관계증명서 사본 각 1부",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 병무청 심사 약 1~2개월",
    notices: [
      "대상: 캐나다에서 출생하거나 부모 중 한 명이 한국 국적인 선천적 복수국적 남성.",
      "⚠️ 신청 기간: 만 24세가 되는 해 ~ 만 25세 되는 해 1월 15일까지.",
      "⚠️ 재외국민2세 자격 박탈 조건: 만 25세 이전 국내 연 90일 이상 체류한 경우 자격 불인정.",
      "⚠️ 허가 취소 조건: 본인 또는 부모가 국내 1년 중 6개월 이상 거주·영리활동 시 허가 취소 및 병역의무 부과.",
      "예외: 국내 대학 재학 중 학업은 영리활동으로 보지 않음 (단, 부모가 함께 6개월 이상 거주 시 취소).",
      "병무청 병무민원포털 온라인 신청 또는 우편 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 복수국적 허가) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ── 귀국·허가취소 분기 ──
  military_cancel_return: {
    type: "question",
    service: "military",
    breadcrumb: ["홈", "병무", "귀국·허가취소"],
    question: "어떤 상황인가요?",
    sub: "상황에 따라 필요한 조치가 다릅니다.",
    options: [
      { id: "military_permit_cancel", icon: "✈️", title: "조기 귀국 — 허가 취소", desc: "국외여행허가 취소 신청" },
      { id: "military_return_permanent", icon: "🏠", title: "영구 귀국·국내 장기 체류", desc: "허가 취소 후 병역 의무 재개 여부 확인" },
      { id: "military_return_exempt", icon: "✅", title: "만 37세 이상·면제 처분 — 의무 종료", desc: "병역의무 종료 확인" },
    ],
  },

  military_permit_cancel: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "귀국·허가취소", "조기 귀국"],
    title: "국외여행허가 취소 신청 — 조기 귀국",
    docs: [
      "병역의무자 국외여행(기간연장) 허가(취소) 신청서 (볼펜 작성)",
      "  ▸ 신청서 취소 사유란 기재",
      "본인 유효한 한국 여권 원본 + 사본",
      "캐나다 체류자격 증빙서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "영사관 접수 후 처리",
    notices: [
      "허가 기간이 남아있는 상태에서 귀국할 경우 허가 취소 신청을 해야 합니다.",
      "취소 없이 귀국하면 다음 번 허가 신청 시 불이익이 있을 수 있습니다.",
      "병무청 병무민원포털 온라인 신청도 가능합니다.",
      "귀국 후 국내에서 6개월 이상 체재하거나 영리활동 시 병역 의무가 재개됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병무 → 허가취소) →",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  military_return_permanent: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "귀국·허가취소", "영구 귀국"],
    title: "영구 귀국·국내 장기 체류 — 병역의무 재개",
    docs: [
      "병역의무자 국외여행허가 취소 신청서 (해당 시)",
      "본인 유효한 한국 여권 원본 + 사본",
      "영주권 또는 시민권증서 원본 + 사본 (해당 시)",
      "기본증명서 + 가족관계증명서 (해당 시)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "귀국 전 영사관 또는 병무청 상담 권장",
    notices: [
      "⚠️ 국외이주 사유 허가 중에 영구 귀국하거나 1년 중 6개월 이상 국내 거주·취업하면 병역 의무가 자동으로 재개됩니다.",
      "귀국 전 반드시 병무청(1588-9090) 또는 영사관에 먼저 상담하여 본인의 병역 의무 현황을 확인하세요.",
      "병역 의무 재개 후 처리 방법(입영·사회복무 등)은 병무청에서 안내받아야 합니다.",
      "병역면제 여부 확인: 병무청 병무민원포털(mwpt.mma.go.kr) → '나의 병역사항' 조회.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "귀국 전 상담 예약하기 →",
    onlineLink: "https://www.mma.go.kr",
  },

  military_return_exempt: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병무", "귀국·허가취소", "병역의무 종료"],
    title: "병역의무 종료 확인 — 만 37세 이상 또는 면제 처분",
    docs: [],
    costs: [{ label: "수수료", value: "해당 없음" }],
    time: "해당 없음",
    notices: [
      "✅ 만 37세가 되는 해 1월 1일부터 병역의무가 자동 종료됩니다 — 별도 신고 불필요.",
      "✅ 면제 처분(전시근로역 편입·병역면제·제2국민역 편입 등)을 받은 경우 국외여행허가 불필요.",
      "병역 현황 최종 확인: 병무청 병무민원포털(mwpt.mma.go.kr) → '나의 병역사항' 조회.",
      "병적증명서가 필요하다면 홈 → 병무 → 병적증명서 발급 메뉴를 이용하세요.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://mwpt.mma.go.kr",
  },

  // ══ ENGLISH NODES: Notarization ══
  notarization_start_en: {
    type: "question",
    service: "notarization",
    breadcrumb: ["Home", "Notarization"],
    question: "What type of notarization do you need?",
    sub: "⚠️ All signatures must be made in front of the consular officer in person. Pre-signed documents will NOT be accepted. Proxy applications are not allowed.",
    options: [
      { id: "notarization_apostille_guide_en", icon: "❓", title: "Apostille vs Consular Notarization — Not sure which I need", desc: "Find out which process applies to your situation first" },
      { id: "notarization_saseo_en", icon: "📜", title: "Signature Notarization (사서증서 인증)", desc: "POA, legal documents, declarations, inheritance renunciation, etc." },
      { id: "notarization_ingam_en", icon: "🔏", title: "Seal (인감) Related Documents", desc: "Seal certificate issuance POA, seal registration / change" },
      { id: "notarization_translation_en", icon: "🌐", title: "Translation Notarization", desc: "English translation of Korean documents, driver's licence translation" },
      { id: "notarization_copy_en", icon: "📋", title: "Certified True Copy Confirmation", desc: "Consular confirmation of Canadian-issued documents" },
    ],
  },

  notarization_apostille_guide_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Apostille vs Consular Notarization"],
    title: "Apostille vs Consular Notarization — Which Do You Need?",
    docs: [
      "📌 Key question: Does the Korean institution require an 'Apostille' or a 'Consular Notarization'? Check with them first.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "🔵 Apostille — For submitting Canadian public documents to Korea",
      "  ▸ Canada is a member of the Hague Apostille Convention — no Consulate visit needed",
      "  ▸ Federal documents (citizenship certificate, RCMP criminal record check, etc.): Apostille from Global Affairs Canada",
      "  ▸ Provincial documents (birth certificate, marriage certificate, divorce judgment, etc.): Apostille from ServiceOntario (for Ontario)",
      "  ▸ Apostille and consular notarization CANNOT be applied to the same document simultaneously",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "🔴 Consular Notarization — For certifying signatures on personal documents",
      "  ▸ Power of Attorney, declarations, inheritance renunciation, contracts — documents you wrote yourself",
      "  ▸ Seal (인감) certificate issuance POA, seal registration forms",
      "  ▸ English translation of Korean documents (family certificates, etc.)",
      "  ▸ The Consulate does NOT verify the authenticity of Canadian public documents",
    ],
    costs: [{ label: "Consultation", value: "Free" }],
    time: "Confirm first, then proceed to the right service",
    notices: [
      "If unsure, contact the Korean institution you are submitting to (law office, registry, bank, government office) first.",
      "Apostille applications: Global Affairs Canada (federal) / ServiceOntario (provincial).",
      "If consular notarization is confirmed to be needed, go back and select the appropriate menu.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.international.gc.ca/country-pays/apostille.aspx?lang=eng",
  },

  notarization_saseo_en: {
    type: "question",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Signature Notarization"],
    question: "What type of document needs to be notarized?",
    sub: "Consular signature notarization confirms that the signature on a personal document was made of the person's own free will. The Consulate does NOT verify the content of the document.",
    options: [
      { id: "notarization_pow_en", icon: "📜", title: "Power of Attorney (POA)", desc: "Delegating Korean real estate, banking, inheritance, certificate issuance, etc." },
      { id: "notarization_legal_act_en", icon: "⚖️", title: "Legal Act Documents", desc: "Inheritance division agreement, purchase/lease contracts, bank loan agreements, renunciation of inheritance" },
      { id: "notarization_sign_en", icon: "✍️", title: "Factual Statement Documents", desc: "Signature statement, identity statement (동일인진술서), residency statement, employment letter" },
    ],
  },

  notarization_pow_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Signature Notarization", "Power of Attorney"],
    title: "Power of Attorney (POA) — Consular Notarization",
    docs: [
      "POA document — prepared in advance, signature field left BLANK (sign in front of consular officer)",
      "  ▸ Must include: attorney-in-fact's full name, resident registration number, address, phone, purpose/scope of authority, and number of copies",
      "  ▸ Purpose examples: real estate sale, mortgage registration, vehicle sale, banking, general use",
      "  ▸ Template available on Consulate website — typing is OK, but sign in person at the Consulate",
      "Consular notarization request form (소정 양식) — handwritten only, no typed form",
      "Your valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020 (no resident number): also submit Passport Information Certificate (CAD $1.00)",
      "Valid Canadian immigration status document — original (PR Card / visa / citizenship certificate)",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $2.60 (cash)" },
      { label: "Passport Info Certificate (if needed)", value: "CAD $1.00 extra" },
    ],
    time: "Same-day processing (approx. 30 min – 1 hour)",
    notices: [
      "⚠️ ALL signatures must be made in front of the consular officer — pre-signed documents will be rejected.",
      "Each signature on the same document counts as a separate fee.",
      "For Korean real estate registration (등기): a Canadian Notary Public + Apostille may be accepted instead — confirm with the Korean registry office first.",
      "Seal (인감) certificate issuance POA requires a separate process — use the Seal (인감) menu.",
      "Canadian citizens without a Korean passport: call ahead (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → POA) →",
  },

  notarization_legal_act_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Signature Notarization", "Legal Act Documents"],
    title: "Legal Act Document Notarization — Inheritance, Contracts, Bank Agreements",
    docs: [
      "Document to be notarized — signature field BLANK (sign in front of consular officer)",
      "  ▸ Inheritance division agreement (상속재산분할협의서)",
      "  ▸ Renunciation of inheritance (상속포기서)",
      "  ▸ Real estate purchase/sale contract, lease contract, construction contract",
      "  ▸ Bank loan agreement, credit guarantee agreement",
      "  ▸ Other legal act documents",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Your valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020: also bring Passport Information Certificate",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Documents without stated value", value: "CAD $5.20 (cash)" },
      { label: "Contracts with stated monetary value", value: "Approx. CAD $3.00 per CAD $1,000 of value" },
      { label: "Passport Info Certificate (if needed)", value: "CAD $1.00 extra" },
    ],
    time: "Same-day processing (documents with monetary value may take longer to review)",
    notices: [
      "⚠️ ALL signatures must be made in front of the consular officer — no pre-signing.",
      "For documents with a stated monetary value (contracts), the fee varies — confirm before visiting.",
      "The Consulate certifies the signature only — it does NOT verify the legal validity or accuracy of the document content.",
      "Canadian citizens without a Korean passport: call ahead.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → Legal Document) →",
  },

  notarization_sign_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Signature Notarization", "Factual Statement"],
    title: "Factual Statement Notarization — Declarations, Identity Statements, etc.",
    docs: [
      "Document to be notarized — signature field BLANK (sign in front of consular officer)",
      "  ▸ Signature statement (서명진술서)",
      "  ▸ Identity statement (동일인진술서) — for name discrepancies",
      "  ▸ Residency statement (거주사실진술서)",
      "  ▸ Employment letter, enrollment certificate, other factual statements",
      "  ▸ Use the Consulate's standard form where available",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Your valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020: also bring Passport Information Certificate",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $5.20 (cash)" },
      { label: "Passport Info Certificate (if needed)", value: "CAD $1.00 extra" },
    ],
    time: "Same-day processing (approx. 30 min – 1 hour)",
    notices: [
      "⚠️ ALL signatures must be made in front of the consular officer — proxy applications NOT allowed.",
      "The Consulate certifies the signature only — it does NOT verify the accuracy of the statement's content.",
      "Canadian citizens without a Korean passport: call ahead (416-920-3809).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → Statement) →",
  },

  notarization_ingam_en: {
    type: "question",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Seal (인감) Documents"],
    question: "Which seal (인감) document do you need?",
    sub: "Seal-related documents are directly tied to property rights in Korea. You MUST appear in person and handwrite the form in front of the consular officer. No proxy applications under any circumstances.",
    options: [
      { id: "notarization_ingam_pow_en", icon: "🔏", title: "Seal Certificate Issuance POA (인감증명서 발급 위임장)", desc: "Authorizing someone in Korea to obtain your seal certificate on your behalf" },
      { id: "notarization_ingam_change_en", icon: "✏️", title: "Seal Registration / Change Form (인감신고서)", desc: "Registering a new seal or changing an existing one" },
      { id: "notarization_ingam_protect_en", icon: "🛡️", title: "Seal Protection / Release (인감보호신청서)", desc: "Freezing or unfreezing seal certificate issuance to prevent fraud" },
    ],
  },

  notarization_ingam_pow_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Seal Documents", "Seal Certificate Issuance POA"],
    title: "Seal Certificate Issuance POA (인감증명서 발급 위임장)",
    docs: [
      "Seal Certificate Issuance POA form — available at the Consulate or download from website",
      "  ▸ Leave signature field BLANK — handwrite the form in front of the consular officer (typed and printed forms NOT accepted)",
      "  ▸ Include: attorney-in-fact's name, resident registration number, address, phone, purpose of seal certificate use",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Your valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020 (no resident number): also bring Passport Information Certificate",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $5.20 (cash)" },
      { label: "Passport Info Certificate (if needed)", value: "CAD $1.00 extra" },
    ],
    time: "Same-day processing (approx. 30 min – 1 hour)",
    notices: [
      "⚠️ You MUST appear in person and handwrite the form — no proxy, no typed forms, no photocopied forms.",
      "The attorney-in-fact in Korea must bring this POA AND your seal stamp when conducting business on your behalf.",
      "If your seal is not yet registered in Korea, you need to complete a seal registration (인감신고) first.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → Seal POA) →",
  },

  notarization_ingam_change_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Seal Documents", "Seal Registration / Change"],
    title: "Seal Registration / Change Form (인감신고서)",
    docs: [
      "Seal Registration / Change Form — available at the Consulate or download from website",
      "  ▸ Handwrite in front of the consular officer",
      "  ▸ Include guarantor's name, resident registration number, Korean address — guarantor must affix their seal stamp",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Your valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020: also bring Passport Information Certificate",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $5.20 (cash)" },
    ],
    time: "Same-day processing",
    notices: [
      "⚠️ You MUST appear in person — no proxy applications.",
      "You must have a Korean resident registration number (주민등록번호) — not available to those whose registration has been cancelled.",
      "The guarantor and the attorney-in-fact must be different people.",
      "If you want to create a new seal stamp in Korea: a signature can substitute — the attorney-in-fact brings the stamp when conducting business.",
      "The guarantor's seal must be affixed before submitting documents to the Korean institution.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → Seal Registration) →",
  },

  notarization_ingam_protect_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Seal Documents", "Seal Protection / Release"],
    title: "Seal Protection / Release (인감보호신청서)",
    docs: [
      "Seal Protection / Release Form — available at the Consulate or download from website",
      "  ▸ Handwrite in front of the consular officer",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Your valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020: also bring Passport Information Certificate",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $5.20 (cash)" },
    ],
    time: "Same-day processing",
    notices: [
      "Seal protection: blocks all seal certificate issuance in Korea — used to prevent unauthorized use of your seal.",
      "Seal protection release: lifts the block, allowing seal certificates to be issued again.",
      "You MUST appear in person — no proxy applications.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → Seal Protection) →",
  },

  notarization_translation_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Translation Notarization"],
    title: "Translation Notarization — Korean Documents to English",
    docs: [
      "Original Korean document — original + 1 photocopy",
      "  ▸ Family certificate, basic certificate, marriage certificate, family register (제적등본), etc.",
      "English translation — prepared by the translator (refer to sample templates on the Consulate website)",
      "  ▸ Must not add content that isn't there, or omit content that is",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Translator's valid Korean passport — original + photocopy",
      "  ▸ Passport issued after Dec 20, 2020: also bring Passport Information Certificate",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $5.20 (cash)" },
    ],
    time: "Same-day processing (30 min – 1 hour). 10+ documents: next-day pickup.",
    notices: [
      "The translator must visit in person — no proxy submission.",
      "No professional translator required — you may translate the document yourself.",
      "The Consulate certifies your signature only — accuracy of translation is the translator's responsibility.",
      "Use the sample templates on the Consulate website for family-related documents.",
      "10+ documents: do NOT expect same-day pickup.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → Translation) →",
  },

  notarization_copy_en: {
    type: "result",
    service: "notarization",
    breadcrumb: ["Home", "Notarization", "Certified True Copy"],
    title: "Certified True Copy Confirmation (영사확인)",
    docs: [
      "Original Canadian-issued document + 1 photocopy",
      "  ▸ Canadian public document or document notarized by a Canadian Notary Public",
      "Consular notarization request form (소정 양식) — handwritten only",
      "Your valid Korean passport — original + photocopy",
      "Valid Canadian immigration status document — original",
    ],
    costs: [
      { label: "Fee per document", value: "CAD $5.20 (cash)" },
    ],
    time: "Same-day processing (approx. 30 min – 1 hour)",
    notices: [
      "⚠️ Canada is a member of the Apostille Convention — Canadian public documents (birth certificate, marriage certificate, etc.) are often better handled with an Apostille rather than consular notarization.",
      "Federal documents → Apostille from Global Affairs Canada.",
      "Ontario provincial documents → Apostille from ServiceOntario.",
      "Apostille and consular notarization CANNOT be applied to the same document — you would need a separate copy.",
      "Unsure which applies? Call the Consulate (416-920-3809) or the Korean institution you are submitting to.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → True Copy) →",
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
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "신규 등록"],
    title: "재외국민 신규 등록",
    docs: [
      "재외국민등록신청서 (소정 양식)",
      "  ▸ 등록기준지(구 본적): 기본증명서 상단 확인 후 수기 입력",
      "  ▸ 병역관계: 남성 — 병역필/미필/면제 중 선택, 여성 — 해당없음",
      "  ▸ 체류 주소: 도시·우편번호 포함 영문 전체 주소 기재",
      "  ▸ 행정정보 공동이용 동의 시 하단 성명·서명 필수",
      "유효한 한국 여권 원본",
      "캐나다 체류자격 증빙서류 원본 + 사본 (PR카드 앞뒷면 / 비자 / 학생허가증 등)",
      "  ▸ 행정정보 공동이용에 동의하면 체류자격 증빙서류 제출 불필요",
      "  ▸ 유효한 비자·영주권이 없는 경우: 장기체류 증빙서류 제출 (임대차계약서 등)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 처리",
    notices: [
      "⚠️ 캐나다 입국 후 90일 이내에 등록해야 합니다 — 등록 의무 위반 시 과태료가 부과될 수 있습니다.",
      "온라인 등록 가능: 재외동포365민원포털(g4k.go.kr)에서 공동인증서로 신청 가능.",
      "시민권자(한국 국적 상실자)는 재외국민 등록 불가.",
      "해외이주신고 완료 후에는 재외국민 등록도 함께 신청해야 국내 행정 업무 처리가 가능합니다.",
      "재외국민등록부 등본은 부동산 거래·상속·금융 거래 시 해외거주 증명 서류로 사용됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  registration_change: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "변경·이동 신고"],
    title: "재외국민 등록 변경·이동 신고",
    docs: [
      "재외국민등록 변경신청서 (소정 양식)",
      "유효한 한국 여권 원본",
      "변경 사항 증빙서류:",
      "  ▸ 주소 변경: 새 주소 확인 서류 (임대차계약서, 유틸리티 청구서 등)",
      "  ▸ 체류신분 변경: 새로운 PR카드 / 비자 원본 + 사본",
      "  ▸ 귀국(이동) 신고: 귀국 사실 확인 가능한 서류",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 처리",
    notices: [
      "온라인 변경도 가능: 재외동포365민원포털(g4k.go.kr)에서 공동인증서로 신청.",
      "주소·체류신분 변경 시 지체 없이 신고하는 것을 권장합니다.",
      "캐나다 내 이사 시에도 변경 신고가 필요합니다.",
      "한국으로 귀국하거나 다른 나라로 이동 시에도 이동 신고를 해야 합니다.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  registration_copy: {
    type: "result",
    service: "registration",
    breadcrumb: ["홈", "재외국민 등록", "등록부 등본 발급"],
    title: "재외국민등록부 등본 발급",
    docs: [
      "유효한 한국 여권 원본",
      "수수료 현금",
    ],
    costs: [{ label: "등본 1부당 수수료", value: "CAD $1.00 (현금)" }],
    time: "방문 당일 즉시 발급",
    notices: [
      "공동인증서 보유 시 재외동포365민원포털(g4k.go.kr)에서 온라인으로 무료 발급 가능.",
      "부동산 거래·상속·금융 거래 시 해외거주 증명 목적으로 사용됩니다.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },

  // ══ OVERSEAS EMIGRATION REPORT (해외이주 신고) ══
  emigration_start: {
    type: "question",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고"],
    question: "어떤 해외이주 신고 업무가 필요하신가요?",
    sub: "해외이주 신고는 영주권 취득 등으로 한국 주민등록을 재외국민으로 정리하는 절차입니다. 신고 완료 시 건강보험이 정지되고 주민등록이 재외국민으로 변경됩니다.",
    options: [
      { id: "emigration_new", icon: "🛫", title: "해외이주 신고 (신규)", desc: "영주권 취득 후 한국 주민등록 정리" },
      { id: "emigration_cert", icon: "📄", title: "해외이주신고확인서 발급", desc: "국민연금 반환일시금 신청 등에 사용" },
    ],
  },

  emigration_new: {
    type: "result",
    service: "emigration",
    breadcrumb: ["홈", "해외이주 신고", "신규 신고"],
    title: "해외이주 신고 (신규)",
    docs: [
      "해외이주신고 신청서 (소정 양식 1부)",
      "행정정보 공동이용 사전동의서 (소정 양식 1부)",
      "  ▸ ✅ 동의 시: 주민등록등본·납세증명서 3종·병적증명서 제출 불필요 (영사관이 직접 조회)",
      "  ▸ ❌ 미동의 시: 아래 서류 모두 직접 발급하여 제출 필요",
      "유효한 한국 여권 원본 + 사본 1부",
      "캐나다 영주권 카드 원본 + 사본 (앞뒷면)",
      "기본증명서 (상세, 주민번호 전부 공개) — 3개월 이내",
      "가족관계증명서 (상세, 주민번호 전부 공개) — 3개월 이내",
      "  ▸ 행정정보 동의 미동의 시 추가 제출:",
      "  ▸ 주민등록등본 (주민번호 전부 공개) — 정부24 발급",
      "  ▸ 만 18~37세 남성: 병역사항 기재 주민등록초본 또는 병적증명서 (미필자는 병적증명서 필수)",
      "  ▸ 국세 납세증명서 (해외이주용, 주민번호+한국주소 전부 공개) — 홈택스 발급",
      "  ▸ 지방세 납세증명서 (해외이주용, 주민번호 전부 공개) — 정부24 발급",
      "  ▸ 관세 납세증명서 (해외이주용, 주민번호 전부 공개) — 관세청 전자통관시스템 발급",
      "  ▸ 성인 동반 가족 함께 신고 시: 동반자도 위 서류 모두 구비 후 반드시 함께 방문",
      "  ▸ 미성년 자녀 동반 신고 시: 자녀 여권+영주권, 기본·가족관계증명서, 납세증명서 3종 별도 필요",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "방문 당일 즉시 처리",
    notices: [
      "⚠️ 반드시 본인 직접 방문 — 대리 신청 불가. 성인은 반드시 본인이 방문해야 합니다.",
      "⚠️ 해외이주신고 완료 시 국민건강보험이 즉시 정지됩니다.",
      "💡 행정정보 공동이용에 동의하면 주민등록등본·납세증명서·병적증명서를 직접 발급하지 않아도 됩니다 — 방문 전 동의서를 미리 작성해 오세요.",
      "납세증명서는 유효기간이 있으므로 동의 미동의 시 방문 직전 발급 필수.",
      "해외이주신고 완료 후 재외국민 등록도 함께 신청해야 국내 행정 업무 처리가 가능합니다.",
      "국제결혼 사유 해외이주신고 시: 양국 혼인관계증명서 + 외국 혼인증명서 번역본(아포스티유 또는 영사확인) + 배우자 여권 사본 추가.",
      "기존 거주여권(사진 없는 구형 여권) 소지자는 별도 해외이주신고 불필요.",
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
  .map(([\1, \2]: [any, any]) => {
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
  { id: "military_start", icon: "🪖", title: "병무", desc: "국외여행허가 · 귀국 신고" },
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
    const nav = navigator.language || navigator.userLanguage || "";
    const langs = Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [nav];
    const isKorean = langs.some((l: any) => l.toLowerCase().startsWith("ko"));
    return isKorean ? "ko" : "en";
  });

  const page = TREE[pageId] ?? { type: "home" };

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
    visa_other_start: "visa_other_start_en",
    visa_keta_en: "visa_keta_en",
    visa_f1d_en: "visa_f1d_en",
    visa_d4_en: "visa_d4_en",
    visa_no_heritage_en: "visa_no_heritage_en",
    visa_visit_en: "visa_visit_en",
    visa_transit_en: "visa_transit_en",
    notarization_start: "notarization_start_en",
    notarization_saseo: "notarization_saseo_en",
    notarization_ingam: "notarization_ingam_en",
    notarization_ingam_pow: "notarization_ingam_pow_en",
    notarization_ingam_change: "notarization_ingam_change_en",
    notarization_ingam_protect: "notarization_ingam_protect_en",
    notarization_apostille_guide: "notarization_apostille_guide_en",
    notarization_legal_act: "notarization_legal_act_en",
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
    military_travel_permit: "military_travel_permit_en",
    military_permit_study: "military_permit_study_en",
    military_permit_work: "military_permit_work_en",
    military_permit_general: "military_permit_general_en",
    military_supplemental_abroad: "military_supplemental_abroad_en",
    military_supp_business: "military_supp_business_en",
    military_supp_work: "military_supp_work_en",
    military_supp_study: "military_supp_study_en",
    military_immigrant: "military_immigrant_en",
    military_dual: "military_dual_en",
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
            const getSnippet = (node) => {
              const candidates = [
                ...(Array.isArray(node.docs) ? node.docs.filter(d => !d.trim().startsWith("▸")) : []),
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
              {page.sub && <div className="q-sub">{page.sub}</div>}
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
                          <span style={{ fontSize: "12px" }}>{doc.replace(/^▸\s*/, "")}</span>
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
