import { serve } from "https://deno.land/std/http/server.ts";

// server setup
const server = serve({ port: 3000 });
console.log("http://localhost:3000/");

for await (const req of server) {
  
  // serve index page
  if (req.url === '/') {
    req.respond({
      status: 200,
      body: await Deno.open('./public/index.html')
    });
  }
  
}