/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

-                                                                                                  *
-                                    POCKET GUIDE CREATOR                                          *
-                          COMPLETE BUILD SPECIFICATION & TASK PHASES                              *
-                                                                                                  *
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

- PHASE 1: FOUNDATIONAL SETUP & GLOBAL SYSTEM
- GOAL: Establish the project's core structure, design tokens, global styles, and reusable
-       base components. This phase translates the entire "Global system (dark mode)"
-       specification into code.
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

---

## TASK 1.1: PROJECT INITIALIZATION & ROUTING

- ACTION: Set up a new project using the specified stack (e.g., React/Next.js with Tailwind CSS).
- ACTION: Establish the project's routing structure based on the "ROUTING OVERVIEW".
  - SPEC: Create placeholder pages for: `/`, `/create/step/taxa`, `/create/step/region`, `/create/step/name`, `/create/step/layout`, `/create/step/preview`, `/explore`, `/guides`, `/admin`, `/admin/species`, `/admin/images`, `/admin/info-diamonds`, `/admin/pdf`.

---

## TASK 1.2: IMPLEMENT GLOBAL DESIGN TOKENS (CSS VARIABLES)

- ACTION: In a global CSS file, define all specified color tokens as CSS variables.
  - SPEC (Colors):
    - --bg: #0E1412
    - --surface: #111A16
    - --surface-elev: #16221D
    - --border: #27362F
    - --text: #E7F2ED
    - --text-dim: #B5C6BF
    - --text-muted: #8DA79D
    - --primary: #22C55E
    - --primary-600 (hover): #16A34A
    - --primary-700 (active): #15803D
    - --focus: #34D399
    - --warning: #F59E0B
    - --danger: #EF4444
    - --overlay: rgba(0,0,0,0.45)
- ACTION: Define global radius, spacing, and shadow tokens.
  - SPEC (Radius): `12px` for cards/inputs; `9999px` for pills.
  - SPEC (Spacing): Configure an `8px` grid system for spacing (common gaps: 8, 12, 16, 24, 32, 48).
  - SPEC (Shadows):
    - low: `0 1px 1px rgba(0,0,0,.35)`
    - med: `0 6px 20px rgba(0,0,0,.35)`

---

## TASK 1.3: IMPLEMENT GLOBAL TYPOGRAPHY & STYLES

- ACTION: Configure the project's font stack.
  - SPEC: `Inter, ui-sans-serif, system-ui`.
- ACTION: Define the typography scale and weights.
  - SPEC (Weights): Headings `700/600`; body `400/500`.
  - SPEC (Font Sizes): `32, 24, 20, 18, 16, 14`.

---

## TASK 1.4: BUILD GLOBAL REUSABLE COMPONENTS

- ACTION: Create a reusable `Container` component.
  - SPEC: Max width `1200px` (desktop), `100%` on mobile. Responsive padding: `16px` mobile, `24px` tablet, `32px` desktop.
- ACTION: Build the `Button` component with all specified variants.
  - SPEC (Primary): bg `var(--primary)`; text `var(--bg)`; hover bg `var(--primary-600)`; active bg `var(--primary-700)`; disabled state `opacity .5, pointer-events none`.
  - SPEC (Secondary/Ghost): bg transparent; `border: 1px solid var(--border)`; text `var(--text)`; hover bg `var(--surface-elev)`.
- ACTION: Build the `Input` component.
  - SPEC: bg `var(--surface)`; `border: 1px solid var(--border)`; text `var(--text)`; placeholder text color `var(--text-muted)`; focus ring `2px solid var(--focus)`.
- ACTION: Build a base `Card` component.
  - SPEC: bg `var(--surface)`; `border: 1px solid var(--border)`; radius `16px`; padding `16–24px`.
- ACTION: Establish the icon system.
  - SPEC: Default style `stroke 1.5px`, color `var(--text-dim)`. Active icons are `filled`.

---

## TASK 1.5: BUILD GLOBAL LAYOUT PIECES

