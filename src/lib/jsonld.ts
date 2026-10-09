/** Serialise structured data for a <script type="application/ld+json"> without allowing tag injection. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
