import { notFound } from "next/navigation";
import {
	ProductListPaginatedDocument,
	OrderDirection,
	ProductOrderField,
} from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { getPaginatedListVariables } from "@/lib/utils";
import { SortBy } from "@/ui/components/SortBy";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata = {
	title: "Laptops · GTech Laptops",
	description: "Browse and filter laptops by brand, RAM and type on GTech Laptops.",
};

const BRAND_OPTIONS = ["Dell", "HP", "Lenovo", "Apple", "Toshiba"];
const RAM_OPTIONS = ["4GB", "8GB", "16GB", "32GB"];

const getSortVariables = (sortParam?: string | string[]) => {
	const sortValue = Array.isArray(sortParam) ? sortParam[0] : sortParam;

	switch (sortValue) {
		case "price-asc":
			return { field: ProductOrderField.MinimalPrice, direction: OrderDirection.Asc };
		case "price-desc":
			return { field: ProductOrderField.MinimalPrice, direction: OrderDirection.Desc };
		default:
			return { field: ProductOrderField.Name, direction: OrderDirection.Asc };
	}
};

const normalize = (value: string | null | undefined) => value?.toLowerCase().trim() ?? "";

const productHasBrand = (product: any, brand: string) => {
	if (!brand) return true;
	const slug = "brand";
	const target = normalize(brand);

	const attr = product.attributes?.find((a: any) => a.attribute?.slug === slug);
	const valueName = normalize(attr?.values?.[0]?.name);

	return valueName === target;
};

const productHasRam = (product: any, ram: string) => {
	if (!ram) return true;
	const slug = "ram";
	const target = normalize(ram);

	// usually RAM is a variant attribute
	const variants = product.variants ?? [];
	for (const variant of variants) {
		const attr = variant.attributes?.find((a: any) => a.attribute?.slug === slug);
		const valueName = normalize(attr?.values?.[0]?.name);
		if (valueName === target) {
			return true;
		}
	}

	// fallback if you ever set RAM as product-level attribute
	const prodAttr = product.attributes?.find((a: any) => a.attribute?.slug === slug);
	const prodValueName = normalize(prodAttr?.values?.[0]?.name);

	return prodValueName === target;
};