- ACTION: Build the `TopNav` component for all public pages.
  - SPEC: Height `64px`; bg `var(--surface-elev)`; sticky top; `border-bottom: 1px solid var(--border)`; no blur effect.
  - SPEC (Content): Left side has brand mark (small booklet icon) + "Pocket Guide Creator". Right side has links (Home, Explore, About, Contact), a primary "Create a Guide" CTA, and an auth element (Login/Avatar).
- ACTION: Build the public `Footer` component.
  - SPEC: bg `var(--surface-elev)`; `border-top: 1px solid var(--border)`; padding `32–48px`.
  - SPEC (Content): Links (Privacy Policy, Terms of Service, Contact Us), Social icons (Twitter/X, GitHub, Globe), and centered copyright: "© 2025 Pocket Guide Creator. All rights reserved."

---

## TASK 1.6: ESTABLISH GLOBAL ACCESSIBILITY STANDARDS

- ACTION: Ensure all color combinations meet a contrast ratio of ≥ 4.5:1.
- ACTION: Implement a global CSS rule ensuring all focusable elements show a visible focus ring.
- ACTION: Establish a convention to provide `aria-labels` for all icon-only controls.
- ACTION: Note the requirement for keyboard support in menus, dropdowns, and drag-and-drop for future tasks.

/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

- PHASE 2: PUBLIC-FACING PAGES
- GOAL: Build the static, public-facing marketing and information pages using the components
-       from Phase 1.
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

---

## TASK 2.1: HOME/LANDING PAGE (`/`) - HERO & INTRO

- ACTION: Build the `Hero` section.
  - SPEC: Full-width banner with responsive height (`~520` desktop, `~360` tablet, `~280` mobile).
  - SPEC: Background is a forest illustration darkened with a `linear-gradient` to `var(--overlay)` at 45%.
  - SPEC (Content): Centered-left content within the container.
    - H1: "Welcome to Pocket Guide Creator" (weight 800; sizes `48` desktop, `36` tablet, `28` mobile).
    - Subtitle: "Craft your personalized nature guide. Explore, learn, and connect with the natural world around you."
    - Primary CTA: "Create Your Guide" (large size).
  - SPEC (Animation): Implement subtle fade-in. Parallax on scroll is optional.
- ACTION: Build the "What is a Pocket Guide?" section.
  - SPEC: Two-column layout (stacks on mobile).
  - SPEC (Left): Image of a pocket booklet (rounded `16px`, 3:2 aspect ratio).
  - SPEC (Right): H3 "Discover Nature at Your Fingertips" and a descriptive paragraph.
  - SPEC (Spacing): `56px` top/bottom margin/padding.

---

## TASK 2.2: HOME/LANDING PAGE (`/`) - FEATURES & EXAMPLES

- ACTION: Build the "How It Works" section.
  - SPEC: Three-card grid (3-col desktop, 2-col tablet, 1-col mobile).
  - SPEC (Card): bg `var(--surface)`, `border: 1px solid var(--border)`, radius `16px`, padding `20px`. Contains a 32px circular icon container, an `h5` title, and body text in `var(--text-dim)`.
  - SPEC (Card Titles): "Select Your Region", "Customize Your Guide", "Download and Explore".
  - SPEC (Card Interaction): On hover, the entire card's bg changes to `var(--surface-elev)`, border becomes `1px solid var(--primary)`, and it scales subtly by `1.01`. A focus ring must be visible on keyboard focus.
- ACTION: Build the "Sample Pocket Guides" section.
  - SPEC: H3 title followed by a 3-card grid.
  - SPEC (Card): Contains a 3:4 `object-fit: cover` image with `16px` radius and border, an `h6` title, and a 2-line description in `var(--text-dim)`.
  - SPEC (Card Titles): "Forest Explorer’s Guide", "Mountain Trail Companion", "Coastal Discovery Handbook".
  - SPEC (Card Interaction): On hover, the card raises with `med` shadow and the image brightness increases by 4%. Clicking routes to a placeholder `/guide/:id`.

---

## TASK 2.3: HOME/LANDING PAGE (`/`) - SOCIAL PROOF & PARTNERS

- ACTION: Build the "Testimonials" section.
  - SPEC: H3 title followed by a 3-card grid. Optional carousel on mobile.
  - SPEC (Card): Contains an 80px circular avatar illustration (with alt text), quote text (italicized or with a quote icon), and an attribution line.
  - SPEC (Card Content): Use the exact quotes and attributions provided (e.g., "Sarah, Parent").
