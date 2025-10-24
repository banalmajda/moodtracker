// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Menggulirkan halaman ke bagian paling atas
    // 'behavior: "instant"' memastikan perpindahan terjadi tanpa animasi scroll yang terlihat
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  // Efek ini akan dijalankan setiap kali 'pathname' (route) berubah

  return null; // Komponen ini tidak merender elemen visual
}
