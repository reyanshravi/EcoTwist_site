"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Leaf, Star } from "lucide-react";
import { memo } from "react";
import Image from "next/image";

const ProductCard = ({ product, addToCart }) => {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col w-80 mx-auto">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAH0gJ/6gAAAABJRU5ErkJggg=="
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-full shadow-md px-3 py-1">
              {discount}% OFF
            </Badge>
          )}
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-md px-3 py-1">
            <Leaf size={12} aria-hidden="true" />
            <span>Eco {product.eco_score}/10</span>
          </Badge>
        </div>

        {/* Wishlist Icon */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Add to wishlist"
          className="absolute top-4 right-4 bg-white/90 hover:bg-red-50 text-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
        >
          <Heart className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        {/* Category & Material */}
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span className="bg-gray-100 px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
            {product.material}
          </span>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`} className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors min-h-[2.5rem] leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400" aria-label={`Rating ${product.rating.toFixed(1)} out of 5`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.rating)
                    ? "opacity-100 fill-current"
                    : "opacity-30"
                } transition-opacity duration-200`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg py-2.5 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default memo(ProductCard);