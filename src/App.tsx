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

  .app { min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; }

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
  .header-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; min-width: 0; flex: 1; }
  .header-flag { font-size: 22px; flex-shrink: 0; }
  .header-title { color: #fff; font-size: 13.5px; font-weight: 700; line-height: 1.25; min-width: 0; }
  .header-title span { display: block; font-size: 11px; font-weight: 400; opacity: 0.75; margin-top: 1px; }
  .header-tel { color: rgba(255,255,255,0.8); font-size: 12px; display: flex; align-items: center; gap: 4px; flex-shrink: 0; white-space: nowrap; }
  .header-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  @media (max-width: 480px) {
    .header-title { font-size: 12px; }
    .header-title span { display: none; }
    .header-tel { display: none; }
  }

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
  .crumb-short { display: none; }
  @media (max-width: 640px) {
    .crumb-full { display: none; }
    .crumb-short { display: inline; }
    .p-label { max-width: 64px; }
  }
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
    display: flex; align-items: center; gap: 9px;
    padding: 6px 0;
    border-bottom: 1px solid #f2f4f9;
    font-size: 13px; line-height: 1.55; color: #334;
    overflow-wrap: anywhere; word-break: break-word;
  }
  .doc-item > span { min-width: 0; }
  .doc-item:last-child { border-bottom: none; }
  .doc-item.has-form { align-items: center; }
  .doc-item.has-form .doc-num, .doc-item.has-form .doc-bullet { margin-top: 0; }
  .form-dl {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 3px;
    margin-left: 8px; padding: 3px 9px;
    background: #eef4fb; color: #003478;
    border: 1px solid #cdddef; border-radius: 6px;
    font-size: 12px; font-weight: 600; text-decoration: none;
    white-space: nowrap; cursor: pointer;
  }
  .form-dl:hover { background: #dceaf8; }
  .form-dl .form-label { font-size: 12px; }
  @media (max-width: 400px) {
    .form-dl { padding: 3px 7px; }
    .form-dl .form-label { display: none; }
  }
  .sample-dl {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 3px;
    margin-left: 6px; padding: 3px 9px;
    background: #fff6e9; color: #9a5b00;
    border: 1px solid #f0dcae; border-radius: 6px;
    font-size: 12px; font-weight: 600; text-decoration: none;
    white-space: nowrap; cursor: pointer;
  }
  .sample-dl:hover { background: #fdeccd; }
  .sample-dl .form-label { font-size: 12px; }
  @media (max-width: 400px) {
    .sample-dl { padding: 3px 7px; }
    .sample-dl .form-label { display: none; }
  }
  .doc-num {
    width: 20px; height: 20px; border-radius: 50%;
    background: #e6eef8; color: #1a5fa5;
    font-size: 10.5px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .doc-bullet { font-weight: 700; flex-shrink: 0; }

  .cost-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #f2f4f9; font-size: 13px; }
  .cost-row:last-child { border-bottom: none; }
  .cost-label { color: #556; }
  .cost-value { font-weight: 700; color: #003478; }

  /* ── 수령방법 박스 (여권 등) ── */
  .pickup-card { border: 1.5px solid #003478; border-radius: 12px; overflow: hidden; margin-bottom: 12px; box-shadow: 0 1px 4px rgba(0,52,120,0.06); }
  .pickup-head { background: #eef3fb; padding: 9px 14px; display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; color: #003478; }
  .pickup-body { padding: 2px 14px 10px; }
  .pickup-opt { padding: 9px 0 8px; border-bottom: 1px solid #f2f4f9; }
  .pickup-opt:last-child { border-bottom: none; }
  .pickup-opt-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .pickup-opt-name { font-size: 14px; font-weight: 600; color: #1a1a2e; }
  .pickup-badge { font-size: 11px; color: #556; background: #f0f2f7; padding: 2px 8px; border-radius: 8px; white-space: nowrap; flex-shrink: 0; }
  .pickup-badge.fast { color: #185fa5; background: #e6f1fb; }
  .pickup-opt-desc { font-size: 12px; color: #667; margin-top: 4px; line-height: 1.45; }
  .pickup-warn { font-size: 12px; color: #a35a00; margin-top: 3px; line-height: 1.4; }

  /* ── 주의사항 — ⚠️ 강조 배경 ── */
  .notice-item {
    display: flex; align-items: flex-start; gap: 8px;
    padding: 5px 0;
    font-size: 12.5px; line-height: 1.55; color: #445;
    overflow-wrap: anywhere; word-break: break-word;
  }
  .notice-item > span { min-width: 0; }
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
    background: linear-gradient(135deg, #1a4d8f 0%, #003478 100%);
    color: #fff;
    border: none; border-radius: 12px;
    padding: 14px;
    font-size: 15px; font-weight: 700;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.1s;
    letter-spacing: 0.01em;
    box-shadow: 0 3px 12px rgba(0,52,120,0.25);
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
    padding: 7px 12px;
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
    position: absolute; right: 6px; top: 50%;
    transform: translateY(-50%);
    background: #e8eef7; border: none; border-radius: 50%;
    width: 22px; height: 22px; font-size: 12px;
    cursor: pointer; color: #667;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.12s;
    box-sizing: content-box; padding: 9px;
    background-clip: content-box;
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
  .subtitle-row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin-top: 5px; }
  .subtitle-row p { margin-top: 0; }
  .faq-link {
    background: none; border: none; cursor: pointer; font-family: inherit;
    font-size: 12.5px; font-weight: 600; color: #185fa5;
    display: inline-flex; align-items: center; gap: 3px; white-space: nowrap;
    flex-shrink: 0; padding: 0;
    transition: color 0.15s;
  }
  .faq-link:hover { color: #003478; text-decoration: underline; }
  .faq-link-arrow { font-size: 15px; font-weight: 300; line-height: 1; }

  .faq-tabs { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 1.35rem; }
  .faq-tab {
    background: #ffffff; border: 1px solid #dde4ef; color: #46546b;
    font-size: 13px; font-weight: 600; font-family: inherit; letter-spacing: -0.01em;
    padding: 7px 14px; border-radius: 10px; cursor: pointer;
    white-space: nowrap; box-shadow: 0 1px 2px rgba(16,32,64,0.04);
    transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease, background 0.16s ease, color 0.16s ease;
  }
  .faq-tab:hover { border-color: #b9c9e4; color: #003478; transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,52,120,0.10); }
  .faq-tab:active { transform: translateY(0); }
  .faq-tab.active {
    background: linear-gradient(135deg, #0a3f86, #003478);
    border-color: #003478; color: #ffffff;
    box-shadow: 0 4px 12px rgba(0,52,120,0.28);
  }
  .faq-tab.active:hover { color: #ffffff; transform: translateY(-1px); }

  /* 부드럽게 펼쳐지는 아코디언 (grid-rows 트랜지션) */
  .faq-answer-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.28s ease; }
  .faq-answer-wrap.open { grid-template-rows: 1fr; }
  .faq-answer-inner { overflow: hidden; }

  .faq-empty { text-align: center; padding: 2rem 1rem; color: #99a; font-size: 13.5px; line-height: 1.6; white-space: pre-line; background: #fafbfd; border: 1.5px dashed #e0e6f0; border-radius: 12px; }

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
    background: #003478; color: #fff;
    border: none; border-radius: 12px;
    padding: 15px; font-size: 15px; font-weight: 700;
    cursor: pointer; text-align: center; text-decoration: none;
    letter-spacing: .01em;
    box-shadow: 0 3px 12px rgba(0,52,120,0.25);
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

  /* ── 채팅 도우미 (FAB + 패널) ───────────────────────── */
  .chat-fab {
    position: fixed; right: 18px; bottom: 18px; z-index: 200;
    width: 56px; height: 56px; border-radius: 50%;
    background: #003478; color: #fff; border: none; cursor: pointer;
    font-size: 24px; box-shadow: 0 4px 16px rgba(0,52,120,0.32);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.15s, background 0.15s;
  }
  .chat-fab:hover { transform: scale(1.06); background: #004ba0; }
  .chat-panel {
    position: fixed; right: 18px; bottom: 84px; z-index: 200;
    width: 360px; max-width: calc(100vw - 36px);
    height: 520px; max-height: calc(100vh - 120px);
    background: #fff; border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.22);
    display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid #e4eaf6;
  }
  .chat-head {
    background: linear-gradient(135deg, #003478 0%, #004ba0 100%);
    color: #fff; padding: 13px 16px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .chat-head-title { font-size: 14px; font-weight: 700; }
  .chat-head-sub { font-size: 11px; opacity: 0.8; margin-top: 1px; }
  .chat-close { background: none; border: none; color: #fff; font-size: 18px; cursor: pointer; opacity: 0.85; padding: 4px 6px; }
  .chat-close:hover { opacity: 1; }
  .chat-body { flex: 1; overflow-y: auto; padding: 14px; background: #f7f9fd; display: flex; flex-direction: column; gap: 12px; }
  .chat-row { display: flex; gap: 7px; align-items: flex-start; }
  .chat-row.user { justify-content: flex-end; }
  .chat-avatar { width: 28px; height: 28px; border-radius: 50%; background: #e6f1fb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
  .chat-bubble-bot { background: #fff; border: 0.5px solid #e4eaf6; padding: 10px 12px; border-radius: 4px 13px 13px 13px; font-size: 13px; line-height: 1.55; color: #1a1a2e; max-width: 85%; }
  .chat-bubble-user { background: #003478; color: #fff; padding: 9px 12px; border-radius: 13px 13px 4px 13px; font-size: 13px; line-height: 1.5; max-width: 85%; }
  .chat-result-card { width: 100%; text-align: left; background: #fff; border: 0.5px solid #dde3ef; border-radius: 12px; padding: 11px 13px; cursor: pointer; margin-top: 7px; transition: border-color 0.12s; }
  .chat-result-card:hover { border-color: #003478; }
  .chat-result-path { font-size: 11px; color: #99a; margin-bottom: 3px; }
  .chat-result-title { font-size: 13.5px; font-weight: 600; color: #003478; line-height: 1.4; }
  .chat-result-go { font-size: 11.5px; color: #185fa5; margin-top: 6px; font-weight: 600; }
  .chat-option-btn { width: 100%; text-align: left; background: #fff; border: 0.5px solid #dde3ef; border-radius: 9px; padding: 10px 12px; cursor: pointer; font-size: 13px; color: #1a1a2e; margin-top: 6px; transition: border-color 0.12s, background 0.12s; }
  .chat-option-btn:hover { border-color: #003478; background: #f7f9fd; }
  .chat-disclaim { font-size: 11px; color: #99a; line-height: 1.45; margin-top: 4px; }
  .chat-foot { flex-shrink: 0; border-top: 1px solid #e4eaf6; padding: 10px; display: flex; gap: 8px; background: #fff; }
  .chat-text-input { flex: 1; border: 1px solid #c8d3e8; border-radius: 10px; padding: 9px 12px; font-size: 13px; outline: none; min-width: 0; }
  .chat-text-input:focus { border-color: #003478; }
  .chat-send { background: #003478; color: #fff; border: none; border-radius: 10px; padding: 0 14px; font-size: 14px; cursor: pointer; flex-shrink: 0; }
  .chat-send:hover { background: #004ba0; }
  .chat-suggest { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .chat-chip { background: #eef3fb; color: #185fa5; border: 0.5px solid #dde3ef; border-radius: 14px; padding: 5px 11px; font-size: 12px; cursor: pointer; }
  .chat-chip:hover { background: #e0eaf8; }
  @media (max-width: 480px) {
    .chat-panel { right: 10px; left: 10px; width: auto; max-width: none; bottom: 78px; height: calc(100vh - 150px); }
    .chat-fab { right: 14px; bottom: 14px; }
  }
`;

// ─── DATA: Decision tree ───────────────────────────────────────────────────

const TREE = {
  home: { type: "home" },

  passport_start: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권"],
    question: "어떤 방법으로 발급받으시겠어요?",
    sub: "신청 상황에 따라 여권 종류와 수령 방법이 달라집니다.",
    options: [
      { id: "pp_normal_age", icon: "📘", title: "일반 — 우편 또는 방문 수령", desc: "전자여권 · 약 4주 소요" },
      { id: "pp_normal_age_dhl", icon: "✈️", title: "일반 — DHL 특급 배송", desc: "전자여권 · 약 1~2주 소요 (가장 빠름)" },
      { id: "pp_urgent_age", icon: "📄", title: "비전자 단수여권", desc: "당일 발급 · 유효기간 1년 · 왕복 1회만 사용 · 미국 입국/경유 불가 등 제약" },
    ],
  },

  pp_normal_age: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반"],
    question: "신청자의 연령은?",
    sub: "만 18세 기준으로 필요 서류와 수수료가 달라집니다.",
    options: [
      { id: "pp_n_adult_state", icon: "🧑", title: "만 18세 이상 (성인)", desc: "본인 직접 신청" },
      { id: "pp_n_minor_state", icon: "🧒", title: "만 18세 미만 (미성년자)", desc: "법정대리인 동의 필요" },
    ],
  },

  pp_urgent_age: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "비전자"],
    question: "신청자의 연령은?",
    sub: "비전자 단수여권(유효기간 1년)을 당일 발급합니다.",
    options: [
      { id: "pp_u_adult_state", icon: "🧑", title: "만 18세 이상 (성인)", desc: "본인 직접 신청" },
      { id: "pp_u_minor_state", icon: "🧒", title: "만 18세 미만 (미성년자)", desc: "법정대리인 동의 필요" },
    ],
  },

  pp_n_adult_state: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인"],
    question: "현재 여권 상태는?",
    sub: "상태에 따라 추가 서류(분실신고서 등)가 달라집니다.",
    options: [
      { id: "pp_n_adult_renew_status", icon: "🔄", title: "재발급 (여권 있음)", desc: "만료·만료 임박·훼손·정보 변경" },
      { id: "pp_n_adult_lost_status", icon: "❌", title: "분실 재발급", desc: "경찰 분실 신고(Police Report) 먼저 필수" },
      { id: "pp_n_adult_new_status", icon: "🆕", title: "신규 발급 (여권 없음)", desc: "한국 여권을 처음 발급" },
    ],
  },

  pp_n_minor_state: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "일반", "미성년자"],
    question: "자녀의 현재 여권 상태는?",
    sub: "상태에 따라 추가 서류가 달라집니다.",
    options: [
      { id: "pp_n_minor_renew_custody", icon: "🔄", title: "재발급 (여권 있음)", desc: "만료·만료 임박·훼손" },
      { id: "pp_n_minor_lost_custody", icon: "❌", title: "분실 재발급", desc: "경찰 분실 신고(Police Report) 먼저 필수" },
      { id: "pp_n_minor_new_custody", icon: "🆕", title: "신규 발급 (여권 없음)", desc: "한국 여권을 처음 발급" },
    ],
  },

  pp_u_adult_state: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인"],
    question: "현재 여권 상태는?",
    sub: "비전자 단수여권 — 상태에 따라 분실신고서 등이 달라집니다.",
    options: [
      { id: "pp_u_adult_have", icon: "🔄", title: "여권 있음 (재발급)", desc: "만료·훼손 등" },
      { id: "pp_u_adult_lost", icon: "❌", title: "여권 분실", desc: "경찰 분실 신고(Police Report) 먼저 필수" },
      { id: "pp_u_adult_new", icon: "🆕", title: "여권 없음 (신규)", desc: "한국 여권을 처음 발급" },
    ],
  },

  pp_u_minor_state: {
    type: "question",
    service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자"],
    question: "자녀의 현재 여권 상태는?",
    sub: "비전자 단수여권 — 친권 상황은 결과 페이지에서 안내합니다.",
    options: [
      { id: "pp_u_minor_have", icon: "🔄", title: "여권 있음 (재발급)", desc: "만료·훼손 등" },
      { id: "pp_u_minor_lost", icon: "❌", title: "여권 분실", desc: "경찰 분실 신고(Police Report) 먼저 필수" },
      { id: "pp_u_minor_new", icon: "🆕", title: "여권 없음 (신규)", desc: "한국 여권을 처음 발급" },
    ],
  },

  // ───────── ④ 일반·성인: 상태별 체류신분 선택 (3개 → 같은 결과 5개) ─────────
  pp_n_adult_renew_status: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인", "재발급"],
    question: "체류 신분을 선택하세요",
    sub: "신분에 따라 제출하는 증명서류가 달라집니다.",
    options: [
      { id: "pp_n_adult_pr", icon: "🍁", title: "영주권자 (PR Card)", desc: "캐나다 영주권 — PR Card 소지" },
      { id: "pp_n_adult_longterm", icon: "📄", title: "장기체류자", desc: "Study Permit · Work Permit 등 장기 비자" },
      { id: "pp_n_adult_eta", icon: "✈️", title: "단기방문 (eTA)", desc: "무비자 입국 — 입국 후 6개월 이내" },
      { id: "pp_n_adult_dual", icon: "👶", title: "선천적 복수국적자", desc: "태어날 때부터 한국·캐나다 국적 보유" },
      { id: "pp_n_adult_acq", icon: "🇰🇷", title: "후천적 시민권자 (국적회복을 한 사람)", desc: "원래 한국 국적 → 캐나다 시민권 취득 → 이후 국적회복" },
    ],
  },
  pp_n_adult_lost_status: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인", "분실"],
    question: "체류 신분을 선택하세요",
    sub: "분실 재발급 — 신분에 따라 증명서류가 달라집니다. (경찰 분실 신고 먼저)",
    options: [
      { id: "pp_n_adult_pr", icon: "🍁", title: "영주권자 (PR Card)", desc: "캐나다 영주권 — PR Card 소지" },
      { id: "pp_n_adult_longterm", icon: "📄", title: "장기체류자", desc: "Study Permit · Work Permit 등 장기 비자" },
      { id: "pp_n_adult_eta", icon: "✈️", title: "단기방문 (eTA)", desc: "무비자 입국 — 입국 후 6개월 이내" },
      { id: "pp_n_adult_dual", icon: "👶", title: "선천적 복수국적자", desc: "태어날 때부터 한국·캐나다 국적 보유" },
      { id: "pp_n_adult_acq", icon: "🇰🇷", title: "후천적 시민권자 (국적회복을 한 사람)", desc: "원래 한국 국적 → 캐나다 시민권 취득 → 이후 국적회복" },
    ],
  },
  pp_n_adult_new_status: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "일반", "성인", "신규"],
    question: "체류 신분을 선택하세요",
    sub: "성인이 한국 여권을 생애 최초로 신규 발급받는 경우는, 한국 국적을 보유한 다음 두 경우에 해당합니다.",
    options: [
      { id: "pp_n_adult_dual", icon: "👶", title: "선천적 복수국적자", desc: "태어날 때부터 한국·캐나다 국적 보유 — 국적이탈 신고를 하지 않은 경우" },
      { id: "pp_n_adult_acq", icon: "🇰🇷", title: "후천적 시민권자 (국적회복을 한 사람)", desc: "원래 한국 국적 → 캐나다 시민권 취득 → 이후 국적회복" },
    ],
  },

  // ───────── ④ 일반·미성년: 상태별 친권 선택 (3개 → 같은 결과 5개) ─────────
  pp_n_minor_renew_custody: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "일반", "미성년자", "재발급"],
    question: "친권 상황을 선택하세요",
    sub: "상황에 따라 동의서·인감 등 추가 서류가 달라집니다.",
    options: [
      { id: "pp_n_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "대표 친권자 1명이 방문하여 신청" },
      { id: "pp_n_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "이혼 후 단독친권자가 신청" },
      { id: "pp_n_minor_joint", icon: "👥", title: "이혼 — 공동친권", desc: "이혼했으나 공동친권 유지" },
      { id: "pp_n_minor_single", icon: "💗", title: "한부모 (사별·미혼)", desc: "사별 또는 미혼 단독 양육" },
      { id: "pp_n_minor_study", icon: "🎒", title: "유학생 (부모 한국 거주)", desc: "부모 모두 한국 거주 — 본인 또는 대리인 신청" },
    ],
  },
  pp_n_minor_lost_custody: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "일반", "미성년자", "분실"],
    question: "친권 상황을 선택하세요",
    sub: "분실 재발급 — 경찰 분실 신고 먼저. 상황에 따라 추가 서류가 달라집니다.",
    options: [
      { id: "pp_n_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "대표 친권자 1명이 방문하여 신청" },
      { id: "pp_n_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "이혼 후 단독친권자가 신청" },
      { id: "pp_n_minor_joint", icon: "👥", title: "이혼 — 공동친권", desc: "이혼했으나 공동친권 유지" },
      { id: "pp_n_minor_single", icon: "💗", title: "한부모 (사별·미혼)", desc: "사별 또는 미혼 단독 양육" },
      { id: "pp_n_minor_study", icon: "🎒", title: "유학생 (부모 한국 거주)", desc: "부모 모두 한국 거주 — 본인 또는 대리인 신청" },
    ],
  },
  pp_n_minor_new_custody: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "일반", "미성년자", "신규"],
    question: "친권 상황을 선택하세요",
    sub: "신규 발급 — 상황에 따라 추가 서류가 달라집니다.",
    options: [
      { id: "pp_n_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "대표 친권자 1명이 방문하여 신청" },
      { id: "pp_n_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "이혼 후 단독친권자가 신청" },
      { id: "pp_n_minor_joint", icon: "👥", title: "이혼 — 공동친권", desc: "이혼했으나 공동친권 유지" },
      { id: "pp_n_minor_single", icon: "💗", title: "한부모 (사별·미혼)", desc: "사별 또는 미혼 단독 양육" },
      { id: "pp_n_minor_study", icon: "🎒", title: "유학생 (부모 한국 거주)", desc: "부모 모두 한국 거주 — 본인 또는 대리인 신청" },
    ],
  },

  // ───────── ④ 비전자·성인: 상태별 체류신분 선택 (3개 → 같은 결과 5개) ─────────
  pp_u_adult_have: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "재발급"],
    question: "체류 신분을 선택하세요",
    sub: "비전자 단수여권 — 신분에 따라 증명서류가 달라집니다.",
    options: [
      { id: "pp_u_adult_pr", icon: "🍁", title: "영주권자 (PR Card)", desc: "캐나다 영주권 — PR Card 소지" },
      { id: "pp_u_adult_longterm", icon: "📄", title: "장기체류자", desc: "Study Permit · Work Permit 등 장기 비자" },
      { id: "pp_u_adult_eta", icon: "✈️", title: "단기방문 (eTA)", desc: "무비자 입국 — 입국 후 6개월 이내" },
      { id: "pp_u_adult_dual", icon: "👶", title: "선천적 복수국적자", desc: "태어날 때부터 한국·캐나다 국적 보유" },
      { id: "pp_u_adult_acq", icon: "🇰🇷", title: "후천적 시민권자 (국적회복을 한 사람)", desc: "원래 한국 국적 → 캐나다 시민권 취득 → 이후 국적회복" },
    ],
  },
  pp_u_adult_lost: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "분실"],
    question: "체류 신분을 선택하세요",
    sub: "비전자 단수여권 (분실) — 경찰 분실 신고 먼저. 신분에 따라 증명서류가 달라집니다.",
    options: [
      { id: "pp_u_adult_pr", icon: "🍁", title: "영주권자 (PR Card)", desc: "캐나다 영주권 — PR Card 소지" },
      { id: "pp_u_adult_longterm", icon: "📄", title: "장기체류자", desc: "Study Permit · Work Permit 등 장기 비자" },
      { id: "pp_u_adult_eta", icon: "✈️", title: "단기방문 (eTA)", desc: "무비자 입국 — 입국 후 6개월 이내" },
      { id: "pp_u_adult_dual", icon: "👶", title: "선천적 복수국적자", desc: "태어날 때부터 한국·캐나다 국적 보유" },
      { id: "pp_u_adult_acq", icon: "🇰🇷", title: "후천적 시민권자 (국적회복을 한 사람)", desc: "원래 한국 국적 → 캐나다 시민권 취득 → 이후 국적회복" },
    ],
  },
  pp_u_adult_new: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "신규"],
    question: "체류 신분을 선택하세요",
    sub: "성인이 한국 여권을 생애 최초로 신규 발급받는 경우는, 한국 국적을 보유한 다음 두 경우에 해당합니다.",
    options: [
      { id: "pp_u_adult_dual", icon: "👶", title: "선천적 복수국적자", desc: "태어날 때부터 한국·캐나다 국적 보유 — 국적이탈 신고를 하지 않은 경우" },
      { id: "pp_u_adult_acq", icon: "🇰🇷", title: "후천적 시민권자 (국적회복을 한 사람)", desc: "원래 한국 국적 → 캐나다 시민권 취득 → 이후 국적회복" },
    ],
  },

  // ───────── ④ 비전자·미성년: 상태별 친권 선택 (3개 → 같은 결과 5개) ─────────
  pp_u_minor_have: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "재발급"],
    question: "친권 상황을 선택하세요",
    sub: "비전자 단수여권 — 상황에 따라 추가 서류가 달라집니다.",
    options: [
      { id: "pp_u_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "대표 친권자 1명이 방문하여 신청" },
      { id: "pp_u_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "이혼 후 단독친권자가 신청" },
      { id: "pp_u_minor_joint", icon: "👥", title: "이혼 — 공동친권", desc: "이혼했으나 공동친권 유지" },
      { id: "pp_u_minor_single", icon: "💗", title: "한부모 (사별·미혼)", desc: "사별 또는 미혼 단독 양육" },
      { id: "pp_u_minor_study", icon: "🎒", title: "유학생 (부모 한국 거주)", desc: "부모 모두 한국 거주 — 본인 또는 대리인 신청" },
    ],
  },
  pp_u_minor_lost: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "분실"],
    question: "친권 상황을 선택하세요",
    sub: "비전자 단수여권 (분실) — 경찰 분실 신고 먼저. 상황에 따라 추가 서류가 달라집니다.",
    options: [
      { id: "pp_u_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "대표 친권자 1명이 방문하여 신청" },
      { id: "pp_u_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "이혼 후 단독친권자가 신청" },
      { id: "pp_u_minor_joint", icon: "👥", title: "이혼 — 공동친권", desc: "이혼했으나 공동친권 유지" },
      { id: "pp_u_minor_single", icon: "💗", title: "한부모 (사별·미혼)", desc: "사별 또는 미혼 단독 양육" },
      { id: "pp_u_minor_study", icon: "🎒", title: "유학생 (부모 한국 거주)", desc: "부모 모두 한국 거주 — 본인 또는 대리인 신청" },
    ],
  },
  pp_u_minor_new: {
    type: "question", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "신규"],
    question: "친권 상황을 선택하세요",
    sub: "비전자 단수여권 (신규) — 상황에 따라 추가 서류가 달라집니다.",
    options: [
      { id: "pp_u_minor_married", icon: "👨‍👩‍👧", title: "부모 혼인 중 (공동친권)", desc: "대표 친권자 1명이 방문하여 신청" },
      { id: "pp_u_minor_sole", icon: "👤", title: "이혼 — 단독친권", desc: "이혼 후 단독친권자가 신청" },
      { id: "pp_u_minor_joint", icon: "👥", title: "이혼 — 공동친권", desc: "이혼했으나 공동친권 유지" },
      { id: "pp_u_minor_single", icon: "💗", title: "한부모 (사별·미혼)", desc: "사별 또는 미혼 단독 양육" },
      { id: "pp_u_minor_study", icon: "🎒", title: "유학생 (부모 한국 거주)", desc: "부모 모두 한국 거주 — 본인 또는 대리인 신청" },
    ],
  },

  // ═══════════ 결과: 일반 전자여권 · 성인 (5) — pickup + stateDocs ═══════════
  pp_n_adult_pr: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "성인", "영주권자"],
    title: "일반 전자여권 — 영주권자",
    sub: "전자여권 · 발급 약 3~4주 (DHL 이용 시 약 1~2주)",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 미리 작성 시 컬러·A4 원본크기 출력, Letter 불가)",
      "여권용 사진 1매 (6개월 이내, 흰색·연한색 상의 불가, 영사관 무료 촬영 가능)",
      "PR Card 원본 + 사본 (앞뒷면 모두 복사)",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)", "현재 여권이 없으므로 분실 신고서로 대체"],
      new: ["기존 한국 여권이 없는 경우 — 기본증명서·가족관계증명서로 신원 확인 (담당자 확인)"],
    },
    costs: [
      { label: "10년 (58면)", value: "CAD $70.20" },
      { label: "10년 (26면)", value: "CAD $66.15" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "PR Card가 만료·분실된 경우: 연장(재발급) 신청 영수증 제출 시 1년 유효 단수여권 발급 가능 — 담당자 상담 필요.",
      "결제: 현금(CAD)·Debit·신용카드.",
      "신청서에 카카오톡 연결 번호 기재 시 발급 진행상황을 알림으로 받을 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_adult_longterm: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "성인", "장기체류자"],
    title: "일반 전자여권 — 장기체류자",
    sub: "전자여권 · 발급 약 3~4주 (DHL 이용 시 약 1~2주)",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 미리 작성 시 컬러·A4 원본크기 출력, Letter 불가)",
      "여권용 사진 1매 (6개월 이내, 흰색·연한색 상의 불가, 영사관 무료 촬영 가능)",
      "캐나다 체류비자 원본 + 사본 (Study Permit, Work Permit 등)",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)", "현재 여권이 없으므로 분실 신고서로 대체"],
      new: ["기존 한국 여권이 없는 경우 — 기본증명서·가족관계증명서로 신원 확인 (담당자 확인)"],
    },
    costs: [
      { label: "10년 (58면)", value: "CAD $70.20" },
      { label: "10년 (26면)", value: "CAD $66.15" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "체류비자(Permit)의 유효기간이 충분히 남아 있어야 합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
      "신청서에 카카오톡 연결 번호 기재 시 발급 진행상황을 알림으로 받을 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_adult_eta: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "성인", "단기방문(eTA)"],
    title: "일반 전자여권 — 단기방문자 (eTA)",
    sub: "전자여권 · 발급 약 3~4주 (DHL 이용 시 약 1~2주)",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 미리 작성 시 컬러·A4 원본크기 출력, Letter 불가)",
      "여권용 사진 1매 (6개월 이내, 흰색·연한색 상의 불가, 영사관 무료 촬영 가능)",
      "eTA 허가서 출력본",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)", "현재 여권이 없으므로 분실 신고서로 대체"],
      new: ["기존 한국 여권이 없는 경우 — 기본증명서·가족관계증명서로 신원 확인 (담당자 확인)"],
    },
    costs: [
      { label: "10년 (58면)", value: "CAD $70.20" },
      { label: "10년 (26면)", value: "CAD $66.15" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "⚠️ eTA(무비자 입국)는 캐나다 입국 후 6개월 이내만 인정됩니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
      "신청서에 카카오톡 연결 번호 기재 시 발급 진행상황을 알림으로 받을 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_adult_dual: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "성인", "선천적 복수국적자"],
    title: "일반 전자여권 — 선천적 복수국적자",
    sub: "태어날 때부터 한국·캐나다 국적 보유 · 출생지에 따라 증빙서류가 다릅니다",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 미리 작성 시 컬러·A4 원본크기 출력, Letter 불가)",
      "여권용 사진 1매 (6개월 이내, 흰색·연한색 상의 불가, 영사관 무료 촬영 가능)",
      "▸ 한국 출생(부 또는 모가 캐나다 국적): 캐나다 여권 원본+사본 또는 시민권증서 원본+사본",
      "▸ 외국·캐나다 출생: 외국여권 원본+사본 또는 출생증명서(Birth Certificate) 원본+사본",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)", "현재 여권이 없으므로 분실 신고서로 대체"],
      new: ["▸ 캐나다 여권이 없는 복수국적자의 최초 한국여권 신청 시: 캐나다 출생증명서 원본"],
    },
    costs: [
      { label: "10년 (58면)", value: "CAD $70.20" },
      { label: "10년 (26면)", value: "CAD $66.15" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "선천적 복수국적자는 한국 국적을 그대로 보유하므로 한국 여권 발급에 문제가 없습니다.",
      "혹시 과거에 국적이탈·국적선택 신고를 한 적이 있다면 국적 상태가 다를 수 있으니, 불확실하면 신청 전 확인하세요. (영사관 416-920-3809)",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_adult_acq: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "성인", "후천적 시민권자"],
    title: "일반 전자여권 — 후천적 시민권자",
    sub: "원래 한국 국적 → 이후 캐나다 시민권 취득 · 국적 확인이 먼저입니다",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 미리 작성 시 컬러·A4 원본크기 출력, Letter 불가)",
      "여권용 사진 1매 (6개월 이내, 흰색·연한색 상의 불가, 영사관 무료 촬영 가능)",
      "캐나다 여권 원본 + 사본",
      "국적회복증서 (국적회복 사실이 기본증명서에 기재되어 있으면 제출 불요)",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)", "현재 여권이 없으므로 분실 신고서로 대체"],
      new: ["기본증명서로 국적(국적회복) 상태 확인 필요"],
    },
    costs: [
      { label: "10년 (58면)", value: "CAD $70.20" },
      { label: "10년 (26면)", value: "CAD $66.15" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "⚠️ 캐나다 시민권을 취득한 경우 한국 국적이 자동 상실되었을 수 있습니다. 국적이 상실된 상태에서 한국 여권을 신청·사용하면 출입국관리법 위반이 될 수 있으니, 신청 전 본인의 국적 상태(기본증명서 등)를 반드시 확인하세요.",
      "⚠️ 불확실하면 여권 신청 전 국적 담당과 먼저 상담하시기 바랍니다. (영사관 416-920-3809)",
      "국적회복이 완료되어 기본증명서에 기재된 경우 한국 여권 신청이 가능합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  // ═══════════ 결과: 일반 전자여권 · 미성년 (5) — 친권별 + 신분 섹션 + pickup ═══════════
  pp_n_minor_married: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "미성년자", "부모 혼인 중"],
    title: "일반 전자여권 — 미성년자 (부모 혼인 중)",
    sub: "공동친권 · 대표 친권자 1명이 방문하여 신청",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 대표 친권자가 서명",
      "방문하는 대표 친권자(부 또는 모)의 여권 원본 + 사본 1부",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "8세 이상 (5년, 58면)", value: "CAD $59.40" },
      { label: "8세 미만 (5년, 58면)", value: "CAD $47.25" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "부모가 혼인 관계이면 대표 친권자 한 명이 방문해 신청할 수 있습니다.",
      "자녀가 후천적으로 외국국적을 취득한 경우 국적 확인이 필요할 수 있습니다 — 불확실하면 상담하세요. (416-920-3809)",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_minor_sole: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "미성년자", "단독친권"],
    title: "일반 전자여권 — 미성년자 (이혼·단독친권)",
    sub: "단독친권자가 방문하여 신청",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 단독친권자가 서명",
      "방문하는 친권자(부 또는 모)의 여권 원본 + 사본 1부",
      "단독친권 증빙 — 자녀의 기본증명서·가족관계증명서 (친권 확인)",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "8세 이상 (5년, 58면)", value: "CAD $59.40" },
      { label: "8세 미만 (5년, 58면)", value: "CAD $47.25" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "이혼 후 단독친권자는 혼자 방문해 신청할 수 있습니다. 친권이 기본증명서에 확인되어야 합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_minor_joint: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "미성년자", "공동친권"],
    title: "일반 전자여권 — 미성년자 (이혼·공동친권)",
    sub: "거주 상황에 따라 서류가 달라집니다",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "자녀의 기본증명서·가족관계증명서 각 1부",
      "【경우 A — 부모 일방이 한국 거주】",
      "    └ 법정대리인 동의서 — 한국 거주 친권자 인감 날인 + 방문 친권자 서명",
      "    └ 한국 거주 친권자의 인감증명서",
      "    └ 한국 거주 친권자의 여권 사본",
      "    └ 방문 친권자의 여권 원본 + 사본",
      "【경우 B — 부모 모두 캐나다 거주(인감 발급 불가)】",
      "    └ 부모 모두 영사관 방문",
      "    └ 법정대리인 동의서 — 부모 모두 서명",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "8세 이상 (5년, 58면)", value: "CAD $59.40" },
      { label: "8세 미만 (5년, 58면)", value: "CAD $47.25" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "공동친권은 거주 상황(경우 A/B)에 따라 서류가 다릅니다. 본인 상황에 맞는 쪽을 준비하세요.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_minor_single: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "미성년자", "한부모"],
    title: "일반 전자여권 — 미성년자 (한부모·사별·미혼)",
    sub: "단독 양육 친권자가 방문하여 신청",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 친권자가 서명",
      "방문하는 친권자의 여권 원본 + 사본 1부",
      "단독 양육·친권 증빙 — 자녀의 기본증명서·가족관계증명서 (사별 시 사망 사실 확인 가능)",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "8세 이상 (5년, 58면)", value: "CAD $59.40" },
      { label: "8세 미만 (5년, 58면)", value: "CAD $47.25" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "사별·미혼으로 단독 양육 중인 경우 친권 사실이 기본증명서·가족관계증명서로 확인되어야 합니다.",
      "구체적인 증빙이 불확실하면 방문 전 영사관에 문의하세요. (416-920-3809)",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_n_minor_study: {
    type: "result", service: "passport", pickup: true,
    breadcrumb: ["홈", "여권", "일반", "미성년자", "유학생"],
    title: "일반 전자여권 — 미성년 유학생 (부모 한국 거주)",
    sub: "본인 신청 또는 대리인 신청",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 대표 친권자의 인감 날인",
      "대표 친권자의 인감증명서",
      "부모 여권 사본",
      "자녀(미성년자)의 기본증명서·가족관계증명서 각 1부",
      "【대리인이 신청하는 경우 추가】",
      "    └ 위임장 (대리인에게 위임한다는 내용)",
      "    └ 대리인의 여권 원본 + 사본 (대리인 범위: 18세 이상 (외)조부모·형제·자매)",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
    ],
    stateDocs: {
      renew: ["현재 여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "8세 이상 (5년, 58면)", value: "CAD $59.40" },
      { label: "8세 미만 (5년, 58면)", value: "CAD $47.25" },
      { label: "잔여기간 재발급", value: "CAD $36.45" },
    ],
    time: "약 3~4주 (DHL 특급 이용 시 약 1~2주)",
    notices: [
      "부모가 모두 한국에 거주하는 유학생 본인 또는 대리인이 신청하는 경우입니다.",
      "대리인은 18세 이상의 (외)조부모·형제·자매만 가능합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  // ═══════════ 결과: 비전자 단수여권 · 성인 (5) — pickup 없음 ═══════════
  pp_u_adult_pr: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "영주권자"],
    title: "비전자 단수여권 — 영주권자",
    sub: "비전자 단수여권 (유효기간 1년) · 1주일 이내 필요 시",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력, Letter 불가)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내, 영사관 무료 촬영 가능)",
      "PR Card 원본 + 사본 (앞뒷면). 만료 시: 연장 신청 영수증 + 만료된 PR카드 지참 (담당자 상담)",
      "항공권 사본 — 본인 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["기존 한국 여권이 없는 경우 — 기본증명서 등으로 신원 확인 (담당자 확인)"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유로 한국에 가야 하면 DHL 전자여권(약 1주) 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "1주일 이상 여유가 있으면 비전자 단수여권 대신 DHL 전자여권 배송서비스를 권장합니다.",
      "수수료는 긴급사유 인정 시 C$22.95, 일반사유 C$67.50. 긴급 여행목적 증빙(사망증명서·상해진단서·입원증명 등) 제출 시 긴급사유로 인정됩니다.",
      "긴급사유 환급은 신청 후 6개월 이내 증빙 제출 시, 신청한 공관에서만 가능합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_adult_longterm: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "장기체류자"],
    title: "비전자 단수여권 — 장기체류자",
    sub: "비전자 단수여권 (유효기간 1년) · 1주일 이내 필요 시",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력, Letter 불가)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내, 영사관 무료 촬영 가능)",
      "캐나다 체류비자 원본 + 사본 (Study Permit, Work Permit 등)",
      "항공권 사본 — 본인 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["기존 한국 여권이 없는 경우 — 기본증명서 등으로 신원 확인 (담당자 확인)"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권(약 1주) 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "1주일 이상 여유가 있으면 비전자 단수여권 대신 DHL 전자여권 배송서비스를 권장합니다.",
      "수수료는 긴급사유 인정 시 C$22.95, 일반사유 C$67.50. 긴급 여행목적 증빙 제출 시 긴급사유로 인정됩니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_adult_eta: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "단기방문(eTA)"],
    title: "비전자 단수여권 — 단기방문자 (eTA)",
    sub: "비전자 단수여권 (유효기간 1년) · 1주일 이내 필요 시",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력, Letter 불가)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내, 영사관 무료 촬영 가능)",
      "eTA 허가서 출력본 (캐나다 입국 후 6개월 이내만 인정)",
      "항공권 사본 — 본인 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["기존 한국 여권이 없는 경우 — 기본증명서 등으로 신원 확인 (담당자 확인)"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권(약 1주) 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ eTA(무비자 입국)는 캐나다 입국 후 6개월 이내만 인정됩니다.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "1주일 이상 여유가 있으면 비전자 단수여권 대신 DHL 전자여권 배송서비스를 권장합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_adult_dual: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "선천적 복수국적자"],
    title: "비전자 단수여권 — 선천적 복수국적자",
    sub: "비전자 단수여권 (유효기간 1년) · 출생지에 따라 증빙서류가 다릅니다",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력, Letter 불가)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내, 영사관 무료 촬영 가능)",
      "▸ 한국 출생(부 또는 모가 캐나다 국적): 캐나다 여권 또는 시민권증서 원본+사본",
      "▸ 외국·캐나다 출생: 외국여권 또는 출생증명서 원본+사본",
      "▸ 캐나다 여권이 없는 복수국적 신생아 최초 신청: 캐나다 출생증명서 원본",
      "항공권 사본 — 본인 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 위 출생지별 증빙으로 신원 확인"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권(약 1주) 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "선천적 복수국적자는 한국 국적을 보유하므로 발급에 문제가 없습니다. 과거 국적이탈·국적선택을 한 적이 있으면 확인이 필요합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_adult_acq: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "성인", "후천적 시민권자"],
    title: "비전자 단수여권 — 후천적 시민권자",
    sub: "비전자 단수여권 (유효기간 1년) · 국적 확인이 먼저입니다",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력, Letter 불가)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내, 영사관 무료 촬영 가능)",
      "캐나다 여권 원본 + 사본",
      "국적회복증서 (국적회복 사실이 기본증명서에 기재되어 있으면 제출 불요)",
      "항공권 사본 — 본인 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["기본증명서로 국적(국적회복) 상태 확인 필요"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 캐나다 시민권을 취득한 경우 한국 국적이 자동 상실되었을 수 있습니다. 국적이 상실된 상태에서 한국 여권을 신청·사용하면 출입국관리법 위반이 될 수 있으니, 신청 전 본인의 국적 상태(기본증명서 등)를 반드시 확인하세요.",
      "⚠️ 불확실하면 여권 신청 전 국적 담당과 먼저 상담하시기 바랍니다. (영사관 416-920-3809)",
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "국적회복이 완료되어 기본증명서에 기재된 경우 한국 여권 신청이 가능합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  // ═══════════ 결과: 비전자 단수여권 · 미성년 (5) — pickup 없음 ═══════════
  pp_u_minor_married: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "부모 혼인 중"],
    title: "비전자 단수여권 — 미성년자 (부모 혼인 중)",
    sub: "비전자 단수여권 (유효기간 1년) · 공동친권, 대표 친권자 1명 방문",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 대표 친권자가 서명",
      "방문하는 대표 친권자(부 또는 모)의 여권 원본 + 사본 1부",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
      "항공권 사본 — 자녀 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "1주일 이상 여유가 있으면 비전자 단수여권 대신 DHL 전자여권 배송서비스를 권장합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_minor_sole: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "단독친권"],
    title: "비전자 단수여권 — 미성년자 (이혼·단독친권)",
    sub: "비전자 단수여권 (유효기간 1년) · 단독친권자 방문",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 단독친권자가 서명",
      "방문하는 친권자(부 또는 모)의 여권 원본 + 사본 1부",
      "단독친권 증빙 — 자녀의 기본증명서·가족관계증명서",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
      "항공권 사본 — 자녀 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "1주일 이상 여유가 있으면 비전자 단수여권 대신 DHL 전자여권 배송서비스를 권장합니다.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_minor_joint: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "공동친권"],
    title: "비전자 단수여권 — 미성년자 (이혼·공동친권)",
    sub: "비전자 단수여권 (유효기간 1년) · 거주 상황에 따라 서류가 다릅니다",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "자녀의 기본증명서·가족관계증명서 각 1부",
      "【경우 A — 부모 일방이 한국 거주】",
      "    └ 법정대리인 동의서 — 한국 거주 친권자 인감 날인 + 방문 친권자 서명",
      "    └ 한국 거주 친권자의 인감증명서",
      "    └ 한국 거주 친권자의 여권 사본",
      "    └ 방문 친권자의 여권 원본 + 사본",
      "【경우 B — 부모 모두 캐나다 거주(인감 발급 불가)】",
      "    └ 부모 모두 영사관 방문",
      "    └ 법정대리인 동의서 — 부모 모두 서명",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
      "항공권 사본 — 자녀 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "공동친권은 거주 상황(경우 A/B)에 따라 서류가 다릅니다. 본인 상황에 맞는 쪽을 준비하세요.",
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_minor_single: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "한부모"],
    title: "비전자 단수여권 — 미성년자 (한부모·사별·미혼)",
    sub: "비전자 단수여권 (유효기간 1년) · 단독 양육 친권자 방문",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 친권자가 서명",
      "방문하는 친권자의 여권 원본 + 사본 1부",
      "단독 양육·친권 증빙 — 자녀의 기본증명서·가족관계증명서",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
      "항공권 사본 — 자녀 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "사별·미혼으로 단독 양육 중인 경우 친권 사실이 기본증명서·가족관계증명서로 확인되어야 합니다.",
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

  pp_u_minor_study: {
    type: "result", service: "passport",
    breadcrumb: ["홈", "여권", "비전자", "미성년자", "유학생"],
    title: "비전자 단수여권 — 미성년 유학생 (부모 한국 거주)",
    sub: "비전자 단수여권 (유효기간 1년) · 본인 또는 대리인 신청",
    docs: [
      "여권발급신청서 (영사관 비치 양식 권장 / 컬러·A4 원본크기 출력)",
      "긴급여권 발급신청 사유서 (양식 작성·제출)",
      "여권용 사진 1매 (6개월 이내; 6세 미만 영·유아는 사진관 촬영)",
      "법정대리인 동의서 — 대표 친권자의 인감 날인",
      "대표 친권자의 인감증명서",
      "부모 여권 사본",
      "자녀(미성년자)의 기본증명서·가족관계증명서 각 1부",
      "【대리인 신청 시 추가】",
      "    └ 위임장 (대리인에게 위임한다는 내용)",
      "    └ 대리인의 여권 원본 + 사본 (대리인 범위: 18세 이상 (외)조부모·형제·자매)",
      "체류신분별 증명서류 (자녀 해당분 1가지):",
      "    └ 영주권자: PR Card 원본+사본 / 장기체류자: 체류비자 원본+사본",
      "    └ 단기방문(eTA): eTA 허가서 / 선천적 복수국적자: 캐나다여권 또는 출생증명서",
      "항공권 사본 — 자녀 이름·일정·결제 완료가 표시된 여행일정표 출력",
    ],
    stateDocs: {
      renew: ["여권 원본 + 사본 1부 (반납 후 새 여권 교부 시 반환)"],
      lost: ["⚠️ 여권 분실 신고서 (양식 작성·제출)"],
      new: ["최초 신청 시 — 자녀의 기본증명서·가족관계증명서로 신원 확인"],
    },
    costs: [
      { label: "긴급사유 인정", value: "CAD $22.95" },
      { label: "일반사유", value: "CAD $67.50" },
    ],
    time: "긴급 발급 (일반적으로 1주일 이내)",
    notices: [
      "부모가 모두 한국에 거주하는 유학생 본인 또는 대리인이 신청하는 경우입니다. 대리인은 18세 이상 (외)조부모·형제·자매만 가능합니다.",
      "⚠️ 비전자 단수여권은 미국 입국·경유가 불가합니다. 미국 경유 시 DHL 전자여권 또는 캐나다발 한국 직항을 이용하세요.",
      "⚠️ 발급 불가 대상: 본인 확인이 불가능한 사람 / 최근 5년 이내 3회 이상 여권 분실자.",
      "결제: 현금(CAD)·Debit·신용카드.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "사전 예약하기 (여권과) →",
  },

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
      "영사관 방문하여 위임장 공증 (공증 메뉴 → 사문서 인증 → 위임장)",
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
    sub: "출생 후 1개월 이내 신고가 원칙입니다(기한이 지나도 신고는 가능하며, 지연 사유 설명이 필요할 수 있습니다). 부모 국적 조합에 따라 필요 서류가 달라집니다.",
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
    sub: "국적 업무는 상황에 따라 완전히 달라집니다. 본인 상황에 맞는 항목을 선택하세요.",
    options: [
      { id: "nationality_citizen_start", icon: "🍁", title: "나 또는 가족이 외국 국적(시민권)을 취득했어요", desc: "국적이탈·상실·보유·선택 — 내 상황에 맞게 안내" },
      { id: "nationality_acquire", icon: "👶", title: "한국인 아버지와 외국인 어머니 사이의 혼외자예요", desc: "인지에 의한 국적취득 (미성년) · CAD $24.30" },
      { id: "nationality_recover", icon: "🇰🇷", title: "한국 국적을 되찾고 싶어요 (만 65세 이상)", desc: "복수국적 회복 — 한국 출입국사무소에서만 신청 가능" },
    ],
  },

  nationality_terms: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "용어 비교"],
    title: "국적 용어 비교 — 이탈·상실·보유·선택",
    sub: "헷갈리는 네 가지를 두 쌍으로 나눠 비교했습니다.",
    compareTable: [
      {
        pair: "국적이탈 vs 국적상실",
        note: "둘 다 결과는 \"한국 국적 없음\"",
        left: "국적이탈",
        right: "국적상실",
        rows: [
          { label: "대상자", left: "선천적 복수국적자 (태어날 때부터 두 국적)", right: "후천적 취득자 (나중에 시민권 취득)" },
          { label: "차이점", left: "내가 능동적으로 한국 국적을 포기하는 신고", right: "이미 자동 상실된 것을 사후에 신고" },
          { label: "신고 기한", left: "남: 출생상황에 따라 다름 (18세 3월 말 또는 병역해소 후) / 여: 제한 없음 (언제든 신고 가능)", right: "기한 없음 (취득 후 지체 없이 사후신고)" },
          { label: "결과물", left: "한국 국적 없음 (외국 국적만 유지)", right: "한국 국적 없음 (잃은 사실을 기록)" },
        ],
      },
      {
        pair: "국적보유 vs 국적선택",
        note: "둘 다 결과는 \"한국 국적 유지\"",
        left: "국적보유",
        right: "국적선택",
        rows: [
          { label: "대상자", left: "부모와 함께 시민권을 취득한 미성년 자녀", right: "선천적 복수국적자 (태어날 때부터 두 국적)" },
          { label: "차이점", left: "취득일로부터 6개월 이내 신고해야 국적 유지", right: "외국국적불행사 서약으로 복수국적 유지" },
          { label: "신고 기한", left: "시민권 취득일(선서일)로부터 6개월 이내", right: "여: 만 22세 되는 해 생일 전 / 남: 만 22세 전 또는 병역 해소 후 2년 이내" },
          { label: "결과물", left: "한국 국적 유지 (이후 국적선택 대상)", right: "두 국적 유지 (합법적 복수국적)" },
        ],
      },
    ],
    notices: [
      "헷갈리면: 태어날 때부터 두 국적 → 이탈·선택 / 부모와 함께 시민권 취득(미성년) → 보유 / 나중에 본인이 시민권 취득 → 상실.",
      "불확실하면 영사관에 문의하세요. (416-920-3809)",
    ],
  },

  nationality_citizen_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "외국국적 취득"],
    question: "외국 국적(시민권)을 어떻게 갖게 되셨나요?",
    sub: "어떻게 취득했는지에 따라 신고 종류가 완전히 달라집니다.",
    options: [
      { id: "nationality_native", icon: "👶", title: "태어날 때부터 두 국적이었어요", desc: "선천적 복수국적 → 포기(이탈) 또는 유지(선택)" },
      { id: "nationality_acquired_self", icon: "🍁", title: "나중에 본인이 시민권을 취득했어요", desc: "후천적 취득 → 국적상실신고 (자동 상실 사후신고)" },
      { id: "nationality_keep_start", icon: "👨‍👩‍👧", title: "부모를 따라 함께 시민권을 취득했어요 (미성년 때)", desc: "수반취득 자녀 → 국적보유신고 (6개월 이내)" },
    ],
  },

  nationality_native: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적"],
    question: "한국 국적을 어떻게 하시겠어요?",
    sub: "선천적 복수국적자는 한국 국적을 포기하거나, 유지할 수 있습니다.",
    options: [
      { id: "nationality_renounce_start", icon: "🚫", title: "한국 국적을 포기할게요", desc: "국적이탈신고 · CAD $24.30" },
      { id: "nationality_choice_start", icon: "✍️", title: "한국 국적을 유지할게요", desc: "국적선택신고 — 성별·시기에 따라 안내" },
    ],
  },

  nationality_renounce_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고"],
    question: "신청자의 성별은?",
    sub: "남성과 여성은 국적이탈 신고 기간이 다릅니다.",
    options: [
      { id: "nationality_renounce_male_birth", icon: "👨", title: "남성", desc: "출생 당시 부모님의 체류 상황에 따라 신고 기간이 달라집니다" },
      { id: "nationality_renounce_female", icon: "👩", title: "여성", desc: "복수국적자가 된 시기에 따라 신고 기한이 달라집니다" },
    ],
  },

  nationality_renounce_male_birth: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "남성"],
    question: "출생 당시 부모님의 체류 상황은?",
    sub: "출생 당시 부 또는 모가 외국 영주권·시민권을 보유(또는 신청)했는지에 따라 신고 기간이 완전히 달라집니다.",
    options: [
      { id: "nationality_renounce_male_a", icon: "🏠", title: "영주 목적으로 체류 중 출생", desc: "부/모가 영주권·시민권을 보유·신청한 상태에서 출생 / 또는 부·모가 외국에 17년 이상 계속 거주 → 18세 되는 해 3월 말까지 신고 가능" },
      { id: "nationality_renounce_male_b", icon: "✈️", title: "영주 목적 없이 체류 중 출생", desc: "위에 해당하지 않는 경우 → 병역의무 해소 후에만 신고 가능" },
    ],
  },

  nationality_renounce_male_a: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "남성", "영주 목적 출생"],
    question: "현재 시기는?",
    sub: "남성은 만 18세가 되는 해 3월 31일까지만 일반 국적이탈신고가 가능합니다.",
    options: [
      { id: "nationality_renounce_male_intime", icon: "✅", title: "만 18세 되는 해 3월 31일 이전 (기간 내)", desc: "정상 국적이탈신고 가능" },
      { id: "nationality_renounce_male_done", icon: "🎖️", title: "병역의무 해소 완료 (전역·면제 등)", desc: "병역 해소 후 국적이탈신고 가능" },
      { id: "nationality_renounce_exception", icon: "⚠️", title: "기간을 넘겼고 병역 미해소", desc: "예외적 국적이탈 허가 필요 · CAD $121.50" },
    ],
  },

  nationality_acquired_self: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "후천적 취득"],
    question: "누구의 국적상실신고인가요?",
    sub: "후천적으로 외국국적을 취득하면 그날 한국 국적이 자동 상실됩니다. 이를 사후 신고합니다.",
    options: [
      { id: "nationality_loss", icon: "🧑", title: "본인 (생존)", desc: "본인이 직접 또는 가족이 대리 신고 · 무료" },
      { id: "nationality_loss_death", icon: "🕯️", title: "사망한 가족", desc: "사망자의 국적상실신고 · 무료" },
    ],
  },

  nationality_keep_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "부모와 함께 취득"],
    question: "시민권 취득일(선서일)로부터 6개월이 지났나요?",
    sub: "6개월 이내라면 한국 국적을 유지(보유신고)할지, 유지하지 않을지(상실) 선택할 수 있습니다. 6개월이 지나면 소급하여 국적이 상실됩니다.",
    options: [
      { id: "nationality_keep_choice", icon: "✅", title: "6개월 이내예요", desc: "한국 국적 유지 또는 상실 중 선택" },
      { id: "nationality_loss", icon: "⚠️", title: "6개월이 지났어요", desc: "기한 초과 → 소급하여 국적 상실 → 국적상실신고로 안내" },
    ],
  },

  nationality_keep_choice: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "부모와 함께 취득", "국적 선택"],
    question: "한국 국적을 어떻게 하시겠어요?",
    sub: "6개월 이내에는 한국 국적을 유지(보유신고)할 수도, 유지하지 않을 수도 있습니다.",
    options: [
      { id: "nationality_retain", icon: "🇰🇷", title: "한국 국적을 유지하겠습니다", desc: "국적보유신고 — 한국 국적 유지 · CAD $24.30" },
      { id: "nationality_loss", icon: "📤", title: "한국 국적을 유지하지 않겠습니다", desc: "국적상실신고 — 한국 국적 상실 · 무료" },
    ],
  },

  nationality_renounce_male_intime: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "남성", "영주 목적 출생", "기간 내"],
    title: "국적이탈신고 — 남성 (기간 내)",
    sub: "선천적 복수국적자 · 만 18세 되는 해 3월 31일까지",
    docs: [
      "국적이탈신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인(부 또는 모) 서명",
      "국적이탈 안내문 확인서 (양식)",
      "외국거주사실증명서 (양식)",
      "증명사진 1매 (3.5×4.5cm, 흰색배경, 6개월 이내, 사진관 촬영 필수 — 영사관 장비 사용 불가)",
      "캐나다 출생증명서 원본 + 사본 (캐나다 출생자, 부모 이름 모두 표시)",
      "  ▸ 한국 출생자: 시민권증서(생일이 취득일자로 된 것)로 대체",
      "출생증명서 한글 번역문 (본인·가족 직접 번역 가능, 공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부 (시민권증서 / 캐나다 출생=Birth Certificate / 영주권=PR카드 앞뒷면)",
      "당사자 기본증명서 + 가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (이름이 변경된 경우 — 가족 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월 (카카오톡·이메일로 결과 통보 — 5일 이내 알림 동의 필수)",
    notices: [
      "⚠️ 신고기한: 만 18세 되는 해 3월 31일까지 (2008년생 → 2026.3.31 / 2009년생 → 2027.3.31).",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "외국에 주소(생활 근거지)가 있어야 신고할 수 있습니다.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우, 국적이탈신고와 함께 부/모의 국적상실신고도 동시 접수.",
      "처리결과 문서 확인: 완료 메시지 수신 후 15~30일 뒤 기본증명서 발급 시 표시됨.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈신고) →",
  },

  nationality_renounce_male_done: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "남성", "영주 목적 출생", "병역 해소 후"],
    title: "국적이탈신고 — 남성 (병역 해소 후)",
    sub: "병역의무를 마친 뒤 한국 국적을 포기하는 경우",
    docs: [
      "국적이탈신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "국적이탈 안내문 확인서 (양식)",
      "외국거주사실증명서 (양식)",
      "증명사진 1매 (사진관 촬영 필수)",
      "병적증명서 (병역필·면제·전시근로역 편입 사실 포함)",
      "캐나다 출생증명서 원본 + 사본 + 한글 번역문 (한국 출생자는 시민권증서로 대체)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (이름이 변경된 경우 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월",
    notices: [
      "병역 해소 = 현역·상근예비역·보충역·대체역 복무 완료(또는 완료로 보는 경우) / 전시근로역 편입 / 병역면제 처분.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "외국에 주소(생활 근거지)가 있어야 신고할 수 있습니다.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈신고) →",
  },

  nationality_renounce_male_b: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "남성", "영주 목적 없이 출생"],
    title: "국적이탈신고 — 남성 (영주 목적 없이 체류 중 출생)",
    sub: "병역의무를 해소한 뒤에만 국적이탈신고가 가능합니다",
    docs: [
      "⚠️ 이 경우(부/모가 영주 목적 없이 체류 중 출생)는 만 18세 3월 31일 기한과 무관하게, 병역의무를 해소한 후에만 국적이탈신고가 가능합니다.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【병역의무를 이미 해소한 경우 — 아래 서류로 신고】",
      "국적이탈신고서 + 국적이탈 안내문 확인서 + 외국거주사실증명서 (양식)",
      "병적증명서 (병역필·면제·전시근로역 편입 사실 포함)",
      "증명사진 1매 (사진관 촬영 필수)",
      "캐나다 출생증명서 원본 + 사본 + 한글 번역문 (한국 출생자는 시민권증서로 대체)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 + 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부 / 부의 혼인관계증명서 (해당 시)",
      "동일인증명서 (이름 변경 시) · XpressPost 등기봉투 · 통보 및 송달 동의서",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【아직 병역의무를 해소하지 못한 경우】",
      "  ▸ 현재로서는 국적이탈신고가 불가능합니다.",
      "  ▸ 병역의무 해소(복무 완료·전시근로역 편입·면제 처분) 후 신고하세요.",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월 (병역 해소 후 신고 시)",
    notices: [
      "⚠️ '영주 목적 없이 체류 중 출생'이란, 출생 당시 부·모가 외국 영주권·시민권을 보유하거나 신청하지 않은 상태에서 단순 체류 중 출생한 경우를 말합니다.",
      "본인이 어느 경우에 해당하는지 불확실하면 신고 전 영사관에 문의하세요. (416-920-3809)",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 →",
  },

  nationality_renounce_female: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "여성"],
    title: "국적이탈신고 — 여성",
    sub: "선천적 복수국적 여성 · 이탈 시기에 제한이 없습니다",
    docs: [
      "국적이탈신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "국적이탈 안내문 확인서 (양식)",
      "외국거주사실증명서 (양식)",
      "증명사진 1매 (사진관 촬영 필수 — 영사관 장비 사용 불가)",
      "캐나다 출생증명서 원본 + 사본 (캐나다 출생자) / 한국 출생자는 시민권증서로 대체",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 각 1부",
      "부·모 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "부·모 기본증명서 각 1부",
      "부의 혼인관계증명서 (한국인 부 + 외국인 모 사이 출생 시)",
      "동일인증명서 (이름이 변경된 경우 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "약 18~24개월",
    notices: [
      "⚠️ 신고 시기에 제한이 없습니다. 선천적 복수국적 여성은 남성과 달리 국적이탈 신고 기한이 없어, 언제든지 신고할 수 있습니다.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "외국에 주소(생활 근거지)가 있어야 신고할 수 있습니다.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적이탈신고) →",
  },

  nationality_renounce_exception: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적이탈신고", "남성", "영주 목적 출생", "예외적 허가"],
    title: "예외적 국적이탈 허가 — 신고 기간을 넘긴 병역미필 남성 (국적법 제14조의2)",
    sub: "2022.10.1 시행 · 우편·대리 불가, 본인이 직접 방문",
    docs: [
      "국적이탈허가 신청서 (양식)",
      "국적이탈허가 신속심사 요청서 (양식 — 신속심사 대상자만)",
      "증명사진 1매 (3.5×4.5cm, 흰색배경, 6개월 이내, 사진관 촬영)",
      "캐나다 출생증명서 원본 + 사본 (부모 이름 모두 표시) / 한국 출생자는 시민권증서로 대체",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 + 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부 / 부의 혼인관계증명서 (해당 시)",
      "동일인증명서 (이름 변경 시 — 가족 2명 서명)",
      "병적증명서",
      "출생 이후(또는 6세 미만 이주 후) 계속 외국 거주 사실 증명서류 (부동산·임대차·공공요금·세금납부·출입국기록 등)",
      "3개월 내 국적이탈 신고를 못 한 데 책임 묻기 어려운 사정 입증자료 (이주 상황·거주·재직·재학 서류 등)",
      "복수국적으로 외국에서 직업선택에 상당한 제한·불이익이 있음을 입증하는 자료",
      "외국어 서류는 한글 번역본 첨부 (번역자 성명·연락처 기재, 공증 불필요)",
      "XpressPost 등기봉투 또는 우표 부착 봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $121.50 (현금, Debit, 신용카드)" }],
    time: "신속심사 대상: 접수일부터 3개월 이내 (일반 심사는 사안에 따라 소요)",
    notices: [
      "대상: 병역 미해소 복수국적자로서 국적이탈 신고기간(만 18세 되는 해 3월 31일)을 넘긴 남성.",
      "신청요건: ① 외국 출생(또는 6세 미만 이주) 후 계속 외국 거주 + ② 3개월 내 신고 못 한 데 책임 묻기 어려운 사정. (국내체류 연 90일 이내면 계속 외국거주로 간주)",
      "신속심사제 (2024.8.19): ① 불허 후 1년 미경과 + 직업 불이익 임박, 또는 ② 외국 정부 외교·안보·공안 공무원 재직 또는 군 장교 현역 복무.",
      "허가 고려: 출생지·복수국적 취득경위·주소·입국 횟수·목적·기간·한국 국민 권리 행사 여부·직업 제한 불이익·병역 형평성.",
      "⚠️ 우편·대리 접수 불가 — 본인이 거주지 관할 재외공관(토론토) 직접 방문.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
      "출생증명서에 부모 이름이 없으면 새로 발급받아 제출 (서비스온타리오 / 마니토바 주정부 증명서 신청).",
      "제출하신 원본은 확인 후 즉시 반환합니다. 사본만 제출하는 서류는 추후 원본을 요청할 수 있습니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 예외적 국적이탈 허가) →",
  },

  nationality_choice: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고"],
    title: "국적선택신고 — 외국국적불행사 서약 (복수국적 유지)",
    sub: "선천적 복수국적자가 한국 국적을 유지하는 신고 · 무료",
    docs: [
      "국적선택신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "외국국적불행사서약서 (양식)",
      "증명사진 2매 (사진관 촬영 필수)",
      "캐나다 출생증명서 원본 + 사본 (해외 출생자) / 한국 출생자는 시민권증서로 대체",
      "  ▸ 부모와 함께 시민권 수반취득 후 6개월 내 국적보유신고 완료자: 출생증명서 생략 가능",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 + 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부 / 부의 혼인관계증명서 (해당 시)",
      "동일인증명서 (이름 변경 시 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월",
    notices: [
      "외국국적불행사 서약 = 한국 국적을 선택하되 외국 국적은 포기하지 않고, 한국에서는 외국 국적을 행사하지 않겠다는 서약.",
      "신고 마감일 — 여자: 만 22세 되는 해 생일 전 (이후 국적이탈신고만 가능). 남자: 만 22세 되는 해 생일 전, 또는 병역 복무 후 2년 이내.",
      "⚠️ '원정출산' 자녀는 서약 불가 — 단, 출생 전후 통산 2년 이상 외국 체류, 영주권·국적 취득, 정규대학 6개월 이상 수학(어학연수 1년+), 파견 근무 등은 예외.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택신고) →",
  },

  nationality_choice_start: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고"],
    question: "신청자의 성별은?",
    sub: "선천적 복수국적자의 국적선택신고는 성별과 시기에 따라 기한이 달라집니다.",
    options: [
      { id: "nationality_choice_male_birth", icon: "👨", title: "남성", desc: "출생 상황·병역에 따라 기한이 달라집니다" },
      { id: "nationality_choice_female_birth", icon: "👩", title: "여성", desc: "만 22세가 되는 해 생일 전까지 신고 가능" },
    ],
  },

  nationality_choice_male_birth: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "남성"],
    question: "출생 당시 부모님의 체류 상황은?",
    sub: "이른바 '원정출산'에 해당하면 외국국적불행사 서약(국적선택)이 제한됩니다.",
    options: [
      { id: "nationality_choice_male_a", icon: "🏠", title: "영주 목적으로 체류 중 출생", desc: "부/모가 영주권·시민권을 보유·신청한 상태에서 출생 / 또는 부·모가 외국에 오래 거주한 경우" },
      { id: "nationality_choice_excluded", icon: "✈️", title: "영주 목적 없이 체류 중 출생 (원정출산 등)", desc: "원칙적으로 외국국적불행사 서약 불가 — 예외 조건 확인 필요" },
    ],
  },

  nationality_choice_female_birth: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "여성"],
    question: "출생 당시 부모님의 체류 상황은?",
    sub: "이른바 '원정출산'에 해당하면 외국국적불행사 서약(국적선택)이 제한됩니다.",
    options: [
      { id: "nationality_choice_female", icon: "🏠", title: "영주 목적으로 체류 중 출생", desc: "부/모가 영주권·시민권을 보유·신청한 상태에서 출생 / 또는 부·모가 외국에 오래 거주한 경우" },
      { id: "nationality_choice_excluded", icon: "✈️", title: "영주 목적 없이 체류 중 출생 (원정출산 등)", desc: "원칙적으로 외국국적불행사 서약 불가 — 예외 조건 확인 필요" },
    ],
  },

  nationality_choice_male_a: {
    type: "question",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "남성", "영주 목적 출생"],
    question: "현재 시기·병역 상황은?",
    sub: "남성은 만 22세가 되는 해 생일 전까지, 또는 병역의무를 마친 경우 그로부터 2년 이내에 국적선택신고가 가능합니다.",
    options: [
      { id: "nationality_choice_male_intime", icon: "✅", title: "만 22세 되는 해 생일 전 (기간 내)", desc: "정상 국적선택신고(외국국적불행사 서약) 가능" },
      { id: "nationality_choice_male_served", icon: "🎖️", title: "병역의무 해소 완료 (전역·면제 등)", desc: "병역 해소일로부터 2년 이내 국적선택신고 가능" },
      { id: "nationality_renounce_exception", icon: "⚠️", title: "기간을 넘겼고 병역 미해소", desc: "국적선택 불가 → 예외적 국적이탈 허가로 안내" },
    ],
  },

  nationality_choice_male_intime: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "남성", "기간 내"],
    title: "국적선택신고 — 남성 (만 22세 되는 해 생일 전)",
    sub: "선천적 복수국적자가 한국 국적을 유지하는 신고(외국국적불행사 서약) · 무료",
    docs: [
      "국적선택신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "외국국적불행사서약서 (양식)",
      "증명사진 2매 (사진관 촬영 필수)",
      "캐나다 출생증명서 원본 + 사본 (해외 출생자) / 한국 출생자는 시민권증서로 대체",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 + 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부 / 부의 혼인관계증명서 (해당 시)",
      "동일인증명서 (이름 변경 시 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월",
    notices: [
      "외국국적불행사 서약 = 한국 국적을 선택하되 외국 국적은 포기하지 않고, 한국에서는 외국 국적을 행사하지 않겠다는 서약.",
      "신고 마감일 — 남자: 만 22세가 되는 해 생일 전까지(이후에는 국적이탈신고만 가능).",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택신고) →",
  },

  nationality_choice_male_served: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "남성", "병역 해소 후"],
    title: "국적선택신고 — 남성 (병역 해소 후 2년 이내)",
    sub: "병역의무를 마친 남성이 그로부터 2년 이내에 한국 국적을 유지하는 신고 · 무료",
    docs: [
      "국적선택신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "외국국적불행사서약서 (양식)",
      "증명사진 2매 (사진관 촬영 필수)",
      "병역 해소 증빙 (전역증·병적증명서·면제 확인서 등)",
      "캐나다 출생증명서 원본 + 사본 (해외 출생자) / 한국 출생자는 시민권증서로 대체",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 + 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "동일인증명서 (이름 변경 시 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월",
    notices: [
      "외국국적불행사 서약 = 한국 국적을 선택하되 외국 국적은 포기하지 않고, 한국에서는 외국 국적을 행사하지 않겠다는 서약.",
      "신고 마감일 — 병역의무를 마친 남성은 그 해소일로부터 2년 이내.",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택신고) →",
  },

  nationality_choice_female: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "여성", "영주 목적 출생"],
    title: "국적선택신고 — 여성 (만 22세 되는 해 생일 전)",
    sub: "선천적 복수국적 여성이 한국 국적을 유지하는 신고(외국국적불행사 서약) · 무료",
    docs: [
      "국적선택신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "외국국적불행사서약서 (양식)",
      "증명사진 2매 (사진관 촬영 필수)",
      "캐나다 출생증명서 원본 + 사본 (해외 출생자) / 한국 출생자는 시민권증서로 대체",
      "출생증명서 한글 번역문 (공증 불필요)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부·모 여권 사본 + 체류자격 증명서류 사본 각 1부",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "부·모 기본증명서 각 1부 / 부의 혼인관계증명서 (해당 시)",
      "동일인증명서 (이름 변경 시 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월",
    notices: [
      "외국국적불행사 서약 = 한국 국적을 선택하되 외국 국적은 포기하지 않고, 한국에서는 외국 국적을 행사하지 않겠다는 서약.",
      "신고 마감일 — 여자: 만 22세가 되는 해 생일 전까지(이후에는 국적이탈신고만 가능).",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택신고) →",
  },

  nationality_choice_excluded: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "선천적 복수국적", "국적선택신고", "영주 목적 없이 출생"],
    title: "외국국적불행사 서약 제한 — 영주 목적 없이 체류 중 출생 (원정출산 등)",
    sub: "원칙적으로 외국국적불행사 서약(국적선택)이 불가하나, 예외 조건에 해당하면 가능합니다.",
    docs: [],
    notices: [
      "⚠️ 출생 당시 부모가 영주 목적 없이 단기 체류 중이었던 경우(이른바 '원정출산'), 원칙적으로 외국국적불행사 서약을 할 수 없습니다 — 한국 국적을 유지하려면 한국 국적을 선택하면서 외국 국적은 포기해야 합니다.",
      "다만 다음 중 하나에 해당하면 예외적으로 서약이 가능합니다:",
      "  ▸ 출생 전후를 합산해 외국에서 2년 이상 계속 거주한 경우",
      "  ▸ 외국 영주권 또는 국적을 취득한 경우",
      "  ▸ 외국 정규 대학에서 6개월 이상 수학한 경우(어학연수는 1년 이상)",
      "  ▸ 외국에 파견 근무하는 부모를 따라 체류한 경우 등",
      "본인이 예외에 해당하는지 정확한 판단이 필요하므로, 영사관 또는 국적 담당으로 문의하시기 바랍니다.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적선택신고) →",
  },

  nationality_retain: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적보유신고"],
    title: "국적보유신고 — 부모와 함께 시민권을 취득한 미성년 자녀",
    sub: "📌 이 신고는 1단계입니다 — 6개월 이내 보유신고로 국적을 지킨 뒤, 이후 2단계로 국적선택신고를 해야 복수국적이 최종 유지됩니다.",
    docs: [
      "국적보유신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "증명사진 1매 (사진관 촬영 필수)",
      "당사자 캐나다 여권 원본 + 사본 (신원정보면, 유효기간 최소 1년 이상)",
      "당사자 한국 여권 원본 + 사본 (보유한 경우)",
      "부모 여권 사본 각 1부",
      "당사자 시민권증서 원본 + 사본 (시민권 카드·Search of Citizenship Record 불가, e-Certificate 출력 제출 가능)",
      "부·모 체류자격 증명서류 사본 각 1부 (시민권증서 / 캐나다 출생=Birth Certificate / 영주권=PR카드 앞뒷면)",
      "당사자 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "동일인증명서 (이름 변경 시 — 4촌 이내 2명 서명)",
      "XpressPost 등기봉투 (통지서 수령용)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "영사관 접수 후 법무부 심사",
    notices: [
      "✅ 1단계(보유신고)를 마치면 선천적 복수국적자와 동일하게 국적선택 대상이 됩니다 → 2단계로 국적선택신고(외국국적불행사 서약)를 해야 복수국적이 최종 유지됩니다. (여자 만 22세 전 / 남자 만 22세 전 또는 병역 해소 후 2년 내)",
      "※ 법령상 용어로는 '수반취득'이라고 합니다 — 부모가 외국국적을 취득할 때 미성년 자녀가 따라서 함께 취득한 경우입니다.",
      "⚠️ 시민권 취득일(선서일)로부터 6개월 이내 신청 필수 — 초과 시 외국국적 취득일로 소급하여 한국 국적 상실(국적상실신고 필요).",
      "만 19세 생일 전 부 또는 모와 함께 시민권을 취득한 경우 대상이며, 신청자와 부모의 시민권 취득일자가 같아야 합니다.",
      "함께 시민권을 취득한 부/모의 이전 국적이 반드시 대한민국이어야 합니다. (예: 한국인 부와 중국인 모 자녀가 중국인 모와 함께 취득 → 보유신고 불가)",
      "⚠️ 15세 이상은 반드시 본인 방문 — 우편 접수 불가.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적보유신고) →",
  },

  nationality_loss: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적상실신고"],
    title: "국적상실신고 — 후천적 시민권 취득자 (본인 생존)",
    sub: "외국국적 취득일에 한국 국적이 자동 상실된 것을 사후 신고 · 무료",
    docs: [
      "국적상실신고서 (양식, 작성예시 참고) — 카카오톡 연결 전화번호 기재",
      "  ▸ 15세 이상: 본인 서명 / 15세 미만: 법정대리인 서명",
      "증명사진 1매 (사진관 촬영 필수)",
      "캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상, 원본 즉시 반환)",
      "시민권증서 원본 + 사본 (선서일 정확 표시, 카드·Search of Citizenship Record 불가, e-Certificate 출력 제출 가능)",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내, 본인 이름으로 발급)",
      "가족관계증명서 (상세, 주민번호 전부공개)",
      "동일인증명서 (이름이 변경된 경우 — 4촌 이내 2명 서명)",
      "Marriage Certificate 사본 또는 제적등본 (한국 혼인신고 없이 남편 성을 따른 경우 등 — 해당 시)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월 (카카오톡·이메일로 결과 통보)",
    notices: [
      "접수: 본인 방문 또는 가족관계등록부상 가족이 대리 신청 가능 (가족 1명 대표 방문, 단 방문예약은 접수 인원만큼 각각).",
      "⚠️ 시민권 선서일에 한국 국적이 자동 상실됩니다 — 이후 한국 여권 사용 등 국민 신분 행사 시 처벌 대상.",
      "⚠️ 가족관계등록부 폐쇄 여부와 무관하게 선서일에 국적 상실.",
      "개명했더라도 가족관계등록부에 기재된 이름으로 신고서를 작성합니다.",
      "병역: 한국 출생 후 이주해 시민권을 취득한 사람은 취득일에 한국 국적 상실 → 병역의무 없음.",
      "선천적 복수국적자라도 이후 또 다른 외국국적을 후천적으로 취득한 경우 이 신고 대상입니다 (해당국 출생증명서·여권 추가 제출).",
      "우편접수 가능 (토론토 반경 2시간 이상 거리, 시민권증서는 사본만, 분실 등 책임 없음). 출입국사무소 국적계에서도 접수 가능.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적상실신고) →",
  },

  nationality_loss_death: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적상실신고", "사망자"],
    title: "국적상실신고 — 사망한 가족",
    sub: "외국국적을 취득한 가족이 사망한 경우의 국적상실신고 · 무료",
    docs: [
      "국적상실신고서 (사망자용 양식) — 카카오톡 연결 전화번호 기재, 신고인 서명",
      "캐나다 여권 사본 1부 (만료된 여권도 무관, 없으면 사유서 제출)",
      "사망증명서 사본 1부",
      "  ▸ 주정부(온타리오·마니토바) 발행만 — 장의사 발행 불가",
      "  ▸ 가급적 Long form (Certified Copy of Death Registration, Form 15)",
      "  ▸ 성명·생년월일·사망일자 정확해야 함 (오류 시 주정부 정정 후 제출)",
      "시민권증서 원본 + 사본 (사망자도 반드시 제출, 선서일 정확 표시, 카드·Search 불가, e-Certificate 출력 가능, 원본 즉시 반환)",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내, 사망자 이름으로 발급)",
      "가족관계증명서 (상세, 주민번호 전부공개)",
      "동일인증명서 (사망자 이름이 변경된 경우 — 보증인 4촌 이내 친인척 서명)",
      "Marriage Certificate 사본 또는 제적등본 (한국 혼인신고 없이 남편 성을 따른 경우, 또는 2008년 이전 배우자 미기재 — 해당 시)",
      "통보 및 송달 동의서 (양식)",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "약 6개월 (카카오톡·이메일로 결과 통보)",
    notices: [
      "신고 대상: 외국국적을 취득해 한국 국적이 상실된 가족이 사망한 경우.",
      "⚠️ 가족관계등록부 폐쇄 여부와 무관하게 시민권 선서일에 국적 상실.",
      "우편접수 가능 (토론토 반경 2시간 이상 거리, 분실 등 책임 없음).",
      "결과 문서 확인: 완료 메시지 수신 후 15~30일 뒤 기본증명서 발급 시 표시됨.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (국적 → 국적상실신고) →",
  },

  nationality_recover: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "국적회복"],
    title: "국적회복 — 만 65세 이상 복수국적 취득 (영사관 업무 아님)",
    sub: "한국 내 출입국사무소에서만 신청 가능 · 영사관 접수 불가",
    docs: [
      "⚠️ 국적회복(복수국적) 신청은 한국 내 출입국사무소에서만 가능 — 재외공관(영사관) 접수 불가.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "절차 안내 (한국 방문 시):",
      "  ① 국적상실신고 (출입국사무소 또는 재외공관 — 이미 했으면 생략)",
      "  ② 재외동포비자(F-4) 신청 (출입국사무소 또는 재외공관, 거주 예정지 관할 출입국)",
      "  ③ 거소증 신청 (출입국사무소만 가능, F-4와 동시 신청 가능, 약 3주)",
      "  ▸ ①②③은 출입국사무소에서 동시 신청 가능",
      "  ④ 국적회복허가 신청 (출입국사무소, 약 7~8개월, 관할마다 상이)",
      "  ⑤ 허가 통지서 수령 후 1년 이내 외국국적불행사 서약서 제출",
      "  ⑥ 동사무소·구청에서 주민등록증·한국여권 발급 신청",
    ],
    costs: [{ label: "수수료", value: "출입국사무소 안내 참조" }],
    time: "약 7~8개월 (출입국사무소 처리)",
    notices: [
      "2011년 1월 1일부터 만 65세 이상 외국국적동포가 국적회복허가를 통해 복수국적 취득 가능 (외국국적 포기 없이 한국국적 보유).",
      "⚠️ 허가 통지서 수령 후 1년 이내에 외국국적불행사 서약을 하지 않으면 회복된 국적이 자동 상실됩니다.",
      "출입국 시 양국 여권 모두 소지 — 한국 출입국은 한국여권, 캐나다 출입국은 캐나다여권 사용.",
      "출입국사무소 위치·연락처 및 자세한 내용은 hikorea.go.kr 참고.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "상담 예약하기 (사전 문의) →",
    onlineLink: "https://www.hikorea.go.kr",
  },

  nationality_acquire: {
    type: "result",
    service: "nationality",
    breadcrumb: ["홈", "국적", "인지에 의한 국적취득"],
    title: "인지에 의한 국적취득 — 한국인 부의 혼외자",
    sub: "한국인 아버지와 외국인 어머니 사이 혼외 출생 미성년(19세 이하) · CAD $24.30",
    docs: [
      "국적취득신고서 (양식) — 카카오톡 연결 전화번호 기재",
      "증명사진 1매 (3.5×4.5cm, 흰색배경, 6개월 이내, 사진관 촬영)",
      "당사자 캐나다 여권 원본 + 사본 (유효기간 최소 1년 이상)",
      "부모 여권 사본 각 1부",
      "당사자 출생증명서 사본 (부모 이름 모두 표시)",
      "부·모 체류자격 증명서류 사본 각 1부 (시민권증서 / 캐나다 출생=Birth Certificate / 영주권=PR카드 앞뒷면 / 장기체류=비자)",
      "부의 기본증명서 + 가족관계증명서 + 혼인관계증명서 각 1부 (상세, 주민번호 전부공개, 3개월 이내)",
      "가족관계통보서 (양식)",
      "인지경위서 (양식) — 부가 직접 작성",
      "XpressPost 등기봉투 (통지서 수령용)",
    ],
    costs: [{ label: "수수료", value: "CAD $24.30 (현금, Debit, 신용카드)" }],
    time: "영사관 접수 후 법무부 심사",
    notices: [
      "💡 한국인 어머니와 외국인 아버지 사이의 혼외자는 인지신고 불필요 — 가족관계 → 출생신고 메뉴를 이용하세요.",
      "💡 혼인 중 출생자(부모가 결혼한 상태)는 국적과 무관하게 출생신고만 하면 됩니다 — 가족관계 → 출생신고 메뉴.",
      "대상: 법률혼이 아닌 한국인 부 + 외국인 모 사이의 혼외 출생 미성년(19세 이하). 한국인 부가 인지신고로 가족관계등록부에 올린 뒤 신고한 때 국적 취득.",
      "국적취득 후: 외국국적 포기 후 증명서 제출, 또는 외국국적불행사 서약서 + 관련 서류 제출 (국적법 시행령 제13조 — 외국국적 포기가 어려운 경우).",
      "⚠️ 우편 접수 불가 — 아버지가 반드시 영사관 방문.",
      "부 또는 모가 시민권 취득 후 국적상실신고를 안 한 경우 동시 접수.",
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
      "법정대리인 동의서 (신청서에 포함됨)",
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
      "법정대리인 동의서 (신청서에 포함됨)",
      "미성년자 여권 원본 + 사본",
      "미성년자 캐나다 체류자격 증명서류 (ETA·비자·영주권 등)",
      "  ▸ 시민권자: 발급 불가",
      "가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내) — 신청대상자 이름으로 발급, 열람용 불가",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내) — 신청대상자 이름으로 발급, 열람용 불가",
      "  ▸ 미성년자 2인 이상 신청 시 신청자별 각각 별도 원본 제출",
      "  ▸ 영사관 신청 시 2주 소요 — 미리 발급받아 제출",
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
      "금융인증서 발급 신청서 (양식) — 서명은 여권 서명과 동일하게",
      "법정대리인 동의서 (신청서에 포함됨)",
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
      "금융인증서 발급 신청서 (양식) — 미성년자 본인이 직접 서명",
      "법정대리인 동의서 (신청서에 포함됨)",
      "미성년자 여권 원본 + 사본",
      "미성년자 캐나다 체류자격 증명서류 (ETA·비자·영주권 등)",
      "  ▸ 시민권자: 발급 불가",
      "가족관계증명서 (상세, 주민번호 전부공개, 3개월 이내) — 열람용 불가",
      "기본증명서 (상세, 주민번호 전부공개, 3개월 이내) — 열람용 불가",
      "  ▸ 미성년자 2인 이상 신청 시 신청자별 각각 별도 원본 제출",
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
      { id: "vcert_passport_info", icon: "📋", title: "여권 사실증명서", desc: "여권정보·발급기록·실효확인 등 — 주민번호 없는 여권 보완 서류" },
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
    breadcrumb: ["홈", "각종 증명서 발급", "여권 사실증명서"],
    title: "여권 사실증명서",
    sub: "여권정보·발급기록·실효확인·발급신청서류·사본 등 여권 관련 사실을 증명",
    docs: [
      "여권 사실증명서 발급 신청서 (소정 양식)",
      "발급대상자의 유효한 여권 원본 (여권 원본을 제출하지 못하면 발급 불가)",
      "  ▸ 공동인증서 보유 시: 정부24(gov.kr)에서 온라인 즉시 발급 가능",
      "  ▸ 영사관 방문 시: 예약 후 방문하여 발급",
      "[만 19세 미만 자녀를 부 또는 모가 신청 시] 방문하는 부/모의 여권 원본+사본, 가족관계증명서(상세·주민번호 전부공개) 또는 신청서 내 행정정보공동이용 동의",
      "[대리인 신청 시] 대리인의 여권 원본+사본, 여권 사실증명 위임장 원본, 위임자의 인감증명서(또는 본인서명사실확인서·전자본인서명확인서 원본)",
    ],
    costs: [{ label: "수수료", value: "CAD $1.35 (현금·Debit·신용카드)" }],
    time: "방문 당일 즉시 / 온라인 즉시",
    notices: [
      "여권 사실증명은 다음 6종입니다: ▸여권정보증명서 ▸여권발급기록증명서(국문) ▸여권발급기록증명서(영문) ▸여권실효확인서(국문) ▸여권실효확인서(영문) ▸여권발급신청서류 증명서. 이와 별도로 여권사본증명서(여권 사본의 진위 인증)도 발급 가능합니다.",
      "2020년 12월 21일 이후 발급된 여권은 개인정보 보호를 위해 주민등록번호 뒷자리가 표기되지 않습니다.",
      "각종 민원업무에 주민등록번호 뒷자리 확인이 필요한 경우, 뒷자리가 없는 여권 소지자는 여권과 함께 여권정보증명서를 제출해야 업무가 가능합니다.",
      "공동인증서가 있으면 정부24에서 온라인으로 간편 발급 가능하며, 영사관 여권과를 예약 후 방문하셔도 발급됩니다.",
      "여권사본증명서: 외국 정부기관 등에 여권 사본을 제출할 때 그 사본의 진위를 정부가 인증하는 서류입니다.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },

  vcert_overseas_reg: {
    type: "question",
    service: "various_cert",
    breadcrumb: ["홈", "각종 증명서 발급", "재외국민등록부 등본"],
    question: "어떻게 발급받으시겠어요?",
    sub: "공동인증서가 있으면 재외동포365 민원포털에서 온라인으로 즉시 발급 가능합니다.",
    options: [
      { id: "registration_copy_online", icon: "💻", title: "온라인 발급 (재외동포365 민원포털)", desc: "공동인증서 필요 — 즉시 발급" },
      { id: "registration_copy_visit", icon: "🏛️", title: "영사관 방문 발급", desc: "당일 즉시 — CAD $0.65/부" },
      { id: "registration_copy_mail", icon: "📮", title: "우편 신청", desc: "변호사 공증 사본 필요" },
    ],
  },

  visa_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)"], question: "한국 혈통이 있으신가요?", sub: "한국법상 부모 중 한 명이라도 한국 국적이었던 적이 있으면, 지금은 캐나다인이 되셨어도 본인이 선천적으로 한국 국적을 보유할 수 있습니다. 비자 신청 전 반드시 확인이 필요합니다.", options: [{ id: "visa_ko_heritage_yes", icon: "🧬", title: "네 — 부모 또는 조부모가 한국인이었던 적 있어요", desc: "현재 캐나다인이 되셨더라도 해당됩니다" },{ id: "visa_ko_heritage_unsure", icon: "🤔", title: "잘 모르겠어요", desc: "부모님 중 한 분이 한국인이었을 수도 있어요" },{ id: "visa_ko_heritage_no", icon: "🌐", title: "전혀 없어요", desc: "부모·조부모 모두 한국 국적인 적 없음" }] },

  visa_ko_heritage_yes: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)", "한국 혈통"], question: "어떤 상황이신가요?", sub: "한국 혈통이 있으시면 비자 신청 전 국적 상태를 먼저 확인해야 합니다.", options: [{ id: "visa_dual_check_en", icon: "⚠️", title: "국적 상태를 아직 확인하지 않았어요", desc: "선천적 한국 국적 보유 여부 — 먼저 확인 필수" }, { id: "visa_f4_family_en", icon: "👨‍👩‍👧", title: "배우자 또는 자녀가 F-4 재외동포 비자 소지자예요", desc: "동반 비자 (F-3) 신청" }, { id: "visa_f4_en", icon: "🇰🇷", title: "국적상실 확인 완료 — F-4 비자 신청하러 왔어요", desc: "해당 케이스 선택" }] },
  visa_ko_heritage_unsure: { type: "result", service: "visa", breadcrumb: ["홈", "비자 (사증)", "혈통 불확실"], title: "⚠️ 비자 신청 전 부모님께 먼저 확인하세요", docs: ["부모님 중 한 분이라도 한국 국적이었던 적이 있는지 확인하세요", "  ▸ 현재 캐나다 시민권자이더라도, 본인 출생 당시 한국인이었다면 해당됩니다", "  ▸ 출생신고를 한 적 없어도, 출생 당시 부모 중 한 명이 한국인이었으면 본인도 한국 국적입니다", "확인 결과에 따라:", "  ▸ 한국 혈통 있음 → 뒤로 가서 '네' 선택", "  ▸ 한국 혈통 없음 → 뒤로 가서 '전혀 없어요' 선택"], costs: [{ label: "수수료", value: "해당 없음 — 상담 안내" }], time: "부모님께 확인 후 다시 방문", notices: ["⚠️ 한국 국적을 보유한 상태에서 비자를 신청하면 접수가 거부됩니다.", "⚠️ 만 18~37세 남성이고 한국 국적이라면 병역 의무가 있을 수 있습니다.", "여전히 불확실하다면 영사관(416-920-3809) 또는 국적과 상담 예약을 이용하세요."], booking: "https://www.torbooking.com/book", bookingLabel: "국적 상담 예약하기 →" },

  visa_ko_heritage_no: { type: "question", service: "visa", breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음"], question: "방문 목적은 무엇인가요?", sub: "🇨🇦 캐나다 국적자는 한국 무비자 입국 가능 (최대 6개월). 그 외 국적은 사증면제 여부·체류 기간이 다르므로 공식 안내를 확인하세요.", options: [{ id: "visa_visit_transit_en", icon: "🌏", title: "관광·경유 (무비자)", desc: "무비자 · K-ETA · 경유(TWOV)" }, { id: "visa_short_term_en", icon: "🤝", title: "단기 방문 (비자 필요)", desc: "C-3-9 관광, C-3-4 출장, C-3-1 일반, C-3-3 의료관광" }, { id: "visa_work_en", icon: "💼", title: "취업", desc: "E-2 원어민교사, H-1 워킹홀리데이, F-1-D 디지털노마드 등" }, { id: "visa_study_en", icon: "🎓", title: "유학·어학연수", desc: "D-2 유학, D-4 어학연수" }, { id: "visa_marriage_en", icon: "💍", title: "결혼이민 (F-6-1)", desc: "한국 국민의 배우자" }, { id: "visa_mail_en", icon: "📮", title: "우편 신청·비자 조회", desc: "우편 신청 안내 및 비자 진행 조회 방법" }] },
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
    sub: "Since you have Korean heritage, you need to verify your citizenship status before applying for any visa.",
    options: [
      { id: "visa_dual_check_en", icon: "⚠️", title: "I haven't checked my Korean citizenship status yet", desc: "You may still hold Korean nationality — check this first" },
      { id: "visa_f4_family_en", icon: "👨‍👩‍👧", title: "My spouse/child holds an F-4 Overseas Korean Visa", desc: "Accompanying family → F-3 Dependent Visa" },
      { id: "visa_f4_en", icon: "🇰🇷", title: "Nationality loss/renunciation confirmed — applying for F-4 Visa", desc: "Select the case that matches your situation" },
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
    sub: "Since you have no Korean heritage, select your purpose of visit. Canadian citizens can enter Korea visa-free for up to 6 months; other nationalities have different visa-free terms — check the official guide.",
    options: [
      { id: "visa_visit_transit_en", icon: "🌏", title: "Visa-Free / Transit", desc: "Visa-free · K-ETA · Transit (TWOV)" },
      { id: "visa_short_term_en", icon: "🤝", title: "Short-Term Visit", desc: "Tourism (C-3-9), Business (C-3-4), General (C-3-1), Medical (C-3-3)" },
      { id: "visa_work_en", icon: "💼", title: "Work", desc: "E-2-1 English teacher, E-2-2 EPIK/TALK, E-1~E-7, H-1 Working Holiday, F-1-D Digital Nomad" },
      { id: "visa_study_en", icon: "🎓", title: "Study", desc: "D-2-6 Exchange, D-2-8 Short-term, D-4-1 Korean Language, D-4-3 Elementary/Secondary" },
      { id: "visa_marriage_en", icon: "💍", title: "Marriage Immigration (F-6-1)", desc: "Spouse of a Korean national — 90-day single entry, extendable inside Korea" },
      { id: "visa_others_en", icon: "📋", title: "Others", desc: "A-2-4 — Official / Diplomatic Duty" },
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
  // ── F-4 Overseas Korean Visa ──
  visa_f4_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "F-4 Overseas Korean"],
    question: "Which case applies to you?",
    sub: "F-4 (Overseas Korean) visa allows up to 2 years stay per entry, 5-year validity, multiple entry. Fee: CAD $121.50. Processing: 5–10 business days.",
    options: [
      { id: "visa_f4_case1_en", icon: "👨", title: "Case 1 — Male under 41 who personally held Korean citizenship", desc: "Nationality loss/renunciation completed · Additional military-related docs required" },
      { id: "visa_f4_case2_en", icon: "🌏", title: "Case 2 — Born with dual nationality (parents were Canadian at birth)", desc: "Nationality renunciation completed · Korean language proficiency affects stay duration" },
      { id: "visa_f4_case3_en", icon: "🍁", title: "Case 3 — Acquired citizenship later (most common)", desc: "Born in Korea, immigrated to Canada, naturalized · Nationality loss completed" },
    ],
  },

  visa_f4_case1_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Case 1 — Male Under 41"],
    title: "F-4 Overseas Korean Visa — Case 1: Male Under 41",
    docs: [
      "Visa Application Form — downloaded from visa.go.kr, all fields completed in full",
      "1 passport photo (3.5×4.5cm, white background, taken within 6 months, date-stamped on back)",
      "  ▸ ⚠️ Consulate photo equipment cannot be used — must bring photo from photo studio",
      "Canadian passport — original + photocopy",
      "  ▸ Visa validity tied to passport expiry — renew passport first if less than 5 years remain",
      "Both parents' passport photocopies",
      "  ▸ If a parent is deceased: submit death certificate instead",
      "Canadian Citizenship Certificate — original + photocopy",
      "  ▸ Card-type or Search of Citizenship Record NOT accepted",
      "  ▸ Must show citizenship date (oath date) with year/month/day",
      "  ▸ e-Certificate: print and submit; original email may be requested",
      "Birth Certificate — Certified Copy of Birth Registration (original + photocopy)",
      "  ▸ For Korean-born applicants: submit Citizenship Certificate instead",
      "  ▸ Must show both parents' names",
      "Applicant's Basic Certificate / 기본증명서 (Detailed, full ID number, within 3 months)",
      "  ▸ If loss reported before 2008: submit 제적등본 instead",
      "Applicant's Family Relationship Certificate / 가족관계증명서 (Detailed, within 3 months)",
      "Both parents' Basic Certificate + Family Relationship Certificate (Detailed, within 3 months)",
      "  ▸ If parent's nationality loss was before 2008: submit 제적등본 instead",
      "Nationality Loss Registration Receipt (if loss not yet shown in Basic Certificate)",
      "Parents' proof of Canadian status (photocopy):",
      "  ▸ Canadian citizen (Korean-born): Citizenship Certificate",
      "  ▸ Canadian citizen (Canadian-born): Birth Certificate",
      "  ▸ Permanent Resident: valid PR Card (front & back)",
      "  ▸ If previously held PR/citizenship but now renounced: submit renunciation certificate",
      "  ▸ If parent has no long-term status: no submission required",
      "RCMP Criminal Record Check — fingerprint-based, issued within 6 months",
      "  ▸ ⚠️ Fingerprint-based ONLY — name-based search NOT accepted",
      "  ▸ ⚠️ Toronto Police Service or local police records NOT accepted — must be RCMP",
      "  ▸ Inquiries: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "Third-country Criminal Record Check (if stayed 1+ year in a country other than Korea/Canada within last 5 years)",
      "  ▸ Apostille required if from Apostille Convention country; consular authentication if not",
    ],
    costs: [{ label: "Visa Fee", value: "CAD $121.50 (Cash, Debit, Credit) / Mail: Certified Cheque" }],
    time: "5–10 business days",
    notices: [
      "⚠️ You MUST complete Korean nationality loss/renunciation (국적상실 신고) BEFORE applying for the visa.",
      "  ▸ Step 1: Apply for 기본증명서 / 가족관계증명서 (takes 2 weeks at consulate — book early)",
      "  ▸ Step 2: Nationality loss report (book Nationality section appointment)",
      "  ▸ Step 3: Visa application (book Visa section appointment)",
      "⚠️ Eligible cases (males under 41):",
      "  ▸ Born in Korea, immigrated with parents BEFORE May 1, 2018 and completed nationality loss",
      "  ▸ Born in Canada to Korean parent(s), nationality renunciation completed BEFORE May 1, 2018",
      "  ▸ Completed military service (discharge certificate required)",
      "  ▸ Military service exempted",
      "⚠️ NOT eligible: Males who lost/renounced Korean nationality ON OR AFTER May 1, 2018 without completing military service → F-4 restricted until age 41.",
      "Visa validity: 5 years from issue date; stay up to 2 years per entry.",
      "⚠️ Visa valid for 3 months from issue date — must enter Korea within this period.",
      "Visa status check: visa.go.kr → select '재외공관' → enter passport number and name.",
      "Mail applications accepted: include Prepaid Xpresspost return envelope + Certified Cheque.",
      "거소증 (Overseas Korean Resident Card): if staying 90+ days or planning multiple visits within 5 years, apply at a Korean Immigration Office within 90 days of arrival.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_case2_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Case 2 — Born Dual National"],
    question: "What is your gender and age?",
    sub: "Males aged 18–59 must submit an RCMP Criminal Record Check. Korean language proficiency document allows 2-year stay; without it, stay is limited to 1 year.",
    options: [
      { id: "visa_f4_case2_general_en", icon: "👩", title: "Female · or Male under 18 · or Male 60+", desc: "RCMP Criminal Record Check not required" },
      { id: "visa_f4_case2_male_en", icon: "👨", title: "Male aged 18–59", desc: "RCMP Criminal Record Check required" },
    ],
  },

  visa_f4_case2_general_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Case 2 — Born Dual National"],
    title: "F-4 Overseas Korean Visa — Case 2: Born Dual National",
    docs: [
      "Visa Application Form — downloaded from visa.go.kr, all fields completed",
      "1 passport photo (3.5×4.5cm, white background, taken within 6 months, date-stamped)",
      "  ▸ ⚠️ Consulate photo equipment cannot be used — bring photo from photo studio",
      "Canadian passport — original + photocopy",
      "Both parents' passport photocopies",
      "  ▸ If a parent is deceased: submit death certificate instead",
      "Birth Certificate (Certified Copy of Birth Registration) — original + photocopy",
      "  ▸ Must show both parents' names",
      "  ▸ If born outside Canada: birth certificate from that country",
      "Korean parent(s)' Basic Certificate / 기본증명서 (Detailed, full ID number, within 3 months)",
      "Korean parent(s)' Family Relationship Certificate / 가족관계증명서 (Detailed, within 3 months)",
      "  ▸ If parent's nationality loss before 2008: submit 제적등본 instead",
      "  ▸ ⚠️ Parent(s) must visit consulate to apply (child cannot apply on parent's behalf)",
      "Parent(s)' nationality loss registration receipt (if not yet shown in Basic Certificate)",
      "Parents' proof of Canadian status (photocopy):",
      "  ▸ Canadian citizen (Korean-born): Citizenship Certificate",
      "  ▸ Canadian citizen (Canadian-born): Birth Certificate",
      "  ▸ Permanent Resident: valid PR Card (front & back)",
      "[Optional] Korean language proficiency document (for 2-year stay instead of 1-year):",
      "  ▸ TOPIK Level 1+, Social Integration Program pre-assessment (21+ points) or Level 1 completion,",
      "  ▸   King Sejong Institute certificate (Elementary 1B+), or equivalent",
      "  ▸ Exemptions: age 60+, completed Korean elementary school+, age 13 or under, previous F-4 with 3+ years in Korea",
    ],
    costs: [{ label: "Visa Fee", value: "CAD $121.50 (Cash, Debit, Credit) / Mail: Certified Cheque" }],
    time: "5–10 business days",
    notices: [
      "Eligibility: born with dual Korean-Canadian nationality where at least one parent was already Canadian at time of birth, AND nationality renunciation completed.",
      "⚠️ Without Korean language proof: stay limited to 1 year per entry. With proof: up to 2 years.",
      "⚠️ Visa valid for 3 months from issue date — must enter Korea within this period.",
      "Visa validity: 5 years; stay up to 2 years per entry (1 year without language proof).",
      "Mail applications accepted: include Prepaid Xpresspost return envelope + Certified Cheque.",
      "거소증: apply within 90 days of arrival if staying 90+ days.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_case2_male_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Case 2 — Born Dual National (Male 18–59)"],
    title: "F-4 Overseas Korean Visa — Case 2: Born Dual National (Male aged 18–59)",
    docs: [
      "Visa Application Form — all fields completed",
      "1 passport photo (3.5×4.5cm, white background, within 6 months, date-stamped)",
      "  ▸ ⚠️ Consulate photo equipment cannot be used",
      "Canadian passport — original + photocopy",
      "Both parents' passport photocopies",
      "Birth Certificate (Certified Copy of Birth Registration) — original + photocopy",
      "  ▸ Must show both parents' names",
      "Korean parent(s)' Basic Certificate + Family Relationship Certificate (Detailed, within 3 months)",
      "  ▸ If nationality loss before 2008: submit 제적등본 instead",
      "Parent(s)' nationality loss registration receipt (if not yet shown in Basic Certificate)",
      "Parents' proof of Canadian status (photocopy)",
      "RCMP Criminal Record Check — fingerprint-based, issued within 6 months",
      "  ▸ ⚠️ Fingerprint-based ONLY (not name-based) — local police records NOT accepted",
      "  ▸ Inquiries: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "Third-country Criminal Record Check (if stayed 1+ year outside Korea/Canada in last 5 years)",
      "[Optional] Korean language proficiency document (for 2-year stay)",
    ],
    costs: [{ label: "Visa Fee", value: "CAD $121.50 (Cash, Debit, Credit) / Mail: Certified Cheque" }],
    time: "5–10 business days",
    notices: [
      "⚠️ RCMP check must be fingerprint-based — name-based NOT accepted.",
      "⚠️ Without Korean language proof: stay limited to 1 year per entry.",
      "⚠️ Visa valid for 3 months from issue date — must enter Korea within this period.",
      "Visa validity: 5 years; stay up to 2 years per entry (1 year without language proof).",
      "Mail applications accepted: include Prepaid Xpresspost return envelope + Certified Cheque.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_case3_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "F-4 Overseas Korean", "Case 3 — Naturalized Canadian"],
    title: "F-4 Overseas Korean Visa — Case 3: Naturalized Canadian (F-4-11)",
    docs: [
      "Visa Application Form — downloaded from visa.go.kr, all fields completed in full",
      "1 passport photo — 3.5×4.5cm, white background, within 6 months, date-stamped on back",
      "Canadian passport — original + photocopy",
      "Canadian Citizenship Certificate — original + photocopy",
      "Applicant's Basic Certificate / 기본증명서 — Detailed, full ID number, within 3 months",
      "Applicant's Family Relationship Certificate / 가족관계증명서 — Detailed, within 3 months",
      "RCMP Criminal Record Check — fingerprint-based, issued within 6 months",
      "  ▸ Ages 17 and under, 60 and over: exempt",
      "  ▸ Third-country check also required if stayed 1+ year outside Korea/Canada in last 5 years",
    ],
    costs: [{ label: "Visa Fee", value: "CAD $121.50 (Cash, Debit, Credit) / Mail: Certified Cheque" }],
    time: "5–10 business days",
    notices: [
      "⚠️ Complete nationality loss (국적상실 신고) BEFORE applying — processing takes ~6 months. Book Nationality section first.",
      "⚠️ 기본증명서 / 가족관계증명서 from consulate takes 2 weeks — apply early.",
      "⚠️ Consulate photo equipment cannot be used — bring photo from a photo studio.",
      "⚠️ Citizenship Certificate: card-type or Search of Citizenship Record NOT accepted. Must show oath date (year/month/day). e-Certificate: print and submit.",
      "⚠️ RCMP check: fingerprint-based ONLY — name-based or local police NOT accepted. Inquiries: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "⚠️ If 기본증명서 does not yet show nationality loss: also submit Nationality Loss Registration Receipt.",
      "⚠️ If nationality loss was before Jan 1, 2008: submit 제적등본 instead of 기본증명서/가족관계증명서.",
      "Visa: 5-year validity · up to 2 years stay per entry · multiple entry.",
      "⚠️ Visa valid for 3 months from issue — must enter Korea within this period or visa is void.",
      "Visa status: visa.go.kr → select '재외공관' → enter passport number.",
      "Mail: include Xpresspost return envelope + Certified Cheque (residents 2+ hours from consulate only).",
      "거소증: if staying 90+ days, apply at Korean Immigration Office within 90 days of arrival.",
      "No call centre — inquiries: torvisa@mofa.go.kr",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_f4_family_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "F-3 Dependent Visa"], question: "What is your relationship to the F-4 visa holder?", sub: "Spouse or minor children (under 18) of an F-4 Overseas Korean visa holder may apply for an F-3 Dependent Visa.", options: [{ id: "visa_f3_spouse_en", icon: "💑", title: "Spouse of an F-4 visa holder", desc: "Up to 1 year stay" },{ id: "visa_f3_child_en", icon: "👶", title: "Minor child (under 18) of an F-4 visa holder", desc: "Up to 1 year stay" }] },
  visa_f3_spouse_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-3 Dependent Visa", "Spouse"], title: "F-3 Dependent Visa — Spouse of F-4 Holder", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid Canadian passport — original + photocopy","1 passport-type photo","Copy of the F-4 visa holder's visa or Overseas Korean Resident Card (거소증) — front & back","Marriage certificate — Korean marriage registration (혼인관계증명서, Detailed, within 3 months), OR Canadian marriage registration","Family Relationship Certificate of both spouses (Detailed) — within 3 months"], costs: [{ label: "Visa Fee", value: "CAD $81 (Cash, Debit, Credit) / Mail: Certified Cheque $81" }], time: "Approx. 1–2 weeks", notices: ["Stay period: up to 1 year (within the F-4 holder's visa validity).","⚠️ Visa valid for 3 months from issue date — must enter Korea within this period or visa is void.","Marriage certificate: If married in Canada, must submit Certified Copy of Marriage Registration or Certified Copy of Marriage License (Legal size) — Certificate of Marriage short form NOT accepted.","Mail applications accepted — include Prepaid Xpresspost return envelope for passport.","⚠️ If you are of Korean heritage yourself, you may be eligible to apply for F-4 directly."], booking: "https://www.torbooking.com/book" },
  visa_f3_child_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "F-3 Dependent Visa", "Minor Child"], title: "F-3 Dependent Visa — Minor Child (Under 18) of F-4 Holder", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid passport — original + photocopy","1 passport-type photo","Copy of the F-4 visa holder's visa or Overseas Korean Resident Card (거소증) — front & back","Child's birth certificate — Certified Copy of Birth Registration","Parent's Family Relationship Certificate or Marriage Certificate (Detailed) — within 3 months"], costs: [{ label: "Visa Fee", value: "CAD $81 (Cash, Debit, Credit) / Mail: Certified Cheque $81" }], time: "Approx. 1–2 weeks", notices: ["Minor children: ages 0–18.","Stay period: up to 1 year (within F-4 holder's visa validity).","⚠️ Visa valid for 3 months from issue date — must enter Korea within this period or visa is void.","Mail applications accepted — include Prepaid Xpresspost return envelope for passport."], booking: "https://www.torbooking.com/book" },

  visa_c3_start_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)"], question: "What is the purpose of your visit?", sub: "Canadian citizens can visit Korea visa-free for up to 6 months. Only apply if you require a visa for your nationality.", options: [{ id: "visa_c3_family_en", icon: "👨‍👩‍👧", title: "Visiting a Korean national family member", desc: "Spouse or child is a Korean national" },{ id: "visa_c3_emergency_en", icon: "🚨", title: "Emergency / Humanitarian visit", desc: "Funeral, critical illness, emergency surgery" },{ id: "visa_c3_other_en", icon: "📋", title: "Other short-term visit (wedding, adoption, etc.)", desc: "Your own wedding, court appearance for adoption, etc." }] },
  visa_c3_family_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)", "Family of Korean National"], title: "C-3-1 Short-Term Visa — Family of a Korean National", docs: ["Visa Application Form (printed from visa.go.kr — include SIN number, fill in all details)","Valid passport — original + photocopy","1 passport-type photo","Proof of family relationship with Korean national","If of Korean heritage: Basic Certificate showing nationality loss date — within 3 months"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, Credit)" }], time: "Approx. 12–15 business days", notices: ["⚠️ If you are of Korean heritage, you must complete Korean nationality renunciation BEFORE applying.","C-series visas CANNOT be converted to another visa type inside Korea."], booking: "https://www.torbooking.com/book" },
  visa_c3_emergency_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)", "Emergency / Humanitarian"], title: "C-3-1 Short-Term Visa — Emergency / Humanitarian Visit", docs: ["Visa Application Form (printed from visa.go.kr)","Valid passport — original + photocopy","1 passport-type photo","Family relationship proof","Urgency evidence: Funeral → death certificate; Critical illness → doctor's letter; Emergency surgery → surgical documents","If of Korean heritage: Basic Certificate showing nationality loss date"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, Credit)" }], time: "Emergency processing: 5–7 business days (when humanitarian urgency is recognized)", notices: ["🚨 For funeral attendance or critical illness: call the Visa Dept. immediately: 416-920-3809 ext. 221 to request an urgent appointment slot.","⚠️ IMPORTANT: If you previously held Korean citizenship (e.g. naturalized Canadian), you MUST submit the Nationality Loss Report (국적상실신고) documentation without exception — even for emergency visits.","C-series visas cannot be converted to another visa type inside Korea."], booking: "https://www.torbooking.com/book" },
  visa_c3_other_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "Short-Term Visit (C-3-1)", "Other"], title: "C-3-1 Short-Term Visa — Other Purpose (Wedding, Adoption, etc.)", docs: ["Visa Application Form (printed from visa.go.kr)","Valid passport — original + photocopy","1 passport-type photo","Supporting documents for purpose of visit","If of Korean heritage: Basic Certificate showing nationality loss date"], costs: [{ label: "Visa Fee", value: "CAD $52 (Cash, Debit, Credit)" }], time: "Approx. 12–15 business days", notices: ["⚠️ Canadian citizens can visit Korea visa-free for up to 6 months — confirm whether you actually need a visa.","C-series visas cannot be converted to F-4, F-6 or other visa types inside Korea."], booking: "https://www.torbooking.com/book" },

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
      { label: "Single-entry (other nationalities)", value: "CAD $26 (Cash, Debit, Credit)" },
      { label: "Multiple-entry (other nationalities)", value: "CAD $52 (Cash, Debit, Credit)" },
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

  // ── TWOV 3-step flow ──
  visa_transit_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "Transit (TWOV)"],
    question: "Step 1 — What is your nationality?",
    sub: "TWOV (Transit Without Visa) allows up to 30 days in Korea without a visa — but only for certain nationalities and travel routes.",
    options: [
      { id: "visa_transit_canadian_en", icon: "🇨🇦", title: "Canadian citizen", desc: "Visa-free entry to Korea — TWOV not needed" },
      { id: "visa_transit_ineligible_en", icon: "🚫", title: "One of the restricted nationalities", desc: "Pakistan · Bangladesh · Nepal · Nigeria · Ghana · Egypt · Syria · Sudan · Iran · Cuba · Afghanistan · Iraq · Uzbekistan · Kyrgyzstan · Sri Lanka · Myanmar · Cameroon · Senegal · Gambia · Yemen · Somalia · Kosovo · Palestine" },
      { id: "visa_transit_step2_en", icon: "🌏", title: "Other nationality (China, India, Philippines, Vietnam, etc.)", desc: "May be eligible for TWOV — proceed to check" },
    ],
  },

  visa_transit_canadian_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Canadian Citizen"],
    title: "✅ Canadian Citizens — No Visa or TWOV Needed",
    docs: [],
    costs: [{ label: "Entry fee", value: "None" }],
    time: "No advance application needed",
    notices: [
      "Canadian citizens can enter Korea visa-free for up to 6 months.",
      "TWOV is designed for non-Canadian nationals transiting through Korea — it does not apply to you.",
      "Simply book your flight and enter Korea with your Canadian passport.",
    ],
    booking: null,
  },

  visa_transit_ineligible_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Restricted Nationality"],
    title: "❌ TWOV Not Available — Visa Required",
    docs: [],
    costs: [{ label: "Visa required", value: "Apply for C-3 short-term visa" }],
    time: "Approx. 5–7 business days",
    notices: [
      "Your nationality is on the restricted list — TWOV is not available even if you hold a valid Canadian PR Card or visa.",
      "You must apply for a Korean short-term visa (C-3) before travelling.",
      "Inquiries: Korean Immigration Information Centre +82-2-2100-1345",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
  },

  visa_transit_step2_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Step 2 — Canadian Status"],
    question: "Step 2 — Do you hold a valid Canadian PR Card or Canadian visa?",
    sub: "The document must be a physical sticker in your passport — digital or e-visa status is NOT accepted (except Australian visas verified via the VEVO system).",
    options: [
      { id: "visa_transit_no_status_en", icon: "❌", title: "No — I don't have a valid Canadian PR Card or visa", desc: "TWOV not available — visa required" },
      { id: "visa_transit_step3_en", icon: "✅", title: "Yes — I have a valid Canadian PR Card or physical visa sticker", desc: "Proceed to check your travel route" },
    ],
  },

  visa_transit_no_status_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "No Canadian Status"],
    title: "❌ TWOV Not Available — Visa Required",
    docs: [],
    costs: [{ label: "Visa required", value: "Apply for C-3 short-term visa" }],
    time: "Approx. 5–7 business days",
    notices: [
      "A valid Canadian PR Card or physical Canadian visa is required for TWOV.",
      "Digital immigration status or e-visa is NOT accepted (exception: Australian visas verified via VEVO).",
      "You must apply for a Korean short-term visa (C-3) before travelling.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
  },

  visa_transit_step3_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Step 3 — Travel Route"],
    question: "Step 3 — What is your travel route?",
    sub: "TWOV only applies when Korea is a transit stop — not a final destination.",
    options: [
      { id: "visa_transit_ok_en", icon: "✅", title: "Departing from another country → Korea → home country or 3rd country", desc: "e.g. China → Korea → Canada  /  Canada → Korea → China" },
      { id: "visa_transit_roundtrip_en", icon: "❌", title: "Canada → Korea → back to Canada only (round trip)", desc: "No other final destination — visiting Korea only" },
      { id: "visa_transit_complex_en", icon: "✅", title: "Complex route with stopover (max 3 days) before Korea", desc: "e.g. Country A → stopover (≤3 days) → Korea → home country" },
    ],
  },

  visa_transit_complex_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Complex Route"],
    title: "✅ You Are Likely Eligible for TWOV — Complex Route",
    docs: [
      "No visa application required — conditions to meet upon arrival:",
      "  ▸ Valid Canadian PR Card or physical Canadian visa sticker",
      "  ▸ Confirmed onward flight departing Korea within 30 days",
      "  ▸ No prior entry refusal to Korea within the last 3 years",
      "  ▸ No illegal stay or criminal violations in Korea",
      "  ▸ ⚠️ Any intermediate stopover BEFORE entering Korea must be 3 days or less",
    ],
    costs: [{ label: "Entry fee", value: "None (if all conditions met)" }],
    time: "No advance application — assessed at port of entry",
    notices: [
      "Stay: up to 30 days (B-2 Transit status).",
      "Examples of allowed complex routes:",
      "  ▸ Canada → Korea → 3rd country → home country ✅",
      "  ▸ Home country → stopover (≤3 days) → Korea → Canada ✅",
      "  ▸ Canada → stopover (≤3 days) → Korea → home country ✅",
      "⚠️ If your stopover BEFORE Korea exceeds 3 days — TWOV is NOT available.",
      "⚠️ TWOV conditions can change — verify with your airline and Korean Immigration before travel.",
      "Korean Immigration Information Centre: +82-2-2100-1345",
    ],
    booking: null,
    onlineLink: "https://www.immigration.go.kr",
  },

  visa_transit_ok_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Eligible"],
    title: "✅ You Are Likely Eligible for TWOV",
    docs: [
      "No visa application required — conditions to meet upon arrival:",
      "  ▸ Valid Canadian PR Card or physical Canadian visa sticker",
      "  ▸ Confirmed onward flight departing Korea within 30 days",
      "  ▸ No prior entry refusal to Korea within the last 3 years",
      "  ▸ No illegal stay or criminal violations in Korea (fines over KRW 5,000,000 or forced departure)",
      "  ▸ Any intermediate stopover before Korea must be 3 days or less",
    ],
    costs: [{ label: "Entry fee", value: "None (if all conditions met)" }],
    time: "No advance application — assessed at port of entry",
    notices: [
      "Stay: up to 30 days (B-2 Transit status).",
      "⚠️ TWOV conditions can change — always verify with your airline and Korean Immigration before travel.",
      "⚠️ TWOV is transit only — you cannot convert to another visa status inside Korea.",
      "Korean Immigration Information Centre: +82-2-2100-1345",
    ],
    booking: null,
    onlineLink: "https://www.immigration.go.kr",
  },

  visa_transit_roundtrip_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Transit (TWOV)", "Not Eligible — Round Trip"],
    title: "❌ TWOV Not Available — Visa Required",
    docs: [],
    costs: [{ label: "Visa required", value: "Apply for C-3 short-term visa" }],
    time: "Approx. 5–7 business days",
    notices: [
      "TWOV is only for travellers passing THROUGH Korea on the way to another country.",
      "If your trip is Canada → Korea → Canada (visiting Korea only), TWOV does not apply.",
      "You must apply for a Korean short-term visitor visa (C-3-1 or C-3-4).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
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

  visa_visit_transit_en: {
    type: "question",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "Visiting / Transit"],
    question: "What type of visit?",
    sub: "🇨🇦 Canadian passport holders are visa-free for up to 6 months — no visa needed. K-ETA exempted until December 31, 2026. Other nationalities have different visa-free terms — check your nationality at the official Seoul visa guide (visitseoul.net/visa).",
    options: [
      { id: "visa_visit_en", icon: "🇨🇦", title: "Tourism / Short-Term Stay — Canadian citizen", desc: "Visa-free up to 6 months — no Consulate visit needed / varies by nationality (30 days–6 months)" },
      { id: "visa_transit_en", icon: "🔄", title: "Transiting Through Korea (TWOV)", desc: "Passing through Korea on the way to another country — up to 30 days" },
      { id: "visa_keta_en", icon: "📱", title: "K-ETA — Do I need one?", desc: "Canadians currently exempted until Dec 31, 2026" },
    ],
  },

  visa_c39_tourist_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "Short Term Visit", "Tourism (C-3-9)"],
    title: "C-3-9 Tourist Visa — Non-Canadian Nationals",
    docs: [
      "Visa Application Form — printed from visa.go.kr, all fields completed",
      "Valid passport — original + photocopy (min. 6 months validity)",
      "1 passport photo (3.5×4.5cm, white background, taken within 6 months)",
      "Canadian PR Card or long-term Canadian visa — original + photocopy",
      "Return flight itinerary (round-trip ticket or reservation)",
      "Hotel booking or accommodation confirmation",
      "Proof of financial means (recent bank statement — last 3–6 months)",
      "  ▸ If visiting friends/relatives in Korea: invitation letter + copy of host's Korean ID or Residence Card",
    ],
    costs: [
      { label: "Standard fee (most nationalities)", value: "CAD $26 — single entry / CAD $52 — multiple entry" },
      { label: "Iran", value: "USD $90 equivalent" },
      { label: "Uzbekistan / Kyrgyzstan", value: "USD $80 equivalent" },
      { label: "Note", value: "Fee varies by nationality — verify at torvisa@mofa.go.kr before applying" },
    ],
    time: "Approx. 5–10 business days",
    notices: [
      "C-3-9 is the standard tourist visa for sightseeing, visiting relatives, and short-term leisure — up to 90 days.",
      "⚠️ Visa valid for 3 months from issue date — must enter Korea within this period.",
      "⚠️ C-3 visas cannot be extended or converted to another visa type inside Korea.",
      "⚠️ Fee varies significantly by nationality — the standard CAD $26 does NOT apply to all nationalities (e.g. Iran: ~USD $90).",
      "⚠️ C-3-9 is NOT a fully online visa — complete the application form at visa.go.kr, print it, and submit in person at the Consulate (or by mail if you live 2+ hours away).",
      "Mail applications accepted (residents 2+ hours from consulate) — include Certified Cheque + Prepaid Xpresspost return envelope.",
      "Check visa.go.kr for the most current requirements, or email torvisa@mofa.go.kr for nationality-specific questions.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },
  visa_short_term_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Short Term Visit"], question: "What is the purpose of your short-term visit?", sub: "🇨🇦 Canadian citizens can visit Korea visa-free for up to 6 months — you may NOT need a visa. A short-term visa (C-3) is mainly required for non-Canadian nationals residing in Canada, or for specific activities.", options: [{ id: "visa_c34_en", icon: "🤝", title: "Business Trip (C-3-4)", desc: "Market research, contract signing, consulting, meetings with Korean companies" },{ id: "visa_c31_en", icon: "📋", title: "General Short-Term Visit (C-3-1)", desc: "Conference, academic research, medical treatment, training, religious activities" },{ id: "visa_c33_en", icon: "🏥", title: "Medical Treatment (C-3-3)", desc: "Non-Canadians visiting Korea for medical treatment — up to 90 days" },{ id: "visa_c39_tourist_en", icon: "🌏", title: "Tourism / Short-Term Stay (C-3-9)", desc: "Sightseeing, visiting relatives, short-term leisure — for non-Canadian nationals" }] },
  visa_c33_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Short Term Visit", "Medical Treatment (C-3-3)"], title: "Medical Treatment Visa — C-3-3", docs: ["Visa Application Form — print, fill out, and sign","Valid original passport + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","1 passport-type colour photo — must be taken at a professional photo shop","  ▸ 3.5×4.5cm, white background, within 6 months, date-stamped on back","Proof of Residency in Canada — original + photocopy","  ▸ Permanent Resident: valid PR Card","  ▸ Long-term visitor: valid Work Permit or Study Permit","Medical Purpose Documentation (의료목적 입증서류) — issued within 3 months","  ▸ Invitation letter or doctor's appointment confirmation issued by a Korean hospital","Business Registration Certificate of the Korean hospital or medical facility (사업자등록증)","Certificate of Medical Travel Facilitator Registration (의료관광 유치기관 등록증)","  ▸ Available from the Korean hospital or medical facility","Proof of Funding (one of the following):","  ▸ Employment letter issued within 3 months + 2 months' recent pay stubs","  ▸ OR recent 2 months' Canadian bank statement"], costs: [{ label: "Visa Fee", value: "CAD $54 (Cash, Debit, Credit)" },{ label: "Other nationalities", value: "Fee may vary by nationality" }], time: "Approx. 2 weeks. Single-entry, valid 3 months from issue. Stay up to 90 days from date of entry.", notices: ["⚠️ This visa is primarily for NON-Canadian nationals residing in Canada — Canadian passport holders can enter Korea visa-free for medical treatment.", "⚠️ Applicants from certain countries currently in Canada must have resided continuously in Canada for at least 2 years (730 days) before applying.","All medical documents must be issued within 3 months of your application date.","Transit passengers: check the TWOV conditions at the Consulate website before applying.","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_c34_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Short Term Visit", "Business (C-3-4)"], title: "Short-Term Business Visa — C-3-4", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid passport — original + photocopy (min. 6 months validity)","1 passport-type photo (3.5×4.5cm, white background, within 6 months)","Invitation letter from the Korean company — on company letterhead, signed","Business Registration Certificate of the Korean inviting company (사업자등록증명원)","Employment letter from your Canadian employer (confirming your role and that the company is paying you)","Return flight itinerary","  ▸ Canadian PR Card or long-term visa — original + photocopy (if applicable)"], costs: [{ label: "Single-entry", value: "CAD $26 (Cash, Debit, Credit)" },{ label: "Multiple-entry", value: "CAD $52 (Cash, Debit, Credit)" }], time: "Approx. 5–7 business days", notices: ["🇨🇦 Canadian citizens can enter Korea visa-free for up to 90 days for business purposes — confirm whether you actually need this visa.","You must be paid by your Canadian employer — NOT by the Korean company.","Stay: up to 90 days. C-3 visas cannot be converted to another visa type inside Korea.","Plan at least 2 weeks ahead as processing may take longer during peak periods."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_c31_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Short Term Visit", "General (C-3-1)"], title: "General Short-Term Visitor Visa — C-3-1", docs: ["Visa Application Form (printed from visa.go.kr, with photo attached)","Valid passport — original + photocopy (min. 6 months validity)","1 passport-type photo (3.5×4.5cm, white background, within 6 months)","Supporting documents for your purpose of visit (one of the following):","  ▸ Conference / event: invitation letter or event registration confirmation","  ▸ Medical treatment: letter from Korean hospital or clinic confirming your appointment","  ▸ Academic research: letter from Korean university or institution","  ▸ Training: training program acceptance letter","  ▸ Religious activities: invitation from Korean religious organization","Proof of financial means (recent bank statement)","Return flight itinerary","  ▸ Canadian PR Card or long-term visa — original + photocopy (if applicable)"], costs: [{ label: "Single-entry", value: "CAD $26 (Cash, Debit, Credit)" },{ label: "Multiple-entry", value: "CAD $52 (Cash, Debit, Credit)" }], time: "Approx. 5–7 business days", notices: ["🇨🇦 Canadian citizens can visit Korea visa-free for up to 6 months — confirm whether you actually need this visa.","Stay: up to 90 days per entry. C-3 visas cannot be converted to another visa type inside Korea.","All documents must be submitted together — missing even one document means your application will not be accepted."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },

  // ── C-3-1 Event / Conference Visa ──
  visa_c31_event_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "Short-Term Visit", "C-3-1 Event/Conference"],
    title: "C-3-1 — Event / Conference Participation Visa",
    docs: [
      "Visa Application Form — printed and completed",
      "Valid passport — original + photocopy (min. 6 months validity)",
      "1 passport photo (3.5×4.5cm, white background, within 6 months)",
      "Canadian immigration status document — original + photocopy",
      "  ▸ Canadian citizen: not required / PR: PR Card / Long-term visa holder: valid visa",
      "Invitation letter from organizer — must include: event purpose, schedule, organizer info",
      "  ▸ If prize money is involved: must confirm prize amount in invitation",
      "  ▸ If organizer covers travel/accommodation: must be stated in invitation",
      "Organizer's Business Registration Certificate (사업자등록증)",
      "Proof of employment or enrollment (재직증명서 or 재학증명서) from Canadian employer/school",
    ],
    costs: [{ label: "Visa Fee", value: "CAD $54 (Cash, Debit, Credit)" }],
    time: "Approx. 2 weeks (12–15 business days)",
    notices: [
      "🇨🇦 Canadian citizens can enter Korea visa-free — confirm if you actually need this visa.",
      "Eligible activities: friendly matches, events, large-scale conferences, music competitions, broadcasting appearances, etc.",
      "  ▸ Organizer may cover airfare and accommodation.",
      "  ▸ Prize money is allowed — but NOT pay that exceeds accommodation costs.",
      "  ▸ If receiving pay beyond accommodation: apply for C-4 Short-Term Employment instead.",
      "⚠️ Stay: up to 90 days. C-3 visas CANNOT be converted to another visa type inside Korea.",
      "⚠️ Visa valid for 3 months from issue date — must enter Korea within this period.",
      "Processing time is not shortened for personal schedules — apply well in advance.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── F-6-1 Marriage Immigration Visa ──
  visa_marriage_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "No Korean Heritage", "F-6-1 Marriage Immigration"],
    title: "F-6-1 — Marriage Immigration Visa",
    docs: [
      "Visa Application Form — printed and completed",
      "Valid passport — original + photocopy (min. 6 months validity)",
      "1 passport photo (3.5×4.5cm, white background, within 6 months)",
      "Marriage Certificate — certified full copy (NOT the short-form Certificate of Marriage):",
      "  ▸ If married in Canada: Certified Copy of Marriage Registration OR Certified Copy of Marriage License (Legal size)",
      "  ▸ If married in another country: that country's most detailed marriage certificate — original + photocopy",
      "  ▸   If not in English: notarized English translation by Ontario/Manitoba certified translator or lawyer",
      "  ▸ If married in Korea only (no Canadian registration): Affidavit from Ontario/Manitoba lawyer confirming no Canadian marriage registration",
      "Korean spouse's passport photocopy",
      "Korean spouse's divorce certificate (if previously divorced) — Canadian government issued",
      "Applicant's divorce certificate (if previously divorced)",
      "  ▸ If ex-spouse was Korean/Korean-heritage: also submit Korean Marriage Certificate (혼인관계증명서, Detailed)",
      "Criminal Record Check — both applicant AND Korean spouse (see exemptions below)",
      "Health examination — both applicant AND Korean spouse (see exemptions below)",
      "  ▸ Exemption check: see consulate website for current exemption criteria",
      "Korean spouse's income proof (previous 1 year, before tax):",
      "  ▸ Minimum income threshold (2021): 18,528,474 KRW (2-person household) — increases per additional family member",
      "  ▸ Family income or assets may be used if spouse's own income is insufficient",
      "If pregnant 20+ weeks AND requesting exemption from some requirements: submit doctor's certificate (with due date) + exemption request form",
      "If applicant is of Korean heritage: Basic Certificate (기본증명서, Detailed, within 3 months) showing nationality loss/renunciation date",
      "  ▸ If not yet shown: also submit Nationality Loss Registration Receipt",
      "  ▸ If nationality loss before Jan 1, 2008: submit 제적등본 instead",
    ],
    costs: [{ label: "Visa Fee", value: "CAD $54 (Cash or Debit — TAP preferred; exact cash accepted)" }],
    time: "Approx. 12–15 business days (may be longer if additional review required)",
    notices: [
      "⚠️ Applicant (foreign spouse) must apply IN PERSON — mail applications NOT accepted.",
      "⚠️ Korean marriage registration (혼인신고) must be completed BEFORE applying.",
      "Visa: single entry, 90-day stay — extendable inside Korea after arrival.",
      "⚠️ Visa valid for 3 months from issue — must enter Korea within this period.",
      "If married in a country that recognizes Korea's marriage (Canada does): no need to re-register in Canada.",
      "National marriage education program required if foreign spouse is from: China, Vietnam, Philippines, Cambodia, Mongolia, Uzbekistan, Thailand — unless exempt.",
      "Visa status check: visa.go.kr",
      "For questions: torvisa@mofa.go.kr (subject line: F-6-1 Visa inquiry — Korean spouse full name & applicant full name)",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  // ── Mail Application / Visa Status Check ──
  visa_mail_en: {
    type: "result",
    service: "visa",
    breadcrumb: ["Home", "Visa", "Mail Application & Status Check"],
    title: "Visa — Mail Application & Status Check",
    docs: [
      "All documents required for the visa you are applying for (see each visa's guide)",
      "Original passport — must be included",
      "Outer envelope (you send your documents in this) — write From: your address, To: the consulate",
      "Return envelope enclosed inside, for passport return — Prepaid Xpresspost (Canada Post), with From & To both your own name/address (size does not matter)",
      "Certified Cheque or Money Order for the visa fee, payable to KOREAN CONSULATE TORONTO (personal cheques not accepted)",
      "Photocopy of your driver's licence (front, showing your address)",
    ],
    costs: [{ label: "Mail Fee", value: "Same as in-person fee — Certified Cheque only" }],
    time: "Same as in-person processing time + mail delivery",
    notices: [
      "⚠️ Mail applications only available for residents living 2+ hours by car from the consulate (e.g. London, Windsor, Kingston, Ontario).",
      "⚠️ F-6-1 Marriage Immigration Visa — mail applications NOT accepted.",
      "Mail address: Korean Consulate in Toronto (비자), 555 Avenue Road, Toronto, ON M4V 2J7",
      "Phone: 416-920-3809",
      "Email: torvisa@mofa.go.kr",
      "Consulate jurisdiction: Ontario (except Ottawa) and Manitoba.",
      "An in-person interview may still be required after mail submission (rare).",
      "Visa status check: visa.go.kr → select '재외공관' → enter passport number and name (Last First, no comma, no hyphen)",
      "  ▸ Example: HONG GILDONG (correct) / HONG, GILDONG (incorrect)",
      "Print your Visa Grant Notice in black & white or colour — this printed paper IS your visa.",
      "  ▸ Print settings: 'fit to page' or 'fit to printable area' to avoid cutting off edges.",
      "  ▸ You must present this printed paper when boarding and upon arrival in Korea.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Visa Section) →",
    onlineLink: "https://www.visa.go.kr",
  },

  visa_work_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work"], question: "What type of work will you be doing in Korea?", sub: "Select the visa that matches your situation. For E-1 through E-7 visas, your Korean employer must obtain a Confirmation of Visa Issuance (CVI) at visa.go.kr first — you then bring it to the Consulate.", options: [{ id: "visa_e2_1_en", icon: "📚", title: "E-2-1 — Foreign Language Instructor (with CVI)", desc: "Teaching at private hagwons, public schools, or corporate institutions — CVI from employer required" },{ id: "visa_e2_2_en", icon: "🏫", title: "E-2-2 — EPIK / TALK Teaching Assistant", desc: "Government-sponsored English teaching assistant program — Notice of Appointment required" },{ id: "visa_e1_e7_en", icon: "💼", title: "E-1 to E-7 — Other Work Visas (with CVI)", desc: "Professor · Researcher · Technical Instructor · Professional · Arts · Special Occupation" },{ id: "visa_c45_en", icon: "🎤", title: "C-4-5 — Short-Term Employment (up to 90 days)", desc: "English camp instructor · Model / performer · Corporate dispatch — no CVI required" },{ id: "visa_h1_en", icon: "🏖️", title: "H-1 — Working Holiday", desc: "Age 18–35 · Work and travel in Korea for up to 2 years" },{ id: "visa_f1d_en", icon: "💻", title: "F-1-D — Digital Nomad (Workation)", desc: "Working remotely for a non-Korean employer — stay up to 1 year" }] },
  visa_c45_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "C-4-5 Short-Term Employment"], question: "Which C-4-5 category applies to you?", sub: "C-4-5 covers short-term paid activities in Korea (up to 90 days). Select your activity type — each has different required documents.", options: [{ id: "visa_c45_camp_en", icon: "🏕️", title: "English Camp Instructor", desc: "Teaching English at a Korean camp or continuing education facility" },{ id: "visa_c45_model_en", icon: "📸", title: "Model / Performer / Entertainer", desc: "Fashion modelling, commercials, performances, advertisements" },{ id: "visa_c45_dispatch_en", icon: "🏢", title: "Corporate Dispatch", desc: "Dispatched to a Korean company under a service contract — paid by Canadian employer" }] },
  visa_c45_camp_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "C-4-5", "English Camp Instructor"], title: "C-4-5 — English Camp Instructor", docs: ["Visa Application Form — print and fill out","Original passport + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Business Registration Certificate of the Korean inviting organization (사업자등록증) OR certified copy of Corporate Register (등기부등본)","Employment Contract — signed and dated by both parties","Invitation Letter from the Korean company (초청장)","  ▸ Must include: applicant info, nature of activities, intended period, contact person in Korea (full address + phone)","Business registration as a continuing education facility (평생교육시설등록증 및 평생교육시설 신고수리)","Original University Degree","  ▸ Degree from outside Canada: must be notarized by the Consulate's jurisdiction or Apostilled","Camp / teaching schedule (영어캠프 운영일정표 및 강의시간표)","RCMP Fingerprint Criminal Record Check — issued within 6 months","  ▸ Must be notarized by the Korean Consulate after receipt","Sealed university transcript"], costs: [{ label: "Visa Fee", value: "CAD $54 (Cash or Debit)" }], time: "Approx. 2 weeks. Single-entry, valid 3 months from issue. Stay up to 90 days.", notices: ["⚠️ Applicants from certain countries currently in Canada must have resided continuously in Canada for at least 2 years (730 days) before applying.","⚠️ RCMP Criminal Record Check must be fingerprint-based AND notarized by the Korean Consulate — name-based checks NOT accepted.","If you previously held Korean nationality: submit 가족관계증명서 (상세) + 기본증명서 (상세) issued within 3 months (or 제적등본 if renunciation was before 2008).","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_c45_model_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "C-4-5", "Model / Performer"], title: "C-4-5 — Model / Performer / Entertainer", docs: ["Visa Application Form — print and fill out","Original passport + photocopy","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Business Registration Certificate of the Korean inviting organization (사업자등록증) OR certified copy of Corporate Register (등기부등본)","Performance Outline","Employment Contract and Performance Outline (fashion model contract, advertisement contract, etc.)","  ▸ Must indicate wages/incentives for participating events","Recommendation / employment certificate from the relevant minister:","  ▸ Entertainment activities: recommendation letter from the Korea Media Rating Board + entertainment activities outline","  ▸ Advertisement / fashion model: recommendation letter from the Minister of Culture, Sport, and Tourism","Certificate from Korea Creative Content Agency / KOCCA (대중문화예술기획업 등록증)","VAT Tax Standard Certificate (부가가치세 과세표준증명/매출과세표준)","Tax Payment Certificate (납세증명서)","Personal Reference Letter","Resume / Portfolio"], costs: [{ label: "Visa Fee", value: "CAD $54 (Cash or Debit)" }], time: "Approx. 2 weeks. Single-entry, valid 3 months from issue. Stay up to 90 days.", notices: ["⚠️ Applicants from certain countries currently in Canada must have resided continuously in Canada for at least 2 years (730 days) before applying.","If you previously held Korean nationality: submit 가족관계증명서 (상세) + 기본증명서 (상세) issued within 3 months (or 제적등본 if renunciation was before 2008).","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_c45_dispatch_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "C-4-5", "Corporate Dispatch"], title: "C-4-5 — Corporate Dispatch to Korea", docs: ["Visa Application Form — print and fill out","Original passport + photocopy","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Business Registration Certificate of the Korean inviting organization (사업자등록증) OR certified copy of Corporate Register (등기부등본)","Employment Letter from your Canadian company","  ▸ Must include: applicant info, nature of business activities in Korea, intended period, contact person in Canada (full address + phone), confirmation that the Canadian company is paying your expenses (NOT the Korean company)","Employment / Service Contract between the two companies","Supporting documents showing business relationship (e.g. trade records, export/import licences, contracts between the two companies)","Flight itinerary and details of your stay","  ▸ Recommend a rebookable/reschedulable ticket or submit a flight itinerary only"], costs: [{ label: "Visa Fee", value: "CAD $54 (Cash or Debit)" }], time: "Approx. 2 weeks. Single-entry, valid 3 months from issue. Stay up to 90 days.", notices: ["⚠️ You must be employed and paid by your Canadian company — NOT by the Korean company.","⚠️ Applicants from certain countries currently in Canada must have resided continuously in Canada for at least 2 years (730 days) before applying.","If you previously held Korean nationality: submit 가족관계증명서 (상세) + 기본증명서 (상세) issued within 3 months (or 제적등본 if renunciation was before 2008).","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_e2_1_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "E-2-1 Foreign Language Instructor"], title: "E-2-1 — Foreign Language Instructor (CVI Holders)", docs: ["Visa Application Form — print and fill out the attached form","Valid Canadian passport — original + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","1 passport-type colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Signed employment contract — signed by both the applicant and the academic institution"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $81 (Cash, Debit, Credit or Money Order)" }], time: "Approx. 2 weeks. Single-entry visa valid for 90 days from date of issue. Stay up to 2 years (generally 13 months).", notices: ["⚠️ Your Korean employer must apply through visa.go.kr first to obtain the Confirmation of Visa Issuance (CVI) number — you cannot start this process alone.","⚠️ E-2-1 is a SINGLE-ENTRY visa valid for 90 days from issue — enter Korea within that period.","⚠️ Eligible nationalities: Canada, USA, UK, Australia, New Zealand, Ireland, South Africa only.","Additional documents may be requested upon review.","Korean-descent applicants may be required to provide nationality documents (기본증명서, 가족관계증명서, 제적등본) to verify citizenship status.","⚠️ Dual citizens (holding both Korean and foreign citizenship) are NOT eligible to apply for a visa — a Korean passport must be issued instead.","If you previously held Korean nationality: complete the nationality renunciation (국적상실신고) process first.","  ▸ If renunciation was reported after 2008: submit 가족관계증명서 (상세) + 기본증명서 (상세), issued within 3 months.","  ▸ If reported before 2008: submit 제적등본 instead."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_e2_2_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "E-2-2 EPIK / TALK"], title: "E-2-2 — EPIK / TALK Teaching Assistant Visa", docs: ["Visa Application Form — print and fill out the attached form","Valid Canadian passport — original + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","1 passport-type colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Notice of Appointment — issued by EPIK or TALK program","Signed employment contract — signed by both the applicant and the academic institution"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $81 (Cash, Debit, Credit)" }], time: "Approx. 1–2 weeks. Single-entry visa valid for 90 days from date of issue. Stay up to 2 years (generally contract duration + 1 month).", notices: ["⚠️ E-2-2 is specifically for government-sponsored EPIK (English Program in Korea) and TALK (Teach and Learn in Korea) participants.","⚠️ Unlike E-2-1, this visa does NOT require a CVI from visa.go.kr — the Notice of Appointment replaces it.","Additional documents may be requested upon review.","⚠️ Dual citizens (holding both Korean and foreign citizenship) are NOT eligible to apply for a visa.","If you previously held Korean nationality: complete the nationality renunciation (국적상실신고) process first.","  ▸ If renunciation was reported after 2008: submit 가족관계증명서 (상세) + 기본증명서 (상세), issued within 3 months.","  ▸ If reported before 2008: submit 제적등본 instead."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_e1_e7_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "E-1 to E-7 (CVI)"], title: "E-1 to E-7 — Work Visas (CVI Holders)", docs: ["Visa Application Form for those with Visa Eligibility Certificate — print, fill out, and sign at the bottom","Valid Canadian passport — original + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: also submit photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Signed employment contract — signed by both the applicant and the inviting party"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $81 (Cash, Debit, Credit)" }], time: "Approx. 1–2 weeks. Single-entry visa valid for 90 days from issue (stay duration as indicated on Visa Issuance Certificate).", notices: ["📌 Visa types covered:","  ▸ E-1 — Professor: Teaching at universities or educational facilities under the Higher Education Act","  ▸ E-3 — Research: Research at Korean public or private institutions in natural science, high technology, social science, humanities, arts or sports","  ▸ E-4 — Technological Guidance: Special technology or expertise in natural sciences / high-technology not available in Korea","  ▸ E-5 — Profession: Professionals certified abroad in law, accounting, medicine, or other areas approved by Korean law","  ▸ E-6 — Culture and Arts: Music, art, literature, sports, entertainment, advertising, or fashion modelling for profit","  ▸ E-7 — Specially Designated Activities: Roles specially designated by the Minister of Justice","⚠️ Your Korean employer or sponsor must apply at visa.go.kr first to obtain the CVI (Confirmation of Visa Issuance) — you cannot initiate the process alone.","Additional documents may be requested upon review depending on visa type and occupation.","If you previously held Korean nationality: complete the nationality renunciation (국적상실신고) process first."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_h1_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "H-1 Working Holiday"], title: "H-1 — Working Holiday Visa", docs: ["Visa Application Form — print and fill out","Original passport + photocopy","  ▸ Must have remaining validity of at least 6 months","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Working Holiday Plan — specify travel schedule and activity plan with date and signature at the bottom","Resume (CV) — explaining work experience","Certificate from the most recent school attended — proof of highest academic qualifications or graduation","  ▸ Must be notarized by a lawyer or notary public if NOT within the Consulate's jurisdiction (Ontario, Manitoba)","RCMP Fingerprint Criminal Record Check — issued within 6 months","  ▸ Dual citizens: must also submit the other country's criminal record check with Apostille","  ▸ Lived in another country 1+ year within the past 5 years: must also submit that country's criminal record check with Apostille","Physical examination by a physician — issued within 3 months","  ▸ Must include: chest X-ray, urinalysis, blood test, and HIV test","Health / Medical Insurance — must remain valid throughout entire stay in Korea","  ▸ Minimum coverage: KRW 40,000,000","  ▸ Must cover return to home country AND medical treatment during stay","Bank statement with certified bank stamp — proving ability to cover travel expenses for at least the first 3 months","Round-trip flight schedule","Travel itinerary","  ▸ Do NOT purchase tickets until visa is approved"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $121.50 (Cash, Debit, Credit or Money Order)" }], time: "Approx. 1–2 weeks. Multiple-entry visa, valid up to 2 years.", notices: ["Eligibility: Canadian citizens aged 18–35 at the time of visa issuance, currently residing in Canada.","⚠️ You must NOT have previously participated in the Korea Working Holiday Program — only one participation allowed per lifetime.","⚠️ Dependent family members CANNOT accompany H-1 visa holders.","This program is primarily intended as a travel vacation — employment is only meant to supplement travel expenses.","Additional documents may be requested upon review.","⚠️ Dual citizens (holding both Korean and foreign citizenship) are NOT eligible — a Korean passport must be issued instead.","If you previously held Korean nationality: complete the nationality renunciation (국적상실신고) process first.","  ▸ If renunciation was reported after 2008: submit 가족관계증명서 (상세) + 기본증명서 (상세), issued within 3 months.","  ▸ If reported before 2008: submit 제적등본 instead."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f1d_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Work", "F-1-D Digital Nomad"], title: "F-1-D — Digital Nomad (Workation) Visa", docs: ["Visa Application Form — print and fill out","Original passport + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Employment letter — proves current employment and at least 1 year of employment history","  ▸ Must be issued within 2 weeks of application date","Salary / income proof (all 3 required):","  ▸ 3 months' pay stubs","  ▸ 3 months' bank balance statement","  ▸ 2 years' tax report (Notice of Assessment / NOA)","Apostilled RCMP Certificate — fingerprint-based, issued within 3 months","Medical insurance proof (including coverage details):","  ▸ Must cover approx. CAD $130,000 for medical treatment AND return flight to home country during stay","Family Relationship Certificate — only required if applying for accompanying family members","  ▸ Each family member requires their own original passport and application form","  ▸ Documents not in Korean or English must include a notarized English translation"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $121.50 (Cash, Debit, Credit)" }], time: "Approx. 1–2 weeks. Multiple-entry visa, valid up to 1 year from date of issue.", notices: ["Eligibility: employed by a foreign (non-Korean) company for 1+ year, or owner of a foreign-registered company — must be able to work remotely in Korea.","Income requirement (2024 GNI standard): must earn approx. KRW 99,900,000/year or KRW 8,325,000/month BEFORE tax deduction.","  ▸ Based on 2× Korea's GNI per capita — this figure updates annually. Verify the current standard before applying.","⚠️ Must have NO criminal record.","⚠️ You may NOT be employed by or receive income from a Korean company or entity while on this visa.","Stay: up to 1 year from date of issue, extendable by 1 additional year (max 2 years total).","For stays over 90 days: register with the local Korean immigration office (hikorea.go.kr) within 90 days of arrival.","Dependents (spouse and minor children) may accompany you — each requires a separate application.","If you previously held Korean nationality: complete the nationality renunciation (국적상실신고) process first.","  ▸ Submit 가족관계증명서 (상세) + 기본증명서 (상세) issued within 3 months (or 제적등본 if renunciation was before 2008)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_study_en: { type: "question", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Study"], question: "What type of study program are you enrolling in?", sub: "All study visas below are single-entry, valid for 3 months from the date of issuance. Select the one that matches your program.", options: [{ id: "visa_d2_6_en", icon: "🔄", title: "D-2-6 — Exchange Student", desc: "University exchange program — at least 1 semester completed at current Canadian school required" },{ id: "visa_d2_8_en", icon: "🎓", title: "D-2-8 — Short-Term University Study", desc: "Less than 1 year including summer/winter school — NOT for Korean language programs" },{ id: "visa_d4_1_en", icon: "🇰🇷", title: "D-4-1 — Korean Language Study", desc: "Study Korean at a university-affiliated language institute — high school diploma minimum" },{ id: "visa_d4_3_en", icon: "🏫", title: "D-4-3 — Elementary / Secondary School", desc: "Study at a Korean elementary, middle, or high school" }] },
  visa_d2_6_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Study", "D-2-6 Exchange Student"], title: "D-2-6 — Exchange Student Visa", docs: ["Visa Application Form — print and fill out","Valid Canadian passport — original + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Certificate of Admission (표준입학허가서) — issued by the dean or president of the Korean university","  ▸ Must include the student's scholastic information and financial status","Business Registration Certificate of the Korean institution (사업자등록증)","Documents proving exchange student status:","  ▸ Official documents from the host university","  ▸ Exchange student agreement between universities","Proof of at least one semester completed at current Canadian school:","  ▸ Official proof of enrollment letter (NOT a tuition receipt or screenshot)","Proof of financial ability (1 year tuition + living expenses):","  ▸ Certified bank statement with official bank stamp","  ▸ If using a parent's account: signed written permission from parent + Certified Copy of Birth Registration or Statement of Live Birth"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $81 (Cash, Debit, Credit or Money Order)" }], time: "Approx. 1–2 weeks. Single-entry, valid 3 months from issuance. Stay up to 1 year (per Certificate of Admission).", notices: ["⚠️ Applicants from certain countries currently in Canada (temporary workers, international students, etc.) must have resided continuously in Canada for at least 2 years (730 days) before applying.","Korean-descent or former Korean nationals must also submit:","  ▸ Korean-descent (parents received Canadian citizenship before your birth): photocopy of both parents' passport + Canadian Citizenship Certificate (not a card)","  ▸ Renunciation after 2008: 기본증명서 (상세, 전부공개) + 가족관계증명서 (상세, 전부공개) — within 3 months. Submit both pages if document has 2 pages.","  ▸ Renunciation before 2008: 제적등본 — within 3 months","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d2_8_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Study", "D-2-8 Short-Term University Study"], title: "D-2-8 — Short-Term University Study Visa (under 1 year)", docs: ["Visa Application Form — print and fill out","  ▸ Address in Korea (section 8.4): use the NEW ADDRESS SYSTEM","Valid Canadian passport — original + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Certificate of Admission (표준입학허가서) — issued by the dean or president of the Korean university","  ▸ Must include the student's scholastic information and financial status","Business Registration Certificate of the Korean institution (사업자등록증)","Proof of enrollment from current Canadian university or college:","  ▸ Must be an official letter — NOT a tuition payment confirmation or course page screenshot","Proof of financial ability (tuition + living expenses for the stay):","  ▸ Certified bank statement with official bank stamp","  ▸ If using a parent's account: signed written permission from parent + original and copy of Certified Copy of Birth Registration or Statement of Live Birth"], costs: [{ label: "Program under 90 days", value: "CAD $54 (Cash, Debit, Credit)" },{ label: "Program 90 days or more", value: "CAD $81 (Cash, Debit, Credit)" }], time: "Approx. 2 weeks. Single-entry, valid 3 months from issuance. Stay up to 1 year (per Certificate of Admission).", notices: ["⚠️ If your program is to study the Korean language, apply for D-4-1 instead — NOT this visa.","⚠️ D-2-8 holders are NOT permitted to engage in any paid activities (part-time work, etc.) — violations are penalised under Articles 94 or 95 of the Immigration Law.","⚠️ Applicants from certain countries currently in Canada must have resided continuously in Canada for at least 2 years (730 days) before applying.","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d4_1_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Study", "D-4-1 Korean Language"], title: "D-4-1 — Korean Language Study Visa", docs: ["Visa Application Form — print and fill out","Valid Canadian passport — original + photocopy of photo/info page","  ▸ Must have remaining validity of at least 6 months","  ▸ Non-Canadians: photocopy of PR Card or valid Canadian Work/Study Permit","1 colour photo (3.5×4.5cm, white background, within 6 months, date-stamped on back)","Certificate of Admission — issued by the dean or president of the language institute","  ▸ Must include the student's scholastic information and financial status","Business Registration Certificate of the institution (사업자등록증)","Training Plan — lecture schedule, lecturer profiles, training facility details, etc.","Certificate of enrollment or proof of highest level of education:","  ▸ Non-OECD country applicants: must submit documents notarized by Apostille, or confirmed by a Korean consul or the country's consul in Korea","Proof of financial ability (1 year tuition + living expenses):","  ▸ If using a parent's account: signed written permission from parent + Certified Copy of Birth Registration or Statement of Live Birth"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $81 (Cash, Debit, Credit or Money Order)" }], time: "Approx. 1–2 weeks. Single-entry, valid 3 months from issuance. Stay up to 1 year (per Certificate of Admission).", notices: ["Eligibility: must hold at least a high school diploma or equivalent.","Program must be at a language institution affiliated with a foreign educational institution in Korea, or at a higher education institution under the Higher Education Act.","⚠️ Applicants from certain countries currently in Canada must have resided continuously in Canada for at least 2 years (730 days) before applying.","Korean-descent or former Korean nationals must also submit:","  ▸ Korean-descent (parents received Canadian citizenship before your birth): photocopy of both parents' passport + Canadian Citizenship Certificate (not a card)","  ▸ Renunciation after 2008: 기본증명서 (상세, 전부공개) + 가족관계증명서 (상세, 전부공개) — within 3 months. Submit both pages if document has 2 pages.","  ▸ Renunciation before 2008: 제적등본 — within 3 months","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d4_3_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Study", "D-4-3 Elementary / Secondary School"], title: "D-4-3 — Elementary / Secondary School Visa", docs: ["Visa Application Form + Guardianship Form — print and fill out both","Valid Canadian passport — original + photocopy","  ▸ Must have remaining validity of at least 6 months","  ▸ Dual citizens: present both passports if available","Proof of residency in Canada — original + photocopy","  ▸ Valid PR Card, Work Permit, or Study Permit","1 passport-type colour photo — must be taken at a professional passport photo studio","  ▸ 3.5×4.5cm, white background, within 6 months, date-stamped on back","Acceptance Letter (학교장 발행 입학허가서) — issued by the principal of the Korean school","  ▸ Official form with the principal's stamp as provided by the school","Business Registration Certificate of the institution (사업자등록증)","Proof of highest educational attainment — graduation certificate or proof of current enrollment","Receipt for tuition payment (학비 납부 영수증):","  ▸ All related expenses: tuition, dormitory, entrance fee","  ▸ Full scholarship recipients: submit scholarship documentation instead","Family relationship documents — government-issued birth certificate","  ▸ If not in English: must be translated to English and notarized by a lawyer","Bank statement — most recent 3 months (applicant's name must be clearly visible)"], costs: [{ label: "Visa Fee (Canadians)", value: "CAD $81 (Cash, Debit, Credit)" },{ label: "Other nationalities", value: "Fee varies by nationality" }], time: "Approx. 1–2 weeks. Single-entry, valid 3 months from issuance. Stay up to 1 year (per Certificate of Admission).", notices: ["⚠️ This visa is generally NOT available for students planning to study at mandatory (tuition-free) schools under Articles 10-2 and 12 of the Elementary and Secondary Education Act.","Eligible schools: elementary, middle, or high school under the Elementary and Secondary Education Act; or foreign educational institutions under the Special Act on Establishment and Management of Foreign Educational Institutions in Free Economic Zones and Jeju International City.","Korean-ancestry applicants: verification documents for dual citizenship are required — specific documents vary by individual situation.","Additional documents may be requested upon review."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_others_en: { type: "result", service: "visa", breadcrumb: ["Home", "Visa", "No Korean Heritage", "Others"], title: "A-2-4 — Official / Diplomatic Duty Visa", docs: ["Visa Application Form — print and fill out","Original + photocopy of Diplomatic, Official, or Special passport","1 colour photo (3.5×4.5cm, within 6 months)","Document demonstrating current employment status","Documents proving state of dispatch or employment, OR a public letter by the Foreign Minister or Minister of the applicant's country","  ▸ The public letter must be able to prove one's status of official duty"], costs: [{ label: "Visa Fee", value: "Contact the Consulate — fee varies" }], time: "Additional documents may be requested if deemed necessary for visa evaluation.", notices: ["Eligibility: those executing official duties of a foreign government or international organization.","  ▸ e.g. CBSA officer with official or diplomatic passport accompanying a Korean national to Korea","  ▸ e.g. Government official with official or diplomatic passport attending a conference or event in Korea","Single-entry visa valid for 3 months from issuance — must enter Korea within 3 months.","Period of stay: up to 90 days."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },

  visa_f4_former_sex: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "전 한국 국적자"], question: "신청자의 성별과 나이는?", sub: "만 41세 미만 남성은 병역 관련 추가 서류가 필요합니다.", options: [{ id: "visa_f4_former_female", icon: "👩", title: "여성 또는 만 41세 이상 남성", desc: "병역 관련 추가 서류 불필요" },{ id: "visa_f4_former_male41", icon: "👨", title: "만 41세 미만 남성", desc: "병역 관련 추가 서류 필요 (RCMP 범죄경력증명서 등)" }] },
  visa_f4_former_female: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "전 한국 국적자", "여성/41세 이상"], title: "재외동포 비자 (F-4) — 전 한국 국적자", docs: ["사증발급신청서 1부 (비자포털 양식 출력, 사진 부착)","캐나다 여권 원본 + 사본 (유효기간 6개월 이상)","캐나다 시민권증서 원본 + 사본 — 앞뒷면 모두 복사","본인 명의 기본증명서 (상세, 주민번호 전부공개) — 3개월 이내 발급","본인 명의 가족관계증명서 (상세) — 3개월 이내 발급","여권용 사진 1매 (6개월 이내 촬영, 3.5×4.5cm, 흰 배경)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["국적상실 신고가 기본증명서에 표기되어 있어야 합니다.","비자 유효기간: 발급일로부터 최대 5년, 1회 입국 시 최대 2년 체류 가능.","우편 접수 가능 (캐나다 달러 공인 수표 동봉 — 개인 수표 불가)."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_former_male41: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "전 한국 국적자", "41세 미만 남성"], title: "재외동포 비자 (F-4) — 전 한국 국적자 (만 41세 미만 남성)", docs: ["사증발급신청서 1부 (비자포털 양식 출력, 사진 부착)","캐나다 여권 원본 + 사본","캐나다 시민권증서 원본 + 사본","본인 명의 기본증명서 (상세) — 3개월 이내","본인 명의 가족관계증명서 (상세) — 3개월 이내","여권용 사진 1매","부모 명의 기본증명서 + 가족관계증명서 (상세) 각 1부 — 3개월 이내","RCMP 캐나다 연방경찰 범죄경력증명서 원본 — 6개월 이내 (지문 기반)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["RCMP 범죄경력증명서는 반드시 지문(fingerprint) 기반으로 발급받아야 합니다.","부모 중 돌아가신 분이 있는 경우 사망증명서로 대체 가능.","비자 유효기간: 발급일로부터 최대 5년."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_child: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "한국계 2세"], question: "신청자의 성별과 나이는?", sub: "만 18~59세 남성은 RCMP 범죄경력증명서가 추가로 필요합니다.", options: [{ id: "visa_f4_child_general", icon: "👩", title: "여성 / 만 18세 미만 / 만 60세 이상", desc: "RCMP 범죄경력증명서 불필요" },{ id: "visa_f4_child_male", icon: "👨", title: "만 18~59세 남성", desc: "RCMP 범죄경력증명서 필요" }] },
  visa_f4_child_general: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "한국계 2세", "일반"], title: "재외동포 비자 (F-4) — 한국계 2세", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","캐나다 시민권증서 원본 + 사본","한국 혈통 부 또는 모의 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","본인 출생증명서 (Certified copy of birth registration) 원본 + 사본","여권용 사진 1매"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["한국어 능력 입증서류 미제출 시 최대 체류 1년, 제출 시 최대 2년.","비자 유효기간: 발급일로부터 최대 5년."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_child_male: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "재외동포(F-4)", "한국계 2세", "18~59세 남성"], title: "재외동포 비자 (F-4) — 한국계 2세 (만 18~59세 남성)", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","캐나다 시민권증서 원본 + 사본","한국 혈통 부 또는 모의 기본증명서 (상세) + 가족관계증명서 (상세) — 3개월 이내","본인 출생증명서 (Certified copy of birth registration) 원본 + 사본","여권용 사진 1매","RCMP 캐나다 연방경찰 범죄경력증명서 원본 — 6개월 이내 (지문 기반)"], costs: [{ label: "수수료", value: "CAD $117 (현금 또는 직불카드)" }], time: "약 7~10 영업일", notices: ["RCMP 범죄경력증명서는 반드시 지문(fingerprint) 기반.","비자 유효기간: 발급일로부터 최대 5년."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_f4_family: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "동반(F-3)"], question: "가족 중 누가 F-4 재외동포 비자를 소지하고 있나요?", sub: "F-4 소지자의 배우자 또는 만 18세 이하 미성년 자녀가 F-3 동반비자를 신청할 수 있습니다.", options: [{ id: "visa_f3_spouse_en", icon: "💑", title: "배우자 (F-4 소지자의 배우자)", desc: "최대 1년 체류 가능" },{ id: "visa_f3_child_en", icon: "👶", title: "미성년 자녀 (만 18세 이하)", desc: "최대 1년 체류 가능" }] },
  visa_f3_spouse: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "동반(F-3)", "배우자"], title: "동반 비자 (F-3) — F-4 소지자의 배우자", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","유효한 F-4 비자 소지자의 비자 사본 또는 국내거소신고증 앞뒷면 사본","혼인관계증명서 (상세) — 3개월 이내","F-4 소지자 및 배우자의 가족관계증명서 (상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $81 (현금, Debit, 신용카드) / 우편: Certified Cheque $81" }], time: "약 1~2주", notices: ["체류기간: 최대 1년 (F-4 소지자의 비자 유효기간 이내).","혼인증명서: 캐나다에서만 혼인신고한 경우 Certified Copy of Marriage Registration 또는 Certified Copy of Marriage License (Legal 사이즈) 필수 — Certificate of Marriage 약식 불가.","⚠️ 비자 유효기간: 발급일로부터 3개월 이내 입국 필수 — 미입국 시 비자 무효.","우편 신청 가능 — Prepaid Xpresspost 반송봉투 동봉 필수."], booking: "https://www.torbooking.com/book" },
  visa_f3_child: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "동반(F-3)", "미성년 자녀"], title: "동반 비자 (F-3) — F-4 소지자의 미성년 자녀 (만 18세 이하)", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","유효한 F-4 비자 소지자(부모)의 비자 사본","자녀 출생증명서 (Certified copy of birth registration) 원본 + 사본","부모의 가족관계증명서 또는 혼인관계증명서 (상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $81 (현금, Debit, 신용카드) / 우편: Certified Cheque $81" }], time: "약 1~2주", notices: ["미성년 자녀는 만 18세 이하 (0~18세)로 규정됩니다.","체류기간: 최대 1년.","⚠️ 비자 유효기간: 발급일로부터 3개월 이내 입국 필수.","우편 신청 가능 — Prepaid Xpresspost 반송봉투 동봉 필수."], booking: "https://www.torbooking.com/book" },
  visa_c3_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)"], question: "방문 목적은 무엇인가요?", sub: "캐나다 국적자는 한국 무비자 입국 가능 (최대 6개월). 비자가 필요한 경우만 신청하세요.", options: [{ id: "visa_c3_family", icon: "👨‍👩‍👧", title: "한국 국민의 가족 방문", desc: "배우자·자녀가 한국 국민인 경우" },{ id: "visa_c3_emergency", icon: "🚨", title: "긴급 인도적 사유", desc: "장례식·임종·긴급 수술 참석 등" },{ id: "visa_c3_other", icon: "📋", title: "기타 단기 방문", desc: "결혼식 참석, 입양 등 기타 사유" }] },
  visa_c3_family: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)", "가족 방문"], title: "단기방문 비자 (C-3-1) — 한국 국민 가족", docs: ["사증발급신청서 1부 (비자포털 양식, SIN 번호 기재)","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","한국 국민 가족관계 증명서류","재외동포인 경우: 국적상실·이탈 명시된 기본증명서(상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $52 (현금, Debit, 신용카드)" }], time: "약 12~15 영업일", notices: ["국적상실 신고가 완료되지 않은 경우 비자 신청 불가.","C 계열 비자로 입국 후 다른 비자(F-4, F-6 등)로 전환 불가."], booking: "https://www.torbooking.com/book" },
  visa_c3_emergency: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)", "긴급 인도적 사유"], title: "단기방문 비자 (C-3-1) — 긴급 인도적 사유", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","가족관계 증명서류","긴급성 소명자료 — 장례: 사망진단서, 임종: 의사 소견서, 수술: 수술 예정 증빙서류","재외동포인 경우: 국적상실 명시 기본증명서(상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $52 (현금, Debit, 신용카드)" }], time: "긴급: 5~7 영업일 이내", notices: ["장례식 목적 긴급 입국: 비자과 전화(416-920-3809 ext. 221) 문의.","C 계열 비자로 입국 후 다른 비자로 전환 불가."], booking: "https://www.torbooking.com/book" },
  visa_c3_other: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "단기방문(C-3-1)", "기타"], title: "단기방문 비자 (C-3-1) — 기타 사유", docs: ["사증발급신청서 1부","캐나다 여권 원본 + 사본","체류자격 증빙서류 (캐나다 국적자가 아닌 경우)","여권용 사진 1매","방문 목적 증빙서류","재외동포인 경우: 국적상실 명시 기본증명서(상세) — 3개월 이내"], costs: [{ label: "수수료", value: "CAD $52 (현금, Debit, 신용카드)" }], time: "약 12~15 영업일", notices: ["캐나다 국적자는 한국 무비자 입국 가능(최대 6개월) — 비자 필요 여부 먼저 확인하세요.","C 계열 비자로 입국 후 다른 비자(F-4, F-6 등)로 전환 불가."], booking: "https://www.torbooking.com/book" },
  visa_other_start: { type: "question", service: "visa", breadcrumb: ["홈", "비자", "취업·유학·기타"], question: "방문 목적은 무엇인가요?", sub: "해당 비자 종류를 선택하세요.", options: [{ id: "visa_e2", icon: "📚", title: "E-2 — 원어민 영어 교사", desc: "한국 학교·학원 영어 강사" },{ id: "visa_e7", icon: "💼", title: "E-7 — 특정 활동 (취업)", desc: "회사 초청 취업 비자" },{ id: "visa_f1d", icon: "💻", title: "F-1-D — 디지털 노마드 (워케이션)", desc: "외국 회사 재직 중 한국에서 원격근무 — 최대 1년" },{ id: "visa_d2", icon: "🎓", title: "D-2 — 유학 (대학)", desc: "한국 대학교 유학" },{ id: "visa_d4", icon: "🏫", title: "D-4 — 어학연수", desc: "한국어 어학원·직업훈련 등" },{ id: "visa_other_portal", icon: "🌐", title: "그 외 모든 비자", desc: "C-3-4 출장, F-6 결혼이민 등" }] },
  visa_f1d: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "취업·유학·기타", "F-1-D 디지털노마드"], title: "F-1-D — 디지털 노마드 비자 (워케이션)", docs: ["비자신청서 (visa.go.kr 출력, 사진 부착)","유효한 여권 원본 + 사본","여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)","재직증명서 또는 고용계약서 (1년 이상 재직 확인)","소득 증빙서류 (세후 연 약 CAD $110,000 이상 — 최신 세금신고서·급여명세서 등)","의료·여행보험 증명서 (의료비 최소 CAD $130,000 + 본국 송환 항공권 포함, 체류 전 기간 유효)","  ▸ 동반 가족: 가족 각각 별도 보험 가입 필요","  ▸ 동반 가족 서류: 여권 + 가족관계 증명서류 (혼인증명서/출생증명서)"], costs: [{ label: "수수료", value: "CAD $117 (현금, Debit, 신용카드)" }], time: "약 7~14 영업일", notices: ["대상: 외국 회사에 1년 이상 재직 중인 원격근무자 (자영업자 포함).","⚠️ 한국 기업 취업 또는 한국 내 영리활동 불가.","체류: 비자 발급일로부터 최대 1년, 1회 연장 가능 (최대 2년).","90일 이상 체류 시 입국일로부터 90일 이내 출입국사무소 외국인 등록 필요.","이전에 한국 국적을 보유했던 분: 신청 전 국적상실신고 완료 필수."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
  visa_d4: { type: "result", service: "visa", breadcrumb: ["홈", "비자", "취업·유학·기타", "D-4 어학연수"], title: "D-4 — 어학연수 비자", docs: ["비자신청서 (visa.go.kr 출력, 사진 부착)","유효한 여권 원본 + 사본","여권용 사진 1매","입학허가서 또는 수강등록증 (한국 어학원·직업훈련기관 발급)","재정능력 증빙 (최근 30일 이내 은행 잔고증명서)","최종 학력 증명서"], costs: [{ label: "수수료", value: "CAD $117 (현금, Debit, 신용카드)" }], time: "약 7~10 영업일", notices: ["D-4는 어학원·어학연수·직업훈련 목적 비자입니다. 정규 대학 학위 과정은 D-2 비자를 이용하세요.","캐나다 시민권자는 6개월 이내 무비자 입국 가능 — 6개월 미만 과정이라면 비자 불필요 (기관에 사전 확인 권장).","D-4 비자로는 아르바이트 등 취업 불가.","90일 이상 체류 시 외국인 등록 필요."], booking: "https://www.torbooking.com/book", onlineLink: "https://www.visa.go.kr" },
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
    question: "어떤 서류의 공증·인증이 필요하신가요?",
    sub: "찾으시는 서류 이름으로 골라보세요. ⚠️ 영사관 공증은 모든 서명을 반드시 영사 앞에서 직접 해야 하며, 사전 서명·대리 신청은 불가합니다.",
    footer: [
      "💡 헷갈리기 쉬운 두 가지를 먼저 구분하세요:",
      "  ▸ 아포스티유 = 문서가 진짜임을 보증하는 국제 인증 (번역 아님). 발행 국가에서 받습니다.",
      "  ▸ 번역 공증 = 한국어 문서를 영문으로 옮긴 번역본을 영사관이 확인. 진위 보증은 아닙니다.",
      "  ▸ 제출처가 둘 다 요구하기도 하니, '아포스티유가 필요한지 / 번역만 되면 되는지'를 제출 기관에 먼저 확인하세요.",
    ],
    options: [
      { id: "notarization_canada_doc", icon: "🍁", title: "캐나다에서 발행된 문서를 한국에 제출", desc: "【캐나다 → 한국】 출생·혼인·사망·RCMP 범죄경력·대학/College·고용계약서 등 → 아포스티유 안내" },
      { id: "notarization_korea_doc", icon: "📤", title: "한국에서 발행된 문서를 해외에 제출", desc: "【한국 → 해외】 가족관계·기본·주민등록·범죄경력·연금 등 → 온라인 아포스티유(apostille.go.kr) 안내" },
      { id: "notarization_translation", icon: "🌐", title: "한국 증명서를 영문으로 번역", desc: "가족관계·기본·혼인·출생·졸업증명서 등 영문 번역 인증" },
      { id: "notarization_translation_license_start", icon: "🚗", title: "운전면허 (영문번역·운전경력·면허교환)", desc: "한국 면허 영문번역 인증서·영문 운전경력증명서·한↔온타리오 면허 교환 안내" },
      { id: "notarization_saseo", icon: "✍️", title: "직접 작성한 서류의 서명 인증", desc: "위임장·상속포기서·거주확인서·재직·진술서 등" },
      { id: "notarization_ingam", icon: "🔏", title: "인감 관련", desc: "인감증명서 발급 위임장·인감신고·변경신고" },
      { id: "notarization_school", icon: "🏫", title: "초·중·고 학적서류", desc: "졸업·재학·성적증명서 (대학·College는 맨 위 항목으로)" },
    ],
  },

  // ── 캐나다 발행 문서 → 아포스티유 안내 ──
  notarization_canada_doc: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "캐나다 발행 문서"],
    title: "캐나다에서 발행된 문서를 한국에 제출 — 아포스티유로 진행하세요",
    sub: "2024년 1월 11일 캐나다가 아포스티유 협약에 가입함에 따라, 캐나다 발행 문서는 더 이상 영사확인 대상이 아닙니다.",
    docs: [
      "📌 영사관 방문이 필요 없습니다 — 아래 발급처에서 아포스티유 확인을 받아 한국에 제출하세요.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【1단계 — 문서 종류 확인】",
      "정부(주·연방) 발행 문서 → 바로 아포스티유",
      "  ▸ 출생·혼인·이혼·사망증명서, RCMP 범죄경력증명서 등",
      "개인이 작성한 사문서·학교/기업 서류 → 먼저 캐나다 공증인(변호사) 공증 후 아포스티유",
      "  ▸ 위임장·계약서·대학/College 성적·재학·졸업증명서, 고용계약서 등",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【2단계 — 발급처에서 아포스티유 받기】",
      "연방정부 발행 / 마니토바 발행·공증 문서 → Global Affairs Canada (오타와)",
      "  ▸ 125 Sussex Drive, Ottawa, ON K1A 0G2 · 1-833-928-1551 · docs@international.gc.ca",
      "온타리오 발행·공증 문서 → ServiceOntario (Official Documents Services)",
      "  ▸ 777 Bay Street, Lower Level, Toronto, ON M7A 2J8 · 416-325-8416",
      "  ▸ 오타와·윈저·Sault Ste. Marie·Thunder Bay ServiceOntario 지점에서도 접수 가능",
    ],
    costs: [{ label: "영사관 수수료", value: "해당 없음 (영사관 업무 아님)" }],
    time: "발급처 안내에 따름",
    notices: [
      "⚠️ 캐나다 시민권자의 서명인증서·거주증명서·동일인증명서 등도 캐나다 공증인 공증 후 아포스티유로 진행 (영사확인 불가).",
      "단, 위임장·상속재산분할협의서·상속포기서는 본인이 직접 영사관 방문 시 공증인 공증 없이 영사 인증도 가능합니다 (직접 작성 서류 메뉴 참조).",
      "한국 내 제출 기관(법원·등기소 등)이 캐나다 공증인 공증을 별도로 요구하는 경우가 있으니 제출처에 먼저 확인하세요.",
      "한국에서 발행된 문서를 캐나다 등에 제출하려는 경우는 apostille.go.kr에서 온라인 발급(공동인증서 필요).",
    ],
    onlineLink: "https://www.international.gc.ca/gac-amc/authentication-authentification/index.aspx",
  },

  // ── 한국 발행 문서 → 해외 제출(온라인 아포스티유) ──
  notarization_korea_doc: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "한국 발행 문서 해외 제출"],
    title: "한국에서 발행된 문서를 해외에 제출 — 온라인 아포스티유",
    sub: "한국 정부·기관이 발행한 공문서를 캐나다 등 아포스티유 협약국에 제출할 때는 영사관이 아니라 한국에서 온라인으로 아포스티유를 발급받습니다.",
    docs: [
      "📌 영사관 방문이 필요 없습니다 — 아래 한국 사이트에서 본인이 직접 온라인 발급받으세요.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【발급 사이트】",
      "대한민국 아포스티유: apostille.go.kr",
      "재외동포 365민원포털: g4k.go.kr",
      "  ▸ 본인인증(공동인증서) 필요 → 발급기관·문서종류·문서발급번호·발급일자 입력",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【온라인 아포스티유 가능 문서 (총 42종, 발급기관별)】",
      "대법원: 가족관계·기본·혼인관계·입양·친양자입양 증명서, 제적등본/초본, 영문증명서 (무인발급기 발급분 제외)",
      "행정안전부: 주민등록표 등본·초본 (정부24 발급분만)",
      "외교부: 여권발급기록·여권실효확인서·여권발급신청서류·여권증명서",
      "교육부: 졸업·재학증명서, 검정고시 성적·합격증명서, 중·고 성적증명서 (수기 발급분 제외)",
      "병무청: 병적증명서",
      "국세청: 사업자등록·납세·소득금액·부가가치세 증명 등",
      "경찰청: 범죄·수사경력·운전경력 회보서 ('19.10.28 이후 발급된 외국 입국/체류용만)",
      "국민연금공단: 가입증명·수급(지급내역)증명·연금산정용 가입내역 확인서 (정부24 발급분 제외)",
      "질병관리청: 예방접종증명서 / 산업인력공단: 국가기술자격취득사항확인서 / 해양경찰청: 수상구조사·조종면허 (정부24 발급분만)",
    ],
    costs: [{ label: "영사관 수수료", value: "해당 없음 (영사관 업무 아님)" }],
    time: "온라인 즉시 발급 (사이트 안내에 따름)",
    notices: [
      "⚠️ 이 안내는 한국 발행 문서를 '해외에 제출'하는 경우입니다 — 캐나다 발행 문서를 한국에 내는 경우는 첫 화면의 '캐나다 발행 문서' 메뉴를 이용하세요.",
      "영문 번역본도 필요하면 '한국 증명서를 영문으로 번역' 메뉴를 함께 이용하세요 (아포스티유와 번역은 별개 절차이며, 제출처가 둘 다 요구하기도 합니다).",
      "공동인증서가 없어 온라인 발급이 어려운 경우: 한국 내 대리인을 통해 발급 가능 (아포스티유 신청서 + 대상문서 + 대리인·신청인 신분증 사본 + 전자수입인지 1건당 1,000원).",
      "한국 아포스티유 발급기관은 재외동포청 또는 법무부입니다 — 재외동포청 (02) 6399-7100~7101 / 법무부 (02) 6399-7110.",
      "문서 종류별 발급 제한(무인발급기·정부24·수기 발급분 등)이 있으니 위 목록의 비고를 확인하세요.",
    ],
    onlineLink: "https://www.apostille.go.kr",
  },

  // ── 사문서 인증(사서증서) 분기 ──
  notarization_saseo: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증"],
    question: "어떤 종류의 서류인가요?",
    sub: "사문서 인증(사서증서 인증)은 개인이 작성한 서류의 서명·날인이 본인 의사에 의한 것임을 영사가 확인해 주는 업무입니다. 서류 내용의 진위를 확인하는 것은 아닙니다. 어느 메뉴인지 모르겠으면 아래 예시 서류명으로 골라보세요.",
    options: [
      { id: "notarization_pow", icon: "📜", title: "위임장", desc: "부동산 매매·등기·은행·상속·증명서 발급 등 한국 업무 대리 위임" },
      { id: "notarization_legal_act", icon: "⚖️", title: "법률행위 증서 (상속·계약·대출 등)", desc: "상속재산분할협의서·상속포기서·매매계약서·은행대출약정서 등" },
      { id: "notarization_sign", icon: "✍️", title: "사실행위 증서 (서명·거주·재직 등)", desc: "서명인증서·동일인증명서·거주증명서·재직증명서 등" },
    ],
  },

  // ── 위임장 (성인/미성년 분기) ──
  notarization_pow: {
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "위임장"],
    question: "위임자(신청인)의 연령은?",
    sub: "만 19세 미만 미성년자는 본인과 법정대리인이 함께 방문하고 법정대리인 동의서가 필요합니다.",
    options: [
      { id: "notarization_pow_adult", icon: "👤", title: "만 19세 이상 (성인)", desc: "본인 직접 방문" },
      { id: "notarization_pow_minor", icon: "👶", title: "만 19세 미만 (미성년자)", desc: "본인 + 법정대리인 함께 방문 필수" },
    ],
  },

  notarization_pow_adult: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "위임장", "성인"],
    title: "위임장 공증 (사문서 인증) — 성인",
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
      "✅ 캐나다 시민권자도 위임장·상속재산분할협의서·상속포기서는 본인이 직접 방문 시 캐나다 공증인 공증 없이 영사 인증이 가능합니다 (영주권자와 동일, 2008.6.1 시행).",
      "  ▸ 단, 한국 여권이 없는 시민권자는 신분 확인을 위해 방문 전 전화 문의 권장 (416-920-3809).",
      "  ▸ 한국 제출처(법원 등)가 캐나다 공증인 공증을 요구하는 경우도 있으니 제출 기관에 먼저 확인하세요.",
      "동일 위임장에 여러 명이 서명하는 경우 각 서명마다 수수료 발생.",
      "인감증명서 발급 위임장은 별도 메뉴(인감 관련 공증)를 이용하세요.",
      "한국 부동산 등기 목적: 캐나다 공증인(Notary Public) + 아포스티유로 대체 가능한 경우도 있으니 제출 기관에 먼저 확인하세요.",
      "법인 신청 시: 법인 대표자가 직접 방문 — 법인등기부등본 + 사업자등록증 지참 필수.",
      "해외 거주사실 증명이 필요한 경우: 재외국민등록 후 재외국민등록부등본으로 대체 가능 (별도 메뉴 참조).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 위임장) →",
  },

  notarization_pow_minor: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "위임장", "미성년자"],
    title: "위임장 공증 (사문서 인증) — 만 19세 미만 미성년자",
    docs: [
      "위임장 — 미성년자 본인과 법정대리인(부 또는 모/법정후견인)이 함께 방문, 영사 앞에서 자필 작성 (서명란 공백)",
      "  ▸ 피위임자 성명·주민등록번호·주소·연락처·위임 목적·발급 통수 기재 필수",
      "공증촉탁서 (소정 양식 — 자필 작성 필수)",
      "미성년자 당사자의 한국 여권 원본",
      "미성년자 당사자의 캐나다 체류비자 원본 또는 유효한 PR Card 원본",
      "미성년자 당사자의 기본증명서 + 가족관계증명서 — 3개월 이내 발급",
      "법정대리인 동의서 (여권 외 업무용 양식 — 부모 작성·서명)",
      "  ▸ '동의 구분'란에 \"위 미성년 자녀의 위임장 등 공증 촉탁에 대해 동의합니다\" 기재",
      "  ▸ 법정대리인 정보는 부·모 모두 작성 후 대표 1인 서명",
      "법정대리인의 유효한 여권 원본",
    ],
    costs: [
      { label: "위임장 1부당", value: "CAD $2.70 (현금, Debit, 신용카드)" },
      { label: "여권정보증명서 (해당자)", value: "CAD $1.00 추가" },
    ],
    time: "방문 당일 즉시 발급",
    notices: [
      "⚠️ 미성년자 본인과 법정대리인이 반드시 함께 직접 방문 — 둘 중 한 명만 방문 불가.",
      "⚠️ 서명은 반드시 영사 앞에서 — 사전 서명·대리 서명 불가.",
      "법정대리인 동의서 양식은 영사관 홈페이지에서 다운로드(여권 외 업무 시 법정대리인 동의서).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 위임장) →",
  },

  // ── 법률행위 증서 ──
  notarization_legal_act: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "법률행위 증서"],
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
    type: "question",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "사실행위 증서"],
    question: "신청인의 신분은?",
    sub: "서명인증서·거주증명서·동일인증명서 등은 신청인 신분에 따라 처리 방법이 다릅니다. (2024.1.11 캐나다 아포스티유 시행)",
    options: [
      { id: "notarization_sign_passport", icon: "🇰🇷", title: "한국 여권 소지자 (한국 국적자)", desc: "영사관에서 서명 인증 가능" },
      { id: "notarization_sign_citizen", icon: "🍁", title: "캐나다 시민권자", desc: "영사확인 불가 → 캐나다 공증인 + 아포스티유" },
    ],
  },

  notarization_sign_passport: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "사실행위 증서", "한국 여권 소지자"],
    title: "사실행위 증서 공증 — 서명인증서·동일인증명서·거주증명서 등 (한국 여권 소지자)",
    docs: [
      "공증받을 서류 — 서명란 공백으로 준비 (영사 앞에서 서명)",
      "  ▸ 서명인증서 (Signature Certificate)",
      "  ▸ 동일인증명서 (Identity Certificate — 이름이 다를 때)",
      "  ▸ 거주증명서 (거주사실확인서)",
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
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (공증 → 사실행위 증서) →",
  },

  notarization_sign_citizen: {
    type: "result",
    service: "notarization",
    breadcrumb: ["홈", "공증", "사문서 인증", "사실행위 증서", "캐나다 시민권자"],
    title: "사실행위 증서 — 캐나다 시민권자는 아포스티유로 진행",
    sub: "2024.1.11 캐나다 아포스티유 시행 이후, 시민권자의 서명·거주·동일인 증명서 등은 영사확인이 불가합니다.",
    docs: [
      "📌 캐나다 시민권자는 서명인증서·거주증명서·동일인증명서 등을 영사관에서 인증받을 수 없습니다.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【진행 방법】",
      "① 캐나다 공증인(Notary Public / 변호사)에게 해당 서류의 공증을 받습니다.",
      "② 공증받은 서류에 아포스티유 인증을 받습니다.",
      "  ▸ 온타리오 공증 문서 → ServiceOntario (777 Bay Street, Lower Level, Toronto)",
      "  ▸ 마니토바 공증 문서 → Global Affairs Canada (오타와)",
      "③ 아포스티유 받은 서류를 한국 제출처에 제출합니다.",
    ],
    costs: [{ label: "영사관 수수료", value: "해당 없음 (영사관 업무 아님)" }],
    time: "발급처 안내에 따름",
    notices: [
      "위임장·상속재산분할협의서·상속포기서는 시민권자라도 본인이 직접 영사관 방문 시 공증인 공증 없이 영사 인증이 가능합니다 (해당 메뉴 참조).",
      "자세한 아포스티유 발급처·절차는 첫 화면의 '캐나다 발행 문서' 안내를 참고하세요.",
      "한국 제출처가 요구하는 형식을 먼저 확인하세요.",
    ],
    onlineLink: "https://www.international.gc.ca/gac-amc/authentication-authentification/index.aspx",
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
      "📌 거소증(국내거소신고증)은 영사관에서 발급하지 않습니다. F-4 비자 등으로 한국에 입국한 후, 거주지를 관할하는 출입국·외국인청(구 출입국관리사무소)에 국내거소신고를 하여 발급받습니다(입국 후 90일 이내 신고).",
      "신청처가 다릅니다 — F-4 비자는 해외 공관(토론토 총영사관)에서 신청하고, 거소증은 한국 내 출입국·외국인청에서 신청합니다. (F-4 = 체류자격 / 거소증 = 한국 내 신분증)",
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
      "  ▸ 영사 앞에서 자필 작성 및 서명 필수 (타이핑·복사본 불가, 반드시 법정 양식 사용)",
      "  ▸ 대리인 정보 기재: 성명·주민등록번호·한국 주소",
      "  ▸ 보증인 정보 기재: 성명·주민등록번호·한국 주소 + 보증인 인감 날인",
      "  ▸ ⚠️ 보증인과 대리인은 반드시 다른 사람이어야 합니다",
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
      "📌 보증인 = 신고인의 진정한 의사를 보증하는 제3자. 반드시 국내에 인감이 신고되어 있는 성년자여야 하며, 인감증명처에 서류를 제출하기 전에 보증인의 인감이 날인되어 있어야 합니다.",
      "📌 대리인 = 한국에서 증명청·인감증명 발급기관을 직접 방문해 업무를 처리하는 사람.",
      "⚠️ 보증인과 대리인은 반드시 다른 사람이어야 합니다.",
      "⚠️ 신고인(본인)은 반드시 직접 방문 — 대리인 신청 불가. 미성년자는 법정대리인과 함께 방문.",
      "신고인의 주민등록번호가 있어야 합니다 (주민등록번호 말소자 불가).",
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
    sub: "여기는 한국어 문서를 '영문으로 번역'해 영사관이 확인하는 업무입니다. 문서 진위 국제 인증(아포스티유)이 필요하면 시작 화면의 '한국 발행 문서 → 해외 제출'을 이용하세요.",
    intro: [
      "⚠️ 먼저 확인하세요 — 영사관 번역 공증이 인정되지 않는 제출처가 있습니다:",
      "  ▸ 캐나다 이민국(IRCC) 제출(비자·영주권·시민권) → 영사관 번역 공증 불인정, 전문 번역사 필요",
      "  ▸ ServiceOntario 성명변경(Name Change) 제출 → 영사관 번역 공증 불인정",
      "  ▸ 위 두 경우라면 아래에서 해당 항목을 선택해 자세한 안내를 확인하세요.",
    ],
    options: [
      { id: "notarization_translation_ircc_no", icon: "🇨🇦", title: "캐나다 이민국 (IRCC) 제출", desc: "비자·영주권·시민권 신청 관련 서류" },
      { id: "notarization_translation_namechange_no", icon: "📋", title: "ServiceOntario — 성명변경 제출", desc: "Name Change 신청 관련 출생증명서 번역" },
      { id: "notarization_translation_type", icon: "✅", title: "그 외 기관 제출 (한국 기관·학교·회사 등)", desc: "영사관 번역 공증 가능" },
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
    breadcrumb: ["홈", "공증", "운전면허"],
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
    breadcrumb: ["홈", "공증", "운전면허", "영문번역 인증서"],
    title: "운전면허 영문번역 인증서",
    docs: [
      "운전면허 영문번역 신청서 1부 (영사관 홈페이지 양식 다운로드 또는 영사관 비치)",
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
    breadcrumb: ["홈", "공증", "운전면허", "영문 운전경력증명서"],
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
    breadcrumb: ["홈", "공증", "운전면허", "영문 운전경력증명서 (온라인)"],
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
    breadcrumb: ["홈", "공증", "운전면허", "영문 운전경력증명서 (방문)"],
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
    breadcrumb: ["홈", "공증", "운전면허", "면허 교환 안내"],
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
    sub: "⚠️ 온타리오주·마니토바주 정규 교육기관 발행 서류만 공증 가능합니다. 공증 가능 서류 여부를 먼저 확인하세요. 📅 서류가 많으면 10건당 1자리로 예약하세요 (예: 13장 → 2자리, 26장 → 3자리).",
    intro: [
      "💡 공증이 불필요할 수 있습니다 — 먼저 확인하세요:",
      "  ▸ 국내 초·중·고 편입학용: 교육부가 인정한 외국소재 학력인정학교 서류는 아포스티유·영사확인 없이 학교장 발급 원본으로 갈음됩니다 (2014.9.16~). 교육부 학력인정학교 리스트를 확인하세요.",
      "  ▸ 대학 입학·편입용 초·중·고 학적서류는 아포스티유 또는 영사확인이 필요할 수 있으니 대학 측에 먼저 문의하세요.",
      "  ▸ 대학·College 자체 발행 서류는 캐나다 발행 문서이므로 첫 화면의 '캐나다 발행 문서'(아포스티유)로 진행하세요.",
    ],
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
    sub: "병역의무는 대한민국 국적 남성에게 해당됩니다. 선천적 복수국적 남성의 국적이탈(병역 면탈 목적이 아닌 국적 포기)은 '국적' 메뉴에서 확인하세요 — 만 18세가 되는 해 3월 31일까지만 신청할 수 있는 기한이 있습니다.",
    options: [
      { id: "military_permit_start", icon: "✈️", title: "국외여행허가 신청·연장", desc: "캐나다 체류 중 병역 연기 허가 신청" },
      { id: "military_permit_2ndgen", icon: "👶", title: "재외국민 2세 확인", desc: "외국 출생·어릴 때 이민 — 확인 시 국외여행허가 불필요" },
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
      "허가 취소 주의: 1년의 기간 중 통산 6개월 이상 국내 체재 시 허가 취소 및 병역의무 부과.",
      "허가 취소 주의: 「해외이주법」에 따라 영주귀국 신고 시 허가 취소 및 병역의무 부과.",
      "국내 영리활동 주의: 1년 중 통산 60일 이상 취업·사업(부동산 임대 포함)·공연 수입 활동 시 허가 취소.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 국외여행허가) →",
    onlineLink: "https://www.mma.go.kr",
    onlineLabel: "병무청 웹사이트 바로가기",
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
      "⚠️ 허가 기간 만료 최소 3개월 전에 신청하세요 (서류 심사 기간 감안).",
      "⚠️ 2026.5.3부터: 허가기간 만료 후 15일 이내 미귀국 시 고발.",
      "허가 취소 주의: 1년의 기간 중 통산 6개월 이상 국내 체재 또는 영리활동(연 60일 이상, 부동산 임대 포함) 시 허가 취소 및 병역의무 부과.",
      "부 또는 모가 영주귀국 신고를 하거나 1년의 기간 중 통산 6개월 이상 국내 체재 시 허가 취소.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "예약하기 (병역 → 국외여행허가) →",
    onlineLink: "https://www.mma.go.kr",
    onlineLabel: "병무청 웹사이트 바로가기",
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
    onlineLabel: "병무청 웹사이트 바로가기",
  },

  // ── 재외국민 2세 ──
  military_permit_2ndgen: {
    type: "result",
    service: "military",
    breadcrumb: ["홈", "병역", "재외국민 2세 확인"],
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
    onlineLink: "https://www.mma.go.kr/contents.do?mc=mma0000802",
    onlineLabel: "병무청 재외국민 2세 안내",
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
      "병적증명서 신청서 (영사관 비치)",
      "개인정보 수집·이용 동의서 (영사관 비치)",
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
      "병적증명서 신청서 (영사관 비치)",
      "개인정보 수집·이용 동의서 (영사관 비치)",
      "대리인(가족)의 신분증",
      "신청 대상자의 신분증 사본",
      "본인과의 관계를 증명할 수 있는 서류",
      "  ▸ 가족관계증명서 또는 제적등본 등",
      "  ▸ 관계 확인 불가 시: 병적증명서용 위임장(별지 제3호서식) + 위임자 신분증 + 대리인 신분증",
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
      "병적증명서 신청서 (영사관 비치)",
      "개인정보 수집·이용 동의서 (영사관 비치)",
      "신청 대상자(위임자) 신분증(주민등록증 또는 여권) 사본",
      "대리인 신분증 원본 + 사본",
      "병적증명서용 위임장 (별지 제3호서식)",
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
    sub: "공동인증서가 있으면 재외동포365 민원포털에서 온라인으로 즉시 발급 가능합니다.",
    options: [
      { id: "registration_copy_online", icon: "💻", title: "온라인 발급 (재외동포365 민원포털)", desc: "공동인증서 필요 — 즉시 발급" },
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
      "재외동포365 민원포털 접속 → 재외국민등록부 등본 신청",
    ],
    costs: [{ label: "수수료", value: "무료" }],
    time: "즉시",
    notices: [
      "재외국민등록이 완료된 경우에만 발급 가능.",
      "재외국민등록부 등본은 해외 체류기간을 직접 증명하는 서류로는 활용 불가.",
    ],
    booking: null,
    onlineLink: "https://www.g4k.go.kr",
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

  // ══ FAQ ══
  faq_start: {
    type: "faq_tabs",
    breadcrumb: ["홈", "자주 묻는 질문"],
    title: "자주 묻는 질문 (Q&A)",
    title_en: "Frequently Asked Questions (Q&A)",
    cats: [
      { id: "faq_general",      icon: "📋", ko: "일반",             en: "General" },
      { id: "faq_passport",     icon: "🛂", ko: "여권",             en: "Passport" },
      { id: "faq_visa",         icon: "✈️", ko: "비자(사증)",        en: "Visa" },
      { id: "faq_notarization", icon: "📜", ko: "공증",             en: "Notarization" },
      { id: "faq_military",     icon: "🎖️", ko: "병역",             en: "Military service" },
      { id: "faq_family",       icon: "👪", ko: "가족관계등록",      en: "Family register" },
      { id: "faq_nationality",  icon: "🇰🇷", ko: "국적",             en: "Nationality" },
      { id: "faq_etc",          icon: "📌", ko: "기타",             en: "Other" },
    ],
  },

  faq_passport: {
    type: "faq",
    breadcrumb: ["홈", "자주 묻는 질문", "여권"],
    title: "여권 — 자주 묻는 질문",
    title_en: "Passport — FAQ",
    items: [
      {
        q: "여권 발급 구비서류가 무엇입니까?",
        q_en: "What documents are required to apply for a passport?",
        a: "여권 종류와 신청자에 따라 구비서류가 다릅니다. 영사관 홈페이지 '여권 발급 구비서류 안내'에서 확인하세요. (https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5389/list.do)",
        a_en: "Required documents vary by passport type and applicant. Please check the 'Passport Required Documents' guide on the consulate website. (https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5389/list.do)",
      },
      {
        q: "여권 발급 소요기간이 얼마나 되나요?",
        q_en: "How long does passport issuance take?",
        a: "일반적으로 약 4주 소요됩니다. DHL 긴급여권 신청 시 10일 이내, 순회영사 신청 시에는 1~2주 정도 추가로 소요됩니다.",
        a_en: "Generally about 4 weeks. With a DHL urgent passport, within 10 days; for mobile consular service, 1-2 weeks longer.",
      },
      {
        q: "여권 잔여기간이 2년 정도 남았는데 비자 연장 때문에 재발급 받기를 원합니다. 가능한가요?",
        q_en: "About 2 years remain on my passport, but I want to reissue it for a visa extension. Is that possible?",
        a: "가능합니다. 여권은 잔여기간과 상관없이 재발급 신청이 가능합니다.",
        a_en: "Yes. A passport can be reissued regardless of the remaining validity period.",
      },
      {
        q: "원거리에 거주하는 교민인데 우편으로 여권 신청이 가능합니까?",
        q_en: "I live far away - can I apply for a passport by mail?",
        a: "불가합니다. 여권 신청은 반드시 직접 방문해야 합니다(본인 확인·지문 취득). 재외동포365 민원포털을 통한 온라인 신청의 경우에도 수령은 직접 방문해야 합니다.",
        a_en: "No. Passport applications must be made in person (identity verification and fingerprinting). Even with online application via the Overseas Koreans 365 Portal, you must collect the passport in person.",
      },
      {
        q: "여권이 발급되면 우편으로 배송이 됩니까?",
        q_en: "Can the issued passport be mailed to me?",
        a: "가능합니다. Canada Post에서 판매하는 등기봉투(XpressPost prepaid envelope)를 미리 구입해 여권 신청 시 함께 제출하면 됩니다. 단, 온라인 여권 신청은 우편 수령이 불가합니다.",
        a_en: "Yes. Buy a registered envelope (XpressPost prepaid) from Canada Post in advance and submit it with your application. Note: online passport applications cannot be received by mail.",
      },
      {
        q: "여권 사진은 영사관에서 무료 촬영이 가능합니까?",
        q_en: "Can I get a passport photo taken for free at the consulate?",
        a: "가능합니다. 단, 만 5세 미만 유아는 사진관에서 촬영해야 합니다.",
        a_en: "Yes. However, infants under age 5 must have their photo taken at a photo studio.",
      },
      {
        q: "여행 일정 때문에 긴급여권을 받을 수 있는 방법이 있나요?",
        q_en: "Can I get an urgent passport due to my travel schedule?",
        a: "가능합니다. DHL 특급배송으로 신청하면 받을 수 있습니다(약 7~8일 소요). 신청방법: 영사관 홈페이지 여권 신청 구비서류의 'DHL 결제하기'에서 신용카드로 결제 후 영수증을 출력해 여권 신청 시 함께 제출하면 됩니다.",
        a_en: "Yes. Apply with DHL express delivery (about 7-8 days). How: on the consulate website's passport documents page, use 'DHL Payment', pay by credit card, print the receipt, and submit it with your application.",
      },
      {
        q: "여권 발급 시 기존 여권번호와 동일하게 사용할 수 있나요?",
        q_en: "Can I keep the same passport number when reissuing?",
        a: "지정할 수 없습니다. 재발급 시 여권번호가 새로 생성되므로 구여권과 동일한 번호를 부여받을 수 없습니다.",
        a_en: "No. A new passport number is generated upon reissuance, so the same number as the old passport cannot be assigned.",
      },
      {
        q: "복수국적자가 한국 방문 시 캐나다 여권을 사용해도 되나요?",
        q_en: "Can a dual citizen use a Canadian passport when visiting Korea?",
        a: "복수국적자는 한국 방문 시 한국 여권을 사용해야 합니다. 캐나다 여권을 사용하면 벌금이 부과될 수 있으며, 캐나다 출입국 시에는 캐나다 여권을, 한국 출입국 시에는 한국 여권을 사용해야 합니다.",
        a_en: "Dual citizens must use their Korean passport when visiting Korea. Using a Canadian passport may result in a fine. Use the Canadian passport for Canadian immigration and the Korean passport for Korean immigration.",
      },
      {
        q: "영주권 카드가 만료된 경우는 어떻게 하나요?",
        q_en: "What if my PR card has expired?",
        a: "영주권 카드 갱신 신청을 먼저 해야 합니다. 갱신 시 여권번호 등 개인정보를 입력하기 '전'에 수수료 $50를 지불하고 영수증을 받을 수 있는데, 그 영수증과 만료된 영주권 카드를 함께 지참해 여권을 신청하면 1년 전자단수여권 발급이 가능합니다. 이 여권이 나오면 영주권 카드 갱신을 완료하고 실물 카드를 받은 후, 다시 일반 10년 여권을 신청해야 합니다.",
        a_en: "First apply to renew your PR card. During renewal, before entering personal information such as your passport number, you can pay the $50 fee and obtain a receipt; bring that receipt with your expired PR card to apply for a passport, and a 1-year electronic single-use passport can be issued. Once you receive it, complete the PR card renewal, obtain the physical card, then apply for a regular 10-year passport.",
      },
    ],
  },
  faq_visa: {
    type: "faq",
    breadcrumb: ["홈", "자주 묻는 질문", "비자(사증)"],
    title: "비자(사증) — 자주 묻는 질문",
    title_en: "Visa — FAQ",
    items: [
      {
        q: "범죄경력증명서 등 몇 개월 내에 발급받은 것이어야 하나요?",
        q_en: "How recent must documents like a criminal record certificate be?",
        a: "각종 증명서는 유효기간이 6개월입니다.",
        a_en: "Various certificates are valid for 6 months.",
      },
      {
        q: "사진은 영사관에서 찍을 수 있나요? 사진 규격은 어떤가요?",
        q_en: "Can I take the photo at the consulate? What are the photo specifications?",
        a: "사진관에서 찍어오셔야 합니다. 영사관에 비치된 촬영장비는 한국 여권 발급용이라 비자용으로는 인화되지 않습니다.",
        a_en: "You must have it taken at a photo studio. The consulate's photo equipment is for Korean passport issuance only and cannot print photos for visas.",
      },
      {
        q: "우편 접수도 되나요?",
        q_en: "Can I apply by mail?",
        a: "결혼이민(F-6-1) 비자는 우편신청이 불가합니다. 그 외에는 관할지역(온타리오(오타와 제외)·마니토바) 거주자 중 차량으로 2시간 이상 떨어진 곳에 거주하는 경우에만 우편신청이 가능합니다.",
        a_en: "Marriage migration (F-6-1) visas cannot be applied for by mail. Otherwise, mail application is allowed only for residents of the jurisdiction (Ontario excluding Ottawa, and Manitoba) who live more than a 2-hour drive away.",
      },
      {
        q: "비자 찾으러 갈 때는 뭐가 필요한가요? 직접 가야 하나요?",
        q_en: "What do I need to collect my visa? Do I have to go in person?",
        a: "대한민국 비자는 더 이상 여권에 부착되지 않으며, 수령하러 오실 필요가 없습니다. 본인이 집에서 프린터로 출력하시면 됩니다.",
        a_en: "Korean visas are no longer affixed to the passport, and you do not need to come to collect it. You can simply print it at home.",
      },
      {
        q: "여권은 원본을 제출해야 하나요?",
        q_en: "Do I need to submit my original passport?",
        a: "여권 원본을 비자 신청서와 함께 제출하셔야 합니다. 접수 시 원본 확인 후 즉시 돌려드립니다.",
        a_en: "You must submit your original passport with the visa application. It is verified at intake and returned to you immediately.",
      },
      {
        q: "F-4 비자를 받으려면 어떻게 하나요?",
        q_en: "How do I get an F-4 visa?",
        a: "국적상실이 선행되어야 합니다. 먼저 국적상실에 필요한 기본증명서·가족관계증명서를 신청하고, 2주 뒤 픽업하면서 다른 구비서류가 준비되었다면 국적상실신고와 F-4 비자를 같은 날 신청하시면 됩니다.",
        a_en: "Loss of Korean nationality must come first. First apply for the basic certificate and family relation certificate needed for the nationality loss; then, when you pick them up 2 weeks later, if your other documents are ready, you can file the nationality-loss report and apply for the F-4 visa on the same day.",
      },
    ],
  },
  faq_notarization: {
    type: "faq",
    breadcrumb: ["홈", "자주 묻는 질문", "공증"],
    title: "공증 — 자주 묻는 질문",
    title_en: "Notarization — FAQ",
    items: [
      {
        q: "한국에서 출생한 한국 국적자입니다. 캐나다 이민 신청을 위해 출생증명서(Birth Certificate)를 발급받고 싶습니다.",
        q_en: "I'm a Korean national born in Korea. I'd like a Birth Certificate for a Canadian immigration application.",
        a: "당사자의 기본증명서 및 가족관계증명서 한글본을 번역 공증하여 사용하실 수 있습니다. 다만 현재 캐나다 이민국(CIC)에 제출하는 서류는 캐나다에서 번역 자격증을 소지한 전문 번역사를 통한 번역공증을 요구하므로, 지정 번역기관은 캐나다 이민국에 문의하시기 바랍니다.",
        a_en: "You can use a notarized translation of the Korean basic certificate and family relation certificate. However, documents submitted to Canadian immigration (IRCC/CIC) currently require a notarized translation by a certified translator in Canada, so please ask Canadian immigration about designated translation agencies.",
      },
      {
        q: "캐나다 시민권자이며 노인연금 신청에 필요한 혼인증명서(Marriage Certificate)를 발급받고 싶습니다.",
        q_en: "I'm a Canadian citizen and need a Marriage Certificate for an old-age pension application.",
        a: "최근 3개월 이내 발급된 혼인관계증명서 한글본과 여권을 지참하여 영사관에 방문하시면 됩니다. 수수료는 $5.40입니다.",
        a_en: "Bring a Korean marriage relation certificate issued within the last 3 months and your passport, and visit the consulate. The fee is $5.40.",
      },
      {
        q: "한국 국적자입니다. 인감증명서 위임장 및 일반위임장을 발급받고 싶습니다.",
        q_en: "I'm a Korean national. I'd like a seal certificate power of attorney and a general power of attorney.",
        a: "위임장은 본인 방문이 원칙입니다. 본인이 직접 영사관을 방문해 위임장 양식을 작성하시고, 방문 시 유효한 여권과 유효한 캐나다 비자 또는 PR카드를 지참하셔야 합니다.",
        a_en: "Powers of attorney require the principal to apply in person. Visit the consulate yourself to complete the form, and bring a valid passport and a valid Canadian visa or PR card.",
      },
      {
        q: "캐나다 시민권자입니다. 영사확인이 가능한 서류는 무엇이 있나요?",
        q_en: "I'm a Canadian citizen. Which documents can receive consular certification?",
        a: "위임장, 상속포기서, 상속재산분할협의서입니다.",
        a_en: "Power of attorney, inheritance waiver, and inheritance division agreement.",
      },
      {
        q: "아포스티유는 어디서 받나요?",
        q_en: "Where do I get an Apostille?",
        a: "서명인증서·거주증명서·동일인증명서 등은 캐나다 공증인으로부터 공증을 받은 후 아포스티유를 받아야 합니다(영사확인 불가). 아포스티유는 777 Bay St, Lower Level의 Official Documents Service에서 받으시면 됩니다.",
        a_en: "Documents such as a signature certificate, residence certificate, and identity certificate must first be notarized by a Canadian notary, then receive an Apostille (consular certification is not available). Apostilles are issued at Official Documents Services, 777 Bay St, Lower Level.",
      },
    ],
  },
  faq_military: {
    type: "faq",
    breadcrumb: ["홈", "자주 묻는 질문", "병역"],
    title: "병역 — 자주 묻는 질문",
    title_en: "Military service — FAQ",
    items: [
      {
        q: "현재 영주권자로 37세까지 국외여행허가를 받은 상태입니다. 한국에 자주 들어가도 되나요?",
        q_en: "I'm a permanent resident with an overseas travel permit until age 37. Can I visit Korea frequently?",
        a: "단기 방문은 가능합니다. 다만 1년 중 통산 6개월 이상 국내 체재, 영리활동(연 60일 이상), 영주귀국 신고 시에는 허가가 취소되고 병역의무가 부과됩니다. 자주 오시는 건 괜찮지만, 연간 누적 체재가 6개월을 넘지 않도록 주의하세요.",
        a_en: "Short visits are fine. However, the permit is revoked and military duty reimposed if you stay in Korea a cumulative 6+ months in a year, do profit-making activity (60+ days/year), or file a permanent-return report. Visiting often is OK, but keep your annual cumulative stay under 6 months.",
      },
      {
        q: "복수국적자가 병무청의 국외여행허가를 받지 않고 외국 여권으로 출·입국할 수 있나요?",
        q_en: "Can a dual national enter or leave Korea on a foreign passport without the MMA's overseas travel permit?",
        a: "아니요. 복수국적자도 국외여행을 하려면 국외여행허가를 받아야 합니다. 허가를 받지 않고 외국 여권으로 출·입국하는 것은 국외여행허가의무 위반으로, 이후 출국이 제한될 수 있습니다.",
        a_en: "No. Dual nationals must also obtain the overseas travel permit before traveling. Entering or leaving Korea on a foreign passport without the permit violates the travel-permit duty and may lead to future departure restrictions.",
      },
      {
        q: "만 20세 학생입니다. 국외여행허가는 언제 신청해야 하나요?",
        q_en: "I'm a 20-year-old student. When should I apply for an overseas travel permit?",
        a: "만 24세까지는 국외여행허가 없이 국외여행·체재가 가능합니다. 25세가 되기 전 출국해 계속 국외에 머무르려면, 만 24세가 되는 해 1월 1일부터 만 25세가 되는 해 1월 15일까지 국외여행(기간연장)허가를 신청해야 합니다. (올해 {Y}년 기준: {B24}년생이 올해 만 24세 → {Y}.1.1부터 신청, {Y1}.1.15까지) 만 20세는 아직 신청 시기가 아니며, 만 24세가 되는 해부터 신청하시면 됩니다.",
        a_en: "You can travel and stay abroad without a permit until age 24. To keep staying abroad after leaving before age 25, apply for an overseas travel (extension) permit from January 1 of the year you turn 24 until January 15 of the year you turn 25. (This year {Y}: those born in {B24} turn 24 → apply from {Y}.1.1, deadline {Y1}.1.15.) At age 20 it isn't time yet — apply starting the year you turn 24.",
      },
    ],
  },
  faq_family:       { type: "faq", breadcrumb: ["홈", "자주 묻는 질문", "가족관계등록"],    title: "가족관계등록 — 자주 묻는 질문",    title_en: "Family register — FAQ",                 items: [] },
  faq_nationality:  { type: "faq", breadcrumb: ["홈", "자주 묻는 질문", "국적"],            title: "국적 — 자주 묻는 질문",            title_en: "Nationality — FAQ",                     items: [] },
  faq_cert_auth:    { type: "faq", breadcrumb: ["홈", "자주 묻는 질문", "공동·금융 인증서"], title: "공동·금융 인증서 — 자주 묻는 질문", title_en: "Digital/financial certificates — FAQ",  items: [] },
  faq_various_cert: { type: "faq", breadcrumb: ["홈", "자주 묻는 질문", "각종 증명서 발급"], title: "각종 증명서 발급 — 자주 묻는 질문", title_en: "Various certificates — FAQ",            items: [] },
  faq_etc:          { type: "faq", breadcrumb: ["홈", "자주 묻는 질문", "기타"],            title: "기타 — 자주 묻는 질문",            title_en: "Other — FAQ",                           items: [
      {
        q: "재외국민등록을 꼭 해야 하나요?",
        q_en: "Is overseas Korean registration mandatory?",
        a: "네. 외국의 일정한 지역에 90일을 초과하여 거주·체류하려는 대한민국 국민은 재외국민등록이 법적 의무입니다. 주민등록번호가 없는 해외 출생자도 대상입니다.",
        a_en: "Yes. Any Korean national intending to live or stay in one area abroad for more than 90 days must register — including those born abroad without a Korean resident registration number.",
      },
      {
        q: "재외국민등록을 하면 주민등록이 말소되나요?",
        q_en: "Will my resident registration be cancelled if I register?",
        a: "아니요. 재외국민등록을 해도 주민등록은 말소되지 않으며, 기존 주민등록번호도 그대로 유지됩니다.",
        a_en: "No. Your resident registration stays active and your existing resident registration number is unchanged.",
      },
      {
        q: "재외국민등록이 건강보험·국민연금에 영향을 주나요?",
        q_en: "Does it affect my national health insurance or pension?",
        a: "아니요. 건강보험·국민연금 모두 한국 거주 내국인과 동일하게 관리·적용되어 변동이 없습니다.",
        a_en: "No. Both national health insurance and the national pension are maintained exactly the same as for residents in Korea.",
      },
    ] },

  faq_general: {
    type: "faq",
    breadcrumb: ["홈", "자주 묻는 질문", "일반"],
    title: "일반 — 자주 묻는 질문",
    title_en: "General — FAQ",
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
        a: "여권·공증 등 대부분의 업무는 현금, Debit(직불카드), 신용카드 모두 가능합니다. 단 비자(사증) 일부는 현금 또는 직불카드만 가능(신용카드 불가)하며, 일부 증명서 업무는 현금 또는 Money Order만 받는 경우가 있으니 해당 업무 화면에서 확인하세요. 수표·계좌이체는 불가합니다.",
        a_en: "Most services (passport, notarization, etc.) accept cash, Debit, and credit cards. However, some visa fees accept only cash or debit (no credit card), and certain certificate services may accept only cash or Money Order — check the specific service screen. Cheques and bank transfers are not accepted.",
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
        a: "우편 또는 대리인 신청이 가능한 업무: 가족관계 신고(일부), 국적상실신고(우편), 병무 국외여행허가(위임장 필요), 병적증명서 발급(가족 대리), 일부 증명서 발급, 초·중·고 학적서류 공증(우편 가능). 본인 방문이 원칙인 업무: 공증의 서명·인증(영사 앞 서명 필요), 여권 신규/재발급, 인감 관련, 해외이주신고 — 다만 미성년 자녀 여권 등 일부는 부모·대리인 신청이 가능하니 해당 업무 화면에서 확인하세요.",
        a_en: "Proxy or mail allowed: family register reports (some), nationality loss (mail), military travel permit (authorization required), military record certificate (immediate family), some certificate issuances, school-record notarization (by mail). In person as a rule: signature/authentication notarization (you must sign before the consul), passport issuance, seal (인감) documents, overseas emigration report — though some cases (e.g. a minor's passport) allow a parent/proxy, so check the specific service screen.",
      },
      {
        q: "영사관 전화번호는 무엇인가요?",
        q_en: "What is the Consulate's phone number?",
        a: "대표: 416-920-3809\n비자과 내선: ext. 221\n여권/국적과 내선: ext. 225\n긴급 (업무시간 외): 416-994-4490 (영사콜센터 1+82-2-3210-0404)",
        a_en: "Main: 416-920-3809\nVisa: ext. 221\nPassport/Nationality: ext. 225\nAfter-hours emergency: 416-994-4490 (or overseas: +82-2-3210-0404)",
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
// 비자 코드 등 언어 무관 식별자 추출 (예: B-2, C-3-9, E-2-1, F-6-1, H-1, D-2, K-ETA)
const extractCodes = (s: string) => {
  const m = s.match(/\b[A-Z]-?\d(?:-\d)*\b|\bK-ETA\b|\bTWOV\b/g);
  return m ? m.join(" ") : "";
};

// 언어별 검색 인덱스 빌더.
//  - 결과로 표시할 텍스트(title/breadcrumb)는 해당 언어 번역을 사용
//  - 검색 대상 text 에는 (해당 언어 번역) + (언어 무관 코드) 를 함께 포함
const buildSearchIndex = (lng: "ko" | "en") =>
  Object.entries(TREE as any)
    .filter(([, node]: any) => node.type === "result" || node.type === "question")
    .map(([id, node]: [any, any]) => {
      const tk: any = (KO_TRANSLATIONS as any)[id];
      const te: any = (EN_TRANSLATIONS as any)[id];
      const tr: any = lng === "ko" ? tk : te;
      if (node.type === "question") {
        // question 노드: question/sub/옵션 제목/breadcrumb를 검색 대상에 포함
        const qText = (tr && tr.question) ?? node.question ?? "";
        const subText = (tr && tr.sub) ?? node.sub ?? "";
        const breadcrumb = (tr && tr.breadcrumb) ?? node.breadcrumb ?? [];
        // 표시 제목: question 텍스트(없으면 breadcrumb 마지막)
        const title = qText || (Array.isArray(breadcrumb) && breadcrumb.length ? breadcrumb[breadcrumb.length - 1] : id);
        // 옵션 제목들 (번역 우선)
        const trOpts = (tr && tr.options) ?? {};
        const optTitles: string[] = [];
        if (Array.isArray(node.options)) {
          for (const o of node.options) {
            const ot = (trOpts && trOpts[o.id] && trOpts[o.id].title) ?? o.title ?? "";
            const od = (trOpts && trOpts[o.id] && trOpts[o.id].desc) ?? o.desc ?? "";
            if (ot) optTitles.push(ot);
            if (od) optTitles.push(od);
          }
        }
        const codeBag = extractCodes([node.question ?? "", ...(Array.isArray(node.breadcrumb) ? node.breadcrumb : [])].join(" "));
        const text = [title, subText, ...(Array.isArray(breadcrumb) ? breadcrumb : []), ...optTitles, codeBag]
          .join(" ").toLowerCase();
        return { id, node, title, breadcrumb, docs: [], notices: [], text };
      }
      // result 노드 (기존 로직)
      const title = (tr && tr.title) ?? node.title ?? "";
      const breadcrumb = (tr && tr.breadcrumb) ?? node.breadcrumb ?? [];
      const docs = (tr && tr.docs) ?? node.docs ?? [];
      const notices = (tr && tr.notices) ?? node.notices ?? [];
      const codeBag = extractCodes([node.title ?? "", ...(Array.isArray(node.breadcrumb) ? node.breadcrumb : [])].join(" "));
      const text = [title, ...(Array.isArray(breadcrumb) ? breadcrumb : []), ...(Array.isArray(docs) ? docs : []), ...(Array.isArray(notices) ? notices : []), codeBag]
        .join(" ").toLowerCase();
      return { id, node, title, breadcrumb, docs, notices, text };
    });

// ─── 비자 한국어 번역 테이블 ──────────────────────────────────────────────
// 영문 _en 노드 그래프를 한국어로 렌더하기 위한 번역 (영문 TREE 원본은 미수정).
// 노드 id별로 한국어 텍스트만 보관 — 없는 노드는 자동으로 영문으로 표시(graceful fallback).
const KO_TRANSLATIONS = {
  visa_start_en: {
    breadcrumb: ["홈", "비자 (사증)"],
    question: "한국 혈통이 있으신가요?",
    sub: "한국법상 부모 중 한 분이라도 과거에 한국 국적이었던 적이 있으면 — 이후 캐나다인이 되셨더라도 — 본인이 자동으로 한국 국적을 보유할 수 있습니다. 이에 따라 비자가 아예 필요 없을 수도 있습니다.",
    options: {
      visa_heritage_yes_en:    { title: "네 — 부모 또는 조부모가 한국인이었어요", desc: "이후 한국 국적을 포기한 경우도 포함됩니다" },
      visa_heritage_unsure_en: { title: "잘 모르겠어요 — 부모님 중 한 분이 한국인이었을 수 있어요", desc: "비자 신청 전 확인하는 것이 좋습니다" },
      visa_heritage_no_en:     { title: "한국 혈통이 전혀 없어요", desc: "부모·조부모 모두 한국 국적인 적 없음" },
    },
  },

  visa_heritage_yes_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통"],
    question: "어떤 상황이신가요?",
    sub: "한국 혈통이 있으시므로, 비자 신청 전에 국적 상태를 먼저 확인해야 합니다.",
    options: {
      visa_dual_check_en: { title: "아직 한국 국적 상태를 확인하지 않았어요", desc: "여전히 한국 국적자일 수 있습니다 — 먼저 확인하세요" },
      visa_f4_family_en:  { title: "배우자·자녀가 F-4 재외동포 비자 소지자예요", desc: "동반 가족 → F-3 동반비자" },
      visa_f4_en:         { title: "국적상실·이탈 확인 완료 — F-4 비자 신청하러 왔어요", desc: "본인 상황에 맞는 케이스를 선택하세요" },
    },
  },

  visa_heritage_unsure_en: {
    breadcrumb: ["홈", "비자 (사증)", "혈통 불확실"],
    title: "⚠️ 신청 전에 혈통을 먼저 확인하세요",
    docs: [
      "부모 또는 조부모가 과거에 한국 국적이었던 적이 있는지 확인해야 합니다",
      "  ▸ 이후 캐나다 시민권을 취득했더라도, 본인은 여전히 한국 국적자일 수 있습니다",
      "  ▸ 캐나다에서 태어났고 한국을 한 번도 방문한 적이 없어도, 한국 국적일 수 있습니다",
      "  ▸ 한국에 한 번도 등록(출생신고 등)한 적이 없어도, 한국 국적일 수 있습니다",
      "확인 방법:",
      "  ▸ 부모님께 여쭤보세요: 두 분 중 한 분이라도 한국에서 태어났거나 한국 국적이었던 적이 있나요?",
      "  ▸ 있다면 → 뒤로 가서 '네 — 부모 또는 조부모가 한국인이었어요' 선택",
      "  ▸ 정말로 한국 혈통이 없다면 → 뒤로 가서 '한국 혈통이 전혀 없어요' 선택",
    ],
    costs: [{ label: "수수료", value: "무료 — 상담 안내" }],
    time: "가족에게 먼저 확인 후 다시 방문",
    notices: [
      "⚠️ 실제로 한국 국적자인 상태에서 비자를 신청하면 영사관에서 접수가 거부됩니다.",
      "⚠️ 만 18~37세 남성이고 한국 국적이라면 병역 의무가 있을 수 있습니다.",
      "확인 후에도 불확실하면: 영사관(416-920-3809)에 전화하거나 국적과 상담을 예약하세요.",
    ],
    bookingLabel: "국적 상담 예약하기 →",
  },

  visa_heritage_no_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음"],
    question: "한국 방문 목적은 무엇인가요?",
    sub: "한국 혈통이 없으시므로 방문 목적을 선택하세요. 캐나다 국적자는 최대 6개월간 무비자로 한국에 입국할 수 있습니다.",
    options: {
      visa_visit_transit_en: { title: "무비자 / 경유", desc: "무비자 · K-ETA · 경유(TWOV)" },
      visa_short_term_en:    { title: "단기 방문", desc: "관광(C-3-9), 출장(C-3-4), 일반(C-3-1), 의료(C-3-3)" },
      visa_work_en:          { title: "취업", desc: "E-2-1 원어민 교사, E-2-2 EPIK/TALK, E-1~E-7, H-1 워킹홀리데이, F-1-D 디지털노마드" },
      visa_study_en:         { title: "유학", desc: "D-2-6 교환, D-2-8 단기, D-4-1 한국어연수, D-4-3 초·중·고" },
      visa_marriage_en:      { title: "결혼이민 (F-6-1)", desc: "한국 국민의 배우자 — 단수 90일, 한국 내 연장 가능" },
      visa_others_en:        { title: "기타", desc: "A-2-4 — 공무 / 외교 목적" },
    },
  },

  visa_f4_en: {
    breadcrumb: ["홈", "비자 (사증)", "재외동포(F-4)"],
    question: "본인에게 해당하는 케이스는?",
    sub: "F-4(재외동포) 비자는 1회 입국 시 최대 2년 체류, 유효기간 5년, 복수입국이 가능합니다. 수수료: CAD $121.50. 처리기간: 5~10 영업일.",
    options: {
      visa_f4_case1_en: { title: "케이스 1 — 본인이 한국 국적을 보유했던 만 41세 미만 남성", desc: "국적상실·이탈 완료 · 병역 관련 추가 서류 필요" },
      visa_f4_case2_en: { title: "케이스 2 — 선천적 복수국적자 (출생 당시 부모가 캐나다인)", desc: "국적이탈 완료 · 한국어 능력에 따라 체류기간 달라짐" },
      visa_f4_case3_en: { title: "케이스 3 — 후천적 시민권 취득 (가장 일반적)", desc: "한국 출생 후 캐나다 이민·귀화 · 국적상실 완료" },
    },
  },

  visa_f4_case1_en: {
    breadcrumb: ["홈", "비자 (사증)", "재외동포(F-4)", "케이스 1 — 41세 미만 남성"],
    title: "재외동포 비자 (F-4) — 케이스 1: 만 41세 미만 남성",
    docs: [
      "비자신청서 — visa.go.kr에서 다운로드, 모든 항목 빠짐없이 작성",
      "여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내 촬영, 뒷면에 날짜 기재)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가 — 반드시 사진관 촬영본 지참",
      "캐나다 여권 — 원본 + 사본",
      "  ▸ 비자 유효기간은 여권 만료일에 연동 — 잔여 5년 미만이면 여권 먼저 갱신",
      "부모 양쪽 여권 사본",
      "  ▸ 부모 중 사망한 분이 있으면: 사망증명서로 대체",
      "캐나다 시민권증서 — 원본 + 사본",
      "  ▸ 카드형·Search of Citizenship Record 불가",
      "  ▸ 시민권 취득일(선서일)이 년·월·일로 표시되어야 함",
      "  ▸ e-Certificate: 출력 제출, 원본 이메일 요청될 수 있음",
      "출생증명서 — Certified Copy of Birth Registration (원본 + 사본)",
      "  ▸ 한국 출생 신청자: 시민권증서로 대체 제출",
      "  ▸ 부모 양쪽 이름이 표시되어야 함",
      "신청자 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "  ▸ 2008년 이전 국적상실 신고자: 제적등본으로 대체",
      "신청자 가족관계증명서 (상세, 3개월 이내)",
      "부모 양쪽의 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "  ▸ 부모의 국적상실이 2008년 이전이면: 제적등본으로 대체",
      "국적상실신고 접수증 (기본증명서에 국적상실이 아직 반영 안 된 경우)",
      "부모의 캐나다 체류자격 증빙 (사본):",
      "  ▸ 시민권자(한국 출생): 시민권증서",
      "  ▸ 시민권자(캐나다 출생): 출생증명서",
      "  ▸ 영주권자: 유효한 PR카드 (앞뒷면)",
      "  ▸ 과거 영주권·시민권 보유 후 포기한 경우: 포기증명서 제출",
      "  ▸ 부모가 장기 체류자격이 없는 경우: 제출 불필요",
      "RCMP 범죄경력증명서 — 지문 기반, 6개월 이내 발급",
      "  ▸ ⚠️ 지문 기반만 인정 — 성명 기반(name-based) 불가",
      "  ▸ ⚠️ Toronto Police·지역 경찰 기록 불가 — 반드시 RCMP",
      "  ▸ 문의: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "제3국 범죄경력증명서 (최근 5년 내 한국·캐나다 외 국가에 1년 이상 체류한 경우)",
      "  ▸ 아포스티유 협약국이면 아포스티유, 아니면 영사확인 필요",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "⚠️ 비자 신청 전에 반드시 한국 국적상실·이탈 신고를 먼저 완료해야 합니다.",
      "  ▸ 1단계: 기본증명서·가족관계증명서 신청 (영사관 발급 2주 소요 — 미리 예약)",
      "  ▸ 2단계: 국적상실신고 (국적과 예약)",
      "  ▸ 3단계: 비자 신청 (비자과 예약)",
      "⚠️ 신청 가능 케이스 (만 41세 미만 남성):",
      "  ▸ 한국 출생 후 2018년 5월 1일 이전에 부모와 함께 이민 + 국적상실 완료",
      "  ▸ 한국인 부모에게서 캐나다 출생 + 2018년 5월 1일 이전 국적이탈 완료",
      "  ▸ 병역의무 이행 완료 (전역증명서 필요)",
      "  ▸ 병역 면제",
      "⚠️ 신청 불가: 병역 미이행 상태로 2018년 5월 1일 이후 한국 국적을 상실·이탈한 남성 → 만 41세까지 F-4 제한.",
      "비자 유효기간: 발급일로부터 5년, 1회 입국 시 최대 2년 체류.",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 필수 — 기간 내 미입국 시 무효.",
      "비자 진행 조회: visa.go.kr → '재외공관' 선택 → 여권번호·성명 입력.",
      "우편 신청 가능: Prepaid Xpresspost 반송봉투 + Certified Cheque 동봉.",
      "거소증(외국국적동포 국내거소신고증): 90일 이상 체류 또는 5년 내 복수 방문 예정 시, 입국 후 90일 이내 출입국·외국인청에서 신청.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_f4_case2_en: {
    breadcrumb: ["홈", "비자 (사증)", "재외동포(F-4)", "케이스 2 — 선천적 복수국적"],
    question: "성별과 나이는?",
    sub: "만 18~59세 남성은 RCMP 범죄경력증명서를 제출해야 합니다. 한국어 능력 입증서류가 있으면 2년 체류, 없으면 체류가 1년으로 제한됩니다.",
    options: {
      visa_f4_case2_general_en: { title: "여성 · 또는 만 18세 미만 남성 · 또는 만 60세 이상 남성", desc: "RCMP 범죄경력증명서 불필요" },
      visa_f4_case2_male_en:    { title: "만 18~59세 남성", desc: "RCMP 범죄경력증명서 필요" },
    },
  },

  visa_f4_case2_general_en: {
    breadcrumb: ["홈", "비자 (사증)", "재외동포(F-4)", "케이스 2 — 선천적 복수국적"],
    title: "재외동포 비자 (F-4) — 케이스 2: 선천적 복수국적자",
    docs: [
      "비자신청서 — visa.go.kr에서 다운로드, 모든 항목 작성",
      "여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내 촬영, 뒷면 날짜)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가 — 사진관 촬영본 지참",
      "캐나다 여권 — 원본 + 사본",
      "부모 양쪽 여권 사본",
      "  ▸ 부모 중 사망한 분이 있으면: 사망증명서로 대체",
      "출생증명서 (Certified Copy of Birth Registration) — 원본 + 사본",
      "  ▸ 부모 양쪽 이름이 표시되어야 함",
      "  ▸ 캐나다 외 출생: 해당 국가 출생증명서",
      "한국인 부 또는 모의 기본증명서 (상세, 주민번호 전부공개, 3개월 이내)",
      "한국인 부 또는 모의 가족관계증명서 (상세, 3개월 이내)",
      "  ▸ 부모의 국적상실이 2008년 이전이면: 제적등본으로 대체",
      "  ▸ ⚠️ 부모가 직접 영사관 방문 신청해야 함 (자녀가 부모 대신 신청 불가)",
      "부모의 국적상실신고 접수증 (기본증명서에 아직 반영 안 된 경우)",
      "부모의 캐나다 체류자격 증빙 (사본):",
      "  ▸ 시민권자(한국 출생): 시민권증서",
      "  ▸ 시민권자(캐나다 출생): 출생증명서",
      "  ▸ 영주권자: 유효한 PR카드 (앞뒷면)",
      "[선택] 한국어 능력 입증서류 (1년 대신 2년 체류용):",
      "  ▸ TOPIK 1급 이상, 사회통합프로그램 사전평가(21점 이상) 또는 1단계 이수,",
      "  ▸   세종학당 수료증(초급 1B 이상) 또는 이에 준하는 것",
      "  ▸ 면제: 만 60세 이상, 한국 초등학교 이상 졸업, 만 13세 이하, 한국 내 3년 이상 거주한 F-4 보유 이력자",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "신청 자격: 출생 당시 부모 중 한 명이 이미 캐나다인이었던 한·캐 선천적 복수국적자 + 국적이탈 완료.",
      "⚠️ 한국어 능력 입증서류가 없으면: 1회 입국당 체류 1년 제한. 있으면: 최대 2년.",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 필수.",
      "비자 유효기간: 5년; 1회 입국당 최대 2년 (한국어 입증서류 없으면 1년).",
      "우편 신청 가능: Prepaid Xpresspost 반송봉투 + Certified Cheque 동봉.",
      "거소증: 90일 이상 체류 시 입국 후 90일 이내 신청.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_f4_case2_male_en: {
    breadcrumb: ["홈", "비자 (사증)", "재외동포(F-4)", "케이스 2 — 선천적 복수국적 (남성 18~59세)"],
    title: "재외동포 비자 (F-4) — 케이스 2: 선천적 복수국적 (만 18~59세 남성)",
    docs: [
      "비자신청서 — 모든 항목 작성",
      "여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜)",
      "  ▸ ⚠️ 영사관 사진장비 사용 불가",
      "캐나다 여권 — 원본 + 사본",
      "부모 양쪽 여권 사본",
      "출생증명서 (Certified Copy of Birth Registration) — 원본 + 사본",
      "  ▸ 부모 양쪽 이름 표시",
      "한국인 부 또는 모의 기본증명서 + 가족관계증명서 (상세, 3개월 이내)",
      "  ▸ 국적상실이 2008년 이전이면: 제적등본으로 대체",
      "부모의 국적상실신고 접수증 (기본증명서에 아직 반영 안 된 경우)",
      "부모의 캐나다 체류자격 증빙 (사본)",
      "RCMP 범죄경력증명서 — 지문 기반, 6개월 이내 발급",
      "  ▸ ⚠️ 지문 기반만 인정 (성명 기반 불가) — 지역 경찰 기록 불가",
      "  ▸ 문의: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "제3국 범죄경력증명서 (최근 5년 내 한국·캐나다 외 1년 이상 체류 시)",
      "[선택] 한국어 능력 입증서류 (2년 체류용)",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "⚠️ RCMP 증명서는 지문 기반이어야 함 — 성명 기반 불가.",
      "⚠️ 한국어 입증서류가 없으면: 1회 입국당 체류 1년 제한.",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 필수.",
      "비자 유효기간: 5년; 1회 입국당 최대 2년 (입증서류 없으면 1년).",
      "우편 신청 가능: Prepaid Xpresspost 반송봉투 + Certified Cheque 동봉.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_f4_case3_en: {
    breadcrumb: ["홈", "비자 (사증)", "재외동포(F-4)", "케이스 3 — 후천적 시민권 취득"],
    title: "재외동포 비자 (F-4) — 케이스 3: 후천적 시민권 취득 (F-4-11)",
    docs: [
      "비자신청서 — visa.go.kr에서 다운로드, 모든 항목 빠짐없이 작성",
      "여권용 사진 1매 — 3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜",
      "캐나다 여권 — 원본 + 사본",
      "캐나다 시민권증서 — 원본 + 사본",
      "신청자 기본증명서 — 상세, 주민번호 전부공개, 3개월 이내",
      "신청자 가족관계증명서 — 상세, 3개월 이내",
      "RCMP 범죄경력증명서 — 지문 기반, 6개월 이내 발급",
      "  ▸ 만 17세 이하·60세 이상: 면제",
      "  ▸ 최근 5년 내 한국·캐나다 외 1년 이상 체류 시 제3국 범죄경력증명서도 필요",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $121.50 (현금, Debit, 신용카드) / 우편: Certified Cheque" }],
    time: "5~10 영업일",
    notices: [
      "⚠️ 신청 전에 국적상실신고를 먼저 완료 — 처리에 약 6개월 소요. 국적과 예약을 먼저 하세요.",
      "⚠️ 영사관에서 기본증명서·가족관계증명서 발급에 2주 소요 — 미리 신청.",
      "⚠️ 영사관 사진장비 사용 불가 — 사진관 촬영본 지참.",
      "⚠️ 시민권증서: 카드형·Search of Citizenship Record 불가. 선서일(년·월·일) 표시 필수. e-Certificate는 출력 제출.",
      "⚠️ RCMP 증명서: 지문 기반만 인정 — 성명 기반·지역 경찰 불가. 문의: CCRTIS-SCICTR@rcmp-grc.gc.ca",
      "⚠️ 기본증명서에 국적상실이 아직 표시되지 않은 경우: 국적상실신고 접수증도 함께 제출.",
      "⚠️ 국적상실이 2008년 1월 1일 이전이면: 기본증명서·가족관계증명서 대신 제적등본 제출.",
      "비자: 유효기간 5년 · 1회 입국당 최대 2년 체류 · 복수입국.",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 — 기간 내 미입국 시 무효.",
      "비자 진행 조회: visa.go.kr → '재외공관' 선택 → 여권번호 입력.",
      "우편: Xpresspost 반송봉투 + Certified Cheque 동봉 (영사관에서 차로 2시간 이상 거주자만).",
      "거소증: 90일 이상 체류 시 입국 후 90일 이내 출입국·외국인청에서 신청.",
      "콜센터 없음 — 문의: torvisa@mofa.go.kr",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_f4_family_en: {
    breadcrumb: ["홈", "비자 (사증)", "동반(F-3)"],
    question: "F-4 비자 소지자와의 관계는?",
    sub: "F-4 재외동포 비자 소지자의 배우자 또는 만 18세 미만 미성년 자녀는 F-3 동반비자를 신청할 수 있습니다.",
    options: {
      visa_f3_spouse_en: { title: "F-4 비자 소지자의 배우자", desc: "최대 1년 체류" },
      visa_f3_child_en:  { title: "F-4 비자 소지자의 미성년 자녀 (만 18세 미만)", desc: "최대 1년 체류" },
    },
  },

  visa_f3_spouse_en: {
    breadcrumb: ["홈", "비자 (사증)", "동반(F-3)", "배우자"],
    title: "동반 비자 (F-3) — F-4 소지자의 배우자",
    docs: [
      "비자신청서 (visa.go.kr에서 출력, 사진 부착)",
      "유효한 캐나다 여권 — 원본 + 사본",
      "여권용 사진 1매",
      "F-4 비자 소지자의 비자 또는 국내거소신고증(거소증) 사본 — 앞뒷면",
      "혼인증명서 — 한국 혼인관계증명서(상세, 3개월 이내) 또는 캐나다 혼인등록증명서",
      "부부 양쪽의 가족관계증명서 (상세) — 3개월 이내",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $81 (현금, Debit, 신용카드) / 우편: Certified Cheque $81" }],
    time: "약 1~2주",
    notices: [
      "체류기간: 최대 1년 (F-4 소지자의 비자 유효기간 이내).",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 — 기간 내 미입국 시 무효.",
      "혼인증명서: 캐나다에서 혼인한 경우 Certified Copy of Marriage Registration 또는 Certified Copy of Marriage License (Legal 사이즈) 제출 — Certificate of Marriage 약식본 불가.",
      "우편 신청 가능 — 여권 반송용 Prepaid Xpresspost 봉투 동봉.",
      "⚠️ 본인이 한국 혈통이라면 F-4를 직접 신청할 수 있을 수 있습니다.",
    ],
  },

  visa_f3_child_en: {
    breadcrumb: ["홈", "비자 (사증)", "동반(F-3)", "미성년 자녀"],
    title: "동반 비자 (F-3) — F-4 소지자의 미성년 자녀 (만 18세 미만)",
    docs: [
      "비자신청서 (visa.go.kr에서 출력, 사진 부착)",
      "유효한 여권 — 원본 + 사본",
      "여권용 사진 1매",
      "F-4 비자 소지자의 비자 또는 국내거소신고증(거소증) 사본 — 앞뒷면",
      "자녀 출생증명서 — Certified Copy of Birth Registration",
      "부모의 가족관계증명서 또는 혼인증명서 (상세) — 3개월 이내",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $81 (현금, Debit, 신용카드) / 우편: Certified Cheque $81" }],
    time: "약 1~2주",
    notices: [
      "미성년 자녀: 0~18세.",
      "체류기간: 최대 1년 (F-4 소지자의 비자 유효기간 이내).",
      "⚠️ 비자는 발급일로부터 3개월 이내 입국 — 기간 내 미입국 시 무효.",
      "우편 신청 가능 — 여권 반송용 Prepaid Xpresspost 봉투 동봉.",
    ],
  },

  // ── 단기방문 (C-3) ──
  visa_short_term_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문"],
    question: "단기 방문 목적은 무엇인가요?",
    sub: "🇨🇦 캐나다 국적자는 최대 6개월간 무비자로 한국 방문 가능 — 비자가 필요 없을 수 있습니다. 단기비자(C-3)는 주로 캐나다 거주 비(非)캐나다 국적자이거나 특정 활동의 경우에 필요합니다.",
    options: {
      visa_c34_en: { title: "출장 (C-3-4)", desc: "시장조사, 계약 체결, 컨설팅, 한국 기업과의 미팅" },
      visa_c31_en: { title: "일반 단기방문 (C-3-1)", desc: "회의, 학술연구, 치료, 연수, 종교활동" },
      visa_c33_en: { title: "치료 (C-3-3)", desc: "비캐나다 국적자의 한국 내 치료 목적 — 최대 90일" },
      visa_c39_tourist_en: { title: "관광 / 단기체류 (C-3-9)", desc: "관광, 친지 방문, 단기 여가 — 비(非)캐나다 국적자" },
    },
  },

  visa_c34_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "출장 (C-3-4)"],
    title: "단기 출장 비자 — C-3-4",
    docs: [
      "비자신청서 (visa.go.kr에서 출력, 사진 부착)",
      "유효한 여권 — 원본 + 사본 (잔여 유효기간 6개월 이상)",
      "여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)",
      "한국 회사의 초청장 — 회사 레터헤드에 서명",
      "한국 초청 회사의 사업자등록증명원",
      "캐나다 고용주의 재직증명서 (직책 및 급여 지급 주체가 캐나다 회사임을 확인)",
      "왕복 항공 일정",
      "  ▸ 캐나다 PR카드 또는 장기 비자 — 원본 + 사본 (해당 시)",
    ],
    costs: [
      { label: "단수", value: "CAD $26 (현금, Debit, 신용카드)" },
      { label: "복수", value: "CAD $52 (현금, Debit, 신용카드)" },
    ],
    time: "약 5~7 영업일",
    notices: [
      "🇨🇦 캐나다 국적자는 업무 목적으로 최대 90일 무비자 입국 가능 — 비자가 실제로 필요한지 먼저 확인하세요.",
      "급여는 반드시 캐나다 고용주가 지급해야 함 — 한국 회사가 아님.",
      "체류: 최대 90일. C-3 비자는 한국 내에서 다른 비자로 전환 불가.",
      "성수기에는 처리가 더 걸릴 수 있으니 최소 2주 전 준비.",
    ],
  },

  visa_c31_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "일반 (C-3-1)"],
    title: "일반 단기방문 비자 — C-3-1",
    docs: [
      "비자신청서 (visa.go.kr에서 출력, 사진 부착)",
      "유효한 여권 — 원본 + 사본 (잔여 유효기간 6개월 이상)",
      "여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)",
      "방문 목적별 증빙서류 (아래 중 하나):",
      "  ▸ 회의·행사: 초청장 또는 행사 등록 확인서",
      "  ▸ 치료: 한국 병원·클리닉의 예약 확인 서한",
      "  ▸ 학술연구: 한국 대학·기관의 서한",
      "  ▸ 연수: 연수 프로그램 입학허가서",
      "  ▸ 종교활동: 한국 종교단체 초청장",
      "재정능력 증빙 (최근 은행 거래내역서)",
      "왕복 항공 일정",
      "  ▸ 캐나다 PR카드 또는 장기 비자 — 원본 + 사본 (해당 시)",
    ],
    costs: [
      { label: "단수", value: "CAD $26 (현금, Debit, 신용카드)" },
      { label: "복수", value: "CAD $52 (현금, Debit, 신용카드)" },
    ],
    time: "약 5~7 영업일",
    notices: [
      "🇨🇦 캐나다 국적자는 최대 6개월 무비자 방문 가능 — 비자가 실제로 필요한지 먼저 확인하세요.",
      "체류: 1회 입국당 최대 90일. C-3 비자는 한국 내에서 다른 비자로 전환 불가.",
      "모든 서류는 한 번에 함께 제출 — 한 가지라도 누락되면 접수되지 않습니다.",
    ],
  },

  visa_c33_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "치료 (C-3-3)"],
    title: "치료 비자 — C-3-3",
    docs: [
      "비자신청서 — 출력, 작성, 서명",
      "유효한 여권 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "여권용 컬러사진 1매 — 반드시 전문 사진관 촬영",
      "  ▸ 3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재",
      "캐나다 거주 증빙 — 원본 + 사본",
      "  ▸ 영주권자: 유효한 PR카드",
      "  ▸ 장기체류자: 유효한 Work Permit 또는 Study Permit",
      "의료목적 입증서류 (의료목적 입증서류) — 3개월 이내 발급",
      "  ▸ 한국 병원이 발급한 초청장 또는 진료 예약 확인서",
      "한국 병원·의료기관의 사업자등록증",
      "의료관광 유치기관 등록증",
      "  ▸ 한국 병원·의료기관에서 발급",
      "재정능력 증빙 (아래 중 하나):",
      "  ▸ 3개월 이내 발급 재직증명서 + 최근 2개월 급여명세서",
      "  ▸ 또는 최근 2개월 캐나다 은행 거래내역서",
    ],
    costs: [
      { label: "비자 수수료", value: "CAD $54 (현금, Debit, 신용카드)" },
      { label: "기타 국적", value: "국적에 따라 수수료 상이" },
    ],
    time: "약 2주. 단수, 발급일로부터 3개월 유효. 입국일로부터 최대 90일 체류.",
    notices: [
      "⚠️ 이 비자는 주로 캐나다 거주 비(非)캐나다 국적자용 — 캐나다 여권 소지자는 치료 목적 무비자 입국 가능.",
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "모든 의료 서류는 신청일 기준 3개월 이내 발급분이어야 함.",
      "경유 승객: 신청 전 영사관 홈페이지에서 TWOV 조건 확인.",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  // ── 취업 (Work) ──
  visa_work_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업"],
    question: "한국에서 어떤 종류의 일을 하시나요?",
    sub: "본인 상황에 맞는 비자를 선택하세요. E-1~E-7 비자의 경우, 한국 고용주가 visa.go.kr에서 사증발급인정서(CVI)를 먼저 받아야 하며, 이후 신청자가 그것을 영사관에 제출합니다.",
    options: {
      visa_e2_1_en:  { title: "E-2-1 — 외국어 강사 (CVI 보유)", desc: "사설 학원·공립학교·기업 기관에서 강의 — 고용주의 CVI 필요" },
      visa_e2_2_en:  { title: "E-2-2 — EPIK / TALK 보조교사", desc: "정부 지원 영어 보조교사 프로그램 — 임용예정확인서 필요" },
      visa_e1_e7_en: { title: "E-1~E-7 — 기타 취업비자 (CVI 보유)", desc: "교수 · 연구 · 기술지도 · 전문직 · 예술 · 특정활동" },
      visa_c45_en:   { title: "C-4-5 — 단기취업 (최대 90일)", desc: "영어캠프 강사 · 모델/공연자 · 기업 파견 — CVI 불필요" },
      visa_h1_en:    { title: "H-1 — 워킹홀리데이", desc: "만 18~35세 · 최대 2년 한국에서 일하며 여행" },
      visa_f1d_en:   { title: "F-1-D — 디지털노마드 (워케이션)", desc: "비한국 고용주를 위해 원격근무 — 최대 1년 체류" },
    },
  },

  visa_c45_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "C-4-5 단기취업"],
    question: "어떤 C-4-5 유형에 해당하시나요?",
    sub: "C-4-5는 한국에서의 단기 유상활동(최대 90일)을 다룹니다. 활동 유형을 선택하세요 — 유형마다 필요 서류가 다릅니다.",
    options: {
      visa_c45_camp_en:     { title: "영어캠프 강사", desc: "한국 캠프 또는 평생교육시설에서 영어 강의" },
      visa_c45_model_en:    { title: "모델 / 공연자 / 연예", desc: "패션모델, 광고, 공연, 광고 촬영" },
      visa_c45_dispatch_en: { title: "기업 파견", desc: "용역계약에 따라 한국 기업에 파견 — 캐나다 고용주가 급여 지급" },
    },
  },

  visa_c45_camp_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "C-4-5", "영어캠프 강사"],
    title: "C-4-5 — 영어캠프 강사",
    docs: [
      "비자신청서 — 출력 및 작성",
      "여권 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "한국 초청기관의 사업자등록증 또는 등기부등본",
      "고용계약서 — 양 당사자 서명 및 날짜 기재",
      "한국 회사의 초청장",
      "  ▸ 포함 사항: 신청자 정보, 활동 내용, 예정 기간, 한국 내 연락책임자(주소 전체 + 전화번호)",
      "평생교육시설등록증 및 평생교육시설 신고수리",
      "대학 학위증 원본",
      "  ▸ 캐나다 외 발급 학위: 영사관 관할 공증 또는 아포스티유 필요",
      "영어캠프 운영일정표 및 강의시간표",
      "RCMP 지문 범죄경력증명서 — 6개월 이내 발급",
      "  ▸ 수령 후 한국 영사관 공증 필요",
      "밀봉된 대학 성적증명서",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $54 (현금 또는 Debit)" }],
    time: "약 2주. 단수, 발급일로부터 3개월 유효. 최대 90일 체류.",
    notices: [
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "⚠️ RCMP 범죄경력증명서는 지문 기반이어야 하며 한국 영사관 공증 필요 — 성명 기반 불가.",
      "과거 한국 국적 보유 이력이 있으면: 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출 (2008년 이전 국적이탈이면 제적등본).",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  visa_c45_model_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "C-4-5", "모델 / 공연자"],
    title: "C-4-5 — 모델 / 공연자 / 연예",
    docs: [
      "비자신청서 — 출력 및 작성",
      "여권 원본 + 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "한국 초청기관의 사업자등록증 또는 등기부등본",
      "공연 개요서",
      "고용계약서 및 공연 개요 (패션모델 계약, 광고 계약 등)",
      "  ▸ 참가 행사별 보수/인센티브 명시",
      "관계 부처 장관의 추천서 / 고용 증명:",
      "  ▸ 연예활동: 영상물등급위원회 추천서 + 연예활동 개요서",
      "  ▸ 광고 / 패션모델: 문화체육관광부 장관 추천서",
      "한국콘텐츠진흥원(KOCCA) 발급 대중문화예술기획업 등록증",
      "부가가치세 과세표준증명/매출과세표준",
      "납세증명서",
      "신원보증서 (Personal Reference Letter)",
      "이력서 / 포트폴리오",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $54 (현금 또는 Debit)" }],
    time: "약 2주. 단수, 발급일로부터 3개월 유효. 최대 90일 체류.",
    notices: [
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "과거 한국 국적 보유 이력이 있으면: 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출 (2008년 이전 국적이탈이면 제적등본).",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  visa_c45_dispatch_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "C-4-5", "기업 파견"],
    title: "C-4-5 — 한국 기업 파견",
    docs: [
      "비자신청서 — 출력 및 작성",
      "여권 원본 + 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "한국 초청기관의 사업자등록증 또는 등기부등본",
      "캐나다 회사의 재직증명서",
      "  ▸ 포함 사항: 신청자 정보, 한국 내 업무 활동 내용, 예정 기간, 캐나다 내 연락책임자(주소 전체 + 전화번호), 비용을 캐나다 회사가 부담함(한국 회사가 아님)을 확인",
      "양 회사 간 고용/용역 계약서",
      "사업 관계 증빙 (예: 거래 내역, 수출입 면허, 양 회사 간 계약서)",
      "항공 일정 및 체류 세부사항",
      "  ▸ 변경 가능한 항공권 권장 또는 항공 일정표만 제출",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $54 (현금 또는 Debit)" }],
    time: "약 2주. 단수, 발급일로부터 3개월 유효. 최대 90일 체류.",
    notices: [
      "⚠️ 반드시 캐나다 회사에 고용되어 급여를 받아야 함 — 한국 회사가 아님.",
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "과거 한국 국적 보유 이력이 있으면: 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출 (2008년 이전 국적이탈이면 제적등본).",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  visa_e2_1_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "E-2-1 외국어 강사"],
    title: "E-2-1 — 외국어 강사 (CVI 보유자)",
    docs: [
      "비자신청서 — 첨부 양식 출력 및 작성",
      "유효한 캐나다 여권 — 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "여권용 컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "서명된 고용계약서 — 신청자와 교육기관 양측 서명",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $81 (현금, Debit, 신용카드 또는 Money Order)" }],
    time: "약 2주. 단수, 발급일로부터 90일 유효. 최대 2년 체류 (통상 13개월).",
    notices: [
      "⚠️ 한국 고용주가 visa.go.kr에서 먼저 사증발급인정서(CVI) 번호를 받아야 함 — 신청자 혼자 시작할 수 없음.",
      "⚠️ E-2-1은 발급일로부터 90일 유효한 단수비자 — 기간 내 입국 필수.",
      "⚠️ 신청 가능 국적: 캐나다, 미국, 영국, 호주, 뉴질랜드, 아일랜드, 남아프리카공화국에 한함.",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
      "한국계 신청자는 국적 상태 확인을 위해 국적 서류(기본증명서, 가족관계증명서, 제적등본) 제출이 요구될 수 있음.",
      "⚠️ 복수국적자(한국·외국 국적 동시 보유)는 비자 신청 불가 — 한국 여권을 발급받아야 함.",
      "과거 한국 국적 보유 이력이 있으면: 먼저 국적상실신고 절차 완료.",
      "  ▸ 2008년 이후 국적이탈 신고: 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출.",
      "  ▸ 2008년 이전 신고: 제적등본 제출.",
    ],
  },

  visa_e2_2_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "E-2-2 EPIK / TALK"],
    title: "E-2-2 — EPIK / TALK 보조교사 비자",
    docs: [
      "비자신청서 — 첨부 양식 출력 및 작성",
      "유효한 캐나다 여권 — 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "여권용 컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "임용예정확인서 — EPIK 또는 TALK 프로그램 발급",
      "서명된 고용계약서 — 신청자와 교육기관 양측 서명",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 단수, 발급일로부터 90일 유효. 최대 2년 체류 (통상 계약기간 + 1개월).",
    notices: [
      "⚠️ E-2-2는 정부 지원 EPIK(English Program in Korea) 및 TALK(Teach and Learn in Korea) 참가자 전용.",
      "⚠️ E-2-1과 달리 visa.go.kr의 CVI가 필요 없음 — 임용예정확인서가 이를 대체.",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
      "⚠️ 복수국적자(한국·외국 국적 동시 보유)는 비자 신청 불가.",
      "과거 한국 국적 보유 이력이 있으면: 먼저 국적상실신고 절차 완료.",
      "  ▸ 2008년 이후 국적이탈 신고: 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출.",
      "  ▸ 2008년 이전 신고: 제적등본 제출.",
    ],
  },

  visa_e1_e7_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "E-1~E-7 (CVI)"],
    title: "E-1~E-7 — 취업비자 (CVI 보유자)",
    docs: [
      "사증발급인정서 소지자용 비자신청서 — 출력, 작성, 하단 서명",
      "유효한 캐나다 여권 — 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit도 제출",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "서명된 고용계약서 — 신청자와 초청자 양측 서명",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $81 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 단수, 발급일로부터 90일 유효 (체류기간은 사증발급인정서 기재대로).",
    notices: [
      "📌 대상 비자 유형:",
      "  ▸ E-1 — 교수: 고등교육법상 대학·교육기관에서 강의",
      "  ▸ E-3 — 연구: 자연과학·첨단기술·사회과학·인문학·예술·체육 분야의 한국 공·사 기관 연구",
      "  ▸ E-4 — 기술지도: 한국에 없는 자연과학·첨단기술 분야 특수 기술·전문지식",
      "  ▸ E-5 — 전문직업: 법률·회계·의료 등 해외에서 인증된 전문직 또는 한국법이 인정하는 분야",
      "  ▸ E-6 — 예술흥행: 음악·미술·문학·체육·연예·광고·패션모델 등 수익 목적 활동",
      "  ▸ E-7 — 특정활동: 법무부장관이 특별히 지정하는 활동",
      "⚠️ 한국 고용주 또는 초청자가 visa.go.kr에서 먼저 사증발급인정서(CVI)를 받아야 함 — 신청자 혼자 시작할 수 없음.",
      "비자 유형·직종에 따라 심사 과정에서 추가 서류가 요청될 수 있음.",
      "과거 한국 국적 보유 이력이 있으면: 먼저 국적상실신고 절차 완료.",
    ],
  },

  visa_h1_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "H-1 워킹홀리데이"],
    title: "H-1 — 워킹홀리데이 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "여권 원본 + 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "워킹홀리데이 계획서 — 여행 일정 및 활동 계획 명시, 하단 날짜·서명",
      "이력서(CV) — 경력 설명",
      "최종 학력 증명서 — 최고 학력 또는 졸업 증빙",
      "  ▸ 영사관 관할(온타리오, 매니토바) 외 지역이면 변호사 또는 공증인의 공증 필요",
      "RCMP 지문 범죄경력증명서 — 6개월 이내 발급",
      "  ▸ 복수국적자: 다른 국가의 범죄경력증명서(아포스티유 포함)도 제출",
      "  ▸ 최근 5년 내 타국에 1년 이상 거주: 해당국 범죄경력증명서(아포스티유 포함)도 제출",
      "의사 건강검진 — 3개월 이내 발급",
      "  ▸ 포함 항목: 흉부 X-ray, 소변검사, 혈액검사, HIV 검사",
      "건강/의료 보험 — 한국 체류 전 기간 유효 유지",
      "  ▸ 최소 보장: 4,000만 원",
      "  ▸ 본국 귀환 및 체류 중 치료 비용 보장 필요",
      "은행 직인 날인된 은행 잔고증명서 — 최소 첫 3개월 여행 경비 충당 능력 증빙",
      "왕복 항공 일정",
      "여행 일정표",
      "  ▸ 비자 승인 전 항공권 구매 금지",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $121.50 (현금, Debit, 신용카드 또는 Money Order)" }],
    time: "약 1~2주. 복수비자, 최대 2년 유효.",
    notices: [
      "신청 자격: 비자 발급 시점에 만 18~35세인 캐나다 국적자로 현재 캐나다 거주.",
      "⚠️ 과거 한국 워킹홀리데이 프로그램에 참가한 적이 없어야 함 — 평생 1회만 참가 가능.",
      "⚠️ H-1 비자 소지자는 동반 가족을 데려올 수 없음.",
      "이 프로그램은 기본적으로 여행 휴가가 목적 — 취업은 여행 경비 보충 용도에 한함.",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
      "⚠️ 복수국적자(한국·외국 국적 동시 보유)는 신청 불가 — 한국 여권을 발급받아야 함.",
      "과거 한국 국적 보유 이력이 있으면: 먼저 국적상실신고 절차 완료.",
      "  ▸ 2008년 이후 국적이탈 신고: 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출.",
      "  ▸ 2008년 이전 신고: 제적등본 제출.",
    ],
  },

  visa_f1d_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "취업", "F-1-D 디지털노마드"],
    title: "F-1-D — 디지털노마드 (워케이션) 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "여권 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "재직증명서 — 현재 재직 및 1년 이상 재직 이력 증빙",
      "  ▸ 신청일 기준 2주 이내 발급",
      "급여/소득 증빙 (3가지 모두 필요):",
      "  ▸ 3개월 급여명세서",
      "  ▸ 3개월 은행 잔고증명서",
      "  ▸ 2년 세무신고서 (Notice of Assessment / NOA)",
      "아포스티유된 RCMP 증명서 — 지문 기반, 3개월 이내 발급",
      "의료보험 증빙 (보장 내역 포함):",
      "  ▸ 체류 중 치료 및 본국 귀환 항공편에 대해 약 CAD $130,000 보장 필요",
      "가족관계증명서 — 동반 가족 신청 시에만 필요",
      "  ▸ 가족 구성원 각자 본인 여권 원본 및 신청서 필요",
      "  ▸ 한국어·영어가 아닌 서류는 공증된 영문 번역 첨부",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $121.50 (현금, Debit, 신용카드)" }],
    time: "약 1~2주. 복수비자, 발급일로부터 최대 1년 유효.",
    notices: [
      "신청 자격: 외국(비한국) 회사에 1년 이상 재직 중이거나 외국 등록 회사의 소유주 — 한국에서 원격근무가 가능해야 함.",
      "소득 요건 (2024년 GNI 기준): 세전 연 약 9,990만 원 또는 월 약 832만 5천 원 이상.",
      "  ▸ 한국 1인당 GNI의 2배 기준 — 매년 변동. 신청 전 현재 기준 확인.",
      "⚠️ 범죄경력이 없어야 함.",
      "⚠️ 이 비자로는 한국 회사·기관에 고용되거나 소득을 받을 수 없음.",
      "체류: 발급일로부터 최대 1년, 1년 추가 연장 가능 (최대 총 2년).",
      "90일 초과 체류: 입국 후 90일 이내 관할 출입국사무소(hikorea.go.kr) 등록.",
      "동반 가족(배우자·미성년 자녀)은 동반 가능 — 각자 별도 신청.",
      "과거 한국 국적 보유 이력이 있으면: 먼저 국적상실신고 절차 완료.",
      "  ▸ 3개월 이내 발급 가족관계증명서(상세) + 기본증명서(상세) 제출 (2008년 이전 국적이탈이면 제적등본).",
    ],
  },

  // ── 유학 (Study) ──
  visa_study_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "유학"],
    question: "어떤 유형의 학업 프로그램에 등록하시나요?",
    sub: "아래 유학 비자는 모두 단수이며 발급일로부터 3개월 유효합니다. 본인 프로그램에 맞는 것을 선택하세요.",
    options: {
      visa_d2_6_en: { title: "D-2-6 — 교환학생", desc: "대학 교환 프로그램 — 현재 캐나다 학교에서 최소 1학기 이수 필요" },
      visa_d2_8_en: { title: "D-2-8 — 단기 대학 연수", desc: "여름·겨울학기 포함 1년 미만 — 한국어 프로그램용 아님" },
      visa_d4_1_en: { title: "D-4-1 — 한국어 연수", desc: "대학 부설 어학원에서 한국어 연수 — 최소 고졸 학력" },
      visa_d4_3_en: { title: "D-4-3 — 초·중·고교", desc: "한국 초등학교·중학교·고등학교 재학" },
    },
  },

  visa_d2_6_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "유학", "D-2-6 교환학생"],
    title: "D-2-6 — 교환학생 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "유효한 캐나다 여권 — 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "표준입학허가서 — 한국 대학의 학장 또는 총장 발급",
      "  ▸ 학생의 학업 정보 및 재정 상태 포함",
      "한국 기관의 사업자등록증",
      "교환학생 신분 증빙 서류:",
      "  ▸ 초청 대학의 공식 서류",
      "  ▸ 대학 간 교환학생 협정서",
      "현재 캐나다 학교에서 최소 1학기 이수 증빙:",
      "  ▸ 공식 재학증명서 (등록금 영수증·스크린샷 불가)",
      "재정능력 증빙 (1년 등록금 + 생활비):",
      "  ▸ 은행 직인 날인된 잔고증명서",
      "  ▸ 부모 계좌 사용 시: 부모 서명 동의서 + Certified Copy of Birth Registration 또는 Statement of Live Birth",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $81 (현금, Debit, 신용카드 또는 Money Order)" }],
    time: "약 1~2주. 단수, 발급일로부터 3개월 유효. 최대 1년 체류 (입학허가서 기준).",
    notices: [
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자(임시 근로자, 유학생 등)는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "한국계 또는 과거 한국 국적자는 추가 제출:",
      "  ▸ 한국계(출생 전 부모가 캐나다 시민권 취득): 부모 양쪽 여권 사본 + 캐나다 시민권증서(카드 아님)",
      "  ▸ 2008년 이후 국적이탈: 기본증명서(상세, 전부공개) + 가족관계증명서(상세, 전부공개) — 3개월 이내. 2페이지면 양쪽 모두 제출.",
      "  ▸ 2008년 이전 국적이탈: 제적등본 — 3개월 이내",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  visa_d2_8_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "유학", "D-2-8 단기 대학 연수"],
    title: "D-2-8 — 단기 대학 연수 비자 (1년 미만)",
    docs: [
      "비자신청서 — 출력 및 작성",
      "  ▸ 한국 내 주소(8.4 항목): 새 도로명주소 체계 사용",
      "유효한 캐나다 여권 — 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "표준입학허가서 — 한국 대학의 학장 또는 총장 발급",
      "  ▸ 학생의 학업 정보 및 재정 상태 포함",
      "한국 기관의 사업자등록증",
      "현재 캐나다 대학·칼리지 재학증명:",
      "  ▸ 공식 서한이어야 함 — 등록금 납부 확인서·강의 페이지 스크린샷 불가",
      "재정능력 증빙 (체류 기간 등록금 + 생활비):",
      "  ▸ 은행 직인 날인된 잔고증명서",
      "  ▸ 부모 계좌 사용 시: 부모 서명 동의서 + Certified Copy of Birth Registration 또는 Statement of Live Birth 원본·사본",
    ],
    costs: [
      { label: "90일 미만 프로그램", value: "CAD $54 (현금, Debit, 신용카드)" },
      { label: "90일 이상 프로그램", value: "CAD $81 (현금, Debit, 신용카드)" },
    ],
    time: "약 2주. 단수, 발급일로부터 3개월 유효. 최대 1년 체류 (입학허가서 기준).",
    notices: [
      "⚠️ 한국어 학습 프로그램이라면 이 비자가 아니라 D-4-1을 신청하세요.",
      "⚠️ D-2-8 소지자는 어떠한 유상활동(아르바이트 등)도 금지 — 위반 시 출입국관리법 제94·95조에 따라 처벌.",
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  visa_d4_1_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "유학", "D-4-1 한국어 연수"],
    title: "D-4-1 — 한국어 연수 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "유효한 캐나다 여권 — 원본 + 사진·인적사항면 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 비캐나다인: PR카드 사본 또는 유효한 캐나다 Work/Study Permit",
      "컬러사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재)",
      "입학허가서 — 어학원의 원장 또는 총장 발급",
      "  ▸ 학생의 학업 정보 및 재정 상태 포함",
      "기관의 사업자등록증",
      "연수 계획서 — 강의 일정, 강사 프로필, 연수 시설 정보 등",
      "재학증명서 또는 최종 학력 증빙:",
      "  ▸ 비OECD 국가 신청자: 아포스티유 공증 또는 한국 영사·주한 해당국 영사 확인 서류 제출",
      "재정능력 증빙 (1년 등록금 + 생활비):",
      "  ▸ 부모 계좌 사용 시: 부모 서명 동의서 + Certified Copy of Birth Registration 또는 Statement of Live Birth",
    ],
    costs: [{ label: "비자 수수료 (캐나다인)", value: "CAD $81 (현금, Debit, 신용카드 또는 Money Order)" }],
    time: "약 1~2주. 단수, 발급일로부터 3개월 유효. 최대 1년 체류 (입학허가서 기준).",
    notices: [
      "신청 자격: 최소 고등학교 졸업 또는 동등 학력 보유.",
      "프로그램은 한국 내 외국교육기관 부설 어학원 또는 고등교육법상 고등교육기관이어야 함.",
      "⚠️ 특정 국가 출신으로 현재 캐나다 체류 중인 신청자는 신청 전 캐나다에 최소 2년(730일) 연속 거주해야 함.",
      "한국계 또는 과거 한국 국적자는 추가 제출:",
      "  ▸ 한국계(출생 전 부모가 캐나다 시민권 취득): 부모 양쪽 여권 사본 + 캐나다 시민권증서(카드 아님)",
      "  ▸ 2008년 이후 국적이탈: 기본증명서(상세, 전부공개) + 가족관계증명서(상세, 전부공개) — 3개월 이내. 2페이지면 양쪽 모두 제출.",
      "  ▸ 2008년 이전 국적이탈: 제적등본 — 3개월 이내",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  visa_d4_3_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "유학", "D-4-3 초·중·고교"],
    title: "D-4-3 — 초·중·고교 비자",
    docs: [
      "비자신청서 + 후견인 동의서 — 둘 다 출력 및 작성",
      "유효한 캐나다 여권 — 원본 + 사본",
      "  ▸ 잔여 유효기간 최소 6개월 이상",
      "  ▸ 복수국적자: 가능하면 두 여권 모두 제시",
      "캐나다 거주 증빙 — 원본 + 사본",
      "  ▸ 유효한 PR카드, Work Permit 또는 Study Permit",
      "여권용 컬러사진 1매 — 반드시 전문 여권사진관 촬영",
      "  ▸ 3.5×4.5cm, 흰 배경, 6개월 이내, 뒷면 날짜 기재",
      "입학허가서 (학교장 발행 입학허가서) — 한국 학교장 발급",
      "  ▸ 학교가 제공하는 교장 직인 공식 양식",
      "기관의 사업자등록증",
      "최종 학력 증빙 — 졸업증명서 또는 재학증명서",
      "학비 납부 영수증:",
      "  ▸ 등록금, 기숙사비, 입학금 등 관련 비용 일체",
      "  ▸ 전액 장학생: 장학 증빙 서류로 대체 제출",
      "가족관계 서류 — 정부 발급 출생증명서",
      "  ▸ 영문이 아니면: 영문 번역 후 변호사 공증",
      "은행 거래내역서 — 최근 3개월 (신청자 이름이 명확히 표시되어야 함)",
    ],
    costs: [
      { label: "비자 수수료 (캐나다인)", value: "CAD $81 (현금, Debit, 신용카드)" },
      { label: "기타 국적", value: "국적에 따라 수수료 상이" },
    ],
    time: "약 1~2주. 단수, 발급일로부터 3개월 유효. 최대 1년 체류 (입학허가서 기준).",
    notices: [
      "⚠️ 이 비자는 초·중등교육법 제10조의2 및 제12조에 따른 의무(무상)교육 학교 진학 예정 학생에게는 일반적으로 발급되지 않음.",
      "대상 학교: 초·중등교육법상 초·중·고교, 또는 경제자유구역 및 제주국제도시 외국교육기관 설립·운영에 관한 특별법상 외국교육기관.",
      "한국 혈통 신청자: 복수국적 확인 서류 필요 — 개인 상황에 따라 서류가 다름.",
      "심사 과정에서 추가 서류가 요청될 수 있음.",
    ],
  },

  // ── 관광·경유 (Visit / Transit) ──
  visa_visit_transit_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "방문 / 경유"],
    question: "어떤 종류의 방문인가요?",
    sub: "🇨🇦 캐나다 여권 소지자는 최대 6개월 무비자 — 비자가 필요 없습니다. K-ETA는 2026년 12월 31일까지 면제. 그 외 국적은 무비자 가능 여부·체류 기간이 다르므로, 서울시 공식 비자 안내(visitseoul.net/visa)에서 본인 국적 기준을 확인하세요.",
    options: {
      visa_visit_en:        { title: "관광 / 단기체류 — 캐나다 국적자", desc: "최대 6개월 무비자 — 영사관 방문 불필요 / 국적별 상이 (30일~6개월)" },
      visa_transit_en:      { title: "한국 경유 (TWOV)", desc: "다른 나라로 가는 길에 한국 경유 — 최대 30일" },
      visa_keta_en:         { title: "K-ETA — 필요한가요?", desc: "캐나다인은 2026년 12월 31일까지 면제" },
    },
  },

  visa_visit_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "한국 방문"],
    title: "한국 방문 — 관광 / 단기체류",
    docs: [
      "🇨🇦 캐나다 여권 소지자: 비자 불필요",
      "  ▸ 캐나다 여권으로 그냥 입국 — 영사관 방문 불필요",
      "  ▸ 무비자 체류: 1회 입국당 최대 6개월",
      "  ▸ 캐나다인은 2026년 12월 31일까지 K-ETA 면제",
      "캐나다 거주 비(非)캐나다 국적자 — 단기방문비자 필요:",
      "  ▸ 비자신청서 — 한국비자포털(visa.go.kr)에서 출력, 사진 부착",
      "  ▸ 유효한 여권 — 원본 + 사본 (잔여 유효기간 6개월 이상)",
      "  ▸ 여권용 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)",
      "  ▸ 재정능력 증빙 (최근 은행 거래내역서)",
      "  ▸ 왕복 항공 일정",
      "  ▸ 숙소 증빙 (호텔 예약 또는 초청장)",
      "  ▸ 캐나다 PR카드 또는 장기 비자 — 원본 + 사본",
    ],
    costs: [
      { label: "캐나다 국적자", value: "비자 불필요" },
      { label: "단수 (기타 국적)", value: "CAD $26 (현금, Debit, 신용카드)" },
      { label: "복수 (기타 국적)", value: "CAD $52 (현금, Debit, 신용카드)" },
    ],
    time: "약 5~7 영업일 (비자 신청자만 해당)",
    notices: [
      "🇨🇦 캐나다 여권 소지자: 무비자 입국 — 영사관 방문 불필요.",
      "무비자 체류는 입국 시 출입국심사관의 재량에 따름.",
      "단기방문비자는 한국 내에서 연장·전환 불가.",
      "한국 혈통이 있으면(부모·조부모가 한국인): F-4 재외동포 비자 대상일 수 있음 — 뒤로 가서 한국 혈통 옵션 선택.",
      "한국 경유는 뒤로 가서 '한국 경유' 선택.",
      "신청 전 한국비자포털(visa.go.kr)에서 본인 국적 요건 확인.",
    ],
  },

  visa_c39_tourist_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "관광 (C-3-9)"],
    title: "C-3-9 관광비자 — 비(非)캐나다 국적자",
    docs: [
      "비자신청서 — visa.go.kr에서 출력, 모든 항목 작성",
      "유효한 여권 — 원본 + 사본 (잔여 유효기간 6개월 이상)",
      "여권 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내 촬영)",
      "캐나다 PR카드 또는 장기 캐나다 비자 — 원본 + 사본",
      "왕복 항공 일정 (왕복 항공권 또는 예약)",
      "호텔 예약 또는 숙소 확인서",
      "재정능력 증빙 (최근 은행 거래내역서 — 최근 3~6개월)",
      "  ▸ 한국 내 친지 방문 시: 초청장 + 초청인의 한국 신분증·거주증 사본",
    ],
    costs: [
      { label: "표준 수수료 (대부분 국적)", value: "CAD $26 — 단수 / CAD $52 — 복수" },
      { label: "이란", value: "USD $90 상당" },
      { label: "우즈베키스탄 / 키르기스스탄", value: "USD $80 상당" },
      { label: "참고", value: "국적별 수수료 상이 — 신청 전 torvisa@mofa.go.kr 확인" },
    ],
    time: "약 5~10 영업일",
    notices: [
      "C-3-9는 관광, 친지 방문, 단기 여가를 위한 표준 관광비자 — 최대 90일.",
      "⚠️ 비자는 발급일로부터 3개월 유효 — 기간 내 입국 필수.",
      "⚠️ C-3 비자는 한국 내에서 연장·전환 불가.",
      "⚠️ 국적별 수수료 차이가 큼 — 표준 CAD $26이 모든 국적에 적용되지 않음 (예: 이란 약 USD $90).",
      "⚠️ C-3-9는 완전 온라인 비자가 아님 — visa.go.kr에서 신청서 작성·출력 후 영사관에 직접 제출 (차로 2시간 이상 거주자는 우편).",
      "우편 신청 가능 (영사관에서 차로 2시간 이상 거주자) — Certified Cheque + Prepaid Xpresspost 반송봉투 동봉.",
      "최신 요건은 visa.go.kr 확인, 국적별 문의는 torvisa@mofa.go.kr.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_keta_en: {
    breadcrumb: ["홈", "비자 (사증)", "K-ETA"],
    title: "K-ETA — 한국 전자여행허가",
    docs: [
      "📱 K-ETA는 온라인 신청 — 영사관 방문 불필요",
      "  ▸ 신청처: k-eta.go.kr 또는 K-ETA 모바일 앱",
      "  ▸ 유효한 여권 (입국 시 사용할 동일 여권)",
      "  ▸ 사진 (디지털, 6개월 이내 촬영)",
      "  ▸ USD $10 수수료 결제용 신용·체크카드",
      "  ▸ 한국 내 숙소 주소",
    ],
    costs: [{ label: "K-ETA 수수료", value: "USD $10 (온라인)" }],
    time: "보통 72시간 이내 (출발 최소 72시간 전 신청)",
    notices: [
      "🇨🇦 캐나다 여권 소지자: K-ETA는 2026년 12월 31일까지 면제.",
      "  ▸ 해당 기간까지 K-ETA 없이 무비자 입국 가능.",
      "  ▸ 면제는 연장되거나 종료될 수 있으니 여행 전 k-eta.go.kr에서 최신 상태 확인.",
      "보통 K-ETA가 필요한 경우: K-ETA 대상국(캐나다 포함 112개국) 국민이 관광·경유·단기 업무로 방문 시 — 면제 기간 종료 후.",
      "K-ETA는 승인일로부터 2년 유효, 1회당 최대 90일씩 복수 입국 가능.",
      "K-ETA 미적용: 정식 비자가 필요한 경우 (예: 비대상 국적, 취업·유학 목적).",
      "⚠️ K-ETA나 무비자 입국이더라도 최종 입국 허가는 입국심사관의 재량.",
      "비캐나다 여권(예: 인도·필리핀) 소지자로 캐나다 거주 시: 본인 국적의 비자/K-ETA 요건을 visa.go.kr에서 별도 확인.",
    ],
  },

  // ── 경유 (TWOV) 3단계 흐름 ──
  visa_transit_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "경유 (TWOV)"],
    question: "1단계 — 국적이 어디인가요?",
    sub: "TWOV(무비자 환승)는 비자 없이 한국에 최대 30일 체류를 허용 — 단, 특정 국적과 여행 경로에만 적용됩니다.",
    options: {
      visa_transit_canadian_en:   { title: "캐나다 국적자", desc: "한국 무비자 입국 — TWOV 불필요" },
      visa_transit_ineligible_en: { title: "제한 국적 중 하나", desc: "파키스탄 · 방글라데시 · 네팔 · 나이지리아 · 가나 · 이집트 · 시리아 · 수단 · 이란 · 쿠바 · 아프가니스탄 · 이라크 · 우즈베키스탄 · 키르기스스탄 · 스리랑카 · 미얀마 · 카메룬 · 세네갈 · 감비아 · 예멘 · 소말리아 · 코소보 · 팔레스타인" },
      visa_transit_step2_en:      { title: "기타 국적 (중국, 인도, 필리핀, 베트남 등)", desc: "TWOV 대상일 수 있음 — 다음 단계에서 확인" },
    },
  },

  visa_transit_canadian_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "캐나다 국적자"],
    title: "✅ 캐나다 국적자 — 비자·TWOV 불필요",
    costs: [{ label: "입국 수수료", value: "없음" }],
    time: "사전 신청 불필요",
    notices: [
      "캐나다 국적자는 최대 6개월 무비자 입국 가능.",
      "TWOV는 한국을 경유하는 비캐나다 국적자를 위한 제도 — 본인에게는 해당 없음.",
      "항공권만 예약하고 캐나다 여권으로 입국하면 됨.",
    ],
  },

  visa_transit_ineligible_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "제한 국적"],
    title: "❌ TWOV 불가 — 비자 필요",
    costs: [{ label: "비자 필요", value: "C-3 단기비자 신청" }],
    time: "약 5~7 영업일",
    notices: [
      "본인 국적이 제한 목록에 있어 유효한 캐나다 PR카드·비자가 있어도 TWOV 불가.",
      "여행 전 한국 단기비자(C-3)를 신청해야 함.",
      "문의: 한국 외국인종합안내센터 +82-2-2100-1345",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_transit_step2_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "2단계 — 캐나다 체류자격"],
    question: "2단계 — 유효한 캐나다 PR카드 또는 캐나다 비자를 보유하고 있나요?",
    sub: "여권에 부착된 실물 스티커여야 함 — 디지털·e비자 상태는 불가 (단, VEVO 시스템으로 확인되는 호주 비자는 예외).",
    options: {
      visa_transit_no_status_en: { title: "아니오 — 유효한 캐나다 PR카드·비자가 없음", desc: "TWOV 불가 — 비자 필요" },
      visa_transit_step3_en:     { title: "예 — 유효한 캐나다 PR카드 또는 실물 비자 스티커 보유", desc: "여행 경로 확인 단계로 진행" },
    },
  },

  visa_transit_no_status_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "캐나다 체류자격 없음"],
    title: "❌ TWOV 불가 — 비자 필요",
    costs: [{ label: "비자 필요", value: "C-3 단기비자 신청" }],
    time: "약 5~7 영업일",
    notices: [
      "TWOV에는 유효한 캐나다 PR카드 또는 실물 캐나다 비자가 필요.",
      "디지털 체류자격·e비자 불가 (예외: VEVO로 확인되는 호주 비자).",
      "여행 전 한국 단기비자(C-3)를 신청해야 함.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_transit_step3_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "3단계 — 여행 경로"],
    question: "3단계 — 여행 경로가 어떻게 되나요?",
    sub: "TWOV는 한국이 경유지일 때만 적용 — 최종 목적지가 한국이면 안 됨.",
    options: {
      visa_transit_ok_en:        { title: "다른 나라 출발 → 한국 → 본국 또는 제3국", desc: "예: 중국 → 한국 → 캐나다  /  캐나다 → 한국 → 중국" },
      visa_transit_roundtrip_en: { title: "캐나다 → 한국 → 다시 캐나다 (왕복만)", desc: "다른 최종 목적지 없음 — 한국만 방문" },
      visa_transit_complex_en:   { title: "한국 전 경유지(최대 3일)가 있는 복합 경로", desc: "예: A국 → 경유(≤3일) → 한국 → 본국" },
    },
  },

  visa_transit_complex_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "복합 경로"],
    title: "✅ TWOV 대상 가능성 높음 — 복합 경로",
    docs: [
      "비자 신청 불필요 — 입국 시 충족 조건:",
      "  ▸ 유효한 캐나다 PR카드 또는 실물 캐나다 비자 스티커",
      "  ▸ 30일 이내 한국 출발 확정 연결 항공편",
      "  ▸ 최근 3년 내 한국 입국 거부 이력 없음",
      "  ▸ 한국 내 불법체류·범법 이력 없음",
      "  ▸ ⚠️ 한국 입국 전 중간 경유는 3일 이하여야 함",
    ],
    costs: [{ label: "입국 수수료", value: "없음 (모든 조건 충족 시)" }],
    time: "사전 신청 없음 — 입국 시 심사",
    notices: [
      "체류: 최대 30일 (B-2 경유 자격).",
      "허용되는 복합 경로 예시:",
      "  ▸ 캐나다 → 한국 → 제3국 → 본국 ✅",
      "  ▸ 본국 → 경유(≤3일) → 한국 → 캐나다 ✅",
      "  ▸ 캐나다 → 경유(≤3일) → 한국 → 본국 ✅",
      "⚠️ 한국 전 경유가 3일을 초과하면 TWOV 불가.",
      "⚠️ TWOV 조건은 변경될 수 있음 — 여행 전 항공사·한국 출입국에 확인.",
      "한국 외국인종합안내센터: +82-2-2100-1345",
    ],
  },

  visa_transit_ok_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "대상"],
    title: "✅ TWOV 대상 가능성 높음",
    docs: [
      "비자 신청 불필요 — 입국 시 충족 조건:",
      "  ▸ 유효한 캐나다 PR카드 또는 실물 캐나다 비자 스티커",
      "  ▸ 30일 이내 한국 출발 확정 연결 항공편",
      "  ▸ 최근 3년 내 한국 입국 거부 이력 없음",
      "  ▸ 한국 내 불법체류·범법 이력 없음 (벌금 500만 원 초과 또는 강제퇴거)",
      "  ▸ 한국 입국 전 중간 경유는 3일 이하여야 함",
    ],
    costs: [{ label: "입국 수수료", value: "없음 (모든 조건 충족 시)" }],
    time: "사전 신청 없음 — 입국 시 심사",
    notices: [
      "체류: 최대 30일 (B-2 경유 자격).",
      "⚠️ TWOV 조건은 변경될 수 있음 — 여행 전 항공사·한국 출입국에 반드시 확인.",
      "⚠️ TWOV는 경유 전용 — 한국 내에서 다른 비자로 전환 불가.",
      "한국 외국인종합안내센터: +82-2-2100-1345",
    ],
  },

  visa_transit_roundtrip_en: {
    breadcrumb: ["홈", "비자 (사증)", "경유 (TWOV)", "대상 아님 — 왕복"],
    title: "❌ TWOV 불가 — 비자 필요",
    costs: [{ label: "비자 필요", value: "C-3 단기비자 신청" }],
    time: "약 5~7 영업일",
    notices: [
      "TWOV는 다른 나라로 가는 길에 한국을 통과(경유)하는 여행자만 해당.",
      "캐나다 → 한국 → 캐나다(한국만 방문)인 경우 TWOV 미적용.",
      "한국 단기방문비자(C-3-1 또는 C-3-4)를 신청해야 함.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  // ── 국적 확인 / 행사 ──
  visa_dual_check_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 국적 확인"],
    title: "⚠️ 먼저 한국 국적 상태를 확인하세요",
    docs: [
      "📌 한국 국적법상 (1998년 6월 14일 이후 출생):",
      "  ▸ 출생 당시 부모 중 한 분이라도 한국 국적자였다면 본인은 자동으로 한국 국적 보유",
      "  ▸ 다음 경우에도 적용: 캐나다에서 출생 · 한국 미방문 · 한국 미등록",
      "  ▸ 다음 경우에도 적용: 부모가 이후 캐나다인이 됨 — 중요한 것은 '본인 출생 당시' 부모의 국적",
      "📌 예시 — 다음에 해당하면 본인 케이스:",
      "  ▸ 출생 당시 어머니가 한국인이었고 이후 캐나다로 귀화 → 한국 국적 보유 가능",
      "  ▸ 출생 당시 아버지가 한국인이었다면 이후 한국 국적을 포기했어도 → 한국 국적 보유 가능",
      "📌 1998년 6월 13일 이전 출생: 한국 국적은 부계(아버지)로만 승계.",
      "⚠️ 이에 해당하면 본인은 한국 국적자 — 비자 신청 불가. 한국 여권을 신청해야 함.",
    ],
    costs: [{ label: "수수료", value: "해당 없음 — 상태 먼저 확인" }],
    time: "상태 확인 후 알맞은 서비스로 진행",
    notices: [
      "⚠️ 출생 당시 부모가 한국인이었다면: 현재 부모의 국적과 무관하게 본인은 한국 국적자일 가능성이 높음.",
      "⚠️ 만 18~37세 한국 국적 남성: 병역 의무가 있을 수 있음 — 이탈 전에 먼저 해결.",
      "한국에 출생신고를 한 적이 없음 → 이 영사관에서 먼저 출생신고 후 한국 여권 신청.",
      "등록은 됐으나 국적선택을 안 함 → 국적선택 또는 국적이탈 신고 — 일반적으로 남성·여성 모두 만 22세 전.",
      "기본증명서에 국적상실이 이미 확인됨 → 이제 F-4 재외동포 비자 또는 일반 비자 신청 가능.",
      "불확실하면 방문 전 영사관에 전화: 416-920-3809",
    ],
    bookingLabel: "예약하기 (국적과) →",
  },

  visa_c31_event_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "단기 방문", "C-3-1 행사/대회"],
    title: "C-3-1 — 행사 / 대회 참가 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "유효한 여권 — 원본 + 사본 (잔여 유효기간 6개월 이상)",
      "여권 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)",
      "캐나다 체류자격 서류 — 원본 + 사본",
      "  ▸ 캐나다 국적자: 불필요 / 영주권자: PR카드 / 장기 비자 소지자: 유효한 비자",
      "주최측 초청장 — 포함 사항: 행사 목적, 일정, 주최측 정보",
      "  ▸ 상금이 있는 경우: 초청장에 상금 액수 명시",
      "  ▸ 주최측이 교통·숙박을 부담하는 경우: 초청장에 명시",
      "주최측의 사업자등록증",
      "캐나다 고용주·학교 발급 재직증명서 또는 재학증명서",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $54 (현금, Debit, 신용카드)" }],
    time: "약 2주 (12~15 영업일)",
    notices: [
      "🇨🇦 캐나다 국적자는 무비자 입국 가능 — 비자가 실제로 필요한지 확인하세요.",
      "대상 활동: 친선경기, 행사, 대규모 컨퍼런스, 음악 대회, 방송 출연 등.",
      "  ▸ 주최측이 항공·숙박을 부담할 수 있음.",
      "  ▸ 상금은 허용 — 단, 숙박비를 초과하는 보수는 불가.",
      "  ▸ 숙박비를 초과하는 보수를 받으면: C-4 단기취업으로 신청.",
      "⚠️ 체류: 최대 90일. C-3 비자는 한국 내에서 다른 비자로 전환 불가.",
      "⚠️ 비자는 발급일로부터 3개월 유효 — 기간 내 입국 필수.",
      "개인 일정에 맞춰 처리기간이 단축되지 않음 — 충분히 미리 신청.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  // ── 결혼이민 (F-6-1) / 우편 / 기타 ──
  visa_marriage_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "결혼이민 (F-6-1)"],
    title: "F-6-1 — 결혼이민 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "유효한 여권 — 원본 + 사본 (잔여 유효기간 6개월 이상)",
      "여권 사진 1매 (3.5×4.5cm, 흰 배경, 6개월 이내)",
      "혼인증명서 — 공인 전부 사본 (약식 Certificate of Marriage 불가):",
      "  ▸ 캐나다에서 혼인: Certified Copy of Marriage Registration 또는 Certified Copy of Marriage License (Legal 사이즈)",
      "  ▸ 타국에서 혼인: 해당국의 가장 상세한 혼인증명서 — 원본 + 사본",
      "  ▸   영문이 아니면: 온타리오·매니토바 공인 번역사 또는 변호사의 공증 영문 번역",
      "  ▸ 한국에서만 혼인신고(캐나다 미등록): 캐나다 혼인등록이 없음을 확인하는 온타리오·매니토바 변호사 진술서(Affidavit)",
      "한국인 배우자 여권 사본",
      "한국인 배우자의 이혼증명서 (이혼 경력 있는 경우) — 캐나다 정부 발급",
      "신청자의 이혼증명서 (이혼 경력 있는 경우)",
      "  ▸ 전 배우자가 한국인·한국계였으면: 한국 혼인관계증명서(상세)도 제출",
      "범죄경력증명서 — 신청자와 한국인 배우자 모두 (아래 면제 참조)",
      "건강검진 — 신청자와 한국인 배우자 모두 (아래 면제 참조)",
      "  ▸ 면제 확인: 현재 면제 기준은 영사관 홈페이지 참조",
      "한국인 배우자의 소득 증빙 (직전 1년, 세전):",
      "  ▸ 최저 소득 기준(2021): 18,528,474원 (2인 가구) — 가구원 추가 시 증가",
      "  ▸ 배우자 본인 소득이 부족하면 가족 소득·자산 활용 가능",
      "임신 20주 이상이며 일부 요건 면제를 요청하는 경우: 의사 진단서(출산예정일 포함) + 면제신청서 제출",
      "신청자가 한국계인 경우: 국적상실·이탈일이 표기된 기본증명서(상세, 3개월 이내)",
      "  ▸ 아직 표기 안 됨: 국적상실신고 접수증도 제출",
      "  ▸ 2008년 1월 1일 이전 국적상실: 제적등본 제출",
    ],
    costs: [{ label: "비자 수수료", value: "CAD $54 (현금 또는 Debit — TAP 선호; 정확한 현금 액수 가능)" }],
    time: "약 12~15 영업일 (추가 심사 시 더 길어질 수 있음)",
    notices: [
      "⚠️ 신청자(외국인 배우자)는 반드시 본인이 직접 방문 신청 — 우편 신청 불가.",
      "⚠️ 신청 전에 한국 혼인신고를 먼저 완료해야 함.",
      "비자: 단수, 90일 체류 — 입국 후 한국 내에서 연장 가능.",
      "⚠️ 비자는 발급일로부터 3개월 유효 — 기간 내 입국 필수.",
      "한국의 혼인을 인정하는 국가(캐나다 포함)에서 혼인한 경우: 캐나다에 재등록 불필요.",
      "외국인 배우자가 다음 국가 출신이면 국제결혼 안내프로그램 이수 필요: 중국, 베트남, 필리핀, 캄보디아, 몽골, 우즈베키스탄, 태국 — 면제 대상 제외.",
      "비자 진행 조회: visa.go.kr",
      "문의: torvisa@mofa.go.kr (제목: F-6-1 비자 문의 — 한국인 배우자 성명 및 신청자 성명)",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_mail_en: {
    breadcrumb: ["홈", "비자 (사증)", "우편 신청 & 진행 조회"],
    title: "비자 — 우편 신청 & 진행 조회",
    docs: [
      "신청하려는 비자의 구비서류 일체 (각 비자 안내 참조)",
      "여권 원본 — 반드시 포함",
      "바깥 봉투 (서류를 담아 보내는 봉투) — 보내는 사람(From): 본인 주소, 받는 사람(To): 영사관 주소로 기재",
      "안에 동봉하는 여권 반송용 봉투 — Prepaid Xpresspost (Canada Post), 보내는 사람·받는 사람(From·To) 모두 본인 이름·주소 (크기 무관)",
      "비자 수수료용 Certified Cheque 또는 Money Order — 수취인 KOREAN CONSULATE TORONTO (개인 수표 불가)",
      "운전면허증 사본 (앞면, 주소 표시)",
    ],
    costs: [{ label: "우편 수수료", value: "방문 신청과 동일 — Certified Cheque만 가능" }],
    time: "방문 신청 처리기간 + 우편 배송 기간",
    notices: [
      "⚠️ 우편 신청은 영사관에서 차로 2시간 이상 거리에 거주하는 분만 가능 (예: 런던, 윈저, 킹스턴, 온타리오).",
      "⚠️ F-6-1 결혼이민 비자 — 우편 신청 불가.",
      "우편 주소: Korean Consulate in Toronto (비자), 555 Avenue Road, Toronto, ON M4V 2J7",
      "전화: 416-920-3809",
      "이메일: torvisa@mofa.go.kr",
      "공관 관할지역: 온타리오 (오타와 제외), 마니토바.",
      "우편 제출 후에도 대면 인터뷰가 요구될 수 있음 (드물게).",
      "비자 진행 조회: visa.go.kr → '재외공관' 선택 → 여권번호·성명 입력 (Last First, 쉼표·하이픈 없이)",
      "  ▸ 예: HONG GILDONG (올바름) / HONG, GILDONG (틀림)",
      "비자 발급 통지서(Visa Grant Notice)를 흑백 또는 컬러로 출력 — 이 출력물이 곧 비자.",
      "  ▸ 출력 설정: 가장자리 잘림 방지를 위해 '페이지에 맞춤' 또는 '인쇄 영역에 맞춤'.",
      "  ▸ 탑승 시 및 한국 도착 시 이 출력물을 반드시 제시.",
    ],
    bookingLabel: "예약하기 (비자과) →",
  },

  visa_others_en: {
    breadcrumb: ["홈", "비자 (사증)", "한국 혈통 없음", "기타"],
    title: "A-2-4 — 공무 / 외교 비자",
    docs: [
      "비자신청서 — 출력 및 작성",
      "외교관·관용·특별 여권 원본 + 사본",
      "컬러사진 1매 (3.5×4.5cm, 6개월 이내)",
      "현재 재직 상태를 증명하는 서류",
      "파견·고용 상태 증빙 서류, 또는 신청자 국가의 외교부 장관·해당 부처 장관의 공한",
      "  ▸ 공한은 공무 수행 신분을 증명할 수 있어야 함",
    ],
    costs: [{ label: "비자 수수료", value: "영사관 문의 — 수수료 상이" }],
    time: "비자 심사상 필요시 추가 서류가 요청될 수 있음.",
    notices: [
      "신청 자격: 외국 정부 또는 국제기구의 공무를 수행하는 자.",
      "  ▸ 예: 한국인을 호송해 한국에 동행하는 관용·외교 여권 소지 CBSA 직원",
      "  ▸ 예: 한국에서 열리는 회의·행사에 참석하는 관용·외교 여권 소지 정부 공무원",
      "단수, 발급일로부터 3개월 유효 — 3개월 이내 입국 필수.",
      "체류기간: 최대 90일.",
    ],
  },
};

const EN_TRANSLATIONS: any = {
  // 여권(passport) 영어 번역 — 한국어 원본 노드 id로 키 (한국어 TREE 원본 미수정)
  // ───────── 질문 노드 (19) ─────────
  passport_start: {
    breadcrumb: ["Home", "Passport"],
    question: "How would you like to apply?",
    sub: "The passport type and pickup method depend on your situation.",
    options: {
      pp_normal_age: { title: "Standard — mail or in-person pickup", desc: "E-passport · about 4 weeks" },
      pp_normal_age_dhl: { title: "Standard — DHL express delivery", desc: "E-passport · about 1–2 weeks (fastest)" },
      pp_urgent_age: { title: "Non-electronic single-use passport", desc: "Same-day · valid 1 year · one round trip only · cannot enter/transit the USA, among other limits" },
    },
  },
  pp_normal_age: {
    breadcrumb: ["Home", "Passport", "Standard"],
    question: "Applicant's age?",
    sub: "Required documents and fees differ based on age 18.",
    options: {
      pp_n_adult_state: { title: "Age 18 or older (adult)", desc: "Applies in person" },
      pp_n_minor_state: { title: "Under 18 (minor)", desc: "Legal guardian consent required" },
    },
  },
  pp_urgent_age: {
    breadcrumb: ["Home", "Passport", "Non-electronic"],
    question: "Applicant's age?",
    sub: "A non-electronic single-use passport (valid 1 year) is issued same-day.",
    options: {
      pp_u_adult_state: { title: "Age 18 or older (adult)", desc: "Applies in person" },
      pp_u_minor_state: { title: "Under 18 (minor)", desc: "Legal guardian consent required" },
    },
  },
  pp_n_adult_state: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult"],
    question: "Current passport status?",
    sub: "Status determines additional documents (e.g., loss report).",
    options: {
      pp_n_adult_renew_status: { title: "Renewal (have passport)", desc: "Expired · expiring · damaged · info change" },
      pp_n_adult_lost_status: { title: "Lost — reissue", desc: "Police report (Police Report) required first" },
      pp_n_adult_new_status: { title: "New issue (no passport)", desc: "First Korean passport" },
    },
  },
  pp_n_minor_state: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor"],
    question: "Child's current passport status?",
    sub: "Status determines additional documents.",
    options: {
      pp_n_minor_renew_custody: { title: "Renewal (have passport)", desc: "Expired · expiring · damaged" },
      pp_n_minor_lost_custody: { title: "Lost — reissue", desc: "Police report (Police Report) required first" },
      pp_n_minor_new_custody: { title: "New issue (no passport)", desc: "First Korean passport" },
    },
  },
  pp_u_adult_state: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult"],
    question: "Current passport status?",
    sub: "Non-electronic single-use passport — loss report etc. differ by status.",
    options: {
      pp_u_adult_have: { title: "Have passport (renewal)", desc: "Expired · damaged, etc." },
      pp_u_adult_lost: { title: "Passport lost", desc: "Police report (Police Report) required first" },
      pp_u_adult_new: { title: "No passport (new)", desc: "First Korean passport" },
    },
  },
  pp_u_minor_state: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor"],
    question: "Child's current passport status?",
    sub: "Non-electronic single-use passport — custody is explained on the result page.",
    options: {
      pp_u_minor_have: { title: "Have passport (renewal)", desc: "Expired · damaged, etc." },
      pp_u_minor_lost: { title: "Passport lost", desc: "Police report (Police Report) required first" },
      pp_u_minor_new: { title: "No passport (new)", desc: "First Korean passport" },
    },
  },

  pp_n_adult_renew_status: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Renewal"],
    question: "Select your residency status",
    sub: "Required proof documents differ by status.",
    options: {
      pp_n_adult_pr: { title: "Permanent Resident (PR Card)", desc: "Canadian permanent residency — holds a PR Card" },
      pp_n_adult_longterm: { title: "Long-term resident", desc: "Study Permit · Work Permit and other long-term visas" },
      pp_n_adult_eta: { title: "Short-term visitor (eTA)", desc: "Visa-free entry — within 6 months of entry" },
      pp_n_adult_dual: { title: "Congenital dual citizen", desc: "Korean & Canadian nationality from birth" },
      pp_n_adult_acq: { title: "Acquired citizenship (restored Korean nationality)", desc: "Originally Korean → acquired Canadian citizenship → later restored Korean nationality" },
    },
  },
  pp_n_adult_lost_status: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Lost"],
    question: "Select your residency status",
    sub: "Lost reissue — proof documents differ by status. (Police report first)",
    options: {
      pp_n_adult_pr: { title: "Permanent Resident (PR Card)", desc: "Canadian permanent residency — holds a PR Card" },
      pp_n_adult_longterm: { title: "Long-term resident", desc: "Study Permit · Work Permit and other long-term visas" },
      pp_n_adult_eta: { title: "Short-term visitor (eTA)", desc: "Visa-free entry — within 6 months of entry" },
      pp_n_adult_dual: { title: "Congenital dual citizen", desc: "Korean & Canadian nationality from birth" },
      pp_n_adult_acq: { title: "Acquired citizenship (restored Korean nationality)", desc: "Originally Korean → acquired Canadian citizenship → later restored Korean nationality" },
    },
  },
  pp_n_adult_new_status: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "New"],
    question: "Select your residency status",
    sub: "An adult getting a Korean passport for the very first time falls into one of these two cases, both holding Korean nationality.",
    options: {
      pp_n_adult_dual: { title: "Congenital dual national", desc: "Korean & Canadian nationality from birth — has not filed a nationality-exit report" },
      pp_n_adult_acq: { title: "Acquired citizenship (restored Korean nationality)", desc: "Originally Korean → acquired Canadian citizenship → later restored Korean nationality" },
    },
  },
  pp_n_minor_renew_custody: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Renewal"],
    question: "Select the custody situation",
    sub: "Additional documents (consent form, seal certificate, etc.) differ by situation.",
    options: {
      pp_n_minor_married: { title: "Parents married (joint custody)", desc: "One representative guardian visits to apply" },
      pp_n_minor_sole: { title: "Divorced — sole custody", desc: "Sole-custody guardian applies" },
      pp_n_minor_joint: { title: "Divorced — joint custody", desc: "Divorced but joint custody retained" },
      pp_n_minor_single: { title: "Single parent (bereaved · unwed)", desc: "Bereaved or unwed sole guardian" },
      pp_n_minor_study: { title: "Student (parents in Korea)", desc: "Both parents in Korea — self or proxy applies" },
    },
  },
  pp_n_minor_lost_custody: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Lost"],
    question: "Select the custody situation",
    sub: "Lost reissue — police report first. Additional documents differ by situation.",
    options: {
      pp_n_minor_married: { title: "Parents married (joint custody)", desc: "One representative guardian visits to apply" },
      pp_n_minor_sole: { title: "Divorced — sole custody", desc: "Sole-custody guardian applies" },
      pp_n_minor_joint: { title: "Divorced — joint custody", desc: "Divorced but joint custody retained" },
      pp_n_minor_single: { title: "Single parent (bereaved · unwed)", desc: "Bereaved or unwed sole guardian" },
      pp_n_minor_study: { title: "Student (parents in Korea)", desc: "Both parents in Korea — self or proxy applies" },
    },
  },
  pp_n_minor_new_custody: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "New"],
    question: "Select the custody situation",
    sub: "New issue — additional documents differ by situation.",
    options: {
      pp_n_minor_married: { title: "Parents married (joint custody)", desc: "One representative guardian visits to apply" },
      pp_n_minor_sole: { title: "Divorced — sole custody", desc: "Sole-custody guardian applies" },
      pp_n_minor_joint: { title: "Divorced — joint custody", desc: "Divorced but joint custody retained" },
      pp_n_minor_single: { title: "Single parent (bereaved · unwed)", desc: "Bereaved or unwed sole guardian" },
      pp_n_minor_study: { title: "Student (parents in Korea)", desc: "Both parents in Korea — self or proxy applies" },
    },
  },
  pp_u_adult_have: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Renewal"],
    question: "Select your residency status",
    sub: "Non-electronic single-use passport — proof documents differ by status.",
    options: {
      pp_u_adult_pr: { title: "Permanent Resident (PR Card)", desc: "Canadian permanent residency — holds a PR Card" },
      pp_u_adult_longterm: { title: "Long-term resident", desc: "Study Permit · Work Permit and other long-term visas" },
      pp_u_adult_eta: { title: "Short-term visitor (eTA)", desc: "Visa-free entry — within 6 months of entry" },
      pp_u_adult_dual: { title: "Congenital dual citizen", desc: "Korean & Canadian nationality from birth" },
      pp_u_adult_acq: { title: "Acquired citizenship (restored Korean nationality)", desc: "Originally Korean → acquired Canadian citizenship → later restored Korean nationality" },
    },
  },
  pp_u_adult_lost: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Lost"],
    question: "Select your residency status",
    sub: "Non-electronic single-use passport (lost) — police report first. Proof documents differ by status.",
    options: {
      pp_u_adult_pr: { title: "Permanent Resident (PR Card)", desc: "Canadian permanent residency — holds a PR Card" },
      pp_u_adult_longterm: { title: "Long-term resident", desc: "Study Permit · Work Permit and other long-term visas" },
      pp_u_adult_eta: { title: "Short-term visitor (eTA)", desc: "Visa-free entry — within 6 months of entry" },
      pp_u_adult_dual: { title: "Congenital dual citizen", desc: "Korean & Canadian nationality from birth" },
      pp_u_adult_acq: { title: "Acquired citizenship (restored Korean nationality)", desc: "Originally Korean → acquired Canadian citizenship → later restored Korean nationality" },
    },
  },
  pp_u_adult_new: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "New"],
    question: "Select your residency status",
    sub: "An adult getting a Korean passport for the very first time falls into one of these two cases, both holding Korean nationality.",
    options: {
      pp_u_adult_dual: { title: "Congenital dual national", desc: "Korean & Canadian nationality from birth — has not filed a nationality-exit report" },
      pp_u_adult_acq: { title: "Acquired citizenship (restored Korean nationality)", desc: "Originally Korean → acquired Canadian citizenship → later restored Korean nationality" },
    },
  },
  pp_u_minor_have: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Renewal"],
    question: "Select the custody situation",
    sub: "Non-electronic single-use passport — additional documents differ by situation.",
    options: {
      pp_u_minor_married: { title: "Parents married (joint custody)", desc: "One representative guardian visits to apply" },
      pp_u_minor_sole: { title: "Divorced — sole custody", desc: "Sole-custody guardian applies" },
      pp_u_minor_joint: { title: "Divorced — joint custody", desc: "Divorced but joint custody retained" },
      pp_u_minor_single: { title: "Single parent (bereaved · unwed)", desc: "Bereaved or unwed sole guardian" },
      pp_u_minor_study: { title: "Student (parents in Korea)", desc: "Both parents in Korea — self or proxy applies" },
    },
  },
  pp_u_minor_lost: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Lost"],
    question: "Select the custody situation",
    sub: "Non-electronic single-use passport (lost) — police report first. Additional documents differ by situation.",
    options: {
      pp_u_minor_married: { title: "Parents married (joint custody)", desc: "One representative guardian visits to apply" },
      pp_u_minor_sole: { title: "Divorced — sole custody", desc: "Sole-custody guardian applies" },
      pp_u_minor_joint: { title: "Divorced — joint custody", desc: "Divorced but joint custody retained" },
      pp_u_minor_single: { title: "Single parent (bereaved · unwed)", desc: "Bereaved or unwed sole guardian" },
      pp_u_minor_study: { title: "Student (parents in Korea)", desc: "Both parents in Korea — self or proxy applies" },
    },
  },
  pp_u_minor_new: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "New"],
    question: "Select the custody situation",
    sub: "Non-electronic single-use passport (new) — additional documents differ by situation.",
    options: {
      pp_u_minor_married: { title: "Parents married (joint custody)", desc: "One representative guardian visits to apply" },
      pp_u_minor_sole: { title: "Divorced — sole custody", desc: "Sole-custody guardian applies" },
      pp_u_minor_joint: { title: "Divorced — joint custody", desc: "Divorced but joint custody retained" },
      pp_u_minor_single: { title: "Single parent (bereaved · unwed)", desc: "Bereaved or unwed sole guardian" },
      pp_u_minor_study: { title: "Student (parents in Korea)", desc: "Both parents in Korea — self or proxy applies" },
    },
  },

  // ───────── 결과: 일반 전자여권 · 성인 (5) ─────────
  pp_n_adult_pr: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Permanent Resident"],
    title: "Standard E-passport — Permanent Resident",
    sub: "E-passport · issued in about 3–4 weeks (about 1–2 weeks with DHL)",
    docs: [
      "Passport application form (consulate form recommended / if prepared in advance, print in color on A4 at original size; Letter size not accepted)",
      "1 passport photo (within 6 months, no white/light-colored top, free photo at consulate available)",
      "PR Card original + copy (both front and back)",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)", "Since there is no current passport, the loss report replaces it"],
      new: ["If you have no prior Korean passport — identity verified via basic/family relation certificate (staff confirmation)"],
    },
    costs: [
      { label: "10-year (58 pages)", value: "CAD $70.20" },
      { label: "10-year (26 pages)", value: "CAD $66.15" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "If your PR Card is expired/lost: with proof of a renewal (reissue) application, a 1-year single-use passport may be issued — consult staff.",
      "Payment: cash (CAD) · debit · credit card.",
      "If you enter a KakaoTalk-linked phone number on the form, you can receive processing-status notifications.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_adult_longterm: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Long-term resident"],
    title: "Standard E-passport — Long-term resident",
    sub: "E-passport · issued in about 3–4 weeks (about 1–2 weeks with DHL)",
    docs: [
      "Passport application form (consulate form recommended / if prepared in advance, print in color on A4 at original size; Letter size not accepted)",
      "1 passport photo (within 6 months, no white/light-colored top, free photo at consulate available)",
      "Canadian residence visa original + copy (Study Permit, Work Permit, etc.)",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)", "Since there is no current passport, the loss report replaces it"],
      new: ["If you have no prior Korean passport — identity verified via basic/family relation certificate (staff confirmation)"],
    },
    costs: [
      { label: "10-year (58 pages)", value: "CAD $70.20" },
      { label: "10-year (26 pages)", value: "CAD $66.15" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "Your Permit must have sufficient validity remaining.",
      "Payment: cash (CAD) · debit · credit card.",
      "If you enter a KakaoTalk-linked phone number on the form, you can receive processing-status notifications.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_adult_eta: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Short-term (eTA)"],
    title: "Standard E-passport — Short-term visitor (eTA)",
    sub: "E-passport · issued in about 3–4 weeks (about 1–2 weeks with DHL)",
    docs: [
      "Passport application form (consulate form recommended / if prepared in advance, print in color on A4 at original size; Letter size not accepted)",
      "1 passport photo (within 6 months, no white/light-colored top, free photo at consulate available)",
      "eTA approval printout",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)", "Since there is no current passport, the loss report replaces it"],
      new: ["If you have no prior Korean passport — identity verified via basic/family relation certificate (staff confirmation)"],
    },
    costs: [
      { label: "10-year (58 pages)", value: "CAD $70.20" },
      { label: "10-year (26 pages)", value: "CAD $66.15" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "⚠️ eTA (visa-free entry) is recognized only within 6 months of entering Canada.",
      "Payment: cash (CAD) · debit · credit card.",
      "If you enter a KakaoTalk-linked phone number on the form, you can receive processing-status notifications.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_adult_dual: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Congenital dual citizen"],
    title: "Standard E-passport — Congenital dual citizen",
    sub: "Korean & Canadian nationality from birth · proof documents differ by birthplace",
    docs: [
      "Passport application form (consulate form recommended / if prepared in advance, print in color on A4 at original size; Letter size not accepted)",
      "1 passport photo (within 6 months, no white/light-colored top, free photo at consulate available)",
      "▸ Born in Korea (a parent held Canadian nationality): Canadian passport original+copy, or citizenship certificate original+copy",
      "▸ Born abroad/in Canada: foreign passport original+copy, or birth certificate original+copy",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)", "Since there is no current passport, the loss report replaces it"],
      new: ["▸ First Korean passport for a dual citizen with no Canadian passport: original Canadian birth certificate"],
    },
    costs: [
      { label: "10-year (58 pages)", value: "CAD $70.20" },
      { label: "10-year (26 pages)", value: "CAD $66.15" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "Congenital dual citizens retain Korean nationality, so there is no issue with passport issuance.",
      "If you have ever filed a nationality renunciation/choice, your status may differ — verify before applying if unsure. (Consulate 416-920-3809)",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_adult_acq: {
    breadcrumb: ["Home", "Passport", "Standard", "Adult", "Acquired citizen"],
    title: "Standard E-passport — Acquired citizen",
    sub: "Was Korean → later acquired Canadian citizenship · a nationality check comes first",
    docs: [
      "Passport application form (consulate form recommended / if prepared in advance, print in color on A4 at original size; Letter size not accepted)",
      "1 passport photo (within 6 months, no white/light-colored top, free photo at consulate available)",
      "Canadian passport original + copy",
      "Certificate of nationality restoration (not required if restoration is recorded on your basic certificate)",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)", "Since there is no current passport, the loss report replaces it"],
      new: ["Basic certificate needed to confirm nationality (restoration) status"],
    },
    costs: [
      { label: "10-year (58 pages)", value: "CAD $70.20" },
      { label: "10-year (26 pages)", value: "CAD $66.15" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "⚠️ If you acquired Canadian citizenship, your Korean nationality may have been automatically lost. Applying for or using a Korean passport while your nationality is lost may violate the Immigration Act, so verify your nationality status (basic certificate, etc.) before applying.",
      "⚠️ If unsure, consult the nationality desk before applying for a passport. (Consulate 416-920-3809)",
      "If nationality restoration is complete and recorded on your basic certificate, a Korean passport application is possible.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },

  // ───────── 결과: 일반 전자여권 · 미성년 (5) ─────────
  pp_n_minor_married: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Parents married"],
    title: "Standard E-passport — Minor (parents married)",
    sub: "Joint custody · one representative guardian visits to apply",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — signed by the representative guardian",
      "Visiting representative guardian's (father or mother) passport original + 1 copy",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy (both sides) / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Age 8+ (5-year, 58 pages)", value: "CAD $59.40" },
      { label: "Under 8 (5-year, 58 pages)", value: "CAD $47.25" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "If the parents are married, one representative guardian may visit to apply.",
      "If the child acquired a foreign nationality, a nationality check may be needed — consult if unsure. (416-920-3809)",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_minor_sole: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Sole custody"],
    title: "Standard E-passport — Minor (divorced · sole custody)",
    sub: "The sole-custody guardian visits to apply",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — signed by the sole-custody guardian",
      "Visiting guardian's (father or mother) passport original + 1 copy",
      "Sole-custody proof — child's basic/family relation certificate (to confirm custody)",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy (both sides) / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Age 8+ (5-year, 58 pages)", value: "CAD $59.40" },
      { label: "Under 8 (5-year, 58 pages)", value: "CAD $47.25" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "After divorce, the sole-custody guardian may apply alone. Custody must be confirmed on the basic certificate.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_minor_joint: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Joint custody"],
    title: "Standard E-passport — Minor (divorced · joint custody)",
    sub: "Documents differ depending on the residence situation",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Child's basic & family relation certificate, 1 each",
      "【Case A — one parent resides in Korea】",
      "    └ Legal guardian consent form — seal (ingam) of the Korea-resident guardian + signature of the visiting guardian",
      "    └ Korea-resident guardian's seal certificate (ingam jeungmyeong)",
      "    └ Korea-resident guardian's passport copy",
      "    └ Visiting guardian's passport original + copy",
      "【Case B — both parents reside in Canada (cannot obtain a seal certificate)】",
      "    └ Both parents visit the consulate",
      "    └ Legal guardian consent form — signed by both parents",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy (both sides) / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Age 8+ (5-year, 58 pages)", value: "CAD $59.40" },
      { label: "Under 8 (5-year, 58 pages)", value: "CAD $47.25" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "For joint custody, documents differ by residence situation (Case A/B). Prepare the set that matches your situation.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_minor_single: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Single parent"],
    title: "Standard E-passport — Minor (single parent · bereaved/unwed)",
    sub: "The sole-custody guardian visits to apply",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — signed by the guardian",
      "Visiting guardian's passport original + 1 copy",
      "Sole-custody proof — child's basic/family relation certificate (bereavement confirmable if applicable)",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy (both sides) / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Age 8+ (5-year, 58 pages)", value: "CAD $59.40" },
      { label: "Under 8 (5-year, 58 pages)", value: "CAD $47.25" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "For a bereaved or unwed sole guardian, custody must be confirmed via the basic/family relation certificate.",
      "If the required proof is unclear, contact the consulate before visiting. (416-920-3809)",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_n_minor_study: {
    breadcrumb: ["Home", "Passport", "Standard", "Minor", "Student"],
    title: "Standard E-passport — Minor student (parents in Korea)",
    sub: "Self-application or proxy application",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — seal (ingam) of the representative guardian",
      "Representative guardian's seal certificate (ingam jeungmyeong)",
      "Parents' passport copies",
      "Child's (minor's) basic & family relation certificate, 1 each",
      "【If a proxy applies, add】",
      "    └ Power of attorney (stating delegation to the proxy)",
      "    └ Proxy's passport original + copy (proxy must be an adult 18+: grandparent, sibling)",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy (both sides) / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Age 8+ (5-year, 58 pages)", value: "CAD $59.40" },
      { label: "Under 8 (5-year, 58 pages)", value: "CAD $47.25" },
      { label: "Remaining-validity reissue", value: "CAD $36.45" },
    ],
    time: "About 3–4 weeks (about 1–2 weeks with DHL express)",
    notices: [
      "This applies when both parents reside in Korea and the student applies in person or via a proxy.",
      "A proxy must be an adult (18+) grandparent or sibling only.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },

  // ───────── 결과: 비전자 단수여권 · 성인 (5) ─────────
  pp_u_adult_pr: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Permanent Resident"],
    title: "Non-electronic single-use passport — Permanent Resident",
    sub: "Non-electronic single-use passport (valid 1 year) · when needed within 1 week",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size; Letter not accepted)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months, free photo at consulate available)",
      "PR Card original + copy (both sides). If expired: renewal application receipt + the expired PR Card (consult staff)",
      "Flight ticket copy — itinerary printout showing your name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["If you have no prior Korean passport — identity verified via basic certificate, etc. (staff confirmation)"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. If you must transit the USA to reach Korea, use a DHL e-passport (about 1 week) or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "If you have 1 week or more, we recommend the DHL e-passport delivery service instead of an urgent passport.",
      "Fee is CAD $22.95 if the urgent reason is accepted, CAD $67.50 for a general reason. Submitting urgent-travel proof (death certificate, injury diagnosis, hospitalization proof, etc.) qualifies as an urgent reason.",
      "Refunds for the urgent reason are possible within 6 months of application, with proof, only at the mission where you applied.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_adult_longterm: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Long-term resident"],
    title: "Non-electronic single-use passport — Long-term resident",
    sub: "Non-electronic single-use passport (valid 1 year) · when needed within 1 week",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size; Letter not accepted)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months, free photo at consulate available)",
      "Canadian residence visa original + copy (Study Permit, Work Permit, etc.)",
      "Flight ticket copy — itinerary printout showing your name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["If you have no prior Korean passport — identity verified via basic certificate, etc. (staff confirmation)"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport (about 1 week) or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "If you have 1 week or more, we recommend the DHL e-passport delivery service instead.",
      "Fee is CAD $22.95 if the urgent reason is accepted, CAD $67.50 for a general reason. Urgent-travel proof qualifies as an urgent reason.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_adult_eta: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Short-term (eTA)"],
    title: "Non-electronic single-use passport — Short-term visitor (eTA)",
    sub: "Non-electronic single-use passport (valid 1 year) · when needed within 1 week",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size; Letter not accepted)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months, free photo at consulate available)",
      "eTA approval printout (recognized only within 6 months of entering Canada)",
      "Flight ticket copy — itinerary printout showing your name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["If you have no prior Korean passport — identity verified via basic certificate, etc. (staff confirmation)"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport (about 1 week) or a direct Canada–Korea flight.",
      "⚠️ eTA (visa-free entry) is recognized only within 6 months of entering Canada.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "If you have 1 week or more, we recommend the DHL e-passport delivery service instead.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_adult_dual: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Congenital dual citizen"],
    title: "Non-electronic single-use passport — Congenital dual citizen",
    sub: "Non-electronic single-use passport (valid 1 year) · proof differs by birthplace",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size; Letter not accepted)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months, free photo at consulate available)",
      "▸ Born in Korea (a parent held Canadian nationality): Canadian passport or citizenship certificate original+copy",
      "▸ Born abroad/in Canada: foreign passport or birth certificate original+copy",
      "▸ First application for a dual citizen with no Canadian passport: original Canadian birth certificate",
      "Flight ticket copy — itinerary printout showing your name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the birthplace-based proof above"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport (about 1 week) or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "Congenital dual citizens retain Korean nationality, so issuance is not an issue. If you have ever filed a nationality renunciation/choice, verification is needed.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_adult_acq: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Adult", "Acquired citizen"],
    title: "Non-electronic single-use passport — Acquired citizen",
    sub: "Non-electronic single-use passport (valid 1 year) · a nationality check comes first",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size; Letter not accepted)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months, free photo at consulate available)",
      "Canadian passport original + copy",
      "Certificate of nationality restoration (not required if restoration is recorded on your basic certificate)",
      "Flight ticket copy — itinerary printout showing your name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["Basic certificate needed to confirm nationality (restoration) status"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ If you acquired Canadian citizenship, your Korean nationality may have been automatically lost. Applying for or using a Korean passport while your nationality is lost may violate the Immigration Act, so verify your nationality status (basic certificate, etc.) before applying.",
      "⚠️ If unsure, consult the nationality desk before applying for a passport. (Consulate 416-920-3809)",
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport or a direct Canada–Korea flight.",
      "⚠️ Cannot be issued to: a person whose identity cannot be verified / anyone who has lost a passport 3 or more times in the last 5 years.",
      "If nationality restoration is complete and recorded on your basic certificate, a Korean passport application is possible.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },

  // ───────── 결과: 비전자 단수여권 · 미성년 (5) ─────────
  pp_u_minor_married: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Parents married"],
    title: "Non-electronic single-use passport — Minor (parents married)",
    sub: "Non-electronic single-use passport (valid 1 year) · joint custody, one representative guardian visits",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — signed by the representative guardian",
      "Visiting representative guardian's (father or mother) passport original + 1 copy",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
      "Flight ticket copy — itinerary printout showing the child's name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "If you have 1 week or more, we recommend the DHL e-passport delivery service instead.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_minor_sole: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Sole custody"],
    title: "Non-electronic single-use passport — Minor (divorced · sole custody)",
    sub: "Non-electronic single-use passport (valid 1 year) · sole-custody guardian visits",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — signed by the sole-custody guardian",
      "Visiting guardian's (father or mother) passport original + 1 copy",
      "Sole-custody proof — child's basic/family relation certificate",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
      "Flight ticket copy — itinerary printout showing the child's name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "If you have 1 week or more, we recommend the DHL e-passport delivery service instead.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_minor_joint: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Joint custody"],
    title: "Non-electronic single-use passport — Minor (divorced · joint custody)",
    sub: "Non-electronic single-use passport (valid 1 year) · documents differ by residence situation",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Child's basic & family relation certificate, 1 each",
      "【Case A — one parent resides in Korea】",
      "    └ Legal guardian consent form — seal of the Korea-resident guardian + signature of the visiting guardian",
      "    └ Korea-resident guardian's seal certificate",
      "    └ Korea-resident guardian's passport copy",
      "    └ Visiting guardian's passport original + copy",
      "【Case B — both parents reside in Canada (cannot obtain a seal certificate)】",
      "    └ Both parents visit the consulate",
      "    └ Legal guardian consent form — signed by both parents",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
      "Flight ticket copy — itinerary printout showing the child's name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "For joint custody, documents differ by residence situation (Case A/B). Prepare the set that matches your situation.",
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_minor_single: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Single parent"],
    title: "Non-electronic single-use passport — Minor (single parent · bereaved/unwed)",
    sub: "Non-electronic single-use passport (valid 1 year) · sole-custody guardian visits",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — signed by the guardian",
      "Visiting guardian's passport original + 1 copy",
      "Sole-custody proof — child's basic/family relation certificate",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
      "Flight ticket copy — itinerary printout showing the child's name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "For a bereaved or unwed sole guardian, custody must be confirmed via the basic/family relation certificate.",
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },
  pp_u_minor_study: {
    breadcrumb: ["Home", "Passport", "Non-electronic", "Minor", "Student"],
    title: "Non-electronic single-use passport — Minor student (parents in Korea)",
    sub: "Non-electronic single-use passport (valid 1 year) · self or proxy application",
    docs: [
      "Passport application form (consulate form recommended / print in color on A4 at original size)",
      "Urgent passport issuance reason statement (complete and submit the form)",
      "1 passport photo (within 6 months; infants under 6 must use a photo studio)",
      "Legal guardian consent form — seal of the representative guardian",
      "Representative guardian's seal certificate",
      "Parents' passport copies",
      "Child's (minor's) basic & family relation certificate, 1 each",
      "【If a proxy applies, add】",
      "    └ Power of attorney (stating delegation to the proxy)",
      "    └ Proxy's passport original + copy (proxy must be an adult 18+: grandparent, sibling)",
      "Residency-status proof (one applicable to the child):",
      "    └ PR: PR Card original+copy / Long-term: residence visa original+copy",
      "    └ Short-term (eTA): eTA approval / Congenital dual citizen: Canadian passport or birth certificate",
      "Flight ticket copy — itinerary printout showing the child's name, schedule, and completed payment",
    ],
    stateDocs: {
      renew: ["Current passport original + 1 copy (returned with the new passport after surrender)"],
      lost: ["⚠️ Passport loss report (complete and submit the form)"],
      new: ["For a first application — identity verified via the child's basic/family relation certificate"],
    },
    costs: [
      { label: "Urgent reason accepted", value: "CAD $22.95" },
      { label: "General reason", value: "CAD $67.50" },
    ],
    time: "Urgent issuance (generally within 1 week)",
    notices: [
      "This applies when both parents reside in Korea and the student applies in person or via a proxy. A proxy must be an adult (18+) grandparent or sibling only.",
      "⚠️ A non-electronic single-use passport cannot be used to enter or transit the USA. For USA transit, use a DHL e-passport or a direct Canada–Korea flight.",
      "⚠️ Not issued to: persons whose identity cannot be verified / those who lost a passport 3+ times in the last 5 years.",
      "Payment: cash (CAD) · debit · credit card.",
    ],
    bookingLabel: "Book Appointment (Passport) →",
  },

  // ════════════ 공증(notarization) 영어 번역 ════════════
  notarization_start: {
    breadcrumb: ["Home", "Notarization"],
    question: "Which document do you need notarized/certified?",
    sub: "Pick by the document you're looking for. ⚠️ For consular notarization, all signatures must be made in person before the consul — pre-signed or proxy applications are not accepted.",
    footer: [
      "💡 First, tell these two apart — they're easy to confuse:",
      "  ▸ Apostille = an international certification that a document is genuine (not a translation). Obtained in the issuing country.",
      "  ▸ Translation certification = the consulate confirms an English translation of a Korean document. It does not vouch for authenticity.",
      "  ▸ A receiver may require both — ask the receiving institution whether you need an Apostille, a translation, or both.",
    ],
    options: {
      notarization_canada_doc: { title: "Canadian-issued document for use in Korea", desc: "【Canada → Korea】 Birth·marriage·death·RCMP·university/College·employment, etc. → Apostille guide" },
      notarization_korea_doc: { title: "Korean-issued document for use abroad", desc: "【Korea → Abroad】 Family relation·basic·resident registration·criminal record·pension, etc. → online Apostille (apostille.go.kr)" },
      notarization_translation: { title: "Translate a Korean certificate into English", desc: "Family relation·basic·marriage·birth·graduation certificates, etc." },
      notarization_translation_license_start: { title: "Driver's license (translation·record·exchange)", desc: "Korean license English translation·English driving record·Korea↔Ontario license exchange guide" },
      notarization_saseo: { title: "Certify the signature on a document you wrote", desc: "Power of attorney·inheritance waiver·residence statement·employment·declarations" },
      notarization_ingam: { title: "Seal (ingam) matters", desc: "Seal certificate power of attorney·seal registration·change report" },
      notarization_school: { title: "Elementary/middle/high school records", desc: "Diploma·enrollment·transcript (university/College → top item)" },
    },
  },
  notarization_canada_doc: {
    breadcrumb: ["Home", "Notarization", "Canadian-issued document"],
    title: "Canadian-issued document for use in Korea — use an Apostille",
    sub: "Since Canada joined the Apostille Convention on Jan 11, 2024, Canadian-issued documents are no longer subject to consular authentication.",
    docs: [
      "📌 No consulate visit needed — obtain an Apostille from the issuer below and submit it in Korea.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【Step 1 — identify the document type】",
      "Government (provincial/federal) documents → Apostille directly",
      "  ▸ Birth·marriage·divorce·death certificates, RCMP criminal record check, etc.",
      "Private documents / school·company documents → first notarized by a Canadian notary (lawyer), then Apostille",
      "  ▸ Power of attorney·contracts·university/College transcript·enrollment·diploma, employment letter, etc.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【Step 2 — get the Apostille from the issuer】",
      "Federal documents / Manitoba-issued·notarized → Global Affairs Canada (Ottawa)",
      "  ▸ 125 Sussex Drive, Ottawa, ON K1A 0G2 · 1-833-928-1551 · docs@international.gc.ca",
      "Ontario-issued·notarized → ServiceOntario (Official Documents Services)",
      "  ▸ 777 Bay Street, Lower Level, Toronto, ON M7A 2J8 · 416-325-8416",
      "  ▸ Also accepted at Ottawa·Windsor·Sault Ste. Marie·Thunder Bay ServiceOntario locations",
    ],
    costs: [{ label: "Consulate fee", value: "N/A (not a consular service)" }],
    time: "Per the issuer's guidance",
    notices: [
      "⚠️ A Canadian citizen's signature certificate, residence certificate, identity certificate, etc. also go through a Canadian notary + Apostille (consular authentication not available).",
      "However, a power of attorney, inheritance division agreement, and inheritance waiver can still be certified by the consul if you visit in person (see the 'document you wrote' menu).",
      "Some receiving institutions in Korea (courts, registry offices) may separately require a Canadian notary's notarization — check with the receiver first.",
      "To submit a Korean-issued document abroad, use the online Apostille at apostille.go.kr (joint certificate required).",
    ],
    onlineLink: "https://www.international.gc.ca/gac-amc/authentication-authentification/index.aspx",
  },
  notarization_korea_doc: {
    breadcrumb: ["Home", "Notarization", "Korean document for use abroad"],
    title: "Korean-issued document for use abroad — online Apostille",
    sub: "To submit a public document issued by a Korean government body or agency to Canada or another Apostille Convention country, get the Apostille online in Korea — not at the consulate.",
    docs: [
      "📌 No consulate visit needed — issue it yourself online at the Korean sites below.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【Issuing sites】",
      "Republic of Korea Apostille: apostille.go.kr",
      "Overseas Koreans 365 Portal: g4k.go.kr",
      "  ▸ Identity verification (joint/digital certificate) required → enter issuing body, document type, document number, and issue date",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【Documents eligible for online Apostille (42 types, by issuer)】",
      "Supreme Court: family relation·basic·marriage·adoption·full-adoption certificates, removed-register copy/abstract, English certificates (machine-issued excluded)",
      "Ministry of the Interior: resident registration copy/abstract (Gov24-issued only)",
      "Ministry of Foreign Affairs: passport issuance record·invalidation·application·passport certificate",
      "Ministry of Education: graduation·enrollment, GED score·pass certificates, middle/high school transcript (hand-issued excluded)",
      "Military Manpower Administration: military service certificate",
      "National Tax Service: business registration·tax payment·income·VAT certificates, etc.",
      "Police: criminal·investigation·driving record reports (only those issued after Oct 28, 2019 for foreign entry/stay)",
      "National Pension Service: enrollment·benefit·calculation certificates (Gov24-issued excluded)",
      "KDCA: vaccination certificate / HRD Korea: national technical qualification certificate / Coast Guard: rescue·boating licenses (Gov24-issued only)",
    ],
    costs: [{ label: "Consulate fee", value: "N/A (not a consular service)" }],
    time: "Issued instantly online (per the site's guidance)",
    notices: [
      "⚠️ This is for submitting a Korean document ABROAD — to submit a Canadian document in Korea, use the 'Canadian-issued document' menu on the first screen.",
      "If you also need an English translation, use the 'Translate a Korean certificate into English' menu (Apostille and translation are separate steps, and some receivers require both).",
      "If you cannot issue online (no digital certificate): an agent in Korea can apply (Apostille application + target document + copies of agent's & applicant's IDs + electronic revenue stamp KRW 1,000 per document).",
      "Korea's Apostille issuers are the Overseas Koreans Agency or the Ministry of Justice — OKA (02) 6399-7100~7101 / MOJ (02) 6399-7110.",
      "Some document types have issuance restrictions (machine-issued / Gov24 / hand-issued) — check the notes in the list above.",
    ],
    onlineLink: "https://www.apostille.go.kr",
  },
  notarization_saseo: {
    question: "What type of document is it?",
    sub: "Private document certification is where the consul confirms that the signature/seal was made by your own will. It does not verify the truthfulness of the document's contents. Not sure which menu? Pick by the example document names below.",
    options: {
      notarization_pow: { title: "Power of attorney", desc: "Delegating Korean matters: real estate sale, registration, banking, inheritance, certificate issuance, etc." },
      notarization_legal_act: { title: "Legal-act document (inheritance·contract·loan, etc.)", desc: "Inheritance division agreement, inheritance waiver, sales contract, bank loan agreement, etc." },
      notarization_sign: { title: "Factual-act document (signature·residence·employment, etc.)", desc: "Signature certificate, identity certificate, residence certificate, employment certificate, etc." },
    },
  },
  notarization_pow: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Power of attorney"],
    question: "What is the applicant's (grantor's) age?",
    sub: "A minor under 19 must visit together with a legal guardian, and a legal-guardian consent form is required.",
    options: {
      notarization_pow_adult: { title: "Age 19 or older (adult)", desc: "Applies in person" },
      notarization_pow_minor: { title: "Under 19 (minor)", desc: "Must visit together with legal guardian" },
    },
  },
  notarization_pow_adult: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Power of attorney", "Adult"],
    title: "Power of attorney certification (private document certification) — adult",
    docs: [
      "Power of attorney — prepared in advance, but the signature field must be left blank (sign before the consul)",
      "  ▸ Must state the agent's name, resident registration number, address, contact, purpose of delegation, and number of copies",
      "  ▸ Purpose examples: real estate sale, mortgage registration, vehicle sale, banking, general use, etc.",
      "  ▸ Form: download from the consulate website or write your own (may be typed and printed; sign on site)",
      "Notarization request form (designated form — must be handwritten, not typed)",
      "Your valid Korean passport original + 1 copy",
      "  ▸ Passport issued after Dec 20, 2020 (resident number removed) → add a passport information certificate (CAD $1.00)",
      "Canadian residency-status proof, original (PR Card / visa / citizenship certificate)",
    ],
    costs: [
      { label: "Per power of attorney", value: "CAD $2.70 (Cash, Debit, Credit)" },
      { label: "Passport information certificate (if applicable)", value: "CAD $1.00 added" },
    ],
    time: "Issued same day on visit (about 30 min–1 hour)",
    notices: [
      "⚠️ Signature must be made before the consul — pre-signing or signing by another person is not allowed.",
      "✅ Canadian citizens may also have a power of attorney, inheritance division agreement, and inheritance waiver certified by the consul in person, without a Canadian notary (same as permanent residents, effective Jun 1, 2008).",
      "  ▸ However, citizens without a Korean passport should call before visiting for identity verification (416-920-3809).",
      "  ▸ Some receivers in Korea (courts, etc.) may still require a Canadian notary's notarization — confirm first.",
      "If multiple people sign the same power of attorney, a fee applies for each signature.",
      "For a seal certificate power of attorney, use the separate menu (Seal notarization).",
      "For Korean real estate registration: a Canadian Notary Public + Apostille may sometimes substitute — confirm with the receiving institution first.",
      "For a corporation: the corporate representative must visit in person — bring the corporate register and business registration certificate.",
      "If proof of overseas residence is needed: it can be replaced by an overseas Korean registration extract after registering (see separate menu).",
    ],
    bookingLabel: "Book Appointment (Notarization → Power of attorney) →",
  },
  notarization_pow_minor: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Power of attorney", "Minor"],
    title: "Power of attorney certification — minor under 19",
    docs: [
      "Power of attorney — the minor and the legal guardian (parent or legal custodian) visit together and handwrite it before the consul (signature field blank)",
      "  ▸ Must state the agent's name, resident registration number, address, contact, purpose, and number of copies",
      "Notarization request form (designated form — must be handwritten)",
      "The minor's original Korean passport",
      "The minor's original Canadian residence visa or valid PR Card",
      "The minor's basic certificate + family relation certificate — issued within 3 months",
      "Legal guardian consent (non-passport services) — attached form, completed and signed by the parent(s)",
      "  ▸ In the 'consent' section, state that you consent to the minor child's power-of-attorney notarization request",
      "  ▸ Both parents complete their information; one representative signs",
      "The legal guardian's valid passport, original",
    ],
    costs: [
      { label: "Per power of attorney", value: "CAD $2.70 (Cash, Debit, Credit)" },
      { label: "Passport information certificate (if applicable)", value: "CAD $1.00 added" },
    ],
    time: "Issued same day on visit",
    notices: [
      "⚠️ The minor and the legal guardian must visit together in person — one of them alone cannot apply.",
      "⚠️ Signature must be made before the consul — pre-signing or proxy signing not allowed.",
      "Download the legal-guardian consent form from the consulate website (legal-guardian consent for non-passport services).",
    ],
    bookingLabel: "Book Appointment (Notarization → Power of attorney) →",
  },
  notarization_legal_act: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Legal-act document"],
    title: "Legal-act document certification — inheritance waiver, sales contract, bank agreement, etc.",
    docs: [
      "Document to be notarized — prepare with the signature field blank (sign before the consul)",
      "  ▸ Inheritance division agreement, inheritance waiver",
      "  ▸ Various contracts: sales, lease, work/service contracts, etc.",
      "  ▸ Bank loan transaction agreement, credit guarantee agreement",
      "  ▸ Other private documents related to legal acts",
      "Notarization request form (designated form — must be handwritten, not typed)",
      "Your valid Korean passport original + 1 copy",
      "  ▸ Passport issued after Dec 20, 2020 (resident number removed) → add a passport information certificate",
      "Canadian residency-status proof, original",
    ],
    costs: [
      { label: "Per document with no stated value", value: "CAD $5.40 (Cash, Debit, Credit)" },
      { label: "Document with a stated value (contracts, etc.)", value: "About CAD $3.00 per CAD $1,000, calculated separately" },
      { label: "Passport information certificate (if applicable)", value: "CAD $1.00 added" },
    ],
    time: "Issued same day on visit (documents with a stated value require extra review time)",
    notices: [
      "⚠️ Signature must be made in person before the consul — pre-signing not allowed.",
      "For documents with a stated (contract) value, the fee varies by amount — confirm before visiting.",
      "The consul does not guarantee the truthfulness or legal effect of the contents — only that the signature is by your own will.",
      "Citizens: if you have no Korean passport, you must call before visiting.",
    ],
    bookingLabel: "Book Appointment (Notarization → Legal-act document) →",
  },
  notarization_sign: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Factual-act document"],
    question: "What is the applicant's status?",
    sub: "Signature, residence, and identity certificates are handled differently by applicant status. (Canada Apostille effective Jan 11, 2024)",
    options: {
      notarization_sign_passport: { title: "Korean passport holder (Korean national)", desc: "Signature can be certified at the consulate" },
      notarization_sign_citizen: { title: "Canadian citizen", desc: "Consular authentication not available → Canadian notary + Apostille" },
    },
  },
  notarization_sign_passport: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Factual-act document", "Korean passport holder"],
    title: "Factual-act document certification — signature certificate, identity certificate, residence certificate, etc. (Korean passport holder)",
    docs: [
      "Document to be notarized — prepare with the signature field blank (sign before the consul)",
      "  ▸ Signature certificate",
      "  ▸ Identity certificate (when names differ)",
      "  ▸ Residence certificate",
      "  ▸ Employment certificate, enrollment certificate, and other statement documents",
      "  ▸ If a designated form exists on the consulate website, use that form",
      "Notarization request form (designated form — must be handwritten, not typed)",
      "Your valid Korean passport original + 1 copy",
      "  ▸ Passport issued after Dec 20, 2020 (resident number removed) → add a passport information certificate",
      "Canadian residency-status proof, original",
    ],
    costs: [
      { label: "Per document", value: "CAD $5.40 (Cash, Debit, Credit)" },
      { label: "Passport information certificate (if applicable)", value: "CAD $1.00 added" },
    ],
    time: "Issued same day on visit (about 30 min–1 hour)",
    notices: [
      "⚠️ All signatures must be made in person before the consul — proxy applications not allowed.",
      "The consul does not verify the truthfulness of the contents — only certifies that the signature is by your own will.",
    ],
    bookingLabel: "Book Appointment (Notarization → Factual-act document) →",
  },
  notarization_sign_citizen: {
    breadcrumb: ["Home", "Notarization", "Private document certification", "Factual-act document", "Canadian citizen"],
    title: "Factual-act documents — Canadian citizens use an Apostille",
    sub: "Since the Canada Apostille took effect on Jan 11, 2024, a citizen's signature/residence/identity statements cannot be authenticated by the consulate.",
    docs: [
      "📌 Canadian citizens cannot have a signature/residence/identity certificate authenticated at the consulate.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【How to proceed】",
      "① Have the document notarized by a Canadian notary (notary public / lawyer).",
      "② Get an Apostille on the notarized document.",
      "  ▸ Ontario-notarized → ServiceOntario (777 Bay Street, Lower Level, Toronto)",
      "  ▸ Manitoba-notarized → Global Affairs Canada (Ottawa)",
      "③ Submit the Apostilled document to the receiving institution in Korea.",
    ],
    costs: [{ label: "Consulate fee", value: "N/A (not a consular service)" }],
    time: "Per the issuer's guidance",
    notices: [
      "A power of attorney, inheritance division agreement, and inheritance waiver can still be certified by the consul even for citizens if you visit in person (see that menu).",
      "For detailed Apostille issuers and procedure, see the 'Canadian-issued document' guide on the first screen.",
      "Check the format required by the receiving institution in Korea first.",
    ],
    onlineLink: "https://www.international.gc.ca/gac-amc/authentication-authentification/index.aspx",
  },
  notarization_ingam: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)"],
    question: "What seal (ingam) service do you need?",
    sub: "Seal-related documents must be written by you in person before the consul. Proxy applications are absolutely not allowed.",
    options: {
      notarization_ingam_eligible: { title: "Check eligibility first", desc: "Citizens without a residence card cannot apply — check first" },
      notarization_ingam_pow: { title: "Seal certificate power of attorney", desc: "Delegating an agent in Korea to obtain your seal certificate" },
      notarization_ingam_change: { title: "Seal (change) registration form", desc: "New seal registration or change of existing seal" },
      notarization_ingam_protect: { title: "Seal protection (release) request", desc: "Apply for or release seal-misuse protection" },
    },
  },
  notarization_ingam_eligible: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Eligibility check"],
    question: "What is your situation?",
    sub: "Seal-related services are available only to Korean nationals or citizens holding a valid Domestic Residence Report Card (거소증).",
    options: {
      notarization_ingam_ok_passport: { title: "Holds a Korean passport (national)", desc: "If you have a valid Korean passport → eligible" },
      notarization_ingam_ok_sojourn: { title: "Canadian citizen + valid residence card", desc: "If you have a Domestic Residence Report Card for Overseas Koreans → eligible" },
      notarization_ingam_no: { title: "Canadian citizen + no residence card", desc: "If you have citizenship only without nationality restoration → not eligible" },
    },
  },
  notarization_ingam_ok_passport: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Eligible"],
    title: "✅ Eligible for seal services — go to the menu",
    docs: [
      "You are eligible — select the relevant service below to proceed:",
      "  ▸ Seal certificate power of attorney → delegate an agent in Korea to obtain your seal certificate",
      "  ▸ Seal (change) registration form → new seal registration or change of existing seal",
      "  ▸ Seal protection (release) request → apply for or release seal-misuse protection",
    ],
    costs: [{ label: "Note", value: "Fees vary by service — see the relevant menu" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Must be written by you in person before the consul — proxy applications absolutely not allowed.",
      "Mail applications not allowed — in-person visit required.",
    ],
    bookingLabel: "Book Appointment (Notarization) →",
  },
  notarization_ingam_ok_sojourn: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Eligible (residence card)"],
    title: "✅ Eligible for seal services — citizen with a residence card",
    docs: [
      "You are eligible if you hold a valid Domestic Residence Report Card for Overseas Koreans.",
      "  ▸ Bring the original residence card",
      "Available services:",
      "  ▸ Seal certificate power of attorney",
      "  ▸ Seal (change) registration form",
      "  ▸ Seal protection (release) request",
    ],
    costs: [{ label: "Note", value: "Fees vary by service — see the relevant menu" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Not eligible if the residence card is expired — bring a valid residence card.",
      "⚠️ Must visit in person — proxy applications absolutely not allowed.",
    ],
    bookingLabel: "Book Appointment (Notarization) →",
  },
  notarization_ingam_no: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Not eligible"],
    title: "❌ Not eligible for seal services",
    docs: [
      "Korean nationality is legally lost the moment you acquire Canadian citizenship.",
      "  ▸ Even if you did not file a nationality-loss report, Korean nationality is automatically lost at the time of the citizenship oath",
      "  ▸ Therefore, a citizen without a valid residence card cannot apply for seal services",
      "To become eligible, you need one of the following:",
      "  ▸ Restore Korean nationality → after approval, register residence or obtain a passport",
      "  ▸ Overseas Korean residence report → obtain a Domestic Residence Report Card for Overseas Koreans",
    ],
    costs: [{ label: "N/A", value: "Not eligible" }],
    time: "Not eligible",
    notices: [
      "📌 The residence card (domestic residence report card) is not issued by the Consulate. After entering Korea on an F-4 visa, etc., file a domestic residence report at the immigration office (formerly immigration management office) for your area of residence to obtain it (report within 90 days of entry).",
      "The application places differ — the F-4 visa is applied for at an overseas mission (Consulate General in Toronto), while the residence card is applied for at a Korea immigration office. (F-4 = status of stay / residence card = ID within Korea)",
      "For nationality restoration or residence report inquiries: consulate phone consultation (416-920-3809).",
      "See the Nationality menu for the nationality restoration procedure.",
    ],
    bookingLabel: "Book Consultation →",
  },
  notarization_ingam_pow: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Seal certificate power of attorney"],
    question: "Age of the delegator (applicant)?",
    sub: "A minor under 19 must visit together with their legal guardian.",
    options: {
      notarization_ingam_pow_adult: { title: "Age 19 or older (adult)", desc: "Applies in person" },
      notarization_ingam_pow_minor: { title: "Under 19 (minor)", desc: "Must visit together with legal guardian" },
    },
  },
  notarization_ingam_pow_adult: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Seal certificate power of attorney", "Adult"],
    title: "Seal certificate power of attorney — Adult",
    docs: [
      "Seal certificate power of attorney form — download and complete (leave the signature field blank; sign by hand before the consul)",
      "  ▸ Must state the Korea-based agent's name, resident registration number, address, and phone number",
      "  ▸ State the seal's purpose (e.g., real estate sale, banking, general use)",
      "Valid Korean passport original",
      "Residency-status proof, original:",
      "  ▸ Short-term visitor: eTA approval",
      "  ▸ Long-term resident: Canadian residence visa original (Work/Study Permit, etc.)",
      "  ▸ Permanent resident: PR Card original (within validity)",
      "  ▸ Dual citizen: basic certificate showing nationality restoration, or certificate of nationality restoration",
      "  ▸ Citizen with a residence card: valid Domestic Residence Report Card for Overseas Koreans, original",
    ],
    costs: [{ label: "Per copy", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Must sign by hand before the consul — proxy applications absolutely not allowed; mail applications not allowed.",
      "⚠️ A typed-and-printed or photocopied power of attorney is not accepted — must be handwritten.",
      "When your agent in Korea obtains the seal certificate, they must bring this power of attorney together with the seal stamp.",
      "If your seal is not yet registered in Korea, process the seal (change) registration form first.",
      "Cannot be issued without valid residency-status proof.",
    ],
    bookingLabel: "Book Appointment (Notarization → Seal certificate PoA) →",
  },
  notarization_ingam_pow_minor: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Seal certificate power of attorney", "Minor"],
    title: "Seal certificate power of attorney — Minor under 19",
    docs: [
      "Seal certificate power of attorney form — the minor and the legal guardian visit together and write by hand",
      "  ▸ Must state the Korea-based agent's name, resident registration number, address, and phone number",
      "Minor's valid Korean passport original",
      "Minor's Canadian residence visa original or valid PR Card original",
      "  ▸ If a dual citizen: also add the basic certificate + Canadian passport original",
      "Legal guardian's (father or mother) valid passport original",
      "Minor's basic certificate + family relation certificate — issued within 3 months",
      "  ▸ Detailed version, full resident registration number disclosed",
    ],
    costs: [{ label: "Per copy", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ The minor and the legal guardian must visit together in person — one of them alone cannot apply.",
      "⚠️ Mail applications not allowed.",
      "Cannot be issued without valid residency-status proof.",
    ],
    bookingLabel: "Book Appointment (Notarization → Seal certificate PoA) →",
  },
  notarization_ingam_change: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Seal (change) registration form"],
    title: "Seal (change) registration form — new seal registration or change",
    docs: [
      "Seal (change) registration form — available at the consulate or download from the website",
      "  ▸ Must be handwritten and signed before the consul (no typing/copies; must use the statutory form)",
      "  ▸ Enter the agent's details: name, resident registration number, Korean address",
      "  ▸ Enter the guarantor's details: name, resident registration number, Korean address + guarantor's seal impression",
      "  ▸ ⚠️ The guarantor and the agent must be different people",
      "Notarization request form (designated form — must be handwritten)",
      "Your valid Korean passport original + 1 copy",
      "  ▸ Passport issued after Dec 20, 2020 (resident number removed) → add a passport information certificate",
      "Canadian residency-status proof, original",
      "  ▸ If you wish to have the seal stamp made in Korea: this can be delegated by signature (the agent brings the stamp in Korea)",
    ],
    costs: [
      { label: "Per seal (change) registration form", value: "CAD $5.40 (Cash, Debit, Credit)" },
      { label: "Passport information certificate (if applicable)", value: "CAD $1.00 added" },
    ],
    time: "Issued same day on visit",
    notices: [
      "📌 Guarantor = a third party who vouches for the registrant's genuine intent. Must be an adult whose seal is registered in Korea, and the guarantor's seal must be stamped before submitting the document to the seal-certificate office.",
      "📌 Agent = the person who visits the certificate/seal-issuing office in Korea in person to process the matter.",
      "⚠️ The guarantor and the agent must be different people.",
      "⚠️ The registrant (you) must visit in person — proxy applications not allowed. A minor visits with a legal guardian.",
      "The registrant must have a resident registration number (those whose number is cancelled cannot apply).",
      "If you want a new seal stamp made in Korea: this can be done by signature — the agent makes the stamp in Korea and brings it when processing.",
    ],
    bookingLabel: "Book Appointment (Notarization → Seal registration) →",
  },
  notarization_ingam_protect: {
    breadcrumb: ["Home", "Notarization", "Seal (ingam)", "Seal protection (release)"],
    title: "Seal protection (release) request",
    docs: [
      "Seal protection (release) request form — available at the consulate or download from the website",
      "  ▸ Must be handwritten and signed before the consul",
      "Notarization request form (designated form — must be handwritten)",
      "Your valid Korean passport original + 1 copy",
      "  ▸ Passport issued after Dec 20, 2020 (resident number removed) → add a passport information certificate",
      "Canadian residency-status proof, original",
    ],
    costs: [
      { label: "Per copy", value: "CAD $5.40 (Cash, Debit, Credit)" },
    ],
    time: "Issued same day on visit",
    notices: [
      "When you apply for seal protection, issuance of your seal certificate in Korea is blocked — to prevent misuse.",
      "When you release seal protection, your seal certificate can be issued again.",
      "Must visit in person — proxy applications not allowed.",
    ],
    bookingLabel: "Book Appointment (Notarization → Seal protection) →",
  },

  notarization_translation: {
    breadcrumb: ["Home", "Notarization", "Translation certification"],
    question: "Where will you submit the translation-certified document?",
    sub: "This service translates a Korean document into English and has the consulate certify it. If you need an international authenticity certification (Apostille), use 'Korean-issued document for use abroad' on the first screen instead.",
    intro: [
      "⚠️ Check first — some receivers do NOT accept consular translation certification:",
      "  ▸ Canadian immigration (IRCC) submissions (visa·PR·citizenship) → consular translation NOT accepted; a certified translator is required",
      "  ▸ ServiceOntario name-change submissions → consular translation NOT accepted",
      "  ▸ If either applies, select that item below for details.",
    ],
    options: {
      notarization_translation_ircc_no: { title: "Submit to Canadian immigration (IRCC)", desc: "Documents for visa, PR, or citizenship applications" },
      notarization_translation_namechange_no: { title: "ServiceOntario — name change submission", desc: "Birth certificate translation for a Name Change application" },
      notarization_translation_type: { title: "Other institutions (Korean agencies, schools, companies, etc.)", desc: "Consular translation certification available" },
    },
  },
  notarization_translation_ircc_no: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "IRCC not accepted"],
    title: "❌ Canadian immigration (IRCC) submission — consular translation not accepted",
    docs: [
      "Canadian immigration does not accept the consulate's 'third-party translation certification' method.",
      "To translate and submit Korean documents (birth/marriage/family relation/transcript, etc.) for a visa, PR, or citizenship application:",
      "  ▸ Translation certification by a certified professional translator in Canada is required",
      "  ▸ Or translation certification through a lawyer is required",
      "  ▸ Consular translation certification will be rejected upon submission.",
    ],
    costs: [{ label: "N/A", value: "Cannot be processed at the consulate" }],
    time: "N/A",
    notices: [
      "Contact a professional translator or an immigration lawyer.",
      "IRCC official guidance: ircc.canada.ca",
    ],
  },
  notarization_translation_namechange_no: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "ServiceOntario name change not accepted"],
    title: "❌ ServiceOntario name change — consular translation not accepted",
    docs: [
      "For a birth certificate translation submitted with a Name Change application to ServiceOntario, the consulate's 'third-party translation certification' method is also not accepted.",
      "For name-change translation documents, contact ServiceOntario directly to confirm the accepted translation method.",
    ],
    costs: [{ label: "N/A", value: "Cannot be processed at the consulate" }],
    time: "N/A",
    notices: [
      "ServiceOntario inquiry: ontario.ca/page/change-your-name",
      "For institutions other than immigration/name change, the receiving institution decides — confirm with them first.",
    ],
  },
  notarization_translation_type: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Document type"],
    question: "Which document do you need a translation certification for?",
    sub: "The required form and documents differ by document type.",
    options: {
      notarization_translation_family: { title: "Full translation of family relation/basic/marriage certificate, etc.", desc: "Must bring your own English translation" },
      notarization_translation_cert: { title: "Birth/marriage/divorce/death certificate (consulate form)", desc: "Filled out on the consulate-provided form — no separate translation needed" },
    },
  },
  notarization_translation_family: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Full translation certification"],
    title: "Translation certification — family relation/basic/marriage certificate, etc.",
    docs: [
      "Korean original document — original",
      "  ▸ Family relation certificate, basic certificate, marriage relation certificate, removed family register, etc.",
      "Full English translation — written by you",
      "  ▸ Prepare in advance using the sample form on the consulate website",
      "  ▸ Translate the entire original without omission — certification not possible if anything is omitted or added",
      "Passport original",
      "Fee payment",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit (10+ copies: next-day pickup)",
    notices: [
      "⚠️ Mail submission not accepted — must apply in person.",
      "No professional translator required — you may translate it yourself.",
      "Responsibility for the translation lies with the translator; the consulate does not review the translation's accuracy.",
      "⚠️ Consular translation certification is not accepted for documents submitted to Canadian immigration (IRCC).",
    ],
    bookingLabel: "Book Appointment (Notarization → Translation) →",
  },
  notarization_translation_cert: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Birth/marriage/divorce/death certificate"],
    title: "Which certificate do you need?",
    sub: "A consulate form is used. If you need marriage proof for a Canadian pension (CPP/OAS) application, see the separate guide.",
    options: {
      notarization_translation_birth: { title: "Birth Certificate", desc: "Bring family relation certificate + basic certificate" },
      notarization_translation_marriage: { title: "Marriage Certificate", desc: "Bring marriage relation certificate (within 3 months)" },
      notarization_translation_divorce: { title: "Divorce Certificate", desc: "Bring marriage relation certificate (within 3 months)" },
      notarization_translation_death: { title: "Death Certificate", desc: "Bring the person's basic certificate" },
      notarization_translation_pension: { title: "Marriage proof for Canadian pension (CPP/OAS)", desc: "2-step process: issue marriage relation certificate (2 weeks) + translation certification" },
    },
  },
  notarization_translation_birth: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Birth Certificate"],
    title: "Birth Certificate — translation certification",
    docs: [
      "Consulate form (English birth certificate form) — completed at the consulate",
      "Family relation certificate (Korean) original",
      "Basic certificate (Korean) original",
      "Passport original",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Mail submission not accepted — must apply in person.",
      "⚠️ Not accepted for Canadian immigration (IRCC) submission.",
    ],
    bookingLabel: "Book Appointment (Notarization → Translation) →",
  },
  notarization_translation_marriage: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Marriage Certificate"],
    title: "Marriage Certificate — translation certification",
    docs: [
      "Consulate form (English marriage certificate form) — completed at the consulate",
      "Marriage relation certificate (Korean) original — issued within 3 months",
      "Passport original",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Mail submission not accepted — must apply in person.",
      "⚠️ Not accepted for Canadian immigration (IRCC) submission.",
      "For a Canadian pension (CPP/OAS) application, a 2-step process is required — use the 'Marriage proof for Canadian pension' menu.",
    ],
    bookingLabel: "Book Appointment (Notarization → Translation) →",
  },
  notarization_translation_divorce: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Divorce Certificate"],
    title: "Divorce Certificate — translation certification",
    docs: [
      "Consulate form (English divorce certificate form) — completed at the consulate",
      "Marriage relation certificate (Korean) original — issued within 3 months",
      "Passport original",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Mail submission not accepted — must apply in person.",
      "⚠️ Not accepted for Canadian immigration (IRCC) submission.",
    ],
    bookingLabel: "Book Appointment (Notarization → Translation) →",
  },
  notarization_translation_death: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Death Certificate"],
    title: "Death Certificate — translation certification",
    docs: [
      "Consulate form (English death certificate form) — completed at the consulate",
      "The person's basic certificate (Korean) original",
      "Passport original",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Mail submission not accepted — must apply in person.",
      "⚠️ Not accepted for Canadian immigration (IRCC) submission.",
    ],
    bookingLabel: "Book Appointment (Notarization → Translation) →",
  },
  notarization_translation_pension: {
    breadcrumb: ["Home", "Notarization", "Translation certification", "Marriage proof for Canadian pension"],
    title: "Marriage proof for Canadian pension (CPP/OAS) — 2-step process",
    docs: [
      "📌 The marriage relation certificate is issued in Korean only, so the 2-step process below is required.",
      "① First visit — issue the marriage relation certificate (booking service: family relation certificate issuance)",
      "  ▸ Booking: torbooking.com",
      "  ▸ See the Family Register menu for the marriage relation certificate application documents",
      "  ▸ Processing time: about 2 weeks",
      "② Second visit — translation certification (booking service: notarization)",
      "  ▸ Book a date about 2 weeks after the first visit",
      "  ▸ Booking: torbooking.com",
      "  ▸ Documents: issued marriage relation certificate original + passport original",
      "  ▸ Processing time: immediate",
    ],
    costs: [
      { label: "Marriage relation certificate issuance", value: "Separate (see Family Register menu)" },
      { label: "Translation certification, per case", value: "CAD $5.40 (Cash, Debit, Credit)" },
    ],
    time: "About 2+ weeks total (2 weeks for the certificate after the first visit + second visit)",
    notices: [
      "⚠️ Two visits are required — first (apply for the marriage relation certificate), second (translation certification).",
      "⚠️ Book the second appointment for a date about 2 weeks after the first visit.",
      "If your pension application schedule is tight, prepare well in advance.",
    ],
    bookingLabel: "Book 1st Appointment (marriage relation certificate) →",
  },
  notarization_translation_license_start: {
    breadcrumb: ["Home", "Notarization", "Driver's license"],
    question: "What driver's license service do you need?",
    sub: "There is a mutual license exchange agreement between Ontario and Korea. Select the service you need.",
    options: {
      notarization_translation_license: { title: "Driver's license English translation certificate", desc: "Needed to exchange a Korean license for a Canadian one — visit the consulate" },
      notarization_translation_driving_record: { title: "English driving record certificate", desc: "Can be issued online if you have a joint certificate (digital certificate)" },
      notarization_translation_license_exchange: { title: "License exchange procedure guide", desc: "Korea ↔ Ontario license exchange — ServiceOntario guidance" },
    },
  },
  notarization_translation_license: {
    breadcrumb: ["Home", "Notarization", "Driver's license", "English translation certificate"],
    title: "Driver's license English translation certificate",
    docs: [
      "Driver's license translation application form (download from the consulate website or available at the consulate)",
      "Valid Korean driver's license original",
      "Korean driver's license photocopy (front and back, 1 each)",
      "Passport original + photocopy, 1 each",
    ],
    costs: [{ label: "Fee", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "Must visit the consulate in person — booking: torbooking.com (Notarization → driver's license translation & English driving record).",
      "For exchange procedure, fees, and details, contact ServiceOntario: ontario.ca/page/exchange-out-province-drivers-licence",
      "Before visiting the consulate, confirm with ServiceOntario whether additional documents are required.",
    ],
    bookingLabel: "Book Appointment (Notarization → license translation) →",
  },
  notarization_translation_driving_record: {
    breadcrumb: ["Home", "Notarization", "Driver's license", "English driving record"],
    title: "Do you have a joint certificate (digital certificate)?",
    sub: "The issuance method differs depending on whether you have a joint certificate.",
    options: {
      notarization_translation_driving_online: { title: "Yes — issue online yourself", desc: "Issue directly at Gov24 or the Police traffic portal" },
      notarization_translation_driving_visit: { title: "No — apply at the consulate", desc: "Bring passport + residence visa (or PR Card)" },
    },
  },
  notarization_translation_driving_online: {
    breadcrumb: ["Home", "Notarization", "Driver's license", "English driving record (online)"],
    title: "English driving record — issue online yourself",
    docs: [
      "After logging in with a joint certificate (digital certificate), issue directly at the sites below:",
      "  ▸ Gov24: gov.kr",
      "  ▸ Police Traffic Minwon 24: efine.go.kr",
    ],
    costs: [{ label: "Fee", value: "See the respective site" }],
    time: "Issued immediately",
    notices: [
      "No consulate visit needed — you can issue it online yourself.",
    ],
  },
  notarization_translation_driving_visit: {
    breadcrumb: ["Home", "Notarization", "Driver's license", "English driving record (visit)"],
    title: "English driving record — apply at the consulate",
    docs: [
      "Passport original",
      "Canadian residence visa original or PR Card",
    ],
    costs: [{ label: "Fee", value: "See consulate guidance" }],
    time: "Processed same day on visit",
    notices: [
      "Appointment required: torbooking.com (Notarization → driver's license translation & English driving record).",
    ],
    bookingLabel: "Book Appointment →",
  },
  notarization_translation_license_exchange: {
    breadcrumb: ["Home", "Notarization", "Driver's license", "Exchange guide"],
    title: "Korea ↔ Ontario driver's license exchange guide",
    docs: [
      "📌 Korea–Ontario mutual license exchange agreement (effective Dec 17, 1998):",
      "  ▸ Korean license → Ontario G license: held the license for 2+ years",
      "  ▸ Korean license → Ontario G2 license: held the license for less than 2 years",
      "  ▸ Ontario A·B·C·D·E·F·G2·G license → exchangeable for a Korean Type 2 ordinary license",
      "Exchange procedure, fees, and documents are guided by ServiceOntario:",
      "  ▸ ontario.ca/page/exchange-out-province-drivers-licence",
    ],
    costs: [{ label: "N/A", value: "Processed by ServiceOntario" }],
    time: "Contact ServiceOntario",
    notices: [
      "License exchange is not a consular service — contact ServiceOntario.",
      "A driver's license English translation certificate or English driving record may be needed for the exchange — confirm with ServiceOntario first.",
      "Additional documents may be requested per individual.",
    ],
  },
  notarization_school: {
    breadcrumb: ["Home", "Notarization", "School record notarization"],
    question: "How would you like to apply?",
    sub: "⚠️ Only documents issued by accredited Ontario/Manitoba educational institutions can be notarized. Check eligibility first. 📅 For many documents, book one slot per 10 items (e.g., 13 sheets → 2 slots, 26 → 3 slots).",
    intro: [
      "💡 Notarization may not be needed — check first:",
      "  ▸ For transfer into a Korean elementary/middle/high school: documents from foreign schools recognized by Korea's Ministry of Education are accepted as the principal-issued original, without Apostille or consular authentication (since Sep 16, 2014). Check the Ministry's accredited-school list.",
      "  ▸ For university admission/transfer, elementary/middle/high school records may still need an Apostille or consular authentication — ask the university first.",
      "  ▸ University/College documents are Canadian-issued — use the 'Canadian-issued document' (Apostille) item on the first screen.",
    ],
    options: {
      notarization_school_visit: { title: "In person", desc: "Proxy submission also allowed" },
      notarization_school_mail: { title: "By mail", desc: "Distant residents only — Money Order required" },
    },
  },
  notarization_school_visit: {
    breadcrumb: ["Home", "Notarization", "School record notarization", "In person"],
    title: "Elementary/middle/high school record notarization — in person",
    docs: [
      "School record originals:",
      "  ▸ Diploma / enrollment certificate / transcript",
      "  ▸ For copy notarization: only allowed if it has the school's verification stamp/embossing or the principal's signature",
      "  ▸ Internet-issued documents: recognized as originals only if signed or stamped by the school",
      "The student's passport copy + visa copy, 1 each",
      "If a proxy submits: proxy's ID, original",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Only documents from schools registered as accredited institutions with the Ontario/Manitoba education authorities are accepted.",
      "Confirm before visiting whether the document is eligible — ineligible documents cannot be processed.",
      "Proxy submission allowed — the student does not have to visit in person.",
    ],
    bookingLabel: "Book Appointment (Notarization → School records) →",
  },
  notarization_school_mail: {
    breadcrumb: ["Home", "Notarization", "School record notarization", "By mail"],
    title: "Elementary/middle/high school record notarization — by mail",
    docs: [
      "Notarization request form — 1 per applicant, handwritten and signed",
      "  ▸ If a proxy applies: the proxy writes and signs the request form, and encloses a copy of the proxy's ID",
      "School record original + photocopy",
      "  ▸ When enclosing original + copy, you must note the desired number of notarizations and the details",
      "The student's passport copy + visa copy, 1 each",
      "If a proxy applies: 1 copy of the proxy's ID",
      "Fee — Money Order (payable to 'Korean Consulate')",
      "  ▸ Personal cheques not accepted / from Korea, only a KEB Hana Bank remittance cheque is accepted",
      "Return envelope (required):",
      "  ▸ Within Canada: Canada Post Xpresspost envelope (with recipient info filled in)",
      "  ▸ To Korea: Prepaid DHL return envelope + international shipping waybill enclosed",
      "Mailing address: Notarization Dept., Consulate General of the Republic of Korea in Toronto, 555 Avenue Road, Toronto, ON M4V 2J7",
    ],
    costs: [{ label: "Per case", value: "CAD $5.40 — Money Order only" }],
    time: "At least 3 days excluding mail delivery (extended if documents are incomplete)",
    notices: [
      "⚠️ Only documents issued by accredited Ontario/Manitoba educational institutions can be notarized.",
      "⚠️ Mail submission is for distant residents only.",
      "⚠️ The consulate is not responsible for loss or accidents in the mail.",
      "Fee is by Money Order as a rule — if enclosing cash, you must use Xpresspost; personal cheques not accepted.",
      "If no return envelope is enclosed, you cannot receive the processed documents — be sure to enclose one.",
      "Keep your Xpresspost tracking number separately; you can check delivery status at canadapost.ca.",
    ],
  },

  // ════════════ 병역(military) 영어 번역 ════════════
  military_start: {
    breadcrumb: ["Home", "Military Service"],
    question: "What military service matter do you need?",
    sub: "Military service applies to male Korean nationals. For a congenital dual-national male, the nationality-exit report (giving up nationality, not for evading service) is in the 'Nationality' menu — note the deadline: it can be filed only until Mar 31 of the year he turns 18.",
    options: {
      military_permit_start: { title: "Overseas travel permit — apply/extend", desc: "Apply to defer military service while residing in Canada" },
      military_permit_2ndgen: { title: "Overseas Korean (2nd generation)", desc: "Born abroad / emigrated young — once confirmed, no travel permit needed" },
      military_cert_start: { title: "Military service certificate issuance", desc: "Certificate of military status for visa, employment, nationality exit, etc." },
    },
  },
  military_permit_start: {
    breadcrumb: ["Home", "Military Service", "Overseas travel permit"],
    question: "What is your situation?",
    sub: "The permit period, required documents, and application route differ completely by situation. Select the exact type.",
    options: {
      military_permit_pr: { title: "Permanent resident (self or parents)", desc: "Holds a PR Card — until age 37 or within a 3-year range" },
      military_permit_dual: { title: "Dual citizen (holds Canadian citizenship)", desc: "Living with parents or 10+ years abroad — until age 37" },
      military_permit_family5: { title: "Lived abroad 5+ years with parents (other)", desc: "Long-term residence with parents without PR/citizenship" },
      military_permit_short: { title: "Short-term travel permit", desc: "Temporary departure/short stay — under age 27, apply online via MMA as a rule" },
    },
  },
  military_permit_pr: {
    breadcrumb: ["Home", "Military Service", "Overseas travel permit", "Permanent resident"],
    title: "Overseas travel permit — Permanent resident",
    docs: [
      "Overseas travel permit application (must be filled in with a ballpoint/ink pen)",
      "  ▸ Accurately state your Korean address (resident registration address), family in Korea, phone, and email",
      "Family residence confirmation form (designated form)",
      "Your valid Korean passport original + 1 copy",
      "PR Card original + 1 copy",
      "  ▸ If you have landed but not yet received the PR Card: apply after issuance (or contact the competent MMA office)",
      "If you entered via Canada transiting from Korea: flight ticket with the full itinerary, or Canada entry/exit record",
      "  ▸ Not required for direct entry",
      "Apply in person",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks (result: MMA website www.mma.go.kr → real-time overseas travel permit lookup)",
    notices: [
      "⚠️ Apply at least 3 months before the permit period expires.",
      "⚠️ From May 3, 2026: failure to return within 15 days after the permit expires results in prosecution (shortened from 30 days).",
      "Permit period guide:",
      "  ▸ Resided continuously for 3+ years after obtaining PR → until age 37",
      "  ▸ Resided less than 3 years after obtaining PR → once within a 3-year range",
      "  ▸ Conditional/temporary PR holders → within 6 months beyond the PR validity",
      "If you obtained PR before age 25 and have resided continuously, you may be deemed permitted until age 37 without a separate application (Enforcement Decree of the Military Service Act, Art. 149) — confirm with the MMA.",
      "Cancellation warning: staying in Korea for a cumulative 6+ months within any 1-year period cancels the permit and imposes military duty.",
      "Cancellation warning: filing a permanent-return report under the Overseas Migration Act cancels the permit and imposes military duty.",
      "Domestic profit activity warning: a cumulative 60+ days of employment/business (including real estate rental)/performance income in a year cancels the permit.",
    ],
    bookingLabel: "Book Appointment (Military → Overseas travel permit) →",
    onlineLabel: "Go to the MMA website",
  },
  military_permit_dual: {
    breadcrumb: ["Home", "Military Service", "Overseas travel permit", "Dual citizen"],
    title: "Overseas travel permit — Dual citizen",
    docs: [
      "Overseas travel permit application (must be filled in with a ballpoint/ink pen)",
      "  ▸ Accurately state your Korean address, family in Korea, phone, and email",
      "Family residence confirmation form (state parents' occupation and residence period in detail)",
      "Personal information consent form — signed by father, mother, and self each",
      "Your birth certificate (Birth Certificate Longform)",
      "Your basic certificate + family relation certificate, 1 each",
      "  ▸ With a joint certificate, can be issued online at Minwon24",
      "  ▸ If immediate family resides in Korea: originals issued by a community/district office (scans/photos not accepted)",
      "  ▸ You or an immediate family member may apply at the consulate (resident number and registration base address required)",
      "Your and your parents' passport originals + copies, 1 each",
      "Your and your parents' residence-visa originals + copies, 1 each (citizenship certificate, PR Card, etc.)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "Types eligible for the permit period (until age 37):",
      "  ▸ Living abroad with parents who hold PR/citizenship",
      "  ▸ Living abroad with parents since before age 24",
      "  ▸ Resided abroad continuously for 10+ years",
      "⚠️ Application window: from Jan 1 of the year you turn 24 to Jan 15 of the year you turn 25.",
      "  ▸ Born 2001: Jan 1, 2025 – Jan 15, 2026 / Born 2002: Jan 1, 2026 – Jan 15, 2027",
      "⚠️ Apply at least 3 months before the permit period expires (allowing time for document review).",
      "⚠️ From May 3, 2026: failure to return within 15 days after the permit expires results in prosecution.",
      "Cancellation warning: staying in Korea a cumulative 6+ months in a year, or profit activity (60+ days/year, including real estate rental), cancels the permit and imposes military duty.",
      "If a parent files a permanent-return report or stays in Korea a cumulative 6+ months in a year, the permit is cancelled.",
    ],
    bookingLabel: "Book Appointment (Military → Overseas travel permit) →",
    onlineLabel: "Go to the MMA website",
  },
  military_permit_family5: {
    breadcrumb: ["Home", "Military Service", "Overseas travel permit", "5+ years with parents"],
    title: "Overseas travel permit — Lived abroad 5+ years with parents",
    docs: [
      "Overseas travel permit application (must be filled in with a ballpoint/ink pen)",
      "  ▸ Accurately state your resident registration address, family in Korea, phone, and email",
      "Family residence confirmation form (state parents' occupation and residence period in detail, e.g., Jan 15, 1991 – present)",
      "Personal information consent form — signed by father, mother, and self each",
      "Your and your parents' passport originals + copies, 1 each",
      "Your and your parents' valid Canadian visa originals + copies, 1 each",
      "Basic certificate + family relation certificate copies, 1 each",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 1–2 months",
    notices: [
      "Permit period: until age 37 (when residing abroad continuously with parents for 5+ years)",
      "⚠️ If a parent is a government official or expatriate dispatched overseas, this type is excluded.",
      "⚠️ Application window: from Jan 1 of the year you turn 24 to Jan 15 of the year you turn 25.",
      "  ▸ Born 2001: Jan 1, 2025 – Jan 15, 2026 / Born 2002: Jan 1, 2026 – Jan 15, 2027",
      "⚠️ From May 3, 2026: failure to return within 15 days after the permit expires results in prosecution.",
      "Check the result: 2 weeks after applying, via real-time overseas travel permit lookup at the MMA website (www.mma.go.kr).",
    ],
    bookingLabel: "Book Appointment (Military → Overseas travel permit) →",
    onlineLabel: "Go to the MMA website",
  },
  military_permit_2ndgen: {
    breadcrumb: ["Home", "Military Service", "2nd-gen overseas Korean"],
    title: "Second-generation overseas Korean — confirmation application",
    docs: [
      "Second-generation overseas Korean confirmation application (designated form)",
      "  ▸ If you attended elementary/middle/high school in Korea before age 17, state the school name and period",
      "Family residence confirmation form (designated form)",
      "Personal information consent form — signed by applicant, father, and mother",
      "Your residency-status proof original + copy (PR: PR Card / citizen: Canadian passport)",
      "Your Birth Certificate original + copy",
      "Your passport(s) original + copy (all, if you hold both Korean and Canadian)",
      "Parents' passport(s) original + copy (all, if they hold both Korean and Canadian)",
      "Parents' residency-status proof original + copy (PR Card or Canadian citizenship certificate)",
      "Your basic certificate (detailed, full resident number) + family relation certificate (detailed, full resident number)",
      "If parents divorced before you turned 17: add the parents' marriage relation certificate (if unreported in Korea, the Canadian divorce judgment original + Korean translation)",
      "If a parent is deceased: death certificate (not needed if death is recorded in the family register)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "Can apply from age 18 (when the military duty arises).",
      "Eligibility for second-generation overseas Korean:",
      "  ▸ Born abroad (including departure before age 6) + resided abroad continuously until age 17",
      "  ▸ Parents and self hold foreign nationality/citizenship or PR",
      "  ▸ To count as 'continuous residence,' stays in Korea must be within 90 days per year before age 17",
      "⚠️ Important: even after submitting all documents, the MMA review may deny it — contacting the MMA (1588-9090) before applying is strongly recommended.",
      "After confirmation: the 'departure-confirmation exempt (2nd-gen overseas Korean)' stamp is placed in the person's passport.",
      "Cancellation conditions: total stays in Korea exceeding 3 years after the reference date, or a parent's permanent-return report.",
    ],
    bookingLabel: "Book Appointment (Military → 2nd-gen overseas Korean) →",
    onlineLabel: "MMA 2nd-gen overseas Korean info",
  },
  military_permit_short: {
    breadcrumb: ["Home", "Military Service", "Overseas travel permit", "Short-term travel permit"],
    title: "Short-term travel permit",
    docs: [
      "⚠️ The short-term travel permit is, as a rule, applied for online via the MMA website.",
      "Online application: MMA website (www.mma.go.kr) → Military Service Affairs → Overseas Travel/Stay → Overseas Travel Permit application",
      "Documents if applying in person at the consulate:",
      "Overseas travel (period extension) permit application (designated form)",
      "Confirmation of sanctions for violating permit obligations",
      "Passport original + 1 copy of the bio-data page",
      "Canadian residence visa original + 1 copy",
      "  ▸ The original is returned immediately after verification",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "After MMA review, the permit can be printed online",
    notices: [
      "Eligible: those subject to conscription exam, active-duty enlistment, or public-service call (unfulfilled, age 25+)",
      "Permit period: within a range not exceeding age 27",
      "  ▸ Until May 2, 2026: up to 6 months at a time (no limit on extensions)",
      "  ▸ From May 3, 2026: up to 1 month at a time, extendable up to 2 times after departure (within 2 years total)",
      "⚠️ From May 3, 2026: failure to return within 15 days after the permit expires results in prosecution (was 30 days).",
      "If an enlistment date is set: permitted only up to 5 days before the enlistment date.",
      "Sanctions for violating permit obligations: up to 3 years imprisonment, passport issuance restrictions, employment/licensed-business restrictions until age 40, and public disclosure on the MMA website.",
      "Application timing: those in Korea apply up to 2 days before the planned departure / extensions up to 15 days before expiry.",
    ],
    bookingLabel: "Book Appointment (Military → Short-term travel permit) →",
  },
  military_cert_start: {
    breadcrumb: ["Home", "Military Service", "Military service certificate"],
    question: "Who is the applicant?",
    sub: "With a joint certificate, you can issue it yourself online at Gov24 — no consulate visit needed.",
    options: {
      military_cert_online: { title: "Online issuance (joint certificate)", desc: "Issued instantly at Gov24 — no consulate visit needed" },
      military_cert_self: { title: "Apply in person at the consulate", desc: "About 10 days" },
      military_cert_family: { title: "Family applies on behalf", desc: "Lineal ascendant/descendant, sibling, spouse — about 10 days" },
      military_cert_proxy: { title: "A proxy applies", desc: "Power of attorney required — about 10 days" },
    },
  },
  military_cert_online: {
    breadcrumb: ["Home", "Military Service", "Military service certificate", "Online"],
    title: "Military service certificate — online issuance",
    docs: [
      "Access Gov24 with a joint certificate and issue:",
      "  ▸ Gov24 (www.gov.kr) → search 'military service certificate' → apply for issuance",
      "  ▸ An English military service certificate can also be issued at Gov24",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "If you have no joint certificate, apply at the consulate, or issue a joint certificate via the certificate menu first.",
      "Military ID and discharge certificate cannot be issued — only the military service certificate.",
      "When applying for the English certificate, ID such as a passport showing your name in English is required.",
    ],
  },
  military_cert_self: {
    breadcrumb: ["Home", "Military Service", "Military service certificate", "In person"],
    title: "Military service certificate — apply in person",
    docs: [
      "Military service certificate application form (available at the consulate)",
      "Personal information collection/use consent form (available at the consulate)",
      "ID such as a resident registration card or passport",
      "  ▸ For the English certificate: submit ID such as a passport showing your name in English",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 10 days",
    notices: [
      "Military ID and discharge certificate cannot be issued — only the military service certificate.",
      "With a joint certificate, you can issue it instantly online at Gov24.",
    ],
    bookingLabel: "Book Appointment (Certificates → Military service certificate) →",
  },
  military_cert_family: {
    breadcrumb: ["Home", "Military Service", "Military service certificate", "Family on behalf"],
    title: "Military service certificate — family applies on behalf",
    docs: [
      "Military service certificate application form (available at the consulate)",
      "Personal information collection/use consent form (available at the consulate)",
      "The family member (proxy)'s ID",
      "A copy of the subject person's ID",
      "A document that can prove your relationship",
      "  ▸ Family relation certificate or removed family register, etc.",
      "  ▸ If the relationship cannot be confirmed: military service certificate power of attorney (Form No. 3) + delegator's ID + proxy's ID",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 10 days",
    notices: [
      "Eligible family: lineal ascendants/descendants (parents, children, grandparents, grandchildren), siblings, spouse.",
      "Military ID and discharge certificate cannot be issued.",
    ],
    bookingLabel: "Book Appointment (Certificates → Military service certificate) →",
  },
  military_cert_proxy: {
    breadcrumb: ["Home", "Military Service", "Military service certificate", "Proxy"],
    title: "Military service certificate — proxy application",
    docs: [
      "Military service certificate application form (available at the consulate)",
      "Personal information collection/use consent form (available at the consulate)",
      "A copy of the subject person (delegator)'s ID (resident registration card or passport)",
      "Proxy's ID original + copy",
      "Military service certificate power of attorney (Form No. 3)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 10 days",
    notices: [
      "Military ID and discharge certificate cannot be issued.",
      "With a joint certificate, you can issue it instantly online at Gov24.",
    ],
    bookingLabel: "Book Appointment (Certificates → Military service certificate) →",
  },

  // ════════════ 가족관계등록(family) 영어 번역 ════════════
  family_start: {
    breadcrumb: ["Home", "Family Register"],
    question: "What do you need?",
    sub: "Family register services fall into three areas: certificate issuance, reports, and record correction.",
    options: {
      family_cert: { title: "Certificate issuance", desc: "Family relation, basic, marriage relation, English certificate, etc." },
      family_report: { title: "Reports", desc: "Birth, marriage, divorce, death, acknowledgment reports" },
      family_fix: { title: "Record correction", desc: "Ex officio correction of a foreign family member's record" },
    },
  },
  family_cert: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance"],
    question: "Which certificate do you need?",
    sub: "With a joint certificate, you can issue it online instantly and free — no consulate visit needed.",
    options: {
      family_cert_korean: { title: "Korean-language certificate", desc: "Family relation, basic, marriage relation, adoption relation, removed register, etc." },
      family_cert_english: { title: "English certificate", desc: "English certificate with your, parents', and spouse's information" },
    },
  },
  family_cert_korean: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Korean certificate"],
    question: "How would you like to obtain it?",
    sub: "With a joint certificate, you can issue it online instantly and free.",
    options: {
      family_cert_online: { title: "Online issuance (joint certificate)", desc: "Instant · free · no consulate visit needed" },
      family_cert_family_kr: { title: "Through immediate family in Korea", desc: "Immediate family in Korea issues it instantly at a community center" },
      family_cert_proxy: { title: "Proxy after notarizing a power of attorney", desc: "Notarize a power of attorney at the consulate → agent in Korea issues it" },
      family_cert_visit: { title: "Consulate visit or mail", desc: "If you have no joint certificate — about 2 weeks, fee $1.30/copy" },
    },
  },
  family_cert_online: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Online"],
    title: "Korean certificate — online issuance",
    docs: [
      "Log in with a joint certificate and issue at:",
      "  ▸ Electronic Family Relation Registration System: efamily.scourt.go.kr",
      "  ▸ Gov24: gov.kr",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "Only Korean nationals can issue — if you have no nationality (even without filing a loss report after acquiring citizenship), issuance is not possible.",
      "If you have no joint certificate, you can apply at the consulate (see the joint certificate issuance menu).",
      "Those who completed a nationality-loss report before 2008: family relation/basic certificates cannot be issued — only the removed family register.",
    ],
    onlineLink: "https://efamily.scourt.go.kr",
  },
  family_cert_family_kr: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Through family in Korea"],
    title: "Korean certificate via immediate family in Korea",
    docs: [
      "No power of attorney needed — immediate family in Korea visits a nearby community/district/town office",
      "Immediate family scope: grandparents, parents, children, grandchildren, spouse",
      "  ▸ Siblings and daughters-in-law are not immediate family",
    ],
    costs: [{ label: "Fee", value: "Per the local community center" }],
    time: "Immediate",
    notices: [
      "This is the fastest method — if you have immediate family in Korea, use it first.",
      "If the subject lost nationality by acquiring a foreign nationality before marriage: spouse/children may not appear in the family register, so additional documents are needed (e.g., Canadian marriage certificate original + Korean translation).",
      "Those who completed a nationality-loss report before 2008: only the removed family register can be issued.",
    ],
  },
  family_cert_proxy: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Proxy after notarized PoA"],
    title: "Proxy issuance after notarizing a power of attorney",
    docs: [
      "Visit the consulate to notarize a power of attorney (Notarization menu → Private document certification → general power of attorney)",
      "Send the notarized power of attorney to your agent in Korea",
      "The agent visits any district/community office with their ID + the power of attorney",
      "  ▸ You must know the delegator's registration base address and name",
    ],
    costs: [{ label: "Power of attorney notarization fee", value: "CAD $2.70" }],
    time: "Immediate (when the agent visits)",
    notices: [
      "Notarization appointment required: torbooking.com",
    ],
    bookingLabel: "Book Appointment (Notarization → Power of attorney) →",
  },
  family_cert_visit: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Consulate visit/mail"],
    question: "Select a pickup method",
    options: {
      family_cert_visit_direct: { title: "Apply & pick up at the consulate", desc: "Pick up after about 2 weeks (appointment required)" },
      family_cert_visit_mail: { title: "Apply & receive by mail", desc: "About 2 weeks + delivery (Xpresspost envelope required)" },
    },
  },
  family_cert_visit_direct: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Consulate visit"],
    title: "Korean certificate — consulate visit",
    docs: [
      "Application for issuance of family register certificates (consulate form)",
      "  ▸ Must state the resident registration number (if unknown, state the registration base address)",
      "Applicant's ID original + copy (passport, PR Card, driver's license, etc.)",
      "Identity confirmation statement (if applicable) — when the Korean-registered name differs from the Canadian ID name",
      "  ▸ Signatures of 2 relatives within the 4th degree required",
      "Marriage Certificate original + copy — if you took your husband's surname while the marriage is unreported in Korea",
    ],
    costs: [{ label: "Fee per copy", value: "CAD $1.30 (Cash, Debit, Credit)" }],
    time: "About 2 weeks (no notification call when ready — visit to pick up on the scheduled date)",
    notices: [
      "Appointment required: torbooking.com — immediate family (grandparents, parents, children, grandchildren, spouse) may apply without a power of attorney, but each needs a separate appointment.",
      "Siblings and daughters-in-law are not immediate family.",
      "Those who completed a nationality-loss report before 2008: family relation/basic certificates cannot be issued → apply only for the removed family register (must state registration base address, head-of-household name, and relationship).",
      "If nationality-loss reporting status is unclear: apply for the basic certificate, family relation certificate, and removed family register all together.",
      "You may pick up without an appointment, but appointment holders are prioritized, so wait times can be long.",
      "💡 If you need a marriage relation certificate for a Canadian pension (CPP/OAS) application: after issuance, see the additional steps under Notarization → Translation certification.",
    ],
    bookingLabel: "Book Appointment (family relation certificate) →",
  },
  family_cert_visit_mail: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "Mail application"],
    title: "Korean certificate — mail application",
    docs: [
      "Application for issuance of family register certificates (form)",
      "Applicant's ID copy",
      "Subject's ID copy (if different from the applicant)",
      "Identity confirmation statement (if applicable) — when the Korean-registered name differs from the Canadian ID name",
      "Fee: CAD $1.30/copy — cash or Money Order",
      "Return Xpresspost registered envelope (buy at Canada Post) — write your own address as both sender and recipient",
    ],
    costs: [{ label: "Fee per copy", value: "CAD $1.30 (Cash or Money Order)" }],
    time: "About 2 weeks + mail delivery",
    notices: [
      "Those who completed a nationality-loss report before 2008: only the removed family register can be requested.",
      "If no return envelope is enclosed, you cannot receive the documents.",
    ],
  },
  family_cert_english: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "English certificate"],
    question: "How would you like to obtain it?",
    sub: "The English certificate contains your, your parents', and your spouse's information on one document. Children's information is not included.",
    options: {
      family_cert_english_online: { title: "Online issuance (joint certificate)", desc: "Issued instantly and free at the Electronic Family Relation Registration System" },
      family_cert_english_visit: { title: "Consulate visit", desc: "About 10 days — must state the registration base address accurately" },
    },
  },
  family_cert_english_online: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "English certificate", "Online"],
    title: "English certificate — online issuance",
    docs: [
      "Log in with a joint certificate and issue:",
      "  ▸ Electronic Family Relation Registration System: efamily.scourt.go.kr → free English certificates for self, parents, spouse, children",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "Information included: self (name, sex, date of birth, resident number, place of birth), parents (name, sex, date of birth, resident number), spouse (name, sex, date of birth, resident number, marriage date) — children's information not included.",
      "Cannot be issued if the family register is closed due to death, nationality loss, etc.",
      "If you have a foreign family member: bring that member's passport and apply to register their name in English.",
      "If you need detailed information (name change, past marriage/divorce, children, etc.): issue the Korean detailed basic/family relation/marriage relation certificate and have it translation-certified.",
      "⚠️ For Canadian immigration (IRCC) submission, consular translation certification is not accepted — a professional translator is required (see Notarization → Translation certification).",
    ],
    onlineLink: "https://efamily.scourt.go.kr",
  },
  family_cert_english_visit: {
    breadcrumb: ["Home", "Family Register", "Certificate issuance", "English certificate", "Consulate visit"],
    title: "English certificate — consulate visit",
    docs: [
      "Application for issuance of family register certificates (available at the consulate)",
      "  ▸ Must state the registration base address (bonjeok) accurately — cannot be issued if missing or wrong",
      "Applicant's ID original + copy",
    ],
    costs: [{ label: "Fee", value: "CAD $1.30 (Cash, Debit, Credit)" }],
    time: "About 10 days",
    notices: [
      "Information included: self, parents, spouse — children's information not included.",
      "If you need detailed information, use the Korean certificate + translation certification.",
      "If you have a foreign family member: bringing that member's passport is required.",
    ],
    bookingLabel: "Book Appointment (family relation certificate) →",
  },

  family_report: {
    breadcrumb: ["Home", "Family Register", "Reports"],
    question: "What report do you need?",
    options: {
      family_birth: { title: "Birth report", desc: "Register a Canada-born child in the Korean register", sub: "A birth report should be filed within 1 month of birth (it can still be filed after the deadline, though an explanation of the delay may be required). Required documents depend on the parents' nationality combination." },
      family_marriage: { title: "Marriage report", desc: "Reflect a Canadian marriage in the Korean register" },
      family_divorce: { title: "Divorce report", desc: "Confirmation of divorce intent, or report after a Canadian court divorce" },
      family_death: { title: "Death report", desc: "A Korean national who died in Canada" },
      family_recognition: { title: "Acknowledgment report", desc: "Recognizing a child born out of wedlock as a legal child" },
    },
  },
  family_birth: {
    breadcrumb: ["Home", "Family Register", "Reports", "Birth report"],
    question: "Parents' nationality situation?",
    sub: "Required documents differ by the parents' nationality combination.",
    options: {
      family_birth_both_korean: { title: "Both parents Korean", desc: "Available after the marriage report is completed" },
      family_birth_father_korean: { title: "Father Korean + mother foreign", desc: "Long-form birth certificate required — out-of-wedlock requires a separate acknowledgment report" },
      family_birth_mother_korean: { title: "Mother Korean + father foreign", desc: "Long-form birth certificate required" },
      family_birth_unmarried: { title: "Unmarried Korean (out of wedlock)", desc: "If the father is unknown, the mother's surname and origin apply" },
    },
  },
  family_birth_both_korean: {
    breadcrumb: ["Home", "Family Register", "Reports", "Birth report", "Both parents Korean"],
    title: "Birth report — both parents Korean",
    docs: [
      "Electronic transmission application (form) — enter a KakaoTalk-linked phone number to receive result notifications",
      "Birth report form (form) — be sure to follow the sample; use only Korean and Arabic numerals",
      "  ▸ Address: write phonetically in Korean (e.g., 캐나다 온타리오주 토론토시 애비뉴로드 555번지)",
      "  ▸ Place of birth: hospital name + location (e.g., 캐나다 온타리오주 토론토시 세인트마이클 종합병원)",
      "  ▸ Child's registration base address: follow a parent's, or enter a new Korean address ('Canada' not allowed)",
      "  ▸ Remarks field: write the Canadian birth-certificate name in Korean as 'Foreign name: 스미스제임스길동'",
      "Birth certificate original, 1 copy (non-returnable)",
      "  ▸ Any type showing the parents' names is fine",
      "  ▸ If born within 200 days of marriage: Long-form birth certificate + Long-form marriage certificate copy",
      "Korean translation of the birth certificate (you may translate it yourself; no notarization; date, translator name, signature at the bottom)",
      "Identity confirmation statement (if applicable) — when the Korean-registered name differs from the Canadian-registered name",
      "Parents' passport originals + copies, 1 each",
      "  ▸ Dual citizens: submit copies of valid passports of all countries",
      "Parents' Canadian residency-status proof copies, 1 each",
      "  ▸ Visitor: residence visa / PR: PR Card front / Citizen: citizenship certificate (card type not allowed; oath date required) / Canada-born citizen: Birth Certificate",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks (report within 3 months recommended — late reports incur a fine of up to KRW 50,000 at a community center after entering Korea)",
    notices: [
      "⚠️ A birth report does not create a resident registration number — you must separately register residence at a community center after entering Korea.",
      "⚠️ If the marriage report is not complete, the birth report is accepted after the marriage report is processed (about 4 weeks).",
      "If using Chinese characters in the name: only Supreme Court name-use characters are allowed.",
      "The child's name is, as a rule, up to 5 characters.",
      "If a parent is a dual citizen: submit copies of valid passports of all countries.",
      "The birth certificate original is sent to Korea and not returned.",
    ],
    bookingLabel: "Book Appointment (Family Register → Birth report) →",
  },
  family_birth_father_korean: {
    breadcrumb: ["Home", "Family Register", "Reports", "Birth report", "Father Korean + mother foreign"],
    title: "Birth report — Father Korean + mother foreign",
    docs: [
      "Electronic transmission application (form)",
      "Birth report form (form) — use only Korean and Arabic numerals",
      "  ▸ State the father's registration base address accurately / write 'Canada' in the mother's registration base field",
      "  ▸ Child's registration base address: follow the father's, or enter a new Korean address",
      "  ▸ Remarks field: write the foreign name in Korean",
      "Birth Certificate Long-form (Certified copy of birth registration) original (non-returnable)",
      "Korean translation of the birth certificate (no notarization; date, name, signature at the bottom)",
      "Identity confirmation statement (if applicable)",
      "Parents' passport originals + copies, 1 each",
      "Parents' Canadian residency-status proof copies, 1 each",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "⚠️ Child born during marriage: parentage is recognized without the father's acknowledgment.",
      "⚠️ For a child born out of wedlock: the father's birth report alone cannot create the family register — a separate acknowledgment report and nationality acquisition process are required (see Acknowledgment report menu).",
      "If taking the foreign mother's surname: the surname cannot be in Chinese characters, but the given name may be.",
      "The birth certificate original is not returned.",
      "⚠️ After the birth report, the resident registration number is applied for separately at a community center after entering Korea.",
    ],
    bookingLabel: "Book Appointment (Family Register → Birth report) →",
  },
  family_birth_mother_korean: {
    breadcrumb: ["Home", "Family Register", "Reports", "Birth report", "Mother Korean + father foreign"],
    title: "Birth report — Mother Korean + father foreign",
    docs: [
      "Electronic transmission application (form)",
      "Birth report form (form) — use only Korean and Arabic numerals",
      "  ▸ State the mother's registration base address accurately / write 'Canada' in the father's registration base field",
      "  ▸ Child's registration base address: follow the mother's, or enter a new Korean address",
      "  ▸ Remarks field: write the foreign name in Korean",
      "Birth Certificate Long-form original (non-returnable)",
      "Korean translation of the birth certificate (no notarization)",
      "Identity confirmation statement (if applicable)",
      "Parents' passport originals + copies, 1 each",
      "Parents' Canadian residency-status proof copies, 1 each",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "If taking the foreign father's surname: you may register the Canadian birth-certificate name as-is or a Korean-style name.",
      "  ▸ e.g., Smith James Gildong → 스미스제임스길동 (✅) / 스미스길동 (✅) / 스미스제임스 (❌)",
      "If taking the Korean mother's surname: a foreign-style name cannot be registered.",
      "  ▸ e.g., if the mother is surname Kim → 김길동 (✅) / 김제임스길동 (❌)",
      "If the mother reports a child born out of wedlock: the mother's surname and origin apply.",
      "The birth certificate original is not returned.",
      "⚠️ After the birth report, the resident registration number is applied for separately at a community center after entering Korea.",
    ],
    bookingLabel: "Book Appointment (Family Register → Birth report) →",
  },
  family_birth_unmarried: {
    breadcrumb: ["Home", "Family Register", "Reports", "Birth report", "Unmarried Korean (out of wedlock)"],
    title: "Birth report — Unmarried Korean (out of wedlock)",
    docs: [
      "Electronic transmission application (form)",
      "Birth report form (form)",
      "  ▸ If the father is unknown: the mother's surname and origin apply",
      "  ▸ If taking a Korean father's surname/origin: may report by the father's surname/origin (but the father cannot be recorded in the family register)",
      "Birth Certificate original (showing the parents' names)",
      "Korean translation of the birth certificate",
      "Reporter's (father or mother) passport original + copy",
      "Reporter's Canadian residency-status proof copy",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "If you wish to take the foreign father's surname: the foreign father must file the birth report himself.",
      "Child of a Korean father and foreign mother born out of wedlock: the father's birth report alone cannot create the family register — an acknowledgment report + nationality acquisition process is required (see Acknowledgment report menu).",
      "The birth certificate original is not returned.",
    ],
    bookingLabel: "Book Appointment (Family Register → Birth report) →",
  },
  family_marriage: {
    breadcrumb: ["Home", "Family Register", "Reports", "Marriage report"],
    question: "Nationality situation of the marrying parties?",
    options: {
      family_marriage_korean: { title: "Both parties Korean", desc: "When both hold Korean nationality" },
      family_marriage_mixed: { title: "One party foreign", desc: "Korean + foreigner combination" },
    },
  },
  family_marriage_korean: {
    breadcrumb: ["Home", "Family Register", "Reports", "Marriage report", "Both Korean"],
    title: "Marriage report — both parties Korean",
    docs: [
      "Electronic transmission application (form) — enter a KakaoTalk-linked phone number for notifications",
      "Marriage report form (form) — use only Korean and Arabic numerals; leave the witness fields blank",
      "  ▸ State the registration base address (bonjeok) accurately — shown at the top of the family relation certificate",
      "  ▸ Both marrying parties sign",
      "  ▸ Address: write phonetically in Korean",
      "Marriage Certificate original, 1 copy (non-returnable)",
      "  ▸ Both Korean: Short-form or Long-form, either is fine",
      "  ▸ If there is a child born within 200 days of marriage: Long-form required",
      "Korean translation of the marriage certificate (no notarization; date, name, signature at the bottom)",
      "Both parties' passport originals + copies, 1 each",
      "  ▸ Dual citizens: copies of valid passports of all countries",
      "Both parties' Canadian residency-status proof copies, 1 each",
      "Identity confirmation statement (if applicable) — when the marriage-certificate name differs from the current passport name",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks (a birth report can be accepted after the marriage report is processed)",
    notices: [
      "⚠️ Where to report: file with the consular jurisdiction where the marriage was established (Toronto jurisdiction: Ontario, Manitoba).",
      "The marriage certificate original is not returned.",
      "Origin (bon): must be written in Chinese characters (e.g., 김해 김씨 → 金海).",
      "If the registration base address is wrong, the documents are returned — check the top of the basic or family relation certificate.",
      "Agreement on the child's surname/origin (if taking the mother's): a separate agreement may be submitted.",
    ],
    bookingLabel: "Book Appointment (Family Register → Marriage report) →",
  },
  family_marriage_mixed: {
    breadcrumb: ["Home", "Family Register", "Reports", "Marriage report", "Korean + foreigner"],
    title: "Marriage report — Korean + foreigner",
    docs: [
      "Electronic transmission application (form)",
      "Marriage report form (form) — use only Korean and Arabic numerals; leave the witness fields blank",
      "  ▸ State the Korean party's registration base address (bonjeok) accurately",
      "  ▸ Foreign spouse's name: surname then given name, including middle name, in Korean at the end (e.g., Last First Middle in Korean)",
      "  ▸ If not a Korean national at the time of marriage, write the relevant nationality in the registration base field (e.g., 'Canada')",
      "Marriage Certificate Long-form original, 1 copy (non-returnable)",
      "  ▸ Long-form required when one of the parties is a foreigner",
      "Korean translation of the marriage certificate (no notarization)",
      "Both parties' passport originals + copies, 1 each",
      "  ▸ Citizen: citizenship certificate (card type / Search of Citizenship Record not allowed; oath date required)",
      "  ▸ Canada-born citizen: Birth Certificate (Short/Long form either)",
      "  ▸ Dual citizens: copies of valid passports of all countries + birth certificate or citizenship certificate",
      "Identity confirmation statement (if applicable)",
      "  ▸ If the name was changed, also submit a Name Change Certificate",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "⚠️ Where to report: file with the consular jurisdiction where the marriage was established.",
      "The marriage certificate/judgment original is not returned.",
      "Origin (bon): write the Korean party's origin in Chinese characters; leave blank for the foreigner.",
      "If the registration base address is wrong, the documents are returned.",
    ],
    bookingLabel: "Book Appointment (Family Register → Marriage report) →",
  },
  family_divorce: {
    breadcrumb: ["Home", "Family Register", "Reports", "Divorce report"],
    question: "Type of divorce?",
    sub: "The procedure and documents differ completely by divorce type.",
    options: {
      family_divorce_agreement: { title: "Divorce by agreement (mutual consent)", desc: "Both parties must be Korean nationals — about 6 months" },
      family_divorce_court: { title: "Judicial divorce (Canadian court judgment)", desc: "Report to Korea after a Canadian court divorce — about 3 weeks" },
    },
  },
  family_divorce_agreement: {
    breadcrumb: ["Home", "Family Register", "Reports", "Divorce report", "Divorce by agreement"],
    title: "Confirmation of divorce intent (divorce by agreement)",
    docs: [
      "Application for confirmation of divorce intent (form) — written in Korean",
      "Divorce report form, 3 copies — use only Korean and Arabic numerals",
      "  ▸ State the registration base address (bonjeok) accurately",
      "  ▸ Child-support payment day: 29/30/31 not allowed → write 'last day of month'",
      "Agreement on child custody and parental authority, 3 copies (only if there are minor children)",
      "  ▸ Returned if joint custody is stated without special reason",
      "Both parties' family relation certificate (detailed) + marriage relation certificate (detailed), 1 each",
      "  ▸ Detailed certificate, full resident number disclosed, issued for each party",
      "Overseas Korean registration extract, 1 each (overseas residents)",
      "Resident registration extract, 1 each (residents in Korea)",
      "Both parties' passport copies, 1 each",
      "Residency-status proof copies, 1 each",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months (consul interview → Korean family court review → divorce confirmation issued → divorce report)",
    notices: [
      "⚠️ Both parties must be Korean nationals — if one is a foreigner, divorce in a Canadian court and then report.",
      "Both parties must visit the consulate for an interview.",
      "If living in different jurisdictions (e.g., husband in Vancouver, wife in Toronto): file at one chosen consulate, then both visit that consulate.",
      "If one party lives in Korea: you may choose the consulate or a Korean family court — filing at a Korean family court may be faster.",
      "Returned if visitation rights are excessively restricted.",
    ],
    bookingLabel: "Book Appointment (Family Register → Divorce by agreement) →",
  },
  family_divorce_court: {
    breadcrumb: ["Home", "Family Register", "Reports", "Divorce report", "Judicial divorce"],
    title: "Judicial divorce report — report to Korea after a Canadian court divorce",
    docs: [
      "Electronic transmission application (form)",
      "Divorce report form (form) — use only Korean and Arabic numerals",
      "  ▸ State the registration base address (bonjeok) accurately",
      "  ▸ Judgment finalization date: write the effective date, not the judgment date (generally one month after the judgment)",
      "  ▸ Custody: if Custody is not stated in the judgment, leave the custody field blank",
      "Certificate of Divorce original copy (non-returnable)",
      "Korean translation of the Certificate of Divorce (no notarization; date, name, signature at the bottom)",
      "Divorce judgment (Certificate of Judgement or Divorce Order) original copy (non-returnable)",
      "Korean translation of the divorce judgment",
      "Separation Agreement original copy + translation (if there are minor children; not needed if detailed custody is stated in the judgment)",
      "Both parties' passport copies, 1 each",
      "Reporter's residency-status proof copy, 1",
      "Identity confirmation statement (if applicable) — if the name was changed",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 3 weeks",
    notices: [
      "⚠️ The reporter must be a Korean national as of the divorce judgment date — if already a Canadian citizen at the time of judgment, the report is not possible.",
      "⚠️ Only documents issued by Ontario/Manitoba courts may be submitted.",
      "The divorce certificate/judgment originals are not returned.",
      "Origin (bon): write the parties' origin in Chinese characters (blank for a foreigner).",
      "Mail submission allowed — the reporter must sign the report form themselves.",
    ],
    bookingLabel: "Book Appointment (Family Register → Divorce report) →",
  },
  family_death: {
    breadcrumb: ["Home", "Family Register", "Reports", "Death report"],
    title: "Death report",
    docs: [
      "Electronic transmission application (form) — enter a KakaoTalk-linked phone number for notifications",
      "Death report form (form)",
      "  ▸ Address: write phonetically in Korean",
      "  ▸ State the registration base address (bonjeok) accurately — the deceased's registration base address",
      "Death certificate original copy (non-returnable)",
      "  ▸ Must be a Canadian provincial-government certificate — funeral-home issued not allowed",
      "  ▸ Preferably submit the Long-form (Certified Copy of Death Registration, Form 15)",
      "  ▸ Name, date of birth, and date of death must be accurate — if wrong, correct with the province before submitting",
      "Korean translation of the death certificate (no notarization; date, name, signature at the bottom)",
      "Reporter's passport original + copy (valid passport)",
      "Reporter's residency-status proof original + copy",
      "Identity confirmation statement (if applicable) — if the reporter's or deceased's name was changed",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 4 weeks",
    notices: [
      "Eligible reporters: head of household, relatives, cohabitant.",
      "⚠️ If the deceased acquired a foreign nationality before death, a death report is not possible.",
      "The death certificate original is sent to Korea and not returned.",
      "Mail submission allowed — be sure to check the example when filling out the form (many returns due to wrong registration base address).",
    ],
    bookingLabel: "Book Appointment (Family Register → Death report) →",
  },
  family_recognition: {
    breadcrumb: ["Home", "Family Register", "Reports", "Acknowledgment report"],
    title: "Acknowledgment report — recognizing a child born out of wedlock as a legal child",
    docs: [
      "Electronic transmission application (form) — fill in the reporter's (father's) details only; enter a KakaoTalk-linked phone number",
      "Acknowledgment report form (form)",
      "  ▸ Address: write phonetically in Korean",
      "  ▸ Must state the 'registration base address (bonjeok) set by the parents'",
      "  ▸ If using Chinese characters in the name: only Supreme Court name-use characters",
      "Birth certificate original (showing parents' names, non-returnable)",
      "  ▸ A Long-form may be requested after review if needed",
      "Korean translation of the birth certificate (see the translation example; no notarization)",
      "Identity confirmation statement (if applicable) — when the Korean-registered name differs from the Canadian name",
      "Parents' passport originals + copies, 1 each",
      "Parents' Canadian residency-status proof originals + copies, 1 each",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 3 weeks",
    notices: [
      "Acknowledgment is the act by which a biological father or mother recognizes a child born out of wedlock as their own, creating a legal parent-child relationship.",
      "Child of a Korean mother born out of wedlock: acquires Korean nationality by birth → only a birth report is needed.",
      "Child of a Korean father + foreign mother born out of wedlock: after the father's acknowledgment, a separate nationality acquisition process is needed.",
      "  ▸ If the acknowledged child is a minor: acquires Korean nationality by reporting nationality acquisition to the Minister of Justice.",
      "  ▸ If the acknowledged child is an adult: naturalization approval is required after meeting special-naturalization requirements.",
      "⚠️ Mail submission not allowed — the father must apply at the consulate in person.",
      "The birth certificate original is not returned.",
    ],
    bookingLabel: "Book Appointment (Family Register → Acknowledgment report) →",
  },
  family_fix: {
    breadcrumb: ["Home", "Family Register", "Record correction"],
    question: "What correction do you need?",
    sub: "This corrects entries for a foreign family member in the family register. The registration (e.g., marriage report) must already be complete.",
    options: {
      family_fix_death: { title: "Add a foreign family member's death record", desc: "Correct the record when a foreign-national family member dies" },
      family_fix_info: { title: "Correct a foreign family member's nationality/sex/DOB/number", desc: "Correct missing or erroneous entries" },
    },
  },
  family_fix_death: {
    breadcrumb: ["Home", "Family Register", "Record correction", "Foreign family death record"],
    title: "Ex officio correction of a foreign family member's death record",
    docs: [
      "Electronic transmission application (form)",
      "Application for ex officio correction of the family register (form)",
      "Foreign family member's death certificate (host-country death certificate)",
      "Korean translation of the death certificate — full content translated (professional translator or yourself; name, signature, date at the bottom)",
      "Foreign family member's passport",
      "Applicant's Korean passport original",
      "Family relation certificate + marriage relation certificate, 1 each (if the subject is a spouse)",
      "  ▸ Detailed certificate, full resident number disclosed",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 3–4 weeks",
    notices: [
      "Subject: a foreign-national family member (a foreigner recorded in the Korean family register).",
      "This is an ex officio correction, not a death report — a foreign national cannot have a death report filed.",
    ],
    bookingLabel: "Book Appointment (Family Register → Ex officio correction) →",
  },
  family_fix_info: {
    breadcrumb: ["Home", "Family Register", "Record correction", "Foreign family info correction"],
    title: "Correcting a foreign family member's nationality/sex/DOB/foreigner-registration number",
    docs: [
      "Electronic transmission application (form)",
      "Application for ex officio correction of the family register (form)",
      "Foreign family member's birth certificate copy",
      "Korean translation of the birth certificate (professional translator or yourself; name, signature, date at the bottom)",
      "Foreign family member's citizenship certificate copy (for those who acquired Canadian citizenship)",
      "Foreign family member's passport copy",
      "Applicant's (Korean national's) Korean passport original + copy",
      "Applicant's overseas Korean registration extract",
      "Family relation certificate (detailed, full resident number disclosed)",
      "Marriage relation certificate (if the subject of correction is a foreign spouse)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 3–4 weeks",
    notices: [
      "Subject: a foreign family member whose date of birth, foreigner-registration number, nationality, or sex is unrecorded or erroneous in the family register.",
      "The registration (e.g., marriage report) must already be complete.",
    ],
    bookingLabel: "Book Appointment (Family Register → Ex officio correction) →",
  },

  // ════════════ 국적(nationality) 영어 번역 ════════════

  nationality_start: {
    breadcrumb: ["Home", "Nationality"],
    question: "Select the situation that applies",
    sub: "Nationality services differ completely by situation. Select the item that matches your case.",
    options: {
      nationality_citizen_start: { title: "I or my family acquired a foreign nationality (citizenship)", desc: "Exit / loss / retention / choice — guided to your situation" },
      nationality_acquire: { title: "Child of a Korean father & foreign mother born out of wedlock", desc: "Nationality acquisition by acknowledgment (minor) · CAD $24.30" },
      nationality_recover: { title: "I want to restore Korean nationality (age 65+)", desc: "Dual-nationality restoration — only at a Korean immigration office" },
    },
  },
  nationality_terms: {
    breadcrumb: ["Home", "Nationality", "Compare terms"],
    title: "Nationality terms compared — exit, loss, retention, choice",
    sub: "The four confusing terms, compared in two pairs.",
    compareTable: [
      {
        pair: "Nationality exit vs. Nationality loss",
        note: "Both result in \"no Korean nationality\"",
        left: "Exit (이탈)",
        right: "Loss (상실)",
        rows: [
          { label: "Who", left: "Congenital dual national (two nationalities from birth)", right: "Acquired later (gained citizenship afterward)" },
          { label: "Difference", left: "You actively report giving up Korean nationality", right: "Report after-the-fact what was already auto-lost" },
          { label: "Deadline", left: "Male: depends on birth situation (by Mar 31 of the year turning 18, or after military resolved) / Female: no time limit (may file anytime)", right: "No deadline (report promptly after acquisition)" },
          { label: "Result", left: "No Korean nationality (foreign nationality only)", right: "No Korean nationality (records the loss)" },
        ],
      },
      {
        pair: "Nationality retention vs. Nationality choice",
        note: "Both result in \"keeping Korean nationality\"",
        left: "Retention (보유)",
        right: "Choice (선택)",
        rows: [
          { label: "Who", left: "Minor who acquired citizenship together with a parent", right: "Congenital dual national (two nationalities from birth)" },
          { label: "Difference", left: "Must report within 6 months of acquisition to keep nationality", right: "Keep dual nationality via a pledge not to exercise the foreign one" },
          { label: "Deadline", left: "Within 6 months of citizenship acquisition (oath date)", right: "Female: before the birthday of the year turning 22 / Male: before 22, or within 2 years after military service" },
          { label: "Result", left: "Korean nationality kept (then subject to nationality choice)", right: "Both nationalities kept (legal dual nationality)" },
        ],
      },
    ],
    notices: [
      "Rule of thumb: two nationalities from birth → exit or choice / acquired citizenship with a parent as a minor → retention / acquired citizenship yourself later → loss.",
      "If unsure, contact the consulate. (416-920-3809)",
    ],
  },
  nationality_citizen_start: {
    breadcrumb: ["Home", "Nationality", "Foreign citizenship acquired"],
    question: "How did you come to hold the foreign nationality (citizenship)?",
    sub: "The type of report differs completely depending on how you acquired it.",
    options: {
      nationality_native: { title: "I had two nationalities from birth", desc: "Congenital dual national → give up (exit) or keep (choice)" },
      nationality_acquired_self: { title: "I acquired citizenship myself later", desc: "Acquired later → nationality-loss report (after-the-fact)" },
      nationality_keep_start: { title: "I acquired citizenship together with my parents (as a minor)", desc: "Accompanied-acquisition child → nationality-retention report (within 6 months)" },
    },
  },
  nationality_native: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national"],
    question: "What would you like to do with your Korean nationality?",
    sub: "A congenital dual national may give up or keep Korean nationality.",
    options: {
      nationality_renounce_start: { title: "I'll give up Korean nationality", desc: "Nationality-exit report · CAD $24.30" },
      nationality_choice_start: { title: "I'll keep Korean nationality", desc: "Nationality-choice report — guided by sex and timing" },
    },
  },
  nationality_choice_start: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report"],
    question: "Applicant's sex?",
    sub: "For a congenital dual national, the nationality-choice report deadline depends on sex and timing.",
    options: {
      nationality_choice_male_birth: { title: "Male", desc: "Deadline varies by birth circumstances and military status" },
      nationality_choice_female_birth: { title: "Female", desc: "Can file until the birthday of the year turning 22" },
    },
  },
  nationality_choice_male_birth: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Male"],
    question: "Parents' residence status at the time of birth?",
    sub: "If it counts as 'birth tourism,' the pledge not to exercise foreign nationality (nationality choice) is restricted.",
    options: {
      nationality_choice_male_a: { title: "Born while residing for permanent purposes", desc: "A parent held/applied for PR or citizenship, or parents lived abroad long-term" },
      nationality_choice_excluded: { title: "Born without permanent-residence purpose (birth tourism, etc.)", desc: "In principle the pledge is not allowed — check the exceptions" },
    },
  },
  nationality_choice_female_birth: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Female"],
    question: "Parents' residence status at the time of birth?",
    sub: "If it counts as 'birth tourism,' the pledge not to exercise foreign nationality (nationality choice) is restricted.",
    options: {
      nationality_choice_female: { title: "Born while residing for permanent purposes", desc: "A parent held/applied for PR or citizenship, or parents lived abroad long-term" },
      nationality_choice_excluded: { title: "Born without permanent-residence purpose (birth tourism, etc.)", desc: "In principle the pledge is not allowed — check the exceptions" },
    },
  },
  nationality_choice_male_a: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Male", "Permanent-purpose birth"],
    question: "Current timing / military status?",
    sub: "Males can file until the birthday of the year they turn 22, or within 2 years of completing their military obligation.",
    options: {
      nationality_choice_male_intime: { title: "Before the birthday of the year turning 22 (in time)", desc: "Normal nationality-choice report (pledge) is possible" },
      nationality_choice_male_served: { title: "Military obligation completed (discharged, exempted, etc.)", desc: "Can file within 2 years of completing the obligation" },
      nationality_renounce_exception: { title: "Past the deadline and military not resolved", desc: "Nationality choice not possible → guided to exceptional nationality-exit permission" },
    },
  },
  nationality_choice_male_intime: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Male", "In time"],
    title: "Nationality-choice report — Male (before the birthday of the year turning 22)",
    sub: "A congenital dual national keeps Korean nationality (pledge not to exercise foreign nationality) · free",
    docs: [
      "Nationality-choice report form — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian signs",
      "Pledge not to exercise foreign nationality (form)",
      "2 ID photos (must be taken at a studio)",
      "Canadian birth certificate original + copy (born overseas) / replaced by citizenship certificate if born in Korea",
      "Korean translation of the birth certificate (no notarization needed)",
      "Applicant's Canadian passport original + copy (at least 1 year validity)",
      "Parents' passport copies + proof of status copies (1 each)",
      "Applicant's basic + family-relation certificates (detailed, within 3 months)",
      "Parents' basic certificates (1 each) / father's marriage-relation certificate (if applicable)",
      "Identity certificate (if the name changed — signed by 2 relatives within the 4th degree)",
      "XpressPost prepaid envelope (to receive the notice)",
      "Notification and service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months",
    notices: [
      "The pledge = you choose Korean nationality without giving up the foreign one, pledging not to exercise the foreign nationality within Korea.",
      "Deadline — males: until the birthday of the year turning 22 (after that, only a nationality-exit report is possible).",
      "⚠️ Age 15+ must appear in person — no postal submission.",
      "If a parent acquired citizenship and hasn't filed a loss report, it can be submitted together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book (Nationality → Nationality-choice report) →",
  },
  nationality_choice_male_served: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Male", "After military service"],
    title: "Nationality-choice report — Male (within 2 years of completing military service)",
    sub: "A male who completed his military obligation keeps Korean nationality within 2 years · free",
    docs: [
      "Nationality-choice report form — enter a KakaoTalk-linked phone number",
      "Pledge not to exercise foreign nationality (form)",
      "2 ID photos (must be taken at a studio)",
      "Proof of resolved military obligation (discharge certificate, military record, exemption confirmation, etc.)",
      "Canadian birth certificate original + copy (born overseas) / replaced by citizenship certificate if born in Korea",
      "Korean translation of the birth certificate (no notarization needed)",
      "Applicant's Canadian passport original + copy (at least 1 year validity)",
      "Parents' passport copies + proof of status copies (1 each)",
      "Applicant's basic + family-relation certificates (detailed, within 3 months)",
      "Identity certificate (if the name changed — signed by 2 relatives within the 4th degree)",
      "XpressPost prepaid envelope (to receive the notice)",
      "Notification and service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months",
    notices: [
      "The pledge = you choose Korean nationality without giving up the foreign one, pledging not to exercise the foreign nationality within Korea.",
      "Deadline — a male who completed his military obligation: within 2 years of resolution.",
      "⚠️ Age 15+ must appear in person — no postal submission.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book (Nationality → Nationality-choice report) →",
  },
  nationality_choice_female: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Female", "Born for permanent settlement"],
    title: "Nationality-choice report — Female (before the birthday of the year turning 22)",
    sub: "A congenital dual-national female keeps Korean nationality (pledge not to exercise foreign nationality) · free",
    docs: [
      "Nationality-choice report form — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian signs",
      "Pledge not to exercise foreign nationality (form)",
      "2 ID photos (must be taken at a studio)",
      "Canadian birth certificate original + copy (born overseas) / replaced by citizenship certificate if born in Korea",
      "Korean translation of the birth certificate (no notarization needed)",
      "Applicant's Canadian passport original + copy (at least 1 year validity)",
      "Parents' passport copies + proof of status copies (1 each)",
      "Applicant's basic + family-relation certificates (detailed, within 3 months)",
      "Parents' basic certificates (1 each) / father's marriage-relation certificate (if applicable)",
      "Identity certificate (if the name changed — signed by 2 relatives within the 4th degree)",
      "XpressPost prepaid envelope (to receive the notice)",
      "Notification and service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months",
    notices: [
      "The pledge = you choose Korean nationality without giving up the foreign one, pledging not to exercise the foreign nationality within Korea.",
      "Deadline — females: until the birthday of the year turning 22 (after that, only a nationality-exit report is possible).",
      "⚠️ Age 15+ must appear in person — no postal submission.",
      "If a parent acquired citizenship and hasn't filed a loss report, it can be submitted together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book (Nationality → Nationality-choice report) →",
  },
  nationality_choice_excluded: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report", "Born without settlement intent"],
    title: "Pledge restricted — born without permanent-residence purpose (birth tourism, etc.)",
    sub: "In principle the pledge (nationality choice) is not allowed, but it is possible if an exception applies.",
    docs: [],
    notices: [
      "⚠️ If the parents were staying short-term without a permanent-residence purpose at the time of birth (so-called 'birth tourism'), the pledge not to exercise foreign nationality is in principle not allowed — to keep Korean nationality you would have to choose it and give up the foreign nationality.",
      "However, the pledge is exceptionally allowed if one of the following applies:",
      "  ▸ Lived abroad continuously for 2+ years, counting before and after birth",
      "  ▸ Acquired foreign permanent residence or nationality",
      "  ▸ Studied 6+ months at a foreign regular university (1+ year for language training)",
      "  ▸ Stayed accompanying a parent on overseas assignment, etc.",
      "Whether you qualify for an exception needs a precise judgment, so please contact the Consulate or the nationality desk.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book (Nationality → Nationality-choice report) →",
  },
  nationality_renounce_start: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report"],
    question: "Applicant's sex?",
    sub: "Males and females have different nationality-exit report periods.",
    options: {
      nationality_renounce_male_birth: { title: "Male", desc: "The report period depends on your parents' residence situation at your birth" },
      nationality_renounce_female: { title: "Female", desc: "No time limit for the exit report" },
    },
  },
  nationality_renounce_male_birth: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Male"],
    question: "Your parents' residence situation at your birth?",
    sub: "Whether a parent held (or had applied for) foreign PR/citizenship at your birth completely changes the report period.",
    options: {
      nationality_renounce_male_a: { title: "Born while residing for permanent settlement", desc: "Parent held/applied for PR or citizenship at birth, or a parent resided abroad 17+ years → can report by Mar 31 of the year turning 18" },
      nationality_renounce_male_b: { title: "Born while residing without permanent-settlement intent", desc: "Not the above → can report only after military duty is resolved" },
    },
  },
  nationality_renounce_male_a: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Male", "Born for permanent settlement"],
    question: "Where are you now in time?",
    sub: "A male may file a normal nationality-exit report only until Mar 31 of the year he turns 18.",
    options: {
      nationality_renounce_male_intime: { title: "Before Mar 31 of the year turning 18 (in time)", desc: "Normal nationality-exit report possible" },
      nationality_renounce_male_done: { title: "Military duty resolved (discharged/exempt, etc.)", desc: "Nationality-exit report possible after military is resolved" },
      nationality_renounce_exception: { title: "Past the deadline and military unresolved", desc: "Exceptional nationality-exit permit required · CAD $121.50" },
    },
  },
  nationality_acquired_self: {
    breadcrumb: ["Home", "Nationality", "Acquired later"],
    question: "Whose nationality-loss report is this?",
    sub: "When you acquire a foreign nationality, Korean nationality is automatically lost that day. This reports it after the fact.",
    options: {
      nationality_loss: { title: "Myself (living)", desc: "Filed by you, or by family on your behalf · free" },
      nationality_loss_death: { title: "A deceased family member", desc: "Nationality-loss report for the deceased · free" },
    },
  },
  nationality_keep_start: {
    breadcrumb: ["Home", "Nationality", "Acquired with parents"],
    question: "Has it been more than 6 months since the citizenship acquisition (oath) date?",
    sub: "Within 6 months, you can choose to keep Korean nationality (retention report) or not (loss). After 6 months, nationality is lost retroactively.",
    options: {
      nationality_keep_choice: { title: "Within 6 months", desc: "Choose to keep or give up Korean nationality" },
      nationality_loss: { title: "More than 6 months have passed", desc: "Deadline exceeded → nationality lost retroactively → guided to the loss report" },
    },
  },
  nationality_keep_choice: {
    breadcrumb: ["Home", "Nationality", "Acquired with parents", "Choose"],
    question: "What would you like to do with the Korean nationality?",
    sub: "Within 6 months, you may either keep Korean nationality (retention report) or not.",
    options: {
      nationality_retain: { title: "I want to keep Korean nationality", desc: "Nationality-retention report — keeps Korean nationality · CAD $24.30" },
      nationality_loss: { title: "I do not want to keep Korean nationality", desc: "Nationality-loss report — Korean nationality is lost · free" },
    },
  },
  nationality_renounce_male_intime: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Male", "Born for permanent settlement", "In time"],
    title: "Nationality-exit report — Male (in time)",
    sub: "Congenital dual national · by Mar 31 of the year turning 18",
    docs: [
      "Nationality-exit report form — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian (father or mother) signs",
      "Nationality-exit notice confirmation (form)",
      "Overseas residence confirmation (form)",
      "1 ID photo (3.5×4.5cm, white background, within 6 months, must be taken at a photo studio — consulate equipment not allowed)",
      "Canadian birth certificate original + copy (born in Canada, both parents' names shown)",
      "  ▸ Born in Korea: submit the citizenship certificate (with birth date as the acquisition date) instead",
      "Korean translation of the birth certificate (self/family may translate; no notarization)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies, 1 each",
      "Parents' residency-status proof copies, 1 each (citizenship certificate / born in Canada = Birth Certificate / PR = PR Card both sides)",
      "Subject's basic + family relation certificate (detailed, full resident number, within 3 months)",
      "Parents' basic certificates, 1 each",
      "Father's marriage relation certificate (if born to a Korean father + foreign mother)",
      "Identity confirmation certificate (if the name was changed — signatures of 2 relatives within the 4th degree)",
      "Xpresspost registered envelope (to receive the notice)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "CAD $24.30 (Cash, Debit, Credit)" }],
    time: "About 18–24 months (result notified via KakaoTalk/email — consent within 5 days required)",
    notices: [
      "⚠️ Deadline: by Mar 31 of the year you turn 18 (born 2008 → Mar 31, 2026 / born 2009 → Mar 31, 2027).",
      "⚠️ Age 15+ must visit in person — mail submission not allowed.",
      "You must have an address (center of living) abroad to file.",
      "If a parent acquired citizenship but did not file a nationality-loss report, file the parent's loss report together.",
      "Checking the result document: it appears when you issue a basic certificate 15–30 days after the completion message.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Exit report) →",
  },
  nationality_renounce_male_done: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Male", "Born for permanent settlement", "After military resolved"],
    title: "Nationality-exit report — Male (after military resolved)",
    sub: "Giving up Korean nationality after completing military duty",
    docs: [
      "Nationality-exit report form — enter a KakaoTalk-linked phone number",
      "Nationality-exit notice confirmation (form)",
      "Overseas residence confirmation (form)",
      "1 ID photo (must be taken at a photo studio)",
      "Military service certificate (showing completion/exemption/wartime-labor-reserve assignment)",
      "Canadian birth certificate original + copy + Korean translation (born in Korea: citizenship certificate instead)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies, 1 each",
      "Parents' residency-status proof copies, 1 each",
      "Subject's basic + family relation certificate (detailed, within 3 months)",
      "Parents' basic certificates, 1 each",
      "Father's marriage relation certificate (if born to a Korean father + foreign mother)",
      "Identity confirmation certificate (if the name was changed — 2 relatives within the 4th degree sign)",
      "Xpresspost registered envelope (to receive the notice)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "CAD $24.30 (Cash, Debit, Credit)" }],
    time: "About 18–24 months",
    notices: [
      "Military resolution = completion of active/supplementary/alternative service (or deemed completed) / wartime labor reserve assignment / military exemption.",
      "⚠️ Age 15+ must visit in person — mail submission not allowed.",
      "You must have an address (center of living) abroad to file.",
      "If a parent acquired citizenship but did not file a loss report, file together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Exit report) →",
  },
  nationality_renounce_male_b: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Male", "Born without settlement intent"],
    title: "Nationality-exit report — Male (born while residing without permanent-settlement intent)",
    sub: "A nationality-exit report is possible only after military duty is resolved",
    docs: [
      "⚠️ In this case (parent residing without permanent-settlement intent at birth), regardless of the Mar 31 / age-18 deadline, a nationality-exit report is possible only after military duty is resolved.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【If military duty is already resolved — file with the documents below】",
      "Nationality-exit report form + notice confirmation + overseas residence confirmation (forms)",
      "Military service certificate (showing completion/exemption/wartime-labor-reserve assignment)",
      "1 ID photo (must be taken at a photo studio)",
      "Canadian birth certificate original + copy + Korean translation (born in Korea: citizenship certificate instead)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies + residency-status proof copies, 1 each",
      "Subject's basic + family relation certificate (detailed, within 3 months)",
      "Parents' basic certificates, 1 each / father's marriage relation certificate (if applicable)",
      "Identity confirmation certificate (if name changed) · Xpresspost registered envelope · Notification & service consent form",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "【If military duty is not yet resolved】",
      "  ▸ A nationality-exit report is not possible at this time.",
      "  ▸ File after resolving military duty (service completed · wartime labor reserve · exemption).",
    ],
    costs: [{ label: "Fee", value: "CAD $24.30 (Cash, Debit, Credit)" }],
    time: "About 18–24 months (when filed after military is resolved)",
    notices: [
      "⚠️ 'Born without permanent-settlement intent' means born while your parent(s) merely resided abroad without holding or applying for foreign PR/citizenship at the time.",
      "If unsure which case applies to you, contact the consulate before filing. (416-920-3809)",
      "⚠️ Age 15+ must visit in person — mail submission not allowed.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Consultation →",
  },
  nationality_renounce_female: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Female"],
    title: "Nationality-exit report — Female",
    sub: "Congenital dual-national female · there is no time limit for the exit report",
    docs: [
      "Nationality-exit report form — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian signs",
      "Nationality-exit notice confirmation (form)",
      "Overseas residence confirmation (form)",
      "1 ID photo (must be taken at a photo studio — consulate equipment not allowed)",
      "Canadian birth certificate original + copy (born in Canada) / born in Korea: citizenship certificate instead",
      "Korean translation of the birth certificate (no notarization)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies, 1 each",
      "Parents' residency-status proof copies, 1 each",
      "Subject's basic + family relation certificate (detailed, full resident number, within 3 months)",
      "Parents' basic certificates, 1 each",
      "Father's marriage relation certificate (if born to a Korean father + foreign mother)",
      "Identity confirmation certificate (if the name was changed — 2 relatives within the 4th degree sign)",
      "Xpresspost registered envelope (to receive the notice)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "CAD $24.30 (Cash, Debit, Credit)" }],
    time: "About 18–24 months",
    notices: [
      "⚠️ There is no time limit for filing. Unlike males, a congenital dual-national female has no nationality-exit deadline and may file at any time.",
      "⚠️ Age 15+ must visit in person — mail submission not allowed.",
      "You must have an address (center of living) abroad to file.",
      "If a parent acquired citizenship but did not file a loss report, file together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Exit report) →",
  },
  nationality_renounce_exception: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-exit report", "Male", "Born for permanent settlement", "Exceptional permit"],
    title: "Exceptional nationality-exit permit — male (military unfulfilled) past the deadline (Nationality Act Art. 14-2)",
    sub: "Effective Oct 1, 2022 · no mail/proxy, must visit in person",
    docs: [
      "Nationality-exit permit application (form)",
      "Nationality-exit expedited-review request (form — expedited applicants only)",
      "1 ID photo (3.5×4.5cm, white background, within 6 months, photo studio)",
      "Canadian birth certificate original + copy (both parents' names) / born in Korea: citizenship certificate instead",
      "Korean translation of the birth certificate (no notarization)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies + residency-status proof copies, 1 each",
      "Subject's basic + family relation certificate (detailed, within 3 months)",
      "Parents' basic certificates, 1 each / father's marriage relation certificate (if applicable)",
      "Identity confirmation certificate (if name changed — signed by 2 family members)",
      "Military service certificate",
      "Proof of continuous foreign residence since birth (or since pre-age-6 emigration) — property, lease, utility/tax records, entry-exit records, etc.",
      "Evidence of circumstances making it hard to hold you responsible for not reporting within 3 months (migration, residence, employment, enrollment documents, etc.)",
      "Evidence of substantial career restriction/disadvantage abroad due to dual nationality",
      "Korean translation for any foreign-language documents (translator's name/contact; no notarization)",
      "Xpresspost registered envelope or stamped envelope (to receive the notice)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "CAD $121.50 (Cash, Debit, Credit)" }],
    time: "Expedited review: within 3 months of receipt (standard review varies by case)",
    notices: [
      "Eligibility: a military-unfulfilled dual-national male past the exit-report deadline (Mar 31 of the year turning 18).",
      "Requirements: ① born abroad (or emigrated before age 6) with continuous foreign residence + ② circumstances making it hard to hold you responsible for missing the deadline. (Stays in Korea within 90 days/year count as continuous foreign residence.)",
      "Expedited review (Aug 19, 2024): ① within 1 year of a denial with imminent career disadvantage, or ② serving as a foreign government diplomatic/security officer or active military officer.",
      "Permit considerations: place of birth, how dual nationality arose, address, number of entries, purpose, period, exercise of Korean-national rights, career disadvantage, military fairness.",
      "⚠️ No mail/proxy — visit the consulate (Toronto) in person.",
      "If a parent acquired citizenship but did not file a loss report, file together.",
      "If the birth certificate lacks parents’ names, obtain a new one (ServiceOntario / Manitoba provincial certificate).",
      "Submitted originals are returned immediately after verification. For copy-only documents, the original may be requested later.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Exceptional exit permit) →",
  },
  nationality_choice: {
    breadcrumb: ["Home", "Nationality", "Congenital dual national", "Nationality-choice report"],
    title: "Nationality-choice report — pledge not to exercise foreign nationality (keep dual nationality)",
    sub: "A congenital dual national's report to keep Korean nationality · free",
    docs: [
      "Nationality-choice report form — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian signs",
      "Pledge not to exercise foreign nationality (form)",
      "2 ID photos (must be taken at a photo studio)",
      "Canadian birth certificate original + copy (born abroad) / born in Korea: citizenship certificate instead",
      "  ▸ If you completed a retention report within 6 months of accompanied acquisition: birth certificate may be omitted",
      "Korean translation of the birth certificate (no notarization)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies + residency-status proof copies, 1 each",
      "Subject's basic + family relation certificate (detailed, within 3 months)",
      "Parents' basic certificates, 1 each / father's marriage relation certificate (if applicable)",
      "Identity confirmation certificate (if name changed — 2 relatives within the 4th degree sign)",
      "Xpresspost registered envelope (to receive the notice)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months",
    notices: [
      "The pledge = choosing Korean nationality without giving up the foreign one, pledging not to exercise the foreign nationality within Korea.",
      "Deadline — Female: before the birthday of the year turning 22 (after that, only a nationality-exit report). Male: before the birthday of the year turning 22, or within 2 years after military service.",
      "⚠️ A 'birth tourism' child cannot make the pledge — exceptions include 2+ years of foreign residence around birth, PR/citizenship acquisition, 6+ months at a regular university, dispatched work, etc.",
      "⚠️ Age 15+ must visit in person — mail submission not allowed.",
      "If a parent acquired citizenship but did not file a loss report, file together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Choice report) →",
  },
  nationality_retain: {
    breadcrumb: ["Home", "Nationality", "Nationality-retention report"],
    title: "Nationality-retention report — minor who acquired citizenship together with a parent",
    sub: "📌 This is step 1 — file within 6 months to keep your nationality, then file a nationality-choice report (step 2) to finally keep dual nationality.",
    docs: [
      "Nationality-retention report form — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian signs",
      "1 ID photo (must be taken at a photo studio)",
      "Subject's Canadian passport original + copy (bio-data page, at least 1 year of validity remaining)",
      "Subject's Korean passport original + copy (if held)",
      "Parents' passport copies, 1 each",
      "Subject's citizenship certificate original + copy (citizenship card / Search of Citizenship Record not accepted, e-Certificate printout accepted)",
      "Parents' residency-status proof copies, 1 each (citizenship certificate / born in Canada = Birth Certificate / PR = PR Card both sides)",
      "Subject's basic + family relation certificate (detailed, within 3 months)",
      "Identity confirmation certificate (if name changed — 2 relatives within the 4th degree sign)",
      "Xpresspost registered envelope (to receive the notice)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "CAD $24.30 (Cash, Debit, Credit)" }],
    time: "Reviewed by the Ministry of Justice after consulate intake",
    notices: [
      "✅ Once step 1 (retention) is done, you become subject to nationality choice just like a congenital dual national → file a nationality-choice report (pledge not to exercise foreign nationality) as step 2 to finally keep dual nationality. (Female before age 22 / Male before 22 or within 2 years after military)",
      "※ The legal term is 'accompanied acquisition (수반취득)' — when a minor child acquires a foreign nationality along with a parent.",
      "⚠️ Must apply within 6 months of the citizenship acquisition (oath) date — after that, Korean nationality is lost retroactively to the acquisition date (loss report needed).",
      "Eligible if you acquired citizenship with a parent before your 19th birthday, and your and the parent's acquisition dates match.",
      "The parent who acquired citizenship together must have previously held Korean nationality. (e.g., a child of a Korean father and Chinese mother who acquired with the Chinese mother → not eligible)",
      "⚠️ Age 15+ must visit in person — mail submission not allowed.",
      "If a parent acquired citizenship but did not file a loss report, file together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Retention report) →",
  },
  nationality_loss: {
    breadcrumb: ["Home", "Nationality", "Nationality-loss report"],
    title: "Nationality-loss report — acquired citizenship later (subject living)",
    sub: "Reports after the fact that Korean nationality was auto-lost on the foreign-nationality acquisition date · free",
    docs: [
      "Nationality-loss report form (see the example) — enter a KakaoTalk-linked phone number",
      "  ▸ Age 15+: self-signs / under 15: legal guardian signs",
      "1 ID photo (must be taken at a photo studio)",
      "Canadian passport original + copy (at least 1 year of validity remaining, original returned promptly)",
      "Citizenship certificate original + copy (oath date clearly shown, card / Search of Citizenship Record not accepted, e-Certificate printout accepted)",
      "Basic certificate (detailed, full resident number, within 3 months, issued in the subject's name)",
      "Family relation certificate (detailed, full resident number)",
      "Identity confirmation certificate (if the name was changed — 2 relatives within the 4th degree sign)",
      "Marriage Certificate copy or removed family register (if you took your husband's surname without a Korean marriage report, etc. — if applicable)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months (result notified via KakaoTalk/email)",
    notices: [
      "Filing: in person, or a family member listed in the family register may file on your behalf (one representative visits; book a separate appointment per applicant).",
      "⚠️ Korean nationality is automatically lost on the citizenship oath date — using a Korean passport or otherwise acting as a national afterward is punishable.",
      "⚠️ Nationality is lost on the oath date regardless of whether the family register is closed.",
      "Even if you changed your name, write the name recorded in the family register on the report.",
      "Military: a person born in Korea who later emigrated and acquired citizenship loses Korean nationality on the acquisition date → no military duty.",
      "Even a congenital dual national who later additionally acquires another foreign nationality falls under this report (submit that country's birth certificate & passport too).",
      "Mail submission possible (2+ hours from Toronto; citizenship certificate as copy only; no liability for loss). Also accepted at an immigration office's nationality section.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Loss report) →",
  },
  nationality_loss_death: {
    breadcrumb: ["Home", "Nationality", "Nationality-loss report", "Deceased"],
    title: "Nationality-loss report — deceased family member",
    sub: "Nationality-loss report when a family member who acquired a foreign nationality has died · free",
    docs: [
      "Nationality-loss report form (deceased-person version) — KakaoTalk-linked phone number, reporter signs",
      "Canadian passport copy (an expired passport is fine; if none, submit a statement of reason)",
      "Death certificate copy",
      "  ▸ Province-issued only (Ontario·Manitoba) — funeral-home issued not accepted",
      "  ▸ Preferably Long form (Certified Copy of Death Registration, Form 15)",
      "  ▸ Name, date of birth, date of death must be accurate (if wrong, correct with the province first)",
      "Citizenship certificate original + copy (required even for the deceased; oath date shown; card / Search not accepted; e-Certificate printout accepted; original returned promptly)",
      "Basic certificate (detailed, full resident number, within 3 months, issued in the deceased's name)",
      "Family relation certificate (detailed, full resident number)",
      "Identity confirmation certificate (if the deceased's name was changed — guarantor within 4th degree signs)",
      "Marriage Certificate copy or removed family register (if took husband's surname without a Korean marriage report, or spouse not recorded pre-2008 — if applicable)",
      "Notification & service consent form (form)",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 6 months (result notified via KakaoTalk/email)",
    notices: [
      "Who: when a family member whose Korean nationality was lost by acquiring a foreign nationality has died.",
      "⚠️ Nationality is lost on the citizenship oath date regardless of whether the family register is closed.",
      "Mail submission possible (2+ hours from Toronto; no liability for loss).",
      "Result document: appears when a basic certificate is issued 15–30 days after the completion message.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Loss report) →",
  },
  nationality_recover: {
    breadcrumb: ["Home", "Nationality", "Nationality restoration"],
    title: "Nationality restoration — dual nationality for age 65+ (not a consular service)",
    sub: "Can only be applied for at a Korean immigration office · not accepted at the consulate",
    docs: [
      "⚠️ Nationality restoration (dual nationality) can only be applied for at an immigration office in Korea — not accepted at a mission (consulate).",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Procedure (when visiting Korea):",
      "  ① Nationality-loss report (immigration office or consulate — skip if already done)",
      "  ② Overseas Korean (F-4) visa application (immigration office or consulate; office for your intended residence)",
      "  ③ Residence card application (immigration office only; can file with F-4 together; about 3 weeks)",
      "  ▸ Steps ①②③ can be filed together at the immigration office",
      "  ④ Nationality restoration permit application (immigration office, about 7–8 months, varies by office)",
      "  ⑤ Submit the pledge not to exercise foreign nationality within 1 year of receiving the permit notice",
      "  ⑥ Apply for a resident registration card and Korean passport at a community/district office",
    ],
    costs: [{ label: "Fee", value: "See the immigration office" }],
    time: "About 7–8 months (processed by the immigration office)",
    notices: [
      "Since Jan 1, 2011, overseas Koreans aged 65+ may obtain dual nationality via a nationality restoration permit (keeping the foreign nationality without giving it up).",
      "⚠️ If the pledge not to exercise foreign nationality is not submitted within 1 year of the permit notice, the restored nationality is automatically lost.",
      "Carry both passports when traveling — use the Korean passport for Korean immigration, the Canadian passport for Canadian immigration.",
      "For office locations/contacts and details, see hikorea.go.kr.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Consultation (inquiry) →",
    onlineLink: "https://www.hikorea.go.kr",
  },
  nationality_acquire: {
    breadcrumb: ["Home", "Nationality", "Acquisition by acknowledgment"],
    title: "Nationality acquisition by acknowledgment — child of a Korean father born out of wedlock",
    sub: "Minor (19 or under) born out of wedlock to a Korean father & foreign mother · CAD $24.30",
    docs: [
      "Nationality acquisition report form — enter a KakaoTalk-linked phone number",
      "1 ID photo (3.5×4.5cm, white background, within 6 months, photo studio)",
      "Subject's Canadian passport original + copy (at least 1 year of validity remaining)",
      "Parents' passport copies, 1 each",
      "Subject's birth certificate copy (both parents' names shown)",
      "Parents' residency-status proof copies, 1 each (citizenship certificate / born in Canada = Birth Certificate / PR = PR Card both sides / long-term = visa)",
      "Father's basic + family relation + marriage relation certificate, 1 each (detailed, full resident number, within 3 months)",
      "Family relationship notification (form)",
      "Statement of acknowledgment circumstances (form) — written by the father",
      "Xpresspost registered envelope (to receive the notice)",
    ],
    costs: [{ label: "Fee", value: "CAD $24.30 (Cash, Debit, Credit)" }],
    time: "Reviewed by the Ministry of Justice after consulate intake",
    notices: [
      "💡 A child of a Korean mother and foreign father born out of wedlock does not need an acknowledgment report — use Family Register → Birth report.",
      "💡 A child born during marriage (parents married) only needs a birth report regardless of nationality — use Family Register → Birth report.",
      "Who: a minor (19 or under) born out of wedlock to a Korean father + foreign mother. Nationality is acquired when the Korean father records the child in the family register by acknowledgment and then reports.",
      "After acquiring nationality: renounce the foreign nationality and submit proof, or submit the pledge not to exercise foreign nationality + related documents (Nationality Act Enforcement Decree Art. 13 — when giving up is difficult).",
      "⚠️ Mail submission not allowed — the father must visit the consulate in person.",
      "If a parent acquired citizenship but did not file a loss report, file together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Nationality → Acquisition report) →",
  },
  registration_start: {
    breadcrumb: ["Home", "Overseas Korean Registration"],
    question: "What registration matter do you need?",
    sub: "Overseas Korean registration is a legal duty for Korean nationals residing/staying abroad 90+ days (Overseas Koreans Registration Act Art. 2). Citizens (those who lost Korean nationality) are not subject to it.",
    options: {
      registration_new: { title: "New registration", desc: "First-time registration within 90 days of entering Canada" },
      registration_change: { title: "Change / move report", desc: "When address, contact, or residency status changes, or on return/relocation" },
      registration_copy: { title: "Issue a registration record copy", desc: "For proving overseas residence — real estate, finance, inheritance, etc." },
    },
  },
  registration_new: {
    breadcrumb: ["Home", "Overseas Korean Registration", "New registration / change"],
    question: "How would you like to apply?",
    sub: "With a joint certificate you can apply online. If you sign the 'consent to request and share personal information' at the bottom of the form, the basic certificate is not required.",
    options: {
      registration_new_online: { title: "Online application", desc: "Overseas Koreans G4K portal (g4k.go.kr) — joint certificate required" },
      registration_new_visit: { title: "Apply in person at the consulate", desc: "By appointment — processed same day" },
      registration_new_mail: { title: "Apply by mail", desc: "Send copies notarized by a lawyer" },
    },
  },
  registration_new_online: {
    breadcrumb: ["Home", "Overseas Korean Registration", "New registration", "Online"],
    title: "Overseas Korean Registration — online application",
    docs: [
      "Go to the Overseas Koreans G4K portal (g4k.go.kr) → log in with a joint certificate → apply for overseas Korean registration",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "If you have no joint certificate, issue one first via the certificate menu.",
      "⚠️ Registration within 90 days of entering Canada is recommended.",
      "Citizens (those who lost Korean nationality) cannot register.",
    ],
    onlineLink: "https://www.g4k.go.kr",
  },
  registration_new_visit: {
    breadcrumb: ["Home", "Overseas Korean Registration", "New registration", "In person"],
    title: "Overseas Korean Registration — in person",
    docs: [
      "New registration form (Form 1) or move/change form (Form 5)",
      "  ▸ 'First entry date into country of residence':",
      "  ▸   PR holders: the 'PR since...' landing date on the back of the PR Card",
      "  ▸   Visa holders: the date of first entry on that visa",
      "  ▸ 'Registering mission': write Consulate General in Toronto (Ontario·Manitoba residents)",
      "  ▸ 'Registration base address': copy exactly as shown at the top of the basic certificate",
      "Passport original + copy",
      "Residency-status proof original + copy",
      "  ▸ PR holders: PR Card both sides / long-term residents: valid residence visa",
      "Basic certificate (detailed, full resident number, within 3 months)",
      "  ▸ If you sign the information-sharing consent at the bottom of the form, the basic certificate is not required (extra processing time)",
      "Proof of first entry date (Canada entry stamp, entry-exit record, flight ticket, etc.)",
      "If an immediate family member applies on your behalf, add:",
      "  ▸ All of the above (for the subject) + family relation certificate (detailed, within 3 months) + proxy's passport",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Processed same day on visit",
    notices: [
      "⚠️ Registration within 90 days of entering Canada is recommended — a fine may apply if not registered.",
      "Citizens (those who lost Korean nationality) cannot register.",
      "No retroactive registration — only possible while currently residing in Canada.",
      "Grounds for removal: return report, non-residence over 183 days, 183+ days residing in Korea, nationality loss, death.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Overseas Korean Registration) →",
  },
  registration_new_mail: {
    breadcrumb: ["Home", "Overseas Korean Registration", "New registration", "Mail"],
    title: "Overseas Korean Registration — by mail",
    docs: [
      "New registration form (Form 1) or move/change form (Form 5)",
      "Passport copy — notarized by a lawyer before sending (originals not accepted)",
      "Residency-status proof copy — notarized by a lawyer before sending (originals not accepted)",
      "Basic certificate (detailed, full resident number, within 3 months)",
      "Copy of proof of first entry date",
      "Mailing address: Korean Consulate in Toronto (재외국민등록), 555 Avenue Road, Toronto, Ontario M4V 2J7",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 1–2 weeks including mail delivery",
    notices: [
      "Do not mail originals (passport, PR card, visa) — submit lawyer-notarized copies.",
      "No retroactive registration — only possible while currently residing in Canada.",
    ],
  },
  registration_change: {
    breadcrumb: ["Home", "Overseas Korean Registration", "Change / move report"],
    title: "Overseas Korean Registration — change / move report",
    docs: [
      "Move/change form (Form 5)",
      "Valid Korean passport original",
      "Proof of the changed item:",
      "  ▸ Address change: proof of the new address",
      "  ▸ Residency-status change: new PR Card or visa original + copy",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Processed same day on visit",
    notices: [
      "Can also be changed online: Overseas Koreans G4K portal (g4k.go.kr).",
      "Report promptly when your address or residency status changes.",
      "A move report is also needed when returning to Korea or moving to another country.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },
  registration_copy: {
    breadcrumb: ["Home", "Overseas Korean Registration", "Registration record copy"],
    question: "How would you like to obtain it?",
    sub: "With a joint certificate you can issue it instantly online at the Overseas Koreans 365 Portal.",
    options: {
      registration_copy_online: { title: "Online issuance (the Overseas Koreans 365 Portal)", desc: "Joint certificate required — issued instantly" },
      registration_copy_visit: { title: "Issue in person at the consulate", desc: "Same day — CAD $0.65/copy" },
      registration_copy_mail: { title: "Apply by mail", desc: "Lawyer-notarized copies required" },
    },
  },
  registration_copy_online: {
    breadcrumb: ["Home", "Overseas Korean Registration", "Record copy", "Online"],
    title: "Overseas Korean Registration record copy — online",
    docs: [
      "Go to the Overseas Koreans 365 Portal → apply for an overseas Korean registration record copy",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "Issuable only if your overseas Korean registration is complete.",
      "The registration record copy cannot be used as direct proof of your period of overseas stay.",
    ],
    onlineLink: "https://www.g4k.go.kr",
  },
  registration_copy_visit: {
    breadcrumb: ["Home", "Overseas Korean Registration", "Record copy", "In person"],
    title: "Overseas Korean Registration record copy — in person",
    docs: [
      "Application for a registration record copy (form)",
      "Valid Korean passport original + copy",
      "Residency-status proof original + copy",
      "  ▸ PR holders: PR Card both sides / long-term residents: residence visa",
      "  ▸ Dual nationals: basic certificate showing nationality restoration/dual nationality (detailed, within 3 months) + Canadian passport",
      "If a proxy (family) applies, add:",
      "  ▸ All of the above (for the subject) + family relation certificate (detailed, within 3 months) + proxy's passport",
      "  ▸ Eligible proxies: spouse, spouse's lineal relatives, lineal relatives, lineal relatives' spouses",
    ],
    costs: [{ label: "Fee per copy", value: "CAD $0.65 (Cash, Debit, Credit)" }],
    time: "Issued same day on visit",
    notices: [
      "Issuable only if your overseas Korean registration is complete.",
      "The registration record copy cannot be used as direct proof of your period of overseas stay.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Registration record copy) →",
  },
  registration_copy_mail: {
    breadcrumb: ["Home", "Overseas Korean Registration", "Record copy", "Mail"],
    title: "Overseas Korean Registration record copy — by mail",
    docs: [
      "Application for a registration record copy (form)",
      "Passport copy — notarized by a lawyer before sending",
      "Residency-status proof copy — notarized by a lawyer before sending",
      "Fee: Money Order or Certified Cheque (cash risks loss)",
      "Mailing address: Korean Consulate in Toronto (재외국민등록), 555 Avenue Road, Toronto, Ontario M4V 2J7",
    ],
    costs: [{ label: "Fee per copy", value: "CAD $0.65 (Money Order recommended)" }],
    time: "About 1–2 weeks including mail delivery",
    notices: [
      "Do not mail originals (passport, PR card, visa) — submit lawyer-notarized copies.",
      "Cash risks loss in mail — use a Money Order or Certified Cheque.",
    ],
  },
  emigration_start: {
    breadcrumb: ["Home", "Overseas Emigration Report"],
    question: "What emigration matter do you need?",
    sub: "⚠️ Emigration report ≠ Overseas Korean registration.\nEmigration report: reclassifies your resident registration as overseas Korean (allows health-insurance suspension / national pension refund) — PR holders only.\nOverseas Korean registration: proves overseas residence (real estate, inheritance, finance) — use the separate menu.",
    options: {
      emigration_who: { title: "Emigration report (new)", desc: "Settle Korean resident registration after obtaining PR — PR holders only" },
      emigration_cert: { title: "Issue an emigration report certificate", desc: "For those who already reported — used for national pension refund, etc." },
    },
  },
  emigration_who: {
    breadcrumb: ["Home", "Overseas Emigration Report", "New report"],
    question: "Applicant's age?",
    sub: "Age 18+ must visit in person. Minors under 18 may have a parent apply on their behalf.",
    options: {
      emigration_adult: { title: "Age 18 or older (adult)", desc: "Must visit in person — proxy application strictly not allowed" },
      emigration_minor: { title: "Under age 18 (minor)", desc: "A parent may apply — the child need not come along" },
    },
  },
  emigration_adult: {
    breadcrumb: ["Home", "Overseas Emigration Report", "New report", "Adult"],
    question: "Choose how to prepare the documents",
    sub: "With a joint certificate, you can prepare the documents yourself and have it issued the same day.",
    options: {
      emigration_new_direct: { title: "Prepare documents yourself (joint certificate needed) — same-day issuance", desc: "Issue the resident registration copy and 3 tax certificates yourself and bring them" },
      emigration_new_consent: { title: "Consent to administrative information sharing — about 10 days", desc: "Minimal documents; the consulate looks them up and issues the certificate" },
    },
  },
  emigration_new_direct: {
    breadcrumb: ["Home", "Overseas Emigration Report", "New report", "Adult", "Prepare documents yourself"],
    title: "Overseas Emigration Report — prepare documents yourself (same-day issuance)",
    docs: [
      "Emigration report form — write 'local emigration (현지이주)' under 'type of emigration'",
      "Passport original + 1 copy",
      "PR Card original + copy (both sides)",
      "  ▸ If the PR Card hasn't arrived: use the CoPR (Confirmation of Permanent Residence) instead",
      "Resident registration copy (등본) — issued within 1 month (Gov24)",
      "National tax payment certificate — emigration purpose, full resident number + Korean address shown (Hometax)",
      "Local tax payment certificate — emigration purpose (Gov24)",
      "Customs tax payment certificate — emigration purpose (Korea Customs UNI-PASS)",
      "  ▸ Issue the tax certificates right before your visit — valid for 1 month",
      "Additional documents for males aged 18–37:",
      "  ▸ Military completed: resident registration abstract showing military status, or military service certificate",
      "  ▸ Not yet served: military service certificate required",
    ],
    costs: [{ label: "Emigration report certificate, 1 copy", value: "CAD $0.65 (Cash)" }],
    time: "Issued same day on visit",
    notices: [
      "⚠️ Must visit in person — proxy application strictly not allowed.",
      "⚠️ On completion, national health insurance is suspended immediately and resident registration is changed to overseas Korean.",
      "⚠️ PR holders only.",
      "All 3 tax certificates must be issued for emigration purpose — general-purpose ones not accepted.",
      "If you have no joint certificate, issue one first via the certificate menu.",
      "Accompanying family must each prepare their own documents and visit together.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Overseas Emigration Report) →",
  },
  emigration_new_consent: {
    breadcrumb: ["Home", "Overseas Emigration Report", "New report", "Adult", "Information-sharing consent"],
    title: "Overseas Emigration Report — administrative information-sharing consent (about 10 days)",
    docs: [
      "Emigration report form",
      "  ▸ Must sign both the 'consent to request and share personal information' and the 'administrative information-sharing consent' at the bottom",
      "  ▸ Write 'local emigration (현지이주)' under 'type of emigration'",
      "Passport original + 1 copy",
      "PR Card original + copy (both sides)",
      "  ▸ If the PR Card hasn't arrived: use the CoPR instead",
      "Pickup method (choose at the visit):",
      "  ▸ In-person pickup: visit the consulate after processing",
      "  ▸ Mail pickup: bring a Canada Post Xpresspost registered envelope",
      "Additional documents for males aged 18–37:",
      "  ▸ Military completed: resident registration abstract showing military status, or military service certificate",
      "  ▸ Not yet served: military service certificate required",
    ],
    costs: [{ label: "Emigration report certificate, 1 copy", value: "CAD $0.65 (Cash)" }],
    time: "About 10 days (national tax lookup takes about 10 days)",
    notices: [
      "⚠️ Must visit in person — proxy application strictly not allowed.",
      "⚠️ On completion, national health insurance is suspended immediately.",
      "⚠️ PR holders only.",
      "With consent, you don't need to issue the resident registration copy and 3 tax certificates yourself.",
      "Accompanying family must each prepare all documents (except the form) individually.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Overseas Emigration Report) →",
  },
  emigration_minor: {
    breadcrumb: ["Home", "Overseas Emigration Report", "New report", "Minor"],
    title: "Overseas Emigration Report — minor under age 18",
    docs: [
      "Emigration report form — can be written on one sheet when reported together with a parent",
      "Minor's passport original + copy",
      "Minor's PR Card original + copy",
      "Minor's basic certificate + family relation certificate — detailed, full resident number, within 3 months",
      "Minor's 3 tax certificates (national, local, customs) — a minor must also have each issued individually",
      "Parents' passport original + copy",
      "  ▸ If only one parent visits: submit only a passport copy of the non-attending parent",
      "If only one parent visits, additional documents:",
      "  ▸ The custodial parent's seal certificate (인감증명서, issued within 3 months)",
      "  ▸ The custodial parent's emigration consent form (form)",
    ],
    costs: [{ label: "Emigration report certificate, 1 copy", value: "CAD $0.65 (Cash)" }],
    time: "Same day if documents prepared yourself / about 10 days with information-sharing consent",
    notices: [
      "The minor need not visit — a parent may apply on their behalf.",
      "⚠️ A minor must also have all 3 tax certificates issued individually.",
      "If both parents visit together, the seal certificate and consent form are not needed.",
      "⚠️ On completion, the minor's national health insurance is also suspended.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Overseas Emigration Report) →",
  },
  emigration_cert: {
    breadcrumb: ["Home", "Overseas Emigration Report", "Certificate issuance"],
    title: "Emigration report certificate issuance",
    docs: [
      "Valid Korean passport original",
    ],
    costs: [
      { label: "1 copy (for institutions)", value: "CAD $0.65 (Cash)" },
      { label: "2 copies (institution + financial institution)", value: "CAD $1.30 (Cash)" },
    ],
    time: "Issued same day on visit",
    notices: [
      "The emigration report certificate is used for national pension refund applications, submission to financial institutions, etc.",
      "With a joint certificate, it can be reissued online at the Overseas Koreans G4K portal (g4k.go.kr) (only for those who already reported).",
      "If you have not yet filed an emigration report, you must complete the new report first.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.g4k.go.kr",
  },
  cert_start: {
    breadcrumb: ["Home", "Certificates"],
    question: "Which certificate do you need?",
    options: {
      cert_nonface: { title: "Overseas Korean Simple Certificate (no consulate visit)", desc: "Issued remotely via app · 190 public services · no internet banking" },
      cert_joint_who: { title: "Joint Certificate (consulate visit)", desc: "Wide use across admin/finance/e-commerce · PC/USB storage · yearly renewal" },
      cert_financial_who: { title: "Financial Certificate (consulate visit)", desc: "Finance + public services · cloud storage · auto-renew every 3 years" },
    },
  },
  cert_joint_who: {
    breadcrumb: ["Home", "Certificates", "Joint Certificate"],
    question: "Applicant's age?",
    sub: "A minor under 19 must visit together with a legal guardian (a Korean national).",
    options: {
      cert_joint_adult: { title: "Age 19 or older (adult)", desc: "Visit in person" },
      cert_joint_minor: { title: "Under age 19 (minor)", desc: "Minor + legal guardian must visit together" },
    },
  },
  cert_joint_adult: {
    breadcrumb: ["Home", "Certificates", "Joint Certificate", "Adult"],
    title: "Joint Certificate issuance — adult",
    docs: [
      "Joint certificate application (form) — sign the same as your passport signature",
      "Legal guardian consent (included in the application form)",
      "Passport original + 1 copy",
      "Canadian residency-status proof original + copy",
      "  ▸ Short-term visitor: eTA confirmation",
      "  ▸ Long-term resident: Canadian residence visa",
      "  ▸ PR holder: PR Card",
      "  ▸ Dual national: basic certificate showing nationality restoration or dual nationality (detailed, full resident number, within 3 months)",
      "  ▸ Citizen: not eligible",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Apply at the consulate → receive guidance by email → download at home/office within 7 days",
    notices: [
      "⚠️ Must visit in person — proxy application not allowed.",
      "⚠️ Without a valid Korean passport original + residency-status proof original, it cannot be issued.",
      "⚠️ Cannot be issued without a Korean resident registration number.",
      "⚠️ Canadian citizens (those who lost Korean nationality) cannot be issued one.",
      "You must download it on a computer within 7 days of issuance — otherwise you must revisit the consulate.",
      "The joint certificate is valid for 1 year — renew it yourself on the issuing authority's website before expiry.",
      "Enter your email address exactly (case-sensitive).",
      "Some services such as internet banking require separate customer registration with that institution.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Certificates → Joint Certificate) →",
  },
  cert_joint_minor: {
    breadcrumb: ["Home", "Certificates", "Joint Certificate", "Minor"],
    title: "Joint Certificate issuance — minor under 19",
    docs: [
      "Joint certificate application (form) — the minor signs in person",
      "Legal guardian consent (included in the application form)",
      "Minor's passport original + copy",
      "Minor's Canadian residency-status proof (eTA, visa, PR, etc.)",
      "  ▸ Citizen: not eligible",
      "Family relation certificate (detailed, full resident number, within 3 months) — issued in the minor's name, not the viewing-only type",
      "Basic certificate (detailed, full resident number, within 3 months) — issued in the minor's name, not the viewing-only type",
      "  ▸ For 2+ minors applying, submit a separate original per applicant",
      "  ▸ Issuance at the consulate takes 2 weeks — obtain in advance and submit",
      "Legal guardian's Korean passport original + copy",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Apply at the consulate → receive guidance by email → download at home/office within 7 days",
    notices: [
      "⚠️ The minor and the legal guardian (a Korean national) must visit together.",
      "⚠️ The minor must sign the application in person — a guardian may not sign on their behalf.",
      "⚠️ Cannot be issued without a Korean resident registration number.",
      "⚠️ Canadian citizens cannot be issued one.",
      "Must download within 7 days of issuance.",
      "Enter your email address exactly (case-sensitive).",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Certificates → Joint Certificate) →",
  },
  cert_financial_who: {
    breadcrumb: ["Home", "Certificates", "Financial Certificate"],
    question: "Applicant's age?",
    sub: "A minor under 19 must visit together with a legal guardian (a Korean national).",
    options: {
      cert_financial_adult: { title: "Age 19 or older (adult)", desc: "Visit in person" },
      cert_financial_minor: { title: "Under age 19 (minor)", desc: "Minor + legal guardian must visit together" },
    },
  },
  cert_financial_adult: {
    breadcrumb: ["Home", "Certificates", "Financial Certificate", "Adult"],
    title: "Financial Certificate issuance — adult",
    docs: [
      "Financial certificate application (form) — sign the same as your passport signature",
      "Legal guardian consent (included in the application form)",
      "Passport original + 1 copy",
      "Canadian residency-status proof original + copy",
      "  ▸ Short-term visitor: eTA confirmation",
      "  ▸ Long-term resident: Canadian residence visa",
      "  ▸ PR holder: PR Card",
      "  ▸ Dual national: basic certificate showing nationality restoration or dual nationality (detailed, full resident number, within 3 months)",
      "  ▸ Citizen: not eligible",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Apply at the consulate → receive guidance by email → download at home/office within 14 days",
    notices: [
      "⚠️ Must visit in person — proxy application not allowed.",
      "⚠️ Without a valid Korean passport original + residency-status proof original, it cannot be issued.",
      "⚠️ Cannot be issued without a Korean resident registration number.",
      "⚠️ Canadian citizens (those who lost Korean nationality) cannot be issued one.",
      "The financial certificate is stored in the Korea Financial Telecommunications cloud — no USB/PC storage needed, accessible anywhere.",
      "Valid for 3 years, auto-renewed.",
      "Must download in the app/web within 14 days of issuance.",
      "Enter your email address exactly (case-sensitive).",
      "Some services such as internet banking require separate customer registration with that institution.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Certificates → Financial Certificate) →",
  },
  cert_financial_minor: {
    breadcrumb: ["Home", "Certificates", "Financial Certificate", "Minor"],
    title: "Financial Certificate issuance — minor under 19",
    docs: [
      "Financial certificate application (form) — the minor signs in person",
      "Legal guardian consent (included in the application form)",
      "Minor's passport original + copy",
      "Minor's Canadian residency-status proof (eTA, visa, PR, etc.)",
      "  ▸ Citizen: not eligible",
      "Family relation certificate (detailed, full resident number, within 3 months) — not the viewing-only type",
      "Basic certificate (detailed, full resident number, within 3 months) — not the viewing-only type",
      "  ▸ For 2+ minors applying, submit a separate original per applicant",
      "Legal guardian's Korean passport original + copy",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Apply at the consulate → receive guidance by email → download at home/office within 14 days",
    notices: [
      "⚠️ The minor and the legal guardian must visit together.",
      "⚠️ The minor must sign the application in person — a guardian may not sign on their behalf.",
      "⚠️ Cannot be issued without a Korean resident registration number.",
      "⚠️ Canadian citizens cannot be issued one.",
      "Must download within 14 days of issuance.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Certificates → Financial Certificate) →",
  },
  cert_nonface: {
    breadcrumb: ["Home", "Certificates", "Overseas Korean Simple Certificate"],
    title: "Overseas Korean Simple Certificate — issued remotely via app",
    docs: [
      "Smartphone (iOS or Android)",
      "A valid e-passport issued on or after Aug 25, 2008",
      "  ▸ Only passports with the IC-chip mark (⊕) at the bottom of the front cover work",
      "  ▸ Older passports (no IC-chip mark) → not usable, apply at the consulate instead",
      "Korean resident registration number",
      "Completed overseas Korean registration",
      "Install one of the following apps and apply:",
      "  ▸ KB Star Banking / Shinhan SOL Bank / Woori WON Banking / Hana 1Q / Toss",
      "  ▸ Install the app → select 'Overseas Korean certificate application' → enter personal info → scan e-passport + face",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate (no consulate visit needed)",
    notices: [
      "From late April 2026, usable for about 190 public services such as Gov24, National Pension, e-People, and Internet Post Office.",
      "⚠️ Not available for internet banking — if you need internet banking, use a Joint Certificate or Financial Certificate.",
      "⚠️ Cannot be issued without a Korean resident registration number.",
      "⚠️ Cannot be issued if you are not registered as an overseas Korean — see the Overseas Korean Registration menu.",
      "⚠️ Citizens (those who lost Korean nationality) cannot be issued one.",
      "App application inquiries: each issuer or the Overseas Koreans Service Support Center.",
    ],
    onlineLink: "https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_27012/view.do?seq=3",
  },
  various_cert_start: {
    breadcrumb: ["Home", "Various Certificates"],
    question: "Which certificate do you need?",
    sub: "With a joint certificate, you can issue most documents instantly and free online at Gov24 (gov.kr).",
    options: {
      vcert_immigration: { title: "Entry-exit record certificate", desc: "Confirms Korea entry/exit records — in person or online" },
      vcert_criminal: { title: "Background check (criminal record) certificate", desc: "For visa/citizenship applications, identity verification — 7 days at the police agency" },
      vcert_driving: { title: "English driving record certificate", desc: "Needed when exchanging for a Canadian license — in person or online" },
      vcert_driving_license: { title: "Korean driver's license renewal/reissue", desc: "Applied at the mission — Class 2 renewal & lost-card reissue · CAD $13.50" },
      vcert_military_c: { title: "Military service certificate", desc: "Confirms military service status" },
      vcert_overseas_reg: { title: "Overseas Korean registration record copy", desc: "Proof of overseas residence — real estate, inheritance, finance, etc." },
      vcert_resident: { title: "Resident registration copy/abstract", desc: "Confirms resident registration status — in person or online" },
      vcert_tax: { title: "Tax / income certificates", desc: "Tax payment (national/local/customs) & income certificates — needed for emigration report, etc." },
      vcert_passport_info: { title: "Passport fact certificate", desc: "Information · issuance record · invalidation, etc. — supplements a passport without the resident number" },
    },
  },
  vcert_immigration: {
    breadcrumb: ["Home", "Various Certificates", "Entry-exit record certificate"],
    question: "Choose how to apply",
    sub: "With a joint certificate, it can be issued instantly and free at Gov24 — no consulate visit needed.",
    options: {
      vcert_immigration_online: { title: "Online issuance (joint certificate)", desc: "Free instant issuance at Gov24" },
      vcert_immigration_self: { title: "Apply in person at the consulate", desc: "Issued immediately — CAD $2.70" },
      vcert_immigration_minor: { title: "Minor — legal guardian applies", desc: "An immediate family member applies on their behalf — CAD $2.70" },
      vcert_immigration_mail: { title: "Apply by mail", desc: "Lawyer-notarized copies — CAD $2.70" },
    },
  },
  vcert_immigration_online: {
    breadcrumb: ["Home", "Various Certificates", "Entry-exit record", "Online"],
    title: "Entry-exit record certificate — online issuance",
    docs: ["Go to Gov24 (www.gov.kr) → log in with a joint certificate → apply for the entry-exit record certificate"],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "Issuable only by Korean nationals.",
      "Even if there are no entry-exit records, it can be issued as 'no record'.",
    ],
    onlineLink: "https://www.gov.kr",
  },
  vcert_immigration_self: {
    breadcrumb: ["Home", "Various Certificates", "Entry-exit record", "In person"],
    title: "Entry-exit record certificate — in person at the consulate",
    docs: [
      "Application for the entry-exit record certificate (designated form)",
      "Valid Korean passport original",
      "Residency-status proof original (PR Card, visa, eTA, etc.)",
      "  ▸ Dual nationals: basic certificate showing nationality restoration, or nationality restoration certificate",
    ],
    costs: [{ label: "Fee", value: "CAD $2.70 (Cash, Debit, Credit)" }],
    time: "Immediate",
    notices: [
      "Issuable only by Korean nationals — foreign nationals cannot be issued one.",
      "  ▸ Foreign nationals: after notarizing a power of attorney, a proxy in Korea obtains it from the relevant authority.",
      "Even with no entry-exit records, it can be issued as 'no record'.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Various Certificates → Entry-exit record) →",
  },
  vcert_immigration_minor: {
    breadcrumb: ["Home", "Various Certificates", "Entry-exit record", "Minor (proxy)"],
    title: "Entry-exit record certificate — minor, legal guardian applies",
    docs: [
      "Application for the entry-exit record certificate (designated form)",
      "The subject minor's passport original",
      "The proxy (immediate family)'s passport original",
      "The subject's residency-status proof original (PR Card, visa, etc.)",
      "The subject's basic certificate + family relation certificate (detailed, full resident number, within 3 months)",
    ],
    costs: [{ label: "Fee", value: "CAD $2.70 (Cash, Debit, Credit)" }],
    time: "Immediate",
    notices: ["A legal guardian (immediate family) may apply on the minor's behalf."],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Various Certificates → Entry-exit record) →",
  },
  vcert_immigration_mail: {
    breadcrumb: ["Home", "Various Certificates", "Entry-exit record", "Mail"],
    title: "Entry-exit record certificate — by mail",
    docs: [
      "Application for the entry-exit record certificate (designated form)",
      "Lawyer (notary)-notarized passport copy",
      "Lawyer (notary)-notarized residency-status proof copy (PR Card, visa)",
      "Fee: CAD $2.70 (cash or Money Order)",
      "Return envelope: Canada Post Xpresspost registered envelope (your own address as both sender and recipient)",
    ],
    costs: [{ label: "Fee", value: "CAD $2.70 (Cash or Money Order)" }],
    time: "About 1–2 weeks including mail delivery",
    notices: ["Submit lawyer-notarized copies instead of originals."],
  },
  vcert_criminal: {
    breadcrumb: ["Home", "Various Certificates", "Background check (criminal record)"],
    question: "What do you need it for?",
    sub: "Since April 2015 it has been renamed the 'background check (criminal record) certificate.' The application form differs by purpose (Forms 1-1, 1-2, 1-3).",
    options: {
      vcert_criminal_visa: { title: "For a foreign visa/PR application", desc: "Confirms Korean criminal record for Canadian immigration/visa — Form 1-1" },
      vcert_criminal_citizenship: { title: "For a Canadian citizenship application", desc: "Submitted for citizenship applications — Form 1-2" },
      vcert_criminal_identity: { title: "For identity verification", desc: "Identity verification for PR/citizenship holders — Form 1-3" },
    },
  },
  vcert_criminal_visa: {
    breadcrumb: ["Home", "Various Certificates", "Background check", "For visa/PR"],
    title: "Background check (criminal record) certificate — for a foreign visa/PR application (Form 1-1)",
    docs: [
      "Application Form 1-1 (download from the consulate website)",
      "1 color photo taken within the last 6 months — 3cm×4cm, white background (must be taken at a photo studio)",
      "  ▸ ⚠️ Consulate photo equipment not allowed / note this differs from the passport-photo size (3.5×4.5cm)",
      "Valid Korean passport original",
      "Canadian residency-status proof original (PR Card, visa, etc.)",
      "If a Korean national's passport doesn't show the resident number: resident registration card, driver's license, or basic certificate",
      "Foreign nationals: foreigner registration card showing the foreigner registration number, or proof of foreigner registration",
      "Age 14–18: a parent applies on their behalf",
      "  ▸ Basic certificate + family relation certificate within 3 months (detailed, full resident number)",
      "If you want to receive it by mail: enclose a Canada Post Xpresspost envelope",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 2 weeks (a phone call when ready — be sure to write a voicemail-capable number on the application)",
    notices: [
      "⚠️ No mail submission — you must visit the consulate in person.",
      "⚠️ Photo size is 3cm×4cm — different from passport photos (3.5×4.5cm). Wrong size means rejection.",
      "⚠️ Consulate photo equipment not allowed — must be taken at a photo studio.",
      "Available to Korean nationals and foreign nationals with a Korean residence record.",
      "Korean National Police Agency, Foreign Affairs Background section: +82-2-3150-2676",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Various Certificates → Background check) →",
  },
  vcert_criminal_citizenship: {
    breadcrumb: ["Home", "Various Certificates", "Background check", "For citizenship"],
    title: "Background check (criminal record) certificate — for a Canadian citizenship application (Form 1-2)",
    docs: [
      "Application Form 1-2 (download from the consulate website)",
      "1 color photo taken within the last 6 months — 3cm×4cm, white background (must be taken at a photo studio)",
      "  ▸ ⚠️ Consulate photo equipment not allowed / note this differs from the passport-photo size",
      "Valid Korean passport original",
      "Canadian PR Card original (both sides)",
      "If you want to receive it by mail: enclose a Canada Post Xpresspost envelope",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 2 weeks (a phone call when ready — write a voicemail-capable number on the application)",
    notices: [
      "⚠️ No mail submission — you must visit the consulate in person.",
      "⚠️ Photo size is 3cm×4cm — different from passport photos.",
      "This differs from the RCMP criminal record check (fingerprint-based) — apply for the RCMP one separately.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Various Certificates → Background check) →",
  },
  vcert_criminal_identity: {
    breadcrumb: ["Home", "Various Certificates", "Background check", "Identity verification"],
    title: "Background check (criminal record) certificate — for identity verification (Form 1-3)",
    docs: [
      "Application Form 1-3 (download from the consulate website)",
      "1 color photo taken within the last 6 months — 3cm×4cm, white background (must be taken at a photo studio)",
      "  ▸ ⚠️ Consulate photo equipment not allowed / note this differs from the passport-photo size",
      "Valid Korean passport original",
      "Canadian PR Card or citizenship certificate original",
      "If you want to receive it by mail: enclose a Canada Post Xpresspost envelope",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "About 2 weeks (a phone call when ready — write a voicemail-capable number on the application)",
    notices: [
      "⚠️ No mail submission — you must visit the consulate in person.",
      "⚠️ Photo size is 3cm×4cm — different from passport photos.",
      "Used for identity verification of PR holders and citizens.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Various Certificates → Background check) →",
  },
  vcert_driving: {
    breadcrumb: ["Home", "Various Certificates", "English driving record certificate"],
    question: "Choose how to apply",
    sub: "With a joint certificate, it can be issued instantly and free online — no consulate visit needed.",
    options: {
      vcert_driving_online: { title: "Online issuance (joint certificate)", desc: "Gov24 or Police Traffic Minwon 24 — instant, free" },
      vcert_driving_self: { title: "Apply in person at the consulate", desc: "Issued immediately — free" },
      vcert_driving_proxy: { title: "A proxy applies", desc: "Power of attorney required — free" },
    },
  },
  vcert_driving_online: {
    breadcrumb: ["Home", "Various Certificates", "English driving record", "Online"],
    title: "English driving record certificate — online issuance",
    docs: [
      "Go to Gov24 (www.gov.kr) or the Police Traffic Minwon 24 (efine.go.kr)",
      "Log in with a joint certificate → apply for the English driving record certificate",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Immediate",
    notices: [
      "⚠️ In some cases the online-issued version is not accepted as an original by local receiving offices — check before submitting.",
    ],
    onlineLink: "https://www.gov.kr",
  },
  vcert_driving_self: {
    breadcrumb: ["Home", "Various Certificates", "English driving record", "In person"],
    title: "English driving record certificate — in person at the consulate",
    docs: [
      "Application for the English driving record certificate (designated form)",
      "Valid Korean passport original",
      "Canadian residency-status proof original",
      "  ▸ Short-term visitor: eTA confirmation / long-term resident: residence visa / PR holder: PR Card",
      "  ▸ Dual nationals: basic certificate showing nationality restoration, or nationality restoration certificate",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same day on visit",
    notices: [
      "⚠️ Appointment required: torbooking.com (Notarization → driver's-license translation notarization & English driving record issuance)",
      "⚠️ If the online version isn't accepted as an original, use in-person consulate issuance.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → driver's license) →",
  },
  vcert_driving_proxy: {
    breadcrumb: ["Home", "Various Certificates", "English driving record", "Proxy"],
    title: "English driving record certificate — proxy application",
    docs: [
      "Application for the English driving record certificate (designated form)",
      "Power of attorney signed by the delegator (subject) — free format allowed",
      "The delegator's valid Korean passport original + copy",
      "The delegator's valid Canadian residency-status proof original (PR Card, visa, etc.)",
      "The proxy (visitor)'s valid Korean passport",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same day on visit",
    notices: [
      "⚠️ Appointment required: torbooking.com (Notarization → driver's-license translation notarization & English driving record issuance)",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Notarization → driver's license) →",
  },
  vcert_driving_license: {
    breadcrumb: ["Home", "Various Certificates", "Korean driver's license renewal/reissue"],
    title: "Korean driver's license renewal / reissue",
    docs: [
      "License renewal/reissue application + personal information consent form (form)",
      "1 color photo — within the last 6 months, photo studio, date on the back",
      "  ▸ ⚠️ Consulate photo equipment not allowed",
      "  ▸ ⚠️ Must meet the driver's-license photo specs (wrong specs are often rejected)",
      "Valid passport original + copy",
      "Canadian residence visa or valid PR Card original + copy",
      "  ▸ Dual nationals: basic certificate showing the foreign-nationality non-exercise pledge date",
      "Korean driver's license original (renewal applicants only — surrendered at application)",
    ],
    costs: [{ label: "Fee", value: "CAD $13.50 (Cash only)" }],
    time: "About 4–5 weeks",
    notices: [
      "⚠️ Only Korean nationals may apply.",
      "⚠️ No mail submission — you must visit the consulate in person.",
      "⚠️ Cash only — Debit/credit not accepted.",
      "Eligibility:",
      "  ▸ Class 1 license: reissue only (under 70, within the aptitude-test period)",
      "  ▸ Class 2 license: both renewal and reissue (69 or under / ages 70–74 reissue only)",
      "  ▸ Age 75+ with the renewal period started: reissue not possible — an aptitude test in Korea is required",
      "  ▸ Suspended/revoked licenses: cannot apply",
      "Class 1 aptitude-test extension: apply online after identity verification at the Korea Road Traffic Authority (safedriving.or.kr).",
      "International driving permit issuance and aptitude-test postponement cannot be applied for here.",
    ],
    booking: "https://www.torbooking.com/book",
    bookingLabel: "Book Appointment (Various Certificates → license renewal/reissue) →",
    onlineLink: "https://www.safedriving.or.kr",
  },
  vcert_military_c: {
    breadcrumb: ["Home", "Various Certificates", "Military service certificate"],
    question: "Who is the applicant?",
    sub: "With a joint certificate, you can issue it instantly online at Gov24 — no consulate visit needed.",
    options: {
      military_cert_online: { title: "Online issuance (joint certificate)", desc: "Issued instantly at Gov24 — no consulate visit needed" },
      military_cert_self: { title: "Apply in person at the consulate", desc: "About 10 days" },
      military_cert_family: { title: "Family applies on behalf", desc: "Lineal ascendant/descendant, sibling, spouse — about 10 days" },
      military_cert_proxy: { title: "A proxy applies", desc: "Power of attorney required — about 10 days" },
    },
  },
  vcert_resident: {
    breadcrumb: ["Home", "Various Certificates", "Resident registration copy/abstract"],
    title: "Resident registration copy / abstract",
    docs: [
      "Resident registration copy/abstract application (designated form)",
      "Your valid Korean passport original",
      "Canadian residency-status proof original",
      "  ▸ With a joint certificate: free instant online issuance at Gov24 (gov.kr) — no consulate visit needed",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same day on visit / instant online",
    notices: [
      "With a joint certificate, free instant issuance at Gov24.",
      "⚠️ If resident registration is cancelled (an overseas Korean with no domestic address): the copy/abstract cannot be issued — the overseas Korean registration record copy can substitute.",
      "The resident registration copy needed for an emigration report must be issued in the full-resident-number version.",
      "Mail submission accepted.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },
  vcert_tax: {
    breadcrumb: ["Home", "Various Certificates", "Tax / income certificates"],
    title: "Tax payment / income certificates",
    docs: [
      "Tax/income certificate application (designated form)",
      "Your valid Korean passport original",
      "Canadian residency-status proof original",
      "State the purpose of issuance (e.g., for emigration, for a financial institution, etc.)",
      "  ▸ For online issuance: instant issuance at Hometax (hometax.go.kr) with a joint certificate",
    ],
    costs: [{ label: "Fee", value: "Free" }],
    time: "Same day on visit / instant online",
    notices: [
      "📌 All 3 tax certificates are needed for an emigration report:",
      "  ① National tax payment certificate — issued at Hometax (hometax.go.kr) (purpose: emigration, full resident number shown)",
      "  ② Local tax payment certificate — issued at Gov24 (gov.kr) (purpose: emigration)",
      "  ③ Customs tax payment certificate — issued at the Korea Customs UNI-PASS (unipass.customs.go.kr)",
      "⚠️ Tax certificates have a validity period — issue them right before your visit.",
      "With a joint certificate, all can be issued online — no consulate visit needed.",
      "Income certificate: Hometax → civil certificates → income amount certificate.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.hometax.go.kr",
  },
  vcert_passport_info: {
    breadcrumb: ["Home", "Various Certificates", "Passport fact certificate"],
    title: "Passport fact certificate",
    sub: "Proves passport-related facts — information, issuance record, invalidation, application documents, copy, etc.",
    docs: [
      "Passport fact certificate application (designated form)",
      "The subject's valid passport original (cannot be issued without the passport original)",
      "  ▸ With a joint certificate: instant online issuance at Gov24 (gov.kr)",
      "  ▸ In person: book an appointment and visit the Consulate",
      "[Minor under 19 applied for by a parent] visiting parent's passport original+copy, family relation certificate (detailed, full resident number) or the e-gov info-sharing consent on the form",
      "[By proxy] proxy's passport original+copy, original passport-fact power of attorney, the principal's seal certificate (or signature-verification certificate original)",
    ],
    costs: [{ label: "Fee", value: "CAD $1.35 (cash · debit · credit card)" }],
    time: "Same day on visit / instant online",
    notices: [
      "Passport fact certificates include 6 types: ▸passport information certificate ▸passport issuance record (Korean) ▸passport issuance record (English) ▸passport invalidation confirmation (Korean) ▸passport invalidation confirmation (English) ▸passport application documents certificate. Separately, a passport copy certificate (authenticating a passport copy) is also available.",
      "Passports issued after Dec 21, 2020 do not show the latter part of the resident registration number, to protect personal information.",
      "If a civil service requires the latter resident number, a holder of such a passport must submit the passport information certificate together with the passport.",
      "With a joint certificate you can issue it easily online at Gov24, or book and visit the Consulate passport desk.",
      "Passport copy certificate: a document by which the government authenticates the authenticity of a passport copy when submitting it to a foreign authority.",
    ],
    booking: "https://www.torbooking.com/book",
    onlineLink: "https://www.gov.kr",
  },
  vcert_overseas_reg: {
    breadcrumb: ["Home", "Various Certificates", "Overseas Korean registration record copy"],
    question: "How would you like to obtain it?",
    sub: "With a joint certificate, it can be issued instantly online at the Overseas Koreans 365 Portal.",
    options: {
      registration_copy_online: { title: "Online issuance (the Overseas Koreans 365 Portal)", desc: "Joint certificate required — issued instantly" },
      registration_copy_visit: { title: "Issue in person at the consulate", desc: "Same day — CAD $0.65/copy" },
      registration_copy_mail: { title: "Apply by mail", desc: "Lawyer-notarized copies required" },
    },
  },
};

const SEARCH_INDEX_KO = buildSearchIndex("ko");
const SEARCH_INDEX_EN = buildSearchIndex("en");

// 검색어 → 서비스 매핑 (서비스 핵심어). 검색 결과 정렬 시 해당 서비스 노드를 우대.
const SEARCH_SVC_KW: Record<string, string[]> = {
  nationality: ["국적", "시민권", "복수국적", "이중국적", "이탈", "상실", "귀화", "nationality", "citizenship", "dual"],
  passport: ["여권", "passport"],
  visa: ["비자", "사증", "체류", "visa"],
  family: ["출생", "혼인", "이혼", "사망", "가족관계", "인지", "출생신고", "혼인신고", "birth", "marriage", "divorce", "death"],
  military: ["병역", "국외여행허가", "병적", "군대", "military"],
  notarization: ["공증", "인증", "위임", "아포스티유", "인감", "notar", "apostille"],
  various_cert: ["범죄경력", "출입국사실", "주민등록", "납세", "criminal"],
};
const queryToService = (q: string): string | null => {
  const ql = q.toLowerCase();
  for (const [svc, kws] of Object.entries(SEARCH_SVC_KW)) {
    if (kws.some((k) => k === ql || ql.includes(k) || k.includes(ql))) return svc;
  }
  return null;
};
// 검색 결과 관련도 점수 (높을수록 상위)
const scoreSearchEntry = (entry: any, q: string, qSvc: string | null): number => {
  const title = (entry.title ?? "").toLowerCase();
  const bc = Array.isArray(entry.breadcrumb) ? entry.breadcrumb.map((b: string) => b.toLowerCase()) : [];
  const text = (entry.text ?? "").toLowerCase();
  let sc = 0;
  if (title.includes(q)) sc += 10;
  if (bc.some((b: string) => b.includes(q))) sc += 5;
  if (text.includes(q)) sc += 1;
  const nodeSvc = entry.node && entry.node.service ? entry.node.service : "";
  if (qSvc && nodeSvc === qSvc) sc += 12;
  if (typeof entry.id === "string" && entry.id.endsWith("_start")) sc += 2;
  return sc;
};

const SERVICE_COLORS = {
  passport: "#003478", family: "#1a6b3c", nationality: "#7b2d2d",
  cert: "#1a4d7a", various_cert: "#2d5a8a", visa: "#4a2d7a",
  notarization: "#5a3d8a", military: "#7a5500", registration: "#0f5c6b", emigration: "#3d5a2d",
};

// ─── SERVICE CARD DATA — Separated by language ───────────────────────────

const KO_SERVICES = [
  { id: "passport_start", icon: "🛂", title: "여권", desc: "발급 · 재발급 · 분실 · 긴급" },
  { id: "visa_start_en", icon: "✈️", title: "비자 (사증)", desc: "재외동포(F-4) · 방문 · 취업 · 유학" },
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
  // 여권 첫 화면에서 고른 수령 방법(우편·방문 / DHL)을 결과 수령 블록에 반영. null이면 전체 표시.
  const [deliveryChoice, setDeliveryChoice] = useState<null | "mail_visit" | "dhl">(null);
  const [searchQuery, setSearchQuery] = useState("");
  // 검색바 표시 여부 (false=숨김). 추후 다시 켜려면 true로 변경.
  const SEARCH_ENABLED = false;
  const [openFaq, setOpenFaq] = useState<any>(null);
  const [faqCat, setFaqCat] = useState<number>(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  // 챗봇 표시 여부 (false=숨김). 추후 다시 켜려면 true로 변경.
  const CHAT_ENABLED = false;
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);

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


  // 한국어 번역 레이어 — 영문 _en 노드를 한국어로 렌더 (영문 TREE 원본 미수정)
  const T_KO = (KO_TRANSLATIONS as any)[pageId];
  // 영어 번역 레이어 — 한국어 원본 노드(여권 등)를 영어로 렌더 (한국어 TREE 원본 미수정)
  const T_EN = (EN_TRANSLATIONS as any)[pageId];
  const L = (field: string, fb: any) =>
    (lang === "ko" && T_KO && T_KO[field] !== undefined) ? T_KO[field]
    : (lang === "en" && T_EN && T_EN[field] !== undefined) ? T_EN[field]
    : fb;

  // 타입 안전 헬퍼 — 배열 필드 보장 (+ 한국어 번역 적용)
  const pageCosts   = L("costs",   Array.isArray(page.costs)   ? page.costs   : []);
  const pageNotices = L("notices", Array.isArray(page.notices) ? page.notices : []);
  const pageOptions = Array.isArray(page.options) ? page.options : [];

  // ── 여권 상태 자동 토글 ──
  // 방문 경로(history)에서 재발급/분실/신규를 감지해, 노드의 stateDocs[상태] 줄을 서류에 끼움
  const ppState =
    history.some((h: string) => /_lost(_|$)/.test(h)) ? "lost" :
    history.some((h: string) => /_new(_|$)/.test(h))  ? "new"  :
    history.some((h: string) => /_renew(_|$)|_have(_|$)/.test(h)) ? "renew" : null;
  // 서류명 → 양식 PDF 경로 매핑 (양식이 있는 서류만 다운로드 아이콘 표시)
  const getSampleUrl = (docText: string): string | null => {
    const t = (docText || "").trim();
    // 병적증명서 신청서 작성 샘플
    if (t.startsWith("병적증명서 신청서") || t.startsWith("Military service certificate application form")) {
      return "/forms/military_cert_application_sample.pdf";
    }
    // 국적상실신고서 작성 샘플 (본인용)
    if (t.startsWith("국적상실신고서 (양식, 작성예시") || t.startsWith("Nationality-loss report form (see the example")) {
      return "/forms/nationality_loss_report_sample.pdf";
    }
    return null;
  };
  const getFormUrl = (docText: string): string | null => {
    if (typeof docText !== "string") return null;
    const t = docText.trim();
    // 신청서에 포함된 서류(별도 다운로드 불필요)는 버튼 표시 안 함
    if (t.includes("신청서에 포함됨") || t.includes("included in the application")) return null;
    // ── 국적: 인지에 의한 국적취득 ──
    if (t.startsWith("국적취득신고서") || t.startsWith("Nationality acquisition report")) {
      return "/forms/nationality_acquisition_report.pdf";
    }
    if (t.startsWith("가족관계통보서") || t.startsWith("Family relationship notification")) {
      return "/forms/family_relation_notification.pdf";
    }
    if (t.startsWith("인지경위서") || t.startsWith("Statement of acknowledgment circumstances")) {
      return "/forms/acknowledgment_statement.pdf";
    }
    // ── 국적: 상실 (사망자용 먼저 → 본인용) ──
    if (t.startsWith("국적상실신고서 (사망자용") || t.startsWith("Nationality-loss report form (deceased")) {
      return "/forms/nationality_loss_report_deceased.pdf";
    }
    if (t.startsWith("국적상실신고서") || t.startsWith("Nationality-loss report form")) {
      return "/forms/nationality_loss_report.pdf";
    }
    // ── 국적: 이탈 허가(예외적) — 신속심사 먼저 → 신청서 ──
    if (t.startsWith("국적이탈허가 신속심사 요청서") || t.startsWith("Nationality-exit expedited-review request")) {
      return "/forms/expedited_review_request.pdf";
    }
    if (t.startsWith("국적이탈허가 신청서") || t.startsWith("Nationality-exit permit application")) {
      return "/forms/nationality_exit_permit_application.pdf";
    }
    // ── 국적: 이탈 신고 ──
    if (t.startsWith("국적이탈신고서") || t.startsWith("Nationality-exit report form")) {
      return "/forms/nationality_exit_report.pdf";
    }
    if (t.startsWith("국적이탈 안내문 확인서") || t.startsWith("Nationality-exit notice confirmation")) {
      return "/forms/nationality_exit_guide_confirmation.pdf";
    }
    if (t.startsWith("외국거주사실증명서") || t.startsWith("Overseas residence confirmation")) {
      return "/forms/overseas_residence_certificate.pdf";
    }
    // ── 국적: 동일인증명서 (이름 변경 시 — 이탈·상실·인지 등 공용) ──
    if (t.startsWith("동일인증명서") || t.startsWith("Identity confirmation certificate")) {
      return "/forms/identity_confirmation.pdf";
    }
    // ── 국적: 선택 신고 ──
    if (t.startsWith("국적선택신고서") || t.startsWith("Nationality-choice report form")) {
      return "/forms/nationality_choice_report.pdf";
    }
    if (t.startsWith("외국국적불행사서약서") || t.startsWith("Pledge not to exercise foreign nationality")) {
      return "/forms/foreign_nationality_nonexercise_pledge.pdf";
    }
    // ── 국적: 보유 신고 ──
    if (t.startsWith("국적보유신고서") || t.startsWith("Nationality-retention report form")) {
      return "/forms/nationality_retention_report.pdf";
    }
    // ── 국적: 공통 통보 및 송달 동의서 ──
    if (t.startsWith("통보 및 송달 동의서") || t.startsWith("Notification & service consent") || t.startsWith("Notification and service consent")) {
      return "/forms/notification_service_consent.pdf";
    }
    // ── 인증서: 공동/금융 발급 신청서 (약관·동의서 포함본) ──
    if (t.startsWith("공동인증서 발급 신청서") || t.startsWith("Joint certificate application")) {
      return "/forms/joint_cert_application.pdf";
    }
    if (t.startsWith("금융인증서 발급 신청서") || t.startsWith("Financial certificate application")) {
      return "/forms/financial_cert_application.pdf";
    }
    // 여권발급신청서
    if (t.startsWith("여권발급신청서") || t.startsWith("Passport application")) {
      return "/forms/passport_application_A4.pdf";
    }
    // 법정대리인 동의서 (여권 외 업무용 — 공증 등)
    if (t.startsWith("법정대리인 동의서 (여권 외 업무") || t.startsWith("Legal guardian consent (non-passport")) {
      return "/forms/legal_guardian_consent_notary.pdf";
    }
    // 법정대리인 동의서 (문구가 포함된 모든 줄)
    if (t.includes("법정대리인 동의서") || t.includes("Legal guardian consent")) {
      return "/forms/legal_guardian_consent.pdf";
    }
    // 여권 분실 신고서
    if (t.includes("여권 분실 신고서") || t.includes("분실신고서") || t.includes("Lost passport")) {
      return "/forms/lost_passport_report.pdf";
    }
    // 긴급여권 발급신청 사유서
    if (t.includes("긴급여권 발급신청 사유서") || t.includes("Urgent passport issuance reason")) {
      return "/forms/urgent_passport_reason.pdf";
    }
    // 공증촉탁서 (공증 공통 양식 — 위임장·법률행위·사실행위·학적서류 등)
    if (t.startsWith("공증촉탁서") || t.startsWith("Notarization request form")) {
      return "/forms/notary_request_form.pdf";
    }
    // 인감증명서 발급 위임장
    if (t.startsWith("인감증명서 발급 위임장") || t.startsWith("Seal certificate power of attorney form")) {
      return "/forms/seal_issuance_poa.pdf";
    }
    // 인감(변경)신고서
    if (t.startsWith("인감(변경)신고서") || t.startsWith("Seal (change) registration form")) {
      return "/forms/seal_change_report.pdf";
    }
    // 인감보호(해제)신청서
    if (t.startsWith("인감보호(해제)신청서") || t.startsWith("Seal protection (release) request form")) {
      return "/forms/seal_protect_release.pdf";
    }
    // 운전면허 영문번역 신청서
    if (t.startsWith("운전면허 영문번역 신청서") || t.startsWith("Driver's license translation application form")) {
      return "/forms/driver_license_translation_form.pdf";
    }
    // 번역문 인증 4종 — 영사관 영문 양식
    if (t.startsWith("영사관 비치 양식 (출생증명서") || t.startsWith("Consulate form (English birth certificate")) {
      return "/forms/notary_birth_cert_en.pdf";
    }
    if (t.startsWith("영사관 비치 양식 (혼인증명서") || t.startsWith("Consulate form (English marriage certificate")) {
      return "/forms/notary_marriage_cert_en.pdf";
    }
    if (t.startsWith("영사관 비치 양식 (이혼증명서") || t.startsWith("Consulate form (English divorce certificate")) {
      return "/forms/notary_divorce_cert_en.pdf";
    }
    if (t.startsWith("영사관 비치 양식 (사망증명서") || t.startsWith("Consulate form (English death certificate")) {
      return "/forms/notary_death_cert_en.pdf";
    }
    // ── 병역 양식 ──
    if (t.startsWith("국외여행허가 신청서") || t.startsWith("국외여행(기간연장)허가 신청서") || t.startsWith("Overseas travel permit application") || t.startsWith("Overseas travel (period extension) permit application")) {
      return "/forms/overseas_travel_permit_form.pdf";
    }
    if (t.startsWith("가족 거주사실 확인서") || t.startsWith("Family residence confirmation form")) {
      return "/forms/family_residence_confirmation.pdf";
    }
    if (t.startsWith("개인정보제공동의서") || t.startsWith("Personal information consent form")) {
      return "/forms/personal_info_consent.pdf";
    }
    if (t.startsWith("재외국민 2세 확인신청서") || t.startsWith("Second-generation overseas Korean confirmation application")) {
      return "/forms/overseas_korean_2ndgen_form.pdf";
    }
    if (t.startsWith("허가의무 위반") || t.startsWith("Confirmation of sanctions for violating")) {
      return "/forms/travel_permit_violation_notice.pdf";
    }
    if (t.startsWith("병적증명서 신청서") || t.startsWith("Military service certificate application form")) {
      return "/forms/military_cert_application.pdf";
    }
    if (t.startsWith("개인정보 수집·이용 동의서") || t.startsWith("Personal information collection/use consent form")) {
      return "/forms/military_cert_privacy_consent.pdf";
    }
    if (t.includes("병적증명서용 위임장") || t.includes("Military service certificate power of attorney")) {
      return "/forms/proxy_poa_form3.pdf";
    }
    return null;
  };
  const baseDocs = L("docs", Array.isArray(page.docs) ? page.docs : []);
  const stateSrc = (lang === "en" && T_EN && T_EN.stateDocs) ? T_EN.stateDocs : page.stateDocs;
  const stateExtra = (stateSrc && ppState && Array.isArray(stateSrc[ppState]))
    ? stateSrc[ppState] : [];
  // 상태별 서류는 공통 서류 바로 뒤에 이어붙임
  const pageDocs = stateExtra.length ? [...baseDocs, ...stateExtra] : baseDocs;

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
  };

  const goTo = (id: any) => {
    if (!id || typeof id !== "string") return;
    // 별칭: DHL 특급 옵션은 일반 전자여권과 동일한 흐름으로 합류
    if (id === "pp_normal_age_dhl") id = "pp_normal_age";
    const resolved = lang === "en" && (EN_ROUTE_MAP as any)[id] ? (EN_ROUTE_MAP as any)[id] : id;
    if (!(TREE as any)[resolved] && resolved !== "home") {
      console.warn(`[goTo] 노드 없음: ${resolved}`);
      return;
    }
    setShowBookingModal(false);
    setOpenFaq(null);
    setHistory((h: any) => [...h, resolved]);
    setPageId(resolved);
    window.scrollTo(0, 0);
  };

  // ── 채팅 도우미: 질문을 받아 현재 언어 인덱스에서 매칭 (1단계: 검색 기반) ──
  const chatGoTo = (id: any) => { setChatOpen(false); goTo(id); };

  // ── 시나리오 정의 (서비스별 핵심 질문 → 되묻기/즉답) ──
  // 확장: 각 시나리오는 keywords(any 1개 매칭) + must(서비스 키워드, 1개 필수) + 응답 빌더.
  const CHAT_SCENARIOS: any[] = [
    // ===== 각종 증명서 (범죄경력·출입국·주민등록·납세·여권정보) =====
    {
      svc: "various_cert",
      must: ["범죄경력", "신원조사", "신원조회", "출입국사실", "출입국 사실", "주민등록", "등본", "초본", "납세", "소득금액", "소득 증명", "여권정보", "여권 정보", "criminal record", "background check", "immigration record", "tax certificate", "resident registration"],
      items: [
        {
          id: "vcert_q_criminal",
          kw: ["범죄경력", "신원조사", "신원조회", "범죄 경력", "범죄경력증명", "신원증명", "criminal record", "background check", "police check"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "신원조사(범죄경력)증명서는 용도(외국 비자·영주권용 / 캐나다 시민권용 / 신원확인용)에 따라 신청 서식이 다릅니다. 발급은 무료이지만 우편 접수가 불가능해 반드시 본인이 영사관을 방문해야 합니다. 아래에서 용도를 선택해 주세요."
              : "The criminal-record (background-check) certificate has different application forms depending on the purpose (foreign visa/PR, Canadian citizenship, or identity verification). It is free, but cannot be filed by mail — you must appear at the Consulate in person. Choose the purpose below.",
            goId: "vcert_criminal",
            goLabel: lang === "ko" ? "용도 선택하기" : "Choose the purpose",
          }),
        },
        {
          id: "vcert_q_immigration",
          kw: ["출입국", "출입국사실", "입출국", "immigration record", "entry exit", "travel record"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 출입국사실증명서는 공동인증서가 있으면 정부24에서 무료로 즉시 발급받을 수 있어 영사관 방문이 필요 없습니다. 공동인증서가 없으면 영사관 방문(즉시, CAD $2.70), 직계가족 대리, 또는 우편으로 발급받으실 수 있습니다. 아래에서 방법을 선택해 주세요."
              : "Yes — with a joint certificate, an immigration (entry/exit) record can be issued instantly and free on Government24, with no Consulate visit. Without it, you can use a Consulate visit (instant, CAD $2.70), an immediate-family proxy, or mail. Choose a method below.",
            goId: "vcert_immigration",
            goLabel: lang === "ko" ? "출입국사실증명서 발급" : "Immigration record issuance",
          }),
        },
        {
          id: "vcert_q_resident",
          kw: ["주민등록", "등본", "초본", "resident registration", "resident record"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 주민등록 등본·초본은 공동인증서가 있으면 정부24(gov.kr)에서 온라인으로 즉시 무료 발급이 가능해 영사관 방문이 필요 없습니다. 영사관 방문(당일 즉시) 또는 우편 접수도 가능합니다. 자세한 안내는 아래에서 확인하세요."
              : "Yes — a resident-registration copy (deungbon/chobon) can be issued instantly and free online via Government24 (gov.kr) with a joint certificate, no Consulate visit needed. A same-day Consulate visit or mail is also possible. See details below.",
            goId: "vcert_resident",
            goLabel: lang === "ko" ? "주민등록 등본·초본 보기" : "View resident registration",
          }),
        },
        {
          id: "vcert_q_tax",
          kw: ["납세", "소득", "소득금액", "세금 증명", "tax certificate", "income certificate"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "납세증명서·소득금액증명서는 공동인증서가 있으면 홈택스(hometax.go.kr)에서 온라인으로 즉시 무료 발급이 가능합니다. 영사관 방문(당일 즉시) 발급도 가능하며 무료입니다. 자세한 안내는 아래에서 확인하세요."
              : "A tax-payment or income certificate can be issued instantly and free online via Hometax (hometax.go.kr) with a joint certificate. A same-day Consulate visit is also available and free. See details below.",
            goId: "vcert_tax",
            goLabel: lang === "ko" ? "납세·소득 증명서 보기" : "View tax/income certificate",
          }),
        },
        {
          id: "vcert_q_passportinfo",
          kw: ["여권정보", "여권 정보", "여권정보증명", "passport info", "passport information"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "여권정보증명서는 공동인증서가 있으면 정부24(gov.kr)에서 온라인으로 무료 발급이 가능합니다. 영사관을 방문해 발급받는 경우 수수료는 CAD $1.00(현금)입니다. 자세한 안내는 아래에서 확인하세요."
              : "A passport-information certificate can be issued free online via Government24 (gov.kr) with a joint certificate. If issued at the Consulate in person, the fee is CAD $1.00 (cash). See details below.",
            goId: "vcert_passport_info",
            goLabel: lang === "ko" ? "여권정보증명서 보기" : "View passport-info certificate",
          }),
        },
      ],
    },
    // ===== 여권 =====
    {
      svc: "passport",
      must: ["여권", "passport"],
      items: [
        {
          id: "pp_q_urgent",
          kw: ["당일", "급하게", "급한데", "긴급여권", "긴급 여권", "오늘 받", "바로 받", "내일 출국", "내일 출발", "오늘 출국", "곧 출국", "출국인데", "출국해야", "출국 예정인데", "비행기", "급해요", "급합니다", "오늘 알았", "급하게 필요", "same day", "same-day", "urgent", "emergency passport", "leaving tomorrow", "flight tomorrow", "fly tomorrow"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "출국이 임박한 긴급 상황이라면, 긴급여권(비전자 단수여권, 유효기간 1년)을 당일 발급받을 수 있습니다. 단, 항공권 등 긴급한 출국 사유 증빙이 필요하며, 방문 전 torbooking.com에서 예약을 하셔야 합니다(긴급한 경우 영사관에 전화로 문의: 대표 416-920-3809). 시간 여유가 있다면 일반 전자여권을 DHL 특급(약 1~2주)으로 받으실 수도 있습니다. 아래에서 시작해 자세한 구비서류를 확인하세요."
              : "If your departure is imminent, you can get a same-day emergency passport (a non-electronic single-use passport, valid 1 year). You'll need proof of the urgent travel (e.g. a flight ticket) and a booking at torbooking.com before visiting (for urgent cases, call the Consulate: main 416-920-3809). If you have more time, a regular e-passport via DHL express (about 1–2 weeks) is also an option. Start below to check the required documents.",
            goId: "passport_start",
            goLabel: lang === "ko" ? "여권 안내 시작하기" : "Start passport guide",
          }),
        },
        {
          id: "pp_q_time",
          kw: ["얼마나", "며칠", "처리 기간", "발급 기간", "걸리", "소요", "언제 받", "언제 나와", "언제쯤", "how long", "how many days", "processing", "time", "when can i get"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "신청 후 처리 기간은 여권 종류에 따라 다릅니다:\n• 일반 전자여권 — 약 3~4주 (DHL 특급 이용 시 약 1~2주)\n• 비전자 단수여권 — 1주일 이내 (긴급 출국 사유 증빙 필요)"
              : "Processing time depends on the passport type:\n• Regular e-passport — about 3–4 weeks (1–2 weeks with DHL express)\n• Emergency single-use passport — within 1 week (proof of urgent departure required)",
            goId: "passport_start",
            goLabel: lang === "ko" ? "여권 안내 자세히 보기" : "View passport guide",
          }),
        },
        {
          id: "pp_q_lost",
          kw: ["잃", "분실", "도난", "없어졌", "잃어버", "사라졌", "lost", "stolen", "missing", "gone"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "여권을 분실하셨군요. 재발급 절차는 여권이 얼마나 급히 필요하신지에 따라 달라집니다. 아래에서 시작하시면 다음 화면에서 '분실'을 선택해 안내받으실 수 있습니다."
              : "Lost your passport. The process depends on how soon you need it. Start below — you'll select 'lost' on the next screens.",
            goId: "passport_start",
            goLabel: lang === "ko" ? "여권 재발급 시작하기" : "Start passport reissue",
          }),
        },
        {
          id: "pp_q_minor",
          kw: ["아이", "자녀", "미성년", "애기", "아들", "딸", "애", "child", "minor", "kid", "parent"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "대부분의 경우 친권자 한 명만 방문해 신청할 수 있습니다(방문하지 않는 부모의 법정대리인 동의서·인감 등이 필요할 수 있습니다). 다만 부모가 모두 캐나다에 거주해 인감 발급이 어려운 공동친권 등 일부 경우에는 부모가 함께 방문해야 합니다. 구체적인 요건은 연령·친권 상황(혼인 중·이혼·단독친권 등)에 따라 달라지니, 아래에서 시작해 정확히 확인하세요."
              : "In most cases, one custodial parent can apply in person (a legal-guardian consent form and seal from the non-attending parent may be required). However, in some cases — such as joint custody where both parents live in Canada and cannot issue a Korean seal — both parents must attend. The exact requirements depend on age and custody situation (married, divorced, sole custody, etc.), so start below to confirm."
            ,
            goId: "passport_start",
            goLabel: lang === "ko" ? "미성년 여권 시작하기" : "Start minor's passport",
          }),
        },
        {
          id: "pp_q_renew_docs",
          kw: ["서류", "구비", "준비물", "필요", "document", "papers", "what do i need", "requirement"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "갱신·재발급에 필요한 서류는 여권 종류(일반/긴급), 연령, 체류 신분에 따라 달라집니다. 아래에서 시작하시면 차례로 여쭤보고 정확한 구비서류를 안내해 드립니다."
              : "Required documents depend on the passport type (regular/emergency), age, and your residency status. Start below and we'll ask step by step.",
            goId: "passport_start",
            goLabel: lang === "ko" ? "필요 서류 확인하기" : "Check required documents",
          }),
        },
        {
          id: "pp_q_renew",
          kw: ["만료", "갱신", "연장", "기간 끝", "기간이 끝", "기간 만료", "유효기간", "다 됐", "다 돼", "새로 받", "새로 만들", "새 여권", "재발급", "expire", "expir", "renew", "renewal"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "여권 만료가 가까우면 미리 갱신(재발급) 신청이 가능합니다. 여권이 언제까지 필요한지에 따라 절차가 달라지니, 아래에서 시작해 주세요."
              : "If your passport is expiring soon, you can renew (reissue) in advance. The process depends on how soon you need it — start below.",
            goId: "passport_start",
            goLabel: lang === "ko" ? "여권 갱신 시작하기" : "Start passport renewal",
          }),
        },
      ],
    },
    // ===== 비자 =====
    {
      svc: "visa",
      must: ["비자", "사증", "visa", "f-4", "f4", "f-6", "무비자", "visa-free", "visa free", "체류기간 연장", "체류 연장", "체류기간을 연장", "extension of stay", "거소증", "거소신고", "국내거소", "거소", "residence card"],
      items: [
        {
          id: "visa_q_sojourn",
          kw: ["거소증", "거소신고", "국내거소", "거소", "residence card", "domestic residence"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "거소증(국내거소신고증)은 토론토 총영사관에서 발급하지 않습니다. F-4 비자 등으로 한국에 입국한 후, 거주지를 관할하는 출입국·외국인청(구 출입국관리사무소)에 국내거소신고를 하여 발급받습니다(입국 후 90일 이내 신고). 신청처가 다르니 유의하세요 — F-4 비자는 해외 공관(영사관)에서 신청하고, 거소증은 한국 내 출입국·외국인청에서 신청합니다. F-4는 체류자격(비자)이고, 거소증은 한국 내 신분증으로 은행·통신·부동산 등에 쓰입니다. 정확한 절차·서류는 한국 출입국·외국인청(하이코리아 hikorea.go.kr)으로 문의하시기 바랍니다."
              : "The residence card (domestic residence report card) is not issued by the Consulate General in Toronto. After entering Korea on an F-4 visa, etc., you file a domestic residence report at the immigration office for your area of residence to obtain it (within 90 days of entry). Note the application places differ — the F-4 visa is applied for at an overseas mission (Consulate), while the residence card is applied for at a Korea immigration office. F-4 is a status of stay (visa); the residence card is an ID within Korea used for banking, telecom, real estate, etc. For exact steps and documents, contact a Korea immigration office (HiKorea, hikorea.go.kr).",
            goId: "visa_start",
            goLabel: lang === "ko" ? "비자 안내 처음으로" : "Visa guide home",
          }),
        },
        {
          id: "visa_q_f4",
          kw: ["f-4", "f4", "재외동포", "예전에 한국", "과거 한국", "한국 국적이었", "former korean", "used to be korean", "overseas korean", "lost.*nationality", "국적상실"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "과거 한국 국적이셨다면 F-4 재외동포 비자 대상일 수 있습니다. 다만 먼저 국적 상태(선천적 이중국적 여부, 국적상실 신고 완료 여부)를 확인해야 합니다. 아래에서 시작하시면 차례로 여쭤봅니다."
              : "If you were formerly a Korean national, you may be eligible for the F-4 Overseas Korean visa. First we need to confirm your nationality status. Start below and we'll ask step by step.",
            goId: "visa_f4_start",
            goLabel: lang === "ko" ? "F-4 자격 확인 시작하기" : "Check F-4 eligibility",
          }),
        },
        {
          id: "visa_q_work",
          kw: ["취업", "일하", "일할", "일자리", "직장", "회사", "근무", "워홀", "워킹홀리데이", "취직", "work", "job", "employ", "hire", "teaching", "teach"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "취업 비자는 하시는 일(영어교사 E-2, 전문직 E-1~E-7, 워킹홀리데이 H-1 등)에 따라 종류가 달라집니다. 대부분 한국 고용주가 먼저 사증발급인정서(CVI)를 받아야 합니다. 아래에서 직무를 선택해 주세요."
              : "Work visas depend on the type of work (E-2 language instructor, E-1–E-7 professional, H-1 working holiday, etc.). Most require your Korean employer to obtain a Confirmation of Visa Issuance (CVI) first. Pick your work type below.",
            goId: "visa_work_en",
            goLabel: lang === "ko" ? "취업 비자 선택하기" : "Choose a work visa",
          }),
        },
        {
          id: "visa_q_extend",
          kw: ["연장", "체류기간 연장", "체류 연장", "기간 연장", "더 연장", "extend", "extension", "extension of stay", "prolong"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "캐나다 여권 소지자는 무비자로 최대 180일 체류가 가능하며, 체류기간은 입국 시 출입국심사관이 부여합니다. '무비자 입국은 연장이 불가능하다'고 오해하시는 경우가 많은데, 한국에는 체류기간 연장(Extension of Stay) 제도가 있어 체류 만료 전 관할 출입국·외국인청에 신청할 수 있습니다. 다만 연장이 자동 승인되는 것은 아니며, 연장 사유와 체류자격에 따라 심사를 받습니다.\n\n체류기간 연장은 한국 입국 후의 사안으로 토론토 총영사관 업무 범위가 아니므로, 정확한 가능 여부와 절차는 한국 관할 출입국·외국인청(하이코리아 hikorea.go.kr)으로 문의하시기 바랍니다."
              : "Canadian passport holders may stay visa-free for up to 180 days, with the period granted by the immigration officer at entry. Many assume 'visa-free entry cannot be extended,' but Korea has an Extension of Stay system — you can apply at the competent Immigration Office before your stay expires. Approval is not automatic; it is reviewed based on the reason and your status.\n\nExtension of stay is a matter handled inside Korea, not by the Consulate General in Toronto. For exact eligibility and procedures, please contact the competent Korea Immigration Office (HiKorea, hikorea.go.kr).",
            goId: "visa_start",
            goLabel: lang === "ko" ? "비자 안내 처음으로" : "Visa guide home",
          }),
        },
        {
          id: "visa_q_novisa6m",
          kw: ["무비자", "6개월", "더 머물", "오래 머물", "visa-free", "visa free", "without a visa", "6 months", "stay longer", "longer than"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 캐나다 시민권자는 무비자로 최대 6개월까지 머무실 수 있습니다. 그보다 오래 계실 계획이라면 목적에 맞는 비자(취업·학업·재외동포 등)를 따로 받으셔야 합니다. 다만 무비자로 입국한 뒤에는 한국 안에서 다른 비자로 바꾸기가 원칙적으로 어렵습니다. 장기 체류 예정이라면 입국 전에 미리 비자를 받아두시는 것이 좋습니다."
              : "Yes — Canadian citizens can stay in Korea visa-free for up to 6 months. To stay longer, you need a visa matching your purpose (work, study, overseas Korean, etc.). Note that visa-free status generally cannot be converted to another visa inside Korea, so it is best to obtain the right visa before entry if you plan a long stay.",
            goId: "visa_heritage_no_en",
            goLabel: lang === "ko" ? "체류 목적별 비자 보기" : "See visas by purpose",
          }),
        },
        {
          id: "visa_q_parentcare",
          kw: ["부모", "돌보", "돌봄", "간병", "모시", "방문동거", "care for", "parent", "look after", "elderly"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "부모님을 돌보기 위한 장기 체류(방문동거 등)는 개인 상황에 따라 자격과 서류가 크게 달라져, 이 앱에는 상세 안내가 준비되어 있지 않습니다. 정확한 내용은 비자과로 직접 문의해 주세요: torvisa@mofa.go.kr (대표 416-920-3809)."
              : "Long-term stay to care for parents in Korea (e.g. visiting/cohabitation) varies greatly by personal circumstances, so detailed guidance isn't available in this app. Please contact the Visa Section directly: torvisa@mofa.go.kr (main 416-920-3809).",
            goId: "visa_start",
            goLabel: lang === "ko" ? "비자 안내 처음으로" : "Visa guide home",
          }),
        },
        {
          id: "visa_q_longstay",
          kw: ["몇 년", "장기", "오래", "수년", "거주", "살고 싶", "살려고", "살려면", "오래 살", "오래 있", "정착", "live in korea", "several years", "long-term", "long term", "reside", "settle"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "한국에서 장기간 거주하시려면 체류 목적에 맞는 비자가 필요합니다. 단일 '장기 거주' 비자가 따로 있는 것은 아닙니다. 취업이면 E계열, 학업이면 D계열, 재외동포(과거 한국 국적)면 F-4가 해당됩니다. 아래에서 목적을 선택해 주세요. (과거 한국 국적이셨다면 'F-4 재외동포'도 확인해 보세요.)"
              : "For a long-term stay in Korea, you need a visa matching your purpose — there isn't a single 'long-term residence' visa. Work → E-series, study → D-series, overseas Korean (former Korean national) → F-4. Pick your purpose below. (If you were formerly a Korean national, also check F-4.)",
            goId: "visa_heritage_no_en",
            goLabel: lang === "ko" ? "체류 목적별 비자 보기" : "See visas by purpose",
          }),
        },
        {
          id: "visa_q_general",
          kw: ["어디서", "어디에서", "어떻게 신청", "신청은", "신청 방법", "비자 종류", "무슨 비자", "어떤 비자", "where do i apply", "how to apply", "which visa"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "비자는 신청 목적(취업·학업·결혼·재외동포 등)에 따라 종류와 절차가 완전히 달라집니다. 대부분 온라인 비자포털(visa.go.kr)이나 영사관을 통해 신청하며, 일부는 한국 고용주·기관이 먼저 사증발급인정서를 받아야 합니다. 먼저 어떤 목적인지 아래에서 선택해 주세요."
              : "Visas differ completely by purpose (work, study, marriage, overseas Korean, etc.). Most are applied for via the visa portal (visa.go.kr) or the Consulate, and some require a Korean employer/institution to obtain a Confirmation of Visa Issuance first. Start by choosing your purpose below.",
            goId: "visa_start",
            goLabel: lang === "ko" ? "비자 안내 시작하기" : "Start visa guide",
          }),
        },
      ],
    },
    // ===== 증명서 발급 (가족관계증명서 등) =====
    {
      svc: "cert_issue",
      must: ["증명서", "가족관계증명", "기본증명", "혼인관계증명", "영문 증명", "영문증명", "certificate", "family relation cert", "basic cert"],
      items: [
        {
          id: "cert_q_translation",
          kw: ["번역", "번역 공증", "번역본", "직접 번역", "translation", "translate"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "증명서를 한국 제출용 등으로 번역해 인증받으시려면 영사관 번역문 인증(번역 공증)을 이용하시면 됩니다. 다만 본인 번역의 인정 여부와 가능한 서류는 제출처·서류 종류에 따라 다르며, 일부(예: 캐나다 이민국 IRCC 제출용)는 영사관 번역 공증이 인정되지 않습니다. 아래에서 번역하려는 서류 종류를 선택해 확인하세요."
              : "To have a certificate translated and authenticated (e.g. for submission in Korea), use the Consulate's translation authentication. Whether your own translation is accepted and which documents qualify depend on the receiving body and document type — some (e.g. Canada's IRCC) do not accept Consulate translation authentication. Choose the document type below.",
            goId: "notarization_translation_type",
            goLabel: lang === "ko" ? "번역 공증 안내 보기" : "View translation authentication",
          }),
        },
        {
          id: "fam_q_cert_apostille",
          kw: ["아포스티유", "캐나다 정부 제출", "캐나다에 제출", "외국 제출", "외국에 제출", "apostille", "for canadian government", "submit to canada"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "한국에서 발행한 증명서(가족관계증명서 등)를 캐나다 정부 등 외국 기관에 제출할 때 아포스티유가 필요한 경우, 그 아포스티유는 한국 외교부(또는 정부24)에서 발급받으셔야 하며 토론토 영사관에서는 처리되지 않습니다. 한국 내 가족이나 대리인을 통해 한국에서 진행하시는 것이 일반적입니다. 정확한 절차는 제출받는 캐나다 기관과 한국 외교부에 확인하시기 바랍니다."
              : "If a certificate issued in Korea (e.g. a family-relation certificate) needs an Apostille to be submitted to a foreign body such as the Canadian government, that Apostille must be obtained from Korea's Ministry of Foreign Affairs (or Government24) — it is not processed at the Toronto Consulate. It is usually handled in Korea through family or a proxy. Please confirm the exact steps with the receiving Canadian body and Korea's MOFA.",
            goId: "family_cert",
            goLabel: lang === "ko" ? "증명서 발급 안내 보기" : "View certificate guide",
          }),
        },
        {
          id: "fam_q_cert_fee",
          kw: ["수수료", "얼마", "비용", "가격", "무료", "fee", "cost", "how much", "price", "free"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "가족관계증명서 등은 공동인증서가 있으면 온라인(전자가족관계등록시스템)에서 즉시 무료로 발급받을 수 있습니다. 공동인증서가 없어 영사관을 통해 발급받는 경우에는 약 2주가 소요되며 수수료는 통당 약 $1.30입니다. 발급 방법은 아래에서 선택하실 수 있습니다."
              : "If you have a joint certificate (gongdong-injungseo), family-relation and similar certificates can be issued instantly and free online via the Electronic Family Relation Registration System. Without it, issuance through the Consulate takes about 2 weeks and costs about $1.30 per copy. Choose a method below.",
            goId: "family_cert",
            goLabel: lang === "ko" ? "증명서 발급 시작하기" : "Start certificate issuance",
          }),
        },
        {
          id: "fam_q_cert_online",
          kw: ["온라인", "인터넷", "집에서", "online", "internet", "from home", "remotely"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 공동인증서(구 공인인증서)가 있으면 전자가족관계등록시스템에서 온라인으로 즉시 무료 발급이 가능하며, 영사관 방문이 필요 없습니다. 공동인증서가 없으면 한국 내 가족, 대리인, 또는 영사관 방문/우편으로 발급받으실 수 있습니다. 아래에서 방법을 선택해 주세요."
              : "Yes — if you have a joint certificate (gongdong-injungseo), you can issue it online instantly and free via the Electronic Family Relation Registration System, with no Consulate visit needed. Without it, you can use family in Korea, a proxy, or a Consulate visit/mail. Choose a method below.",
            goId: "family_cert",
            goLabel: lang === "ko" ? "증명서 발급 시작하기" : "Start certificate issuance",
          }),
        },
        {
          id: "fam_q_cert_english",
          kw: ["영문", "영어 증명서", "영문 증명", "english", "in english"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 영문 가족관계증명서 발급이 가능합니다. 영문증명서에는 본인·부모·배우자 정보가 하나의 서류에 담기며(자녀 정보는 포함되지 않습니다), 공동인증서가 있으면 온라인에서 즉시 무료로 발급받을 수 있습니다. 아래에서 영문 증명서 발급을 시작하세요."
              : "Yes — an English family-relation certificate is available. It contains the holder's, parents', and spouse's information in one document (children's information is not included), and with a joint certificate it can be issued instantly and free online. Start English certificate issuance below.",
            goId: "family_cert_english",
            goLabel: lang === "ko" ? "영문 증명서 발급 시작하기" : "Start English certificate",
          }),
        },
        {
          id: "fam_q_cert_visit",
          kw: ["직접 방문", "방문해야", "가야 하나", "가야 되나", "본인이 가", "in person", "have to visit", "must i go", "visit"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "꼭 그렇지는 않습니다. 공동인증서가 있으면 온라인으로 즉시 발급할 수 있어 영사관 방문이 필요 없습니다. 공동인증서가 없는 경우에만 한국 내 가족, 대리인, 또는 영사관 방문/우편을 이용하시면 됩니다. 아래에서 방법을 선택해 주세요."
              : "Not necessarily. With a joint certificate you can issue it online instantly, with no Consulate visit needed. Only without it would you use family in Korea, a proxy, or a Consulate visit/mail. Choose a method below.",
            goId: "family_cert",
            goLabel: lang === "ko" ? "증명서 발급 시작하기" : "Start certificate issuance",
          }),
        },
      ],
    },
    // ===== 공증 =====
    {
      svc: "notarization",
      must: ["공증", "인증", "위임", "위임장", "아포스티유", "영사관 확인", "영사 확인", "한국에 제출", "서명", "번역", "이름이 다", "이름 불일치", "성명 불일치", "동일인", "notar", "apostille", "authenticat", "power of attorney", "poa", "submit to korea", "sign before", "sign in advance", "translation", "different name"],
      items: [
        {
          id: "notar_q_translation",
          kw: ["번역", "번역 공증", "번역본", "출생증명서 번역", "혼인증명서 번역", "직접 번역", "translation", "translate"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "출생·혼인·사망증명서 등 캐나다 문서를 한국 제출용으로 번역할 때, 영사관에서 번역문 인증(번역 공증)을 받을 수 있습니다. 다만 본인이 한 번역도 인증 대상이 되는지, 어떤 서류에 인증이 가능한지는 제출처와 서류 종류에 따라 다릅니다(예: 캐나다 이민국 IRCC 제출용 등 일부는 영사관 번역 공증이 인정되지 않습니다). 아래에서 번역하려는 서류 종류를 선택해 정확히 확인하세요."
              : "For Canadian documents (birth, marriage, death certificates, etc.) being submitted in Korea, the Consulate can authenticate the translation. Whether your own translation qualifies, and which documents are eligible, depends on the receiving body and document type (e.g. for some submissions like Canada's IRCC, Consulate translation authentication is not accepted). Choose the document type below to confirm.",
            goId: "notarization_translation_type",
            goLabel: lang === "ko" ? "번역 공증 안내 보기" : "View translation authentication",
          }),
        },
        {
          id: "notar_q_namematch",
          kw: ["이름이 다", "이름 불일치", "성명 불일치", "이름이 안 맞", "한국 이름", "영문 이름", "동일인", "같은 사람", "different name", "name mismatch", "same person"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "시민권 증서의 영문 이름과 한국 서류의 이름이 달라 같은 사람임을 증명해야 하는 경우, 영사관에서 동일인 진술서(사실행위 증서) 공증을 받을 수 있습니다. 서명은 반드시 영사 앞에서 하셔야 합니다. 아래에서 안내를 확인하세요."
              : "If the English name on your citizenship certificate differs from the name on your Korean documents and you need to prove they are the same person, the Consulate can notarize a statement of identity (a 'same person' declaration). You must sign before the consul. See the guidance below.",
            goId: "notarization_sign_passport",
            goLabel: lang === "ko" ? "동일인 진술서 안내 보기" : "View identity statement",
          }),
        },
        {
          id: "notar_q_presign",
          kw: ["미리 서명", "먼저 서명", "사전 서명", "서명 먼저", "서명하고 가", "서명해서 가", "먼저 하고 가", "집에서 서명", "미리 사인", "사인하면", "미리 작성해서 서명", "sign in advance", "pre-sign", "presign", "already signed", "sign beforehand", "sign before"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "아니요. 영사관 공증·인증은 모든 서명을 반드시 영사 앞에서 직접 하셔야 합니다. 서류는 미리 작성하셔도 되지만 서명란은 반드시 공백으로 두고 오셔야 하며, 사전 서명이나 타인의 대리 서명은 인정되지 않습니다."
              : "No. For Consulate notarization/authentication, all signatures must be made in person before the consul. You may prepare the document in advance, but leave the signature line blank — pre-signing or signing by someone else is not accepted.",
            goId: "notarization_start",
            goLabel: lang === "ko" ? "공증 안내 보기" : "View notarization guide",
          }),
        },
        {
          id: "notar_q_visit",
          kw: ["직접 방문", "방문해야", "꼭 가야", "가야 하나", "가야 되나", "우편으로", "in person", "have to visit", "must i go", "by mail", "mail it"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "공증·인증은 영사 앞에서 직접 서명해야 하므로 본인 방문이 원칙입니다. 다만 일부 업무(초·중·고 학적서류, 영문 운전경력증명서 등)는 우편 접수나 온라인 발급이 가능합니다. 필요하신 업무를 아래에서 선택하시면 방문/우편 여부를 안내해 드립니다."
              : "Notarization/authentication generally requires you to appear in person, since signing happens before the consul. However, some services (school records, English driving-record certificates, etc.) can be done by mail or online. Pick your service below to see whether mail is an option.",
            goId: "notarization_start",
            goLabel: lang === "ko" ? "공증 업무 선택하기" : "Choose a notarization service",
          }),
        },
        {
          id: "notar_q_canadadoc",
          kw: ["캐나다에서 작성", "캐나다에서 발행", "캐나다 서류", "캐나다 문서", "한국에 제출", "영사관 확인", "issued in canada", "canadian document", "submit.*korea", "apostille", "아포스티유"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "캐나다에서 발행된 문서를 한국에 제출하실 때는, 2024년 캐나다의 아포스티유 협약 가입 이후 영사관 확인이 아니라 아포스티유로 진행하는 것이 원칙입니다. 발급처와 절차는 아래에서 확인하실 수 있습니다."
              : "For documents issued in Canada to be submitted in Korea, since Canada joined the Apostille Convention in 2024 you generally use an Apostille — not Consulate authentication. Check the issuing authority and steps below.",
            goId: "notarization_canada_doc",
            goLabel: lang === "ko" ? "아포스티유 안내 보기" : "View Apostille guide",
          }),
        },
        {
          id: "notar_q_realty",
          kw: ["아파트", "부동산", "집을 팔", "매도", "매매", "처분", "real estate", "property", "apartment", "sell.*house", "sell.*apartment"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "한국 부동산 처분을 가족에게 맡기시려면 위임장(또는 매매 관련 법률행위 증서) 공증이 필요합니다. 서류 종류에 따라 안내가 달라지니, 아래에서 시작해 정확한 종류를 선택해 주세요. (부동산 매도 위임은 보통 위임장으로 작성합니다.)"
              : "To authorize a family member to handle Korean real-estate, you'll need a notarized power of attorney (or a legal-act deed for the sale). Guidance differs by document type — start below and choose the exact type. (Real-estate sale delegation is usually written as a power of attorney.)",
            goId: "notarization_saseo",
            goLabel: lang === "ko" ? "서류 종류 선택하기" : "Choose document type",
          }),
        },
        {
          id: "notar_q_poa",
          kw: ["위임장", "위임", "대신 처리", "대리", "은행 업무", "power of attorney", "poa", "delegate", "on my behalf", "bank"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "한국 내 업무(은행 등)를 대신 처리하도록 위임장을 써주시려면 영사관에서 사문서 인증(위임장 공증)을 받으시면 됩니다. 단, 서명은 반드시 영사 앞에서 하셔야 합니다. 아래에서 시작해 서류 종류를 선택해 주세요."
              : "To authorize someone to handle matters in Korea (e.g. banking), you can have the Consulate notarize a power of attorney (private-document authentication). You must sign before the consul. Start below and choose the document type.",
            goId: "notarization_saseo",
            goLabel: lang === "ko" ? "서류 종류 선택하기" : "Choose document type",
          }),
        },
      ],
    },
    // ===== 병역 =====
    {
      svc: "military",
      must: ["병역", "군대", "군 복무", "군복무", "입대", "국외여행허가", "국적이탈", "이탈", "병적", "military", "army", "conscription", "service", "renounce", "renunciation"],
      items: [
        {
          id: "mil_q_exitdeadline",
          kw: ["언제까지", "기한", "마감", "시한", "deadline", "by when", "until when", "when do i", "when must"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "선천적 복수국적 남성은 만 18세가 되는 해의 3월 31일까지만 일반 국적이탈신고를 할 수 있습니다. 이 기간을 넘기면 원칙적으로 병역의무를 해소한 후에만 이탈이 가능합니다(예외적 허가 제도 별도). 출생 상황에 따라 달라질 수 있으니 아래에서 확인하세요. (여성은 시기 기준이 다릅니다.)"
              : "A male with congenital dual nationality can file an ordinary nationality-exit report only until March 31 of the year he turns 18. After that, exit is generally possible only after fulfilling military service (a separate exceptional permit exists). It can vary by birth circumstances — check below. (Different timing applies to women.)",
            goId: "nationality_renounce_start",
            goLabel: lang === "ko" ? "국적이탈 안내 보기" : "View nationality-exit guide",
          }),
        },
        {
          id: "mil_q_age18",
          kw: ["18세", "18살", "만 18", "곧 18", "되는데", "병역 문제", "병역 때문", "지금 해야 할", "지금 뭘 해야", "뭐 해야", "뭘 해야", "해야 할 일", "할 일", "준비할", "turning 18", "turns 18", "age 18", "18 years", "military issue", "what should i do"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "아들이 선천적 복수국적자라면, 만 18세가 되는 해 3월 31일이 국적이탈 신고의 중요한 기한입니다. 이 시점에 따라 선택지가 달라지니, 아래에서 상황을 확인해 필요한 절차를 안내받으실 수 있습니다."
              : "If your son holds congenital dual nationality, March 31 of the year he turns 18 is the key deadline for filing a nationality-exit report. The options depend on this timing — check the situation below.",
            goId: "nationality_renounce_start",
            goLabel: lang === "ko" ? "국적이탈 절차 확인하기" : "Check nationality-exit steps",
          }),
        },
        {
          id: "mil_q_canadaborn",
          kw: ["태어난", "출생", "캐나다에서 태어", "born in canada", "born here", "아들인데", "군대 가", "군대 가야", "군대에 가", "군 복무 해야", "go to the army"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "캐나다에서 태어난 아들도 부모 중 한 명이 출생 당시 한국 국적이었다면 선천적 복수국적자일 수 있고, 이 경우 한국 병역의무가 따를 수 있습니다. 병역의무를 피하려면 정해진 기간 내 국적이탈이 필요합니다. 다만 상황마다 달라 단정하기 어려우니, 아래에서 출생 상황을 확인해 정확히 안내받으시기 바랍니다."
              : "A son born in Canada may still be a congenital dual national if a parent was a Korean national at his birth — in which case Korean military duty may apply. Avoiding it requires a nationality-exit report within the set period. This can't be stated categorically, so check the birth circumstances below.",
            goId: "nationality_renounce_start",
            goLabel: lang === "ko" ? "출생 상황별 안내 보기" : "Check by birth circumstances",
          }),
        },
        {
          id: "mil_q_citizenship",
          kw: ["시민권을 취득", "시민권 취득", "귀화", "후천", "acquire citizenship", "became a citizen", "naturaliz"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "아니요, 한국 국적자가 나중에 캐나다 시민권을 취득하더라도 그 자체로 한국 병역의무가 자동으로 사라지지는 않습니다. 병역 관계는 국적·연령·국외여행허가 상황에 따라 달라지므로, 구체적인 내용은 병역 또는 국적 업무에서 확인하셔야 합니다. 아래에서 병역 업무를 선택해 주세요."
              : "No — if a Korean national later acquires Canadian citizenship, that alone does not automatically end Korean military duty. The situation depends on nationality, age, and overseas-travel-permit status, so please check via the military or nationality services. Pick a military service below.",
            goId: "military_start",
            goLabel: lang === "ko" ? "병역 업무 보기" : "View military services",
          }),
        },
        {
          id: "mil_q_dualstay",
          kw: ["학교", "유학", "오래 체류", "장기 체류", "거주", "복수국적", "체류하면", "study in korea", "long stay", "reside", "dual national"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 복수국적 남성이 한국에 장기 체류하거나 학교를 다니는 경우 국외여행허가 의무나 체류 기간에 따른 병역 관련 영향이 생길 수 있습니다. 상황에 따라 안내가 달라지니, 아래에서 국외여행허가 업무를 확인해 주세요."
              : "Yes — if a dual-national male stays long-term or attends school in Korea, there may be overseas-travel-permit obligations or military-related effects tied to the length of stay. Guidance varies by situation, so check the overseas-travel-permit service below.",
            goId: "military_permit_start",
            goLabel: lang === "ko" ? "국외여행허가 확인하기" : "Check overseas-travel permit",
          }),
        },
      ],
    },
    // ===== 국적 =====
    {
      svc: "nationality",
      must: ["국적", "시민권", "복수국적", "이중국적", "국적상실", "국적이탈", "국적선택", "국적회복", "이탈 기간", "이탈 신고 기간", "이탈 신고", "예외적 이탈", "국적 포기", "nationality", "citizenship", "dual national"],
      items: [
        {
          id: "nat_q_recover",
          kw: ["회복", "되찾", "포기했는데", "다시 가질", "다시 받", "다시 취득", "복원", "65세", "만 65", "restore", "recover", "get it back", "reclaim", "regain", "back again", "age 65"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 과거에 한국 국적을 포기(상실·이탈)하셨다가 다시 회복하는 '국적회복' 제도가 있습니다. 다만 영사관에서 처리되지 않고 한국 출입국·외국인관서에서 신청해야 하며, 복수국적 회복은 만 65세 이상 등 일정 요건이 있습니다. 자세한 내용은 아래에서 확인하실 수 있습니다."
              : "Yes — there is a 'nationality restoration' process to regain Korean nationality you previously gave up. It isn't handled at the Consulate (you apply at a Korean immigration office), and restoring dual nationality has conditions such as being age 65 or older. Check the details below.",
            goId: "nationality_recover",
            goLabel: lang === "ko" ? "국적회복 안내 보기" : "View restoration guide",
          }),
        },
        {
          id: "nat_q_dual",
          kw: ["동시에", "둘 다", "함께 가질", "복수국적이 가능", "이중국적이 가능", "이중국적", "복수국적 되", "복수국적 가능", "복수국적 유지", "복수국적을 유지", "이중국적 되", "유지할 수", "둘 다 가질", "두 나라", "두 개의 국적", "두개", "두 개", "양쪽 다", "both", "at the same time", "hold both", "keep both", "dual citizen", "two nationalities"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "선천적 복수국적자(태어날 때부터 두 국적)는 정해진 기한 내 '국적선택신고(외국국적불행사 서약)'를 하면 한국 국적과 캐나다 국적을 함께 유지할 수 있습니다. 다만 후천적으로 외국 국적을 취득한 경우에는 원칙적으로 한국 국적을 상실합니다. 본인 상황에 맞는 안내는 아래에서 확인하실 수 있습니다."
              : "A congenital dual national (two nationalities from birth) can keep both Korean and Canadian nationality by filing a 'nationality-choice report (pledge not to exercise foreign nationality)' within the deadline. However, if you acquired a foreign nationality later (by your own act), you generally lose Korean nationality. Check your situation below.",
            goId: "nationality_start",
            goLabel: lang === "ko" ? "국적 안내 보기" : "View nationality guide",
          }),
        },
        {
          id: "nat_q_childborn",
          kw: ["태어난 아이", "태어난 아기", "출생한 아이", "캐나다에서 태어난", "아이도 한국", "여기서 낳은", "여기서 태어난", "낳은 아이", "낳은 애", "우리 애", "아기도 한국", "애 한국", "애도 한국", "애 국적", "아이 국적", "child born", "baby born", "is my child korean", "born here"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 한국은 부모의 국적을 따르는 속인주의이므로, 출생 당시 부모 중 한 명이 한국 국적이었다면 캐나다에서 태어난 아이도 한국 국적을 함께 가진 선천적 복수국적자가 됩니다(출생지와 무관). 이후 국적 유지·선택·이탈 절차는 상황에 따라 달라지니 아래에서 확인하실 수 있습니다."
              : "Yes — Korea follows jus sanguinis (nationality by parentage), so if a parent was a Korean national at the child's birth, a child born in Canada is also a congenital dual national holding Korean nationality, regardless of birthplace. The later retention/choice/exit steps vary by situation, so check below.",
            goId: "nationality_start",
            goLabel: lang === "ko" ? "국적 안내 보기" : "View nationality guide",
          }),
        },
        {
          id: "nat_q_loss_late",
          kw: ["안 했는데", "안했는데", "신고 안", "미신고", "지금도", "지금이라도", "10년", "오래됐", "오래 됐", "한참 됐", "취득한 지", "취득한지", "괜찮", "늦었", "안 하면", "haven't reported", "didn't report", "still report", "long ago", "10 years"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 국적상실 신고는 언제든지 할 수 있습니다. 캐나다 시민권을 취득하면 그 시점에 한국 국적은 법률상 자동으로 상실되지만, 국적상실 '신고' 자체는 시점 제한이 없어 10년이 지났더라도 가능합니다. 다만 F-4 재외동포 비자 신청이나 각종 가족관계등록 업무를 처리하려면 미리 신고해 두시는 것이 좋습니다. 아래에서 신고를 시작하실 수 있습니다."
              : "Yes, a nationality-loss report can be filed at any time. Korean nationality is automatically lost by law the moment you acquire Canadian citizenship, but the 'report' itself has no time limit — it is possible even after 10 years. That said, it is best to file it in advance if you'll need an F-4 Overseas Korean visa or any family-relation registration service. You can start the report below.",
            goId: "nationality_citizen_start",
            goLabel: lang === "ko" ? "국적상실 신고 시작하기" : "Start nationality-loss report",
          }),
        },
        {
          id: "nat_q_loss",
          kw: ["국적상실", "상실 신고", "상실신고", "시민권을 취득했는데", "시민권 취득했는데", "시민권 따", "시민권을 따", "시민권 땄", "시민권을 땄", "시민권 받았는데", "시민권 취득 후", "시민권 취득후", "취득 후 뭘", "취득하면 뭘", "국적 어떻게 돼", "국적은 어떻게", "loss report", "report.*loss", "lose korean", "lost korean nationality", "what happens to my korean", "after getting citizenship", "got citizenship"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 본인의 의사로 캐나다 시민권 등 외국 국적을 취득하면 그 시점에 한국 국적을 상실하며, 이를 '국적상실신고'로 신고해야 합니다. 본인 신고인지, 사망한 가족에 대한 신고인지에 따라 절차가 달라지니 아래에서 시작해 주세요."
              : "Yes — if you voluntarily acquire a foreign nationality (e.g. Canadian citizenship), you lose Korean nationality at that point and must file a 'nationality-loss report.' The process differs depending on whether it is for yourself or a deceased family member, so start below.",
            goId: "nationality_citizen_start",
            goLabel: lang === "ko" ? "국적상실 신고 시작하기" : "Start nationality-loss report",
          }),
        },
        {
          id: "nat_q_exit_missed",
          kw: ["기간을 놓", "기간 놓", "기한을 놓", "기한 놓", "기한 지난", "기한이 지난", "18세 지난", "18세가 지난", "늦게 이탈", "이탈 기간 지", "병역미필인데 이탈", "예외적 이탈", "missed the deadline", "missed deadline", "past the exit"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "국적이탈 신고 기간(만 18세가 되는 해 3월 31일)을 넘긴 병역미필 남성은, 일반 국적이탈이 아니라 '예외적 국적이탈 허가'(국적법 제14조의2) 절차를 거쳐야 합니다. 요건이 까다롭고 비용(CAD $121.50)이 발생하니 아래에서 자세히 확인하세요."
              : "A male who has not fulfilled military service and missed the nationality-exit deadline (March 31 of the year turning 18) must go through the 'exceptional nationality-exit permit' (Nationality Act Art. 14-2), not an ordinary exit. The requirements are strict and a fee (CAD $121.50) applies — see the details below.",
            goId: "nationality_renounce_exception",
            goLabel: lang === "ko" ? "예외적 국적이탈 안내 보기" : "View exceptional exit permit",
          }),
        },
        {
          id: "nat_q_exit",
          kw: ["이탈", "포기하려", "포기할", "포기 기한", "포기 언제", "국적 포기", "버리려", "renounce", "give up", "relinquish", "exit"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "선천적 복수국적자가 한국 국적을 포기하는 '국적이탈신고'는 성별·출생 상황·시기에 따라 절차와 가능 여부가 달라집니다. 특히 남성은 만 18세가 되는 해 3월 31일까지가 일반 이탈 기한입니다. 아래에서 상황을 확인해 주세요."
              : "For a congenital dual national, the 'nationality-exit report' to give up Korean nationality depends on gender, birth circumstances, and timing. In particular, males have until March 31 of the year they turn 18 for an ordinary exit. Check your situation below.",
            goId: "nationality_renounce_start",
            goLabel: lang === "ko" ? "국적이탈 절차 확인하기" : "Check nationality-exit steps",
          }),
        },
        {
          id: "nat_q_choice",
          kw: ["국적선택", "국적 선택", "선택신고", "외국국적불행사", "불행사 서약", "nationality choice", "choice report", "non-exercise"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "선천적 복수국적자가 한국 국적을 유지하기 위해 하는 신고가 '국적선택신고(외국국적불행사 서약)'입니다. 정해진 기한 내에 신고하면 한국 국적과 외국 국적을 함께 유지할 수 있습니다. 아래에서 안내를 확인하세요."
              : "A 'nationality-choice report (pledge not to exercise foreign nationality)' is filed by a congenital dual national to keep Korean nationality. Filing within the deadline lets you hold both Korean and foreign nationality. See the guidance below.",
            goId: "nationality_choice_start",
            goLabel: lang === "ko" ? "국적선택신고 시작하기" : "Start nationality-choice report",
          }),
        },
        {
          id: "nat_q_retain",
          kw: ["국적보유", "국적 보유", "보유신고", "부모와 함께 시민권", "함께 취득한 미성년", "같이 시민권", "retain", "retention report"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "부모와 함께 외국 시민권을 취득한 미성년 자녀가 한국 국적을 유지하려면 '국적보유신고'를 합니다. 시민권 취득(선서)일로부터 정해진 기간 내에 신고해야 하니, 아래에서 기한과 절차를 확인하세요."
              : "A minor child who acquired foreign citizenship together with their parents files a 'nationality-retention report' to keep Korean nationality. It must be filed within a set period from the citizenship (oath) date — check the deadline and steps below.",
            goId: "nationality_keep_start",
            goLabel: lang === "ko" ? "국적보유신고 보기" : "View nationality-retention report",
          }),
        },
        {
          id: "nat_q_terms",
          kw: ["용어", "헷갈", "차이가 뭐", "뭐가 다른", "구분", "이탈이랑 상실", "이탈 vs", "상실 vs", "difference between", "terms", "confused"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "국적 관련 용어(이탈·상실·보유·선택)가 헷갈리실 수 있습니다. 이탈은 선천적 복수국적자가 한국 국적을 포기하는 것, 상실은 본인 의사로 외국 국적을 취득해 한국 국적을 잃는 것, 보유·선택은 한국 국적을 유지하는 신고입니다. 아래에서 네 용어를 한눈에 비교해 보세요."
              : "The nationality terms (exit, loss, retention, choice) can be confusing. Exit = a congenital dual national gives up Korean nationality; loss = you lose it by voluntarily acquiring a foreign nationality; retention/choice = reports to keep Korean nationality. Compare all four below.",
            goId: "nationality_terms",
            goLabel: lang === "ko" ? "네 용어 비교 보기" : "Compare the four terms",
          }),
        },
        {
          id: "nat_q_general",
          kw: ["국적", "시민권", "nationality", "citizenship"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "국적 업무는 상황에 따라 국적이탈·국적상실·국적선택·국적보유·국적회복 등으로 나뉩니다. 아래에서 본인 상황을 선택하시면 정확한 안내로 연결해 드립니다."
              : "Nationality services are divided by situation — exit, loss, choice, retention, restoration, and more. Choose your situation below and we'll guide you to the right information.",
            goId: "nationality_start",
            goLabel: lang === "ko" ? "국적 안내 시작하기" : "Start nationality guide",
          }),
        },
      ],
    },
    // ===== 가족관계등록 =====
    {
      svc: "family",
      must: ["가족관계", "출생신고", "혼인신고", "이혼신고", "사망신고", "기본증명", "혼인관계증명", "출생 등록", "출생", "태어났", "태어난", "출산", "혼인", "이혼", "사망", "정정", "결혼", "태어난 아이", "태어난 아기", "낳", "돌아가", "가족관계등록부", "잘못된 정보", "기록 정정", "family register", "family relation", "birth", "born", "marriage", "death", "divorce", "register"],
      items: [
        {
          id: "fam_q_fix",
          kw: ["정정", "잘못된", "수정", "오류", "틀린", "틀린 거", "고치", "고쳐", "바로잡", "correct", "fix", "wrong", "error", "amend"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 가족관계등록부의 잘못된 정보는 정정이 가능합니다. 다만 어떤 항목(외국인 가족의 사망기록 추가, 또는 국적·성별·생년월일·외국인등록번호 등)을 정정하는지에 따라 절차가 달라집니다. 아래에서 정정 종류를 선택해 주세요."
              : "Yes — incorrect information in the family register can be corrected. The procedure depends on what you are correcting (adding a foreign family member's death record, or nationality, sex, date of birth, registration number, etc.). Choose the correction type below.",
            goId: "family_fix",
            goLabel: lang === "ko" ? "기록 정정 시작하기" : "Start record correction",
          }),
        },
        {
          id: "fam_q_birth_late",
          kw: ["늦게 해도", "늦어도", "늦게", "기한 지났", "기한이 지났", "기한 넘", "지연신고", "늦게 신고", "지금 해도", "안 했는데", "안 했어", "몇 살", "2살", "5살", "10살", "지났는데", "too late", "late registration", "missed the deadline", "overdue"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "출생신고는 법적으로 출생 후 1개월 이내에 해야 합니다. 「가족관계의 등록 등에 관한 법률」에 따라 신고의무자가 정당한 사유 없이 기한을 넘기면 5만 원 이하의 과태료가 부과될 수 있습니다.\n\n다만 기한이 지났다고 해서 출생신고를 못 하는 것은 아닙니다. 아이가 2살, 5살, 심지어 10살이 넘었더라도 출생신고 자체는 가능합니다. 이 경우 지연 사유에 대한 설명이나 추가 확인이 필요할 수 있습니다. 아래에서 출생신고 절차를 시작해 주세요."
              : "A birth report must legally be filed within 1 month of birth. Under the Act on Registration of Family Relations, if the person obligated to report misses the deadline without justifiable cause, a fine of up to KRW 50,000 may be imposed.\n\nHowever, missing the deadline does not mean you can no longer file. Even if the child is 2, 5, or over 10 years old, the birth report can still be made — though an explanation of the delay or additional verification may be required. Start the birth-report process below.",
            goId: "family_birth",
            goLabel: lang === "ko" ? "출생신고 시작하기" : "Start birth report",
          }),
        },
        {
          id: "fam_q_birth",
          kw: ["태어난 아이", "출생신고", "출생 등록", "아이를 한국", "아기를 한국", "등록해야", "한국에도 등록", "한국 등록", "낳았는데", "낳은", "태어났는데", "태어났어", "출산했", "아들이 태어", "딸이 태어", "아이가 태어", "뭘 해야", "출생 신고", "born", "birth report", "register.*birth", "register my child", "register my baby", "just had a baby"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 캐나다에서 태어난 아이도 부모 중 한 명이 출생 당시 한국 국적이면 한국에 출생신고를 해야 합니다. 이 경우 아이는 출생과 동시에 한국 국적도 함께 갖는 선천적 복수국적자가 되며, 출생신고를 하면 가족관계등록부에 등재됩니다. 부모의 국적 조합(부모 모두 한국인 / 한쪽만 한국인 / 혼외자 등)에 따라 필요한 서류가 달라지니, 아래에서 상황을 선택해 주세요."
              : "Yes — a child born in Canada must be reported in Korea if one parent was a Korean national at the birth. In that case the child is a congenital dual national holding Korean nationality from birth, and the birth report registers them in the family register. Required documents depend on the parents' nationality combination (both Korean / one Korean / child born out of wedlock, etc.). Choose your situation below.",
            goId: "family_birth",
            goLabel: lang === "ko" ? "출생신고 시작하기" : "Start birth report",
          }),
        },
        {
          id: "fam_q_marriage",
          kw: ["혼인신고", "결혼했는데", "결혼 신고", "혼인 신고", "결혼했어", "한국에 알려", "한국에도 알려", "결혼 알려", "marriage report", "got married", "register.*marriage", "report.*marriage"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "네, 캐나다에서 한 결혼도 한국 가족관계등록부에 반영하려면 혼인신고를 해야 합니다. 배우자가 한국인인지 외국인인지에 따라 서류가 달라지니, 아래에서 상황을 선택해 주세요."
              : "Yes — a marriage held in Canada must be reported to reflect it in the Korean family register. Required documents depend on whether your spouse is Korean or a foreigner. Choose your situation below.",
            goId: "family_marriage",
            goLabel: lang === "ko" ? "혼인신고 시작하기" : "Start marriage report",
          }),
        },
        {
          id: "fam_q_death",
          kw: ["사망", "돌아가", "돌아가셨", "별세", "사망신고", "운명", "death", "passed away", "deceased", "died"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 한국 국적자인 가족이 사망한 경우 한국에 사망신고를 해야 합니다. 아래에서 사망신고 안내(필요 서류·기한 등)를 확인하실 수 있습니다. (외국인 가족의 사망기록을 등록부에 추가하는 경우는 '기록 정정'으로 진행합니다.)"
              : "Yes — if a family member who is a Korean national passes away, a death report must be filed in Korea. See the death-report guide below (documents, deadlines, etc.). To add a foreign family member's death record to the register, use 'record correction' instead.",
            goId: "family_death",
            goLabel: lang === "ko" ? "사망신고 안내 보기" : "View death-report guide",
          }),
        },
        {
          id: "fam_q_cert",
          kw: ["증명서", "발급", "떼", "발급받", "가족관계증명", "기본증명", "혼인관계증명", "certificate", "issue", "family relation cert", "basic cert"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "가족관계증명서·기본증명서 등은 국문/영문, 그리고 발급 방법(온라인·한국 가족 통해·대리인·영사관 방문/우편)에 따라 절차가 달라집니다. 아래에서 어떤 증명서가 필요한지부터 선택해 주세요."
              : "Family-relation, basic, and similar certificates differ by language (Korean/English) and issuance method (online, via family in Korea, proxy, Consulate visit/mail). Start by choosing which certificate you need below.",
            goId: "family_cert",
            goLabel: lang === "ko" ? "증명서 발급 시작하기" : "Start certificate issuance",
          }),
        },
      ],
    },
    // ===== 해외이주 신고 =====
    {
      svc: "emigration",
      must: ["해외이주", "해외 이주", "이주신고", "이주 신고", "emigration", "emigrate", "moving abroad permanently"],
      items: [
        {
          id: "emig_q_vsreg",
          kw: ["재외국민등록과", "재외국민 등록과", "등록과 다", "뭐가 다", "차이", "다른가요", "difference", "vs", "versus", "different from"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "두 가지는 다릅니다. 해외이주 신고는 주민등록을 재외국민으로 정리하는 것으로, 국민건강보험 정지와 국민연금 반환이 가능해지며 영주권자만 신고할 수 있습니다. 반면 재외국민 등록은 해외 거주 사실을 증명하기 위한 것으로(부동산·상속·금융 등), 별도 메뉴에서 진행합니다. 목적이 서로 다르니 상황에 맞는 쪽을 선택하세요."
              : "They are different. An emigration report reorganizes your resident registration as an overseas resident — it allows suspension of National Health Insurance and refund of National Pension, and only permanent residents can file it. Registration as an overseas Korean, on the other hand, is to prove your residence abroad (real estate, inheritance, banking) and is done from a separate menu. Choose the one that fits your purpose.",
            goId: "emigration_start",
            goLabel: lang === "ko" ? "해외이주 신고 안내 보기" : "View emigration guide",
          }),
        },
        {
          id: "emig_q_benefit",
          kw: ["뭐가 좋", "왜 해", "혜택", "이점", "장점", "하면 좋", "why", "benefit", "advantage", "what for"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "해외이주 신고를 하면 주민등록이 재외국민으로 정리되며, 국민건강보험이 정지되고 국민연금 반환일시금을 신청할 수 있게 됩니다. 한국에 더 이상 거주하지 않는 영주권자가 한국 내 신분 관계를 정리하는 절차입니다. 다만 신고가 완료되면 건강보험이 즉시 정지되니 이 점을 유의하세요."
              : "Filing an emigration report reorganizes your resident registration as an overseas resident, suspends National Health Insurance, and lets you claim a lump-sum National Pension refund. It is how a permanent resident who no longer lives in Korea settles their status in Korea. Note that once filed, health insurance is suspended immediately.",
            goId: "emigration_start",
            goLabel: lang === "ko" ? "해외이주 신고 안내 보기" : "View emigration guide",
          }),
        },
        {
          id: "emig_q_eligible",
          kw: ["누가", "자격", "할 수 있", "대상", "영주권", "who can", "eligible", "qualify"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "해외이주 신고는 영주권자만 할 수 있습니다(영주권 취득자가 대상). 만 18세 이상은 본인이 직접 영사관을 방문해야 하며, 만 18세 미만 미성년자는 부모가 대리 신청할 수 있습니다. 자세한 안내는 아래에서 확인하세요."
              : "Only permanent residents can file an emigration report. Those aged 18+ must appear at the Consulate in person; for minors under 18, a parent may apply on their behalf. See the details below.",
            goId: "emigration_who",
            goLabel: lang === "ko" ? "해외이주 신고 시작하기" : "Start emigration report",
          }),
        },
        {
          id: "emig_q_cert",
          kw: ["확인서", "신고확인서", "어디에 쓰", "어디에 사용", "용도", "certificate", "confirmation", "what is it used for"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "해외이주신고확인서는 국민연금 반환일시금 신청이나 금융기관 제출 등에 사용됩니다. 발급 안내는 아래에서 확인하실 수 있습니다."
              : "The emigration report confirmation is used for things like claiming a lump-sum National Pension refund or submitting to financial institutions. See issuance details below.",
            goId: "emigration_cert",
            goLabel: lang === "ko" ? "확인서 발급 보기" : "View confirmation issuance",
          }),
        },
        {
          id: "emig_q_how",
          kw: ["어떻게 하", "어떻게 신청", "어떻게", "신고하려", "신고하고 싶", "절차", "how to", "how do i", "process"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "해외이주 신고는 신청자의 연령(성인/미성년)과 서류 준비 방법에 따라 절차가 달라집니다. 아래에서 시작하시면 차례로 안내해 드립니다."
              : "The emigration report procedure depends on the applicant's age (adult/minor) and how documents are prepared. Start below and we'll guide you step by step.",
            goId: "emigration_who",
            goLabel: lang === "ko" ? "해외이주 신고 시작하기" : "Start emigration report",
          }),
        },
      ],
    },
    // ===== 재외국민 등록 =====
    {
      svc: "registration",
      must: ["재외국민", "재외국민등록", "거주 등록", "해외 거주 등록", "등록부", "overseas korean registration", "resident registration abroad", "register as overseas"],
      items: [
        {
          id: "reg_q_benefit",
          kw: ["뭐가 좋", "왜 해", "혜택", "이점", "장점", "필요한 이유", "하면 좋", "why register", "benefit", "advantage", "what for"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "재외국민 등록을 하면 해외 거주 사실을 공식적으로 증명할 수 있어, 부동산·상속·금융 등 한국 내 업무를 처리할 때 유용합니다. 또한 외국에 90일 이상 거주·체류하는 대한민국 국민에게는 재외국민 등록이 법적 의무이기도 합니다(재외국민등록법 제2조). 다만 한국 국적을 상실한 시민권자는 해당하지 않습니다."
              : "Registering as an overseas Korean lets you officially prove your residence abroad, which helps with matters in Korea such as real estate, inheritance, and banking. It is also a legal obligation for Korean nationals residing/staying abroad for 90+ days (Overseas Koreans Registration Act, Art. 2). It does not apply to those who have lost Korean nationality.",
            goId: "registration_start",
            goLabel: lang === "ko" ? "재외국민 등록 안내 보기" : "View registration guide",
          }),
        },
        {
          id: "reg_q_mandatory",
          kw: ["꼭 해야", "의무", "반드시", "안 하면", "필수", "해야 하나", "must i register", "mandatory", "required", "obligation"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 외국에 90일 이상 거주하거나 체류하는 대한민국 국민에게 재외국민 등록은 법적 의무입니다(재외국민등록법 제2조). 다만 한국 국적을 상실한 시민권자는 등록 대상이 아닙니다. 신청 방법은 아래에서 확인하실 수 있습니다."
              : "Yes — for Korean nationals residing or staying abroad for 90+ days, registration as an overseas Korean is a legal obligation (Overseas Koreans Registration Act, Art. 2). It does not apply to those who have lost Korean nationality. See how to apply below.",
            goId: "registration_start",
            goLabel: lang === "ko" ? "재외국민 등록 안내 보기" : "View registration guide",
          }),
        },
        {
          id: "reg_q_copy",
          kw: ["등본", "등록부 등본", "발급받", "증명 발급", "copy", "extract", "certificate of registration"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "재외국민등록부 등본은 온라인(재외동포365 민원포털), 영사관 방문, 우편 중에서 선택해 발급받으실 수 있습니다. 아래에서 방법을 선택해 주세요."
              : "A copy of the overseas-Korean registration record can be issued online (the Overseas Koreans 365 Portal), by Consulate visit, or by mail. Choose a method below.",
            goId: "registration_copy",
            goLabel: lang === "ko" ? "등본 발급 시작하기" : "Start copy issuance",
          }),
        },
        {
          id: "reg_q_change",
          kw: ["주소가 바뀌", "주소 변경", "이사", "변경 신고", "이동 신고", "바뀌었는데", "address change", "moved", "change report"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "주소 등 등록 정보가 바뀌었다면 재외국민 등록 변경·이동 신고를 하시면 됩니다. 아래에서 안내를 확인해 주세요."
              : "If your address or other registered information has changed, file an overseas-Korean registration change/move report. See the guide below.",
            goId: "registration_change",
            goLabel: lang === "ko" ? "변경·이동 신고 보기" : "View change report",
          }),
        },
        {
          id: "reg_q_how",
          kw: ["어떻게 하", "어떻게 신청", "신규 등록", "처음 등록", "등록하려", "등록하고 싶", "how to register", "how do i register", "new registration"],
          build: () => ({
            kind: "reask",
            text: lang === "ko"
              ? "재외국민 신규 등록은 온라인, 영사관 방문, 우편 중에서 선택해 신청하실 수 있습니다. 아래에서 신청 방법을 선택해 주세요."
              : "New overseas-Korean registration can be applied for online, by Consulate visit, or by mail. Choose a method below.",
            goId: "registration_new",
            goLabel: lang === "ko" ? "신규 등록 시작하기" : "Start new registration",
          }),
        },
      ],
    },
    // ===== 공통: 예약·관할·기타 =====
    {
      svc: "booking",
      must: ["예약", "방문", "관할", "관할지역", "관할 지역", "신청서", "미리 작성", "예약 없이", "예약없이", "appointment", "booking", "book a", "reserve", "walk-in", "walk in", "jurisdiction", "fill out", "in advance"],
      items: [
        {
          id: "common_q_jurisdiction",
          kw: ["관할", "관할지역", "관할 지역", "어느 지역", "담당 지역", "jurisdiction", "which region", "areas covered"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "주토론토 총영사관의 관할 지역은 온타리오주(오타와 제외)와 마니토바주입니다. 오타와 지역은 주캐나다 대사관 영사부 관할입니다."
              : "The Consulate General in Toronto covers Ontario (except Ottawa) and Manitoba. The Ottawa area falls under the Embassy of Korea's consular section.",
            goId: "home",
            goLabel: lang === "ko" ? "홈으로" : "Home",
          }),
        },
        {
          id: "common_q_nobooking",
          kw: ["예약 없이", "예약없이", "예약 안 하고", "예약 안하고", "예약 안 해도", "예약 안해도", "예약 없어도", "예약 안 하면", "without a booking", "without an appointment", "no appointment", "without booking"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "영사관 방문 신청은 예약이 필요하지만, 일부 업무는 영사관 방문 없이 처리할 수 있습니다. 공동인증서가 있으면 가족관계·기본증명서, 출입국사실증명서, 주민등록 등본·초본, 납세증명서 등을 온라인(정부24·홈택스 등)에서 직접 발급할 수 있고, 일부 신고·증명서는 우편으로도 접수됩니다. 필요하신 업무를 입력해 주시면 더 안내해 드리겠습니다."
              : "Visiting the Consulate requires a booking, but some tasks can be done without visiting. With a joint certificate you can issue family-relation/basic certificates, immigration records, resident-registration copies, tax certificates, etc. online (Government24, Hometax), and some reports/certificates are accepted by mail. Tell me the specific task and I can guide you further.",
            goId: "home",
            goLabel: lang === "ko" ? "홈으로" : "Home",
          }),
        },
        {
          id: "common_q_prefill",
          kw: ["신청서", "미리 작성", "미리 써", "양식 작성", "fill out", "fill in", "form in advance", "prepare the form"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "신청서는 미리 작성해 오셔도 됩니다(영사관 홈페이지에서 양식을 내려받거나 타이핑 후 출력 가능). 다만 공증·인증처럼 서명이 필요한 서류는 서명란을 비워 두고 오셔야 하며, 서명은 반드시 영사 앞에서 하셔야 합니다. 사전 서명이나 대리 서명은 인정되지 않습니다."
              : "You may fill out application forms in advance (download from the Consulate website or type and print). However, for documents that require a signature (e.g. notarization/authentication), leave the signature line blank — you must sign before the consul. Pre-signing or signing by someone else is not accepted.",
            goId: "home",
            goLabel: lang === "ko" ? "홈으로" : "Home",
          }),
        },
        {
          id: "common_q_booking",
          kw: ["예약", "방문", "appointment", "booking", "book", "reserve", "walk", "필요한가", "해야 하나", "do i need"],
          build: () => ({
            kind: "answer",
            text: lang === "ko"
              ? "네, 영사관 방문 전 온라인 예약이 필요합니다. torbooking.com에서 예약 후 방문하셔야 하며, 예약 없이 방문하면 접수가 불가합니다. 참고로 1인 1예약은 방문자 수가 아니라 처리할 업무 건수 기준입니다(예: 본인 + 자녀 2명 여권 신청 = 3건 예약)."
              : "Yes, you need an online appointment before visiting the Consulate. Book at torbooking.com — walk-ins without a booking cannot be accepted. Note that one booking covers one task, not one person (e.g. you + 2 children's passports = 3 bookings).",
            goId: "home",
            goLabel: lang === "ko" ? "홈으로" : "Home",
          }),
        },
      ],
    },
  ];

  const matchScenario = (q: string) => {
    for (const sc of CHAT_SCENARIOS) {
      if (!sc.must.some((m: string) => q.includes(m.toLowerCase()))) continue;
      for (const it of sc.items) {
        if (it.kw.some((k: string) => q.includes(k.toLowerCase()))) return it.build();
      }
    }
    return null;
  };

  // FAQ 매칭: 자주 묻는 질문(faq_general.items)에서 키워드가 겹치면 그 답을 즉답으로
  const FAQ_KW: any = {
    0: ["예약", "appointment", "booking", "book"],
    1: ["사진", "규격", "반려", "거부", "사진 때문", "사진이 안", "photo", "picture", "size", "rejected", "reject"],
    2: ["수수료", "현금", "카드", "결제", "지불", "fee", "cash", "card", "payment", "pay"],
    3: ["우편", "메일로", "by mail", "mail"],
    4: ["운영", "시간", "영업", "몇 시", "언제 여", "언제 열", "hours", "open", "time"],
    5: ["주차", "parking", "park"],
    6: ["처리 결과", "결과 확인", "처리 현황", "민원 현황", "진행 상황", "진행 현황", "어디까지 됐", "현황을 확인", "status", "track my"],
    7: ["대리", "대신 방문", "대신 신청", "proxy", "on my behalf", "someone else"],
    8: ["전화번호", "연락처", "전화 번호", "phone number", "contact number"],
    9: ["영사관 주소", "영사관 위치", "어디에 있", "어디 있", "찾아가", "address", "where is the consulate", "location of"],
  };
  const faqDynamic = (t: any): any => {
    if (typeof t !== "string") return t;
    const Y = new Date().getFullYear();
    return t.replace(/\{Y1\}/g, String(Y + 1)).replace(/\{B24\}/g, String(Y - 24)).replace(/\{Y\}/g, String(Y));
  };
  const matchFaq = (q: string) => {
    const items = (TREE as any).faq_general?.items ?? [];
    for (let i = 0; i < items.length; i++) {
      const kws = FAQ_KW[i] || [];
      if (kws.some((k: string) => q.includes(k.toLowerCase()))) {
        const it = items[i];
        return {
          kind: "answer",
          text: lang === "ko" ? it.a : (it.a_en ?? it.a),
        };
      }
    }
    return null;
  };

  // 인사·간단한 잡담 처리 (정확 일치 또는 아주 짧은 입력만 — 업무 질문을 가로채지 않도록)
  const matchSmalltalk = (q: string, rl: string) => {
    const clean = q.replace(/[!?.~,\s]/g, "");
    const greet = ["안녕", "안녕하세요", "안녕하십니까", "하이", "헬로", "hi", "hello", "hey", "goodmorning", "goodafternoon", "좋은아침", "여보세요"];
    const thanks = ["고마워", "고마워요", "고맙습니다", "감사", "감사해요", "감사합니다", "thanks", "thankyou", "thx", "thankyouverymuch"];
    const bye = ["잘있어", "잘있어요", "안녕히계세요", "안녕히가세요", "bye", "goodbye", "seeya", "수고", "수고하세요", "수고하셨습니다"];
    const help = ["도와줘", "도와주세요", "뭐할수있어", "뭐할수있나요", "뭘할수있어", "무엇을도와", "기능이뭐야", "기능이뭔가요", "whatcanyoudo", "help", "menu", "도움말"];
    // 정확히 일치하는 경우에만 잡담으로 처리 (문장에 섞이면 업무 질문으로 넘김)
    const isExact = (arr: string[]) => arr.some((g) => clean === g);
    if (isExact(greet)) {
      return {
        kind: "answer",
        text: rl === "ko"
          ? "안녕하세요! 영사 민원 도우미입니다. 여권, 비자, 공증, 국적, 가족관계 신고, 증명서 발급 등 어떤 업무가 궁금하신지 편하게 말씀해 주세요."
          : "Hello! I'm the consular services helper. Tell me what you need — passports, visas, notarization, nationality, family reports, certificate issuance, and more.",
      };
    }
    if (isExact(thanks)) {
      return {
        kind: "answer",
        text: rl === "ko"
          ? "도움이 되었다니 다행입니다. 더 궁금한 업무가 있으면 말씀해 주세요."
          : "Glad to help. Let me know if there's anything else you'd like to ask about.",
      };
    }
    if (isExact(bye)) {
      return {
        kind: "answer",
        text: rl === "ko"
          ? "감사합니다. 필요하실 때 언제든 다시 찾아 주세요."
          : "Thank you. Feel free to come back anytime you need help.",
      };
    }
    if (isExact(help)) {
      return {
        kind: "answer",
        text: rl === "ko"
          ? "다음과 같은 업무를 안내해 드릴 수 있습니다: 여권(발급·갱신·분실), 비자, 공증·인증, 병역, 국적(상실·이탈·회복·복수국적), 가족관계 신고(출생·혼인·사망·정정), 각종 증명서 발급, 재외국민 등록, 해외이주 신고, 예약·관할 안내. 찾으시는 업무를 입력해 주세요."
          : "I can help with: passports (issue/renew/lost), visas, notarization, military service, nationality (loss/exit/restoration/dual), family reports (birth/marriage/death/correction), certificate issuance, overseas-Korean registration, emigration report, and booking/jurisdiction info. Just type what you're looking for.",
      };
    }
    return null;
  };

  const handleChatSend = (raw?: string) => {
    const text = (raw ?? chatInput).trim();
    if (!text) return;
    const q = text.toLowerCase();
    setChatInput("");
    // 입력 언어 감지: 한글이 있으면 ko, 영문 알파벳만 있으면 en, 둘 다/없으면 현재 lang
    const hasKo = /[가-힣]/.test(text);
    const hasEn = /[a-zA-Z]/.test(text);
    const replyLang = hasKo ? "ko" : (hasEn ? "en" : lang);
    // 0) 인사·간단한 잡담 → 가볍게 받고 서비스 유도
    const smalltalk = matchSmalltalk(q, replyLang);
    if (smalltalk) {
      setChatMsgs((m: any) => [...m, { role: "user", text }, { role: "bot", ...smalltalk }]);
      return;
    }
    // 1) 시나리오 우선
    const sc = matchScenario(q);
    if (sc) {
      setChatMsgs((m: any) => [...m, { role: "user", text }, { role: "bot", ...sc }]);
      return;
    }
    // 1.5) FAQ 매칭 (일반 질문: 운영시간·주차·전화번호 등)
    const faq = matchFaq(q);
    if (faq) {
      setChatMsgs((m: any) => [...m, { role: "user", text }, { role: "bot", ...faq }]);
      return;
    }
    // 2) 검색 폴백 (감지된 언어 기준)
    const idx = replyLang === "ko" ? SEARCH_INDEX_KO : SEARCH_INDEX_EN;
    const words = q.split(/\s+/).filter(Boolean);
    const qNoSpace = q.replace(/\s+/g, "");
    const fbSvc = queryToService(q);
    const scored = idx
      .map((e: any) => {
        const t = e.text;
        const tNoSpace = t.replace(/\s+/g, "");
        let score = 0;
        for (const w of words) { if (t.includes(w)) score += w.length >= 2 ? 2 : 1; }
        if (qNoSpace.length >= 2 && tNoSpace.includes(qNoSpace)) score += 3;
        // 제목·경로·서비스 일치 가중치 (앱 검색과 동일한 관련도 반영)
        score += scoreSearchEntry(e, q, fbSvc);
        return { e, score };
      })
      .filter((x: any) => x.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3)
      .map((x: any) => x.e);
    const reply = scored.length > 0
      ? { role: "bot", kind: "results", results: scored }
      : { role: "bot", kind: "noresult", replyLang };
    setChatMsgs((m: any) => [...m, { role: "user", text }, reply]);
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
    setDeliveryChoice(null);
    window.scrollTo(0, 0);
  };

  const toggleLang = (): void => {
    setLang((l: any) => (l === "ko" ? "en" : "ko"));
    setHistory(["home"]);
    setPageId("home");
    setSearchQuery("");
    setDeliveryChoice(null);
    window.scrollTo(0, 0);
  };

  const breadcrumb = Array.isArray(page.breadcrumb) ? page.breadcrumb : [];
  const breadcrumbL = L("breadcrumb", breadcrumb);

  // ── 동적 breadcrumb: 실제 거쳐온 경로(history) 기반 ──
  // 각 노드의 '자기 자신 crumb'(그 노드 고유 breadcrumb의 마지막 요소)을 현재 언어로 반환
  const crumbLabelFor = (id: string): string | null => {
    if (id === "home") return lang === "ko" ? "홈" : "Home";
    const n = (TREE as any)[id];
    if (!n) return null;
    const tko = (KO_TRANSLATIONS as any)[id];
    const ten = (EN_TRANSLATIONS as any)[id];
    const bc = (lang === "ko" ? (tko && tko.breadcrumb) : (ten && ten.breadcrumb)) ?? n.breadcrumb;
    if (Array.isArray(bc) && bc.length) return bc[bc.length - 1];
    return null;
  };
  // history가 현재 페이지와 일치하면 동적 경로 사용, 아니면 정적 breadcrumb로 폴백(안전)
  const histValid = Array.isArray(history) && history.length > 0 && history[history.length - 1] === pageId;
  const CRUMB_SHORT: any = {
    // 국적
    "국적": "국적", "외국국적 취득": "외국국적", "선천적 복수국적": "선천적",
    "국적이탈신고": "이탈", "국적선택신고": "선택", "남성": "남", "여성": "여",
    "영주 목적 출생": "영주", "영주 목적 없이 출생": "비영주", "기간 내": "기간내",
    "병역 해소 후": "병역필", "예외적 허가": "예외", "인지에 의한 국적취득": "인지취득",
    "국적회복": "회복", "후천적 취득": "후천적", "부모와 함께 취득": "수반취득",
    "국적상실신고": "상실", "사망자": "사망", "국적 선택": "선택", "국적보유신고": "보유",
    // 공통/서비스
    "여권": "여권", "비자 (사증)": "비자", "병역": "병역",
    // 여권
    "일반": "일반", "비전자": "비전자", "성인": "성인", "미성년자": "미성년",
    "신규": "신규", "재발급": "재발급", "분실": "분실", "유학생": "유학생",
    "영주권자": "영주권", "장기체류자": "장기체류", "단기방문(eTA)": "eTA",
    "선천적 복수국적자": "선천적", "후천적 시민권자": "후천적", "한부모": "한부모",
    "공동친권": "공동친권", "단독친권": "단독친권", "부모 혼인 중": "혼인중",
    // 병역
    "국외여행허가": "국외여행", "단기 여행 허가": "단기여행", "병적증명서 발급": "병적증명",
    "복수국적자": "복수국적", "부모와 5년 이상 거주": "5년거주", "재외국민 2세 확인": "2세확인",
    "본인 방문": "본인", "대리인 신청": "대리", "가족 대리 신청": "가족대리", "온라인": "온라인",
    // 비자(긴 한글 위주)
    "재외동포(F-4)": "F-4", "단기방문(C-3-1)": "C-3-1", "동반(F-3)": "F-3",
    "이중국적 확인": "이중국적", "취업·유학·기타": "취업·유학", "여성/41세 이상": "여성41+",
    "18~59세 남성": "18~59남", "41세 미만 남성": "41미만남", "한국 혈통 없음": "혈통없음",
    "한국계 2세": "한국계2세", "긴급 인도적 사유": "긴급",
  };
  const shortCrumb = (label: any) => {
    if (!label || typeof label !== "string" || lang !== "ko") return label;
    return CRUMB_SHORT[label] ?? label.split(/\s+/)[0];
  };
  const trail: any[] = histValid
    ? history.map((hid: string, idx: number) => { const label = crumbLabelFor(hid); return { id: hid, idx, label, short: shortCrumb(label) }; }).filter((x: any) => x.label != null)
    : breadcrumbL.map((label: any, i: number) => ({ id: history[i] ?? "home", idx: i, label, short: shortCrumb(label) }));

  const progressPct = pageId === "home" ? 0 : Math.min(100, (trail.length / 5) * 100);
  const serviceColor = (page.service && (SERVICE_COLORS as any)[page.service]) ? (SERVICE_COLORS as any)[page.service] : "#003478";

  // 언어에 따라 서비스 카드 배열 선택
  const services = lang === "ko" ? KO_SERVICES : EN_SERVICES;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* HEADER */}
        <header className="header">
          <button onClick={goHome} className="header-logo" aria-label={lang === "ko" ? "홈으로" : "Home"} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span className="header-flag">🇰🇷</span>
            <div className="header-title">
              {lang === "ko" ? "주토론토 대한민국 총영사관" : "Consulate General of the Republic of Korea in Toronto"}
              <span>{lang === "ko" ? "민원 안내 서비스" : "Consular Services Guide"}</span>
            </div>
          </button>
          <div className="header-right">
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
              {trail.map((crumb: any, i: number) => {
                const isActive = i === trail.length - 1;
                const historyTarget = crumb.id ?? "home";
                return (
                  <div key={i} className="p-step">
                    {i > 0 && <div className={`p-line ${i <= trail.length - 1 ? "done" : ""}`} />}
                    <div className={`p-dot ${isActive ? "active" : "done"}`}>
                      {isActive ? i + 1 : "✓"}
                    </div>
                    <span
                      className={`p-label ${isActive ? "active" : "clickable"}`}
                      onClick={!isActive ? () => {
                        setHistory(history.slice(0, (crumb.idx ?? i) + 1));
                        setPageId(historyTarget);
                        window.scrollTo(0, 0);
                      } : undefined}
                      title={!isActive ? (lang === "ko" ? "이 단계로 돌아가기" : "Go back to this step") : undefined}
                    >
                      <span className="crumb-full">{crumb.label}</span>
                      <span className="crumb-short">{crumb.short ?? crumb.label}</span>
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
              <button className="nav-btn" onClick={goBack} aria-label={lang === "ko" ? "이전 화면으로" : "Go back"}>{lang === "ko" ? "← 이전" : "← Back"}</button>
              <button className="nav-btn home" onClick={goHome}>{lang === "ko" ? "🏠 홈으로" : "🏠 Home"}</button>
            </div>
          )}

          {/* HOME */}
          {page.type === "home" && (() => {
            // 검색 로직
            const q = searchQuery.trim().toLowerCase();
            const activeIndex = lang === "ko" ? SEARCH_INDEX_KO : SEARCH_INDEX_EN;
            const qSvc = q.length >= 1 ? queryToService(q) : null;
            const searchResults = q.length >= 1
              ? activeIndex
                  .filter(({ text }: any) => {
                    // 방법 1: 띄어쓰기로 분리 후 AND 검색 ("여권 분실" → 둘 다 포함)
                    const words = q.split(/\s+/).filter(Boolean);
                    const andMatch = words.every((w: any) => text.includes(w));
                    // 방법 2: 공백 제거 후 통째로 검색 ("여권분실" → 공백 제거한 텍스트에서 검색)
                    const qNoSpace = q.replace(/\s+/g, "");
                    const textNoSpace = text.replace(/\s+/g, "");
                    const noSpaceMatch = qNoSpace.length >= 2 && textNoSpace.includes(qNoSpace);
                    return andMatch || noSpaceMatch;
                  })
                  // 관련도 점수로 정렬 (제목·경로·서비스 일치 우대) 후 상위 12개
                  .map((e: any) => ({ e, s: scoreSearchEntry(e, q, qSvc) }))
                  .sort((a: any, b: any) => b.s - a.s)
                  .slice(0, 12)
                  .map((x: any) => x.e)
              : [];

            // 결과에서 스니펫 추출 (매칭 텍스트 앞뒤 30자) — 현재 언어 docs/notices 사용
            const getSnippet = (entry:any) => {
              const candidates = [
                ...(Array.isArray(entry.docs) ? entry.docs.filter((d:any) => !d.trim().startsWith("▸")) : []),
                ...(Array.isArray(entry.notices) ? entry.notices.slice(0, 2) : []),
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
                <div className="page-title">
                  <h1>{lang === "ko" ? "어떤 서비스가 필요하신가요?" : "What service do you need?"}</h1>
                  <div className="subtitle-row">
                    <p>{lang === "ko" ? "업무를 선택하여 필요한 문서를 확인하세요." : "Select a service to see the required documents."}</p>
                    <button
                      className="faq-link"
                      onClick={() => { setOpenFaq(null); setFaqCat(0); goTo("faq_start"); }}
                      aria-label={lang === "ko" ? "자주 묻는 질문" : "Frequently Asked Questions"}
                    >
                      {lang === "ko" ? "자주 묻는 질문" : "FAQ"}
                      <span className="faq-link-arrow" aria-hidden="true">›</span>
                    </button>
                  </div>
                </div>

                {/* 검색창 */}
                {SEARCH_ENABLED && (
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    className="search-input"
                    aria-label={lang === "ko" ? "민원 업무 검색" : "Search consular services"}
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
                )}

                {/* 검색 결과 */}
                {SEARCH_ENABLED && q.length >= 1 ? (
                  <div>
                    {searchResults.length > 0 ? (
                      <>
                        <div className="search-count">
                          {lang === "ko"
                            ? `"${searchQuery}" 검색 결과 ${searchResults.length}건`
                            : `${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for "${searchQuery}"`}
                        </div>
                        <div className="search-results">
                          {searchResults.map((entry: any) => {
                            const { id, title, breadcrumb } = entry;
                            const snippet = getSnippet(entry);
                            const path = (Array.isArray(breadcrumb) ? breadcrumb : []).join(" › ");
                            return (
                              <button
                                key={id}
                                className="search-result-card"
                                onClick={() => { setSearchQuery(""); goTo(id); }}
                              >
                                <div className="search-result-title">{title ?? ""}</div>
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
                        onClick={() => goTo(s.id)} aria-label={s.title}>
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
          {page.type === "faq_tabs" && (() => {
            const cats = page.cats ?? [];
            const active = cats[faqCat] ?? cats[0];
            const items = active ? ((TREE as any)[active.id]?.items ?? []) : [];
            return (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
                  <div style={{ fontSize: "28px" }}>❓</div>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e" }}>
                      {lang === "ko" ? page.title : page.title_en}
                    </div>
                    <div style={{ fontSize: "12.5px", color: "#889", marginTop: "2px" }}>
                      {lang === "ko" ? "분야를 선택하고 질문을 누르면 답변이 펼쳐집니다." : "Pick a topic, then tap a question to expand the answer."}
                    </div>
                  </div>
                </div>
                <div className="faq-tabs">
                  {cats.map((c: any, idx: number) => (
                    <button
                      key={c.id}
                      className={`faq-tab ${idx === faqCat ? "active" : ""}`}
                      onClick={() => { setFaqCat(idx); setOpenFaq(null); }}
                    >
                      {lang === "ko" ? c.ko : c.en}
                    </button>
                  ))}
                </div>
                {items.length === 0 && (
                  <div className="faq-empty">
                    {lang === "ko" ? "이 분야의 질문이 아직 준비 중입니다.\n곧 추가될 예정입니다." : "Questions for this topic are being prepared and will be added soon."}
                  </div>
                )}
                {items.map((item: any, i: number) => (
                  <div key={i} className="faq-item">
                    <button
                      className={`faq-question ${openFaq === i ? "open" : ""}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{lang === "ko" ? item.q : item.q_en}</span>
                      <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>▼</span>
                    </button>
                    <div className={`faq-answer-wrap ${openFaq === i ? "open" : ""}`}>
                      <div className="faq-answer-inner">
                        <div className="faq-answer">{faqDynamic(lang === "ko" ? item.a : item.a_en)}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "1rem", fontSize: "12px", color: "#99a", textAlign: "center" }}>
                  {lang === "ko"
                    ? "더 궁금한 사항은 영사관(416-920-3809)으로 문의하세요."
                    : "For further inquiries, contact the Consulate at 416-920-3809."}
                </div>
              </div>
            );
          })()}

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
              {(page.items ?? []).length === 0 && (
                <div className="faq-empty">
                  {lang === "ko" ? "이 분야의 질문이 아직 준비 중입니다.\n곧 추가될 예정입니다." : "Questions for this topic are being prepared and will be added soon."}
                </div>
              )}
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
                      {faqDynamic(lang === "ko" ? item.a : item.a_en)}
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
              <div className="q-title">{L("question", page.question ?? "")}</div>
              {page.sub === "__CERT_COMPARISON__" ? (
                <div className="q-sub">{lang === "en" ? "Pick the certificate you need — see the comparison table below the options." : "필요한 인증서를 선택하세요 — 차이는 아래 비교표를 참고하세요."}</div>
              ) : L("sub", page.sub) ? (
                <div className="q-sub">{L("sub", page.sub)}</div>
              ) : null}
              {(() => {
                const introArr = L("intro", Array.isArray(page.intro) ? page.intro : []);
                if (!introArr || introArr.length === 0) return null;
                return (
                  <div style={{ background: "#fffdf5", border: "1px solid #efe6cc", borderRadius: "10px", padding: "10px 12px", marginBottom: "1.1rem" }}>
                    {introArr.map((line: string, i: number) => {
                      const sub = line.trim().startsWith("▸");
                      return (
                        <div key={i} style={{ fontSize: sub ? "12px" : "13px", color: sub ? "#6b6450" : "#7a5b00", fontWeight: sub ? 400 : 600, lineHeight: 1.55, paddingLeft: sub ? "10px" : 0, marginTop: i === 0 ? 0 : "4px" }}>{line}</div>
                      );
                    })}
                  </div>
                );
              })()}
              <div className="option-list">
                {pageOptions.map((opt: any) => {
                  const ko = (lang === "ko" && T_KO && T_KO.options) ? T_KO.options[opt.id] : null;
                  const en = (lang === "en" && T_EN && T_EN.options) ? T_EN.options[opt.id] : null;
                  const oTitle = (ko && ko.title) ?? (en && en.title) ?? opt.title ?? "";
                  const oDesc  = (ko && ko.desc) ?? (en && en.desc) ?? opt.desc;
                  return (
                  <button key={opt.id} className="option-card" onClick={() => {
                    // 여권 첫 화면 수령 방법 선택 기억 (그 외 옵션은 영향 없음)
                    if (opt.id === "pp_normal_age") setDeliveryChoice("mail_visit");
                    else if (opt.id === "pp_normal_age_dhl") setDeliveryChoice("dhl");
                    goTo(opt.id);
                  }} aria-label={oTitle}>
                    <div className="oc-icon-box">{opt.icon ?? ""}</div>
                    <div className="oc-content">
                      <div className="oc-title">{oTitle}</div>
                      {oDesc && <div className="oc-desc">{oDesc}</div>}
                    </div>
                    <div className="oc-chev">›</div>
                  </button>
                  );
                })}
              </div>
              {(() => {
                const footerArr = L("footer", Array.isArray(page.footer) ? page.footer : []);
                if (!footerArr || footerArr.length === 0) return null;
                return (
                  <div style={{ background: "#fffdf5", border: "1px solid #efe6cc", borderRadius: "10px", padding: "10px 12px", marginTop: "1.1rem" }}>
                    {footerArr.map((line: string, i: number) => {
                      const sub = line.trim().startsWith("▸");
                      return (
                        <div key={i} style={{ fontSize: sub ? "12px" : "13px", color: sub ? "#6b6450" : "#7a5b00", fontWeight: sub ? 400 : 600, lineHeight: 1.55, paddingLeft: sub ? "10px" : 0, marginTop: i === 0 ? 0 : "4px" }}>{line}</div>
                      );
                    })}
                  </div>
                );
              })()}
              {pageId === "military_start" && (() => {
                const Y = new Date().getFullYear();
                const thisYearBirth = Y - 24;
                const rows = [thisYearBirth - 1, thisYearBirth, thisYearBirth + 1].map((b) => ({ birth: b, start: b + 24, deadline: (b + 25) + ".1.15" }));
                return (
                  <div style={{ background: "#f7f9fd", border: "1px solid #dde3ef", borderRadius: "12px", padding: "0.875rem 1rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#003478" }}>
                        {lang === "en" ? "✈️ When should I apply for an overseas travel (extension) permit?" : "✈️ 국외여행(기간연장)허가, 언제 신청하나요?"}
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#4a5a78", marginTop: "3px", lineHeight: 1.5 }}>
                        {lang === "en"
                          ? "Male conscripts aged 25+ who haven't completed service need the MMA's permit before traveling or staying abroad. Apply from the year you turn 24."
                          : "만 25세 이상 병역의무자(군복무 미필)는 국외여행(국외체재) 전 병무청장의 허가가 필요합니다. 만 24세가 되는 해부터 신청하세요."}
                      </div>
                    </div>
                    <div style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", border: "0.5px solid #e3e6ee" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
                        <thead>
                          <tr style={{ background: "#eef3fb" }}>
                            <th style={{ textAlign: "left", padding: "7px 12px", fontWeight: 600, color: "#185fa5", width: "82px" }}>{lang === "en" ? "Birth year" : "출생연도"}</th>
                            <th style={{ textAlign: "left", padding: "7px 12px", fontWeight: 600, color: "#185fa5" }}>{lang === "en" ? "Apply from" : "신청 시작"}</th>
                            <th style={{ textAlign: "left", padding: "7px 12px", fontWeight: 600, color: "#185fa5" }}>{lang === "en" ? "Deadline" : "신청 마감"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r) => {
                            const hl = r.birth === thisYearBirth;
                            return (
                              <tr key={r.birth} style={{ borderTop: "0.5px solid #eef1f8", background: hl ? "#eef3fb" : "transparent" }}>
                                <td style={{ padding: "7px 12px", color: "#333", fontWeight: hl ? 600 : 400 }}>{r.birth}{lang === "en" ? "" : "년생"}</td>
                                <td style={{ padding: "7px 12px", color: "#333" }}>{lang === "en" ? "from " + r.start : r.start + "년부터"}</td>
                                <td style={{ padding: "7px 12px", color: "#333" }}>{lang === "en" ? "by " + r.deadline : r.deadline + "까지"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ fontSize: "11.5px", color: "#8899bb" }}>
                      {lang === "en"
                        ? "Auto-shown for the current year (" + Y + ") · those born in " + thisYearBirth + " turn 24 this year."
                        : "올해(" + Y + "년) 기준 자동 표시 · " + thisYearBirth + "년생이 올해 만 24세입니다."}
                    </div>
                  </div>
                );
              })()}
              {(pageId === "visa_start" || pageId === "visa_start_en") && (
                <div style={{ marginTop: "1.25rem" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#003478", marginBottom: "8px" }}>
                    {lang === "en" ? "✋ Wait! Live far from the consulate?" : "✋ 여기서 잠깐! 멀리 거주하시나요?"}
                  </div>
                  <button
                    onClick={() => goTo("visa_mail_en")}
                    style={{ width: "100%", textAlign: "left", background: "#f7f9fd", border: "1px solid #dde3ef", borderRadius: "12px", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
                  >
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>📮</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#003478" }}>
                        {lang === "en" ? "Mail application guide" : "우편 신청 안내"}
                      </span>
                      <span style={{ display: "block", fontSize: "12px", color: "#4a5a78", marginTop: "2px" }}>
                        {lang === "en" ? "How to apply by mail & check your visa status" : "우편 신청 방법 및 비자 진행 조회 안내"}
                      </span>
                    </span>
                    <span style={{ fontSize: "18px", color: "#8899bb", flexShrink: 0 }}>›</span>
                  </button>
                </div>
              )}
              {pageId === "nationality_start" && (
                <div style={{ marginTop: "1.25rem" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#003478", marginBottom: "8px" }}>
                    {lang === "en" ? "✋ Wait! Confused by exit / loss / retention / choice?" : "✋ 여기서 잠깐! 이탈·상실·보유·선택이 헷갈리나요?"}
                  </div>
                  <button
                    onClick={() => goTo("nationality_terms")}
                    style={{ width: "100%", textAlign: "left", background: "#f7f9fd", border: "1px solid #dde3ef", borderRadius: "12px", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
                  >
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>❓</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#003478" }}>
                        {lang === "en" ? "Compare the four terms" : "네 가지 용어 비교 보기"}
                      </span>
                      <span style={{ display: "block", fontSize: "12px", color: "#4a5a78", marginTop: "2px" }}>
                        {lang === "en" ? "Exit vs. loss, retention vs. choice — in a table" : "이탈vs상실, 보유vs선택을 표로 정리"}
                      </span>
                    </span>
                    <span style={{ fontSize: "18px", color: "#8899bb", flexShrink: 0 }}>›</span>
                  </button>
                </div>
              )}
              {pageId === "cert_start" && (() => {
                const en = lang === "en";
                const cols = en ? ["Simple", "Joint", "Financial"] : ["간편", "공동", "금융"];
                const rows = en ? [
                  { label: "Consulate visit", vals: ["Not needed", "Once", "Once"], kind: ["good", "warn", "warn"] },
                  { label: "Internet banking", vals: ["✕", "✓", "✓"], kind: ["bad", "good", "good"] },
                  { label: "Where to use", vals: ["190 public services", "Admin+finance+commerce", "Finance+public"], kind: ["", "", ""] },
                  { label: "Renewal", vals: ["Varies by app", "Yearly, by you", "Every 3 yrs, auto"], kind: ["", "", ""] },
                  { label: "Storage", vals: ["In the app", "PC / USB", "Cloud"], kind: ["", "", ""] },
                ] : [
                  { label: "영사관 방문", vals: ["불필요", "1회", "1회"], kind: ["good", "warn", "warn"] },
                  { label: "인터넷뱅킹", vals: ["✕", "✓", "✓"], kind: ["bad", "good", "good"] },
                  { label: "사용처", vals: ["공공 190개", "행정+금융+상거래", "금융+공공"], kind: ["", "", ""] },
                  { label: "갱신", vals: ["앱별 상이", "1년 직접", "3년 자동"], kind: ["", "", ""] },
                  { label: "저장", vals: ["앱 내", "PC / USB", "클라우드"], kind: ["", "", ""] },
                ];
                const cellColor = (k: string) => k === "good" ? "#3b6d11" : k === "bad" ? "#a32d2d" : k === "warn" ? "#854f0b" : "#333";
                return (
                  <div style={{ marginTop: "1.25rem" }}>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#003478", marginBottom: "8px" }}>
                      {en ? "Three certificates at a glance" : "세 가지 인증서 한눈에 비교"}
                    </div>
                    <div style={{ border: "1px solid #dde3ef", borderRadius: "12px", overflow: "hidden" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px", tableLayout: "fixed", wordBreak: "keep-all", overflowWrap: "anywhere" }}>
                        <thead>
                          <tr style={{ background: "#eef3fb" }}>
                            <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: "#185fa5", width: "74px" }}>{en ? "" : "구분"}</th>
                            {cols.map((c) => (
                              <th key={c} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: "#185fa5" }}>{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, ri) => (
                            <tr key={ri} style={{ borderTop: "0.5px solid #eef1f8", background: ri % 2 ? "#fafbfd" : "#fff" }}>
                              <td style={{ padding: "8px 10px", color: "#667", fontWeight: 500, verticalAlign: "top" }}>{r.label}</td>
                              {r.vals.map((v, ci) => (
                                <td key={ci} style={{ padding: "8px 10px", color: cellColor(r.kind[ci]), fontWeight: r.kind[ci] ? 600 : 400, verticalAlign: "top", lineHeight: 1.4 }}>{v}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ fontSize: "12px", color: "#4a5a78", marginTop: "8px", lineHeight: 1.6 }}>
                      <div>📵 {en ? "None of the three require a Korean phone number" : "세 가지 모두 한국 전화번호 불필요"}</div>
                      <div style={{ color: "#a32d2d", marginTop: "2px" }}>⚠️ {en ? "Not available to Canadian citizens (those who lost Korean nationality) · resident registration number required" : "캐나다 시민권자(한국 국적 상실자) 발급 불가 · 주민등록번호 필수"}</div>
                    </div>
                  </div>
                );
              })()}
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
                <div className="result-title" style={{ fontSize: "21px", marginBottom: 0 }}>{L("title", page.title ?? "")}</div>
              </div>

              <div className="result-sub">
                {(page.compareTable || (mainDocs.length + extraDocs.length === 0))
                  ? L("sub", page.sub ?? "")
                  : (lang === "ko" ? "방문 전 아래 서류를 준비해 주세요." : "Prepare the following documents before your visit.")}
              </div>

              {page.compareTable && Array.isArray(page.compareTable) && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "4px 0 8px" }}>
                  {(L("compareTable", page.compareTable) as any[]).map((blk: any, bi: number) => (
                    <div key={bi} style={{ border: "1px solid #e3e6ee", borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ background: "#f6f8fc", padding: "10px 14px", borderBottom: "1px solid #e3e6ee" }}>
                        <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a2b4a" }}>{blk.pair}</div>
                        {blk.note && <div style={{ fontSize: "12px", color: "#667", marginTop: "2px" }}>{blk.note}</div>}
                      </div>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
                        <thead>
                          <tr style={{ background: "#fafbfd" }}>
                            <th style={{ width: "74px", textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "#889" }}></th>
                            <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 700, color: "#185fa5" }}>{blk.left}</th>
                            <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 700, color: "#993c1d" }}>{blk.right}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(blk.rows || []).map((row: any, ri: number) => (
                            <tr key={ri} style={{ borderTop: "1px solid #eef1f6" }}>
                              <td style={{ padding: "8px 12px", color: "#889", verticalAlign: "top" }}>{row.label}</td>
                              <td style={{ padding: "8px 12px", color: "#333", verticalAlign: "top" }}>{row.left}</td>
                              <td style={{ padding: "8px 12px", color: "#333", verticalAlign: "top" }}>{row.right}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {(mainDocs.length > 0 || extraDocs.length > 0) && (
              <div className="info-card">
                <div className="info-card-header">
                  <span className="info-card-icon">📂</span>
                  <span className="info-card-title">{lang === "ko" ? "필요 서류" : "Required Documents"}</span>
                  {mainDocs.length > 0 && (() => { const realCount = mainDocs.filter((d: any) => typeof d === "string" && !d.trim().startsWith("└")).length; return <span className="info-card-count">{realCount}{lang === "ko" ? "개" : ""}</span>; })()}
                </div>
                <div className="info-card-body">
                  {(() => { let docNum = 0; return mainDocs.map((doc: any, i: number) => {
                    const isSub = typeof doc === "string" && doc.trim().startsWith("└");
                    const formUrl = getFormUrl(doc);
                    const sampleUrl = getSampleUrl(doc);
                    if (isSub) {
                      const subText = doc.replace(/^\s*└\s*/, "");
                      const nextIsSub = typeof mainDocs[i + 1] === "string" && mainDocs[i + 1].trim().startsWith("└");
                      const subIsLast = i === mainDocs.length - 1;
                      const subForm = getFormUrl(subText);
                      return (
                        <div key={i} className="doc-item" style={{ paddingLeft: "30px", borderBottom: (nextIsSub || subIsLast) ? "none" : "1px solid #f2f4f9", paddingTop: "2px", paddingBottom: "2px" }}>
                          <span style={{ color: "#aab", flexShrink: 0 }}>└</span>
                          <span style={{ fontSize: "12.5px", color: "#445", flex: 1 }}>{subText}</span>
                          {subForm && (
                            <a className="form-dl" href={subForm} download target="_blank" rel="noopener noreferrer" aria-label={lang === "ko" ? "양식 다운로드" : "Download form"}>
                              📥<span className="form-label">{lang === "ko" ? "양식" : "Form"}</span>
                            </a>
                          )}
                        </div>
                      );
                    }
                    docNum += 1;
                    const mainNextIsSub = typeof mainDocs[i + 1] === "string" && mainDocs[i + 1].trim().startsWith("└");
                    const isLastMain = i === mainDocs.length - 1;
                    return (
                    <div key={i} className={formUrl ? "doc-item has-form" : "doc-item"} style={mainNextIsSub ? { borderBottom: "none" } : undefined}>
                      <div className="doc-num">{docNum}</div>
                      <span style={{ fontWeight: 500, flex: 1 }}>{doc}</span>
                      {formUrl && (
                        <a className="form-dl" href={formUrl} download target="_blank" rel="noopener noreferrer" aria-label={lang === "ko" ? "양식 다운로드" : "Download form"}>
                          📥<span className="form-label">{lang === "ko" ? "양식" : "Form"}</span>
                        </a>
                      )}
                      {sampleUrl && (
                        <a className="sample-dl" href={sampleUrl} download target="_blank" rel="noopener noreferrer" aria-label={lang === "ko" ? "작성 샘플" : "Sample"}>
                          📄<span className="form-label">{lang === "ko" ? "작성 샘플" : "Sample"}</span>
                        </a>
                      )}
                    </div>
                    );
                  }); })()}
                  {extraDocs.length > 0 && (
                    <>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#889", textTransform: "uppercase", letterSpacing: "0.05em", margin: "10px 0 4px" }}>
                        {lang === "ko" ? "해당자 추가 서류" : "Additional (if applicable)"}
                      </div>
                      {extraDocs.map((doc: any, i: number) => {
                        const cleanDoc = doc.replace(/^\s*▸\s*/, "");
                        const formUrl = getFormUrl(cleanDoc);
                        return (
                        <div key={i} className={formUrl ? "doc-item has-form" : "doc-item"} style={{ opacity: 0.75 }}>
                          <span className="doc-bullet" style={{ color: "#aab" }}>▸</span>
                          <span style={{ fontSize: "12px", flex: 1 }}>{cleanDoc}</span>
                          {formUrl && (
                            <a className="form-dl" href={formUrl} download target="_blank" rel="noopener noreferrer" aria-label={lang === "ko" ? "양식 다운로드" : "Download form"}>
                              📥<span className="form-label">{lang === "ko" ? "양식" : "Form"}</span>
                            </a>
                          )}
                        </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              )}

              {page.pickup && (
                <div className="pickup-card">
                  <div className="pickup-head">📦 {lang === "ko" ? "배송 방법에 따른 추가 서류" : "Additional documents by pickup method"}</div>
                  <div className="pickup-body">
                    {deliveryChoice !== "dhl" && (
                    <div className="pickup-opt">
                      <div className="pickup-opt-top">
                        <span className="pickup-opt-name">🏛️ {lang === "ko" ? "영사관 방문 수령" : "In-person pickup"}</span>
                        <span className="pickup-badge">{lang === "ko" ? "약 3~4주" : "~3–4 wks"}</span>
                      </div>
                      <div className="pickup-opt-desc">{lang === "ko" ? "추가 서류 없음 · 접수증 지참 후 픽업 · 무료" : "No extra docs · bring receipt · free"}</div>
                    </div>
                    )}
                    {deliveryChoice !== "dhl" && (
                    <div className="pickup-opt">
                      <div className="pickup-opt-top">
                        <span className="pickup-opt-name">✉️ {lang === "ko" ? "우편 수령 (Xpresspost)" : "Mail (Xpresspost)"}</span>
                        <span className="pickup-badge">{lang === "ko" ? "3~4주 + 배송" : "3–4 wks + post"}</span>
                      </div>
                      <div className="pickup-opt-desc">{lang === "ko" ? "추가: Prepaid Xpresspost 등기봉투(small, 1인당 1매·Canada Post 구매, 방문 전 준비) + 우편수령 신청서" : "Add: Prepaid Xpresspost envelope (small, 1 per person, from Canada Post) + mail-receipt form"}</div>
                      <div className="pickup-warn" style={{ color: "#556" }}>💡 {lang === "ko" ? "온타리오주 외 수령 시 \"National\" 봉투를 준비하세요." : "For pickup outside Ontario, use a \"National\" envelope."}</div>
                      <div style={{ marginTop: "6px" }}>
                        <a className="form-dl" href="/forms/mail_receipt_form.pdf" download target="_blank" rel="noopener noreferrer" aria-label={lang === "ko" ? "우편수령 신청서 양식 다운로드" : "Download mail-receipt form"}>
                          📥<span className="form-label">{lang === "ko" ? "우편수령 신청서" : "Mail-receipt form"}</span>
                        </a>
                      </div>
                    </div>
                    )}
                    {deliveryChoice !== "mail_visit" && (
                    <div className="pickup-opt">
                      <div className="pickup-opt-top">
                        <span className="pickup-opt-name">✈️ {lang === "ko" ? "DHL 특급" : "DHL express"} <span style={{ fontSize: "11px", color: "#185fa5", fontWeight: 700 }}>{lang === "ko" ? "가장 빠름" : "fastest"}</span></span>
                        <span className="pickup-badge fast">{lang === "ko" ? "약 1~2주" : "~1–2 wks"}</span>
                      </div>
                      <div className="pickup-opt-desc">{lang === "ko" ? "추가: DHL 결제 영수증 출력본 · 배송비 별도 · 가족 1회 결제" : "Add: DHL payment receipt · shipping extra · one payment per family"}</div>
                      <div className="pickup-warn">⚠️ {lang === "ko" ? "자택 배송 아님 — 영사관 또는 우편으로 최종 수령" : "Not home delivery — final pickup at consulate or by mail"}</div>
                      <div style={{ marginTop: "6px" }}>
                        <a className="form-dl" href="https://kr-epassport.dhl.com/passport" target="_blank" rel="noopener noreferrer" aria-label={lang === "ko" ? "DHL 결제 페이지로 이동" : "Go to DHL payment page"}>
                          💳<span className="form-label">{lang === "ko" ? "DHL 결제하기" : "Pay DHL"}</span>
                        </a>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              )}

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
                    <div style={{ fontSize: "13px", color: "#003478", fontWeight: 600, lineHeight: "1.5" }}>{L("time", page.time ?? "")}</div>
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

              {pageId.startsWith("pp_n_adult_") && ppState === "renew" && (
                <div style={{ border: "1px solid #cdddef", background: "#f4f8fd", borderRadius: "12px", padding: "14px 16px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "14px", fontWeight: 700, color: "#003478", marginBottom: "6px" }}>
                    💻 {lang === "ko" ? "온라인 신청도 가능합니다" : "Online application available"}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#445", lineHeight: 1.6 }}>
                    {lang === "ko"
                      ? "기존 전자여권을 발급받은 성인은 재외동포365 민원포털에서 온라인으로 재발급 신청할 수 있습니다 (공동인증서 필요). 신청 후 수령을 위한 방문 예약이 필요합니다 (일반 약 4주 · DHL 약 10일 뒤)."
                      : "Adults who previously held an e-passport can apply for renewal online via G4K (joint certificate required). A pickup appointment is needed after applying (about 4 weeks for standard · 10 days for DHL)."}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#889", marginTop: "5px" }}>
                    {lang === "ko" ? "※ 미성년·생애최초·긴급·상습분실·로마자성명 변경은 온라인 불가 (방문 신청)" : "※ Not available online for minors, first-time, urgent, frequent-loss, or romanized-name changes (visit in person)"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#445", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #e3ecf6", lineHeight: 1.6 }}>
                    <strong style={{ color: "#003478" }}>{lang === "ko" ? "수령 방문 시 준비서류" : "Documents for pickup visit"}</strong><br />
                    {lang === "ko"
                      ? "① 구 여권 원본  ② 캐나다 체류 자격증명 (영주권자: 영주권 카드 / 장기체류자: 비자 원본)"
                      : "① Old passport original  ② Proof of Canadian residency status (PR: PR Card / Long-term: residence visa original)"}
                  </div>
                  <a href="https://www.g4k.go.kr/biz/main/main.do" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "9px", fontSize: "13px", fontWeight: 600, color: "#fff", background: "#003478", padding: "8px 14px", borderRadius: "8px", textDecoration: "none" }}>
                    {lang === "ko" ? "재외동포365 민원포털 바로가기 →" : "Go to G4K →"}
                  </a>
                </div>
              )}

              {page.onlineLink && (
                <div className="highlight-box">
                  <span>💡</span>
                  <div>
                    <strong>{L("onlineLabel", page.onlineLabel) ?? (lang === "ko" ? "온라인 신청 / 바로가기" : "Online Application / Link")}</strong><br />
                    <a href={page.onlineLink} target="_blank" rel="noreferrer" style={{ color: "#7a5000" }}>
                      {lang === "ko" ? "바로가기 →" : "Go →"}
                    </a>
                  </div>
                </div>
              )}

              <div className="booking-sticky">
              {page.booking && (
                <>
                  <button className="booking-btn" onClick={() => setShowBookingModal(true)}>
                    📅 {L("bookingLabel", page.bookingLabel) ?? (lang === "ko" ? "사전 예약하기 (torbooking.com) →" : "Book Appointment (torbooking.com) →")}
                  </button>
                  <a href="https://overseas.mofa.go.kr/ca-toronto-ko/index.do" target="_blank" rel="noreferrer" className="booking-secondary">
                    {lang === "ko" ? "총영사관 홈페이지 →" : "Official Consulate Website →"}
                  </a>
                </>
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

              {/* 양식 다운로드 + 인쇄 버튼 */}
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <a
                  href="https://overseas.mofa.go.kr/ca-toronto-ko/brd/m_5396/list.do"
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "#fff", border: "1px solid #dde3ef", borderRadius: "10px", padding: "10px", fontSize: "13px", color: "#445", textDecoration: "none", fontWeight: 500 }}
                >
                  📥 {lang === "ko" ? "전체 양식 보기" : "View All Forms"}
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

        {/* CHAT HELPER */}
        {CHAT_ENABLED && !chatOpen && (
          <button className="chat-fab" onClick={() => setChatOpen(true)} aria-label={lang === "ko" ? "도우미 열기" : "Open helper"}>💬</button>
        )}
        {CHAT_ENABLED && chatOpen && (
          <div className="chat-panel">
            <div className="chat-head">
              <div>
                <div className="chat-head-title">{lang === "ko" ? "민원 도우미" : "Consular Helper"}</div>
                <div className="chat-head-sub">{lang === "ko" ? "찾으시는 업무를 물어보세요" : "Ask what you're looking for"}</div>
              </div>
              <button className="chat-close" onClick={() => setChatOpen(false)} aria-label={lang === "ko" ? "닫기" : "Close"}>✕</button>
            </div>
            <div className="chat-body">
              {chatMsgs.length === 0 && (
                <div className="chat-row">
                  <div className="chat-avatar">💬</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="chat-bubble-bot">
                      {lang === "ko"
                        ? "안녕하세요! 필요하신 업무를 입력해 주세요. 예를 들어 이렇게요:"
                        : "Hello! Tell me what you need. For example:"}
                    </div>
                    <div className="chat-suggest">
                      {(lang === "ko"
                        ? ["여권 잃어버렸어요", "워킹홀리데이 비자", "위임장 공증", "아이 한국 국적"]
                        : ["Lost my passport", "Working holiday visa", "Power of attorney", "Child's Korean nationality"]
                      ).map((s) => (
                        <button key={s} className="chat-chip" onClick={() => handleChatSend(s)}>{s}</button>
                      ))}
                    </div>
                    <div className="chat-disclaim">
                      {lang === "ko" ? "ⓘ 앱에 담긴 안내만 보여드립니다. 정확한 내용은 영사관 공식 확인이 필요합니다." : "ⓘ Shows only what's in this app. Please confirm details with the Consulate."}
                    </div>
                  </div>
                </div>
              )}
              {chatMsgs.map((m: any, i: number) => (
                m.role === "user" ? (
                  <div key={i} className="chat-row user">
                    <div className="chat-bubble-user">{m.text}</div>
                  </div>
                ) : (
                  <div key={i} className="chat-row">
                    <div className="chat-avatar">💬</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {m.kind === "results" ? (
                        <>
                          <div className="chat-bubble-bot">
                            {lang === "ko" ? "이 안내가 관련 있어 보여요:" : "These look relevant:"}
                          </div>
                          {m.results.map((r: any) => (
                            <button key={r.id} className="chat-result-card" onClick={() => chatGoTo(r.id)}>
                              <div className="chat-result-path">{(Array.isArray(r.breadcrumb) ? r.breadcrumb : []).join(" › ")}</div>
                              <div className="chat-result-title">{r.title}</div>
                              <div className="chat-result-go">{lang === "ko" ? "자세히 보기 ›" : "View details ›"}</div>
                            </button>
                          ))}
                        </>
                      ) : m.kind === "answer" ? (
                        <>
                          <div className="chat-bubble-bot" style={{ whiteSpace: "pre-line" }}>{m.text}</div>
                          {m.goId && (
                            <button className="chat-option-btn" style={{ color: "#185fa5", fontWeight: 600 }} onClick={() => chatGoTo(m.goId)}>
                              {m.goLabel} ›
                            </button>
                          )}
                        </>
                      ) : m.kind === "reask" ? (
                        <>
                          <div className="chat-bubble-bot" style={{ whiteSpace: "pre-line" }}>{m.text}</div>
                          {m.goId && (
                            <button className="chat-result-card" onClick={() => chatGoTo(m.goId)} style={{ marginTop: "7px" }}>
                              <div className="chat-result-title" style={{ color: "#003478" }}>{m.goLabel}</div>
                              <div className="chat-result-go">{lang === "ko" ? "여기서 시작 ›" : "Start here ›"}</div>
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="chat-bubble-bot">
                          {(m.replyLang ?? lang) === "ko"
                            ? "말씀하신 내용과 꼭 맞는 안내를 찾지 못했습니다. 다른 표현으로 다시 입력해 주시거나, 찾으시는 업무(예: 여권, 비자, 공증, 증명서)를 알려 주세요."
                            : "I couldn't find an exact match. Please try rephrasing, or tell me the service you need (e.g. passport, visa, notarization, certificate)."}
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
            <div className="chat-foot">
              <input
                className="chat-text-input"
                type="text"
                placeholder={lang === "ko" ? "예: 여권 재발급, 비자, 공증…" : "e.g. passport, visa, notarization…"}
                value={chatInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter") handleChatSend(); }}
              />
              <button className="chat-send" onClick={() => handleChatSend()} aria-label={lang === "ko" ? "보내기" : "Send"}>➤</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
