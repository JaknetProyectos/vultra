import { Product } from "./product";

export const mapToProduct = (dbRow: any): Product => {
    return {
        id: dbRow.id,
        name: dbRow.name,
        description: dbRow.description || '',
        price: Number(dbRow.price),
        image: dbRow.image || '',
        slug: dbRow.slug,
        featured: dbRow.featured,
        isNew: dbRow.isNew, // Supabase respeta las dobles comillas "isNew" devolviéndolo en camelCase
        name_english: dbRow.name_english || '',
        description_english: dbRow.description_english || '',
        category_slug: dbRow.category?.slug || '',
    };
};

export const isUUID = (str: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};