export interface Product {
  id: string
  name: string
  brand: string
  category: "Flagship" | "Budget" | "Accessories" | "Refurbished"
  price: number
  originalPrice?: number
  discountPercentage?: number
  rating: number
  reviewCount: number
  description: string
  image: string
  images?: string[]
  inStock: boolean
  stockCount?: number
  isNew?: boolean
  isSale?: boolean
  isFeatured?: boolean
  specs: ProductSpecs
  colors?: ColorVariant[]
  storageOptions?: StorageOption[]
}

export interface ProductSpecs {
  display?: string
  processor?: string
  ram: string
  storage: string
  camera?: string
  battery?: string
  os?: string
  is5G?: boolean
  hasWirelessCharging?: boolean
  refreshRate?: string
  ipRating?: string
  weight?: string
  dimensions?: string
}

export interface ColorVariant {
  name: string
  hex: string
  image?: string
}

export interface StorageOption {
  size: string
  price: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedStorage?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  deliveryDate?: string
  trackingNumber?: string
}

export interface Address {
  id?: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  addresses?: Address[]
  wishlist?: string[]
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  createdAt: string
  helpful?: number
}

export interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  ram: string[]
  storage: string[]
  features: string[]
}

export type SortOption = "price-low" | "price-high" | "newest" | "rating"
