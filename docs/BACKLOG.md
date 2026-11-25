# Product Backlog

This file is the project Kanban board. Move a card by changing its **Status** and placing it in the matching column. Items in **Backlog** are ideas only; move one to **Ready** when it is approved and sufficiently specified. Do not start a Backlog card.

## Board

| Backlog | Ready | In Progress | Blocked | Done |
| --- | --- | --- | --- | --- |
| [B-001 Secure legacy user-management endpoints](#b-001-secure-legacy-user-management-endpoints)<br>Priority: P1<br><br>[B-002 Require deployment-safe JWT configuration](#b-002-require-deployment-safe-jwt-configuration)<br>Priority: P1<br><br>[B-003 Implement and verify online payment providers](#b-003-implement-and-verify-online-payment-providers)<br>Priority: P2<br><br>[B-004 Define and test critical API behavior](#b-004-define-and-test-critical-api-behavior)<br>Priority: P2 | — | — | — | — |

`—` means there are currently no cards in that column. Keep every card in exactly one column and make its card status agree with its board position.

## Workflow

| Status | Meaning | Entry/exit rule |
| --- | --- | --- |
| **Backlog** | Candidate work, not approved for implementation | Move to Ready only when explicitly selected and open decisions are resolved |
| **Ready** | Approved and sufficiently specified | Move to In Progress when implementation starts |
| **In Progress** | Actively being implemented | Move to Blocked if a decision/dependency stops work; move to Done when all acceptance criteria pass |
| **Blocked** | Cannot proceed | Record the blocking reason and decision/dependency needed; return to Ready when resolved |
| **Done** | Acceptance criteria implemented and verified | Keep a brief completion note and applicable validation evidence |

Priorities: **P1** high, **P2** medium, **P3** low. Priority does not imply approval. Link every card to its detailed feature/security spec. Completed behavior should not be reimplemented unless a new card explicitly changes it.

## Cards

### B-001 Secure legacy user-management endpoints

**Status:** Backlog
**Priority:** P1
**Spec:** [SECURITY.md](SECURITY.md)
**Owner:** Unassigned

**Goal:** Ensure generic user create/list/read/update/delete operations cannot expose or alter accounts without an explicit authorized role and ownership policy.

**Acceptance criteria:**
- [ ] Define who may use each generic user-management operation.
- [ ] Apply backend authentication/authorization or remove unused routes.
- [ ] Never return password hashes or allow generic updates to bypass role rules.
- [ ] Add tests for allowed and denied access, including cross-account access.

### B-002 Require deployment-safe JWT configuration

**Status:** Backlog
**Priority:** P1
**Spec:** [SECURITY.md](SECURITY.md)
**Owner:** Unassigned

**Goal:** Make production startup fail clearly when signing credentials are absent or unsafe, without relying on a built-in secret fallback.

**Acceptance criteria:**
- [ ] Validate required JWT configuration at startup.
- [ ] Keep local setup documented using a non-production placeholder.
- [ ] Confirm tokens remain verifiable only with the configured secret.

### B-003 Implement and verify online payment providers

**Status:** Backlog
**Priority:** P2
**Spec:** [features/orders-and-payments.md](features/orders-and-payments.md)
**Owner:** Unassigned

**Goal:** If eSewa and Khalti are intended to accept real payments, integrate provider initiation and server-side verification rather than treating a selected method or status field as proof of payment.

**Acceptance criteria:**
- [ ] Specify provider callback/webhook and order-state behavior.
- [ ] Verify payment server-to-server before marking an order paid.
- [ ] Make callbacks idempotent and reject mismatched amount/order references.
- [ ] Add success, failure, replay, and cancellation tests.

### B-004 Define and test critical API behavior

**Status:** Backlog
**Priority:** P2
**Spec:** [ARCHITECTURE.md](ARCHITECTURE.md)
**Owner:** Unassigned

**Goal:** Establish repeatable automated coverage for security boundaries and core purchase lifecycle behavior.

**Acceptance criteria:**
- [ ] Select test runner and database strategy.
- [ ] Cover authentication, restaurant scoping, price recomputation, order transitions, and one-review-per-order.
- [ ] Add a documented test command for each application.

## Add a card

Copy this template, assign a unique ID, and add its linked title to exactly one board column.

```markdown
### B-XXX <Imperative title>

**Status:** Backlog
**Priority:** P1 | P2 | P3
**Spec:** TODO: `path/to/spec.md`
**Owner:** Unassigned

**Goal:** <User-visible outcome>

**Acceptance criteria:**
- [ ] <Observable, verifiable result>
```

For **Blocked** cards, add `**Blocked by:** <specific decision, dependency, or issue>` and state what will unblock the work. For **Done** cards, check every acceptance criterion and add `**Completed:** <date and relevant checks>`. Do not delete completed cards; keep them as the record of work already done.
