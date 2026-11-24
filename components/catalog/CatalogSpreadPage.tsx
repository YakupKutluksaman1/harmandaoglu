import type { CatalogSpread } from "@/lib/catalog";
import { catalogMeta } from "@/lib/catalog";

function CatalogVisual({
  image,
  tall,
}: {
  image: NonNullable<CatalogSpread["image"]>;
  tall?: boolean;
}) {
  return (
    <div className={`catalog-visual ${tall ? "catalog-visual--tall" : ""}`}>
      {image.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- PDF / harici stok URL
        <img src={image.src} alt={image.alt} />
      ) : (
        <div className="catalog-visual-empty">Fotoğraf eklenecek</div>
      )}
      {image.caption ? (
        <p className="catalog-caption">{image.caption}</p>
      ) : null}
    </div>
  );
}

function CatalogHeroStrip({ image }: { image: NonNullable<CatalogSpread["image"]> }) {
  return (
    <div className="catalog-hero-strip">
      {image.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.src} alt={image.alt} />
      ) : null}
      {image.caption ? (
        <p className="catalog-caption catalog-caption--strip">{image.caption}</p>
      ) : null}
    </div>
  );
}

function PageFooter({ page, total }: { page: number; total: number }) {
  return (
    <footer className="catalog-footer">
      <span>{catalogMeta.title}</span>
      <span>
        {page} / {total}
      </span>
    </footer>
  );
}

function pageClass(spread: CatalogSpread) {
  const dense =
    spread.layout === "scope-combined" ||
    spread.layout === "materials-process";
  return dense ? "catalog-page catalog-page--dense" : "catalog-page";
}

