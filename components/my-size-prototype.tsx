"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Product = {
  id: number;
  brand: string;
  name: string;
  category: string;
  price: number;
  size: string;
  image: string;
  measurements: {
    length: number;
    width: number;
    shoulder: number;
    sleeve: number;
  };
};

type Profile = Product["measurements"] & {
  id: number;
  name: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    brand: "L.L.Bean",
    name: "Cotton Pocket Tee",
    category: "T-shirts",
    price: 6800,
    size: "L",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    measurements: { length: 70, width: 55, shoulder: 48, sleeve: 22 },
  },
  {
    id: 2,
    brand: "Champion",
    name: "Reverse Weave Sweatshirt",
    category: "Sweatshirts",
    price: 12800,
    size: "M",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    measurements: { length: 68, width: 57, shoulder: 50, sleeve: 58 },
  },
  {
    id: 3,
    brand: "Ralph Lauren",
    name: "Oxford Button Down",
    category: "Shirts",
    price: 15400,
    size: "XL",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    measurements: { length: 75, width: 56, shoulder: 47, sleeve: 61 },
  },
  {
    id: 4,
    brand: "Carhartt",
    name: "Canvas Work Jacket",
    category: "Jackets",
    price: 19800,
    size: "L",
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
    measurements: { length: 72, width: 59, shoulder: 51, sleeve: 62 },
  },
  {
    id: 5,
    brand: "Fruit of the Loom",
    name: "Vintage Logo Tee",
    category: "T-shirts",
    price: 4200,
    size: "M",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    measurements: { length: 67, width: 53, shoulder: 46, sleeve: 21 },
  },
  {
    id: 6,
    brand: "Patagonia",
    name: "Synchilla Fleece",
    category: "Fleece",
    price: 17600,
    size: "L",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    measurements: { length: 71, width: 56, shoulder: 49, sleeve: 60 },
  },
];

const initialProfile: Profile = {
  id: 1,
  name: "お気に入りのTシャツ",
  category: "T-shirts",
  length: 69,
  width: 54,
  shoulder: 47,
  sleeve: 22,
};

