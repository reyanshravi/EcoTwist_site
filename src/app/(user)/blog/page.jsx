import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "5 Ways Corporate Gifts Can Drive Your Sustainability Goals",
    excerpt:
      "Discover how choosing eco-friendly corporate gifts can significantly impact your company's environmental footprint while strengthening business relationships.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    category: "Corporate Gifting",
    readTime: "5 min read",
    date: "March 15, 2024",
    author: "Priya Sharma",
  },
  {
    id: 2,
    title: "The Journey of Bamboo: From Plant to Premium Product",
    excerpt:
      "Follow the fascinating transformation of bamboo from sustainable farming to beautifully crafted corporate gifts that make a difference.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    category: "Sustainability",
    readTime: "7 min read",
    date: "March 10, 2024",
    author: "Raj Kumar",
  },
  {
    id: 3,
    title: "Upcycling Success Stories: Waste to Wonder Transformations",
    excerpt:
      "Real stories of how we've transformed plastic waste, textile scraps, and other materials into premium corporate gifts.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80",
    category: "Impact Stories",
    readTime: "6 min read",
    date: "March 5, 2024",
    author: "Arjun Patel",
  },
  {
    id: 4,
    title: "Building Stronger Teams Through Sustainable Corporate Gifting",
    excerpt:
      "Learn how eco-friendly corporate gifts can boost employee morale, strengthen team bonds, and align with your company values.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    category: "Team Building",
    readTime: "4 min read",
    date: "February 28, 2024",
    author: "Priya Sharma",
  },
  {
    id: 5,
    title: "The Artisan Network: Empowering Communities Through Craft",
    excerpt:
      "Meet the skilled artisans behind our products and learn how traditional craftsmanship meets modern sustainability.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    category: "Artisan Stories",
    readTime: "8 min read",
    date: "February 20, 2024",
    author: "Raj Kumar",
  },
  {
    id: 6,
    title: "Measuring Impact: How Your Choices Make a Difference",
    excerpt:
      "Understanding the environmental and social impact of your corporate gifting choices with real data and insights.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    category: "Impact Measurement",
    readTime: "5 min read",
    date: "February 15, 2024",
    author: "Arjun Patel",
  },
];

const categories = [
  "All",
  "Corporate Gifting",
  "Sustainability",
  "Impact Stories",
  "Team Building",
  "Artisan Stories",
];

export default function page() {
  return (
    <div className="min-h-screen bg-ivory  pb-16 ">
      <div className="container mx-auto ">
        {/* Header */}
        <section className="relative py-24 px-6 md:px-12 bg-gradient-to-br from-[#f1f8f4] to-white overflow-hidden">
          {/* Leaf SVG Behind Badge */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-10 w-40 h-40 pointer-events-none">
            <img
              src="/leaf-green.png"
              alt="leaf"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="text-center relative z-10">
            <div className="flex justify-center items-start">
              <Badge className="bg-[#2E7D32] text-white px-4 py-1.5 rounded-full mb-6 text-sm shadow-sm">
                EcoTwist Blog
              </Badge>

              <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1B4332] mb-4 leading-tight transition-all duration-300 relative inline-block group">
                <span className="relative z-10">Insights & Stories</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Dive into sustainability tips, real-world impact, and stories that
              redefine the way we think about conscious corporate gifting.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 ">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              className={
                index === 0
                  ? "eco-button"
                  : "border-slate-300 text-slate-600 hover:border-forest hover:text-forest"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16 px-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-ochre text-white">Featured</Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-3">
                  {blogPosts[0].category}
                </Badge>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <span>By {blogPosts[0].author}</span>
                  <span>{blogPosts[0].readTime}</span>
                  <span>{blogPosts[0].date}</span>
                </div>
                <Button className="eco-button w-fit">Read Article</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="my-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 max-w-6xl mx-auto">
          {[
            {
              title: "Corporate Gifting",
              count: "12 articles",
              description: "Best practices for sustainable corporate gifts",
              bgColor: "bg-forest",
              icon: "🎁",
            },
            {
              title: "Sustainability",
              count: "8 articles",
              description: "Environmental impact and eco-friendly practices",
              bgColor: "bg-ochre",
              icon: "🌿",
            },
            {
              title: "Impact Stories",
              count: "15 articles",
              description: "Real stories of transformation and change",
              bgColor: "bg-sky-400",
              icon: "📖",
            },
          ].map(({ title, count, description, bgColor, icon }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div
                className={`${bgColor} text-white rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 text-2xl sm:text-3xl w-12 sm:w-14 h-12 sm:h-14`}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                {description}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">{count}</p>
            </div>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="eco-card group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-slate-700"
                  >
                    {post.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-slate-800 mb-3 group-hover:text-forest transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{post.date}</span>
                  <Button
                    variant="ghost"
                    className="text-forest hover:text-forest-600 hover:bg-forest-50 p-0"
                  >
                    Read More →
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-forest/90 to-forest-dark/90 rounded-2xl p-10 sm:p-14 lg:p-20 max-w-4xl mx-auto lg relative overflow-hidden text-black">
         

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-6 drop-shadow-lg">
            Stay Updated with{" "}
            <span className="text-green-800 ">Sustainability Insights</span>
          </h2>

          <p className="text-green-800 max-w-xl mx-auto mb-10  text-base sm:text-xl tracking-wide">
            Join thousands of eco-conscious readers. Get exclusive updates on
            sustainable business, new eco products, and inspiring impact stories
            straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-green-800 transition shadow-md"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-gradient-to-r from-ochre to-ochre-dark hover:from-ochre-dark hover:to-ochre transition-all duration-300 rounded-lg px-8 py-4 text-green-800 font-semibold shadow-lg"
            >
              Subscribe
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