- ACTION: Build the "Our Partners" section.
  - SPEC: A row of 4 partner logo tiles (`160–200px` square) with a subtle radial background and `16px` radius.
  - SPEC (Interaction): Hover shows an outline using `var(--border)`. Ensure logos have `aria-labels`.

---

## TASK 2.4: SIMPLE CONTENT PAGES

- ACTION: Build the `About` page (`/about`).
  - SPEC: Smaller hero banner (240h). Content sections for "Mission," "How we build," and "Team" using placeholder illustrations and specified copy. Include a CTA button linking to `/contact`.
- ACTION: Build the `Contact` page (`/contact`).
  - SPEC: Two-column layout. Left side: a form with Name, Email, Topic, Message, and Consent checkbox fields. Right side: support info. The form must have a success state ("Thanks, we’ll be in touch.").

/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

- PHASE 3: THE CREATOR FLOW
- GOAL: Implement the multi-step guide creation process, focusing on user input, validation,
-       and state management.
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

---

## TASK 3.1: CREATOR FLOW SHELL & PROGRESS INDICATOR

- ACTION: Build the shared layout for all `/create/step/*` routes.
- ACTION: Implement the sticky header, which reuses the global nav but shows the profile avatar and a disabled "Create a Guide" CTA.
- ACTION: Implement the secondary top bar containing:
  - A thin progress bar (`8px` height) with `var(--primary)` fill. It must have `aria-valuenow` and `aria-labelledby` attributes.
  - A step label on the left: "Step X of 5: [Page Title]".
- ACTION: Implement the sticky action bar for mobile views, containing "Back" (ghost) and "Next" (primary) buttons. On desktop, these buttons must sit at the bottom-right of the content, not sticky.

---

## TASK 3.2: STEP 1 - SELECT TAXA (`/create/step/taxa`)

- ACTION: Build the page with the title: "Choose the type of species you want to include in your guide."
- ACTION: Create a responsive grid of category cards for: Birds, Butterflies, Mammals, Reptiles, Amphibians, Insects.
- ACTION: Implement card states: `unselected` (bg `var(--surface)`) and `selected` (border `2px solid var(--primary)`, checkmark pill in top-right, subtle glow).
- ACTION: Enable multi-select functionality. Clicking a card toggles its state.
- ACTION: Implement keyboard support: Arrow keys move focus; Space/Enter toggles selection. Optional: 's' key opens a typeahead filter.
- ACTION: Implement validation: "Next" button is disabled until at least one category is selected. Persist selection to a local state store.

---

## TASK 3.3: STEP 2 - SELECT YOUR REGION (`/create/step/region`)

- ACTION: Build the page with the title "Select Your Region" and the specified description.
- ACTION: Implement two dropdown controls: "Select State" (combobox with search) and "Select District" (disabled until a state is chosen).
- ACTION: Integrate a map component (Mapbox GL or Leaflet) with a dark basemap, `16px` radius, and border. Responsive height (`440–520` desktop, `320` tablet, `260` mobile).
- ACTION: Implement map interactions: click to drop/update a marker (in `var(--primary)` color), drag to pan, two-finger zoom on mobile, and an optional geolocate button. If a user clicks a district polygon, auto-populate the dropdowns.
- ACTION: Implement validation: "Next" button is disabled until (State AND District are selected) OR (a map pin is confirmed inside a district).

---

## TASK 3.4: STEP 3 - NAME & BRANDING (`/create/step/name`)

- ACTION: Build the page with the title "Name your guide".
- ACTION: Create the form fields: a text input for "Guide name" (with helper text) and a required file dropzone for "Guide logo".
- ACTION: Build the file dropzone component with all specified states and copy:
  - Idle: dashed border (`2px var(--border)`), bg `var(--surface)`), min height `180px`, headline "Drag and drop...".
  - Drag-over: border `var(--primary)`, bg `rgba(var(--primary), 0.08)`.
  - Uploading: shows a progress bar.
  - Success: shows a preview chip with image, filename, size, and remove/replace buttons.
  - Error: shows a message in `var(--danger)`.
