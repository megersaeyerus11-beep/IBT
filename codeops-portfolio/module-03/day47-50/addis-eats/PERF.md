# PERF.md — Performance Report

## 1. Purpose

This document describes the performance evaluation of the Addis Eats application.

The goal is to measure the application's performance before and after optimization using Lighthouse.

## 2. Measurement Environment

- Application: Addis Eats
- Framework: Next.js
- Measurement tool: Google Lighthouse
- Environment: Deployed production website
- Test mode: Mobile and Desktop

## 3. Performance Comparison

The following table records the baseline and final deployed performance measurements.

### Column 1: Baseline

Record the original performance measurements before optimization.

### Column 2: Final Deployed Build

Record the performance measurements after optimization and deployment.

| Performance Metric | Baseline | Final Deployed Build |
|---|---|---|
| Performance Score | Pending | Pending |
| Accessibility Score | Pending | Pending |
| Best Practices Score | Pending | Pending |
| SEO Score | Pending | Pending |
| First Contentful Paint (FCP) | Pending | Pending |
| Largest Contentful Paint (LCP) | Pending | Pending |
| Total Blocking Time (TBT) | Pending | Pending |
| Cumulative Layout Shift (CLS) | Pending | Pending |

## 4. Optimization Techniques

The following optimization techniques are used or evaluated in the project:

### Image Optimization
- Use optimized images.
- Avoid unnecessarily large image files.
- Use Next.js Image where appropriate.

### Font Optimization
- Use optimized fonts.
- Avoid unnecessary external font requests.

### JavaScript Optimization
- Keep client components limited to interactive features.
- Use server components for server-side rendering.
- Avoid unnecessary JavaScript.

### Data Fetching
- Use appropriate caching strategies.
- Avoid unnecessary repeated API requests.
- Use pagination where appropriate.

### Rendering Optimization
- Use static rendering for suitable public pages.
- Use dynamic rendering for personalized pages.
- Avoid unnecessary component re-rendering.

## 5. Performance Testing Procedure

1. Deploy the production application.
2. Open the deployed website.
3. Open Chrome Developer Tools.
4. Select Lighthouse.
5. Run a Mobile performance test.
6. Run a Desktop performance test.
7. Record the actual measurements.
8. Compare the baseline and final results.

## 6. Performance Conclusion

The performance report compares the original application with the optimized deployed application.

The final measurements will help identify improvements and remaining performance issues.

All reported scores and timings must come from actual Lighthouse test results.