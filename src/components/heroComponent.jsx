import React from "react";

export default function heroComponent() {
  return (
    <section className="relative text-gray-800 py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-white via-teal-50/50 to-white">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute w-2 h-2 bg-teal-300 rounded-full animate-float"
          style={{ top: "20%", left: "10%" }}
        ></div>
        <div
          className="absolute w-1.5 h-1.5 bg-green-300 rounded-full animate-float-delay"
          style={{ top: "40%", right: "15%" }}
        ></div>
        <div
          className="absolute w-2.5 h-2.5 bg-lime-300 rounded-full animate-float"
          style={{ bottom: "25%", left: "25%" }}
        ></div>
      </div>

      {/* Central Planet Icon */}
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
        <div className="relative w-full max-w-5xl">
          {/* Rotating Image Gallery */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-teal-100/50 backdrop-blur-sm border-2 border-teal-200 animate-spin-slow">
              <img
                src="/eco-hero-image.png"
                alt="Eco-Friendly Gifts"
                className="w-48 h-48 lg:w-60 lg:h-60 object-cover rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hover:opacity-90"
              />
            </div>
          </div>

          {/* Orbiting Content Bubbles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Badge Bubble */}
            <div className="absolute w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/80 border border-teal-100 shadow-md animate-orbit text-center flex items-center justify-center">
              <span className="text-sm lg:text-base font-semibold text-teal-700 uppercase tracking-wide">
                🌱 Eco Prestige
              </span>
            </div>

            {/* Heading Bubble */}
            <div className="absolute w-48 h-48 lg:w-60 lg:h-60 rounded-full bg-white/80 border border-teal-100 shadow-md animate-orbit-delay text-center flex items-center justify-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-300">
                Upcycled Elegance
              </h1>
            </div>

            {/* Subheading Bubble */}
            <div className="absolute w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/80 border border-teal-100 shadow-md animate-orbit-faster text-center flex items-center justify-center">
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-light leading-tight max-w-xs">
                Exclusive gifts for your brand—sustainable and stunning. Grab
                them now!
              </p>
            </div>

            {/* CTA Bubble */}
            <div className="absolute w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-white/80 border border-teal-100 shadow-md animate-orbit-slow text-center flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  className="px-4 py-2 text-sm font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors duration-300 rounded-md"
                >
                  <Link href="/shop">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  className="px-4 py-2 text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-300 rounded-md"
                >
                  <Link href="/about">Our Vision</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// /* Custom Colors (Add to tailwind.config.js if not present) */
// .bg-forest-100 { background-color: #e6f3e6; }

// /* Animations */
// .animate-spin-slow {
//   animation: spinSlow 20s linear infinite;
// }
// .animate-orbit {
//   animation: orbit 10s linear infinite;
// }
// .animate-orbit-delay {
//   animation: orbit 12s linear infinite reverse 2s;
// }
// .animate-orbit-faster {
//   animation: orbit 8s linear infinite;
// }
// .animate-orbit-slow {
//   animation: orbit 15s linear infinite reverse;
// }
// .animate-float {
//   animation: float 4s infinite ease-in-out;
// }
// .animate-float-delay {
//   animation: float 4s infinite ease-in-out 2s;
// }

// @keyframes spinSlow {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// @keyframes orbit {
//   0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
//   100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-5px); }
// }

// @media (max-width: 1024px) {
//   .animate-orbit, .animate-orbit-delay, .animate-orbit-faster, .animate-orbit-slow {
//     animation: none;
//     position: static;
//     margin: 1rem 0;
//   }
//   .w-32, .w-40 { width: 24rem; }
//   .h-32, .h-40 { height: 24rem; }
//   .w-48, .w-60 { width: 28rem; }
//   .h-48, .h-60 { height: 28rem; }
//   .w-40, .w-52 { width: 26rem; }
//   .h-40, .h-52 { height: 26rem; }
//   .w-36, .w-44 { width: 22rem; }
//   .h-36, .h-44 { height: 22rem; }
//   .w-64, .w-80 { width: 32rem; }
//   .h-64, .h-80 { height: 32rem; }
//   .flex-col { flex-direction: column; align-items: center; }
// }