# ScribbleCode React Curriculum — Beta 0.2 Sprint 1

## Educational Architecture & Game Progression Design Document

---

## Table of Contents

1. [Educational Philosophy](#educational-philosophy)
2. [Learning Goals](#learning-goals)
3. [World Design](#world-design)
4. [Curriculum Structure](#curriculum-structure)
5. [Difficulty Curve](#difficulty-curve)
6. [Boss Battles](#boss-battles)
7. [Capstone Project](#capstone-project)
8. [Gamification System](#gamification-system)
9. [Content Architecture](#content-architecture)
10. [Visual Planning](#visual-planning)
11. [Future Extensibility](#future-extensibility)

---

## Educational Philosophy

### Core Principles

**1. Learn by Building**
React is best learned through hands-on creation. Every lesson should result in visible, interactive output. Learners see immediate results from their code, reinforcing the connection between syntax and UI.

**2. Conceptual Scaffolding**
Each concept builds upon previous knowledge. We introduce ideas in isolation first, then combine them progressively. This prevents cognitive overload while ensuring deep understanding.

**3. Pattern Recognition**
React relies heavily on patterns (component composition, state management, hooks). We emphasize recognizing and applying these patterns rather than memorizing APIs.

**4. Debugging as Learning**
Mistakes are opportunities. Challenges include common React pitfalls, teaching learners to read error messages and debug effectively.

**5. Real-World Relevance**
Every concept connects to practical applications. Abstract explanations are paired with concrete examples from actual React development.

### Pedagogical Approach

**Bloom's Taxonomy Integration:**
- **Remember**: Syntax recognition, hook names, JSX rules
- **Understand**: Why React works this way, component lifecycle
- **Apply**: Building components, managing state
- **Analyze**: Comparing approaches, debugging issues
- **Evaluate**: Choosing the right pattern for a scenario
- **Create**: Capstone project combining all concepts

**Spiral Learning:**
Key concepts reappear throughout the curriculum with increasing complexity:
- State appears in basic form, then with objects, arrays, Context, and optimization
- Components start simple, then use props, state, effects, and advanced patterns

---

## Learning Goals

A learner who completes the React path should be able to:

### Foundational Understanding
- ✅ Explain why React exists and what problems it solves
- ✅ Describe the virtual DOM and reconciliation process
- ✅ Understand component-based architecture

### Core Skills
- ✅ Create React applications from scratch
- ✅ Build reusable, composable components
- ✅ Use JSX confidently with proper syntax
- ✅ Pass and validate props between components
- ✅ Manage local component state
- ✅ Handle user events appropriately

### Intermediate Competencies
- ✅ Render dynamic lists with keys
- ✅ Build controlled forms with validation
- ✅ Use useEffect for side effects
- ✅ Fetch and display API data
- ✅ Implement conditional rendering patterns

### Advanced Proficiency
- ✅ Use React Hooks correctly (useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef, custom hooks)
- ✅ Share state across components with Context
- ✅ Navigate between views with React Router
- ✅ Optimize React applications for performance
- ✅ Build complete projects from scratch

### Professional Readiness
- ✅ Read and understand React documentation
- ✅ Debug common React errors
- ✅ Follow React best practices and conventions
- ✅ Make informed decisions about state management
- ✅ Prepare for real-world React development

---

## World Design

The React learning journey takes place in **React Realm**, a hand-drawn world built on notebook paper where code comes to life as interactive doodles.

### World Overview

**World Name:** React Realm  
**Technology:** react  
**Total Regions:** 6  
**Total Chapters:** 18  
**Estimated Total XP:** 6500  
**Estimated Duration:** 25-30 hours  

---

### Region 1: Component Cove

| Property | Value |
|----------|-------|
| **Theme** | Coastal village with component-shaped houses |
| **Visual Identity** | Warm blues and sandy yellows, cottage-style buildings |
| **Learning Objective** | Understand what components are and how to create them |
| **Lesson Count** | 4 lessons |
| **Prerequisites** | JavaScript Fundamentals completion |

**Visual Description:**
A charming coastal village where each house is shaped like a component tree. The shoreline is drawn with wavy blue lines, and sticky-note seagulls fly overhead. Component cottages have JSX windows and props-labeled doors.

**Decorations:**
- Component-shaped houses (Function Cottage, Class Castle)
- JSX signposts pointing to different areas
- Props packages being delivered by doodle mail carriers
- Tree diagram paths showing parent-child relationships

**Boss Battle: The Component Constructor**
A friendly giant builder challenges learners to construct a complete component hierarchy. The boss provides requirements (a profile card with avatar, name, and bio), and learners must build the correct component structure with proper JSX syntax.

**Completion Rewards:**
- XP: 400
- Coins: 150
- Badge: "Component Crafter"
- Unlock: Next region access

---

### Region 2: Props Peninsula

| Property | Value |
|----------|-------|
| **Theme** | Island chain connected by prop bridges |
| **Visual Identity** | Tropical greens and coral pinks, bridge pathways |
| **Learning Objective** | Master passing data between components |
| **Lesson Count** | 4 lessons |
| **Prerequisites** | Component Cove completion |

**Visual Description:**
A series of small islands connected by colorful bridges labeled with prop names. Each island represents a component, and data flows across bridges as animated packages. Palm trees have coconut props hanging from them.

**Decorations:**
- Prop bridges connecting component islands
- Data packages traveling along bridges
- Destructuring docks where props are unpacked
- Children playground where nested content plays

**Boss Battle: The Prop Gatekeeper**
A mystical guardian stands at the peninsula exit, demanding learners demonstrate prop mastery. The challenge involves fixing a broken component family where props are passed incorrectly, children aren't rendered, and destructuring fails.

**Completion Rewards:**
- XP: 450
- Coins: 175
- Badge: "Prop Professor"
- Unlock: PropTypes library access

---

### Region 3: State Station

| Property | Value |
|----------|-------|
| **Theme** | Bustling train station with state signals |
| **Visual Identity** | Industrial grays with vibrant signal lights (red/green) |
| **Learning Objective** | Understand and manage component state |
| **Lesson Count** | 5 lessons |
| **Prerequisites** | Props Peninsula completion |

**Visual Description:**
A busy train station where state changes are represented by signal lights switching colors. Trains arrive and depart based on state updates. The station master (useState hook) controls everything from a central tower.

**Decorations:**
- State signal lights changing colors
- Hook Tower with useState controlling signals
- Event ticket booths for user interactions
- Platform displays showing current state values
- Re-render trains arriving when state changes

**Boss Battle: The State Master**
The station's automated system malfunctions, and learners must fix multiple state-related bugs: counters that don't update, toggles stuck in one state, forms that don't capture input. Success requires demonstrating proper setState patterns.

**Completion Rewards:**
- XP: 550
- Coins: 200
- Badge: "State Conductor"
- Unlock: Event handling tools

---

### Region 4: Effects Forest

| Property | Value |
|----------|-------|
| **Theme** | Enchanted forest with effect creatures |
| **Visual Identity** | Deep purples and mystical greens, glowing elements |
| **Learning Objective** | Handle side effects with useEffect |
| **Lesson Count** | 5 lessons |
| **Prerequisites** | State Station completion |

**Visual Description:**
A mysterious forest where magical creatures represent different effects. API birds fly in with data scrolls. Cleanup spirits appear when components unmount. Dependency trees show which effects trigger when.

**Decorations:**
- Effect creatures that activate on render
- API birds delivering data from the cloud mountains
- Cleanup brooms sweeping up after unmounts
- Dependency vines connecting related values
- Mount/unmount seasonal changes

**Boss Battle: The Effect Elder**
An ancient tree spirit tests understanding of the effect lifecycle. Learners must configure effects correctly: fetch data on mount, update on dependency changes, cleanup subscriptions, and avoid infinite loops.

**Completion Rewards:**
- XP: 600
- Coins: 225
- Badge: "Effect Explorer"
- Unlock: Async operation capabilities

---

### Region 5: Context Castle

| Property | Value |
|----------|-------|
| **Theme** | Royal castle with context chambers |
| **Visual Identity** | Regal purples and golds, throne room aesthetics |
| **Learning Objective** | Share state globally with Context API |
| **Lesson Count** | 4 lessons |
| **Prerequisites** | Effects Forest completion |

**Visual Description:**
A grand castle where the Provider sits on the throne at the top, broadcasting context down through the castle halls. Consumer rooms tap into the context stream. Prop drilling tunnels run beneath but are marked "deprecated."

**Decorations:**
- Provider throne broadcasting golden context waves
- Consumer chambers receiving context
- useContext hooks as messenger birds
- Reducer scribes updating global state scrolls
- Avoided prop drilling dungeon passages

**Boss Battle: The Context King**
The royal court has a theming crisis - every component needs access to the theme, user, and settings. Learners must implement a complete context system, avoiding prop drilling while maintaining clean provider structure.

**Completion Rewards:**
- XP: 650
- Coins: 250
- Badge: "Context Counselor"
- Unlock: Advanced state patterns

---

### Region 6: Router Riverlands

| Property | Value |
|----------|-------|
| **Theme** | River network with navigation boats |
| **Visual Identity** | Flowing blues and path-finding greens |
| **Learning Objective** | Navigate multi-page applications |
| **Lesson Count** | 4 lessons |
| **Prerequisites** | Context Castle completion |

**Visual Description:**
A winding river system where boats navigate between page islands. Route signs mark different paths. The navigation compass helps users move between views. Protected route gates require authentication tokens.

**Decorations:**
- Route boats sailing between pages
- Navigation compass showing current location
- Link bridges connecting routes
- Param ports accepting URL parameters
- Protected gate checkpoints

**Boss Battle: The Router Captain**
The river navigation system needs building from scratch. Learners create a multi-page application with nested routes, protected routes, dynamic parameters, and programmatic navigation.

**Completion Rewards:**
- XP: 700
- Coins: 275
- Badge: "Route Navigator"
- Unlock: Capstone Project access

---

## Curriculum Structure

### Chapter Sequence Overview

```
React Realm Journey Map:
├── World 1: React Fundamentals
│   ├── Chapter 1: Component Cove (4 lessons)
│   ├── Chapter 2: Props Peninsula (4 lessons)
│   └── Boss Battle: Component & Props Challenge
│
├── World 2: Interactive React
│   ├── Chapter 3: State Station (5 lessons)
│   ├── Chapter 4: Events & Forms (4 lessons)
│   └── Boss Battle: Interactive App Challenge
│
├── World 3: Advanced React Patterns
│   ├── Chapter 5: Effects Forest (5 lessons)
│   ├── Chapter 6: Lists & Keys (3 lessons)
│   └── Boss Battle: Dynamic Data Challenge
│
├── World 4: React Hooks Mastery
│   ├── Chapter 7: useContext & useReducer (4 lessons)
│   ├── Chapter 8: Custom Hooks (3 lessons)
│   └── Boss Battle: Hooks Integration Challenge
│
├── World 5: State Management & Routing
│   ├── Chapter 9: Context Castle (4 lessons)
│   ├── Chapter 10: Router Riverlands (4 lessons)
│   └── Boss Battle: Full App Navigation Challenge
│
└── World 6: Optimization & Capstone
    ├── Chapter 11: Performance & Optimization (4 lessons)
    ├── Chapter 12: Capstone Project (5 milestones)
    └── Final Boss: Complete Application Build
```

---

### Detailed Chapter Breakdown

#### World 1: React Fundamentals

**Chapter 1: Welcome to Components**
- *Learning Outcomes:*
  - Explain what React is and why it exists
  - Create functional components
  - Understand JSX syntax and rules
  - Render components to the DOM
  
- *Lesson Sequence:*
  1. Why React? - The Problem React Solves
  2. Your First Component - Function Basics
  3. JSX Unveiled - HTML in JavaScript
  4. Rendering React - Mounting to DOM

- *Dependencies:* JavaScript fundamentals (functions, objects, arrays)
- *Mini Challenges:* 
  - Convert HTML to JSX
  - Fix JSX syntax errors
  - Create 3 different components
- *Region Completion Project:* Personal greeting card component

---

**Chapter 2: Props - Passing Data**
- *Learning Outcomes:*
  - Pass props to components
  - Access props inside components
  - Destructure props elegantly
  - Render children content
  - Validate props with PropTypes

- *Lesson Sequence:*
  1. Props Basics - Sending Data Down
  2. Props Destructuring - Clean Access
  3. Children Prop - Nested Content
  4. PropTypes - Type Validation

- *Dependencies:* Chapter 1 completion, JavaScript objects
- *Mini Challenges:*
  - Pass multiple props correctly
  - Fix prop type mismatches
  - Create reusable card component
- *Region Completion Project:* Product card catalog with props

---

#### World 2: Interactive React

**Chapter 3: State - Memory for Components**
- *Learning Outcomes:*
  - Understand what state is
  - Use useState hook
  - Update state correctly
  - Avoid state mutations

- *Lesson Sequence:*
  1. What is State? - Component Memory
  2. useState Hook - Declaring State
  3. Updating State - setState Patterns
  4. State with Objects - Complex Data
  5. State with Arrays - List Management

- *Dependencies:* Chapters 1-2, JavaScript arrays/objects
- *Mini Challenges:*
  - Build a counter
  - Toggle boolean states
  - Update object properties immutably
- *Region Completion Project:* Interactive quiz tracker

---

**Chapter 4: Events & Forms**
- *Learning Outives:*
  - Handle click events
  - Process form submissions
  - Create controlled inputs
  - Validate form data

- *Lesson Sequence:*
  1. Event Handling - onClick Basics
  2. Form Events - onSubmit Handling
  3. Controlled Inputs - Binding State
  4. Form Validation - Error States

- *Dependencies:* Chapter 3, JavaScript events
- *Mini Challenges:*
  - Button click counter
  - Simple contact form
  - Input validation feedback
- *Region Completion Project:* Registration form with validation

---

#### World 3: Advanced React Patterns

**Chapter 5: Effects - Side Effects Management**
- *Learning Outcomes:*
  - Understand side effects
  - Use useEffect hook
  - Manage dependencies
  - Cleanup effects

- *Lesson Sequence:*
  1. Side Effects Explained - When Code Runs
  2. useEffect Basics - Running After Render
  3. Dependencies Array - Controlling Execution
  4. Cleanup Functions - Preventing Leaks
  5. Fetching Data - API Integration

- *Dependencies:* Chapters 1-4, JavaScript Promises/async
- *Mini Challenges:*
  - Log on component mount
  - Subscribe to events with cleanup
  - Fetch and display data
- *Region Completion Project:* Weather widget with API

---

**Chapter 6: Lists & Conditional Rendering**
- *Learning Outcomes:*
  - Render arrays dynamically
  - Use keys correctly
  - Implement conditional logic
  - Filter and map data

- *Lesson Sequence:*
  1. Mapping Arrays - List Rendering
  2. Keys Explained - Identity Matters
  3. Conditional Rendering - If Logic in JSX
  4. Filter & Display - Dynamic Lists

- *Dependencies:* Chapters 1-3, JavaScript array methods
- *Mini Challenges:*
  - Render todo list
  - Fix missing key warnings
  - Show/hide based on conditions
- *Region Completion Project:* Task manager with filtering

---

#### World 4: React Hooks Mastery

**Chapter 7: Advanced Hooks**
- *Learning Outcomes:*
  - Share state with useContext
  - Manage complex state with useReducer
  - Access DOM with useRef
  - Memoize values with useMemo

- *Lesson Sequence:*
  1. useContext - Global State Access
  2. useReducer - Complex State Logic
  3. useRef - DOM & Mutable Values
  4. useMemo - Expensive Calculations

- *Dependencies:* Chapters 1-5, JavaScript reduce function
- *Mini Challenges:*
  - Create theme context
  - Implement counter with reducer
  - Focus input with ref
- *Region Completion Project:* Theme-switchable dashboard

---

**Chapter 8: Custom Hooks**
- *Learning Outcomes:*
  - Extract logic into custom hooks
  - Share reusable functionality
  - Follow hooks naming conventions
  - Test custom hooks

- *Lesson Sequence:*
  1. Why Custom Hooks? - Code Reuse
  2. Creating Custom Hooks - Extraction
  3. Common Patterns - useFetch, useToggle
  4. Sharing Hooks - Module Exports

- *Dependencies:* Chapter 7, JavaScript functions/modules
- *Mini Challenges:*
  - Create useLocalStorage hook
  - Build useFetch hook
  - Refactor duplicate logic
- *Region Completion Project:* Custom hooks library

---

#### World 5: State Management & Routing

**Chapter 9: Context Deep Dive**
- *Learning Outcomes:*
  - Create context providers
  - Consume context in components
  - Avoid unnecessary re-renders
  - Structure context architecture

- *Lesson Sequence:*
  1. Creating Context - Provider Setup
  2. Consuming Context - useContext Hook
  3. Multiple Contexts - Composition
  4. Context Best Practices - Performance

- *Dependencies:* Chapters 7-8
- *Mini Challenges:*
  - User authentication context
  - Multi-context provider tree
  - Optimize context updates
- *Region Completion Project:* Auth-protected app shell

---

**Chapter 10: React Router**
- *Learning Outcomes:*
  - Set up React Router
  - Define routes
  - Navigate programmatically
  - Handle route parameters
  - Protect routes

- *Lesson Sequence:*
  1. Router Setup - BrowserRouter
  2. Route Definitions - Path Matching
  3. Navigation Links - Link Component
  4. Route Params - Dynamic URLs
  5. Protected Routes - Authentication

- *Dependencies:* Chapters 1-9, URL basics
- *Mini Challenges:*
  - Create multi-page navigation
  - Pass params via URL
  - Guard protected pages
- *Region Completion Project:* Blog with routing

---

#### World 6: Optimization & Capstone

**Chapter 11: Performance & Optimization**
- *Learning Outcomes:*
  - Identify performance issues
  - Use React.memo for components
  - Memoize callbacks with useCallback
  - Lazy load components
  - Profile React applications

- *Lesson Sequence:*
  1. Performance Basics - Why Optimize
  2. React.memo - Prevent Re-renders
  3. useCallback - Stable References
  4. Code Splitting - Lazy Loading
  5. DevTools Profiler - Finding Bottlenecks

- *Dependencies:* All previous chapters
- *Mini Challenges:*
  - Memoize expensive component
  - Prevent callback re-creation
  - Lazy load heavy component
- *Region Completion Project:* Optimized image gallery

---

**Chapter 12: Capstone Project**
- *Learning Outcomes:*
  - Plan a complete React application
  - Implement all learned concepts
  - Debug and test independently
  - Deploy a React application

- *Project Milestones:*
  1. Project Planning - Requirements & Design
  2. Component Architecture - Structure Setup
  3. State Management - Implementation
  4. Routing & Navigation - Multi-page Flow
  5. Polish & Deploy - Final Touches

- *Dependencies:* All chapters completed
- *Mini Challenges:* Built into milestones
- *Final Project:* E-commerce product browser

---

## Difficulty Curve

### Progressive Complexity Model

```
Difficulty Scale (1-10):

Chapter 1: 1-2 (Gentle Introduction)
  - Concepts: Components, JSX
  - Cognitive Load: Low
  - Support Level: High (guided examples)

Chapter 2: 2-3 (Building Confidence)
  - Concepts: Props, children
  - Cognitive Load: Low-Medium
  - Support Level: High

Chapter 3: 3-4 (First Challenge)
  - Concepts: State, useState
  - Cognitive Load: Medium
  - Support Level: Medium-High

Chapter 4: 4-5 (Interaction)
  - Concepts: Events, forms
  - Cognitive Load: Medium
  - Support Level: Medium

Chapter 5: 5-6 (Complexity Increases)
  - Concepts: useEffect, async
  - Cognitive Load: Medium-High
  - Support Level: Medium

Chapter 6: 5-6 (Pattern Application)
  - Concepts: Lists, conditionals
  - Cognitive Load: Medium
  - Support Level: Medium

Chapter 7: 6-7 (Advanced Concepts)
  - Concepts: Multiple hooks
  - Cognitive Load: High
  - Support Level: Medium-Low

Chapter 8: 7-8 (Abstraction)
  - Concepts: Custom hooks
  - Cognitive Load: High
  - Support Level: Medium-Low

Chapter 9: 7-8 (Architecture)
  - Concepts: Context patterns
  - Cognitive Load: High
  - Support Level: Low-Medium

Chapter 10: 7-8 (Integration)
  - Concepts: Routing, auth
  - Cognitive Load: High
  - Support Level: Low-Medium

Chapter 11: 8-9 (Optimization)
  - Concepts: Performance tuning
  - Cognitive Load: Very High
  - Support Level: Low

Chapter 12: 9-10 (Mastery Demonstration)
  - Concepts: Everything combined
  - Cognitive Load: Peak
  - Support Level: Minimal (independent work)
```

### Prerequisite Knowledge Matrix

| Chapter | Required JS Concepts | Required React Concepts |
|---------|---------------------|------------------------|
| 1 | Functions, objects, arrays | None |
| 2 | Object properties, spread operator | Components, JSX |
| 3 | Arrays, objects, immutability | Components, props |
| 4 | Event listeners, form data | Components, state |
| 5 | Promises, async/await, closures | State, events |
| 6 | Array.map, array.filter | State, components |
| 7 | Reduce, module imports | useState, useEffect |
| 8 | Higher-order functions, closures | All hooks basics |
| 9 | Object composition | useContext basics |
| 10 | URL structure, HTTP | Components, context |
| 11 | Performance concepts | All React concepts |
| 12 | All JavaScript | All React concepts |

### Support Mechanisms by Difficulty

**Easy (1-3):**
- Step-by-step guided code
- Fill-in-the-blank challenges
- Multiple choice concept checks
- Immediate feedback on errors

**Medium (4-6):**
- Partially completed examples
- Debugging exercises
- Open-ended mini-projects
- Hint system available

**Hard (7-8):**
- Minimal scaffolding
- Multi-step problems
- Requires planning
- Hints cost coins

**Expert (9-10):**
- No scaffolding
- Real-world scenarios
- Multiple valid solutions
- Self-directed debugging

---

## Boss Battles

Boss battles are cumulative challenges requiring synthesis of multiple concepts. They emphasize application over memorization.

### Boss Battle 1: The Component Architect
**Location:** End of Region 1 (Props Peninsula)  
**Concepts Tested:** Components, JSX, Props, Children  

**Scenario:**
The mayor of Component Cove needs a reusable UI kit for the town website. Learners receive design mockups and must build:
- A Card component accepting title, image, and description props
- A Button component with variant props (primary, secondary)
- A layout using nested components with children

**Success Criteria:**
- All components render correctly
- Props are properly destructured
- Children render in correct locations
- Components are reusable (tested with different props)

**Failure States:**
- Hardcoded values instead of props
- Missing prop types
- Incorrect JSX syntax
- Children not rendered

---

### Boss Battle 2: The State Guardian
**Location:** End of Region 2 (State Station)  
**Concepts Tested:** State, Events, Forms  

**Scenario:**
A game arcade machine is malfunctioning. The State Guardian challenges learners to fix:
- Score counter that doesn't update
- Toggle buttons stuck in one state
- Form that loses input on every keystroke
- Validation that never shows errors

**Success Criteria:**
- Counter increments/decrements correctly
- Toggle switches between states
- Form captures input without losing data
- Validation displays based on state

**Failure States:**
- Direct state mutation
- Missing event handlers
- Uncontrolled inputs
- State updates not triggering re-renders

---

### Boss Battle 3: The Effect Sage
**Location:** End of Region 3 (Effects Forest)  
**Concepts Tested:** useEffect, Dependencies, Cleanup, API  

**Scenario:**
The forest's magical ecosystem is out of balance. Effects are running too often, subscriptions leak memory, and API data never arrives. Learners must:
- Fix an effect that creates infinite loops
- Add proper cleanup for event listeners
- Fetch user data on component mount
- Update data when filters change

**Success Criteria:**
- Effects run only when needed
- Cleanup prevents memory leaks
- Data fetches successfully
- Dependencies are correctly specified

**Failure States:**
- Infinite render loops
- Missing dependency array
- No cleanup on unmount
- Stale closure bugs

---

### Boss Battle 4: The Context Monarch
**Location:** End of Region 4 (Context Castle)  
**Concepts Tested:** Context, useReducer, Custom Hooks  

**Scenario:**
The royal palace has a communication crisis. Messages (state) must flow from throne room to distant towers without prop drilling. Learners must:
- Create a theme context (light/dark mode)
- Implement user authentication context
- Build a custom hook for form handling
- Wire up useReducer for cart management

**Success Criteria:**
- Theme applies globally
- Auth state accessible everywhere
- Custom hook reduces duplication
- Cart state updates correctly

**Failure States:**
- Provider not wrapping consumers
- Context created inside component
- Reducer doesn't handle actions
- Hook violates rules of hooks

---

### Boss Battle 5: The Router Admiral
**Location:** End of Region 5 (Router Riverlands)  
**Concepts Tested:** React Router, Navigation, Protected Routes  

**Scenario:**
The river navigation system needs construction. The Admiral demands a working multi-page application:
- Home page with navigation links
- About and Contact pages
- Dynamic product detail pages (/product/:id)
- Protected dashboard requiring login
- 404 page for unknown routes

**Success Criteria:**
- All routes render correct components
- Navigation works without page reload
- Params extracted from URLs
- Protected routes redirect unauthenticated users
- 404 catches unmatched routes

**Failure States:**
- Page reloads on navigation
- Wrong component on route
- Params not accessible
- Protection easily bypassed

---

### Final Boss: The React Master
**Location:** End of Capstone Project  
**Concepts Tested:** Everything  

**Scenario:**
Build a complete e-commerce product browser from scratch:
- Component architecture with reusable pieces
- Props flowing through component tree
- State for cart, filters, user preferences
- Effects for data fetching and persistence
- Context for global state (theme, auth, cart)
- Router for navigation between pages
- Optimization for smooth performance

**Deliverables:**
1. Product listing page with filtering
2. Product detail page with params
3. Shopping cart with add/remove
4. User authentication flow
5. Theme toggle (light/dark)
6. Responsive, polished UI

**Success Criteria:**
- All features functional
- Clean, maintainable code
- No console errors
- Good performance
- Proper error handling

**Evaluation Rubric:**
- Functionality (40%): Features work correctly
- Code Quality (30%): Clean, organized, follows best practices
- UX/Design (20%): Intuitive, polished interface
- Performance (10%): Efficient renders, no lag

---

## Capstone Project

### Project Title: ShopSwift - E-Commerce Product Browser

### Project Overview
Build a fully functional e-commerce application that demonstrates mastery of React concepts. Users can browse products, filter by category, view details, add to cart, and manage their shopping experience.

### Technical Requirements

**Must Include:**
- ✅ Functional components with hooks
- ✅ Props for component communication
- ✅ State management (useState, useReducer)
- ✅ Context API for global state
- ✅ useEffect for side effects and API calls
- ✅ React Router for navigation
- ✅ Controlled forms (search, checkout)
- ✅ Custom hooks for reusable logic
- ✅ Performance optimizations (memo, useCallback)
- ✅ Error boundaries and error handling

**Features:**

1. **Product Catalog (Home Page)**
   - Grid of product cards
   - Category filter dropdown
   - Search functionality
   - Sort options (price, name)
   - Loading states and error handling

2. **Product Detail Page**
   - Dynamic routing (/product/:id)
   - Product images and description
   - Add to cart button
   - Related products section

3. **Shopping Cart**
   - View cart items
   - Adjust quantities
   - Remove items
   - Calculate totals
   - Persist to localStorage

4. **User Authentication**
   - Login/logout functionality
   - Protected routes (checkout, profile)
   - User context with auth state
   - Mock authentication API

5. **Settings & Preferences**
   - Theme toggle (light/dark)
   - Currency preference
   - Settings persisted via custom hook

6. **Checkout Flow**
   - Multi-step form
   - Form validation
   - Order confirmation page
   - Clear cart on success

### Project Milestones

**Milestone 1: Foundation (Days 1-2)**
- Set up project structure
- Create component folder hierarchy
- Implement basic layout with navigation
- Set up React Router with placeholder pages
- Create mock data for products

*Deliverable:* Navigable skeleton app

---

**Milestone 2: Product Display (Days 3-4)**
- Build ProductCard component
- Create product grid with mapping
- Implement category filtering
- Add search functionality
- Build ProductDetail page with dynamic routing

*Deliverable:* Browse and view products

---

**Milestone 3: Cart System (Days 5-6)**
- Create cart context with useReducer
- Implement add/remove/update quantity
- Build Cart page and Cart icon
- Add localStorage persistence
- Create custom useCart hook

*Deliverable:* Functional shopping cart

---

**Milestone 4: Authentication (Days 7-8)**
- Build auth context
- Create login/register forms
- Implement protected routes
- Add user menu and logout
- Style authenticated vs guest views

*Deliverable:* Working auth system

---

**Milestone 5: Polish & Optimize (Days 9-10)**
- Add theme context
- Implement dark mode
- Optimize with React.memo
- Add loading skeletons
- Error boundaries
- Final testing and bug fixes

*Deliverable:* Production-ready application

---

### Assessment Rubric

| Category | Excellent (4) | Proficient (3) | Developing (2) | Beginning (1) |
|----------|---------------|----------------|----------------|---------------|
| **Components** | Highly reusable, well-structured | Reusable with minor issues | Some duplication | Hardcoded, not reusable |
| **State Management** | Optimal use of hooks/context | Correct state implementation | Some state issues | Major state problems |
| **Routing** | All routes work perfectly | Routes functional | Some routing bugs | Broken navigation |
| **Forms** | Controlled, validated, accessible | Working forms | Some uncontrolled inputs | Non-functional forms |
| **Performance** | Optimized, memoized | Good performance | Minor issues | Noticeable lag |
| **Code Quality** | Clean, documented, organized | Readable code | Some messiness | Disorganized, unclear |

---

### Stretch Goals (Optional)

For learners who finish early or want extra challenge:

1. **API Integration:** Replace mock data with real API (e.g., Fake Store API)
2. **Animations:** Add Framer Motion transitions
3. **Testing:** Write Jest/RTL tests for components
4. **TypeScript:** Convert project to TypeScript
5. **Deployment:** Deploy to Vercel/Netlify with CI/CD

---

## Gamification System

### XP Economy

**Earning XP:**

| Activity | Base XP | Bonus Conditions |
|----------|---------|------------------|
| Complete Lesson | 50 XP | +20 perfect accuracy, +10 first attempt |
| Complete Challenge | 25-50 XP | Based on difficulty |
| Pass Boss Battle | 200 XP | +50 first try, +25 under time limit |
| Complete Chapter | 100 XP | +50 all lessons perfect |
| Complete Region | 250 XP | +100 all chapters mastered |
| Daily Streak | 10 XP/day | Doubles at 7 days |
| Help Community | 15 XP | Per helpful answer |

**Total Available XP:** ~6,500 XP for full completion

---

### Coin System

**Earning Coins:**

| Activity | Coins |
|----------|-------|
| Complete Lesson | 15 |
| Complete Challenge | 10-25 |
| Pass Boss Battle | 75 |
| Complete Chapter | 50 |
| Complete Region | 100 |
| Achievement Unlocked | 50-200 |
| Daily Login | 5 |

**Spending Coins:**

| Item | Cost |
|------|------|
| Hint (basic) | 10 coins |
| Hint (advanced) | 25 coins |
| Skip Challenge | 50 coins |
| Bonus Practice Set | 100 coins |
| Cosmetic Items | 200-500 coins |
| Early Boss Access | 150 coins |

---

### Achievements

**Progress Achievements:**

| ID | Name | Description | XP | Coins | Rarity |
|----|------|-------------|-----|-------|--------|
| react-first-component | First Component | Create your first React component | 50 | 25 | Common |
| react-prop-master | Prop Master | Pass props correctly 10 times | 100 | 50 | Uncommon |
| react-state-wizard | State Wizard | Complete State Station without hints | 150 | 75 | Rare |
| react-effect-sage | Effect Sage | Master all useEffect patterns | 200 | 100 | Rare |
| react-context-king | Context King | Build a complete context system | 250 | 125 | Epic |
| react-route-explorer | Route Explorer | Navigate all router challenges | 200 | 100 | Rare |
| react-capstone-complete | React Master | Complete the capstone project | 500 | 250 | Legendary |

**Mastery Achievements:**

| ID | Name | Description | XP | Coins | Rarity |
|----|------|-------------|-----|-------|--------|
| react-perfectionist | Perfectionist | 100% on 20 consecutive challenges | 300 | 150 | Epic |
| react-speed-coder | Speed Coder | Complete 5 lessons in record time | 200 | 100 | Rare |
| react-no-hints | Purist | Complete region without any hints | 250 | 125 | Epic |
| react-debugger | Bug Hunter | Fix 25 buggy code snippets | 200 | 100 | Rare |
| react-helper | Mentor | Help 50 community questions | 300 | 150 | Epic |

**Streak Achievements:**

| ID | Name | Description | XP | Coins | Rarity |
|----|------|-------------|-----|-------|--------|
| react-week-warrior | Week Warrior | 7-day learning streak | 200 | 100 | Rare |
| react-month-master | Month Master | 30-day learning streak | 500 | 250 | Epic |
| react-dedicated | Dedicated | 90-day learning streak | 1000 | 500 | Legendary |

---

### Badges

**Skill Badges:**

| ID | Name | Tier | Criteria | XP |
|----|------|------|----------|-----|
| badge-jsx-ninja | JSX Ninja | Bronze | Master JSX syntax | 50 |
| badge-component-crafter | Component Crafter | Silver | Build 20 components | 100 |
| badge-props-professor | Props Professor | Gold | Perfect props challenges | 200 |
| badge-state-conductor | State Conductor | Platinum | Master all state patterns | 350 |
| badge-effect-explorer | Effect Explorer | Diamond | Complete Effects Forest perfectly | 500 |
| badge-react-legend | React Legend | Master | Complete entire React path | 1000 |

**Collection Badges:**

| ID | Name | Tier | Criteria | XP |
|----|------|------|----------|-----|
| badge-hook-collector | Hook Collector | Silver | Use all 7 built-in hooks | 150 |
| badge-pattern-pioneer | Pattern Pioneer | Gold | Complete all pattern challenges | 250 |
| badge-optimization-owl | Optimization Owl | Platinum | Apply all optimization techniques | 400 |

---

### Unlock Conditions

**Progressive Unlocks:**

| Unlock | Requirement |
|--------|-------------|
| Props Peninsula | Complete Component Cove + Boss Battle |
| State Station | Complete Props Peninsula + 80% accuracy |
| Effects Forest | Complete State Station + Boss Battle |
| Context Castle | Complete Effects Forest + All challenges |
| Router Riverlands | Complete Context Castle + Boss Battle |
| Capstone Project | Complete all regions + Final Boss prep |

**Bonus Unlocks:**

| Unlock | Requirement |
|--------|-------------|
| Practice Arena | Complete Chapter 3 |
| Debug Dojo | Complete Chapter 5 |
| Speed Run Mode | Complete all regions once |
| Hardcore Mode | Complete capstone with 90%+ accuracy |

---

### Region Completion Rewards

| Region | XP Bonus | Coins | Badge | Unlock |
|--------|----------|-------|-------|--------|
| Component Cove | 400 | 150 | Component Crafter | Props Peninsula |
| Props Peninsula | 450 | 175 | Prop Professor | State Station |
| State Station | 550 | 200 | State Conductor | Effects Forest |
| Effects Forest | 600 | 225 | Effect Explorer | Context Castle |
| Context Castle | 650 | 250 | Context Counselor | Router Riverlands |
| Router Riverlands | 700 | 275 | Route Navigator | Capstone |

---

### Final Completion Rewards

**Upon completing the entire React path:**

- 🏆 **React Legend Badge** (Master tier)
- 💰 **1000 Bonus Coins**
- ⭐ **2000 Bonus XP**
- 📜 **Certificate of Completion** (downloadable)
- 🎨 **Exclusive Avatar Frame**
- 🔓 **Hardcore Mode Access**
- 🌟 **Leaderboard Eligibility**
- 📫 **Featured in Hall of Fame**

---

## Content Architecture

### JSON Schema Definitions

All content follows these schemas for compatibility with the existing lesson engine.

---

### React World Schema

```json
{
  "$schema": "react-world",
  "type": "object",
  "properties": {
    "id": {"type": "string", "pattern": "^react-world-[0-9]+-[a-z-]+$"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "longDescription": {"type": "string"},
    "order": {"type": "integer", "minimum": 1},
    "technology": {"type": "string", "const": "react"},
    "introduction": {
      "type": "object",
      "properties": {
        "welcomeMessage": {"type": "string"},
        "lore": {"type": "string"},
        "featuredImage": {"type": "string", "format": "uri"}
      }
    },
    "chapterIds": {
      "type": "array",
      "items": {"type": "string", "pattern": "^react-chapter-"}
    },
    "totalXPAvailable": {"type": "integer"},
    "coverImage": {"type": "string", "format": "uri"},
    "theme": {"type": "string"},
    "isAvailable": {"type": "boolean"},
    "tags": {"type": "array", "items": {"type": "string"}},
    "keywords": {"type": "array", "items": {"type": "string"}},
    "category": {"type": "string"},
    "version": {"type": "string"},
    "createdAt": {"type": "string", "format": "date-time"},
    "updatedAt": {"type": "string", "format": "date-time"}
  },
  "required": ["id", "title", "description", "order", "technology", "chapterIds"]
}
```

---

### React Chapter Schema

```json
{
  "$schema": "react-chapter",
  "type": "object",
  "properties": {
    "id": {"type": "string", "pattern": "^react-chapter-[0-9]+-[a-z-]+$"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "longDescription": {"type": "string"},
    "order": {"type": "integer", "minimum": 1},
    "summary": {
      "type": "object",
      "properties": {
        "overview": {"type": "string"},
        "whatYouWillLearn": {
          "type": "array",
          "items": {"type": "string"}
        },
        "estimatedTotalTimeMinutes": {"type": "integer"}
      }
    },
    "lessonIds": {
      "type": "array",
      "items": {"type": "string", "pattern": "^react-lesson-"}
    },
    "completionReward": {
      "type": "object",
      "properties": {
        "xp": {
          "type": "object",
          "properties": {
            "base": {"type": "integer"},
            "perfectBonus": {"type": "integer"},
            "firstAttemptBonus": {"type": "integer"}
          }
        },
        "coins": {
          "type": "object",
          "properties": {
            "base": {"type": "integer"}
          }
        },
        "achievements": {
          "type": "array",
          "items": {"type": "string"}
        }
      }
    },
    "coverImage": {"type": "string", "format": "uri"},
    "theme": {"type": "string"},
    "tags": {"type": "array", "items": {"type": "string"}},
    "keywords": {"type": "array", "items": {"type": "string"}},
    "category": {"type": "string"},
    "version": {"type": "string"},
    "createdAt": {"type": "string", "format": "date-time"},
    "updatedAt": {"type": "string", "format": "date-time"}
  },
  "required": ["id", "title", "description", "order", "lessonIds"]
}
```

---

### React Lesson Schema

```json
{
  "$schema": "react-lesson",
  "type": "object",
  "properties": {
    "id": {"type": "string", "pattern": "^react-lesson-[0-9]+-[0-9]+-[a-z-]+$"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "longDescription": {"type": "string"},
    "lessonType": {"type": "string", "enum": ["reading", "interactive", "challenge", "boss"]},
    "difficulty": {"type": "string", "enum": ["beginner", "intermediate", "advanced"]},
    "estimatedTimeMinutes": {"type": "integer"},
    "learningObjectives": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string"},
          "statement": {"type": "string"},
          "bloomLevel": {"type": "string"},
          "assessed": {"type": "boolean"}
        }
      }
    },
    "rewards": {
      "type": "object",
      "properties": {
        "xp": {
          "type": "object",
          "properties": {
            "base": {"type": "integer"},
            "perfectBonus": {"type": "integer"},
            "firstAttemptBonus": {"type": "integer"},
            "minimum": {"type": "integer"},
            "maximum": {"type": "integer"}
          }
        },
        "coins": {
          "type": "object",
          "properties": {
            "base": {"type": "integer"}
          }
        }
      }
    },
    "missionNarrative": {
      "type": "object",
      "properties": {
        "title": {"type": "string"},
        "story": {"type": "string"},
        "character": {"type": "string"},
        "characterAvatar": {"type": "string", "format": "uri"}
      }
    },
    "sections": {
      "type": "array",
      "items": {
        "oneOf": [
          {"$ref": "#/definitions/textSection"},
          {"$ref": "#/definitions/codeSection"},
          {"$ref": "#/definitions/calloutSection"},
          {"$ref": "#/definitions/markdownSection"},
          {"$ref": "#/definitions/interactiveSection"}
        ]
      }
    },
    "challenges": {
      "type": "array",
      "items": {"$ref": "#/definitions/challenge"}
    },
    "completionConditions": {
      "type": "object",
      "properties": {
        "completeAllSections": {"type": "boolean"},
        "completeAllChallenges": {"type": "boolean"},
        "minAccuracy": {"type": "integer", "minimum": 0, "maximum": 100}
      }
    },
    "reflectionQuestion": {
      "type": "object",
      "properties": {
        "question": {"type": "string"},
        "type": {"type": "string"},
        "required": {"type": "boolean"},
        "sampleAnswer": {"type": "string"}
      }
    },
    "nextLessonId": {"type": "string"},
    "relatedLessons": {
      "type": "array",
      "items": {"type": "string"}
    },
    "resources": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "url": {"type": "string", "format": "uri"},
          "type": {"type": "string"},
          "source": {"type": "string"},
          "estimatedTimeMinutes": {"type": "integer"}
        }
      }
    },
    "tags": {"type": "array", "items": {"type": "string"}},
    "keywords": {"type": "array", "items": {"type": "string"}},
    "category": {"type": "string"},
    "version": {"type": "string"},
    "authors": {"type": "array", "items": {"type": "string"}},
    "reviewers": {"type": "array", "items": {"type": "string"}},
    "createdAt": {"type": "string", "format": "date-time"},
    "updatedAt": {"type": "string", "format": "date-time"}
  },
  "required": ["id", "title", "description", "lessonType", "difficulty"],
  "definitions": {
    "textSection": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "const": "text"},
        "id": {"type": "string"},
        "title": {"type": "string"},
        "content": {"type": "string"}
      }
    },
    "codeSection": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "const": "code"},
        "id": {"type": "string"},
        "title": {"type": "string"},
        "content": {"type": "string"},
        "language": {"type": "string"},
        "showLineNumbers": {"type": "boolean"},
        "highlightedLines": {"type": "array", "items": {"type": "integer"}}
      }
    },
    "calloutSection": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "const": "callout"},
        "id": {"type": "string"},
        "title": {"type": "string"},
        "content": {"type": "string"},
        "variant": {"type": "string", "enum": ["tip", "warning", "info", "note"]},
        "icon": {"type": "string"}
      }
    },
    "markdownSection": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "const": "markdown"},
        "id": {"type": "string"},
        "title": {"type": "string"},
        "content": {"type": "string"}
      }
    },
    "interactiveSection": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "const": "interactive"},
        "id": {"type": "string"},
        "title": {"type": "string"},
        "component": {"type": "string"},
        "props": {"type": "object"}
      }
    },
    "challenge": {
      "type": "object",
      "properties": {
        "id": {"type": "string"},
        "title": {"type": "string"},
        "description": {"type": "string"},
        "challengeType": {"type": "string", "enum": ["multiple-choice", "fill-blank", "code-writing", "debugging", "matching"]},
        "question": {"type": "string"},
        "instructions": {"type": "string"},
        "difficulty": {"type": "string"},
        "estimatedTimeMinutes": {"type": "integer"},
        "xpReward": {"type": "integer"},
        "required": {"type": "boolean"},
        "content": {"type": "string"},
        "options": {"type": "array"},
        "answers": {"type": "array"},
        "successFeedback": {"type": "string"},
        "failureFeedback": {"type": "string"},
        "hints": {
          "type": "object",
          "properties": {
            "enabled": {"type": "boolean"},
            "maxHints": {"type": "integer"},
            "hints": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {"type": "string"},
                  "text": {"type": "string"},
                  "order": {"type": "integer"}
                }
              }
            },
            "finalExplanation": {"type": "string"}
          }
        }
      }
    }
  }
}
```

---

### React Map Schema

```json
{
  "$schema": "react-map",
  "type": "object",
  "properties": {
    "id": {"type": "string", "pattern": "^react-world-[0-9]+-map$"},
    "worldId": {"type": "string"},
    "mapTitle": {"type": "string"},
    "mapDescription": {"type": "string"},
    "backgroundStyle": {"type": "string", "enum": ["paper", "grid", "dotted"]},
    "colorPalette": {
      "type": "object",
      "properties": {
        "primary": {"type": "string"},
        "secondary": {"type": "string"},
        "accent": {"type": "string"},
        "locked": {"type": "string"},
        "completed": {"type": "string"},
        "current": {"type": "string"}
      }
    },
    "camera": {
      "type": "object",
      "properties": {
        "initialZoom": {"type": "number"},
        "minZoom": {"type": "number"},
        "maxZoom": {"type": "number"},
        "initialCenter": {
          "type": "object",
          "properties": {
            "x": {"type": "integer"},
            "y": {"type": "integer"}
          }
        },
        "focusOnCurrent": {"type": "boolean"}
      }
    },
    "overlay": {
      "type": "object",
      "properties": {
        "compass": {
          "type": "object",
          "properties": {
            "enabled": {"type": "boolean"},
            "position": {"type": "string"}
          }
        },
        "border": {
          "type": "object",
          "properties": {
            "style": {"type": "string"},
            "thickness": {"type": "integer"}
          }
        }
      }
    },
    "regions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string"},
          "title": {"type": "string"},
          "description": {"type": "string"},
          "order": {"type": "integer"},
          "theme": {"type": "string"},
          "backgroundColor": {"type": "string"},
          "bounds": {
            "type": "object",
            "properties": {
              "minX": {"type": "integer"},
              "minY": {"type": "integer"},
              "maxX": {"type": "integer"},
              "maxY": {"type": "integer"}
            }
          },
          "nodeIds": {"type": "array", "items": {"type": "string"}},
          "roads": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "from": {"type": "string"},
                "to": {"type": "string"},
                "style": {"type": "string"}
              }
            }
          },
          "decorations": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "type": {"type": "string"},
                "position": {
                  "type": "object",
                  "properties": {
                    "x": {"type": "integer"},
                    "y": {"type": "integer"}
                  }
                },
                "scale": {"type": "number"},
                "animation": {"type": "string"}
              }
            }
          },
          "ambientEffects": {"type": "array", "items": {"type": "string"}},
          "celebrationType": {"type": "string"},
          "landmark": {
            "type": "object",
            "properties": {
              "type": {"type": "string"},
              "position": {
                "type": "object",
                "properties": {
                  "x": {"type": "integer"},
                  "y": {"type": "integer"}
                }
              },
              "scale": {"type": "number"}
            }
          }
        }
      }
    },
    "nodes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string"},
          "title": {"type": "string"},
          "description": {"type": "string"},
          "lessonId": {"type": "string"},
          "position": {
            "type": "object",
            "properties": {
              "x": {"type": "integer"},
              "y": {"type": "integer"}
            }
          },
          "buildingType": {"type": "string"},
          "xpReward": {"type": "integer"},
          "estimatedTimeMinutes": {"type": "integer"},
          "difficulty": {"type": "string"},
          "tooltipDescription": {"type": "string"},
          "scale": {"type": "number"},
          "rotation": {"type": "number"}
        }
      }
    },
    "bossBattle": {
      "type": "object",
      "properties": {
        "id": {"type": "string"},
        "title": {"type": "string"},
        "description": {"type": "string"},
        "position": {
          "type": "object",
          "properties": {
            "x": {"type": "integer"},
            "y": {"type": "integer"}
          }
        },
        "buildingType": {"type": "string"},
        "xpReward": {"type": "integer"},
        "coinReward": {"type": "integer"},
        "requiredLessonIds": {"type": "array", "items": {"type": "string"}},
        "tooltipDescription": {"type": "string"}
      }
    }
  },
  "required": ["id", "worldId", "mapTitle", "regions", "nodes"]
}
```

---

### Boss Battle Schema

```json
{
  "$schema": "boss-battle",
  "type": "object",
  "properties": {
    "id": {"type": "string", "pattern": "^react-boss-[0-9]+-[a-z-]+$"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "longDescription": {"type": "string"},
    "regionId": {"type": "string"},
    "difficulty": {"type": "string", "enum": ["intermediate", "advanced", "expert"]},
    "estimatedTimeMinutes": {"type": "integer"},
    "conceptsTested": {"type": "array", "items": {"type": "string"}},
    "requiredLessonIds": {"type": "array", "items": {"type": "string"}},
    "scenario": {
      "type": "object",
      "properties": {
        "narrative": {"type": "string"},
        "character": {"type": "string"},
        "characterAvatar": {"type": "string", "format": "uri"},
        "setting": {"type": "string"}
      }
    },
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string"},
          "title": {"type": "string"},
          "description": {"type": "string"},
          "starterCode": {"type": "string"},
          "requirements": {"type": "array", "items": {"type": "string"}},
          "testCases": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "input": {"type": "object"},
                "expectedOutput": {"type": "object"},
                "description": {"type": "string"}
              }
            }
          }
        }
      }
    },
    "successCriteria": {"type": "array", "items": {"type": "string"}},
    "failureStates": {"type": "array", "items": {"type": "string"}},
    "rewards": {
      "type": "object",
      "properties": {
        "xp": {"type": "integer"},
        "coins": {"type": "integer"},
        "bonusXpFirstTry": {"type": "integer"},
        "bonusXpTimeLimit": {"type": "integer"},
        "achievementId": {"type": "string"},
        "badgeId": {"type": "string"}
      }
    },
    "hints": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "taskId": {"type": "string"},
          "hintText": {"type": "string"},
          "cost": {"type": "integer"}
        }
      }
    },
    "solution": {
      "type": "object",
      "properties": {
        "code": {"type": "string"},
        "explanation": {"type": "string"},
        "alternativeApproaches": {"type": "array", "items": {"type": "string"}}
      }
    },
    "version": {"type": "string"},
    "createdAt": {"type": "string", "format": "date-time"},
    "updatedAt": {"type": "string", "format": "date-time"}
  },
  "required": ["id", "title", "description", "regionId", "tasks", "successCriteria", "rewards"]
}
```

---

### Capstone Project Schema

```json
{
  "$schema": "capstone-project",
  "type": "object",
  "properties": {
    "id": {"type": "string", "pattern": "^react-capstone-[a-z-]+$"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "longDescription": {"type": "string"},
    "technology": {"type": "string", "const": "react"},
    "difficulty": {"type": "string", "enum": ["advanced"]},
    "estimatedHours": {"type": "integer"},
    "prerequisites": {
      "type": "array",
      "items": {"type": "string"}
    },
    "technicalRequirements": {
      "type": "array",
      "items": {"type": "string"}
    },
    "features": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "description": {"type": "string"},
          "conceptsUsed": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "milestones": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string"},
          "title": {"type": "string"},
          "description": {"type": "string"},
          "deliverables": {"type": "array", "items": {"type": "string"}},
          "estimatedDays": {"type": "integer"},
          "xpReward": {"type": "integer"},
          "checkpoints": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {"type": "string"},
                "description": {"type": "string"},
                "validationType": {"type": "string"},
                "autoGraded": {"type": "boolean"}
              }
            }
          }
        }
      }
    },
    "assessmentRubric": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": {"type": "string"},
          "weight": {"type": "number"},
          "criteria": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "level": {"type": "string"},
                "score": {"type": "integer"},
                "description": {"type": "string"}
              }
            }
          }
        }
      }
    },
    "stretchGoals": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "description": {"type": "string"},
          "bonusXP": {"type": "integer"},
          "difficulty": {"type": "string"}
        }
      }
    },
    "resources": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "url": {"type": "string", "format": "uri"},
          "type": {"type": "string"},
          "description": {"type": "string"}
        }
      }
    },
    "submissionFormat": {
      "type": "object",
      "properties": {
        "type": {"type": "string"},
        "requiredFiles": {"type": "array", "items": {"type": "string"}},
        "deploymentRequired": {"type": "boolean"},
        "readmeRequired": {"type": "boolean"}
      }
    },
    "completionRewards": {
      "type": "object",
      "properties": {
        "xp": {"type": "integer"},
        "coins": {"type": "integer"},
        "badgeId": {"type": "string"},
        "achievementIds": {"type": "array", "items": {"type": "string"}},
        "certificateName": {"type": "string"}
      }
    },
    "version": {"type": "string"},
    "createdAt": {"type": "string", "format": "date-time"},
    "updatedAt": {"type": "string", "format": "date-time"}
  },
  "required": ["id", "title", "description", "milestones", "assessmentRubric", "completionRewards"]
}
```

---

## Visual Planning

### Artistic Direction

**Core Aesthetic:** Hand-drawn notebook aesthetic with playful doodles

**Key Visual Elements:**

1. **Background:** Notebook paper texture with subtle grid/dot patterns
2. **Borders:** Hand-drawn style borders resembling pen strokes
3. **Typography:** Casual, handwritten-style fonts for headings; clean sans-serif for body
4. **Icons:** Doodle-style icons with slight imperfections
5. **Buttons:** Sticky note or tape-styled interactive elements
6. **Animations:** Subtle bounces, sways, and drifts mimicking hand-drawn motion

---

### Color Palette by Region

**Component Cove:**
- Primary: #5DADE2 (ocean blue)
- Secondary: #F4D03F (sandy yellow)
- Accent: #E74C3C (coral red)
- Background: #FEF9E7 (warm paper)

**Props Peninsula:**
- Primary: #58D68D (tropical green)
- Secondary: #EC7063 (coral pink)
- Accent: #3498DB (bridge blue)
- Background: #E8F8F5 (mint paper)

**State Station:**
- Primary: #7D66AB (industrial purple)
- Secondary: #EC7063 (signal red)
- Accent: #58D68D (signal green)
- Background: #F2F3F4 (gray paper)

**Effects Forest:**
- Primary: #884EA0 (mystical purple)
- Secondary: #27AE60 (forest green)
- Accent: #F39C12 (glowing orange)
- Background: #EBDEF0 (lavender paper)

**Context Castle:**
- Primary: #8E44AD (royal purple)
- Secondary: #F1C40F (gold)
- Accent: #C0392B (velvet red)
- Background: #F5EEF8 (regal paper)

**Router Riverlands:**
- Primary: #2E86C1 (river blue)
- Secondary: #27AE60 (path green)
- Accent: #F39C12 (compass gold)
- Background: #EAF2F8 (water paper)

---

### Regional Landmarks

Each region features a distinctive landmark building:

| Region | Landmark | Visual Description |
|--------|----------|-------------------|
| Component Cove | Component Lighthouse | Tall tower with JSX windows, beams of light showing component tree |
| Props Peninsula | Prop Bridge Central | Large suspension bridge with labeled cables carrying data packages |
| State Station | Hook Control Tower | Industrial tower with blinking state signals and levers |
| Effects Forest | Elder Tree Temple | Ancient tree with glowing runes representing effect dependencies |
| Context Castle | Provider Throne Room | Grand hall with golden throne broadcasting context waves |
| Router Riverlands | Navigation Harbor | Dock with boats labeled by route names, compass rose |

---

### Character Design

**Guide Characters:**

1. **Professor Syntax** - Main guide, wise owl with glasses and graduation cap
2. **Byte the Bug** - Comic relief, cute ladybug that appears during debugging
3. **Hook Fairy** - Magical guide for hooks concepts, sparkly wand with hook symbol
4. **Captain Component** - Hero character for boss battles, shield with component icon

**Character Style:**
- Hand-drawn with marker-like outlines
- Expressive faces with simple features
- Accessories matching their domain
- Animated idle states (blinking, floating, etc.)

---

### UI Components

**Interactive Elements:**

1. **Code Editor:** Notebook-style with line numbers drawn as margin notes
2. **Run Button:** Green sticky note with play doodle
3. **Console Output:** Torn paper strip appearance
4. **Challenge Cards:** Index card style with rounded corners
5. **Progress Indicators:** Hand-drawn progress bars with checkmark doodles
6. **Tooltips:** Speech bubbles with tail pointers
7. **Notifications:** Toast notifications as folded corner notes

**Animation Principles:**
- Bounce on completion
- Sway for ambient elements
- Drift for clouds/birds
- Pulse for interactive hotspots
- Confetti/stamp/fireworks for achievements

---

### Consistency Guidelines

**Maintain Across All Regions:**

✅ Same notebook paper base texture  
✅ Consistent border thickness and style  
✅ Unified typography hierarchy  
✅ Similar icon stroke weight  
✅ Coordinated animation timing  
✅ Shared component library  

**Vary By Region:**

🎨 Color palette  
🏛️ Landmark architecture  
🌳 Decoration themes  
🎭 Character outfits  
🌊 Ambient effects  
🎉 Celebration styles  

---

## Future Extensibility

### Planned Expansions

**Phase 2: Advanced Patterns**
- Higher-Order Components
- Render Props Pattern
- Compound Components
- State Machines with XState
- Server Components introduction

**Phase 3: Ecosystem Integration**
- Redux Toolkit
- React Query / TanStack Query
- Form libraries (React Hook Form)
- Testing Library
- Storybook integration

**Phase 4: Full-Stack React**
- Next.js fundamentals
- API routes
- Database integration
- Authentication patterns
- Deployment strategies

---

### Modular Design

The curriculum structure supports easy addition of:

1. **New Worlds:** Add world JSON + map JSON + chapter references
2. **New Chapters:** Insert chapter with sequential order number
3. **New Lessons:** Follow lesson schema, add to chapter lessonIds
4. **New Challenges:** Use challenge templates, plug into lessons
5. **New Boss Battles:** Create boss JSON, reference in map

---

### Versioning Strategy

**Content Versioning:**
- Major versions (1.0, 2.0): Significant curriculum changes
- Minor versions (1.1, 1.2): New lessons or chapters added
- Patch versions (1.0.1, 1.0.2): Bug fixes, clarifications

**Deprecation Policy:**
- Deprecated content marked with `deprecated: true` flag
- Migration guides provided for major changes
- Legacy content remains accessible but hidden from default path

---

### Accessibility Considerations

**Current Implementation:**
- Screen reader compatible content structure
- Keyboard navigable challenges
- Color-blind friendly palettes
- Clear font choices for readability

**Future Improvements:**
- Audio narration option
- Sign language video inserts
- Dyslexia-friendly font toggle
- Reduced motion mode
- High contrast theme

---

### Localization Readiness

**Structure Supports:**
- Externalized string resources
- RTL layout compatibility
- Culturally neutral examples
- Expandable text containers

**Priority Languages:**
1. Spanish (es-ES)
2. French (fr-FR)
3. German (de-DE)
4. Japanese (ja-JP)
5. Portuguese (pt-BR)

---

### Analytics Integration Points

**Trackable Events:**
- Lesson start/completion
- Challenge attempts and success rate
- Hint usage frequency
- Time spent per section
- Boss battle attempts
- Streak maintenance
- Social sharing

**Metrics for Improvement:**
- Drop-off points in curriculum
- Challenge difficulty calibration
- Optimal lesson length
- Most effective hint types
- Common misconception patterns

---

## Appendix: Quick Reference

### Chapter-to-Region Mapping

| Chapter | Region | Boss Battle |
|---------|--------|-------------|
| 1-2 | Component Cove + Props Peninsula | Component Architect |
| 3-4 | State Station + Events | State Guardian |
| 5-6 | Effects Forest + Lists | Effect Sage |
| 7-8 | Advanced Hooks | Context Monarch |
| 9-10 | Context + Router | Router Admiral |
| 11-12 | Optimization + Capstone | React Master |

### XP Distribution

| Content Type | Count | XP Each | Total XP |
|--------------|-------|---------|----------|
| Lessons | 48 | 50 | 2,400 |
| Challenges | 120 | 30 avg | 3,600 |
| Boss Battles | 6 | 200 | 1,200 |
| Chapter Bonuses | 12 | 100 | 1,200 |
| Region Bonuses | 6 | 250 | 1,500 |
| Capstone | 1 | 1,000 | 1,000 |
| **Total** | | | **~10,900** |

### Estimated Timeline

| Phase | Weeks | Content |
|-------|-------|---------|
| Foundations (Ch 1-4) | 3-4 | Components through Forms |
| Intermediate (Ch 5-8) | 4-5 | Effects through Custom Hooks |
| Advanced (Ch 9-11) | 3-4 | Context through Optimization |
| Capstone (Ch 12) | 2-3 | Full project build |
| **Total** | **12-16 weeks** | **Complete React path** |

---

## Document Information

**Document Version:** 1.0.0  
**Created:** 2024  
**Status:** Approved for Production  
**Next Review:** After Beta 0.2 Launch  
**Authors:** ScribbleCode Curriculum Team  
**Reviewers:** Educational Advisory Board  

---

*This document serves as the authoritative blueprint for React curriculum development. All future lesson content must align with the structures, progression, and pedagogical principles outlined herein.*
