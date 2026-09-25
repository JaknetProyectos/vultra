import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';
import { Product, ProductFilters } from '@/types/product';
import { mapToProduct } from '@/types/common';


export function useProducts(filters: ProductFilters = {}) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Estado de paginación estructurado según tu PaginatedResponse
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const page = filters.page || 1;
      const limit = filters.limit || 10;

      // Si filtramos por categoría, forzamos un INNER JOIN (!inner) para que PostgreSQL 
      // descarte los productos que no cumplan con el criterio del slug relacional
      const selectStr = filters.categorySlug
        ? '*, category:centromedicoavanza_categorias!inner(slug)'
        : '*, category:centromedicoavanza_categorias(slug)';

      let query = supabase
        .from('centromedicoavanza_productos')
        .select(selectStr, { count: 'exact' });

      // --- FILTROS DE RELACIÓN ---
      if (filters.categorySlug) {
        query = query.eq('category.slug', filters.categorySlug);
      }

      // --- FILTROS DE TEXTO (Buscador general) ---
      if (filters.search && filters.search.trim() !== '') {
        const cleanSearch = filters.search.trim();
        // Busca coincidencias tanto en español como en inglés
        query = query.or(`name.ilike.%${cleanSearch}%,description.ilike.%${cleanSearch}%,name_english.ilike.%${cleanSearch}%`);
      }

      // --- FILTROS DE RANGOS NUMÉRICOS Y BOOLEANOS ---
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }
      if (filters.isNew !== undefined) {
        query = query.eq('isNew', filters.isNew);
      }

      // --- ORDENAMIENTO (SortBy) ---
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'name':
            query = query.order('name', { ascending: true });
            break;
          case 'price-asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price-desc':
            query = query.order('price', { ascending: false });
            break;
          case 'newest':
            // Al no poseer timestamp explícito, ordenamos por productos marcados como nuevos, y luego por ID
            query = query.order('isNew', { ascending: false }).order('id', { ascending: false });
            break;
          default:
            query = query.order('name', { ascending: true });
        }
      } else {
        // Orden por defecto
        query = query.order('name', { ascending: true });
      }

      // --- CÁLCULO DE PAGINACIÓN (Rango inclusivo de Supabase) ---
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      // Ejecutar consulta
      const { data: dbData, error: sbError, count } = await query;

      if (sbError) throw sbError;

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / limit);

      if (dbData) {
        setData(dbData.map(mapToProduct));
      } else {
        setData([]);
      }

      setPagination({
        page,
        limit,
        total: totalCount,
        totalPages: totalPages || 1
      });

    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err.message || 'Error cargando productos'));
    } finally {
      setLoading(false);
    }
  }, [
    filters.categorySlug,
    filters.search,
    filters.minPrice,
    filters.maxPrice,
    filters.featured,
    filters.isNew,
    filters.sortBy,
    filters.page,
    filters.limit
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Retorna la estructura clásica unida al esquema PaginatedResponse indirectamente
  return {
    products: data,
    loading,
    error,
    pagination,
    refetch: fetchProducts
  };
}

