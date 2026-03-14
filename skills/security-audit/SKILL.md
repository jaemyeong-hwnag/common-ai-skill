---
name: security-audit
description: Comprehensive security review — secrets exposure, dependency vulnerabilities, code injection risks, and infrastructure config.
---

## Scan Targets

1. **secrets**: VCS history + source files for hardcoded credentials + verify secret/key/log files excluded from VCS
2. **deps**: run project's vulnerability scanner
3. **code**: injection(query,command,template) + path traversal + missing input validation at boundaries + error exposure(stack traces,internal paths) + credential logging
4. **infra**: unnecessary port exposure + default/weak credentials + secrets not via env vars

## Severity
<criteria>
HIGH(secret exposure, injection) → fix immediately
MEDIUM(vulnerable dep, error exposure) → fix this cycle
LOW(potential risk, best-practice violation) → next cycle
</criteria>

## Action

fix HIGH issues directly when possible
