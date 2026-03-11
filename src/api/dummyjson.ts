const BASE_URL = 'https://dummyjson.com'

async function jsonFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${text || res.statusText}`)
  }
  return (await res.json()) as T
}

/**
 * DummyJSON: Get products category list
 * Docs: https://dummyjson.com/docs/products#products-category_list
 */
export type CategoryDto =
  | string
  | {
      name: string
      slug: string
      url: string
    }

export type Category = {
  name: string
  slug: string
  url?: string
}

export async function fetchCategories(): Promise<Category[]> {
  const raw = await jsonFetch<CategoryDto[]>('/products/categories')

  // DummyJSON used to return string[]; newer versions may return objects.
  return raw.map((item) => {
    if (typeof item === 'string') {
      const slug = item
      return { name: item, slug, url: `${BASE_URL}/products/category/${encodeURIComponent(slug)}` }
    }
    return { name: item.name, slug: item.slug, url: item.url }
  })
}

type AddProductRequest = { title: string }
type AddProductResponse = { id: number; title: string }

/**
 * DummyJSON: Add a new product
 * Docs: https://dummyjson.com/docs/products#products-add
 */
export function addProduct(payload: AddProductRequest) {
  return jsonFetch<AddProductResponse>('/products/add', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}


