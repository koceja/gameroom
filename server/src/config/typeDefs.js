export const typeDefs = `
  type Query {
    users: [User!]
    groups: [Group!]
    user(username: String!): User
  }
  type Mutation {
    createAccount(username: String!, password: String!): User!
    deactivateAccount(uid: ID!): [User!]
    updatePersonalInterests(uid: ID!, personalInterests: [PersonalInterest!]): User!
    createGroup(uid: ID!, personalInterests: [PersonalInterest!], game: GameInterest!): User!
    leaveGroup(uid: ID!, gid: ID!): User!
    sendMessage(uid: ID!, message: Message!, gid: ID!): User!
    changePassword(uid: ID!, password: String!): User!
    renameGroup(uid: ID!, gid: ID!, name: String!): User!
    setLink(uid: ID!, gid: ID!, link: String!): User!
    requestFriend(uid: ID!, username: String!): User!
    acceptFriend(uid: ID!, request: Request): User!
  }
  type User {
    uid: ID!
    username: String!
    password: String!
    groups: [Group!]
    friends: [User!]
    requests: [Request!]
    personalInterests: [PersonalInterest!]
    gameInterests: [GameInterest!]
  }
  type Group {
    gid: ID!
    members: [User!]!
    name: String!
    link: String!
    games: [GameInterest!]!
    messages: [Message!]
  }
  type Message {
    content: String!
    time: Date!
  }
  type GameInterest {
      game: String!
  }
  type PersonalInterest {
      interest: String!
  }
  type Request {
    from: User!
    time: Date!
  }
`