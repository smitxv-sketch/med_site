# Project-Specific Rules & Memory

## Chelyabinsk Database (WordPress / ci74.ru)
**CRITICAL RULE: THROTTLE ALL DATABASE QUERIES**
- The hosting provider (Beget) for the Chelyabinsk database has strict firewall/anti-DDoS rules.
- **NEVER** execute massive, unthrottled `SELECT *` queries across large tables.
- **ALWAYS** use chunking (LIMIT/OFFSET), pagination, and artificial delays (e.g., `await new Promise(r => setTimeout(r, 200))`) between queries.
- Failure to do so will result in the AI Agent's IP being blocked (`Access denied`).
- For doctors, use the REST API endpoint (`https://ci74.ru/api/rest.php?action=get_doctors`) instead of direct DB queries.

## Chelyabinsk Data Exploration Plan
- We are iteratively moving data from "Raw Data" into structured entities.
- The master plan, list of tables, and current progress is tracked in: 👉 **`/app/applet/CHEL_PLAN.md`**
- Always refer to this plan before starting work on a new Chelyabinsk entity.
