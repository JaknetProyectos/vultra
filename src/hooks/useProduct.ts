import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';
import { Product } from '@/types/product';
import { isUUID, mapToProduct } from '@/types/common';


export function useProduct(identifier: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProduct = useCallback(async () => {
        if (!identifier) {
            setProduct(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Unimos la categoría para obtener su slug
            let query = supabase
                .from('centromedicoavanza_productos')
                .select('*, category:centromedicoavanza_categorias(slug)');

            // Evaluamos dinámicamente si buscamos por UUID o por la cadena del slug
            if (isUUID(identifier)) {
                query = query.eq('id', identifier);
            } else {
                query = query.eq('slug', identifier);
            }

            const { data, error: sbError } = await query.maybeSingle();

            if (sbError) throw sbError;

            if (data) {
                setProduct(mapToProduct(data));
            } else {
                setProduct(null);
            }
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error(err.message || 'Error desconocido'));
        } finally {
            setLoading(false);
        }
    }, [identifier]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { product, loading, error, refetch: fetchProduct };
}