---
title: "The 9-File JSON-LD Package I Deliver to Every Service Business"
description: "A breakdown of the schema markup stack that gets service businesses into AI Overviews and rich results — delivered as a single dev-ready package."
date: 2026-04-28
tags: ["Schema", "Technical SEO"]
readingTime: "6 min read"
---

Most service businesses have zero structured data. The ones that do usually have a single LocalBusiness schema copy-pasted from a generator — missing half the fields, not validated, and definitely not covering the full site structure.

Here's the 9-file package I deliver on every schema engagement.

## Why a Package, Not a Script

A single monolithic schema file is hard to maintain and usually wrong in at least two places. Breaking it into files by type makes it easier to update individual components, validate each one independently, and hand off to a developer without confusion.

## The 9 Files

**1. Organization.json** — Company-level entity with name, URL, logo, social profiles, and contact info. This is the foundation everything else references.

**2. LocalBusiness.json** — Extends Organization with geo coordinates, hours, service area, and price range. Critical for map pack eligibility.

**3. Service.json** (one per core service) — Individual service pages get their own schema with description, provider, area served, and offer.

**4. FAQPage.json** — Pulls from the FAQ section on each page. FAQ schema is still one of the most reliable rich result triggers.

**5. BreadcrumbList.json** — Site navigation structure. Helps Google understand page hierarchy and displays in SERPs.

**6. Article.json** (for blog posts) — Author, date published, date modified, headline, description.

**7. WebSite.json** — Enables the sitelinks search box and establishes the canonical site entity.

**8. WebPage.json** — Page-level schema applied to each URL. Ties page content back to the Organization entity.

**9. wordpress-implementation.php** — All of the above, formatted for WordPress `wp_head` injection. No plugin required.

## Validation Before Handoff

Every file gets run through Google's Rich Results Test before delivery. If it doesn't validate, it doesn't ship. I've seen too many "schema packages" that fail validation on half the fields.

The goal is zero errors, zero warnings.