function score(product: Product, profile: Profile) {
  const diff = product.measurements;
  const weighted =
    Math.abs(diff.width - profile.width) * 0.4 +
    Math.abs(diff.length - profile.length) * 0.3 +
    Math.abs(diff.shoulder - profile.shoulder) * 0.2 +
    Math.abs(diff.sleeve - profile.sleeve) * 0.1;
  return Math.max(0, Math.round(100 - weighted * 4));
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function MySizePrototype() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [view, setView] = useState<"home" | "closet" | "form">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState("すべて");
  const [brand, setBrand] = useState("すべて");
  const [sort, setSort] = useState<"match" | "price">("match");
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const filteredProducts = useMemo(() => {
    const list = products.filter(
      (product) =>
        (category === "すべて" || product.category === category) &&
        (brand === "すべて" || product.brand === brand),
    );
    return [...list].sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : profile
          ? score(b, profile) - score(a, profile)
          : b.id - a.id,
    );
  }, [category, brand, sort, profile]);

  function goHome() {
    setView("home");
    setSelectedProduct(null);
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#181918]">
      <header className="sticky top-0 z-30 border-b border-[#deded8] bg-[#f7f7f4]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <button
            onClick={goHome}
            className="flex items-center gap-3"
            aria-label="MY SIZE ホーム"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#181918] text-sm font-semibold text-[#f7f7f4]">
              M
            </span>
            <span className="text-[15px] font-semibold tracking-[0.18em]">
              MY SIZE
            </span>
          </button>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold tracking-[0.18em] text-[#5e605a] sm:flex">
            <button
              onClick={goHome}
              className="transition-colors hover:text-[#181918]"
            >
              SEARCH
            </button>
            <button
              onClick={() => {
                setView("closet");
                setSelectedProduct(null);
              }}
              className="transition-colors hover:text-[#181918]"
            >
              MY CLOSET
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="transition-colors hover:text-[#181918]"
            >
              MENU
            </button>
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 sm:hidden"
            aria-label="メニューを開く"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#deded8] bg-[#f7f7f4] px-5 py-4 sm:hidden">
            <div className="flex flex-col gap-4 text-xs font-semibold tracking-[0.16em]">
              <button onClick={goHome} className="text-left">
                SEARCH
              </button>
              <button
                onClick={() => {
                  setView("closet");
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                MY CLOSET
              </button>
              <button onClick={() => setMenuOpen(false)} className="text-left">
                ABOUT
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8">
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            profile={profile}
            onBack={goHome}
          />
        ) : view === "closet" ? (
          <Closet
            profile={profile}
            onAdd={() => setView("form")}
            onFind={() => {
              setView("home");
              setSort("match");
            }}
            onEdit={() => setView("form")}
          />
        ) : view === "form" ? (
          <ProfileForm
            profile={profile}
            onCancel={() => setView("closet")}
            onSave={(next) => {
              setProfile(next);
              setView("closet");
            }}
          />
        ) : (
          <>
            <section className="grid gap-10 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-16 md:pt-20">
              <div>
                <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] text-[#777970]">
                  FIND YOUR FIT
                </p>
                <h1 className="max-w-[620px] text-balance text-5xl font-medium leading-[1.02] tracking-[-0.065em] sm:text-7xl">
                  自分の服を、
                  <br />
                  <span className="text-[#74776b]">サイズの基準に。</span>
                </h1>
              </div>
              <div className="max-w-[390px] md:justify-self-end">
                <p className="text-pretty text-sm leading-7 text-[#666861]">
                  お気に入りの服の実寸を基準に、あなたに合うサイズ感の古着を探せます。
                </p>
                <button
                  onClick={() =>
                    profile ? setView("closet") : setView("form")
                  }
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#181918] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
                >
                  {profile ? "MY CLOSETを見る" : "基準服を登録する"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            <section className="border-y border-[#deded8] py-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 text-xs text-[#696b65]">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="font-semibold tracking-[0.08em]">ITEMS</span>
                  <span className="text-[#a5a69f]">
                    {filteredProducts.length} items
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select
                    label="BRAND"
                    value={brand}
                    options={[
                      "すべて",
                      "L.L.Bean",
                      "Champion",
                      "Ralph Lauren",
                      "Carhartt",
                      "Fruit of the Loom",
                      "Patagonia",
                    ]}
                    onChange={setBrand}
                  />
                  <Select
                    label="CATEGORY"
                    value={category}
                    options={[
                      "すべて",
                      "T-shirts",
                      "Sweatshirts",
                      "Shirts",
                      "Jackets",
                      "Fleece",
                    ]}
                    onChange={setCategory}
                  />
                  <Select
                    label="SORT"
                    value={sort === "match" ? "サイズ一致度順" : "価格順"}
                    options={["サイズ一致度順", "価格順"]}
                    onChange={(value) =>
                      setSort(value === "価格順" ? "price" : "match")
                    }
                  />
                </div>
              </div>
            </section>

            {profile && (
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#d8ddd0] bg-[#eef1e8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-[#71796c]">
                    SEARCHING WITH
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {profile.name}{" "}
                    <span className="ml-2 text-xs text-[#72766d]">
                      着丈 {profile.length} / 身幅 {profile.width} cm
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setView("closet")}
                  className="self-start text-xs font-semibold underline underline-offset-4 sm:self-auto"
                >
                  基準服を変更
                </button>
              </div>
            )}

            <section className="grid grid-cols-2 gap-x-3 gap-y-10 pt-8 sm:gap-x-6 sm:gap-y-14 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  profile={profile}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </section>
          </>
        )}
      </main>
      <footer className="border-t border-[#deded8] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#777970]">
            MY SIZE / PROTOTYPE
          </p>
          <p className="text-[11px] text-[#92938d]">
            自分のサイズ感を、もっと自由に。
          </p>
        </div>
      </footer>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative flex min-w-[120px] items-center gap-2 rounded-full border border-[#d6d6cf] bg-[#fbfbf8] px-3 py-2 text-[10px] font-semibold tracking-[0.1em] text-[#74766f]">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-4 text-[#1d1e1c] outline-none"
      >
        <option disabled={false} value={value}>
          {value}
        </option>
        {options
          .filter((option) => option !== value)
          .map((option) => (
            <option key={option}>{option}</option>
          ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-3 w-3" />
    </label>
  );
}

function ProductCard({
  product,
  profile,
  onClick,
}: {
  product: Product;
  profile: Profile | null;
  onClick: () => void;
}) {
  const match = profile ? score(product, profile) : null;
  return (
    <button onClick={onClick} className="group text-left">
      <div className="relative aspect-[0.82] overflow-hidden bg-[#e9e8e2]">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 bg-[#f7f7f4]/90 px-2 py-1 text-[9px] font-semibold tracking-[0.1em]">
          {product.category}
        </span>
        {match !== null && (
          <span className="absolute bottom-3 right-3 rounded-full bg-[#dbe5d2] px-2.5 py-1 text-[11px] font-semibold text-[#40503b]">
            {match}%
          </span>
        )}
      </div>
      <div className="pt-4">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#8a8c84]">
          {product.brand}
        </p>
        <h3 className="mt-1 text-sm font-medium leading-5">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span>{formatPrice(product.price)}</span>
          <span className="text-[#858780]">Size {product.size}</span>
        </div>
      </div>
    </button>
  );
}

function Closet({
  profile,
  onAdd,
  onFind,
  onEdit,
}: {
  profile: Profile | null;
  onAdd: () => void;
  onFind: () => void;
  onEdit: () => void;
}) {
  return (
    <section className="pt-14 md:pt-20">
      <div className="flex flex-col gap-6 border-b border-[#deded8] pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#777970]">
            YOUR REFERENCE GARMENTS
          </p>
          <h1 className="text-5xl font-medium tracking-[-0.06em] sm:text-6xl">
            MY CLOSET
          </h1>
          <p>{profile?.name}</p>
          <p className="mt-4 text-sm leading-6 text-[#777970]">
            あなたの「ちょうどいい」を登録して、サイズの基準に。
          </p>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#181918] px-5 py-3 text-xs font-semibold tracking-[0.1em] text-white"
        >
          <Plus className="h-4 w-4" />
          基準服を追加
        </button>
      </div>
      {profile ? (
        <div className="mt-10 max-w-2xl rounded-2xl border border-[#deded8] bg-[#fbfbf8] p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#85877e]">
                REFERENCE #01
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                {profile.name}
              </h2>
              <p className="mt-1 text-xs text-[#85877e]">{profile.category}</p>
            </div>
            <Heart className="h-5 w-5 fill-[#dce4d7] text-[#879481]" />
          </div>
          <div className="mt-8 grid grid-cols-4 border-y border-[#e2e2db] py-5">
            {[
              ["着丈", profile.length],
              ["身幅", profile.width],
              ["肩幅", profile.shoulder],
              ["袖丈", profile.sleeve],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-[10px] text-[#8a8c84]">{label}</p>
                <p className="mt-1 text-lg font-medium">
                  {value}
                  <span className="ml-0.5 text-xs">cm</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onFind}
              className="rounded-full bg-[#181918] px-5 py-3 text-xs font-semibold text-white"
            >
              このサイズで探す{" "}
              <ArrowRight className="ml-2 inline h-3.5 w-3.5" />
            </button>
            <button
              onClick={onEdit}
              className="rounded-full border border-[#cdcdc5] px-5 py-3 text-xs font-semibold"
            >
              編集する
            </button>
          </div>
        </div>
      ) : (
        <EmptyState onAdd={onAdd} />
      )}
    </section>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mt-10 border border-dashed border-[#cfcfc7] px-6 py-16 text-center">
      <p className="text-sm">まだ基準服が登録されていません。</p>
      <button
        onClick={onAdd}
        className="mt-5 text-xs font-semibold underline underline-offset-4"
      >
        最初の1着を登録する
      </button>
    </div>
  );
}

function ProfileForm({
  profile,
  onCancel,
  onSave,
}: {
  profile: Profile | null;
  onCancel: () => void;
  onSave: (p: Profile) => void;
}) {
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    category: profile?.category ?? "T-shirts",
    length: String(profile?.length ?? ""),
    width: String(profile?.width ?? ""),
    shoulder: String(profile?.shoulder ?? ""),
    sleeve: String(profile?.sleeve ?? ""),
  });
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      ["length", "width", "shoulder", "sleeve"].some(
        (key) =>
          !Number(form[key as keyof typeof form]) ||
          Number(form[key as keyof typeof form]) <= 0,
      )
    ) {
      setError("服の名前と、4つの実寸を正しく入力してください。");
      return;
    }
    onSave({
      id: profile?.id ?? Date.now(),
      name: form.name,
      category: form.category,
      length: Number(form.length),
      width: Number(form.width),
      shoulder: Number(form.shoulder),
      sleeve: Number(form.sleeve),
    });
  }
  return (
    <section className="mx-auto max-w-2xl pt-14 md:pt-20">
      <button onClick={onCancel} className="mb-10 text-xs text-[#777970]">
        ← MY CLOSETへ戻る
      </button>
      <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-[#777970]">
        YOUR PERFECT FIT
      </p>
      <h1 className="text-5xl font-medium tracking-[-0.06em]">基準服を登録</h1>
      <p className="mt-4 text-sm leading-6 text-[#777970]">
        自分にとって「ちょうどいい」服の実寸を入力してください。
      </p>
      <form onSubmit={submit} className="mt-10 space-y-6">
        <Field
          label="服の名前"
          value={form.name}
          placeholder="お気に入りのTシャツ"
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <label className="block">
          <span className="mb-2 block text-xs font-semibold">カテゴリー</span>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-xl border border-[#d5d5cd] bg-[#fbfbf8] px-4 py-3 text-sm outline-none"
          >
            <option>T-shirts</option>
            <option>Shirts</option>
            <option>Sweatshirts</option>
            <option>Jackets</option>
            <option>Fleece</option>
          </select>
        </label>
        <div>
          <p className="mb-3 text-xs font-semibold">実寸（cm）</p>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="着丈"
              value={form.length}
              placeholder="69"
              type="number"
              onChange={(v) => setForm({ ...form, length: v })}
            />
            <Field
              label="身幅"
              value={form.width}
              placeholder="54"
              type="number"
              onChange={(v) => setForm({ ...form, width: v })}
            />
            <Field
              label="肩幅"
              value={form.shoulder}
              placeholder="47"
              type="number"
              onChange={(v) => setForm({ ...form, shoulder: v })}
            />
            <Field
              label="袖丈"
              value={form.sleeve}
              placeholder="22"
              type="number"
              onChange={(v) => setForm({ ...form, sleeve: v })}
            />
          </div>
        </div>
        {error && <p className="text-sm text-[#a84f42]">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-[#181918] py-4 text-xs font-semibold tracking-[0.12em] text-white"
        >
          保存する
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#d5d5cd] bg-[#fbfbf8] px-4 py-3 text-sm outline-none focus:border-[#7f8f78]"
      />
    </label>
  );
}

function ProductDetail({
  product,
  profile,
  onBack,
}: {
  product: Product;
  profile: Profile | null;
  onBack: () => void;
}) {
  const match = profile ? score(product, profile) : null;
  const diffs = profile
    ? [
        ["着丈", product.measurements.length - profile.length],
        ["身幅", product.measurements.width - profile.width],
        ["肩幅", product.measurements.shoulder - profile.shoulder],
        ["袖丈", product.measurements.sleeve - profile.sleeve],
      ]
    : [];
  return (
    <section className="pt-10 md:pt-16">
      <button onClick={onBack} className="mb-8 text-xs text-[#777970]">
        ← 商品一覧へ戻る
      </button>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="aspect-[0.86] bg-[#e9e8e2]">
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#85877e]">
            {product.brand}
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg">
            {formatPrice(product.price)}{" "}
            <span className="ml-3 text-sm text-[#85877e]">
              Size {product.size} / {product.category}
            </span>
          </p>
          {match !== null && (
            <div className="mt-10 rounded-2xl bg-[#e6eddf] p-6">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#65705f]">
                SIZE MATCH WITH {profile?.name.toUpperCase()}
              </p>
              <p className="mt-2 text-5xl font-medium tracking-[-0.06em] text-[#465440]">
                {match}
                <span className="ml-1 text-xl">%</span>
              </p>
              <div className="mt-6 grid grid-cols-2 gap-y-4 border-t border-[#cfdac7] pt-5">
                {diffs.map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-[10px] text-[#75806e]">{label}</p>
                    <p className="mt-1 text-sm font-medium text-[#465440]">
                      {Number(value) > 0 ? "+" : ""}
                      {value}cm
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 grid grid-cols-4 border-y border-[#deded8] py-5">
            {[
              ["着丈", product.measurements.length],
              ["身幅", product.measurements.width],
              ["肩幅", product.measurements.shoulder],
              ["袖丈", product.measurements.sleeve],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-[10px] text-[#8a8c84]">{label}</p>
                <p className="mt-1 text-base font-medium">
                  {value}
                  <span className="text-xs">cm</span>
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="mt-8 flex items-center justify-center gap-2 rounded-full border border-[#cdcdc5] py-3 text-xs font-semibold"
          >
            <Heart
              className={`h-4 w-4 ${saved ? "fill-[#a84f42] text-[#a84f42]" : ""}`}
            />
            {saved ? "保存しました" : "お気に入りに保存"}
          </button>
        </div>
      </div>
    </section>
  );
}

export { products, score };
