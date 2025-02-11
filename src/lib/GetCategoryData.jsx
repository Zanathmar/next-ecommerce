import Config from "@/core/config";

export async function getCategoryData() {
  try {
    const response = await fetch(Config.baseApiUrl() + "category", {
      headers: {
        "x-api-key": process.env.API_KEY, // Note: Not NEXT_PUBLIC_API_KEY
      },
      cache: 'no-store', // or 'force-cache' if you want to cache the data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [] }; // Return empty array as fallback
  }
}