- ACTION: Create an identical dropzone for "Cover image (optional)".
- ACTION: Implement file handling validation: accept `.svg, .png, .jpg, .jpeg`; max 2MB.
- ACTION: Implement form validation: "Next" is disabled until "Guide name" (3–60 chars) and "Logo" are provided.
- ACTION: Implement autosave on change, displaying a "Saved" toast notification.

---

## TASK 3.5: STEP 4 - LAYOUT EDITOR (See Phase 4 for full detail)

- ACTION: Create the placeholder page for the Layout Editor, which will be built in the next phase.

---

## TASK 3.6: STEP 5 - PREVIEW & EXPORT (`/create/step/preview`)

- ACTION: Build the summary card displaying: guide name, logo, cover image preview, region, taxa count, and pages count.
- ACTION: Build the preview pane: paginated page thumbnails on the left, large page preview on the right. The UI is dark, but the simulated page within the preview is on a light sheet for print realism.
- ACTION: Implement the export actions:
  - "Generate PDF" (primary): Shows a "job queued" state with progress. On success, it becomes a "Download PDF" button.
  - "Share link" (ghost): Copies a public view URL to the clipboard.
- ACTION: The status of the PDF job should be surfaced in the Admin > PDF Requests area.

/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

- PHASE 4: THE LAYOUT EDITOR (CREATOR STEP 4)
- GOAL: Implement the complex drag-and-drop interface for arranging species on pages, including
-       full keyboard accessibility.
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

---

## TASK 4.1: LAYOUT EDITOR UI & CANVAS STRUCTURE (`/create/step/layout`)

- ACTION: Build the core layout: a collapsible left sidebar (280px wide, sticky) and a central canvas area.
- ACTION: Populate the canvas with the title "Layout Editor" and instruction "Drag and drop species into the guide layout".
- ACTION: Implement the vertical stack of pages ("Page 1", "Page 2", etc.). Each page is a grid of empty "box" frames with the specified visual styles (recessed, shelf, etc.).
- ACTION: Style the empty box state: a subtle gradient/vignette, placeholder lines in `var(--border)` color, and a `transparent` 2px border.

---

## TASK 4.2: LEFT SIDEBAR - SELECTED SPECIES LIST

- ACTION: Build the sidebar with a search input at the top.
- ACTION: Create the "Selected Species" virtualized list. Each row is `~56px` high, draggable, and contains a 40px thumbnail, name, size pill, and a drag handle icon (⋮⋮).
- ACTION: Implement a context menu on each item with "View details" and "Remove from selection" options.
- ACTION: Display a small checkmark or count badge on items already placed on the canvas.

---

## TASK 4.3: DRAG-AND-DROP (DND) IMPLEMENTATION

- ACTION: Integrate a DnD library supporting keyboard accessibility (e.g., `@dnd-kit/core`).
- ACTION: Implement dragging from the sidebar to the canvas. Valid drop zones (boxes) should highlight with a `2px solid var(--primary)` border and subtle glow.
- ACTION: Implement drop validation based on size rules (Small fits in S/M/L; Medium in M/L; Large in L). On an invalid drop, show a shake animation and a tooltip saying "This box is too small for [Species]".
- ACTION: Implement dragging items between boxes on the canvas. The default behavior is to SWAP contents. A toolbar setting can change this to "confirm before swap".
- ACTION: Implement the full keyboard DnD flow (Tab to focus, Space to lift, Arrows to move, Enter to drop, Esc to cancel).
- ACTION: Implement ARIA live region announcements for screen readers (e.g., "Picked up Robin...", "Dropped in Box 4. Swapped with Daisy.").

---

## TASK 4.4: CANVAS INTERACTIVITY & CONTROLS

- ACTION: When an item is placed, display it as a chip inside the box (thumbnail, name, size badge). On hover/focus, show an overlay with "Replace", "Remove", and "Enlarge preview" buttons.
- ACTION: Build the page controls at the top-right of each page: "Add Page", "Delete Page" (with confirmation modal), "Duplicate Page".
- ACTION: Implement page reordering via a drag handle (keyboard: Page Up/Down).
- ACTION: Build the toolbar at the top-right of the canvas with buttons for "Auto-arrange", "Clear all" (confirm), Undo/Redo, etc.
- ACTION: Implement the "Auto-arrange" logic: packs Large items first, then Medium, then Small, from top-left to bottom-right.
- ACTION: Ensure all layout changes autosave with a "Layout saved" toast.

