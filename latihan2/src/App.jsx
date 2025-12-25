import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, LogIn, UserPlus, ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
import { image, img } from 'framer-motion/client';

const FoodOrderingApp = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Sample menu data
  const menuItems = [
    { id: 1, name: 'Nasi Goreng Special', category: 'makanan', price: 25000, image: <img src="src/assets/nasi_goreng.jpg" alt="..." />, description: 'Nasi goreng dengan telur, ayam, dan sayuran segar' },
    { id: 2, name: 'Mie Goreng', category: 'makanan', price: 20000, image: '🍜', description: 'Mie goreng pedas dengan topping lengkap' },
    { id: 3, name: 'Ayam Bakar', category: 'makanan', price: 30000, image: '🍗', description: 'Ayam bakar bumbu kecap dengan sambal' },
    { id: 4, name: 'Sate Ayam', category: 'makanan', price: 28000, image: '🍢', description: 'Sate ayam 10 tusuk dengan bumbu kacang' },
    { id: 5, name: 'Es Teh Manis', category: 'minuman', price: 5000, image: '🥤', description: 'Teh manis dingin segar' },
    { id: 6, name: 'Jus Jeruk', category: 'minuman', price: 12000, image: '🍊', description: 'Jus jeruk segar tanpa gula' },
    { id: 7, name: 'Es Kelapa', category: 'minuman', price: 10000, image: '🥥', description: 'Air kelapa muda segar' },
    { id: 8, name: 'Kopi Susu', category: 'minuman', price: 15000, image: '☕', description: 'Kopi susu hangat premium' },
    { id: 9, name: 'Pisang Goreng', category: 'snack', price: 8000, image: '🍌', description: 'Pisang goreng kriuk dengan topping' },
    { id: 10, name: 'Tahu Isi', category: 'snack', price: 10000, image: '🥟', description: 'Tahu isi sayur dan daging' },
    { id: 11, name: 'Bakwan Jagung', category: 'snack', price: 7000, image: '🌽', description: 'Bakwan jagung manis renyah' },
    { id: 12, name: 'Risoles', category: 'snack', price: 9000, image: '🥐', description: 'Risoles isi ragout ayam' },
  ];

  const banners = [
    { id: 1, title: 'Promo Hari Ini!', subtitle: 'Diskon 20% untuk semua menu makanan', color: 'from-orange-400 to-red-500' },
    { id: 2, title: 'Menu Baru!', subtitle: 'Coba menu spesial kami', color: 'from-orange-500 to-amber-600' },
    { id: 3, title: 'Gratis Ongkir!', subtitle: 'Minimal pembelian 50rb', color: 'from-amber-400 to-orange-500' },
  ];

  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('login'), 2500);
    }
  }, [currentScreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setCurrentScreen('home');
    }
  };

  const handleRegister = () => {
    if (email && password && name) {
      setUser({ email, name });
      setCurrentScreen('home');
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-8xl mb-4">🍽️</div>
          <h1 className="text-5xl font-bold text-white mb-2">FoodOrder</h1>
          <p className="text-white text-lg">Pesan makanan favoritmu</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang</h2>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition"
                placeholder="nama@email.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Masuk
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <button
                onClick={() => setCurrentScreen('register')}
                className="text-orange-500 font-semibold hover:text-orange-600 transition"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Register Screen
  if (currentScreen === 'register') {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Buat Akun Baru</h2>
            <p className="text-gray-600">Daftar untuk mulai memesan</p>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition"
                placeholder="Nama Anda"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition"
                placeholder="nama@email.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleRegister}
              className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Daftar
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <button
                onClick={() => setCurrentScreen('login')}
                className="text-orange-500 font-semibold hover:text-orange-600 transition"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Home Screen
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-4xl">🍽️</span>
              <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FoodOrder
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari menu..."
                  className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-linear-to-r from-orange-500 to-red-500 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-110 transition"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Carousel */}
        <div className="relative mb-8 overflow-hidden rounded-3xl shadow-2xl">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
            {banners.map((banner) => (
              <div key={banner.id} className="w-full shrink-0">
                <div className={`bg-linear-to-r ${banner.color} p-12 text-white`}>
                  <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-xl">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentBanner === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Semua Menu', icon: '🍽️' },
            { id: 'makanan', label: 'Makanan', icon: '🍛' },
            { id: 'minuman', label: 'Minuman', icon: '🥤' },
            { id: 'snack', label: 'Snack', icon: '🍟' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 whitespace-nowrap flex items-center gap-2 ${
                selectedFilter === filter.id
                  ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition"
            >
              <div className="bg-linear-to-br from-orange-100 to-amber-100 p-8 flex items-center justify-center">
                <span className="text-7xl">{item.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">
                    Rp {item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-110 transition"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-linear-to-r from-orange-500 to-red-500 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
              <button
                onClick={() => setShowCart(false)}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Keranjang masih kosong</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-2xl p-4 mb-4 shadow">
                      <div className="flex gap-4">
                        <div className="bg-white rounded-xl p-3 flex items-center justify-center">
                          <span className="text-4xl">{item.image}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-orange-500 font-semibold mb-2">
                            Rp {item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-orange-500 text-white w-8 h-8 rounded-full font-bold hover:bg-orange-600 transition"
                            >
                              -
                            </button>
                            <span className="font-semibold text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-orange-500 text-white w-8 h-8 rounded-full font-bold hover:bg-orange-600 transition"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-600 transition"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-bold text-lg text-orange-500">
                            Rp {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-linear-to-r from-orange-100 to-amber-100 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-semibold">Total Pesanan:</span>
                      <span className="text-gray-700 font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)} item</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total Harga:</span>
                      <span className="text-2xl font-bold text-orange-500">
                        Rp {getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition" >
                    Checkout Sekarang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrderingApp;