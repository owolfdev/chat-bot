test the api

curl -X POST http://localhost:3000/api/chat \
 -H "Content-Type: application/json" \
 -d '{"message": "will the milky way collision with the Andromeda Galaxy be violent?"}'

curl -X POST https://chat-bot-mauve.vercel.app/chat \
 -H "Content-Type: application/json" \
 -d '{"message": "how many stars are estimated to be in the milky way galaxy?"}'
