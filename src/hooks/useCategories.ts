import { supabase } from "@/supabase/client";
import { Category } from "@/types/category";
import { useState, useCallback, useEffect } from "react";


export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { data: dbData, error: sbError } = await supabase
                .from('centromedicoavanza_categorias')
                .select('*')
                .order('name', { ascending: true });

            if (sbError) throw sbError;

            if (dbData) {
                // Mapeamos asegurando que si algún campo opcional de traducción viene vacío de la DB no rompa la interfaz
                const mappedCategories: Category[] = dbData.map((cat: any) => ({
                    id: cat.id,
                    slug: cat.slug,
                    name: cat.name,
                    name_english: cat.name_english || cat.name, // Fallback al original si no hay traducción
                    description: cat.description || '',
                    description_english: cat.description_english || '',
                }));
                setCategories(mappedCategories);
            } else {
                setCategories([]);
            }
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error(err.message || 'Error cargando categorías'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, error, refetch: fetchCategories };
}