export default async function Page(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{
		cursor?: string | string[];
		direction?: string | string[];
		sort?: string | string[];
		brand?: string | string[];
		ram?: string | string[];
	}>;
}) {
	const searchParams = await props.searchParams;
	const params = await props.params;

	const paginationVariables = getPaginatedListVariables({ params: searchParams });
	const sortVariables = getSortVariables(searchParams.sort);

	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables: {
			...paginationVariables,
			channel: params.channel,
			sortBy: sortVariables,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	const allProducts = products.edges.map((e) => e.node);

	const brandRaw = searchParams.brand;
	const ramRaw = searchParams.ram;

	const selectedBrand = Array.isArray(brandRaw) ? brandRaw[0] ?? "" : brandRaw ?? "";
	const selectedRam = Array.isArray(ramRaw) ? ramRaw[0] ?? "" : ramRaw ?? "";

	const filteredProducts = allProducts.filter((product) => {
		const brandOk = productHasBrand(product, selectedBrand);
		const ramOk = productHasRam(product, selectedRam);
		return brandOk && ramOk;
	});

	const productsToShow = filteredProducts;

	return (
		<section className="py-8 pb-16">
			{/* full-width container, just padding */}
			<div className="px-4 sm:px-8">
				<div className="mb-6 flex items-center justify-between gap-2">
					<div>
						<h1 className="text-xl font-semibold text-slate-900">All laptops</h1>
						<p className="text-sm text-slate-600">
							Browse and filter laptops by brand and RAM.
						</p>
					</div>
					<div className="flex justify-end">
						<SortBy />
					</div>
				</div>

				{/* main layout: sidebar + products + weekend promo */}
				<div className="grid gap-8 lg:grid-cols-[260px,minmax(0,1fr)] xl:grid-cols-[260px,minmax(0,1fr),260px]">
					{/* LEFT SIDEBAR */}
					<aside className="space-y-6 rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-sm">
						{/* Brands */}
						<div>
							<div className="mb-2 flex items-center justify-between">
								<h2 className="text-xs font-semibold uppercase tracking-wide text-rose-600">
									Brands
								</h2>
								{selectedBrand && (
									<LinkWithChannel
										href={
											selectedRam
												? `/products?ram=${encodeURIComponent(selectedRam)}`
												: "/products"
										}
										className="text-[11px] text-rose-500 hover:underline"
									>
										Clear
									</LinkWithChannel>
								)}
							</div>
							<ul className="space-y-1 text-sm">
								{BRAND_OPTIONS.map((brand) => {
									const isActive = normalize(selectedBrand) === normalize(brand);
									const href = `/products?brand=${encodeURIComponent(
										brand,
									)}${selectedRam ? `&ram=${encodeURIComponent(selectedRam)}` : ""}`;

									return (
										<li key={brand}>
											<LinkWithChannel
												href={href}
												className={
													"flex items-center justify-between rounded-full px-3 py-1.5 transition " +
													(isActive
														? "bg-rose-600 text-white"
														: "bg-rose-50 text-slate-800 hover:bg-rose-100")
												}
											>
												<span>{brand}</span>
											</LinkWithChannel>
										</li>
									);
								})}
							</ul>
						</div>

						{/* RAM */}
						<div>
							<div className="mb-2 flex items-center justify-between">
								<h2 className="text-xs font-semibold uppercase tracking-wide text-rose-600">
									RAM
								</h2>
								{selectedRam && (
									<LinkWithChannel
										href={
											selectedBrand
												? `/products?brand=${encodeURIComponent(selectedBrand)}`
												: "/products"
										}
										className="text-[11px] text-rose-500 hover:underline"
									>
										Clear
									</LinkWithChannel>
								)}
							</div>
							<ul className="flex flex-wrap gap-2 text-xs">
								{RAM_OPTIONS.map((ram) => {
									const isActive = normalize(selectedRam) === normalize(ram);
									const href = `/products?ram=${encodeURIComponent(
										ram,
									)}${selectedBrand ? `&brand=${encodeURIComponent(selectedBrand)}` : ""}`;

									return (
										<li key={ram}>
											<LinkWithChannel
												href={href}
												className={
													"inline-flex items-center rounded-full px-3 py-1.5 transition " +
													(isActive
														? "bg-rose-600 text-white"
														: "bg-rose-50 text-slate-800 hover:bg-rose-100")
												}
											>
												{ram}
											</LinkWithChannel>
										</li>
									);
								})}
							</ul>
						</div>

						{/* Laptop types (link to categories) */}
						<div>
							<h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-600">
								Laptop types
							</h2>
							<ul className="space-y-1 text-sm">
								<li>
									<LinkWithChannel
										href="/categories/business-laptops"
										className="block rounded-full bg-rose-50 px-3 py-1.5 text-slate-800 hover:bg-rose-100"
									>
										Business laptops
									</LinkWithChannel>
								</li>
								<li>
									<LinkWithChannel
										href="/categories/student-laptops"
										className="block rounded-full bg-rose-50 px-3 py-1.5 text-slate-800 hover:bg-rose-100"
									>
										Student laptops
									</LinkWithChannel>
								</li>
								<li>
									<LinkWithChannel
										href="/categories/gaming-laptops"
										className="block rounded-full bg-rose-50 px-3 py-1.5 text-slate-800 hover:bg-rose-100"
									>
										Gaming laptops
									</LinkWithChannel>
								</li>
								<li>
									<LinkWithChannel
										href="/categories/budget-laptops"
										className="block rounded-full bg-rose-50 px-3 py-1.5 text-slate-800 hover:bg-rose-100"
									>
										Budget laptops
									</LinkWithChannel>
								</li>
							</ul>
							<p className="mt-1 text-[11px] text-slate-500">
								(Create these categories and assign products in the dashboard to make these
								links show filtered listings.)
							</p>
						</div>
					</aside>

					{/* MAIN PRODUCT GRID */}
					<main>
						<h2 className="sr-only">Product list</h2>
						{productsToShow.length === 0 ? (
							<p className="text-sm text-slate-600">
								No laptops match the selected filters yet. Try clearing one of the filters or add
								more products with <strong>Brand</strong> and <strong>RAM</strong> attributes set.
							</p>
						) : (
							<>
								<ProductList products={productsToShow} />
								<Pagination pageInfo={products.pageInfo} />
							</>
						)}
					</main>

					{/* RIGHT WEEKEND PROMO CARD */}
					<aside className="hidden xl:block">
						<div className="sticky top-24 rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-sm">
							<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-600">
								Weekend promo
							</p>
							<h3 className="text-sm font-semibold text-slate-900">
								Save on selected laptops this Friday–Sunday
							</h3>
							<p className="mt-2 text-xs text-slate-700">
								During the weekend promo, enjoy special pricing on selected student, business and
								gaming laptops. Perfect time to upgrade your device or get a backup system.
							</p>
							<ul className="mt-3 space-y-1 text-xs text-slate-700">
								<li>• Discounts on selected models</li>
								<li>• Great options for students and remote workers</li>
								<li>• Limited to the weekend promo window</li>
							</ul>
							<div className="mt-4">
								<LinkWithChannel
									href="/products?ram=8GB"
									className="inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-rose-500"
								>
									View weekend deals
								</LinkWithChannel>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
