# SkillSwap — Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
The purpose of this SRS is to define the requirements for SkillSwap, a peer‑to‑peer mobile application that enables university students to exchange skills (e.g., tutoring, design, public speaking) without money by scheduling sessions and exchanging reviews.

### 1.2 Scope
SkillSwap facilitates:
- Account creation and authentication for students
- Creating and browsing skill offers
- Booking sessions between students (as tutor or learner)
- Reviewing completed sessions
- Reporting inappropriate content and basic admin moderation

The initial release targets an MVP on Android/iOS using React Native (Expo), with a simple in‑app data model suitable for migration to a cloud backend.

### 1.3 Definitions, Acronyms, and Abbreviations
- MVP: Minimum Viable Product
- P2P: Peer‑to‑Peer
- Offer: A posted advertisement by a student to teach or share a skill
- Session: A scheduled meeting between a tutor and a learner
- Review: Feedback after a session (rating and comment)

## 2. Overall Description

### 2.1 Product Perspective
The product is a standalone mobile app. Future integrations may include university SSO, push notifications, and cloud databases (e.g., Firebase, Supabase).

### 2.2 User Classes and Characteristics
- Student (Tutor/Learner): Any university student can both teach and learn. Typical needs: search offers, book sessions, message tutors, manage profile.
- Admin: Trusted moderator with powers to remove content, suspend users, and resolve reports.

### 2.3 Operating Environment
- React Native via Expo SDK
- iOS and Android devices

### 2.4 Design and Implementation Constraints
- Mobile‑first UI
- Privacy and safety for student users
- MVP avoids complex payments; no monetary transactions

### 2.5 Assumptions and Dependencies
- Users possess valid university emails
- Internet connectivity required for data sync (future online backend)

## 3. User Stories

### Student (Learner)
- As a learner, I want to search for skill offers so that I can find relevant tutors.
- As a learner, I want to view tutor profiles so that I can evaluate credibility.
- As a learner, I want to request/book a session so that I can schedule learning.
- As a learner, I want to leave a review after a session so that others can benefit from my feedback.

### Student (Tutor)
- As a tutor, I want to post a skill offer so that learners can find me.
- As a tutor, I want to edit or delete my offer so that details stay current.
- As a tutor, I want to manage my upcoming sessions so that I can prepare and avoid conflicts.

### Student (General)
- As a student, I want to create a profile highlighting my skills so that others understand what I can teach.
- As a student, I want secure login/signup so that my account is protected.
- As a student, I want to report inappropriate content so that the platform stays safe.

### Admin
- As an admin, I want to view reported content so that I can moderate effectively.
- As an admin, I want to delete offers or suspend users who violate policies so that the community is protected.

## 4. Functional Requirements

- FR1: The system shall allow users to sign up with email and password.
- FR2: The system shall allow users to log in and log out securely.
- FR3: The system shall allow users to create and edit their profile (name, bio, skills, avatar).
- FR4: The system shall allow tutors to create skill offers (title, description, tags, availability).
- FR5: The system shall allow tutors to edit and delete their offers.
- FR6: The system shall display a feed/list of available offers.
- FR7: The system shall allow users to search and filter offers by keywords and tags.
- FR8: The system shall allow learners to request/book a session with a tutor.
- FR9: The system shall store session details (participants, time, status).
- FR10: The system shall allow users to leave reviews for completed sessions.
- FR11: The system shall display average ratings for tutors/offers.
- FR12: The system shall allow users to report offers, sessions, or reviews.
- FR13: The system shall allow admins to view reports and delete content.
- FR14: The system shall notify users of session updates via in‑app UI (MVP) and prepare for push notifications (future).
- FR15: The system shall maintain basic audit metadata (createdAt, updatedAt) on records.

## 5. Non‑Functional Requirements

### 5.1 Usability
- The UI shall use a clean, minimal design with intuitive navigation and accessible text sizes.
- Common tasks (login, browse, post, book) shall be discoverable within 2 taps from the home screen.

### 5.2 Performance
- Offer list rendering shall complete within 1 second for 50 items on mid‑range devices.
- App cold start shall complete within 3 seconds on supported devices.

### 5.3 Security
- Passwords shall be handled securely and never logged.
- The system shall prevent common vulnerabilities (XSS in text fields, insecure storage) and use secure communication for future backend.

### 5.4 Reliability & Availability
- The system shall handle intermittent connectivity gracefully (retry UI, offline notices) in future versions.
- The system shall not crash on malformed data; it shall render fallback UI.

## 6. Database Schema (MVP logical model)

Although the MVP uses local/dummy data, the following schema models the intended backend collections.

### 6.1 Users
| Field | Type | Required | Notes |
|------|------|----------|-------|
| id | string | Yes | Unique user ID |
| name | string | Yes | Display name |
| email | string | Yes | University email (unique) |
| bio | string | No | Short description |
| skills | string[] | No | List of skills |
| avatarUrl | string | No | Profile image URL |
| role | enum("student","admin") | Yes | Defaults to "student" |
| createdAt | timestamp | Yes | Record creation time |
| updatedAt | timestamp | Yes | Record update time |

### 6.2 Offers
| Field | Type | Required | Notes |
|------|------|----------|-------|
| id | string | Yes | Unique offer ID |
| tutorId | string | Yes | References Users.id |
| title | string | Yes | Offer title |
| description | string | Yes | Offer details |
| tags | string[] | No | Searchable tags |
| ratingAvg | number | No | Average rating 0–5 |
| createdAt | timestamp | Yes | Created time |
| updatedAt | timestamp | Yes | Updated time |

### 6.3 Sessions
| Field | Type | Required | Notes |
|------|------|----------|-------|
| id | string | Yes | Unique session ID |
| offerId | string | Yes | References Offers.id |
| tutorId | string | Yes | References Users.id |
| learnerId | string | Yes | References Users.id |
| scheduledAt | timestamp | Yes | Scheduled date/time |
| status | enum("requested","confirmed","completed","cancelled") | Yes | Session state |
| createdAt | timestamp | Yes | Created time |
| updatedAt | timestamp | Yes | Updated time |

### 6.4 Reviews
| Field | Type | Required | Notes |
|------|------|----------|-------|
| id | string | Yes | Unique review ID |
| sessionId | string | Yes | References Sessions.id |
| reviewerId | string | Yes | References Users.id |
| rating | number | Yes | 1–5 |
| comment | string | No | Optional feedback |
| createdAt | timestamp | Yes | Created time |

## 7. External Interface Requirements (MVP)
- Mobile UI with bottom tab navigation (Home, Create Post, Profile)
- Forms for Login/Signup and Create Post

## 8. Acceptance Criteria (MVP)
- Users can login using dummy credentials and navigate the app
- Home displays a list of predefined offers
- Create Post form logs the new post and returns to Home
- Profile displays predefined user information

## 9. Future Enhancements
- Real backend (authentication, storage)
- Messaging between students
- Calendar integration and reminders
- Push notifications
