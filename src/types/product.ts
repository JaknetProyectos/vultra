export interface Product {
  // Se genera en la db
  id: string;

  // Ya tenemos
  name: string;
  description: string;
  price: number;
  image: string;

  // Generamos de forma algoritmica
  slug: string;
  featured: boolean; // default false
  isNew: boolean; // default false
  
  // Lo generas tu
  name_english : string;
  description_english: string;
  category_slug : string;  
}

export interface ProductFilters {
  categorySlug?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  isNew?: boolean;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'newest';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