/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

- PHASE 5: THE ADMIN AREA & USER GUIDES
- GOAL: Build the backend management interface and the authenticated user areas.
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

---

## TASK 5.1: ADMIN SHELL & AUTHENTICATION

- ACTION: Build the main admin layout: 260px fixed left sidebar (bg `var(--surface-elev)`) and a main content area.
- ACTION: Create the sidebar navigation with specified icon+label items. Active nav item has bg `var(--surface)` and a `4px` left accent bar in `var(--primary)`.
- ACTION: Implement role-based access control. Only users with an `admin` role can access `/admin/*` routes.

---

## TASK 5.2: ADMIN - SPECIES LISTS (`/admin/species`)

- ACTION: Build the page with title "Species Lists" and a primary "Upload CSV" button.
- ACTION: Create a virtualized data table with columns: [checkbox], Species Name, Category, Status, Actions.
- ACTION: Style the table: header row bg `var(--surface-elev)`, row hover bg `var(--surface-elev)`.
- ACTION: Implement status pills with specific styles for "Active" and "Inactive".
- ACTION: Implement table utilities: search, filters, pagination, and bulk actions.
- ACTION: Build the "Upload CSV" modal with a dropzone and validation preview based on the specified schema (`species_name`, `category`, etc.).
- ACTION: Build the "Edit species" modal/drawer with all specified fields.

---

## TASK 5.3: ADMIN - OTHER MANAGEMENT PAGES

- ACTION: Build "Image Manager" (`/admin/images`): grid of assets, search/filters, and a details drawer for editing metadata.
- ACTION: Build "Info Diamonds" (`/admin/info-diamonds`): a CRUD interface for managing informational callouts.
- ACTION: Build "PDF Requests" (`/admin/pdf`): a table showing job statuses (Queued, Processing, Completed, Failed) with actions (View log, Retry, Download). The table must auto-refresh when active jobs are present.

---

## TASK 5.4: USER-FACING AUTHENTICATED PAGES

- ACTION: Build the "Explore" page (`/explore`): a grid of public guides with filters for region, taxa, and sorting.
- ACTION: Build the "My Guides" page (`/guides`): a list/grid of the user's guides. Each card shows logo, name, status, and an actions menu (Edit, Preview, Export, Delete). Delete requires typing the guide name to confirm.
- ACTION: Implement the authentication flow (Login/Signup modals or pages).

/**********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************

- PHASE 6: DATA MODELS, API INTEGRATION & FINAL POLISH
- GOAL: Define data structures, connect to the backend, and perform final QA.
  **********************\*\*\*\***********************\*\*\***********************\*\*\*\***********************/

---

## TASK 6.1: FRONT-END DATA MODELS & STATE MANAGEMENT

- ACTION: Define TypeScript interfaces or types for all front-end data models as specified: `Species`, `Guide`, `AssetRef`, `Page`, `Box`, `PDFJob`.
- ACTION: Implement a global state management solution (e.g., Zustand, Redux) with a `guideDraft` store for the creator flow.

---

## TASK 6.2: API INTEGRATION

- ACTION: Create an API client layer to handle all backend communication based on the illustrative endpoints (`GET /api/species`, `PATCH /api/guides/:id`, etc.).
- ACTION: Replace all placeholder data throughout the application with live data from the API.

---

## TASK 6.3: FINAL QA & EDGE CASE HANDLING

- ACTION: Perform a comprehensive QA pass, testing all acceptance criteria listed in the spec.
- ACTION: Test all responsive breakpoints thoroughly.
- ACTION: Handle edge cases: long species names (truncate with ellipsis), offline saving (show a banner), deleting a page with items (show a confirmation).
- ACTION: Implement final "polish" items: toasts, modals, skeletons for loading states, and inline error messages as defined.
- ACTION: Implement non-required but recommended features: 404/500 pages, SEO basics, and a service worker for caching.