export function CatalogSpreadPage({
  spread,
  page,
  total,
}: {
  spread: CatalogSpread;
  page: number;
  total: number;
}) {
  if (spread.layout === "brand-gate" || spread.layout === "cover") {
    const wordmark = spread.headline
      .replace(/\s*A\.Ş\.?\s*$/i, "")
      .trim()
      .toLocaleUpperCase("tr-TR");
    return (
      <section className="catalog-page catalog-page--cover catalog-page--brand-gate">
        {spread.image?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="catalog-cover-bg"
            src={spread.image.src}
            alt={spread.image.alt}
          />
        ) : null}
        <div className="catalog-cover-scrim catalog-cover-scrim--gate" aria-hidden />
        <div className="catalog-cover-vignette" aria-hidden />
        <div className="catalog-cover-frame catalog-cover-frame--gate">
          <p className="catalog-cover-edition">{catalogMeta.edition}</p>
          <div className="catalog-cover-gate">
            <header className="catalog-cover-brand catalog-cover-brand--gate">
              <div className="catalog-cover-mark-wrap catalog-cover-mark-wrap--gate">
                <span className="catalog-cover-mark catalog-cover-mark--gate" aria-hidden>
                  H
                </span>
              </div>
              <div className="catalog-cover-brand-copy">
                <h1 className="catalog-cover-wordmark catalog-cover-wordmark--gate">
                  {wordmark}
                </h1>
                <p className="catalog-cover-legal">
                  <span className="catalog-cover-legal-rule" aria-hidden />
                  A.Ş.
                  <span className="catalog-cover-legal-rule" aria-hidden />
                </p>
                <p className="catalog-cover-descriptor">
                  Mimari · Restorasyon · Antalya
                </p>
              </div>
            </header>
          </div>
          <PageFooter page={page} total={total} />
        </div>
      </section>
    );
  }

  if (spread.layout === "scope-combined") {
    return (
      <section className={pageClass(spread)}>
        <div className="catalog-page-inner catalog-page-inner--balanced">
          <header className="catalog-page-header">
            {spread.label ? <p className="catalog-label">{spread.label}</p> : null}
            <h2 className="catalog-headline">{spread.headline}</h2>
            {spread.subhead ? (
              <p className="catalog-subhead">{spread.subhead}</p>
            ) : null}
          </header>
          <div className="catalog-page-main">
            <div className="catalog-scope-combined">
              <div className="catalog-grid-2 catalog-grid-2--tight catalog-grid-2--fill">
                {spread.items?.map((item) => (
                  <article
                    key={item.title}
                    className="catalog-card catalog-card--fill"
                  >
                    {item.meta ? (
                      <p className="catalog-card-meta">{item.meta}</p>
                    ) : null}
                    <h3 className="catalog-card-title">{item.title}</h3>
                    <p className="catalog-card-copy">{item.copy}</p>
                  </article>
                ))}
              </div>
              <div className="catalog-scope-side">
                {spread.image ? (
                  <CatalogHeroStrip image={spread.image} />
                ) : null}
                {spread.bullets ? (
                  <ul className="catalog-bullets catalog-bullets--cols">
                    {spread.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {spread.paragraphs?.map((p) => (
                  <p key={p} className="catalog-body catalog-body--tight">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <PageFooter page={page} total={total} />
        </div>
      </section>
    );
  }

  if (spread.layout === "materials-process") {
    return (
      <section className={pageClass(spread)}>
        <div className="catalog-page-inner catalog-page-inner--balanced">
          <header className="catalog-page-header">
            {spread.label ? <p className="catalog-label">{spread.label}</p> : null}
            <h2 className="catalog-headline">{spread.headline}</h2>
            {spread.subhead ? (
              <p className="catalog-subhead">{spread.subhead}</p>
            ) : null}
          </header>
          <div className="catalog-page-main">
            <div className="catalog-scope-combined">
              <div className="catalog-grid-2 catalog-grid-2--tight catalog-grid-2--fill">
                {spread.items?.map((item) => (
                  <article
                    key={item.title}
                    className="catalog-card catalog-card--fill"
                  >
                    {item.meta ? (
                      <p className="catalog-card-meta">{item.meta}</p>
                    ) : null}
                    <h3 className="catalog-card-title">{item.title}</h3>
                    <p className="catalog-card-copy">{item.copy}</p>
                  </article>
                ))}
              </div>
              <div className="catalog-scope-side catalog-scope-side--stack">
                {spread.image ? (
                  <CatalogHeroStrip image={spread.image} />
                ) : null}
                <div className="catalog-grid-2 catalog-grid-2--tight catalog-grid-2--fill catalog-grid-2--process">
                  {spread.processItems?.map((item) => (
                    <article
                      key={item.title}
                      className="catalog-card catalog-card--compact catalog-card--fill"
                    >
                      {item.meta ? (
                        <p className="catalog-card-meta">{item.meta}</p>
                      ) : null}
                      <h3 className="catalog-card-title">{item.title}</h3>
                      <p className="catalog-card-copy">{item.copy}</p>
                    </article>
                  ))}
                </div>
                {spread.paragraphs?.map((p) => (
                  <p key={p} className="catalog-body catalog-body--tight">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <PageFooter page={page} total={total} />
        </div>
      </section>
    );
  }

  if (spread.layout === "regions-assurance") {
    return (
      <section className="catalog-page">
        <div className="catalog-page-inner catalog-page-inner--balanced">
          <header className="catalog-page-header">
            {spread.label ? <p className="catalog-label">{spread.label}</p> : null}
            <h2 className="catalog-headline">{spread.headline}</h2>
            {spread.subhead ? (
              <p className="catalog-subhead">{spread.subhead}</p>
            ) : null}
          </header>
          <div className="catalog-page-main">
            {spread.image ? <CatalogHeroStrip image={spread.image} /> : null}
            <ul className="catalog-bullets catalog-bullets--regions">
              {spread.bullets?.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          {spread.paragraphs?.map((p) => (
            <p key={p} className="catalog-body catalog-kvkk">
              {p}
            </p>
          ))}
          <PageFooter page={page} total={total} />
        </div>
      </section>
    );
  }

  if (spread.layout === "projects-mosaic") {
    return (
      <section className="catalog-page">
        <div className="catalog-page-inner catalog-page-inner--balanced">
          <header className="catalog-page-header">
            {spread.label ? <p className="catalog-label">{spread.label}</p> : null}
            <h2 className="catalog-headline">{spread.headline}</h2>
            {spread.subhead ? (
              <p className="catalog-subhead">{spread.subhead}</p>
            ) : null}
          </header>
          <div className="catalog-page-main">
          <div className="catalog-mosaic">
            {spread.items?.map((item) => (
              <article key={item.title} className="catalog-mosaic-card">
                {item.image ? (
                  <div className="catalog-mosaic-visual">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image.src} alt={item.image.alt} />
                    {item.image.caption ? (
                      <p className="catalog-caption">{item.image.caption}</p>
                    ) : null}
                  </div>
                ) : null}
                <h3 className="catalog-card-title">{item.title}</h3>
                <p className="catalog-card-meta">{item.meta}</p>
                <p className="catalog-card-copy">{item.copy}</p>
              </article>
            ))}
          </div>
          </div>
          <PageFooter page={page} total={total} />
        </div>
      </section>
    );
  }

  if (spread.layout === "editorial" && spread.image) {
    return (
      <section className="catalog-page">
        <div className="catalog-page-inner catalog-page-inner--balanced">
          <header className="catalog-page-header">
            {spread.label ? <p className="catalog-label">{spread.label}</p> : null}
            <h2 className="catalog-headline">{spread.headline}</h2>
            {spread.subhead ? (
              <p className="catalog-subhead">{spread.subhead}</p>
            ) : null}
          </header>
          <div className="catalog-page-main">
            <div className="catalog-split">
              <div className="catalog-split-text">
                <div className="catalog-body">
                  {spread.paragraphs?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {spread.bullets ? (
                  <ul className="catalog-bullets">
                    {spread.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <CatalogVisual image={spread.image} />
            </div>
          </div>
          <PageFooter page={page} total={total} />
        </div>
      </section>
    );
  }

  if (spread.layout === "closing" && spread.image) {
    const lines = spread.paragraphs ?? [];
    const intro = lines[0];
    const brand = lines[1];
    const owner = lines[2];
    const contacts = lines.slice(3);

    return (
      <section className="catalog-page catalog-page--closing">
        <div className="catalog-closing">
          <div className="catalog-closing-visual">
            <CatalogVisual image={spread.image} tall />
          </div>
          <div className="catalog-closing-panel">
            <div className="catalog-page-inner">
              {spread.label ? (
                <p className="catalog-label">{spread.label}</p>
              ) : null}
              <h2 className="catalog-headline catalog-headline--closing">
                {spread.headline}
              </h2>
              {spread.subhead ? (
                <p className="catalog-subhead">{spread.subhead}</p>
              ) : null}
              {intro ? <p className="catalog-body catalog-closing-intro">{intro}</p> : null}
              <div className="catalog-closing-brand">
                {brand ? (
                  <p className="catalog-closing-wordmark">{brand}</p>
                ) : null}
                {owner ? <p className="catalog-closing-owner">{owner}</p> : null}
              </div>
              <div className="catalog-closing-contacts">
                {contacts.map((line, i) => (
                  <p
                    key={line}
                    className={
                      i === 0
                        ? "catalog-closing-phone"
                        : "catalog-closing-line"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
              {spread.bullets ? (
                <ul className="catalog-bullets catalog-bullets--closing">
                  {spread.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              <PageFooter page={page} total={total} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}