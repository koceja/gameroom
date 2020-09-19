// The resolvers
const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2
      feed: () => links,
      link: (parent, args) => {
          for (var i =0; i<=idCount; i++) {
              if (links[i].id===args.id) {
                  return links[i];
              }
          }
      }
    },
    // 3
    Mutation : {
        post: (parent, args) => {
            const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
          for (var i =0; i<=idCount; i++) {
              if (links[i].id===args.id) {
                  links[i].description = args.description
                  links[i].url = args.url
                  return links[i]
              }
          }
      },
        deleteLink: (parent, args) => {
          for (let i =0; i<=idCount; i++) {
              if (links[i].id===args.id) {
                  let alpha = [...links]
                  links[i]=alpha[0]
                  links[0]=alpha[i]
                  links.shift()
                  break;
              }
          }
          return links;
      }
  
    }
  }
  