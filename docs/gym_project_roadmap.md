# 🏋️ Gym Management Platform - Project Documentation

This document contains the complete project breakdown, estimation, and roadmap for the Gym Management Platform built with **Payload CMS**, **TypeScript**, and **PostgreSQL**.

---

## 📊 Work Breakdown & Estimation

| Categoria | User Story | Micro-task | Descrizione Tecnica | Ore (h) | Priorità |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Setup** | Infrastruttura Base | Inizializzazione Progetto | Setup Payload 3.0, TypeScript e Docker per PostgreSQL. | 2 | Alta |
| **Setup** | Infrastruttura Base | Schema Anagrafica Soci | Definizione Collection `Members` (campi base + validation). | 3 | Alta |
| **Setup** | Infrastruttura Base | Schema Piani/Quote | Definizione Collection `Plans` (prezzi, durate, descrizioni). | 2 | Alta |
| **Setup** | Infrastruttura Base | Access Control | Configurazione permessi Admin/Staff nel CMS. | 2 | Media |
| **Backend** | Gestione Iscritti | Relazione Socio-Piano | Implementazione campo `Relationship` tra socio e abbonamento. | 3 | Alta |
| **Backend** | Gestione Iscritti | Calcolo Scadenze | Hook `afterRead` per calcolare lo stato (Attivo/Scaduto). | 4 | Alta |
| **Backend** | Gestione Iscritti | Gestione Documentale | Setup upload PDF e data scadenza certificato medico. | 3 | Media |
| **Backend** | Gestione Iscritti | Filtri e Ricerca | Customizzazione della List View del Backoffice. | 2 | Bassa |
| **Frontend** | Front-page | Integrazione Frontend | Setup Next.js e fetch dati tramite Local API di Payload. | 4 | Alta |
| **Frontend** | Front-page | Hero & Servizi | UI della Home Page con presentazione corsi e struttura. | 5 | Media |
| **Frontend** | Front-page | Listino Prezzi | Pagina dinamica che mostra i piani attivi dal CMS. | 3 | Media |
| **Frontend** | Front-page | Form di Contatto | Integrazione Form -> Collection `Inquiries` per lead. | 3 | Media |
| **Business** | Rinnovi & Logica | Registro Pagamenti | Creazione Collection `Payments` per lo storico transazioni. | 4 | Alta |
| **Business** | Rinnovi & Logica | Logica di Rinnovo | Hook per aggiornare la data fine abbonamento al pagamento. | 4 | Alta |
| **Business** | Rinnovi & Logica | Dashboard KPI | Creazione di componenti UI custom per statistiche iscritti. | 3 | Bassa |
| **Quality** | Testing & Deploy | Testing & QA | Debugging logiche di rinnovo e compatibilità browser. | 5 | Alta |
| **Quality** | Testing & Deploy | Deploy | Configurazione CI/CD e messa online (VPS o PaaS). | 3 | Alta |
| **TOTALE** | | | | **55** | |

---

## 📅 Project Roadmap

### Phase 1: Foundation & Data Architecture (Days 1–3)
* PostgreSQL & Payload CMS initialization.
* Core Collections (`Members`, `Plans`, `Users`) definition.
* Access Control configuration.

### Phase 2: Backoffice "The Engine" (Days 4–7)
* Automated Status Logic (Active/Expired hooks).
* Document Management (Medical Certificates).
* Staff UI customization and advanced filtering.

### Phase 3: Public Front-end & Lead Gen (Days 8–11)
* Next.js frontend development.
* Dynamic Pricing & Service presentation.
* Lead capture forms integrated with CMS.

### Phase 4: Financial Logic & QA (Days 12–14)
* `Payments` collection and renewal logic hooks.
* Admin Dashboard with KPI charts.
* End-to-End testing and Production Deployment.

---

## ✅ Definition of Done (DoD)
- [ ] TypeScript types are strictly defined (no `any`).
- [ ] Feature tested against requirements.
- [ ] UI is responsive on mobile and desktop.
- [ ] Documentation updated (ENV variables, setup guides).
- [ ] Code reviewed and pushed to main branch.
