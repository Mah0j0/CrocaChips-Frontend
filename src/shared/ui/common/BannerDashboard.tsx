export default function BannerDashboard() {
  return (
    <div className="relative flex items-center justify-between p-4 bg-orange-600 text-white rounded-lg mt-4">
      <div>
        <h2 className="text-2xl font-bold ml-4">Bienvenido a Croca Chips!</h2>
        <p className="text-sm ml-4 mt-2">¿En qué trabajaremos hoy?</p>
        <div className="mt-4 ml-4">
          <button
            className="px-4 py-2 bg-white text-gray-800 rounded-sm text-xs"
            onClick={() => window.location.href = '/ventas'}
          >
            Seguimiento de ventas
          </button>
        </div>
      </div>

      {/* Imagen que sobresale */}
      <div className="hidden md:block absolute -top-4 right-8 w-38 h-38">
        <img 
          src="/images/logo/banner-dashboard.png" 
          alt="Imagen decorativa"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
