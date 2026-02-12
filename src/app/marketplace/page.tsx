import { products, artisans } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type MarketplacePageProps = {
  searchParams?: Promise<{ artisanId?: string }>;
};

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const params = await searchParams;
  const artisanId = params?.artisanId;
  const displayedProducts = artisanId ? products.filter((p) => p.artisanId === artisanId) : products;
  const artisan = artisanId ? artisans.find((a) => a.id === artisanId) : null;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">
          {artisan ? `${artisan.name}'s Crafts` : 'The Artisan Marketplace'}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          {artisan
            ? `Browse the unique collection from ${artisan.name}.`
            : 'A curated collection of authentic, handcrafted treasures. Each purchase directly supports our artisans.'}
        </p>
        {artisan && (
          <Button asChild variant="link" className="mt-4 text-accent hover:text-accent/80">
            <Link href="/marketplace">Back to All Crafts</Link>
          </Button>
        )}
      </div>
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-foreground/80">No crafts found for this artisan yet.</p>
        </div>
      )}
    </div>
  );
}
