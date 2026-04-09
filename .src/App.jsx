import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// نظام النزيه للمحاسبة v1.0 | تطوير: Mohamed Nazih
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // التحقق من الجلسة الحالية
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    checkUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("خطأ في الدخول: " + error.message);
    else setUser(data.user);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans" dir="rtl">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-blue-600">
          <h1 className="text-3xl font-black text-center text-blue-900 mb-2">نظام النزيه</h1>
          <p className="text-center text-gray-500 mb-8">إدارة حسابات الشركات والمحلات</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="البريد الإلكتروني" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" placeholder="كلمة المرور" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition" disabled={loading}>
              {loading ? "جاري التحقق..." : "دخول النظام"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-gray-400 font-bold">MOHAMED NAZIH - 01029190615</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <nav className="bg-blue-900 text-white p-4 shadow-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">النزيه للمحاسبة</h2>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded text-sm font-bold">خروج</button>
      </nav>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-md border-r-8 border-green-500">
          <p className="text-gray-500 text-sm">رصيد الخزينة</p>
          <h3 className="text-4xl font-black text-gray-800">0.00 <span className="text-lg">ج.م</span></h3>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-r-8 border-blue-500">
          <p className="text-gray-500 text-sm">مبيعات اليوم</p>
          <h3 className="text-4xl font-black text-gray-800">0</h3>
        </div>
      </div>
      <div className="p-6">
          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-black shadow-2xl">+ إضافة فاتورة بيع</button>
      </div>
      <footer className="fixed bottom-0 w-full bg-white p-3 text-center border-t border-gray-200">
          <p className="text-sm font-bold text-blue-900">برمجة وتطوير: Mohamed Nazih | 01029190615</p>
      </footer>
    </div>
  );
}
