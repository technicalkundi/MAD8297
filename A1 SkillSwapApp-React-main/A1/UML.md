# SkillSwap — UML Diagrams

Below are diagram placeholders and code blocks to render diagrams with Mermaid or PlantUML.

## Use Case Diagram

Mermaid:
```mermaid
%% Actors: Student (Tutor/Learner), Admin
flowchart LR
  Student((Student))
  Admin((Admin))

  UC_Login[[Login]]
  UC_Signup[[Signup]]
  UC_Profile[[Create/Edit Profile]]
  UC_Post[[Post Skill Offer]]
  UC_Search[[Search Offers]]
  UC_Book[[Book Session]]
  UC_Review[[Review]]
  UC_Report[[Report Content]]
  UC_AdminDelete[[Admin Delete]]

  Student --> UC_Login
  Student --> UC_Signup
  Student --> UC_Profile
  Student --> UC_Post
  Student --> UC_Search
  Student --> UC_Book
  Student --> UC_Review
  Student --> UC_Report

  Admin --> UC_AdminDelete
  UC_Report --> UC_AdminDelete
```

PlantUML:
```plantuml
@startuml
left to right direction
actor Student
actor Admin
usecase UC1 as "Login"
usecase UC2 as "Signup"
usecase UC3 as "Create/Edit Profile"
usecase UC4 as "Post Skill Offer"
usecase UC5 as "Search Offers"
usecase UC6 as "Book Session"
usecase UC7 as "Review"
usecase UC8 as "Report Content"
usecase UC9 as "Admin Delete"

Student --> UC1
Student --> UC2
Student --> UC3
Student --> UC4
Student --> UC5
Student --> UC6
Student --> UC7
Student --> UC8

Admin --> UC9
UC8 --> UC9
@enduml
```

## Class Diagram

Mermaid:
```mermaid
classDiagram
  class User {
    +string id
    +string name
    +string email
    +string bio
    +string[] skills
    +string avatarUrl
    +string role
  }

  class Offer {
    +string id
    +string tutorId
    +string title
    +string description
    +string[] tags
    +number ratingAvg
  }

  class Session {
    +string id
    +string offerId
    +string tutorId
    +string learnerId
    +Date scheduledAt
    +string status
  }

  class Review {
    +string id
    +string sessionId
    +string reviewerId
    +number rating
    +string comment
  }

  User "1" --> "*" Offer : creates
  Offer "1" --> "*" Session : scheduled for
  Session "1" --> "*" Review : receives
```

PlantUML:
```plantuml
@startuml
class User {
  +id: string
  +name: string
  +email: string
  +bio: string
  +skills: string[]
  +avatarUrl: string
  +role: string
}

class Offer {
  +id: string
  +tutorId: string
  +title: string
  +description: string
  +tags: string[]
  +ratingAvg: number
}

class Session {
  +id: string
  +offerId: string
  +tutorId: string
  +learnerId: string
  +scheduledAt: Date
  +status: string
}

class Review {
  +id: string
  +sessionId: string
  +reviewerId: string
  +rating: number
  +comment: string
}

User "1" --> "*" Offer : creates
Offer "1" --> "*" Session : has
Session "1" --> "*" Review : gets
@enduml
```
