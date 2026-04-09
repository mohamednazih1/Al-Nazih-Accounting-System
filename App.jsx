import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// نظام النزيه للمحاسبة - المطور محمد نزيه 01029190615
export default function AlNazihApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // دالة تسجيل الدخول للشركات والموظفين
  const handleLogin = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("خطأ في الدخول: " + error.message);
    else setUser(data.user);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans" dir="rtl">
      {!user ? (
        /* شاشة الدخول */
        <div className="flex flex-col items-center justify-center pt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">النزيه للمحاسبة</h1>
            <input id="email" type="email" placeholder="بريد الموظف" className="w-full mb-3 p-2 border rounded" />
            <input id="pass" type="password" placeholder="كلمة المرور" className="w-full mb-4 p-2 border rounded" />
            <button 
              onClick={() => handleLogin(document.getElementById('email').value, document.getElementById('pass').value)}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              {loading ? "جاري الدخول..." : "دخول النظام"}
            </button>
          </div>
        </div>
      ) : (
        /* لوحة التحكم بعد الدخول */
        <div className="p-4">
          <nav className="bg-white p-4 shadow rounded-lg flex justify-between">
            <span className="font-bold">أهلاً بك في نظام النزيه</span>
            <button onClick={() => supabase.auth.signOut()} className="text-red-500">خروج</button>
          </nav>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-500 text-white p-6 rounded-lg shadow">
              <p>إجمالي الخزينة</p>
              <h2 className="text-2xl font-bold">0.00 ج.م</h2>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
              <p>عدد العمليات اليوم</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
          </div>
        </div>
      )}

      {/* حقوق الملكية الدائمة - محمد نزيه */}
      <footer className="fixed bottom-0 w-full bg-white border-t p-2 text-center text-xs text-gray-500">
        تطوير وبرمجة: <span className="font-bold text-blue-600">Mohamed Nazih</span> | ت: 01029190615
      </footer>
    </div>
  );
}

