"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const allProducts = [
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
  {
    id: 5,
    name: "Bamboo Wireless Charging Station",
    price: 1899,
    originalPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400&q=80",
    category: "Tech",
    material: "Bamboo",
    rating: 4.5,
    eco_score: 8,
  },
  {
    id: 6,
    name: "Recycled Paper Executive Diary",
    price: 799,
    originalPrice: 999,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    category: "Stationery",
    material: "Recycled Paper",
    rating: 4.4,
    eco_score: 7,
  },
  {
    id: 7,
    name: "Jute Conference Folder Set",
    price: 1199,
    originalPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
    category: "Office",
    material: "Jute",
    rating: 4.6,
    eco_score: 9,
  },
  {
    id: 8,
    name: "Upcycled Denim Laptop Sleeve",
    price: 1399,
    originalPrice: 1699,
    image:
      "https://images.unsplash.com/photo-1588200908342-23b585c03e26?auto=format&fit=crop&w=400&q=80",
    category: "Tech",
    material: "Upcycled Textile",
    rating: 4.8,
    eco_score: 10,
  },
];

const materials = [
  "All",
  "Bamboo",
  "Jute",
  "Recycled Plastic",
  "Upcycled Textile",
  "Recycled Paper",
];
const categories = ["All", "Office", "Stationery", "Gift Sets", "Bags", "Tech"];
export default function page({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMaterial =
      selectedMaterial === "All" || product.material === selectedMaterial;
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesMaterial && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "eco-score":
        return b.eco_score - a.eco_score;
      default:
        return 0;
    }
  });
  return (
    <div className="min-h-screen bg-ivory mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1B4332] mb-4 tracking-tight">
            Discover Sustainable Gifts
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore our handpicked collection of eco-friendly, artisan-made, and
            biodegradable products — curated with care for conscious gifting.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
            </div>

            {/* Material Filter */}
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-700"
            >
              {materials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-700"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-700"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="eco-score">Best Eco Score</option>
            </select>
          </div>

          {/* Active Filters */}
          {(searchTerm ||
            selectedCategory !== "All" ||
            selectedMaterial !== "All") && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedMaterial !== "All" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200"
                  onClick={() => setSelectedMaterial("All")}
                >
                  {selectedMaterial} ×
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200"
                  onClick={() => setSelectedCategory("All")}
                >
                  {selectedCategory} ×
                </Badge>
              )}
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200"
                  onClick={() => setSearchTerm("")}
                >
                  "{searchTerm}" ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6 text-slate-600 text-sm">
          <p>
            Showing <strong>{sortedProducts.length}</strong> of{" "}
            <strong>{allProducts.length}</strong> sustainable products
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading text-xl font-semibold text-slate-800 mb-2">
              No products found
            </h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search criteria or browse our featured products
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedMaterial("All");
                setSelectedCategory("All");
              }}
              className="eco-button"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Impact Message */}
        <div className="mt-20 bg-gradient-to-r from-[#2E7D32] to-[#1B4332] text-white rounded-2xl px-8 py-12 text-center shadow-lg">
          <div className="max-w-3xl mx-auto">
            <DotLottieReact
              src="https://lottie.host/852a0a5e-2e1c-40ed-a0b2-98e500cdb5bd/OFbUN4ZK7Y.lottie"
              loop
              autoplay
            />
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Every Purchase Makes a Difference
            </h3>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              When you shop with <strong>EcoTwist</strong>, you're not just
              buying a product — you're empowering artisan communities,
              supporting sustainable practices, and helping us reduce
              environmental waste with every order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
