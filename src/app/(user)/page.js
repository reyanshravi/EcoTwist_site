import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { Star, Truck, Shield, Recycle, Award, MoveRight, ArrowRight } from "lucide-react";

export default function Home({ addToCart }) {


  const sampleProducts = [
    {
      id: 1,
      name: "Bamboo Desktop Organizer Set",
      price: 1299,
      originalPrice: 1599,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
      category: "Office",
      material: "Bamboo",
      rating: 4.8,
      eco_score: 9,
    },
    {
      id: 2,
      name: "Recycled Plastic Notebook Set",
      price: 899,
      originalPrice: 1199,
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
      category: "Stationery",
      material: "Recycled Plastic",
      rating: 4.6,
      eco_score: 8,
    },
    {
      id: 3,
      name: "Jute Corporate Gift Hamper",
      price: 2499,
      originalPrice: 2999,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
      category: "Gift Sets",
      material: "Jute",
      rating: 4.9,
      eco_score: 10,
    },
    {
      id: 4,
      name: "Upcycled Textile Tote Bag",
      price: 649,
      originalPrice: 799,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
      category: "Bags",
      material: "Upcycled Textile",
      rating: 4.7,
      eco_score: 9,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      rating: 5,
      comment:
        "Amazing quality and truly sustainable. Our clients love the eco-friendly gifts!",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b0bd?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Michael Chen",
      company: "GreenStart",
      rating: 5,
      comment:
        "Perfect for our company values. The craftsmanship is exceptional.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Emily Davis",
      company: "EcoFlow Solutions",
      rating: 5,
      comment: "Best corporate gifting partner we've found. Highly recommend!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative  text-white py-24 lg:py-40 overflow-hidden mt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/eco-hero-image.jpg"
            alt="Eco Friendly Gifts"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40  "></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          {/* Badge */}
          <span className="inline-block bg-forest-800/80 px-6 py-2 rounded-full text-sm uppercase tracking-wide font-medium text-white shadow-md backdrop-blur">
            🌱 Sustainable Corporate Gifting
          </span>

          {/* Heading */}
          <h1 className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Transform Waste Into
            <span className="block bg-gradient-to-r from-lime-300 via-green-400 to-sky-400 bg-clip-text text-transparent">
              Premium Gifts
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
            Discover our curated collection of eco-friendly corporate gifts — beautifully crafted from upcycled waste and biodegradable materials. Every gift makes a lasting impact on both your brand and the planet.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild // Use asChild here
              className="px-8 py-4 text-lg font-medium bg-white/15 text-forest hover:bg-forest-100 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Link href="/shop">
                Explore Products
              </Link>
            </Button>
            <Button
              asChild // Use asChild here
              className="px-8 py-4 text-lg font-medium bg-white/15 text-forest hover:bg-forest-100 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Link href="/about">
                Our Mission
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Choose EcoTwist?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We combine sustainability with premium quality to deliver gifts
              that make a lasting impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 py-12 bg-white">
            {[
              {
                icon: Recycle,
                title: "100% Sustainable",
                description: "All products made from upcycled and biodegradable materials",
                gradient: "from-green-700 via-emerald-500 to-lime-400",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Handcrafted by skilled artisans with attention to detail",
                gradient: "from-indigo-600 via-purple-500 to-yellow-400",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick and reliable shipping across India",
                gradient: "from-yellow-400 via-orange-500 to-red-500",
              },
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "30-day return policy and quality assurance",
                gradient: "from-blue-700 via-cyan-500 to-teal-400",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="glass-card text-center group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-slate-100 bg-white/70 backdrop-blur-md"
              >
                <CardContent className="p-8">
                  <div className={`h-14 w-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r ${feature.gradient}`}>
                    <feature.icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-slate-800 mb-2 group-hover:text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                    {feature.description}
                  </p>
                </CardContent>

              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-forest to-forest-600 text-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4 ">
              Our <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-lime-200 text-transparent bg-clip-text">
                Environmental</span> Impact
            </h2>
            <p className="text-xl text-forest-100 max-w-2xl mx-auto">
              Together, we're making a real difference for our planet's future.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#228B22]">50K+</div>
              <div className="text-forest-100">Trees Saved</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#8B4513]">25K+</div>
              <div className="text-forest-100">Waste Upcycled (kg)</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#6A5ACD]">100+</div>
              <div className="text-forest-100">Artisan Partners</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#008080]">5K+</div>
              <div className="text-forest-100">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="flex w-full justify-between px-10 items-end mb-10">
            <div className=" ">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Handcrafted with care, designed for impact. Each product tells a
                story of transformation.
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                asChild
                className=" text-lg px-8 py-3 cursor-pointer rounded-full font-medium inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
              >
                <Link href="/shop">
                  View All
                  <MoveRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-10">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>


        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their
              corporate gifting needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-green-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 relative bg-white overflow-hidden">
        {/* Decorative SVG Leaf Outlines */}
        <div className="absolute top-64 right-[28rem] w-64 h-64 bg-[url('/leaf-green.png')] bg-cover bg-center opacity-30 z-10" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Image + Stat */}
            <div className="relative group">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/product_image.png"
                  alt="Eco-friendly artisan crafting"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL="/product_image.png"
                />
              </div>
              <div className="absolute bottom-6 left-6 bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm bg-opacity-90 animate-fade-in-up">
                <div className="text-4xl font-extrabold text-forest mb-1">100%</div>
                <p className="text-sm text-slate-600 font-medium">Sustainable Materials</p>
              </div>
            </div>

            {/* Text Content */}
            <div className=" h-full flex justify-center items-center">
              <div>
                <span className="inline-block  bg-green-800/10 text-green-800 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wide mb-10">
                  Our Story
                </span>

                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-12">
                  Where <span className="text-forest">Purpose</span> Meets Craft
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  At <strong>EcoTwist</strong>, sustainability isn't a trend — it’s a mindset. We craft beautiful, intentional gifts from discarded and biodegradable materials, telling stories of care, creativity, and impact.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-16">
                  Each product is a collaboration between our in-house designers and skilled artisans, creating livelihoods while helping brands gift meaningfully and consciously.
                </p>

                <Button
                  asChild // This tells the Button component to render as its child (the Link)
                  className="bg-forest hover:bg-green-700/10 text-black px-8 py-3 rounded-full text-base font-semibold shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Sustainable Materials We Use
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Each material is carefully selected for its environmental benefits
              and durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Bamboo",
                icon: "🎋",
                description: "Fast-growing, renewable, naturally antibacterial",
                color: "forest",
              },
              {
                name: "Jute",
                icon: "🌾",
                description: "Biodegradable fiber, strong and versatile",
                color: "ochre",
              },
              {
                name: "Recycled Plastic",
                icon: "♻️",
                description: "Giving plastic waste a second life",
                color: "sky",
              },
              {
                name: "Upcycled Textiles",
                icon: "🧵",
                description:
                  "Transforming fabric waste into beautiful products",
                color: "slate",
              },
            ].map((material, index) => (
              <div
                key={index}
                className="eco-card p-6 text-center animate-fade-in"
              >
                <div className="text-4xl mb-4">{material.icon}</div>
                <h3 className="font-heading font-semibold text-lg text-slate-800 mb-2">
                  {material.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {material.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-16 bg-gradient-to-br from-forest via-green-800 to-forest-700 text-white overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute top-[-3rem] left-[-2rem] w-56 h-56 bg-green-900/40 blur-2xl rounded-full z-0"></div>
        <div className="absolute bottom-[-2rem] right-[-3rem] w-72 h-72 bg-green-950/40 blur-2xl rounded-full z-0"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-green-800/40 blur-xl rounded-full z-0"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold leading-snug tracking-tight mb-6">
            Stay Connected with Our
            <span className="block text-ochre">Eco-Journey</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Get exclusive updates on new products, sustainability tips, and special
            offers crafted for mindful gifting and corporate impact.
          </p>

          {/* Input & Button */}
          {/* <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 w-full px-5 py-3 rounded-lg text-slate-800 placeholder-slate-200 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-800 transition"
            />
            <Button
              type="submit"
              className="bg-ochre hover:bg-ochre-600 text-white px-8 py-3 rounded-lg font-semibold tracking-wide shadow-md transition hover:scale-105"
            >
              Subscribe
            </Button>
          </form> */}
        </div>
      </section>

    </div>
  );
}
